import React, { useState, useCallback, memo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Wallet, X } from 'lucide-react';
import { Sidebar } from './Sidebar';
import { useAuthStore } from '../../store/useAuthStore';

// Memoized NavLink component
const NavLink = memo<{ to: string; label: string }>(({ to, label }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === to || location.pathname.startsWith(to + '/');
  
  const handleClick = useCallback(() => {
    if (location.pathname === to) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(to);
      window.scrollTo(0, 0);
    }
  }, [navigate, to, location.pathname]);

  return (
    <button 
      onClick={handleClick}
      className={`text-sm font-bold transition-colors ${
        isActive ? 'text-[#dc2625]' : 'text-slate-600 hover:text-[#dc2625]'
      }`}
    >
      {label}
    </button>
  );
});

NavLink.displayName = 'NavLink';

// Memoized Logo component
const Logo = memo<{ onClick: () => void }>(({ onClick }) => {
  return (
    <div 
      className="flex-shrink-0 flex items-center gap-2 cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-[#dc2625] w-10 h-10 md:w-11 md:h-11 rounded-lg flex items-center justify-center shadow-lg shadow-[#dc2625]/20">
        <span className="text-white font-black text-2xl md:text-3xl leading-none pt-0.5">R</span>
      </div>
      <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-none mt-0.5">
        RIYAL <span className="text-[#dc2625]">Games</span>
      </span>
    </div>
  );
});

Logo.displayName = 'Logo';

// Memoized WalletButton component
const WalletButton = memo<{ balance: number; onClick: () => void }>(({ balance, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="bg-[#dc2625] hover:bg-[#b91c1c] text-white px-3 py-2 md:px-4 rounded-lg font-bold text-xs md:text-sm shadow-lg shadow-[#dc2625]/30 flex items-center gap-1.5 border border-white/20 transition-all hover:scale-105"
    >
      <Wallet size={16} className="md:w-4 md:h-4 w-3.5 h-3.5" />
      <span>{balance.toFixed(0)} <span className="hidden xs:inline">Tk</span></span>
    </button>
  );
});

WalletButton.displayName = 'WalletButton';

// Memoized ProfileButton component
const ProfileButton = memo<{ 
  user: any; 
  isSidebarOpen: boolean; 
  onClick: () => void;
}>(({ user, isSidebarOpen, onClick }) => {
  return (
    <div 
      className="w-10 h-10 md:w-11 md:h-11 rounded-full overflow-hidden border-2 border-white/50 shadow-md cursor-pointer hover:border-[#dc2625]/50 transition-colors flex items-center justify-center bg-white"
      onClick={onClick}
    >
      {isSidebarOpen ? (
        <X className="text-[#dc2625]" size={20} strokeWidth={2.5} />
      ) : (
        <img 
          src={user?.avatar || "https://ui-avatars.com/api/?name=User"} 
          alt={user?.name} 
          className="w-full h-full object-cover" 
          loading="lazy"
        />
      )}
    </div>
  );
});

ProfileButton.displayName = 'ProfileButton';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Selective Zustand subscriptions for better performance
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const user = useAuthStore(state => state.user);
  const balance = useAuthStore(state => state.balance);

  const handleProfileClick = useCallback(() => {
    if (isLoggedIn) {
      setIsSidebarOpen(prev => !prev);
    } else {
      navigate('/login');
      window.scrollTo(0, 0);
    }
  }, [isLoggedIn, navigate]);

  const handleNavigation = useCallback((path: string) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigate]);

  const handleLogoClick = useCallback(() => {
    handleNavigation('/');
  }, [handleNavigation]);

  const handleWalletClick = useCallback(() => {
    handleNavigation('/dashboard/wallet');
  }, [handleNavigation]);

  const handleHomeClick = useCallback(() => {
    handleNavigation('/');
  }, [handleNavigation]);

  const handleLoginClick = useCallback(() => {
    handleNavigation('/login');
  }, [handleNavigation]);

  const handleCloseSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <>
      <nav className="bg-white/75 backdrop-blur-xl border-b border-white/40 sticky top-0 z-50 shadow-sm transition-all duration-300 supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="relative flex justify-between items-center h-14">
            
            {/* Left: Logo */}
            <div className="flex items-center gap-2">
              <Logo onClick={handleLogoClick} />
            </div>

            {/* Middle: Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <NavLink to="/store" label="Topup" />
              <NavLink to="/faq" label="Tutorial" />
              <NavLink to="/dashboard/orders" label="Orders" />
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              <button 
                onClick={handleHomeClick}
                className="hidden lg:flex items-center gap-2 text-gray-600 hover:text-[#dc2625] font-medium px-3 py-2 transition"
              >
                <Home size={20} />
                <span>Home</span>
              </button>
              
              {isLoggedIn ? (
                <div className="flex items-center gap-2 md:gap-3">
                  <WalletButton balance={balance} onClick={handleWalletClick} />
                  <ProfileButton 
                    user={user} 
                    isSidebarOpen={isSidebarOpen} 
                    onClick={handleProfileClick} 
                  />
                </div>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="bg-[#dc2625] hover:bg-[#b91c1c] text-white px-5 py-2 md:px-6 rounded-lg font-bold text-sm md:text-base shadow-lg shadow-[#dc2625]/30 transition-all transform hover:scale-105 border border-white/20"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={handleCloseSidebar} 
      />
    </>
  );
};
