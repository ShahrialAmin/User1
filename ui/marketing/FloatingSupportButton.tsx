import React, { useState, useEffect, useRef } from 'react';

export const FloatingSupport: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Auto-close on scroll or click outside
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="fixed bottom-[70px] md:bottom-8 right-4 md:right-6 z-40 flex flex-col items-end gap-3">
        
        {/* Expanded Items */}
        {isOpen && (
            <div className="flex flex-col gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300 mb-2">
                {/* WhatsApp */}
                <a 
                    href="#" 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer text-white"
                    title="WhatsApp"
                >
                     <i className="fa-brands fa-whatsapp text-xl"></i>
                </a>

                {/* Telegram */}
                <a 
                    href="#" 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 bg-[#2EA6DA] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer text-white"
                    title="Telegram"
                >
                    <i className="fa-brands fa-telegram text-xl"></i>
                </a>

                {/* Messenger */}
                <a 
                    href="#" 
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 bg-[#0084FF] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer text-white"
                    title="Messenger"
                >
                    <i className="fa-brands fa-facebook-messenger text-xl"></i>
                </a>
            </div>
        )}

        {/* Toggle Button Container */}
        <div className="flex items-center gap-3">
            {/* Need Help Label */}
            {!isOpen && (
                <div className="bg-[#dc2625] text-white px-3 py-1.5 rounded-lg font-bold text-xs shadow-lg whitespace-nowrap hidden sm:block">
                    NEED HELP?
                </div>
            )}
            
            {/* Main Button */}
            <button 
                onClick={toggleOpen}
                className="w-12 h-12 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 z-50 hover:bg-[#b91c1c] bg-[#dc2625] text-white"
            >
                {isOpen ? (
                    <i className="fa-solid fa-xmark text-xl"></i>
                ) : (
                    <div className="relative">
                         <i className="fa-solid fa-phone text-lg"></i>
                    </div>
                )}
            </button>
        </div>
    </div>
  );
};