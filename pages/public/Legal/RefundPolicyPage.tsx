import React from 'react';
import { RefreshCcw, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

export const RefundPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 text-indigo-600 mb-4">
            <RefreshCcw size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Refund Policy</h1>
        <p className="text-slate-500 font-medium mt-2">Clear guidelines on returns and refunds.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8 text-slate-600 leading-relaxed">
        
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-5 flex gap-4">
             <AlertCircle size={24} className="text-amber-600 flex-shrink-0 mt-0.5" />
             <div>
                 <h3 className="font-bold text-amber-800 mb-1">Important Note</h3>
                 <p className="text-amber-700/80 text-sm">
                    Due to the nature of digital goods, we generally do not offer refunds once the product has been delivered or the code has been viewed. Please read the conditions below carefully.
                 </p>
             </div>
        </div>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
             <CheckCircle2 size={24} className="text-emerald-500" /> Eligible for Refund
          </h2>
          <ul className="space-y-3 pl-2">
             <li className="flex gap-3 items-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2"></div>
                 <p><strong className="text-slate-800">Order not completed:</strong> If we fail to deliver your order within 24 hours (for standard items) and you wish to cancel.</p>
             </li>
             <li className="flex gap-3 items-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2"></div>
                 <p><strong className="text-slate-800">Out of Stock:</strong> If you paid for an item that is currently out of stock and do not wish to wait.</p>
             </li>
             <li className="flex gap-3 items-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2"></div>
                 <p><strong className="text-slate-800">Technical Error:</strong> If a system error caused double payment for a single order.</p>
             </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
             <XCircle size={24} className="text-red-500" /> Not Eligible for Refund
          </h2>
          <ul className="space-y-3 pl-2">
             <li className="flex gap-3 items-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2"></div>
                 <p><strong className="text-slate-800">Wrong Player ID:</strong> If you provided an incorrect Player ID/UID and the top-up was sent to that account, we cannot reverse it.</p>
             </li>
             <li className="flex gap-3 items-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2"></div>
                 <p><strong className="text-slate-800">Change of Mind:</strong> Once a digital code is delivered, it is considered consumed.</p>
             </li>
             <li className="flex gap-3 items-start">
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2"></div>
                 <p><strong className="text-slate-800">Region Lock:</strong> If you bought a voucher for a region different from your account (e.g., buying a US card for a Global account).</p>
             </li>
          </ul>
        </section>

        <section className="pt-4 border-t border-gray-100">
           <h2 className="text-xl font-bold text-slate-900 mb-3">Refund Process</h2>
           <p className="mb-3">
              To request a refund, please contact our support team via WhatsApp or Email with your <strong>Order Serial Number</strong> and payment proof.
           </p>
           <p className="text-sm bg-gray-50 p-3 rounded-lg border border-gray-100 inline-block">
              Refunds are processed to your original payment method (Wallet/bKash/Nagad) within 3-7 business days.
           </p>
        </section>

      </div>
    </div>
  );
};