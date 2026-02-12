import React from 'react';
import { Cookie, Settings, BarChart3, Shield } from 'lucide-react';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 text-indigo-600 mb-4">
            <Cookie size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Cookie Policy</h1>
        <p className="text-slate-500 font-medium mt-2">How we use cookies to improve experience.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8 text-slate-600 leading-relaxed">
        
        <section>
           <h2 className="text-xl font-bold text-slate-900 mb-3">What Are Cookies</h2>
           <p>
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
           </p>
        </section>

        <section>
           <h2 className="text-xl font-bold text-slate-900 mb-6">How RIYAL Games Uses Cookies</h2>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
                   <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                           <Shield size={18} />
                       </div>
                       <h3 className="font-bold text-slate-900">Essential Cookies</h3>
                   </div>
                   <p className="text-sm">Necessary for the website to function properly, such as secure login and maintaining your cart session.</p>
               </div>

               <div className="p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
                   <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                           <Settings size={18} />
                       </div>
                       <h3 className="font-bold text-slate-900">Preferences</h3>
                   </div>
                   <p className="text-sm">We use these to remember your settings and preferences to provide a personalized experience.</p>
               </div>

               <div className="p-4 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
                   <div className="flex items-center gap-3 mb-2">
                       <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                           <BarChart3 size={18} />
                       </div>
                       <h3 className="font-bold text-slate-900">Analytics</h3>
                   </div>
                   <p className="text-sm">We use analytics cookies to understand how visitors interact with the website and to improve our services.</p>
               </div>
           </div>
        </section>

        <section>
           <h2 className="text-xl font-bold text-slate-900 mb-3">Your Choices</h2>
           <p>
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
           </p>
        </section>

      </div>
    </div>
  );
};