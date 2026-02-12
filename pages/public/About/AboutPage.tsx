import React from 'react';
import { Target, Users, Award, Info } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
             <Info size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">About Us</h2>
            <p className="text-slate-500 font-medium">Get to know the team behind RIYAL Games</p>
          </div>
      </div>

      <div className="space-y-6">
        {/* Main Intro Card */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-gray-100">
             <h3 className="text-xl font-bold text-slate-900 mb-4">Who We Are</h3>
             <p className="text-slate-600 leading-relaxed text-lg">
                Welcome to <span className="font-bold text-indigo-600">RIYAL Games</span>, the most trusted and fastest-growing digital goods marketplace. We specialize in providing instant top-ups, game credits, and premium subscriptions.
             </p>
        </div>

        {/* Mission/Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {/* Card 1 */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-indigo-600/30 transition-colors group">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-blue-100">
                   <Target size={28} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Our Mission</h3>
                <p className="text-slate-500 text-sm leading-relaxed">To provide a seamless, secure, and instant top-up experience for gamers worldwide.</p>
             </div>

             {/* Card 2 */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-indigo-600/30 transition-colors group">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-emerald-100">
                   <Users size={28} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Community</h3>
                <p className="text-slate-500 text-sm leading-relaxed">Trusted by over 10,000+ gamers and users across the country for their daily digital needs.</p>
             </div>

             {/* Card 3 */}
             <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:border-indigo-600/30 transition-colors group">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-amber-100">
                   <Award size={28} />
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">Excellence</h3>
                <p className="text-slate-500 text-sm leading-relaxed">We pride ourselves on 24/7 support and delivery speeds that set industry standards.</p>
             </div>
        </div>

        {/* Bottom Section (Why Choose Us & Services) - Split Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    Why Choose Us?
                </h3>
                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                    At RIYAL Games, we understand the frustration of waiting. That's why we have built an automated system that delivers 
                    Direct Top-ups within seconds and ID Code based top-ups within minutes. We support all major local payment methods, ensuring you can pay with ease.
                </p>
            </div>

            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                    Our Services
                </h3>
                <ul className="space-y-3">
                    {[
                        "Free Fire Diamond Top Up (ID Code & In-Game)",
                        "PUBG Mobile UC Top Up",
                        "Premium App Subscriptions",
                        "Social Media Boosting Services",
                        "Gift Cards & Vouchers"
                    ].map((item, idx) => (
                        <li key={idx} className="flex items-center gap-3 text-slate-600 text-sm md:text-base">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600"></div>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

      </div>
    </div>
  );
};