import React, { useState } from 'react';
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-4 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-4 ring-emerald-50">
          <CheckCircle2 size={32} strokeWidth={3} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Check your email</h3>
        <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
          We have sent a password reset link to <br/>
          <span className="font-bold text-slate-800">{email}</span>
        </p>
        
        <div className="space-y-3">
            <button 
                onClick={() => window.open(`mailto:`, '_blank')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all transform active:scale-[0.98] text-sm"
            >
                Open Email App
            </button>
            <button 
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 font-bold py-3.5 rounded-xl transition-all text-sm"
            >
                Try another email
            </button>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100">
             <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                <ArrowLeft size={16} /> Back to Login
             </Link>
        </div>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
        {error && (
            <div className="bg-red-50 text-red-500 text-sm font-bold p-3 rounded-xl flex items-center gap-2 border border-red-100 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={18} className="flex-shrink-0" />
                {error}
            </div>
        )}

        <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 mb-2">
            <p className="text-xs text-indigo-800 font-medium leading-relaxed">
                Enter the email address associated with your account and we'll send you a link to reset your password.
            </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Email Address</label>
          <div className="relative group">
              <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-indigo-600'}`}>
                  <Mail size={18} strokeWidth={2.5} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                }}
                placeholder="Enter your email"
                className={`block w-full pl-11 pr-4 py-3.5 text-slate-900 bg-slate-50 border rounded-xl focus:outline-none focus:bg-white focus:ring-4 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-indigo-600 focus:ring-indigo-600/10'}`}
              />
          </div>
        </div>

        <div className="pt-2">
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                  <>Send Reset Link <ArrowRight size={18} strokeWidth={2.5} /></>
              )}
            </button>
        </div>

        <div className="text-center mt-4">
             <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors">
                <ArrowLeft size={16} /> Back to Login
             </Link>
        </div>
    </form>
  );
};