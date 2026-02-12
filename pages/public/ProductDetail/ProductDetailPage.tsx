import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { 
  Home, ChevronRight, Check, Wallet, Smartphone, 
  ShoppingCart, Zap, ShieldCheck, Info, AlertCircle, 
  Star, Minus, Plus, Gamepad2, ArrowRight, X, Share2, Copy, Link as LinkIcon, Clipboard
} from 'lucide-react';
import { categories } from '../../../data';
import { useAuthStore } from '../../../store/useAuthStore';
import { useCartStore } from '../../../store/useCartStore';
import { ProductCard } from '../../../features/catalog/components/ProductCard';

// Mock Data Generators
const getPackages = (title: string) => {
  const lowerTitle = title.toLowerCase();
  
  if (lowerTitle.includes('bonus')) {
    return [
      { id: 1, name: '100 Diamond', price: 78, originalPrice: 85, tag: 'SAVE 8%' },
      { id: 2, name: '115 Diamond', price: 80, originalPrice: 90, tag: 'HOT' },
      { id: 3, name: '355 Diamond', price: 240, originalPrice: 260 },
      { id: 4, name: '505 Diamond', price: 350, originalPrice: 380, tag: 'BEST VALUE' },
      { id: 5, name: '610 Diamond', price: 400, originalPrice: 450 },
      { id: 6, name: '1090 Diamond', price: 745, originalPrice: 800 },
      { id: 7, name: '1240 Diamond', price: 790, originalPrice: 850 },
    ];
  } else if (lowerTitle.includes('level up')) {
    return [
      { id: 1, name: 'Level Up Pass', price: 40, originalPrice: 50, tag: 'POPULAR' },
      { id: 2, name: 'Level Up [Lv.10]', price: 70, originalPrice: 80 },
      { id: 3, name: 'Level Up [Lv.15]', price: 70, originalPrice: 80 },
      { id: 4, name: 'Level Up [Lv.20]', price: 70, originalPrice: 80 },
      { id: 5, name: 'Full Level Up', price: 400, originalPrice: 450 },
    ];
  } else {
    // Default generic
    return [
      { id: 1, name: 'Starter Pack', price: 50, originalPrice: 60 },
      { id: 2, name: 'Pro Pack', price: 100, originalPrice: 120, tag: 'POPULAR' },
      { id: 3, name: 'Ultra Pack', price: 500, originalPrice: 550 },
    ];
  }
};

const ProductDetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, balance } = useAuthStore();
  const { addItem } = useCartStore();

  // Retrieve prefilled state if available (from login redirect)
  const prefilledState = location.state as { 
    selectedPkg?: number; 
    quantity?: number; 
    paymentMethod?: 'wallet' | 'instant'; 
    playerId?: string;
  } | null;
  
  // Find product from data
  const category = categories.find(c => c.products.some(p => p.id === id));
  const product = category?.products.find(p => p.id === id);
  
  // Get Related Products (exclude current, limit to 3)
  const relatedProducts = category ? category.products.filter(p => p.id !== id).slice(0, 3) : [];
  
  // Local state for UI - initialize with prefilled state if available
  const [selectedPkg, setSelectedPkg] = useState<number | null>(prefilledState?.selectedPkg || null);
  const [quantity, setQuantity] = useState(prefilledState?.quantity || 1);
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'instant'>(prefilledState?.paymentMethod || 'wallet');
  const [playerId, setPlayerId] = useState(prefilledState?.playerId || '');
  const [playerName, setPlayerName] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'guide' | 'rules'>('description');
  const [showCartModal, setShowCartModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  // Validation State
  const [errors, setErrors] = useState<{playerId?: string; pkg?: string}>({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-6 text-slate-300">
                  <Gamepad2 size={40} />
              </div>
              <h2 className="text-2xl font-black text-slate-900 mb-2">Product Not Found</h2>
              <p className="text-slate-500 mb-8 font-medium">The item you're looking for might have been removed.</p>
              <button onClick={() => navigate('/store')} className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold">Return to Store</button>
          </div>
      );
  }

  const packages = getPackages(product.title);
  const selectedPackageData = packages.find(p => p.id === selectedPkg);
  const totalPrice = selectedPackageData ? selectedPackageData.price * quantity : 0;

  const validatePurchase = () => {
    const newErrors: {playerId?: string; pkg?: string} = {};
    let isValid = true;

    if (!selectedPkg) {
      newErrors.pkg = "Please select a variation to continue.";
      isValid = false;
    }
    
    if (!playerId) {
       newErrors.playerId = "Player ID is required.";
       isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
        if (newErrors.pkg) {
             document.getElementById('variation-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (newErrors.playerId) {
             document.getElementById('account-section')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    return isValid;
  };

  const handleBuy = () => {
    if (!validatePurchase()) return;
    
    // Login check for all purchases - Redirect to login with current state if not logged in
    if (!isLoggedIn) {
      navigate('/login', { 
        state: { 
          from: {
             pathname: location.pathname,
             state: {
                 selectedPkg,
                 quantity,
                 paymentMethod,
                 playerId
             }
          } 
        } 
      });
      return;
    }
    
    if (paymentMethod === 'wallet') {
        if (balance >= totalPrice) {
            alert(`✅ Purchase Successful!\n\nItem: ${selectedPackageData?.name}\nTotal: ${totalPrice} Tk`);
        } else {
            alert(`❌ Insufficient Balance\n\nRequired: ${totalPrice} Tk\nAvailable: ${balance} Tk`);
        }
    } else {
        alert(`Redirecting to Payment Gateway...\nAmount: ${totalPrice} Tk`);
    }
  };

  const handleAddToCart = () => {
    if (!validatePurchase()) return;
    if (!selectedPackageData) return;

    addItem({
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        packageId: selectedPackageData.id,
        packageName: selectedPackageData.name,
        price: selectedPackageData.price,
        quantity: quantity,
        playerId: playerId
    });

    setShowCartModal(true);
  };

  const handleCheckPlayerId = () => {
    if(!playerId) {
        setErrors({...errors, playerId: "Enter ID first"});
        return;
    }
    setIsVerifying(true);
    setPlayerName(null);
    setTimeout(() => {
        setIsVerifying(false);
        setPlayerName("FLAME TOXIC X"); 
    }, 800);
  };
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
          setPlayerId(text);
          if (errors.playerId) setErrors({...errors, playerId: undefined});
          setPlayerName(null);
      }
    } catch (err) {
      console.error("Clipboard read failed", err);
    }
  };

  const handleQuantityUpdate = (delta: number) => {
    const nextQty = quantity + delta;
    if (nextQty >= 1 && nextQty <= 10) {
      setQuantity(nextQty);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const shareTo = (platform: string) => {
    const text = encodeURIComponent(`Check out ${product?.title} on Riyal Games!`);
    const url = encodeURIComponent(window.location.href);
    let link = '';

    switch (platform) {
        case 'facebook': link = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
        case 'whatsapp': link = `https://api.whatsapp.com/send?text=${text}%20${url}`; break;
        case 'telegram': link = `https://t.me/share/url?url=${url}&text=${text}`; break;
        case 'twitter': link = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
    }
    if (link) window.open(link, '_blank', 'width=600,height=400');
  };

  const CartSuccessModal = () => {
    if (!showCartModal) return null;

    return createPortal(
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setShowCartModal(false)}
      >
        <div 
          className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button 
             onClick={() => setShowCartModal(false)}
             className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
          >
             <X size={20} />
          </button>

          <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4 shadow-sm ring-4 ring-emerald-50">
                  <Check size={32} strokeWidth={3} />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-2">Added to Cart!</h3>
              <p className="text-slate-500 font-medium text-sm mb-6 leading-relaxed">
                 <span className="font-bold text-slate-800">{product?.title}</span> has been added to your cart successfully.
              </p>
              
              <div className="flex flex-col gap-3 w-full">
                  <button 
                    onClick={() => navigate('/cart')}
                    className="w-full bg-[#dc2625] hover:bg-[#b91c1c] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-200 flex items-center justify-center gap-2 active:scale-95"
                  >
                    Checkout Now <ArrowRight size={18} />
                  </button>
                  <button 
                    onClick={() => {
                        setShowCartModal(false);
                        navigate('/store');
                    }}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3.5 rounded-xl transition-all active:scale-95"
                  >
                    Continue Shopping
                  </button>
              </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  const ShareModal = () => {
    if (!showShareModal) return null;

    return createPortal(
      <div 
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={() => setShowShareModal(false)}
      >
        <div 
          className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl animate-in zoom-in-95 duration-200 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-black text-slate-900">Share this product</h3>
              <button 
                onClick={() => setShowShareModal(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
          </div>

          <div className="grid grid-cols-4 gap-4 mb-6">
              <button onClick={() => shareTo('facebook')} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
                      <i className="fa-brands fa-facebook text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">Facebook</span>
              </button>
              <button onClick={() => shareTo('whatsapp')} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
                      <i className="fa-brands fa-whatsapp text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">WhatsApp</span>
              </button>
              <button onClick={() => shareTo('telegram')} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-[#229ED9] text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
                      <i className="fa-brands fa-telegram text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">Telegram</span>
              </button>
              <button onClick={() => shareTo('twitter')} className="flex flex-col items-center gap-2 group">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center shadow-sm group-active:scale-95 transition-transform">
                      <i className="fa-brands fa-x-twitter text-xl"></i>
                  </div>
                  <span className="text-[10px] font-bold text-slate-600">X</span>
              </button>
          </div>

          <div className="bg-slate-50 rounded-xl p-2.5 flex items-center gap-2 border border-slate-200">
              <div className="bg-white p-1.5 rounded-lg border border-slate-100 text-slate-400">
                  <LinkIcon size={14} />
              </div>
              <input 
                  type="text" 
                  readOnly 
                  value={window.location.href} 
                  className="flex-1 bg-transparent text-xs font-medium text-slate-600 focus:outline-none truncate"
              />
              <button 
                  onClick={handleCopyLink}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      isCopied 
                      ? 'bg-green-500 text-white shadow-sm' 
                      : 'bg-slate-900 text-white hover:bg-slate-800'
                  }`}
              >
                  {isCopied ? 'Copied!' : 'Copy'}
              </button>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-24">
        {CartSuccessModal()}
        {ShareModal()}
        
        {/* 1. Breadcrumb - Border removed */}
        <div className="bg-white">
            <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-10 flex items-center justify-between text-xs text-slate-500 font-medium">
                <div className="flex items-center">
                    <Link to="/" className="hover:text-indigo-600 flex items-center"><Home size={12} /></Link>
                    <ChevronRight size={10} className="mx-1 text-slate-300" />
                    <Link to="/store" className="hover:text-indigo-600">Store</Link>
                    <ChevronRight size={10} className="mx-1 text-slate-300" />
                    <span className="text-slate-800 font-bold truncate max-w-[150px] sm:max-w-xs">{product.title}</span>
                </div>
                
                <button 
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-1 text-slate-400 hover:text-indigo-600 px-2 py-1 rounded-full hover:bg-indigo-50 transition-colors"
                >
                   <Share2 size={14} /> 
                   <span className="hidden sm:inline">Share</span>
                </button>
            </div>
        </div>

        {/* 2. Hero/Cover Section (Compact) */}
        <div className="relative mb-4">
            {/* Cover Image Background - Reduced Blur */}
            <div className="h-28 md:h-40 w-full bg-slate-900 relative overflow-hidden">
                <img src={product.image} className="w-full h-full object-cover opacity-40 blur-[2px] scale-110" alt="cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#F8F9FA] via-transparent to-transparent"></div>
            </div>

            {/* Overlapping Content - Side by Side */}
            <div className="max-w-4xl mx-auto px-2 md:px-4 relative -mt-14 md:-mt-20">
                <div className="flex items-end gap-4">
                    {/* Main Photo */}
                    <div className="w-24 h-24 md:w-36 md:h-36 rounded-xl bg-white p-1 shadow-lg ring-2 ring-white/50 flex-shrink-0 z-10">
                        <img src={product.image} className="w-full h-full object-cover rounded-lg" alt={product.title} />
                    </div>

                    {/* Title & Badges */}
                    <div className="flex-1 pb-1">
                        <h1 className="text-xl md:text-3xl font-black text-slate-900 mb-1.5 md:mb-2 drop-shadow-sm leading-tight">{product.title}</h1>
                        <div className="flex flex-wrap items-center gap-1.5">
                             <div className="bg-indigo-600 text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                <ShieldCheck size={10} /> Official
                             </div>
                             <div className="bg-[#dc2625] text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm">
                                <Zap size={10} fill="currentColor" /> Instant
                             </div>
                             <div className="bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                                <Star size={10} fill="currentColor" /> {product.rating}
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="max-w-4xl mx-auto px-2 md:px-4">
            <div className="space-y-3">

                {/* 3. Product Variation Section */}
                <section id="variation-section" className={`bg-white rounded-xl p-3 shadow-sm border transition-colors ${errors.pkg ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-100'}`}>
                    <h2 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#dc2625] text-white flex items-center justify-center text-xs">1</span>
                        Select Variation
                    </h2>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {packages.map((pkg) => (
                            <button
                                key={pkg.id}
                                onClick={() => {
                                    setSelectedPkg(pkg.id);
                                    if (errors.pkg) setErrors({...errors, pkg: undefined});
                                }}
                                className={`relative p-2.5 rounded-xl border-2 transition-all duration-200 text-left flex flex-col gap-0.5 group ${
                                    selectedPkg === pkg.id 
                                    ? 'border-[#dc2625] bg-red-50/20 shadow-sm' 
                                    : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {pkg.tag && (
                                    <span className="absolute -top-2 right-2 bg-[#dc2625] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow-sm z-10">
                                        {pkg.tag}
                                    </span>
                                )}
                                <span className={`text-xs font-bold line-clamp-1 ${selectedPkg === pkg.id ? 'text-[#dc2625]' : 'text-slate-700'}`}>
                                    {pkg.name}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className={`text-sm md:text-base font-black ${selectedPkg === pkg.id ? 'text-[#dc2625]' : 'text-slate-900'}`}>
                                        ৳{pkg.price}
                                    </span>
                                    {pkg.originalPrice && (
                                        <span className="text-[10px] text-slate-400 line-through font-medium">৳{pkg.originalPrice}</span>
                                    )}
                                </div>
                                {selectedPkg === pkg.id && (
                                    <div className="absolute top-2 right-2 text-[#dc2625]">
                                        <Check size={14} strokeWidth={3} />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                    {errors.pkg && (
                        <div className="mt-2 text-xs font-bold text-red-500 flex items-center gap-1 animate-pulse">
                            <AlertCircle size={12} /> {errors.pkg}
                        </div>
                    )}
                </section>

                {/* 4. Account Info Section */}
                <section id="account-section" className={`bg-white rounded-xl p-4 shadow-sm border transition-colors ${errors.playerId ? 'border-red-300 ring-2 ring-red-100' : 'border-gray-100'}`}>
                    <h2 className="text-base font-black text-slate-900 mb-3 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-md bg-[#dc2625] text-white flex items-center justify-center text-xs">2</span>
                            Account Info
                        </div>
                        <Link to="#" className="text-[#dc2625] text-[10px] font-bold hover:underline transition-all">
                            Tutorial?
                        </Link>
                    </h2>
                    
                    <div className="flex flex-col gap-4">
                        {/* Player ID */}
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mb-1.5 block ml-1">Player ID (UID)</label>
                            <div className="relative">
                                <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none ${errors.playerId ? 'text-red-400' : 'text-slate-400'}`}>
                                    <Gamepad2 size={16} />
                                </div>
                                <input 
                                    type="text" 
                                    placeholder="e.g. 12345678"
                                    value={playerId}
                                    onChange={(e) => {
                                        setPlayerId(e.target.value);
                                        if (playerName) setPlayerName(null);
                                        if (errors.playerId) setErrors({...errors, playerId: undefined});
                                    }}
                                    className={`w-full pl-9 pr-10 py-2.5 bg-gray-50 border rounded-lg text-slate-900 font-bold focus:outline-none transition-all text-sm ${
                                        errors.playerId 
                                        ? 'border-red-300 focus:border-red-500 bg-red-50/10 placeholder-red-300' 
                                        : 'border-gray-200 focus:border-[#dc2625] focus:bg-white'
                                    }`}
                                />
                                <button
                                    onClick={handlePaste}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text(indigo-600 transition-colors"
                                    title="Paste from clipboard"
                                >
                                    <Clipboard size={16} />
                                </button>
                            </div>
                            {errors.playerId && (
                                <div className="mt-2 text-xs font-bold text-red-500 flex items-center gap-1 animate-pulse">
                                    <AlertCircle size={12} /> {errors.playerId}
                                </div>
                            )}

                            {/* Expandable Check Button - Increased height (py-3.5) */}
                            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${playerId && !playerName && !errors.playerId ? 'max-h-16 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                <button 
                                    onClick={handleCheckPlayerId}
                                    disabled={isVerifying}
                                    className="w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 py-3.5 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2"
                                >
                                    {isVerifying ? (
                                        <>Checking...</>
                                    ) : (
                                        <>Check Player Name <ArrowRight size={12} /></>
                                    )}
                                </button>
                            </div>

                            {/* Verified Name Result */}
                            {playerName && (
                                <div className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-3 py-2.5 rounded-lg border border-emerald-100 animate-in fade-in slide-in-from-top-1">
                                    <Check size={12} strokeWidth={3} /> Verified: {playerName}
                                    <button onClick={() => setPlayerName(null)} className="ml-auto text-slate-400 hover:text-red-500 transition-colors">Change</button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 5. Checkout Section */}
                <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                    <h2 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2">
                        <span className="w-6 h-6 rounded-md bg-[#dc2625] text-white flex items-center justify-center text-xs">3</span>
                        Checkout
                    </h2>

                    {/* Payment Options - Force 2 Columns on Mobile */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                         {/* Wallet */}
                         <button
                            onClick={() => setPaymentMethod('wallet')}
                            className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                                paymentMethod === 'wallet' 
                                ? 'border-[#dc2625] bg-red-50/10 relative' 
                                : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200'
                            }`}
                         >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentMethod === 'wallet' ? 'bg-[#dc2625] text-white' : 'bg-gray-200 text-slate-400'}`}>
                                <Wallet size={16} />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="block font-bold text-slate-900 text-xs">Wallet Pay</span>
                                {isLoggedIn ? (
                                    <span className="text-[9px] font-medium text-slate-500">Bal: {balance.toFixed(0)} Tk</span>
                                ) : (
                                    <span className="text-[9px] font-bold text-indigo-600">Login</span>
                                )}
                            </div>
                            {paymentMethod === 'wallet' && <div className="absolute top-1.5 right-1.5 text-[#dc2625]"><Check size={14} strokeWidth={3} /></div>}
                         </button>

                         {/* Instant */}
                         <button
                            onClick={() => setPaymentMethod('instant')}
                            className={`p-3 rounded-lg border flex flex-col items-center justify-center gap-1.5 text-center transition-all ${
                                paymentMethod === 'instant' 
                                ? 'border-[#dc2625] bg-red-50/10 relative' 
                                : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200'
                            }`}
                         >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${paymentMethod === 'instant' ? 'bg-[#dc2625] text-white' : 'bg-gray-200 text-slate-400'}`}>
                                <Smartphone size={16} />
                            </div>
                            <div className="flex flex-col items-center">
                                <span className="block font-bold text-slate-900 text-xs">Instant Pay</span>
                                <span className="text-[9px] font-medium text-slate-500">bKash / Nagad</span>
                            </div>
                            {paymentMethod === 'instant' && <div className="absolute top-1.5 right-1.5 text-[#dc2625]"><Check size={14} strokeWidth={3} /></div>}
                         </button>
                    </div>

                    {/* Total & Quantity & Buttons */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-t border-gray-100 pt-4">
                        
                        {/* Left Side: Price & Quantity */}
                        <div className="flex items-center justify-between w-full md:w-auto gap-6 md:gap-8">
                            <div className="text-left">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Total Amount</span>
                                <div className="flex items-center gap-0.5">
                                    <span className="text-2xl font-black text-slate-900">{totalPrice}</span>
                                    <span className="text-xs font-bold text-slate-500 mb-1">Tk</span>
                                </div>
                            </div>

                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
                                <button 
                                    onClick={() => handleQuantityUpdate(-1)}
                                    disabled={quantity <= 1}
                                    className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border transition-all active:scale-95 ${
                                        quantity <= 1 
                                        ? 'text-slate-300 border-gray-200 cursor-not-allowed' 
                                        : 'text-[#dc2625] border-red-100 hover:bg-red-50 hover:border-red-200'
                                    }`}
                                >
                                    <Minus size={14} strokeWidth={3} />
                                </button>
                                <span className="font-black text-slate-900 text-lg w-6 text-center">{quantity}</span>
                                <button 
                                    onClick={() => handleQuantityUpdate(1)}
                                    disabled={quantity >= 10}
                                    className={`w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm border transition-all active:scale-95 ${
                                        quantity >= 10 
                                        ? 'text-slate-300 border-gray-200 cursor-not-allowed' 
                                        : 'text-[#dc2625] border-red-100 hover:bg-red-50 hover:border-red-200'
                                    }`}
                                >
                                    <Plus size={14} strokeWidth={3} />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
                            <button 
                                onClick={handleAddToCart}
                                className="h-12 w-12 flex items-center justify-center rounded-xl border border-slate-200 text-slate-500 hover:border-[#dc2625] hover:text-[#dc2625] transition-colors"
                            >
                                <ShoppingCart size={20} />
                            </button>
                            <button 
                                onClick={handleBuy}
                                className="flex-1 md:flex-none h-12 bg-[#dc2625] hover:bg-[#b91c1c] text-white px-6 rounded-xl font-bold text-sm shadow-lg shadow-red-200 transition-all active:scale-95 flex items-center justify-center gap-2 min-w-[160px]"
                            >
                                Buy Now <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* 6. Tabs Section */}
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="flex border-b border-gray-100">
                        <button 
                            onClick={() => setActiveTab('description')}
                            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${activeTab === 'description' ? 'border-[#dc2625] text-[#dc2625]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                        >
                            Description
                        </button>
                        <button 
                            onClick={() => setActiveTab('guide')}
                            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${activeTab === 'guide' ? 'border-[#dc2625] text-[#dc2625]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                        >
                            Buying Guide
                        </button>
                        <button 
                            onClick={() => setActiveTab('rules')}
                            className={`flex-1 py-3 text-xs font-bold text-center border-b-2 transition-colors ${activeTab === 'rules' ? 'border-[#dc2625] text-[#dc2625]' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
                        >
                            Rules
                        </button>
                    </div>
                    <div className="p-4 text-xs md:text-sm text-slate-600 leading-relaxed min-h-[120px]">
                        {activeTab === 'description' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2">
                                <p className="mb-2">
                                    Top up <strong>{product.title}</strong> instantly! Just select the denomination you want to purchase, complete the payment, and the diamonds will be added to your account immediately.
                                </p>
                                <p>This service is authorized and powered by {product.publisher}. 100% Secure.</p>
                            </div>
                        )}
                        {activeTab === 'guide' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2">
                                <ol className="list-decimal pl-4 space-y-1">
                                    <li>Select your desired diamond package.</li>
                                    <li>Enter your Player ID (UID) correctly.</li>
                                    <li>Choose your payment method and complete the transaction.</li>
                                    <li>The diamonds will be credited to your account within 1-5 minutes.</li>
                                </ol>
                            </div>
                        )}
                        {activeTab === 'rules' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 space-y-2">
                                <div className="flex gap-2 items-start text-amber-600 bg-amber-50 p-2.5 rounded-lg">
                                    <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
                                    <span>Only for Bangladesh Server accounts.</span>
                                </div>
                                <div className="flex gap-2 items-start text-blue-600 bg-blue-50 p-2.5 rounded-lg">
                                    <Info size={14} className="mt-0.5 flex-shrink-0" />
                                    <span>Refunds are not possible if you provide the wrong Player ID.</span>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* 7. Related Products Section */}
                <section className="pt-4">
                    <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Gamepad2 className="text-[#dc2625]" size={18} /> Related Products
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                        {relatedProducts.length > 0 ? (
                            relatedProducts.map(p => (
                                <ProductCard key={p.id} product={p} onClick={() => navigate(`/store/product/${p.id}`)} />
                            ))
                        ) : (
                            <p className="text-slate-500 text-xs">No related products found.</p>
                        )}
                    </div>
                </section>

            </div>
        </div>
    </div>
  );
};

export default ProductDetailsPage;
