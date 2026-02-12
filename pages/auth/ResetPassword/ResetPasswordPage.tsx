import React, { useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { ResetPasswordForm } from '../../../features/auth/components';

export const ResetPasswordPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-md mx-auto px-4 py-8 min-h-[60vh] flex flex-col justify-center">
      {/* Header */}
      <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-lg shadow-indigo-100 border border-indigo-50 flex items-center justify-center text-indigo-600 mx-auto mb-4">
             <ShieldCheck size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Set New Password</h1>
          <p className="text-slate-500 font-medium mt-2 text-sm max-w-xs mx-auto">Please enter a new password for your account.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl shadow-slate-200/60 border border-white ring-1 ring-slate-100">
        <ResetPasswordForm />
      </div>
    </div>
  );
};