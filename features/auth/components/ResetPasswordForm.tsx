import React, { useState } from 'react';
import { Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const ResetPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Redirect to login after success animation
      setTimeout(() => {
          navigate('/login');
      }, 2000);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm ring-4 ring-emerald-50">
          <CheckCircle2 size={32} strokeWidth={3} />
        </div>
        <h3 className="text-xl font-black text-slate-900 mb-2">Password Reset Successful</h3>
        <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
          Your password has been updated. You will be redirected to login shortly.
        </p>
        <Link to="/login" className="text-indigo-600 font-bold hover:underline">
            Click here if not redirected
        </Link>
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
                Create a strong password to secure your account. It must be at least 6 characters long.
            </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">New Password</label>
          <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} strokeWidth={2.5} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="block w-full pl-11 pr-11 py-3.5 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Confirm Password</label>
          <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} strokeWidth={2.5} />
              </div>
              <input 
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="block w-full pl-11 pr-11 py-3.5 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
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
                  <>Reset Password <ArrowRight size={18} strokeWidth={2.5} /></>
              )}
            </button>
        </div>
    </form>
  );
};