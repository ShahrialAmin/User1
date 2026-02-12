import React, { useState } from 'react';
import { User, Mail, Phone, Lock, ArrowRight, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check empty
    if (!formData.name || !formData.phone || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Please fill in all fields.');
        return;
    }

    // Check email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('Please enter a valid email address.');
        return;
    }

    // Check phone (simple length check for example)
    if (formData.phone.length < 11) {
        setError('Please enter a valid phone number.');
        return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
    }

    // Check password strength (optional, but good for UX)
    if (formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        return;
    }

    // Success simulation
    alert('Registration Successful! (Simulation)');
  };

  return (
    <>
      <button className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 text-slate-700 font-bold py-3 rounded-xl transition-all mb-6 group text-sm shadow-sm">
         <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
         <span>Sign up with Google</span>
      </button>

      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-200"></div>
        </div>
        <div className="relative flex justify-center text-[11px] uppercase">
          <span className="px-3 bg-white text-slate-400 font-bold tracking-widest">Or Register With</span>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
            <div className="bg-red-50 text-red-500 text-sm font-bold p-3 rounded-xl flex items-center gap-2 border border-red-100 animate-in fade-in slide-in-from-top-1">
                <AlertCircle size={18} className="flex-shrink-0" />
                {error}
            </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Full Name</label>
          <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <User size={18} strokeWidth={2.5} />
              </div>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="block w-full pl-11 pr-4 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
              />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Phone Number</label>
          <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Phone size={18} strokeWidth={2.5} />
              </div>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
                className="block w-full pl-11 pr-4 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
              />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Email Address</label>
          <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                  <Mail size={18} strokeWidth={2.5} />
              </div>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="block w-full pl-11 pr-4 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
              />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Password</label>
              <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <Lock size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="block w-full pl-11 pr-10 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
              </div>
          </div>

          <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5 ml-1">Confirm</label>
              <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
                      <Lock size={18} strokeWidth={2.5} />
                  </div>
                  <input 
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm"
                    className="block w-full pl-11 pr-10 py-3 text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all font-bold text-sm placeholder:text-slate-400 placeholder:font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                  >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
              </div>
          </div>
        </div>

        <div className="pt-2">
          <button 
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 text-sm tracking-wide"
          >
              Create Account <ArrowRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </form>
    </>
  );
};