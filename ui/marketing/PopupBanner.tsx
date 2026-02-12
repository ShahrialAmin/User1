import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface PopupBannerProps {
  onClose: () => void;
}

export const PopupBanner: React.FC<PopupBannerProps> = ({ onClose }) => {
  // Lock scrolling when the popup is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-[360px] w-full overflow-hidden animate-in zoom-in-95 duration-300 relative flex flex-col"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Main Cover Photo (16:9 Aspect Ratio) */}
        <div className="aspect-video w-full relative bg-slate-100 group">
             <img 
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop" 
                alt="Community"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
             
             {/* Close Button (On top of image) */}
             <button 
                 onClick={onClose}
                 className="absolute top-3 right-3 z-20 bg-black/30 hover:bg-black/50 text-white w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-md transition-all duration-200 border border-white/20 active:scale-90"
            >
                 <X size={16} strokeWidth={2.5} />
            </button>
        </div>
        
        {/* Content Section */}
        <div className="p-6 text-center">
             
             <h3 className="text-xl font-black text-slate-900 mb-2 leading-tight">
                Join Our Telegram
             </h3>
             
             {/* Small Text Spot */}
             <p className="text-slate-500 text-sm leading-relaxed font-medium mb-6 px-2">
                সকল সমস্যার সমাধান এবং নতুন অফারের আপডেট পেতে এখুনি আমাদের টেলিগ্রাম চ্যানেলে জয়েন করুন।
             </p>

             {/* Action Button */}
             <button 
                 onClick={() => window.open('https://t.me/riyal_games', '_blank')}
                 className="w-full bg-[#dc2625] hover:bg-[#b91c1c] text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-red-200 hover:shadow-red-300 flex items-center justify-center gap-2 group active:scale-[0.98]"
             >
                <span>Join Now</span>
                <i className="fa-brands fa-telegram text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
             </button>
             
             <button 
                onClick={onClose}
                className="mt-3.5 text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors py-2"
             >
                Maybe Later
             </button>
        </div>
      </div>
    </div>
  );
};