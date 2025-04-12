import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-bold text-xl text-gray-800">MarketAI</span>
          </Link>
          <Button asChild variant="outline">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <section className="bg-white rounded-xl overflow-hidden shadow-sm mb-12">
          <div className="md:flex">
            <div className="md:w-1/3 bg-gradient-to-br from-blue-500 to-indigo-600 p-8 text-white">
              <h1 className="text-3xl font-bold mb-4">About MarketAI</h1>
              <p className="text-blue-100">
                Transforming marketing analytics with the power of AI and natural language
              </p>
            </div>
            <div className="md:w-2/3 p-8">
              <p className="text-gray-600 mb-4">
                MarketAI was founded with a simple but powerful mission: make database-driven 
                marketing insights accessible to everyone, regardless of their technical background.
              </p>
              <p className="text-gray-600">
                Our platform allows marketers, analysts, and business owners to ask questions in 
                plain English and get powerful SQL-driven answers from their own data, without 
                writing a single line of code.
              </p>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-xl overflow-hidden shadow-sm mb-12">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Meet the Founder</h2>
            
            <div className="md:flex items-start gap-8">
              <div className="md:w-1/4 mb-6 md:mb-0">
                <div className="bg-gray-200 rounded-lg aspect-square mb-4 overflow-hidden">
                  {/* Placeholder for founder image */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-indigo-600/20 flex items-center justify-center">
                    <span className="text-5xl font-bold text-gray-400">KG</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold">Karan Gandhi</h3>
                <p className="text-gray-500">Founder & CEO</p>
              </div>
              
              <div className="md:w-3/4">
                <p className="text-gray-600 mb-4">
                  Karan Gandhi founded MarketAI after experiencing firsthand the challenges marketers face 
                  when trying to extract insights from complex databases. With a background in both computer 
                  science and marketing analytics, Karan recognized that there was a significant gap between 
                  the data companies collect and their ability to use it effectively.
                </p>
                <p className="text-gray-600 mb-4">
                  Prior to founding MarketAI, Karan worked as a data scientist at several tech companies where 
                  he saw marketing teams struggle to get timely answers to their questions. He realized that 
                  the bottleneck wasn't the availability of data, but rather the technical expertise required 
                  to query and analyze it effectively.
                </p>
                <p className="text-gray-600 mb-4">
                  "I kept seeing the same pattern: marketing teams would wait days or weeks for engineering 
                  resources to help them run queries, or they'd make decisions based on limited information 
                  because they couldn't access the data they needed," says Karan. "MarketAI was born from the 
                  idea that AI could bridge this gap, allowing marketers to ask questions in plain English and 
                  get immediate, data-driven answers."
                </p>
                <p className="text-gray-600">
                  Karan holds a degree in Computer Science from Stanford University and has previously built 
                  analytics tools used by marketing teams at several Fortune 500 companies. When not working 
                  on MarketAI, Karan enjoys hiking, playing chess, and mentoring aspiring entrepreneurs.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="bg-white rounded-xl overflow-hidden shadow-sm">
          <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Our Values</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Accessibility</h3>
                <p className="text-gray-600">
                  We believe powerful data insights should be accessible to everyone, not just those with technical backgrounds.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Accuracy</h3>
                <p className="text-gray-600">
                  We're committed to providing accurate, reliable insights that you can trust to make important business decisions.
                </p>
              </div>
              
              <div className="p-6 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Security</h3>
                <p className="text-gray-600">
                  Your data security is paramount. We implement industry-leading security practices to protect your information.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
