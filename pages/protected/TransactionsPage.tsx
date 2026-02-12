import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  LayoutList, 
  Clock, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  XCircle, 
  ArrowUpRight, 
  ArrowDownLeft, 
  FileText, 
  Copy, 
  X, 
  HelpCircle,
  Share2,
  Wallet,
  Gamepad2,
  Smartphone,
  User
} from 'lucide-react';

// Mock Data Integration
const mockOrders = [
  {
    id: '1001',
    date: '28 Feb 2024',
    time: '14:30',
    price: '৳150',
    status: 'complete',
    paymentMethod: 'bKash',
    trxId: 'TRX123456',
    pkg: 'Mobile Legends: 88 Diamonds',
    serial: 'SN001',
    playerId: '12345678 (1234)',
    codes: [],
    paymentNumber: '01700000000'
  },
  {
    id: '1002',
    date: '27 Feb 2024',
    time: '09:15',
    price: '৳350',
    status: 'pending',
    paymentMethod: 'Nagad',
    trxId: 'TRX789012',
    pkg: 'Free Fire: 520 Diamonds',
    serial: 'SN002',
    playerId: '987654321',
    codes: [],
    paymentNumber: '01800000000'
  },
  {
    id: '1003',
    date: '25 Feb 2024',
    time: '18:45',
    price: '৳1200',
    status: 'rejected',
    paymentMethod: 'Rocket',
    trxId: 'TRX345678',
    pkg: 'PUBG Mobile: 660 UC',
    serial: 'SN003',
    playerId: '555666777',
    codes: [],
    paymentNumber: '01900000000'
  },
  {
    id: '1004',
    date: '20 Feb 2024',
    time: '11:20',
    price: '৳500',
    status: 'complete',
    paymentMethod: 'Wallet',
    trxId: null,
    pkg: 'Steam Wallet $5',
    serial: 'SN004',
    playerId: null,
    codes: ['AAAA-BBBB-CCCC'],
    paymentNumber: null
  }
];

const TransactionsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTrx, setSelectedTrx] = useState<any>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const itemsPerPage = 10;
  
  const tabs = [
    { id: 'All', label: 'All', icon: LayoutList },
    { id: 'Pending', label: 'Pending', icon: Clock },
    { id: 'Complete', label: 'Complete', icon: CheckCircle2 },
    { id: 'Rejected', label: 'Rejected', icon: XCircle },
  ];

  // Generate Transactions from Orders
  const orderTransactions = mockOrders.map((order: any) => ({
      id: `ord-${order.id}`,
      date: order.date,
      time: order.time,
      amount: parseInt(order.price.replace(/[^0-9]/g, '')),
      status: order.status,
      trxId: order.paymentMethod.toLowerCase() === 'wallet' ? null : order.trxId,
      type: 'debit',
      method: order.paymentMethod,
      title: order.pkg,
      isOrder: true,
      serial: order.serial,
      playerId: order.playerId,
      codes: order.codes,
      paymentNumber: order.paymentNumber
  }));

  // Add Mock Deposits
  const depositTransactions = [
      { id: 'dep-1', date: '24 January 2026', time: '4:22 PM', amount: 500, status: 'complete', trxId: 'TRX981602', type: 'credit', method: 'bKash', title: 'Deposit Money', isOrder: false, paymentNumber: '01721627441' },
      { id: 'dep-2', date: '11 December 2025', time: '8:07 PM', amount: 1000, status: 'pending', trxId: 'TRX829971', type: 'credit', method: 'Nagad', title: 'Deposit Money', isOrder: false, paymentNumber: '01912345678' },
      { id: 'dep-3', date: '01 December 2025', time: '6:15 AM', amount: 200, status: 'complete', trxId: 'TRX773322', type: 'credit', method: 'Rocket', title: 'Deposit Money', isOrder: false, paymentNumber: '01855667788' },
  ];

  // Merge and Sort
  const allTransactions = [...orderTransactions, ...depositTransactions].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`).getTime();
      const dateB = new Date(`${b.date} ${b.time}`).getTime();
      return dateB - dateA;
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Lock scrolling when modal is open
  useEffect(() => {
    if (selectedTrx) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTrx]);

  const filteredTransactions = allTransactions.filter(trx => {
    if (activeTab === 'All') return true;
    return trx.status.toLowerCase() === activeTab.toLowerCase();
  });

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleShare = async () => {
    if (!selectedTrx) return;
    const text = `Transaction Details\n\nID: ${selectedTrx.trxId || selectedTrx.id}\nAmount: ${selectedTrx.amount} Tk\nStatus: ${selectedTrx.status}\nDate: ${selectedTrx.date}, ${selectedTrx.time}\nItem: ${selectedTrx.title}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Transaction Details',
          text: text,
        });
      } catch (err) {
        // Shared cancelled or failed silently
      }
    } else {
      navigator.clipboard.writeText(text);
      alert('Details copied to clipboard!');
    }
  };

  const handleReport = () => {
      if (!selectedTrx) return;
      const message = `Hello, I need help with transaction: ${selectedTrx.trxId || selectedTrx.id} (${selectedTrx.amount} Tk)`;
      const url = `https://wa.me/8801721627441?text=${encodeURIComponent(message)}`;
      window.open(url, '_blank');
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
        case 'complete': return 'text-emerald-600 bg-emerald-50 border-emerald-100';
        case 'pending': return 'text-amber-600 bg-amber-50 border-amber-100';
        case 'rejected': return 'text-red-600 bg-red-50 border-red-100';
        default: return 'text-gray-600 bg-gray-50 border-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
      switch(status.toLowerCase()) {
          case 'complete': return <CheckCircle2 size={16} />;
          case 'pending': return <Clock size={16} />;
          case 'rejected': return <XCircle size={16} />;
          default: return <Clock size={16} />;
      }
  };

  // Transaction Details Modal
  const TransactionModal = () => {
    if (!selectedTrx) return null;

    const content = (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedTrx(null)}>
        <div 
            className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Compact Header */}
          <div className="bg-[#F8F9FA] px-4 py-3 flex items-center justify-between border-b border-gray-100">
             <h3 className="font-bold text-slate-800 text-base">Transaction Details</h3>
             <button onClick={() => setSelectedTrx(null)} className="p-1.5 bg-white rounded-full text-slate-500 hover:text-red-500 shadow-sm border border-gray-100 transition-colors">
                <X size={16} />
             </button>
          </div>

          <div className="p-4">
             {/* Compact Summary Card */}
             <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-xl border border-gray-100">
                 <div className="flex items-center gap-3">
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                         selectedTrx.status === 'complete' ? 'bg-emerald-100 text-emerald-600' :
                         selectedTrx.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                         'bg-red-100 text-red-600'
                     }`}>
                         {selectedTrx.status === 'complete' ? <CheckCircle2 size={20} /> :
                          selectedTrx.status === 'pending' ? <Clock size={20} /> :
                          <XCircle size={20} />}
                     </div>
                     <div>
                         <div className={`text-xl font-black leading-none mb-1 ${selectedTrx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {selectedTrx.type === 'credit' ? '+' : '-'} ৳{selectedTrx.amount}
                         </div>
                         <div className="text-[10px] font-bold uppercase text-slate-400 tracking-wide">
                             {selectedTrx.date} • {selectedTrx.time}
                         </div>
                     </div>
                 </div>
                 <div className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(selectedTrx.status)}`}>
                     {selectedTrx.status}
                 </div>
             </div>

             {/* Compact Details List */}
             <div className="space-y-2 mb-5">
                 
                 {/* Trx ID */}
                 <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
                     <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                            <FileText size={12} />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wide leading-none mb-0.5">Trx ID</span>
                            <span className="text-xs font-bold text-slate-700 font-mono truncate leading-none">{selectedTrx.trxId || 'N/A'}</span>
                        </div>
                     </div>
                     {selectedTrx.trxId && (
                         <button onClick={() => handleCopy(selectedTrx.trxId)} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-gray-100 rounded transition-colors">
                             {copiedId === selectedTrx.trxId ? <CheckCircle2 size={14} className="text-emerald-500"/> : <Copy size={14} />}
                         </button>
                     )}
                 </div>

                 {/* Sender Number */}
                 {selectedTrx.paymentNumber && (
                    <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
                        <div className="flex items-center gap-2 overflow-hidden">
                           <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                               <Smartphone size={12} />
                           </div>
                           <div className="flex flex-col min-w-0">
                               <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wide leading-none mb-0.5">Sender Number</span>
                               <span className="text-xs font-bold text-slate-700 font-mono truncate leading-none">{selectedTrx.paymentNumber}</span>
                           </div>
                        </div>
                        <button onClick={() => handleCopy(selectedTrx.paymentNumber)} className="text-slate-400 hover:text-slate-600 p-1.5 hover:bg-gray-100 rounded transition-colors">
                             {copiedId === selectedTrx.paymentNumber ? <CheckCircle2 size={14} className="text-emerald-500"/> : <Copy size={14} />}
                        </button>
                    </div>
                 )}

                 {/* Grid: Method & Type */}
                 <div className="grid grid-cols-2 gap-2">
                     <div className="p-2 bg-white rounded-lg border border-gray-100 flex items-center gap-2 shadow-sm">
                         <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                               <Wallet size={12} />
                           </div>
                         <div className="flex flex-col">
                             <span className="text-[9px] uppercase font-bold text-slate-400 leading-none mb-0.5">Method</span>
                             <span className="text-xs font-bold text-slate-700 capitalize leading-none">{selectedTrx.method}</span>
                         </div>
                     </div>
                     <div className="p-2 bg-white rounded-lg border border-gray-100 flex items-center gap-2 shadow-sm">
                         <div className="w-6 h-6 rounded bg-slate-50 flex items-center justify-center text-slate-400">
                               {selectedTrx.type === 'credit' ? <ArrowDownLeft size={12} /> : <ArrowUpRight size={12} />}
                           </div>
                         <div className="flex flex-col">
                             <span className="text-[9px] uppercase font-bold text-slate-400 leading-none mb-0.5">Type</span>
                             <span className="text-xs font-bold text-slate-700 capitalize leading-none">{selectedTrx.type === 'credit' ? 'Deposit' : 'Expense'}</span>
                         </div>
                     </div>
                 </div>
                 
                 {/* Order Specifics */}
                 {selectedTrx.isOrder && (
                     <div className="p-2.5 bg-slate-50 rounded-lg border border-gray-100 mt-1">
                         <div className="flex items-center gap-2 mb-1.5">
                             <Gamepad2 size={12} className="text-slate-400" />
                             <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Item Details</span>
                         </div>
                         <p className="text-xs font-bold text-slate-800 line-clamp-2 pl-5 leading-tight mb-1">{selectedTrx.title}</p>
                         {selectedTrx.playerId && (
                             <div className="pl-5 flex items-center gap-1.5 text-[10px] text-slate-500 font-mono">
                                 <User size={10} /> UID: {selectedTrx.playerId}
                             </div>
                         )}
                     </div>
                 )}

             </div>

             {/* Footer Actions */}
             <div className="grid grid-cols-2 gap-3">
                <button 
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 font-bold text-xs text-slate-600 hover:bg-gray-50 transition-colors active:scale-95"
                >
                    <Share2 size={14} /> Share
                </button>
                <button 
                    onClick={handleReport}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200 active:scale-95"
                >
                    <HelpCircle size={14} /> Report Issue
                </button>
             </div>
          </div>
        </div>
      </div>
    );

    // Render via Portal to break out of transform context
    return createPortal(content, document.body);
  };

  return (
    <div className="max-w-5xl mx-auto md:px-6 lg:px-8 py-6">
      {TransactionModal()}

      {/* Header */}
      <div className="flex items-center gap-3 mb-6 px-4 md:px-0">
          <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
             <FileText size={20} />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Transactions</h2>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-20 bg-slate-50/95 backdrop-blur-sm pb-2 px-3 md:px-0 transition-all pt-2">
          <div className="flex p-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto scrollbar-hide gap-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-[100px] py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap border ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md border-indigo-600' 
                      : 'text-slate-500 border-transparent hover:bg-gray-50 hover:text-slate-700'
                  }`}
                >
                  <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'opacity-70'} />
                  {tab.label}
                </button>
              );
            })}
          </div>
      </div>

      {/* Table / List */}
      <div className="space-y-3 px-3 md:px-0">
         {currentTransactions.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Desktop Table Header */}
                <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-gray-50/50 border-b border-gray-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
                    <div className="col-span-4">Details</div>
                    <div className="col-span-3">Trx ID</div>
                    <div className="col-span-2">Method</div>
                    <div className="col-span-2 text-right">Amount</div>
                    <div className="col-span-1 text-right">Status</div>
                </div>

                <div className="divide-y divide-gray-100">
                    {currentTransactions.map((trx) => (
                        <div 
                            key={trx.id} 
                            onClick={() => setSelectedTrx(trx)}
                            className="p-4 md:px-6 md:py-4 hover:bg-gray-50/50 transition-colors cursor-pointer group relative active:bg-gray-100"
                        >
                            {/* Mobile View - Enhanced Card */}
                            <div className="md:hidden flex items-start justify-between">
                                <div className="flex items-center gap-3.5">
                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                                        trx.type === 'credit' 
                                          ? 'bg-emerald-50 border-emerald-100 text-emerald-600' 
                                          : 'bg-red-50 border-red-100 text-red-600'
                                    }`}>
                                        {trx.type === 'credit' ? <ArrowDownLeft size={20} strokeWidth={2.5} /> : <ArrowUpRight size={20} strokeWidth={2.5} />}
                                    </div>
                                    <div>
                                        <div className="font-bold text-slate-900 text-[15px] mb-0.5 line-clamp-1">{trx.title}</div>
                                        <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                                           <span>{trx.date}</span>
                                           <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                                           <span>{trx.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                    <span className={`font-black text-[15px] ${trx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                        {trx.type === 'credit' ? '+' : '-'} {trx.amount} ৳
                                    </span>
                                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(trx.status)}`}>
                                        {getStatusIcon(trx.status)}
                                        {trx.status}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Mobile Footer Info */}
                            <div className="md:hidden mt-3 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-slate-500">
                                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                                   <Wallet size={12} /> <span className="capitalize">{trx.method}</span>
                                </div>
                                {trx.trxId && (
                                    <div className="font-mono text-slate-400">#{trx.trxId}</div>
                                )}
                            </div>

                            {/* Desktop View (Grid) */}
                            <div className="hidden md:grid grid-cols-12 items-center">
                                <div className="col-span-4 flex items-center gap-3">
                                     <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${
                                        trx.type === 'credit' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                                    }`}>
                                        {trx.type === 'credit' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-bold text-slate-900 text-sm group-hover:text-indigo-600 transition-colors truncate">{trx.title}</div>
                                        <div className="text-xs text-slate-500 flex items-center gap-1">
                                            {trx.date}, {trx.time}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-3">
                                     {trx.trxId ? (
                                        <span className="text-xs font-mono font-bold text-slate-500 bg-gray-50 px-2 py-1 rounded border border-gray-100 group-hover:bg-white group-hover:border-indigo-600/30 transition-colors">
                                            {trx.trxId}
                                        </span>
                                     ) : (
                                        <span className="text-xs font-bold text-slate-400 italic px-2">
                                            --
                                        </span>
                                     )}
                                </div>
                                <div className="col-span-2">
                                     <span className="text-sm font-bold text-slate-700 capitalize">{trx.method}</span>
                                </div>
                                <div className={`col-span-2 text-right font-black text-sm ${trx.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                     {trx.type === 'credit' ? '+' : '-'} {trx.amount} ৳
                                </div>
                                <div className="col-span-1 text-right">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ml-auto border ${getStatusColor(trx.status)}`}>
                                        {getStatusIcon(trx.status)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
         ) : (
             <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-gray-100 border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                    <FileText size={28} className="text-slate-400" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-0.5">No transactions found</h3>
                <p className="text-slate-500 text-sm">No transaction history available for {activeTab}.</p>
            </div>
         )}
      </div>

      {/* Pagination */}
      {filteredTransactions.length > 0 && (
        <div className="flex items-center justify-center gap-2 mt-6">
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

export default TransactionsPage;
