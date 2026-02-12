import React from 'react';
import { MapPin, Clock, Headset, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const contactMethods = [
    {
      id: 'whatsapp',
      title: 'WhatsApp Support',
      desc: 'Chat with our support team instantly',
      icon: <i className="fa-brands fa-whatsapp text-2xl"></i>,
      action: 'Chat Now',
      color: 'bg-[#25D366]',
      hover: 'hover:bg-[#20bd5a]',
      shadow: 'shadow-[#25D366]/20',
      iconBg: 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20',
      link: 'https://wa.me/8801776927073'
    },
    {
      id: 'telegram',
      title: 'Telegram Channel',
      desc: 'Join for latest updates & offers',
      icon: <i className="fa-brands fa-telegram text-2xl"></i>,
      action: 'Join Now',
      color: 'bg-[#2EA6DA]',
      hover: 'hover:bg-[#2495c6]',
      shadow: 'shadow-[#2EA6DA]/20',
      iconBg: 'bg-[#2EA6DA]/10 text-[#2EA6DA] border-[#2EA6DA]/20',
      link: 'https://t.me/riyal_games'
    },
    {
      id: 'messenger',
      title: 'Messenger',
      desc: 'Connect via Facebook Messenger',
      icon: <i className="fa-brands fa-facebook-messenger text-2xl"></i>,
      action: 'Start Chat',
      color: 'bg-[#0084FF]',
      hover: 'hover:bg-[#0078e6]',
      shadow: 'shadow-[#0084FF]/20',
      iconBg: 'bg-[#0084FF]/10 text-[#0084FF] border-[#0084FF]/20',
      link: '#'
    },
    {
      id: 'phone',
      title: 'Phone Call',
      desc: 'Direct line: +880 1776-927073',
      icon: <i className="fa-solid fa-phone text-2xl"></i>,
      action: 'Call Now',
      color: 'bg-cyan-600',
      hover: 'hover:bg-cyan-700',
      shadow: 'shadow-cyan-600/20',
      iconBg: 'bg-cyan-50 text-cyan-600 border-cyan-100',
      link: 'tel:+8801776927073'
    },
    {
      id: 'email',
      title: 'Email Support',
      desc: 'info@riyalgames.online',
      icon: <i className="fa-solid fa-envelope text-2xl"></i>,
      action: 'Send Email',
      color: 'bg-orange-500',
      hover: 'hover:bg-orange-600',
      shadow: 'shadow-orange-500/20',
      iconBg: 'bg-orange-50 text-orange-500 border-orange-100',
      link: 'mailto:info@riyalgames.online'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
             <Headset size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Contact Support</h2>
            <p className="text-slate-500 font-medium">We are available 24/7 to help you</p>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {contactMethods.map((method) => (
              <div key={method.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-indigo-600/30 hover:shadow-md transition-all group">
                  <div className="flex items-start gap-5 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${method.iconBg}`}>
                        {method.icon}
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 text-xl leading-tight mb-1">{method.title}</h3>
                          <p className="text-slate-500 text-sm font-medium">{method.desc}</p>
                      </div>
                  </div>
                  <a 
                    href={method.link}
                    className={`w-full py-3.5 rounded-xl ${method.color} ${method.hover} text-white font-bold text-sm shadow-lg ${method.shadow} flex items-center justify-center gap-2 transition-transform active:scale-[0.98] group-hover:translate-y-[-2px]`}
                  >
                      {method.action} <ArrowRight size={18} />
                  </a>
              </div>
          ))}
      </div>
    </div>
  );
};