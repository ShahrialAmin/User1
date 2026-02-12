import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, Check } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

export const LoginForm: React.FC<Props> = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <>
      <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all mb-6 group text-sm shadow-sm">
         <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
         <span>Continue with Google</span>
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-[11px] uppercase">
          <span className="px-3 bg-white text-slate-400 font-bold tracking-widest">Or Login With</span>
        </div>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Email Address</label>
          <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} strokeWidth={2.5} />
              </div>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="block w-full pl-11 pr-4 py-3.5 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
              />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 ml-1">Password</label>
          <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Lock size={18} strokeWidth={2.5} />
              </div>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
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

        <div className="flex items-center justify-between px-1">
          <label className="flex items-center gap-2 cursor-pointer group select-none">
            <div className="relative flex items-center">
              <input 
                type="checkbox" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-slate-300 bg-slate-50 checked:bg-indigo-600 checked:border-indigo-600 transition-all hover:border-indigo-400 focus:ring-2 focus:ring-indigo-600/20" 
              />
              <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity">
                <Check size={12} strokeWidth={4} />
              </div>
            </div>
            <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-700 transition-colors uppercase tracking-wider">Remember Me</span>
          </label>
          <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</a>
        </div>

        <div className="pt-2 space-y-3">
            <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide"
            >
              Sign In <ArrowRight size={18} strokeWidth={2.5} />
            </button>
            
            <button 
              type="button"
              onClick={onLogin}
              className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 transition-all transform active:scale-[0.98] text-sm tracking-wide"
            >
              User Demo Login
            </button>

            <a 
              href="/admin/index.html"
              target="_self"
              className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl transition-all transform active:scale-[0.98] text-sm tracking-wide flex items-center justify-center gap-2 group"
            >
              <ShieldCheck size={18} className="text-slate-400 group-hover:text-indigo-600 transition-colors" /> 
              <span>Admin Dashboard Demo</span>
            </a>
        </div>
      </form>
    </>
  );
};