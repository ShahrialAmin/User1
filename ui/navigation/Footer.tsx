import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Footer: React.FC = () => {
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-slate-200 pt-4 pb-20 md:pb-4 border-t border-white/10 font-sans relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Branding Section - Reduced Margins */}
        <div className="mb-4">
            <div className="flex items-center gap-2.5 mb-2">
                <div className="bg-[#dc2625] w-10 h-10 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-xl leading-none">R</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xl font-black text-white tracking-tight leading-none uppercase">
                    RIYAL <span className="text-[#dc2625]">Games</span>
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 underline decoration-slate-600 underline-offset-1">Topup & Services</span>
                </div>
            </div>
            <p className="text-[13px] leading-snug text-slate-400 max-w-2xl">
              Bangladesh's most trusted digital goods marketplace. Experience reliable service, instant delivery, and dedicated 24/7 customer support.
            </p>
        </div>

        {/* Social Buttons - Compact Squares */}
        <div className="flex gap-3 mb-6">
            <SocialButton 
                icon={<i className="fa-brands fa-facebook-f"></i>} 
                link="#" 
                hoverColor="hover:bg-[#1877F2]" 
            />
            <SocialButton 
                icon={<i className="fa-brands fa-instagram"></i>} 
                link="#" 
                hoverColor="hover:bg-[#E1306C]"
            />
            <SocialButton 
                icon={<i className="fa-brands fa-youtube"></i>} 
                link="#" 
                hoverColor="hover:bg-[#FF0000]"
            />
            <SocialButton 
                icon={<i className="fa-brands fa-telegram"></i>} 
                link="https://t.me/riyal_games" 
                hoverColor="hover:bg-[#229ED9]"
            />
        </div>

        {/* Links Grid - Tightened spacing */}
        <div className="grid grid-cols-2 gap-0 mb-6 border-b border-white/5 pb-6">
            <div className="pr-4 md:pr-10">
                <h3 className="text-white font-bold text-base mb-3 tracking-tight">Legal & Help</h3>
                <div className="flex flex-col gap-2">
                    <FooterLink label="Terms & Conditions" to="/terms" onClick={scrollToTop} />
                    <FooterLink label="Privacy Policy" to="/privacy" onClick={scrollToTop} />
                    <FooterLink label="Refund Policy" to="/refund" onClick={scrollToTop} />
                    <FooterLink label="Shipment Policy" to="/shipping-policy" onClick={scrollToTop} />
                    <FooterLink label="Contact Support" to="/support" onClick={scrollToTop} />
                </div>
            </div>

            <div className="border-l border-white/10 pl-4 md:pl-10">
                <h3 className="text-white font-bold text-base mb-3 tracking-tight">Quick Links</h3>
                <div className="flex flex-col gap-2">
                    <FooterLink label="About Us" to="/about" onClick={scrollToTop} />
                    <FooterLink label="My Orders" to="/dashboard/orders" onClick={scrollToTop} />
                    <FooterLink label="Order Tracker" to="/tracking" onClick={scrollToTop} />
                    <FooterLink label="My Account" to="/dashboard/profile" onClick={scrollToTop} />
                </div>
            </div>
        </div>

        {/* Contact Us Box - Compact Version */}
        <div className="max-w-4xl mx-auto mb-6">
           <div className="border border-white/60 rounded-2xl p-4 md:p-6">
              <div className="flex flex-col items-center">
                  <h3 className="text-white font-black text-xl mb-5 uppercase tracking-tighter">
                      <span className="border-b-2 border-[#dc2625] pb-0.5">Contact Us</span>
                  </h3>
                  
                  <div className="space-y-3 w-full max-w-xs md:max-w-md">
                      <ContactItem 
                        icon={<i className="fa-solid fa-location-dot text-xs"></i>} 
                        label="Address" 
                        value="Dhaka, Bangladesh" 
                      />
                      <ContactItem 
                        icon={<i className="fa-solid fa-phone text-xs"></i>} 
                        label="Phone" 
                        value="+880 1776-927073" 
                        isMono 
                      />
                      <ContactItem 
                        icon={<i className="fa-solid fa-envelope text-xs"></i>} 
                        label="Email" 
                        value="info@riyalgames.online" 
                      />
                  </div>

                  {/* Payment Methods - Compact badges */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-1.5">
                     <span className="bg-[#2d3748] text-slate-400 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border border-white/5">Pay With</span>
                     <PaymentBadge label="bKash" color="bg-[#E2136E]" />
                     <PaymentBadge label="Nagad" color="bg-[#F7931E]" />
                     <PaymentBadge label="Rocket" color="bg-[#8C3494]" />
                     <PaymentBadge label="Upay" color="bg-[#0070B2]" />
                  </div>
              </div>
           </div>
        </div>

        {/* Bottom Bar - Minimalist centered stack */}
        <div className="pt-4 border-t border-white/5 flex flex-col items-center gap-1.5">
            <p className="text-[13px] text-slate-400 font-medium">
                © {new Date().getFullYear()} <span className="text-white font-bold">RIYAL Games</span>. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2">
                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">Developed by</span>
                <span className="bg-[#dc2625] text-white font-black px-2 py-0.5 rounded text-[9px] tracking-wide shadow-lg">Shahrial Amin</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

// Internal Components

const ContactItem = ({ icon, label, value, isMono }: { icon: React.ReactNode, label: string, value: string, isMono?: boolean }) => (
    <div className="flex items-center gap-3 group">
        <div className="w-8 h-8 rounded-lg bg-[#dc2625] flex items-center justify-center text-white shrink-0 shadow-md">
            {icon}
        </div>
        <div className="flex flex-col">
            <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest leading-none mb-0.5">{label}</span>
            <span className={`text-[13px] text-white font-bold tracking-tight leading-none ${isMono ? 'font-mono' : ''}`}>{value}</span>
        </div>
    </div>
);

const SocialButton = ({ icon, link, hoverColor }: { icon: React.ReactNode, link: string, hoverColor?: string }) => (
  <a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-lg transition-all duration-300 ${hoverColor || 'hover:bg-white/10'} hover:border-transparent hover:shadow-lg hover:-translate-y-1 active:scale-95 group`}
  >
    <span className="transform transition-transform duration-300 group-hover:scale-110">
        {icon}
    </span>
  </a>
);

const FooterLink = ({ label, to, onClick }: { label: string, to: string, onClick: () => void }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`text-[14px] font-medium transition-colors flex items-center gap-1.5 py-0.5 ${isActive ? 'text-white' : 'text-slate-400 hover:text-white'}`}
    >
      {isActive && <i className="fa-solid fa-arrow-right text-[#dc2625] text-[10px]"></i>}
      {label}
    </Link>
  );
};

const PaymentBadge = ({ label, color }: { label: string, color: string }) => (
  <div className={`h-5 px-2 rounded-sm flex items-center justify-center text-white text-[9px] font-black uppercase tracking-wider border border-white/10 ${color} shadow-sm`}>
    {label}
  </div>
);