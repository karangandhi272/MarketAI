import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const TermsOfServicePage = () => {
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
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-blue max-w-none bg-white p-8 rounded-lg shadow-sm">
          <p className="text-gray-500 mb-6">Last updated: June 10, 2024</p>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Agreement to Terms</h2>
            <p>
              By accessing or using MarketAI's services, you agree to be bound by these Terms of Service. 
              If you disagree with any part of the terms, you may not access the service.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Subscription Terms</h2>
            <p>
              MarketAI offers a subscription-based service with the following terms:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                <strong>Free Trial:</strong> We offer a 14-day free trial to new users. No payment information is 
                required to start the trial.
              </li>
              <li>
                <strong>Subscription Fee:</strong> After the trial period, a monthly fee of $10 will be charged to 
                continue using the service.
              </li>
              <li>
                <strong>Billing Cycle:</strong> Billing occurs monthly on the same day of the month as your initial 
                subscription date.
              </li>
              <li>
                <strong>Cancellation:</strong> You may cancel your subscription at any time through your account settings. 
                Upon cancellation, you will have access to the service until the end of your current billing period.
              </li>
              <li>
                <strong>Refunds:</strong> We do not provide refunds for partial subscription periods.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Account Responsibilities</h2>
            <p>
              When you create an account with us, you must provide accurate, complete, and current information. 
              Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
            </p>
            <p className="mt-4">
              You are responsible for safeguarding the password used to access the service and for any activities 
              or actions under your password. We encourage you to use "strong" passwords (passwords that use a 
              combination of upper and lower case letters, numbers, and symbols) with your account.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Intellectual Property</h2>
            <p>
              The service and its original content, features, and functionality are and will remain the exclusive 
              property of MarketAI and its licensors. The service is protected by copyright, trademark, and other 
              laws of both the United States and foreign countries.
            </p>
            <p className="mt-4">
              Our trademarks and trade dress may not be used in connection with any product or service without 
              the prior written consent of MarketAI.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Database and Data Processing</h2>
            <p>
              When using our service to connect to your databases:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>
                You retain all rights to your database structure, content, and query results.
              </li>
              <li>
                You are responsible for ensuring you have appropriate rights to connect your database to our service.
              </li>
              <li>
                We process your database information solely to provide the requested services.
              </li>
              <li>
                We will not sell, rent, or lease your database information to third parties.
              </li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Limitation of Liability</h2>
            <p>
              In no event shall MarketAI, nor its directors, employees, partners, agents, suppliers, or affiliates, 
              be liable for any indirect, incidental, special, consequential or punitive damages, including without 
              limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 my-4 space-y-2">
              <li>Your access to or use of or inability to access or use the service</li>
              <li>Any conduct or content of any third party on the service</li>
              <li>Any content obtained from the service</li>
              <li>Unauthorized access, use, or alteration of your transmissions or content</li>
            </ul>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Disclaimer</h2>
            <p>
              Your use of the service is at your sole risk. The service is provided on an "AS IS" and "AS AVAILABLE" basis. 
              The service is provided without warranties of any kind, whether express or implied, including, but not limited 
              to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
            </p>
          </section>
          
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the State of California, 
              United States, without regard to its conflict of law provisions.
            </p>
            <p className="mt-4">
              Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
              If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
              of these Terms will remain in effect.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-4">Changes to Terms</h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
              If a revision is material, we will try to provide at least 30 days' notice prior to any new 
              terms taking effect. What constitutes a material change will be determined at our sole discretion.
            </p>
            <p className="mt-4">
              By continuing to access or use our service after those revisions become effective, you agree 
              to be bound by the revised terms. If you do not agree to the new terms, please stop using the service.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsOfServicePage;
