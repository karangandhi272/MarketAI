import { Pool } from 'pg';


let pool: Pool | null = null;

// Initialize connection pool
export const initializePool = (connectionString: string) => {
  try {
    pool = new Pool({
      connectionString,
    });
    return pool;
  } catch (error) {
    console.error('Error initializing database pool:', error);
    throw error;
  }
};

// Get database schema information
export const getSchemaInfo = async () => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }

  const query = `
    SELECT 
      t.table_name,
      string_agg(
        c.column_name || ' ' || c.data_type || 
        CASE WHEN c.is_nullable = 'NO' THEN ' NOT NULL' ELSE '' END, 
        ', '
      ) as column_details
    FROM 
      information_schema.tables t
    JOIN 
      information_schema.columns c ON t.table_name = c.table_name
    WHERE 
      t.table_schema = 'public'
    GROUP BY 
      t.table_name;
  `;

  try {
    const { rows } = await pool.query(query);
    return rows;
  } catch (error) {
    console.error('Error fetching schema info:', error);
    throw error;
  }
};

// Execute SQL query
export const executeQuery = async (query: string) => {
  if (!pool) {
    throw new Error('Database pool not initialized');
  }

  // Security check to prevent destructive operations
  const disallowedPatterns = /\b(drop|alter|create|insert|update|delete|truncate|grant|revoke)\b/i;
  if (disallowedPatterns.test(query)) {
    throw new Error('Query contains disallowed statements');
  }

  try {
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};
