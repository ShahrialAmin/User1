import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ArrowRight, AlertCircle, PlayCircle, ShieldCheck, Banknote, History } from 'lucide-react';
import { useAuthStore } from '../../../store/useAuthStore';

const AddMoneyPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const { updateBalance } = useAuthStore();
  
  const presets = [100, 500, 1000, 2000, 5000];

  const handleAddMoney = () => {
    const value = parseFloat(amount);
    if (!isNaN(value) && value > 0) {
      // Simulate redirection to payment gateway
      alert(`Redirecting to Payment Gateway to pay ৳${value}...`);
      
      // For demo purposes, we'll update the balance after "payment"
      // In a real app, this would happen via webhook after gateway success
      setTimeout(() => {
          updateBalance(value);
          alert(`Payment Successful! ৳${value} added to your wallet.`);
          setAmount('');
      }, 1000);
    } else {
      alert('Please enter a valid positive amount.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
             <Wallet size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Add Money</h2>
            <p className="text-slate-500 font-medium">Top up your wallet instantly</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Input Form */}
        <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <Banknote size={20} className="text-slate-400"/> Enter Amount
                </h3>

                {/* Amount Input */}
                <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-2xl font-black text-slate-300">৳</span>
                    </div>
                    <input 
                      type="number" 
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="block w-full pl-10 pr-4 py-4 text-3xl font-black text-slate-900 bg-gray-50 border border-transparent rounded-xl focus:outline-none focus:bg-white focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 transition-all placeholder-gray-300"
                    />
                </div>

                {/* Presets */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">
                    {presets.map((val) => (
                        <button
                           key={val}
                           onClick={() => setAmount(val.toString())}
                           className={`py-2 px-1 rounded-xl text-sm font-bold border transition-all active:scale-95 ${
                               amount === val.toString()
                               ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200'
                               : 'bg-white text-slate-600 border-gray-100 hover:border-indigo-600 hover:text-indigo-600'
                           }`}
                        >
                            {val}
                        </button>
                    ))}
                </div>

                <button 
                  onClick={handleAddMoney}
                  disabled={!amount}
                  className="w-full bg-[#dc2625] hover:bg-[#b91c1c] text-white font-bold py-4 rounded-xl shadow-lg shadow-red-200 transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                    Pay Now <ArrowRight size={20} />
                </button>

                <div className="mt-8 flex flex-col items-center gap-4 pt-6 border-t border-gray-50">
                    <Link 
                        to="/dashboard/transactions" 
                        className="flex items-center gap-2 px-6 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-all"
                    >
                        <History size={16} /> View Transaction History
                    </Link>
                    <p className="text-xs font-bold text-slate-400 flex items-center gap-1">
                        <ShieldCheck size={14} /> 100% Secure Payment Gateway
                    </p>
                </div>
            </div>
        </div>

        {/* Right Column: Instructions */}
        <div className="lg:col-span-1 space-y-4">
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <PlayCircle size={20} />
                    </div>
                    <h3 className="font-bold text-slate-800">Process</h3>
                </div>
                <div className="space-y-4">
                     <div className="flex gap-3">
                         <span className="w-6 h-6 rounded-full bg-white text-blue-600 font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">1</span>
                         <p className="text-sm text-slate-600 font-medium leading-tight">Enter top-up amount</p>
                     </div>
                     <div className="flex gap-3">
                         <span className="w-6 h-6 rounded-full bg-white text-blue-600 font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">2</span>
                         <p className="text-sm text-slate-600 font-medium leading-tight">Pay via secure gateway</p>
                     </div>
                     <div className="flex gap-3">
                         <span className="w-6 h-6 rounded-full bg-white text-blue-600 font-bold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">3</span>
                         <p className="text-sm text-slate-600 font-medium leading-tight">Balance updates instantly</p>
                     </div>
                </div>
            </div>

            <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100">
                 <div className="flex items-start gap-3">
                    <AlertCircle className="text-amber-600 flex-shrink-0" size={18} />
                    <div>
                        <h4 className="font-bold text-amber-800 text-xs mb-1">Minimum Deposit</h4>
                        <p className="text-amber-700/80 text-[10px] leading-tight font-medium">
                            Minimum deposit amount is 50 BDT.
                        </p>
                    </div>
                 </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default AddMoneyPage;
