import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { 
  User as UserIcon, 
  Shield, 
  LogOut, 
  Wallet, 
  CreditCard, 
  ShoppingBag, 
  Headphones, 
  ChevronRight, 
  Edit,
  Camera,
  Gift,
  Lock,
  MapPin,
  Phone,
  FileText,
  Clock,
  LayoutDashboard,
  Calendar,
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Save,
  Mail
} from 'lucide-react';
import { useAuthStore, User } from '../../../store/useAuthStore';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, balance, logout, updateUser } = useAuthStore();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleCopyPin = () => {
      navigator.clipboard.writeText("655533");
      alert("Support Pin Copied!");
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const onLogout = () => {
      logout();
      navigate('/login');
      window.scrollTo(0, 0);
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for preview immediately
      const reader = new FileReader();
      reader.onloadend = () => {
        // Update user state with new avatar
        updateUser({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  // Fallback if accessed directly without login (though protected route should handle this)
  if (!user) {
      return (
          <div className="p-8 text-center">
              <p>Please login to view profile.</p>
              <button onClick={() => handleNavigation('/login')} className="text-indigo-600 font-bold mt-2">Login</button>
          </div>
      );
  }

  return (
    <div className="max-w-5xl mx-auto md:px-6 lg:px-8 py-6">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {/* Security Modal */}
      {isSecurityOpen && (
        <SecurityModal onClose={() => setIsSecurityOpen(false)} />
      )}

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <EditProfileModal 
            user={user} 
            onClose={() => setIsEditProfileOpen(false)} 
            onSave={(updates) => updateUser(updates)}
        />
      )}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
             <UserIcon size={20} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Profile</h2>
            <p className="text-slate-500 text-sm font-medium">Manage your account and settings</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 px-4 md:px-0">
        
        {/* Left Column: Identity & Wallet (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
            
            {/* Identity Card - White bg with specific shadow */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                {/* Profile Pic Section */}
                <div className="relative flex flex-col items-center text-center z-10">
                    <div className="relative mb-4 group cursor-pointer" onClick={handleAvatarClick}>
                        <div className="w-24 h-24 rounded-full p-1 bg-white shadow-lg ring-1 ring-gray-100 relative overflow-hidden">
                            <img 
                                src={user.avatar || "https://ui-avatars.com/api/?name=User"} 
                                alt={user.name} 
                                className="w-full h-full rounded-full object-cover group-hover:opacity-80 transition-opacity"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-[#dc2625] text-white rounded-full shadow-lg border-2 border-white cursor-pointer hover:bg-[#b91c1c] active:scale-90 transition-all">
                            <Camera size={14} />
                        </button>
                    </div>
                    
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{user.name}</h3>
                    <p className="text-slate-500 text-sm font-medium mb-3">{user.email}</p>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF8E1] text-[#FFB300] text-xs font-bold border border-[#FFE082]">
                        <Gift size={12} fill="currentColor" /> Gold Member
                    </div>
                </div>

                {/* Dark Balance Card - Slate-900 style from screenshot */}
                <div className="mt-8">
                     <div className="bg-[#1e293b] rounded-xl p-5 text-white shadow-xl relative overflow-hidden">
                         
                         <div className="relative z-10 flex justify-between items-end">
                             <div>
                                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Balance</p>
                                 <p className="text-3xl font-black tracking-tight">৳ {balance.toFixed(2)}</p>
                             </div>
                             <button 
                                onClick={() => handleNavigation('/dashboard/wallet')}
                                className="bg-[#dc2625] hover:bg-[#b91c1c] text-white p-3 rounded-xl shadow-lg border border-white/10 active:scale-95 transition-transform"
                                title="Add Money"
                             >
                                 <Wallet size={20} />
                             </button>
                         </div>
                     </div>
                </div>
            </div>
            
            {/* Account Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
                 <StatCard 
                    icon={<ShoppingBag size={18} />} 
                    label="Orders" 
                    value="12" 
                    onClick={() => handleNavigation('/dashboard/orders')}
                    delay={1}
                 />
                 <StatCard 
                    icon={<CreditCard size={18} />} 
                    label="Spent" 
                    value="৳ 4.5k" 
                    onClick={() => handleNavigation('/dashboard/transactions')}
                    delay={2}
                 />
                 <StatCard 
                    icon={<Shield size={18} />} 
                    label="Support Pin" 
                    value="655533" 
                    delay={3}
                    onClick={handleCopyPin}
                 />
                 <StatCard 
                    icon={<Calendar size={18} />} 
                    label="Joined" 
                    value="2024" 
                    delay={4}
                 />
            </div>

        </div>

        {/* Right Column: Details & Settings (Span 8) */}
        <div className="lg:col-span-8 space-y-6">
            
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                            <UserIcon size={18} />
                        </div>
                        Personal Info
                    </h3>
                    <button 
                        onClick={() => setIsEditProfileOpen(true)}
                        className="text-sm font-bold text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 active:scale-95"
                    >
                        <Edit size={14} /> Edit Details
                    </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <InfoField label="Full Name" value={user.name} icon={<UserIcon size={16} />} />
                    <InfoField label="Phone Number" value={user.phone || "Not Set"} icon={<Phone size={16} />} />
                    <InfoField label="Email Address" value={user.email} icon={<Mail size={16} />} />
                    <InfoField label="Location" value={user.location || "Not Set"} icon={<MapPin size={16} />} />
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 <MenuCard 
                    title="Transaction History" 
                    desc="View all payments & deposits"
                    icon={<Clock size={20} />} 
                    color="text-blue-600 bg-blue-50 group-hover:bg-blue-600 group-hover:text-white"
                    onClick={() => handleNavigation('/dashboard/transactions')}
                 />
                 <MenuCard 
                    title="Order Tracker" 
                    desc="Track your order status"
                    icon={<LayoutDashboard size={20} />} 
                    color="text-purple-600 bg-purple-50 group-hover:bg-purple-600 group-hover:text-white"
                    onClick={() => handleNavigation('/tracking')}
                 />
                 <MenuCard 
                    title="Help & Support" 
                    desc="FAQs, Contact Us, WhatsApp"
                    icon={<Headphones size={20} />} 
                    color="text-emerald-600 bg-emerald-50 group-hover:bg-emerald-600 group-hover:text-white"
                    onClick={() => handleNavigation('/support')}
                 />
                 <MenuCard 
                    title="Policies & Terms" 
                    desc="Refund, Privacy, Terms"
                    icon={<FileText size={20} />} 
                    color="text-amber-600 bg-amber-50 group-hover:bg-amber-600 group-hover:text-white"
                    onClick={() => handleNavigation('/terms')}
                 />
                 <MenuCard 
                    title="Security Settings" 
                    desc="Change Password, 2FA"
                    icon={<Lock size={20} />} 
                    color="text-indigo-600 bg-indigo-50 group-hover:bg-indigo-600 group-hover:text-white"
                    onClick={() => setIsSecurityOpen(true)}
                 />
                 <MenuCard 
                    title="Logout" 
                    desc="Sign out from device"
                    icon={<LogOut size={20} />} 
                    isDanger 
                    color="text-red-600 bg-red-50 group-hover:bg-red-600 group-hover:text-white"
                    onClick={onLogout}
                 />
            </div>

        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---

const EditProfileModal = ({ user, onClose, onSave }: { user: User, onClose: () => void, onSave: (data: Partial<User>) => void }) => {
    const [formData, setFormData] = useState({
        name: user.name,
        phone: user.phone || '',
        location: user.location || ''
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        
        // Simulate network delay
        setTimeout(() => {
            onSave(formData);
            setIsSaving(false);
            onClose();
        }, 600);
    };

    return createPortal(
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Edit size={18} className="text-indigo-600" /> Edit Profile
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X size={18} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Full Name</label>
                        <div className="relative">
                            <UserIcon size={16} className="absolute left-3 top-3 text-slate-400" />
                            <input 
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                placeholder="Enter full name"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Phone Number</label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-3 top-3 text-slate-400" />
                            <input 
                                type="text"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Location</label>
                        <div className="relative">
                            <MapPin size={16} className="absolute left-3 top-3 text-slate-400" />
                            <input 
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({...formData, location: e.target.value})}
                                className="w-full bg-slate-50 border border-gray-200 rounded-xl pl-9 pr-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                                placeholder="Enter location"
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit"
                            disabled={isSaving}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <Save size={18} /> Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

const SecurityModal = ({ onClose }: { onClose: () => void }) => {
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!currentPass || !newPass || !confirmPass) {
            setError('Please fill in all fields');
            return;
        }

        if (newPass !== confirmPass) {
            setError('New passwords do not match');
            return;
        }

        if (newPass.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        // Simulate API call
        setTimeout(() => {
            setSuccess('Password changed successfully!');
            setTimeout(onClose, 1500);
        }, 500);
    };

    return createPortal(
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div 
                className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
                onClick={e => e.stopPropagation()}
            >
                <div className="bg-gray-50 border-b border-gray-100 p-4 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900 flex items-center gap-2">
                        <Lock size={18} className="text-indigo-600" /> Security Settings
                    </h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
                        <X size={18} />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {error && (
                        <div className="bg-red-50 text-red-500 text-xs font-bold p-3 rounded-xl flex items-center gap-2 border border-red-100">
                            <AlertCircle size={14} /> {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-emerald-50 text-emerald-600 text-xs font-bold p-3 rounded-xl flex items-center gap-2 border border-emerald-100">
                            <CheckCircle2 size={14} /> {success}
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Current Password</label>
                        <input 
                            type={showPass ? "text" : "password"}
                            value={currentPass}
                            onChange={(e) => setCurrentPass(e.target.value)}
                            className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            placeholder="Enter current password"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">New Password</label>
                        <input 
                            type={showPass ? "text" : "password"}
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">Confirm Password</label>
                        <input 
                            type={showPass ? "text" : "password"}
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                            className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all"
                            placeholder="Confirm new password"
                        />
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                        <button 
                            type="button" 
                            onClick={() => setShowPass(!showPass)}
                            className="text-xs font-bold text-slate-500 hover:text-indigo-600 flex items-center gap-1.5"
                        >
                            {showPass ? <EyeOff size={14} /> : <Eye size={14} />} 
                            {showPass ? 'Hide Passwords' : 'Show Passwords'}
                        </button>
                    </div>

                    <div className="pt-2">
                        <button 
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <Save size={18} /> Update Password
                        </button>
                    </div>
                </form>
            </div>
        </div>,
        document.body
    );
};

const StatCard = ({ icon, label, value, onClick, delay }: { icon: React.ReactNode, label: string, value: string, onClick?: () => void, delay: number }) => (
    <div 
        onClick={onClick}
        className={`bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center gap-2 transition-all duration-300 ${onClick ? 'cursor-pointer hover:border-indigo-600/30 hover:shadow-md hover:-translate-y-1' : ''}`}
        style={{ animationDelay: `${delay * 100}ms` }}
    >
        <div className={`p-2.5 rounded-full ${onClick ? 'bg-slate-50 text-slate-500' : 'bg-slate-50 text-slate-400'}`}>
            {icon}
        </div>
        <div className="text-center">
            <div className="font-black text-slate-800 text-lg leading-none mb-1">{value}</div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">{label}</div>
        </div>
    </div>
);

const InfoField = ({ 
    label, 
    value, 
    icon
}: { 
    label: string, 
    value: string, 
    icon?: React.ReactNode
}) => {
    return (
        <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1.5">
                {icon} {label}
            </span>
            <div className="flex items-center justify-between p-3 rounded-xl border bg-gray-50 border-gray-100 hover:bg-white hover:border-gray-200 transition-colors">
                <span className="font-bold text-sm text-slate-700">
                    {value}
                </span>
            </div>
        </div>
    );
};

const MenuCard = ({ 
    title, 
    desc, 
    icon, 
    isDanger = false,
    color,
    onClick
}: { 
    title: string, 
    desc: string, 
    icon: React.ReactNode, 
    isDanger?: boolean,
    color: string,
    onClick: () => void
}) => (
    <button 
        onClick={onClick}
        className={`flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group hover:shadow-md active:scale-[0.98] ${
        isDanger 
        ? 'bg-white border-red-50 hover:border-red-200' 
        : 'bg-white border-gray-100 hover:border-indigo-600/20'
    }`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${color}`}>
            {icon}
        </div>
        <div className="flex-1">
            <h4 className={`font-bold text-sm md:text-base ${isDanger ? 'text-slate-900 group-hover:text-red-600' : 'text-slate-900 group-hover:text-indigo-600'} transition-colors`}>{title}</h4>
            <p className="text-slate-400 text-xs font-medium">{desc}</p>
        </div>
        <div className={`opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 ${isDanger ? 'text-red-400' : 'text-slate-300'}`}>
             <ChevronRight size={20} />
        </div>
    </button>
);