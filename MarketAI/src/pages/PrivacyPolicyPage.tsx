import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const PrivacyPolicyPage = () => {
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
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-500 mb-6">Last updated: June 10, 2024</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Introduction</h2>
            <p>
              MarketAI ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              service or visit our website.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Information We Collect</h2>
            <p>We collect several types of information from and about users of our services, including:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Personal Information:</strong> Email address, name, and payment information when you register 
                for an account or subscribe to our service.
              </li>
              <li>
                <strong>Database Connection Information:</strong> When you connect your database to our services, we 
                store connection strings (securely encrypted) and may temporarily process schema information and query results.
              </li>
              <li>
                <strong>Usage Data:</strong> Information on how you use the service, including queries submitted, 
                features used, and interaction patterns to improve our service.
              </li>
              <li>
                <strong>Device Information:</strong> Information about your device, IP address, browser type, and 
                operating system to optimize our service for your environment.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and manage your subscription</li>
              <li>Send you service-related communications</li>
              <li>Monitor and analyze usage patterns to enhance user experience</li>
              <li>Protect against unauthorized access and ensure service security</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to maintain the security 
              of your personal information. However, no method of transmission over the Internet or 
              electronic storage is 100% secure, so we cannot guarantee absolute security.
            </p>
            <p className="mt-4">
              Your database credentials are encrypted using industry-standard encryption methods and 
              are never stored in plaintext. Query results are processed in-memory and are not permanently 
              stored unless explicitly saved by you.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Third-Party Services</h2>
            <p>
              We use the following third-party services in providing our application:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li><strong>Supabase:</strong> For user authentication and data storage</li>
              <li><strong>Stripe:</strong> For processing payments and managing subscriptions</li>
              <li><strong>OpenAI:</strong> For AI functionality in our application</li>
            </ul>
            <p>
              Each of these services has their own privacy policies that govern how they process your data.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Your Data Rights</h2>
            <p>
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>The right to access your personal information</li>
              <li>The right to correct inaccurate information</li>
              <li>The right to delete your personal information</li>
              <li>The right to restrict or object to processing</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>
            <p>
              To exercise these rights, please contact us at privacy@marketai.com.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
            <p className="mt-4">
              You are advised to review this Privacy Policy periodically for any changes. Changes to this 
              Privacy Policy are effective when they are posted on this page.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@marketai.com
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
