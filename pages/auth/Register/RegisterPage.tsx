import React from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { RegisterForm } from '../../../features/auth/components';

export const RegisterPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-6">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg shadow-indigo-100 border border-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-3">
             <UserPlus size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Create Account</h1>
          <p className="text-slate-500 font-medium mt-1 text-sm">Join us and start shopping instantly</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-xl shadow-slate-200/60 border border-white ring-1 ring-slate-100">
        <RegisterForm />
      </div>

      <div className="mt-8 text-center">
         <p className="text-slate-500 font-medium text-sm">
             Already have an account? <Link to="/login" className="text-indigo-600 font-black hover:underline ml-1">Login Now</Link>
         </p>
      </div>
    </div>
  );
};