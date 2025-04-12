import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import OpenAI from 'openai';
import DatabaseIcon from '../components/icons/database-icon';
import ReactFlow, { 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';
import { supabase } from '../lib/supabase';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface QueryResult {
  answer: string;
  query: string;
  explanation: string;
  data?: any;
}

const DashboardPage = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [results, setResults] = useState<QueryResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dbSchema, setDbSchema] = useState<string>('');
  const [isConnected, setIsConnected] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSchemaDialogOpen, setIsSchemaDialogOpen] = useState(false);
  const [connectionString, setConnectionString] = useState('');
  const [parsedSchema, setParsedSchema] = useState<any[]>([]);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [viewMode, setViewMode] = useState<'list' | 'mindmap'>('list');
  const [user, setUser] = useState<any>(null);

  // Fetch user data on component mount
  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    
    getUser();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  // Function to generate SQL query using OpenAI
  const generateSQLQuery = async (userQuestion: string) => {
    try {
      const prompt = `
You are a helpful SQL assistant. Given the following database schema:

${dbSchema}

Generate a SQL query to answer this question: "${userQuestion}"

Format your response as a JSON object with the following structure:
{
  "answer": "Detailed answer to the question in plain English",
  "query": "The SQL query that answers the question",
  "explanation": "Explanation of how the SQL query works"
}
For answer the answer should be: 
      "There are {answer} customers in Chicago."
      Since we do not know the answer, please use the placeholder {answer} in the answer.
      
`;

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.2,
      });

      const content = response.choices[0].message.content || '';
      try {
        // Extract the JSON object from the response
        const jsonMatch = content.match(/```json([\s\S]*?)```/) || content.match(/({[\s\S]*})/);
        const jsonContent = jsonMatch ? jsonMatch[1] : content;
        return JSON.parse(jsonContent);
      } catch (e) {
        console.error('Error parsing JSON:', e);
        // Fallback if JSON parsing fails
        return {
          answer: "I couldn't generate a proper response. Please try rephrasing your question.",
          query: "-- No query generated",
          explanation: "There was an error processing your request."
        };
      }
    } catch (error) {
      console.error('Error generating SQL:', error);
      return {
        answer: "An error occurred while generating the SQL query.",
        query: "-- Error generating query",
        explanation: "There was an API error. Please try again later."
      };
    }
  };

  const generateSentence = async (queryResult: any, originalAnswer: string) => {
    try {
      // If there's no data to process, return the original answer
      if (!queryResult || !Array.isArray(queryResult) || queryResult.length === 0) {
        return originalAnswer.replace('{answer}', 'no');
      }

      // For a count query, usually there's a single row with a single number
      if (queryResult.length === 1 && Object.keys(queryResult[0]).length === 1) {
        const value = Object.values(queryResult[0])[0];
        return originalAnswer.replace('{answer}', String(value));
      }

      // For more complex queries, we'll use the first row to get a number
      if (queryResult.length >= 1) {
        // Try to find a numeric value in the first row
        const firstRow = queryResult[0];
        const numericValue = Object.values(firstRow).find(val => 
          typeof val === 'number' || !isNaN(Number(val))
        );
        
        if (numericValue !== undefined) {
          return originalAnswer.replace('{answer}', String(numericValue));
        }
        
        // If no numeric value, use the count of returned rows
        return originalAnswer.replace('{answer}', String(queryResult.length));
      }
      
      // Fallback if no pattern is matched
      return originalAnswer.replace('{answer}', 'some');
    } catch (error) {
      console.error('Error generating sentence:', error);
      return originalAnswer.replace('{answer}', 'some');
    }
  };

  const handleSubmit = async () => {
    if (!question.trim()) return;
    if (!isConnected) {
      alert('Please connect to the database first!');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Generate SQL using OpenAI
      const generatedResponse = await generateSQLQuery(question);
      
      // Execute the query via API if it's valid
      let queryData = null;
      let finalAnswer = generatedResponse.answer;
      
      if (generatedResponse.query && generatedResponse.query !== '-- No query generated' && generatedResponse.query !== '-- Error generating query') {
        // Call the backend API instead of direct query execution
        const response = await fetch('http://localhost:3000/api/db/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: generatedResponse.query }),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to execute query: ${errorText}`);
        }
        
        const result = await response.json();
        queryData = result.data;
        
        // Generate the final answer with actual values from the query result
        if (queryData && generatedResponse.answer.includes('{answer}')) {
          finalAnswer = await generateSentence(queryData, generatedResponse.answer);
        }
      }
      
      // Add the result
      setResults([
        {
          query: generatedResponse.query,
          explanation: generatedResponse.explanation,
          answer: finalAnswer,
          data: queryData
        },
        ...results
      ]);
      
      setQuestion('');
    } catch (error) {
      console.error('Error in submission:', error);
      alert('An error occurred. Please check the console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Update to open the dialog instead
  const openDatabaseDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to connect to the database via API
  const connectToDatabase = async () => {
    if (!connectionString.trim()) {
      alert('Please enter a valid connection string');
      return;
    }

    setIsLoading(true);
    try {
      // Connect to database via API
      const connectResponse = await fetch('http://localhost:3000/api/db/connect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ connectionString }),
      });
      
      // Check for non-ok response before trying to parse JSON
      if (!connectResponse.ok) {
        const errorText = await connectResponse.text();
        let errorMessage = 'Failed to connect to database';
        
        try {
          // Attempt to parse as JSON if possible
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorMessage;
          if (errorData.details) {
            errorMessage += ': ' + errorData.details;
          }
        } catch (e) {
          // If not JSON, use the text or status
          errorMessage = errorText || `HTTP error ${connectResponse.status}`;
        }
        
        throw new Error(errorMessage);
      }
      
      // Verify the connection works by trying to fetch the schema
      try {
        // Get database schema via API
        const schemaResponse = await fetch('http://localhost:3000/api/db/schema', {
          method: 'GET',
        });
        
        if (!schemaResponse.ok) {
          const errorText = await schemaResponse.text();
          let errorMessage = 'Failed to fetch database schema';
          
          try {
            const errorData = JSON.parse(errorText);
            if (errorData.error) {
              errorMessage = errorData.error;
              if (errorData.details) {
                errorMessage += ': ' + errorData.details;
              }
            }
          } catch (e) {
            errorMessage += ': ' + errorText;
          }
          
          throw new Error(errorMessage);
        }
        
        const schemaData = await schemaResponse.json();
        
        if (!schemaData.data || !Array.isArray(schemaData.data) || schemaData.data.length === 0) {
          throw new Error('Database returned empty schema. Please check if the database contains tables.');
        }
        
        const tableDefinitions = schemaData.data;
        
        const schemaText = tableDefinitions.map((table: any) => {
          return `Table ${table.table_name}: ${table.column_details}`;
        }).join('\n\n');
        
        setDbSchema(schemaText);
        setIsConnected(true);
        setIsDialogOpen(false); // Close the dialog
        alert('Successfully connected to database!');
      } catch (schemaError) {
        // If schema fetch fails, we consider the connection unsuccessful
        console.error('Error fetching schema:', schemaError);
        throw new Error(`Database connection test failed: ${(schemaError as Error).message}`);
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      
      // Check if it's a hostname resolution error and provide a more helpful message
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('ENOTFOUND')) {
        const hostname = errorMessage.match(/ENOTFOUND\s+([^\s]+)/)?.[1];
        alert(`Failed to resolve database hostname${hostname ? ' ' + hostname : ''}. Please check:\n- The connection string is correct\n- Your network connection\n- The database server is accessible`);
      } else {
        alert(`Failed to connect to database: ${errorMessage}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Parse the schema text into a structured format when dbSchema changes
  useEffect(() => {
    if (dbSchema) {
      try {
        // Split by double newline to get each table
        const tables = dbSchema.split('\n\n');
        const parsedTables = tables.map(table => {
          // Extract table name and column details
          const match = table.match(/Table ([^:]+): (.*)/);
          if (match) {
            const tableName = match[1];
            const columnDetails = match[2];
            
            // Improved column parsing to handle column types with spaces
            const columns = columnDetails.split(', ').map(col => {
              // Match column name and type, accounting for types that may contain spaces
              const colMatch = col.match(/^(\w+)\s+(.+)$/);
              if (colMatch) {
                return { 
                  name: colMatch[1], 
                  type: colMatch[2],
                  isPrimary: colMatch[2].toLowerCase().includes('primary key'),
                  isNullable: !colMatch[2].toLowerCase().includes('not null')
                };
              }
              return { name: col, type: 'unknown' };
            });
            
            return { tableName, columns };
          }
          return null;
        }).filter(Boolean);
        
        setParsedSchema(parsedTables);
      } catch (error) {
        console.error('Error parsing schema:', error);
      }
    }
  }, [dbSchema]);

  // Add this function to generate the mindmap data from your schema
  const generateSchemaGraph = useCallback(() => {
    if (!parsedSchema || parsedSchema.length === 0) return;
    
    // Create nodes for each table
    const flowNodes = parsedSchema.map((table, index) => {
      return {
        id: table.tableName,
        data: { 
          label: (
            <div className="p-2">
              <div className="font-bold mb-1">{table.tableName}</div>
              <div className="text-xs max-h-32 overflow-auto">
                {table.columns.map((col: any) => (
                  <div key={col.name} className="flex items-center gap-1">
                    <span className={col.isPrimary ? "text-amber-600 font-bold" : ""}>
                      {col.name}
                    </span>
                    <span className="text-gray-400 text-[10px]">({col.type.split(' ')[0]})</span>
                  </div>
                ))}
              </div>
            </div>
          )
        },
        position: { 
          x: 150 + (index % 3) * 300, 
          y: 100 + Math.floor(index / 3) * 250 
        },
        style: {
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          width: 200,
        }
      };
    });
    
    // Find foreign key relationships to create edges
    const flowEdges: any[] = [];
    
    // This is where we'd normally extract FK relationships
    // Since we don't have explicit FK information in our schema format,
    // we'll look for common naming patterns like table_id
    
    // For each table, look for potential foreign keys
    parsedSchema.forEach(sourceTable => {
      // For each column in this table
      sourceTable.columns.forEach((column: any) => {
        // Look for columns ending with "_id" that might be foreign keys
        if (column.name.endsWith('_id')) {
          // Extract potential table name (remove _id suffix)
          const potentialTableName = column.name.slice(0, -3);
          
          // Check if we have a table with this name (singular or plural form)
          const targetTable = parsedSchema.find(t => 
            t.tableName === potentialTableName || 
            t.tableName === `${potentialTableName}s`
          );
          
          if (targetTable) {
            flowEdges.push({
              id: `e-${sourceTable.tableName}-${targetTable.tableName}`,
              source: sourceTable.tableName,
              target: targetTable.tableName,
              animated: true,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                width: 15,
                height: 15,
              },
              style: { stroke: '#6366f1' },
              label: column.name,
            });
          }
        }
      });
    });
    
    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [parsedSchema, setNodes, setEdges]);
  
  // Call this when schema changes
  useEffect(() => {
    if (parsedSchema.length > 0) {
      generateSchemaGraph();
    }
  }, [parsedSchema, generateSchemaGraph]);

  // Function to open schema dialog
  const openSchemaDialog = () => {
    setIsSchemaDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl relative">
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        <Button 
          onClick={handleSignOut}
          variant="outline"
          size="sm"
          className="text-gray-600"
        >
          Sign Out
        </Button>
        
        <Button 
          onClick={openDatabaseDialog}
          disabled={isLoading}
          variant="outline"
          size="icon"
          className="rounded-full shadow-md"
          style={{ 
            backgroundColor: isConnected ? "#10b981" : "#ef4444", 
            color: "white",
            transition: "all 0.3s ease"
          }}
          title={isConnected ? "Connected to Database" : "Connect to Database"}
        >
          <DatabaseIcon className={`h-5 w-5 ${isLoading ? 'animate-pulse' : ''}`} />
        </Button>
      </div>

      {/* Schema Viewer Button */}
      {isConnected && (
        <div className="absolute top-4 left-4 z-10">
          <Button 
            onClick={openSchemaDialog}
            variant="outline"
            className="shadow-md bg-blue-500 text-white hover:bg-blue-600 flex items-center gap-2"
            title="View Database Schema"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
            </svg>
            Schema
          </Button>
        </div>
      )}

      <header className="mb-8 text-center pt-16">
        <h1 className="text-3xl font-bold mb-2">MarketAI Dashboard</h1>
        <p className="text-gray-500">Ask marketing questions in plain English, get SQL-powered answers</p>
        {user && (
          <p className="text-sm text-gray-500 mt-1">
            Logged in as: {user.email}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-4 mb-8">
        <div className="flex gap-2">
          <Input 
            value={question} 
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="How many customers are there in Chicago?" 
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={!isConnected || isLoading}
          />
          <Button onClick={handleSubmit} disabled={!isConnected || isLoading}>
            {isLoading ? "Processing..." : "Ask"}
          </Button>
        </div>
      </div>

      {/* Database Connection Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-xl w-full overflow-auto shadow-xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Connect to Database</h2>
              <p className="mb-4">Enter your PostgreSQL connection string:</p>
              
              <div className="mb-6">
                <Input 
                  type="text"
                  placeholder="postgres://username:password@localhost:5432/database_name"
                  value={connectionString}
                  onChange={(e) => setConnectionString(e.target.value)}
                  className="w-full mb-2"
                />
                <p className="text-xs text-gray-500">
                  Format: postgres://username:password@hostname:port/database_name
                </p>
              </div>
              
              <div className="flex gap-3 justify-end">
                <Button 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={connectToDatabase}
                  disabled={isLoading}
                  style={{ backgroundColor: "#10b981" }}
                >
                  {isLoading ? "Connecting..." : "Connect"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schema Dialog */}
      {isSchemaDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-auto">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-xl flex flex-col">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
                    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
                    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
                  </svg>
                  Database Schema
                </h2>
                
                <div className="flex gap-3">
                  <div className="bg-gray-100 rounded-lg p-1 flex">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        viewMode === 'list' 
                          ? 'bg-white shadow-sm font-medium' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Table View
                    </button>
                    <button
                      onClick={() => setViewMode('mindmap')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        viewMode === 'mindmap' 
                          ? 'bg-white shadow-sm font-medium' 
                          : 'text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Mindmap View
                    </button>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => setIsSchemaDialogOpen(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto">
              {viewMode === 'list' ? (
                <div className="p-6">
                  <p className="text-gray-600 mb-4">Tables found in your database:</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {parsedSchema.map((table, index) => (
                      <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
                        <div className="bg-gray-100 p-3 font-medium border-b flex items-center gap-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"></path>
                          </svg>
                          <span className="font-bold">{table.tableName}</span>
                        </div>
                        <div className="p-0">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                              <tr className="border-b">
                                <th className="p-2 text-left font-medium">Column</th>
                                <th className="p-2 text-left font-medium">Type</th>
                                <th className="p-2 text-center font-medium">Key</th>
                                <th className="p-2 text-center font-medium">Nullable</th>
                              </tr>
                            </thead>
                            <tbody>
                              {table.columns.map((column: any, colIndex: number) => (
                                <tr key={colIndex} className={colIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="p-2 border-t font-medium">{column.name}</td>
                                  <td className="p-2 border-t text-gray-600 font-mono text-xs">{column.type}</td>
                                  <td className="p-2 border-t text-center">
                                    {column.isPrimary && (
                                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800" title="Primary Key">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                                        </svg>
                                      </span>
                                    )}
                                  </td>
                                  <td className="p-2 border-t text-center">
                                    {column.isNullable ? 
                                      <span className="text-green-600">✓</span> : 
                                      <span className="text-red-600">✗</span>
                                    }
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div style={{ width: '100%', height: '70vh' }}>
                  {nodes.length > 0 ? (
                    <ReactFlow
                      nodes={nodes}
                      edges={edges}
                      onNodesChange={onNodesChange}
                      onEdgesChange={onEdgesChange}
                      fitView
                      attributionPosition="bottom-left"
                    >
                      <Controls />
                      <Background color="#f8fafc" gap={16} />
                    </ReactFlow>
                  ) : (
                    <div className="h-full flex items-center justify-center">
                      <p className="text-gray-500">No schema relationships detected</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p>{isConnected ? "Ask your first marketing question to get started!" : "Connect to the database first, then ask questions."}</p>
            <p className="text-sm mt-2">Example: "How many customers are there in Chicago?"</p>
          </div>
        ) : (
          results.map((result, index) => (
            <Card key={index} className="w-full">
              <CardHeader>
                <CardTitle>Result</CardTitle>
                <CardDescription className="font-medium text-lg">{result.answer}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">SQL Query</h3>
                    <Textarea 
                      value={result.query} 
                      readOnly 
                      className="font-mono text-sm bg-gray-50"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">Explanation</h3>
                    <p className="text-sm text-gray-600">{result.explanation}</p>
                  </div>
                  {result.data && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Query Result</h3>
                      <div className="text-sm font-mono bg-gray-50 p-4 rounded overflow-auto text-left whitespace-pre">
                        {JSON.stringify(result.data, null, 2)
                          .split('\n')
                          .map((line, i) => (
                            <div key={i} className="leading-relaxed">
                              {line}
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
