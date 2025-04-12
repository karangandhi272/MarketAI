import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';

const LoginPage = () => {
  const navigate = useNavigate();
  
  const handleAuthSuccess = () => {
    navigate('/app/dashboard');
  };
  
  const handleShowPayment = (email: string) => {
    // Store email in localStorage to retrieve it on the payment page
    localStorage.setItem('registrationEmail', email);
    navigate('/payment');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <a href="/" className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="ml-2 text-2xl font-bold text-gray-800">MarketAI</span>
        </a>
        
        <AuthForm 
          onSuccess={handleAuthSuccess} 
          onShowPayment={handleShowPayment} 
        />
        
        <p className="text-center mt-8 text-sm text-gray-500">
          By signing up, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and{' '}
          <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
