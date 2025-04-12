import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to login page with signup tab active
    // In a real implementation, you'd use a state management solution or URL parameters
    localStorage.setItem('authTab', 'signup');
    navigate('/login');
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p>Redirecting to registration form...</p>
    </div>
  );
};

export default RegisterPage;
