import React, { useState, useEffect } from 'react';
import { LayoutList, Clock, CheckCircle2, Copy, Ticket, ShoppingBag, Check, ChevronLeft, ChevronRight, XCircle, Search, ImageOff } from 'lucide-react';

// Inline Mock Data
const mockOrders = [
  {
    id: '1',
    serial: 'ORD-882190',
    date: '28 Feb 2024',
    time: '14:30',
    status: 'complete',
    pkg: 'Mobile Legends: 88 Diamonds',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=200&h=200',
    playerId: '12345678 (1234)',
    qty: 1,
    price: '৳150',
    paymentMethod: 'bKash',
    paymentNumber: '01700000000',
    trxId: 'TRX123456',
    codes: []
  },
  {
    id: '2',
    serial: 'ORD-882191',
    date: '27 Feb 2024',
    time: '09:15',
    status: 'pending',
    pkg: 'Free Fire: 520 Diamonds',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=200&h=200',
    playerId: '987654321',
    qty: 2,
    price: '৳700',
    paymentMethod: 'Nagad',
    paymentNumber: '01800000000',
    trxId: 'TRX789012',
    codes: []
  },
  {
    id: '3',
    serial: 'ORD-882192',
    date: '25 Feb 2024',
    time: '18:45',
    status: 'rejected',
    pkg: 'PUBG Mobile: 660 UC',
    image: 'https://images.unsplash.com/photo-1592478411213-61535fdd861d?auto=format&fit=crop&q=80&w=200&h=200',
    playerId: '555666777',
    qty: 1,
    price: '৳1200',
    paymentMethod: 'Rocket',
    paymentNumber: '01900000000',
    trxId: 'TRX345678',
    codes: []
  },
  {
    id: '4',
    serial: 'ORD-882193',
    date: '20 Feb 2024',
    time: '11:20',
    status: 'complete',
    pkg: 'Steam Wallet $5',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=200&h=200',
    playerId: null,
    qty: 1,
    price: '৳500',
    paymentMethod: 'Wallet',
    trxId: null,
    codes: ['STEAM-AAAA-BBBB-CCCC']
  }
];

const OrdersPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedState, setCopiedState] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const itemsPerPage = 10;

  const tabs = [
    { id: 'All', label: 'All', icon: LayoutList },
    { id: 'Pending', label: 'Pending', icon: Clock },
    { id: 'Complete', label: 'Complete', icon: CheckCircle2 },
    { id: 'Rejected', label: 'Rejected', icon: XCircle },
  ];

  // Reset page when tab or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const filteredOrders = mockOrders.filter(order => {
    const matchesTab = activeTab === 'All' || order.status.toLowerCase() === activeTab.toLowerCase();
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery || 
        (order.serial && order.serial.toLowerCase().includes(searchLower)) ||
        (order.pkg && order.pkg.toLowerCase().includes(searchLower)) ||
        (order.playerId && order.playerId.toLowerCase().includes(searchLower)) ||
        (order.trxId && order.trxId.toLowerCase().includes(searchLower));

    return matchesTab && matchesSearch;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopy = (text: string, id: string) => {
      navigator.clipboard.writeText(text);
      setCopiedState(id);
      setTimeout(() => setCopiedState(null), 1500);
  };

  const getStatusColor = (status: string) => {
      switch(status.toLowerCase()) {
          case 'complete': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
          case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
          case 'processing': return 'bg-blue-50 text-blue-600 border-blue-100';
          case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
          default: return 'bg-gray-50 text-gray-600 border-gray-100';
      }
  };

  const getPaymentBadge = (method: string) => {
    const m = method.toLowerCase();
    let colorClass = 'bg-gray-100 text-slate-600 border border-gray-200'; // Default
    
    if (m.includes('bkash')) colorClass = 'bg-pink-600 text-white border-pink-600';
    else if (m.includes('nagad')) colorClass = 'bg-orange-500 text-white border-orange-500';
    else if (m.includes('rocket')) colorClass = 'bg-purple-600 text-white border-purple-600';
    else if (m.includes('upay')) colorClass = 'bg-blue-700 text-white border-blue-700';
    else if (m.includes('wallet')) colorClass = 'bg-slate-800 text-white border-slate-800';

    return (
      <span className={`px-1.5 py-[1px] rounded text-[9px] font-bold uppercase tracking-wide ml-2 shadow-sm ${colorClass}`}>
        {method}
      </span>
    );
  };

  return (
    <div className="max-w-5xl mx-auto md:px-6 lg:px-8 py-6">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
             <ShoppingBag size={20} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">My Orders</h2>
      </div>

      {/* Search Bar */}
      <div className="mb-4 relative px-3 md:px-0">
          <div className="absolute inset-y-0 left-3 md:left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
              type="text"
              className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 transition-all placeholder:text-slate-400"
              placeholder="Search order no, item name, or player ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
          />
      </div>
        
      {/* Tabs */}
      <div className="sticky top-16 z-20 bg-slate-50/95 backdrop-blur-sm pb-2 transition-all pt-2">
          <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-2 px-4 md:px-0 md:p-1 md:bg-white md:rounded-xl md:shadow-sm md:border md:border-gray-100">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`flex-none min-w-[100px] py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap border shadow-sm md:shadow-none ${
                    isActive 
                      ? 'bg-indigo-600 text-white border-indigo-600 md:shadow-md' 
                      : 'bg-white md:bg-transparent text-slate-500 border-gray-100 md:border-transparent hover:bg-gray-50 hover:text-slate-700'
                  }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'opacity-70'} />
                  {tab.label}
                </button>
              );
            })}
          </div>
      </div>
        
      {/* Content List */}
      <div className="space-y-3 px-3 md:px-0 mt-3">
            {currentOrders.length > 0 ? (
                currentOrders.map((order) => {
                    // Check if payment is external (not Wallet)
                    const isExternal = ['bkash', 'nagad', 'rocket', 'upay'].some(p => order.paymentMethod.toLowerCase().includes(p));

                    return (
                        <div key={order.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:border-indigo-600/20 hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-300 group">
                            
                            {/* Top Row: Order No, Date/Time & Status */}
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[13px] font-black text-slate-900 uppercase tracking-tight">
                                            {order.serial}
                                        </span>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleCopy(order.serial, `serial-${order.id}`);
                                            }}
                                            className="text-slate-400 hover:text-indigo-600 p-1 rounded-full hover:bg-indigo-50 transition-all"
                                            title="Copy Order No"
                                        >
                                            {copiedState === `serial-${order.id}` ? (
                                                <Check size={12} className="text-green-600" strokeWidth={3} />
                                            ) : (
                                                <Copy size={12} />
                                            )}
                                        </button>
                                    </div>
                                    <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                        <Clock size={10} /> {order.date} at {order.time}
                                    </span>
                                </div>

                                {/* Status Badge */}
                                <div className="relative group/tooltip cursor-help flex-shrink-0">
                                    <div className={`px-2 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wide border flex items-center gap-1.5 ${getStatusColor(order.status)}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'complete' ? 'bg-emerald-500' : order.status === 'pending' ? 'bg-amber-500' : order.status === 'rejected' ? 'bg-red-500' : 'bg-blue-500'}`}></span>
                                        {order.status}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Title - Variation + Product Name with Icon */}
                            <h3 className="font-bold text-slate-900 text-[15px] leading-tight mb-2 flex items-start gap-2">
                                {order.image && (
                                   <div className="w-6 h-6 rounded-md overflow-hidden flex-shrink-0 border border-gray-100 mt-0.5">
                                      <img 
                                        src={order.image} 
                                        alt="Product" 
                                        className="w-full h-full object-cover" 
                                        onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-slate-50', 'text-slate-300');
                                            e.currentTarget.parentElement!.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="2" x2="22" y1="2" y2="22"/><path d="M10.41 10.41a2 2 0 1 1-2.83-2.83"/><line x1="13.8" x2="15.8" y1="13.5" y2="11.5"/><line x1="15.8" x2="21" y1="11.5" y2="16.5"/><line x1="6" x2="6" y1="19" y2="16"/><path d="M4 4h.01"/><path d="M4 20h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3.4"/></svg>';
                                        }}
                                      />
                                   </div>
                                )}
                                <span>{order.pkg}</span>
                            </h3>
                            
                            {/* Details Lines - Compact */}
                            <div className="flex flex-col gap-1 text-[13px] border-t border-gray-50 pt-2">
                                 {/* Player ID (Only for direct top-ups) */}
                                 {order.playerId && (
                                    <div className="font-bold text-slate-800 flex items-center gap-1">
                                        Player ID: <span className="text-slate-600 font-medium font-mono">{order.playerId}</span>
                                    </div>
                                 )}

                                 {/* Quantity Line */}
                                 <div className="font-bold text-slate-800">
                                     Quantity: <span className="text-slate-600 font-medium">{order.qty}</span>
                                 </div>

                                 {/* Price Line */}
                                 <div className="font-bold text-slate-800 flex items-center">
                                     Price: <span className="text-indigo-600 ml-1">{order.price}</span>
                                     {/* If Wallet, show payment badge here. If external, show on new lines. */}
                                     {!isExternal && getPaymentBadge(order.paymentMethod)}
                                 </div>

                                 {/* External Payment Info */}
                                 {isExternal && (
                                    <>
                                        <div className="font-bold text-slate-800">
                                            Paid from: <span className="text-slate-600 font-medium font-mono">{order.paymentNumber || 'N/A'}</span>
                                        </div>
                                        <div className="font-bold text-slate-800 flex items-center">
                                            TrxID: <span className="text-slate-600 font-medium font-mono ml-1 mr-1">{order.trxId}</span>
                                            {getPaymentBadge(order.paymentMethod)}
                                        </div>
                                    </>
                                 )}
                            </div>

                            {/* Codes & Actions - Only for Voucher orders (has codes) */}
                            {order.codes && order.codes.length > 0 && (
                                <div className="mt-2 pt-2 border-t border-gray-100 flex flex-col gap-1.5">
                                    {/* Codes List */}
                                    <div className="space-y-1">
                                        {order.codes.map((code, idx) => {
                                            const codeId = `${order.id}-code-${idx}`;
                                            const isCopied = copiedState === codeId;
                                            return (
                                                <div key={idx} className="flex items-center justify-between gap-2 bg-slate-50 px-2.5 py-2 rounded-lg border border-slate-200 border-dashed group/code hover:border-indigo-200 transition-colors">
                                                    <div className="flex items-center gap-2 min-w-0">
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">Code</span>
                                                        <span className="font-mono text-slate-800 text-xs font-bold truncate select-all">{code}</span>
                                                    </div>
                                                    <button 
                                                        onClick={() => handleCopy(code, codeId)}
                                                        className={`p-1.5 rounded transition-colors ${isCopied ? 'text-green-500 bg-green-50' : 'text-slate-400 hover:text-indigo-600 hover:bg-white'}`}
                                                        title="Copy Code"
                                                    >
                                                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-2 mt-1">
                                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg text-xs font-bold transition-all shadow-sm shadow-indigo-100 flex items-center justify-center gap-1.5 active:scale-[0.98]">
                                            <Ticket size={14} /> Redeem
                                        </button>
                                        <button 
                                            onClick={() => handleCopy(order.codes.join('\n'), `all-${order.id}`)}
                                            className="bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-[0.98]"
                                        >
                                            {copiedState === `all-${order.id}` ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                                            {copiedState === `all-${order.id}` ? 'Copied!' : 'Copy All'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-gray-100 border-dashed">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                        <LayoutList size={28} className="text-slate-400" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-0.5">No orders found</h3>
                    <p className="text-slate-500 text-sm">
                        {searchQuery ? `No orders found for "${searchQuery}"` : `You haven't placed any orders in ${activeTab} yet.`}
                    </p>
                </div>
            )}
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6 pb-20 md:pb-6">
            <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={16} />
            </button>
            
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-all ${
                            currentPage === page
                                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                                : 'bg-white text-slate-600 border border-gray-200 hover:bg-gray-50'
                        }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white text-slate-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={16} />
            </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
