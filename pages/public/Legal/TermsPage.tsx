import React from 'react';
import { FileText, ShieldCheck } from 'lucide-react';

const TermsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 text-indigo-600 mb-4">
            <FileText size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Terms & Conditions</h1>
        <p className="text-slate-500 font-medium mt-2">Last updated: March 01, 2024</p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8 text-slate-600 leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h2>
          <p>
            Welcome to <span className="font-bold text-indigo-600">RIYAL Games</span>. These terms and conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use RIYAL Games if you do not agree to take all of the terms and conditions stated on this page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">2. Account Responsibilities</h2>
          <p className="mb-2">
            When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
          </p>
          <ul className="list-disc pl-5 space-y-1 bg-slate-50 p-4 rounded-xl border border-gray-100">
             <li>You are responsible for safeguarding the password that you use to access the Service.</li>
             <li>You agree not to disclose your password to any third party.</li>
             <li>You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">3. Payment & Purchases</h2>
          <p>
            All purchases made through our platform are final. We support various payment methods including bKash, Nagad, and Rocket. You agree to provide current, complete, and accurate purchase and account information for all purchases made via our store.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">4. Digital Goods</h2>
          <p>
            For digital products (Game Top-ups, Vouchers, Gift Cards), delivery is usually instant or within the stated timeframe. Once the digital code or top-up has been delivered/redeemed, it cannot be returned or refunded unless there is a technical error on our part.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">5. User Conduct</h2>
          <p>
            You agree not to use the website for any unlawful purpose or any purpose prohibited under this clause. You agree not to use the website in any way that could damage the website, the services, or the general business of RIYAL Games.
          </p>
        </section>

        <div className="pt-6 border-t border-gray-100">
           <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-indigo-800 text-sm font-medium">
              <ShieldCheck size={20} className="flex-shrink-0" />
              <p>By using our services, you acknowledge that you have read and understood these Terms.</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
