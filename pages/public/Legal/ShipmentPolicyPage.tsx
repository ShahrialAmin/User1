import React from 'react';
import { Truck, Zap, Clock, AlertTriangle } from 'lucide-react';

export const ShipmentPolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 text-indigo-600 mb-4">
            <Truck size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Delivery Policy</h1>
        <p className="text-slate-500 font-medium mt-2">Information regarding digital product delivery.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8 text-slate-600 leading-relaxed">
        
        <section>
           <h2 className="text-xl font-bold text-slate-900 mb-3">Digital Delivery</h2>
           <p>
              Since <span className="font-bold">RIYAL Games</span> deals exclusively with digital goods (game credits, vouchers, subscriptions), there is no physical shipping involved. All items are delivered electronically to your user account or via email.
           </p>
        </section>

        <section>
           <h2 className="text-xl font-bold text-slate-900 mb-6">Delivery Timelines</h2>
           
           <div className="space-y-4">
               <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl border border-gray-100">
                   <div className="bg-yellow-100 text-yellow-600 p-2 rounded-lg flex-shrink-0">
                       <Zap size={20} fill="currentColor" />
                   </div>
                   <div>
                       <h3 className="font-bold text-slate-900">Instant Delivery</h3>
                       <p className="text-sm mt-1">
                          Items marked as "Instant" (Vouchers, Gift Cards, Automated Top-ups) are delivered within <strong>1-5 minutes</strong> of payment confirmation.
                       </p>
                   </div>
               </div>

               <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl border border-gray-100">
                   <div className="bg-blue-100 text-blue-600 p-2 rounded-lg flex-shrink-0">
                       <Clock size={20} />
                   </div>
                   <div>
                       <h3 className="font-bold text-slate-900">Manual Delivery</h3>
                       <p className="text-sm mt-1">
                          Items requiring manual processing (In-Game Login Top-ups, Special Packages) typically take <strong>10-60 minutes</strong>. In rare cases, it may take up to 24 hours.
                       </p>
                   </div>
               </div>
           </div>
        </section>

        <section>
           <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
               <AlertTriangle size={20} className="text-amber-500" /> Potential Delays
           </h2>
           <p className="mb-2">Delivery may be delayed due to the following reasons:</p>
           <ul className="list-disc pl-5 space-y-1">
               <li>Server maintenance of the specific game title.</li>
               <li>Incorrect Player ID provided by the user.</li>
               <li>Payment verification issues.</li>
               <li>Unforeseen technical issues with our suppliers.</li>
           </ul>
           <p className="mt-3">
               If you do not receive your order within the specified time, please check your "My Orders" page status or contact support.
           </p>
        </section>

      </div>
    </div>
  );
};