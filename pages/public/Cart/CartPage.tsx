import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight, ArrowLeft, ShieldCheck, ImageOff } from 'lucide-react';
import { useCartStore } from '../../../store/useCartStore';
import { useAuthStore } from '../../../store/useAuthStore';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  
  const totalPrice = getTotalPrice();

  const handleCheckout = () => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: { pathname: '/cart' } } });
      return;
    }
    // Mock checkout flow
    alert(`Proceeding to payment for ৳${totalPrice}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6 text-slate-300">
          <ShoppingCart size={48} />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 font-medium text-center max-w-xs">
          Looks like you haven't added any game credits or vouchers yet.
        </p>
        <button 
          onClick={() => navigate('/store')} 
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-200 active:scale-95 flex items-center gap-2"
        >
          <ArrowLeft size={18} /> Go to Store
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
           <ShoppingCart size={24} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Shopping Cart</h2>
          <p className="text-slate-500 font-medium">{items.length} items in your cart</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-start sm:items-center group hover:border-indigo-600/20 transition-all">
              
              {/* Image */}
              <div className="w-20 h-20 bg-gray-50 rounded-xl flex-shrink-0 border border-gray-100 overflow-hidden relative">
                <img 
                  src={item.productImage} 
                  alt={item.productTitle} 
                  className="w-full h-full object-cover" 
                  onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'text-slate-300');
                      e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image-off"><line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.8" x2="15.8" y1="13.5" y2="11.5"/><line x1="15.8" x2="21" y1="11.5" y2="16.5"/><line x1="6" x2="6" y1="19" y2="16"/><path d="M4 4h.01"/><path d="M4 20h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.4"/></svg>';
                  }}
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 text-base leading-tight mb-1">{item.productTitle}</h3>
                <p className="text-indigo-600 font-bold text-sm mb-1">{item.packageName}</p>
                {item.playerId && (
                   <p className="text-xs text-slate-500 font-mono bg-slate-50 inline-block px-1.5 py-0.5 rounded border border-gray-100">
                      ID: {item.playerId}
                   </p>
                )}
              </div>

              {/* Controls */}
              <div className="flex flex-row sm:flex-col md:flex-row items-center justify-between w-full sm:w-auto gap-4 sm:gap-6 mt-2 sm:mt-0 border-t sm:border-t-0 border-gray-50 pt-3 sm:pt-0">
                
                {/* Quantity */}
                <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    disabled={item.quantity <= 1}
                    className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm border border-gray-200 text-slate-600 hover:text-red-500 disabled:opacity-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="font-bold text-slate-900 w-6 text-center text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    disabled={item.quantity >= 10}
                    className="w-7 h-7 flex items-center justify-center bg-white rounded shadow-sm border border-gray-200 text-slate-600 hover:text-green-600 disabled:opacity-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Price */}
                <div className="text-right min-w-[80px]">
                  <div className="font-black text-slate-900 text-lg">৳ {item.price * item.quantity}</div>
                  {item.quantity > 1 && (
                    <div className="text-[10px] text-slate-400 font-medium">৳ {item.price} each</div>
                  )}
                </div>

                {/* Remove */}
                <button 
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-24">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Order Summary</h3>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-slate-500 font-medium">
                <span>Subtotal</span>
                <span className="text-slate-900 font-bold">৳ {totalPrice}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 font-medium">
                <span>Service Fee</span>
                <span className="text-emerald-600 font-bold">Free</span>
              </div>
              <div className="pt-3 border-t border-gray-100 flex justify-between items-end">
                <span className="font-bold text-slate-900">Total</span>
                <span className="text-2xl font-black text-slate-900">৳ {totalPrice}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full bg-[#dc2625] hover:bg-[#b91c1c] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-200 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mb-4"
            >
              Checkout Now <ArrowRight size={18} />
            </button>

            <button 
              onClick={() => navigate('/store')}
              className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-slate-600 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm"
            >
              Continue Shopping
            </button>
            
            <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
                <ShieldCheck size={14} /> Safe & Secure Payment
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};