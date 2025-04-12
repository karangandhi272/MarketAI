import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
      <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-6">
        <span className="text-5xl text-gray-400">404</span>
      </div>
      
      <h1 className="text-4xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-600 mb-8">Sorry, we couldn't find the page you're looking for.</p>
      
      <div className="space-x-4">
        <Button asChild>
          <Link to="/">Go to Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/app/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
