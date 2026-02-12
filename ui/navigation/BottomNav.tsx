import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Gamepad2, ShoppingBag, Wallet, UserCircle, PlayCircle, Headset } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const { isLoggedIn } = useAuthStore();

  const handleNavigation = (path: string) => {
    if (pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  };

  const NavButton = ({ path, icon: Icon, label, onClick }: { path?: string, icon: React.ElementType, label: string, onClick?: () => void }) => {
    const isActive = path ? (path === '/' ? pathname === '/' : pathname.startsWith(path)) : false;

    return (
      <button 
        onClick={() => {
            if (onClick) onClick();
            else if (path) handleNavigation(path);
        }}
        className={`relative flex items-center justify-center h-[34px] rounded-[8px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] outline-none select-none ${
          isActive 
            ? 'px-3.5 bg-[#dc2625] text-white shadow-md shadow-[#dc2625]/20' 
            : 'px-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 active:scale-90 bg-transparent'
        }`}
      >
        <Icon 
            size={21} 
            strokeWidth={isActive ? 2.2 : 1.8}
            className="transition-transform duration-300 flex-shrink-0" 
        />
        <div 
            className={`overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex items-center ${
                isActive ? 'max-w-[70px] opacity-100 ml-1.5' : 'max-w-0 opacity-0 ml-0'
            }`}
        >
            <span className="text-[10px] font-bold whitespace-nowrap tracking-tight">
                {label}
            </span>
        </div>
      </button>
    );
  };

  const containerClasses = "bg-white/95 backdrop-blur-xl border border-white/40 rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.08)] p-[2px] flex items-center justify-center gap-[2px] supports-[backdrop-filter]:bg-white/80 ring-1 ring-black/5";

  return (
    <div className="md:hidden fixed bottom-2 left-1/2 transform -translate-x-1/2 z-50 w-auto max-w-[92%]">
      <div className={containerClasses}>
          <NavButton path="/" icon={Home} label="Home" />
          {isLoggedIn ? (
            <>
              <NavButton path="/store" icon={Gamepad2} label="Topup" />
              <NavButton path="/dashboard/orders" icon={ShoppingBag} label="Orders" />
              <NavButton path="/dashboard/wallet" icon={Wallet} label="Wallet" />
              <NavButton path="/dashboard/profile" icon={UserCircle} label="Profile" />
            </>
          ) : (
            <>
              <NavButton path="/faq" icon={PlayCircle} label="Tutorial" /> 
              <NavButton path="/store" icon={Gamepad2} label="TopUp" />
              <NavButton path="/support" icon={Headset} label="Contact" />
              <NavButton path="/login" icon={UserCircle} label="Login" />
            </>
          )}
      </div>
    </div>
  );
};