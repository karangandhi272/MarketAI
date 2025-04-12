import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StripePayment from '../components/payment/StripePayment';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    // Retrieve email from localStorage
    const storedEmail = localStorage.getItem('registrationEmail');
    if (!storedEmail) {
      // If no email is found, redirect to registration
      navigate('/register');
      return;
    }
    
    setEmail(storedEmail);
  }, [navigate]);
  
  const handlePaymentSuccess = () => {
    // Clear the stored email
    localStorage.removeItem('registrationEmail');
    // Redirect to the app dashboard
    navigate('/app/dashboard');
  };
  
  const handleCancel = () => {
    navigate('/login');
  };
  
  if (!email) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <a href="/" className="flex items-center justify-center mb-8">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="ml-2 text-2xl font-bold text-gray-800">MarketAI</span>
        </a>
        
        <StripePayment 
          email={email} 
          onSuccess={handlePaymentSuccess}
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
};

export default PaymentPage;
