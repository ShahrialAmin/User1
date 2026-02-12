import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import { LoginForm } from '../../../features/auth/components';
import { useAuthStore } from '../../../store/useAuthStore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuthStore();
  
  // Ensure we start at the top of the page when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get the redirect path and state from location state
  const locationState = location.state as { from?: { pathname: string; state?: any } } | null;
  const fromPath = locationState?.from?.pathname || '/dashboard/profile';
  const fromState = locationState?.from?.state;

  const handleLogin = () => {
    login();
    // Redirect back to the original page (e.g., product detail or dashboard) with the preserved state
    navigate(fromPath, { replace: true, state: fromState });
    // Ensure we start at the top of the redirected page
    window.scrollTo(0, 0);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg shadow-indigo-100 border border-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-3">
             <LogIn size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Welcome Back</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Sign in to continue your gaming journey</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-white ring-1 ring-slate-100">
        <LoginForm onLogin={handleLogin} />
      </div>

      <div className="mt-8 text-center">
         <p className="text-slate-500 font-medium text-sm">
             Don't have an account? <Link to="/register" state={{ from: locationState?.from }} className="text-indigo-600 font-black hover:underline ml-1">Create Account</Link>
         </p>
      </div>
    </div>
  );
};

export default LoginPage;
