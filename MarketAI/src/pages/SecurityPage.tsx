import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const SecurityPage = () => {
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
        <h1 className="text-3xl font-bold mb-8">Security</h1>
        
        <div className="prose prose-blue max-w-none bg-white p-8 rounded-lg shadow-sm">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Our Security Commitment</h2>
            <p>
              At MarketAI, security is a top priority. We understand that you trust us with sensitive 
              database connections and query information. We take this responsibility seriously and have 
              implemented comprehensive security measures to protect your data.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Data Protection</h2>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Encryption:</strong> All data transmitted to and from our services is encrypted using TLS. 
                Database connection strings and credentials are encrypted at rest using AES-256 encryption.
              </li>
              <li>
                <strong>Database Connections:</strong> We use secure, read-only connections when possible and 
                never store your actual query results on our servers beyond the session in which they're used.
              </li>
              <li>
                <strong>Authentication:</strong> We implement secure authentication practices including password 
                hashing, multi-factor authentication options, and secure session management.
              </li>
              <li>
                <strong>Minimal Data Retention:</strong> We only retain the data necessary to provide our services 
                and continuously review our data retention policies.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Infrastructure Security</h2>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Cloud Security:</strong> Our application is hosted on secure cloud infrastructure with 
                industry-standard security controls.
              </li>
              <li>
                <strong>Network Protection:</strong> We implement firewalls, intrusion detection, and regular 
                security scanning to protect our networks.
              </li>
              <li>
                <strong>Regular Updates:</strong> We keep our systems and dependencies up to date with the latest 
                security patches.
              </li>
              <li>
                <strong>Access Controls:</strong> We implement strict access controls based on the principle of 
                least privilege. Only authorized personnel have access to production systems.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Secure Development Practices</h2>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Secure Coding:</strong> We follow secure coding practices and regularly review our code for security vulnerabilities.
              </li>
              <li>
                <strong>Regular Testing:</strong> We conduct regular security testing, including automated scanning and manual code reviews.
              </li>
              <li>
                <strong>Dependency Management:</strong> We carefully manage and audit our dependencies to minimize security risks.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Compliance</h2>
            <p>
              We design our systems with privacy and security regulations in mind. While we are continuously 
              working toward formal certifications, our practices are informed by industry standards such as:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>GDPR principles</li>
              <li>CCPA requirements</li>
              <li>OWASP security best practices</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Security Recommendations for Users</h2>
            <p>To maximize the security of your MarketAI experience, we recommend:</p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Use strong, unique passwords for your MarketAI account</li>
              <li>Consider creating read-only database users when connecting to MarketAI</li>
              <li>Regularly review your account activity</li>
              <li>Keep your browser and operating system updated</li>
              <li>Log out when using MarketAI on shared computers</li>
            </ul>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Reporting Security Issues</h2>
            <p>
              If you discover a security vulnerability or have concerns about the security of our services, 
              please contact us immediately at security@marketai.com.
            </p>
            <p className="mt-4">
              We appreciate responsible disclosure of security issues and will work quickly to address any valid concerns.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SecurityPage;
