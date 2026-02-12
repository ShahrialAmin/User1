import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, LayoutGrid, Gift, Flame, Gamepad2, ThumbsUp, Smartphone, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { categories } from '../../../data';
import { Product, Category } from '../../../types';
import { ProductGrid, ProductFilters } from '../../../features/catalog/components';

const StorePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const onProductClick = (product: Product) => {
    navigate(`/store/product/${product.id}`);
  };

  // Reset pagination when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  // Filtering Logic
  const content = useMemo(() => {
    // 1. Search Mode: Search across all products
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      let foundProducts: Product[] = [];
      categories.forEach(cat => {
        cat.products.forEach(p => {
          if (p.title.toLowerCase().includes(query)) {
            foundProducts.push(p);
          }
        });
      });
      return { type: 'search', data: foundProducts };
    }

    // 2. Category Mode
    if (activeCategory === 'all') {
      return { type: 'sections', data: categories };
    } else {
      const category = categories.find(c => c.id === activeCategory);
      return { type: 'single', data: category ? [category] : [] };
    }
  }, [searchQuery, activeCategory]);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'bonus': return <Gift size={20} className="text-rose-600" />;
      case 'freefire': return <Flame size={20} className="text-orange-600" fill="currentColor" fillOpacity={0.2} />;
      case 'others': return <Gamepad2 size={20} className="text-indigo-600" />;
      case 'social': return <ThumbsUp size={20} className="text-blue-600" />;
      case 'apps': return <Smartphone size={20} className="text-purple-600" />;
      default: return <Layers size={20} className="text-slate-600" />;
    }
  };

  // Pagination Logic Helper
  const getPaginatedData = (items: Product[]) => {
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentItems = items.slice(startIndex, startIndex + itemsPerPage);
    return { currentItems, totalPages };
  };

  const renderContent = () => {
    if (content.type === 'search') {
       const products = content.data as Product[];
       const { currentItems, totalPages } = getPaginatedData(products);

       return (
          <div>
            <div className="flex items-center gap-2 mb-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm w-fit">
                <Search className="text-indigo-600" size={18} />
                <h2 className="text-sm font-bold text-slate-900">
                    Search Results: {products.length} items
                </h2>
            </div>
            {products.length > 0 ? (
                <>
                  <ProductGrid products={currentItems} onProductClick={onProductClick} />
                  {renderPagination(totalPages)}
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-xl border border-gray-100 border-dashed">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                        <Search className="text-slate-400" size={28} />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-0.5">No products found</h3>
                    <p className="text-slate-500 text-sm">We couldn't find anything matching "{searchQuery}"</p>
                </div>
            )}
          </div>
       );
    } 
    
    if (content.type === 'single') {
        const category = (content.data as Category[])[0];
        if (!category) return null;
        
        const { currentItems, totalPages } = getPaginatedData(category.products);

        return (
            <section className="scroll-mt-24">
                <div className="flex items-center gap-2 mb-3">
                    {getCategoryIcon(category.id)}
                    <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-wide">
                        {category.title}
                    </h2>
                </div>
                <ProductGrid products={currentItems} onProductClick={onProductClick} />
                {renderPagination(totalPages)}
            </section>
        );
    }

    // Default: All Sections (No Pagination, just scroll)
    return (
        <div className="space-y-8">
            {(content.data as Category[]).map((category) => (
                <section key={category.id} className="scroll-mt-24">
                        <div className="flex items-center gap-2 mb-3">
                        {getCategoryIcon(category.id)}
                        <h2 className="text-lg md:text-xl font-black text-slate-900 uppercase tracking-wide">
                            {category.title}
                        </h2>
                        </div>
                        <ProductGrid products={category.products} onProductClick={onProductClick} />
                </section>
            ))}
        </div>
    );
  };

  const renderPagination = (totalPages: number) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-2 mt-8 pb-4">
            <button 
                onClick={() => {
                    setCurrentPage(prev => Math.max(1, prev - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-slate-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronLeft size={18} />
            </button>
            
            <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                        key={page}
                        onClick={() => {
                            setCurrentPage(page);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
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
                onClick={() => {
                    setCurrentPage(prev => Math.min(totalPages, prev + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === totalPages}
                className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white text-slate-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                <ChevronRight size={18} />
            </button>
        </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-6 min-h-screen">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-600 shadow-sm border border-gray-100">
                <LayoutGrid size={20} />
             </div>
             <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Browse Products</h2>
                <p className="text-slate-500 text-sm font-medium">Select your favorite game or service</p>
             </div>
        </div>

        <div className="relative w-full md:w-72">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl leading-5 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 focus:border-indigo-600 text-sm font-bold text-slate-800 shadow-sm transition-all"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Category Tabs (Sticky) */}
      {!searchQuery && (
        <ProductFilters 
          activeCategory={activeCategory} 
          onCategoryChange={(cat) => {
            setActiveCategory(cat);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} 
          categories={categories}
        />
      )}

      {/* Content Grid */}
      <div className="animate-in fade-in duration-500 slide-in-from-bottom-4 mt-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default StorePage;
