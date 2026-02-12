import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Package, AlertCircle, Clipboard, Calendar, CreditCard, Check, X } from 'lucide-react';

// Inline Mock Data
const mockOrders = [
  {
    id: '1',
    serial: '882190',
    date: '28 Feb 2024',
    time: '14:30',
    status: 'complete',
    pkg: 'Mobile Legends: 88 Diamonds',
    price: '৳150',
    paymentMethod: 'bKash',
  },
  {
    id: '2',
    serial: '882191',
    date: '27 Feb 2024',
    time: '09:15',
    status: 'pending',
    pkg: 'Free Fire: 520 Diamonds',
    price: '৳700',
    paymentMethod: 'Nagad',
  },
  {
    id: '3',
    serial: '882192',
    date: '25 Feb 2024',
    time: '18:45',
    status: 'rejected',
    pkg: 'PUBG Mobile: 660 UC',
    price: '৳1200',
    paymentMethod: 'Rocket',
  },
  {
    id: '4',
    serial: '882193',
    date: '20 Feb 2024',
    time: '11:20',
    status: 'processing',
    pkg: 'Steam Wallet $5',
    price: '৳500',
    paymentMethod: 'Wallet',
  }
];

const OrderTrackingPage: React.FC = () => {
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;

    setLoading(true);
    setError('');
    setOrderData(null);

    // Simulate API network delay
    setTimeout(() => {
      setLoading(false);
      
      // Find order in mock database
      const foundOrder = mockOrders.find(o => 
          o.serial.toString() === orderId.trim() || o.id.toString() === orderId.trim()
      );

      if (foundOrder) {
        setOrderData({
          id: foundOrder.serial,
          status: foundOrder.status, // complete, pending, processing, rejected
          date: foundOrder.date,
          time: foundOrder.time,
          items: foundOrder.pkg,
          amount: foundOrder.price,
          paymentMethod: foundOrder.paymentMethod
        });
      } else {
        setError('Order not found. Please check your Order ID.');
      }
    }, 800);
  };
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const numericText = text.replace(/[^0-9]/g, '');
      if (numericText) {
          setOrderId(numericText);
          setError('');
      } else {
           setError("Clipboard does not contain any numbers.");
      }
    } catch (err) {
      console.warn('Clipboard access failed:', err);
      setError("Unable to access clipboard automatically. Please paste manually.");
    }
  };

  const getStatusStep = (status: string) => {
    switch(status.toLowerCase()) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'complete': 
      case 'completed': 
      case 'rejected': return 3;
      default: return 0;
    }
  };

  const step = orderData ? getStatusStep(orderData.status) : 0;
  const isRejected = orderData?.status.toLowerCase() === 'rejected';

  // Calculate width for the progress line
  const progressWidth = step === 1 ? '0%' : step === 2 ? '50%' : '100%';
  
  // Theme color based on rejection status
  const activeColor = isRejected ? 'bg-red-600' : 'bg-indigo-600';
  const activeText = isRejected ? 'text-red-600' : 'text-indigo-600';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 min-h-[70vh]">
       
       {/* Header Section */}
       <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
             <Package size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Track Order</h2>
             <p className="text-slate-500 text-sm font-medium">Check the status of your purchase</p>
          </div>
       </div>

       {/* Search Card */}
       <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-8 max-w-2xl mx-auto">
             <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-2">
                 <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Enter Order ID (e.g. 882190)"
                        className="block w-full pl-11 pr-12 py-3 text-slate-800 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all font-bold text-base placeholder-slate-400"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                    />
                    <button 
                        type="button"
                        onClick={handlePaste}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-indigo-600 transition-colors"
                        title="Paste Number"
                    >
                        <Clipboard size={18} />
                    </button>
                 </div>
                 <button 
                     type="submit"
                     disabled={loading}
                     className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-lg shadow-lg shadow-indigo-200 transition-all active:scale-95 disabled:opacity-70 disabled:active:scale-100 flex items-center justify-center gap-2 min-w-[140px]"
                 >
                     {loading ? (
                         <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                     ) : (
                         <>Track</>
                     )}
                 </button>
             </form>
       </div>

       {/* Error Message */}
       {error && (
            <div className="max-w-2xl mx-auto mb-8 animate-in fade-in slide-in-from-top-2">
                <div className="p-4 bg-red-50 text-red-600 rounded-xl flex items-center justify-center gap-2 text-sm font-bold border border-red-100 shadow-sm">
                    <AlertCircle size={18} />
                    {error}
                </div>
            </div>
        )}

       {/* Result Card */}
       {orderData && (
         <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-500">
            
            {/* Header Row */}
            <div className="bg-gray-50/80 border-b border-gray-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center border border-gray-200 shadow-sm text-indigo-500">
                         <Package size={20} />
                    </div>
                    <div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Order Serial</div>
                        <div className="text-lg font-black text-slate-800 tracking-tight font-mono">#{orderData.id}</div>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                     <Calendar size={14} className="text-slate-400" />
                     <span className="text-xs font-bold text-slate-700">{orderData.date}, {orderData.time}</span>
                </div>
            </div>

            <div className="p-6 md:p-8">
                {/* Progress Stepper */}
                <div className="relative mb-10 mx-2 md:mx-6">
                    {/* Background Line */}
                    <div className="absolute top-4 left-0 w-full h-1.5 bg-slate-100 rounded-full"></div>
                    
                    {/* Active Progress Line */}
                    <div 
                        className={`absolute top-4 left-0 h-1.5 rounded-full transition-all duration-1000 ease-out ${activeColor}`} 
                        style={{ width: progressWidth }}
                    ></div>

                    {/* Steps Row */}
                    <div className="relative flex justify-between w-full">
                        
                        {/* Step 1: Pending */}
                        <div className="flex flex-col items-center group w-1/3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors duration-500 ${step >= 1 ? activeColor : 'bg-slate-200'}`}>
                                <Check size={14} className="text-white" strokeWidth={4} />
                            </div>
                            <span className="mt-3 font-bold text-slate-800 text-xs md:text-sm text-center">Placed</span>
                        </div>

                        {/* Step 2: Processing */}
                        <div className="flex flex-col items-center group w-1/3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors duration-500 ${step >= 2 ? activeColor : 'bg-slate-200'}`}>
                                <Check size={14} className="text-white" strokeWidth={4} />
                            </div>
                            <span className="mt-3 font-bold text-slate-800 text-xs md:text-sm text-center">Processing</span>
                        </div>

                        {/* Step 3: Delivered/Rejected */}
                        <div className="flex flex-col items-center group w-1/3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center border-4 border-white shadow-sm z-10 transition-colors duration-500 ${step >= 3 ? activeColor : 'bg-slate-200'}`}>
                                {isRejected ? <X size={14} className="text-white" strokeWidth={4} /> : <Check size={14} className="text-white" strokeWidth={4} />}
                            </div>
                            <span className={`mt-3 font-bold text-xs md:text-sm text-center ${isRejected ? 'text-red-600' : 'text-slate-800'}`}>
                                {isRejected ? 'Rejected' : 'Complete'}
                            </span>
                        </div>

                    </div>
                </div>

                {/* Details Grid */}
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Package Item</span>
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-slate-500">
                                    <Package size={16} />
                                </div>
                                <p className="font-bold text-slate-800 text-sm leading-tight">{orderData.items}</p>
                            </div>
                        </div>

                        <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1.5">Payment</span>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 text-slate-500">
                                        <CreditCard size={16} />
                                    </div>
                                    <span className="font-bold text-slate-700 text-sm capitalize">{orderData.paymentMethod}</span>
                                </div>
                                <div className={`text-lg font-black ${activeText}`}>
                                    {orderData.amount}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
                <p className="text-slate-500 text-xs">
                    Issue with this order? 
                    <button 
                        onClick={() => navigate('/support')}
                        className="text-indigo-600 font-bold hover:underline ml-1"
                    >
                        Contact Support
                    </button>
                </p>
            </div>
         </div>
       )}
    </div>
  );
};

export default OrderTrackingPage;
