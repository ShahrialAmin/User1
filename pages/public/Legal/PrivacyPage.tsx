import React from 'react';
import { Lock, Eye, Database, Share2 } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 text-indigo-600 mb-4">
            <Lock size={32} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Privacy Policy</h1>
        <p className="text-slate-500 font-medium mt-2">Your privacy is important to us.</p>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100 space-y-8 text-slate-600 leading-relaxed">
        
        <p className="text-lg">
           At <span className="font-bold text-slate-900">RIYAL Games</span>, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by RIYAL Games and how we use it.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                        <Database size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900">Information We Collect</h3>
                </div>
                <p className="text-sm">
                    We collect personal identification information such as your Name, Email Address, and Phone Number when you register. We also collect transaction details required to process your orders.
                </p>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-gray-100">
                 <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-indigo-600 shadow-sm">
                        <Eye size={20} />
                    </div>
                    <h3 className="font-bold text-slate-900">How We Use Information</h3>
                </div>
                <p className="text-sm">
                    We use the collected data to provide and maintain our Service, notify you about changes, allow you to participate in interactive features, and provide customer support.
                </p>
            </div>
        </div>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Log Files</h2>
          <p>
            RIYAL Games follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
             <Share2 size={20} className="text-slate-400" /> Third Party Privacy Policies
          </h2>
          <p>
            RIYAL Games's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-3">Security of Data</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
          </p>
        </section>

      </div>
    </div>
  );
};