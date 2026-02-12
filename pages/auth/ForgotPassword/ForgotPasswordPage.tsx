import React, { useEffect } from 'react';
import { KeyRound } from 'lucide-react';
import { ForgotPasswordForm } from '../../../features/auth/components';
export default ForgotPasswordPage;

const ForgotPasswordPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-8 min-h-[60vh] flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg shadow-indigo-100 border border-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-4">
             <KeyRound size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Forgot Password?</h1>
          <p className="text-slate-500 font-medium mt-2 text-sm max-w-xs mx-auto">Don't worry, it happens to the best of us.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/60 border border-white ring-1 ring-slate-100">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};
