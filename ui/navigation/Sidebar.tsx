import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  FileText, 
  Wallet, 
  Headphones, 
  Power, 
  Package,
  ChevronRight,
  LayoutDashboard,
  ShoppingCart
} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { useCartStore } from '../../store/useCartStore';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  
  const { user, logout } = useAuthStore();
  const cartItemCount = useCartStore(state => state.getItemCount());

  const menuItems = [
    { icon: LayoutDashboard, label: 'My Account', path: '/dashboard/profile' },
    { icon: ShoppingCart, label: 'My Cart', path: '/cart', badge: cartItemCount > 0 ? cartItemCount : undefined },
    { icon: ShoppingBag, label: 'My Orders', path: '/dashboard/orders' },
    { icon: Package, label: 'Order Tracker', path: '/tracking' },
    { icon: FileText, label: 'My Transaction', path: '/dashboard/transactions' },
    { icon: Wallet, label: 'Add Money', path: '/dashboard/wallet' },
    { icon: Headphones, label: 'Contact Us', path: '/support' },
  ];

  // Auto close sidebar on scroll outside
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
         onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen, onClose]);

  const handleNavigation = (path: string) => {
    setClickedItem(path);

    // If already on the page, scroll to top and close
    if (location.pathname === path) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            onClose();
            setClickedItem(null);
        }, 300);
        return;
    }

    // Short delay to show the feedback effect for new navigation
    setTimeout(() => {
      navigate(path);
      window.scrollTo(0, 0);
      onClose();
      setClickedItem(null);
    }, 200);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.scrollTo(0, 0);
    onClose();
  };

  return (
    <>
      {/* Overlay - Starts below the header (top-14 = 56px) */}
      <div 
        className={`fixed inset-0 top-14 bg-slate-900/10 backdrop-blur-sm z-[60] transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-14 right-0 bottom-0 w-[280px] bg-white/85 backdrop-blur-2xl z-[70] shadow-[-10px_0_40px_rgba(0,0,0,0.1)] border-l border-white/40 transform transition-transform duration-300 ease-out flex flex-col supports-[backdrop-filter]:bg-white/60 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* User Profile Summary - Matching Screenshot */}
        <div className="p-8 border-b border-white/30 bg-gradient-to-b from-indigo-50/50 to-transparent flex-shrink-0">
          <div className="flex flex-col items-center text-center">
            {/* Avatar with Green Dot */}
            <div 
              className="w-20 h-20 rounded-full p-1 bg-white shadow-md border border-gray-100 mb-3 relative group cursor-pointer" 
              onClick={() => handleNavigation('/dashboard/profile')}
            >
               <img 
                 src={user?.avatar || "https://ui-avatars.com/api/?name=User"} 
                 alt={user?.name || "User"}
                 className="w-full h-full rounded-full object-cover group-hover:opacity-90 transition-opacity"
               />
               <div className="absolute bottom-1 right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
            
            <h3 className="font-bold text-slate-800 text-lg mb-0.5">{user?.name || "Guest User"}</h3>
            <p className="text-slate-500 text-xs font-medium mb-5 truncate w-full px-4">{user?.email || "guest@example.com"}</p>
            
            <div className="grid grid-cols-2 gap-3 w-full px-2">
                <button 
                  onClick={() => handleNavigation('/dashboard/profile')}
                  className="flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold py-2 rounded-lg transition-colors shadow-sm active:scale-95 duration-200"
                >
                  <User size={14} /> Profile
                </button>
                {user ? (
                   <button 
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-1.5 bg-red-50 hover:bg-red-100 border border-red-100 text-red-600 text-xs font-bold py-2 rounded-lg transition-colors shadow-sm active:scale-95 duration-200"
                  >
                    <Power size={14} /> Logout
                  </button>
                ) : (
                  <button 
                    onClick={() => handleNavigation('/login')}
                    className="flex items-center justify-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 border border-indigo-100 text-indigo-600 text-xs font-bold py-2 rounded-lg transition-colors shadow-sm active:scale-95 duration-200"
                  >
                    <Power size={14} /> Login
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto py-4 scrollbar-hide overscroll-contain">
          <div className="px-4 space-y-2">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              const isClicked = clickedItem === item.path;
              const isSelected = isActive || isClicked;

              return (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center justify-between p-3 rounded-xl text-left group transition-all duration-200 border 
                  ${isSelected 
                      ? 'bg-indigo-50/80 border-indigo-100' 
                      : 'border-transparent hover:bg-white/60 hover:border-white/40'
                  } ${isClicked ? 'scale-[0.98]' : ''}`}
                >
                  <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors relative
                          ${isSelected 
                              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                              : 'bg-slate-100 text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                          }`}>
                          <item.icon size={18} strokeWidth={isSelected ? 2.5 : 2} />
                          {item.badge && (
                            <div className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                              {item.badge}
                            </div>
                          )}
                      </div>
                      <span className={`font-semibold text-sm transition-colors ${isSelected ? 'text-indigo-900' : 'text-slate-600 group-hover:text-slate-900'}`}>
                        {item.label}
                      </span>
                  </div>
                  <ChevronRight size={16} className={`transition-colors ${isSelected ? 'text-indigo-600 translate-x-1' : 'text-slate-300 group-hover:text-indigo-600'}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};