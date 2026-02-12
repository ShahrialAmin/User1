import React, { useState, useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';

export const NoticeBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Inject keyframes to head to avoid style tag issues in render
  useEffect(() => {
    const styleId = 'notice-bar-styles';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.innerHTML = `
          @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-100%); }
          }
          .animate-marquee {
              animation: marquee 50s linear infinite;
              padding-left: 20%;
              display: inline-block;
          }
          .group:hover .animate-marquee {
              animation-play-state: paused;
          }
          @keyframes shimmer {
              100% { transform: translateX(100%); }
          }
        `;
        document.head.appendChild(style);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="relative z-40 bg-[#0f172a] h-[36px] md:h-[40px] flex items-center shadow-md border-b border-white/5 overflow-hidden group">
        
        {/* Left Label - Angled Design */}
        <div className="relative z-20 h-full flex items-center bg-[#dc2625] pl-2 pr-4 flex-shrink-0 group-hover:bg-[#b91c1c] transition-colors" style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0% 100%)' }}>
            <div className="flex items-center gap-1 text-white">
                 <AlertTriangle size={13} strokeWidth={2.5} />
                 <span className="font-black text-[10px] md:text-xs uppercase tracking-widest leading-none pt-0.5">Notice</span>
            </div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_3s_infinite] pointer-events-none"></div>
        </div>

        {/* Marquee Area */}
        <div className="flex-1 overflow-hidden relative h-full flex items-center">
            {/* Left fade mask */}
            <div className="absolute left-[-1px] top-0 bottom-0 w-4 bg-gradient-to-r from-[#0f172a] to-transparent z-10 pointer-events-none"></div>

           {/* Text size increased */}
           <div className="animate-marquee whitespace-nowrap text-[13px] md:text-[15px] font-bold text-slate-200 flex items-center">
              <span className="mx-4 inline-flex items-center gap-2">
                 এখন থেকে আমাদের সাইটে রাত দিন ২৪ ঘণ্টা অর্ডার করতে পারবেন। ধন্যবাদ। যে কোন সমস্যায় WhatsApp 01776927073
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#dc2625] mx-4 opacity-50"></span>
              <span className="mx-4 text-slate-300">
                  Welcome to <strong className="text-white">RIYAL Games</strong>! 100% Trusted & Fast Service.
              </span>
           </div>

           {/* Right fade mask */}
           <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0f172a] via-[#0f172a]/90 to-transparent z-10 pointer-events-none"></div>
        </div>

        {/* Floating Close Button */}
        <button 
            onClick={() => setIsVisible(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-6 h-6 md:w-7 md:h-7 rounded-full bg-white/10 hover:bg-[#dc2625] text-slate-400 hover:text-white flex items-center justify-center backdrop-blur-md transition-all border border-white/10 shadow-sm active:scale-90"
        >
            <X size={14} strokeWidth={2.5} />
        </button>
    </div>
  );
};