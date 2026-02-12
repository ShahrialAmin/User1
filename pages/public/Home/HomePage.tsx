import React, { useEffect, useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSlider } from '../../../ui/marketing/HeroSlider';
import { NoticeBar } from '../../../ui/marketing/NoticeBar';
import { ArrowRight, Gift, Flame, Gamepad2, Smartphone, Play } from 'lucide-react';
import { categories } from '../../../data';
import { ProductCard } from '../../../features/catalog/components/ProductCard';
import type { Product } from '../../../types';

// Memoized section header component
const SectionHeader = memo<{ 
  title: string, 
  icon: React.ReactNode, 
  color: string,
  centered?: boolean,
  slimUnderline?: boolean
}>(({ title, icon, color, centered = false, slimUnderline = false }) => {
  return (
    <div className={`flex items-center gap-2 mb-3 ${centered ? 'justify-center' : ''}`}>
      <div className={color}>
        {icon}
      </div>
      <h2 className={`text-xl font-black text-slate-900 uppercase tracking-tighter underline decoration-[#dc2625] underline-offset-4 ${slimUnderline ? 'decoration-2' : 'decoration-4'}`}>
        {title}
      </h2>
    </div>
  );
});

SectionHeader.displayName = 'SectionHeader';

// Memoized product section component
const ProductSection = memo<{
  category: any;
  icon: React.ReactNode;
  color: string;
  gridCols?: string;
  onProductClick: (id: string) => void;
}>(({ category, icon, color, gridCols = 'grid-cols-3 md:grid-cols-4 lg:grid-cols-5', onProductClick }) => {
  if (!category) return null;

  return (
    <section className="container mx-auto px-2 md:px-4 mb-8">
      <SectionHeader 
        title={category.title} 
        icon={icon} 
        color={color} 
        slimUnderline={true}
      />
      <div className={`grid ${gridCols} gap-2 md:gap-3`}>
        {category.products.map((p: Product) => (
          <ProductCard 
            key={p.id} 
            product={p} 
            onClick={() => onProductClick(p.id)} 
          />
        ))}
      </div>
    </section>
  );
});

ProductSection.displayName = 'ProductSection';

// Memoized download app banner
const DownloadAppBanner = memo(() => {
  return (
    <section className="container mx-auto px-2 md:px-4 mb-12">
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="mb-4">
          <div className="w-16 h-16 relative">
            <Play className="text-green-500 w-full h-full fill-green-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-white" style={{ clipPath: 'polygon(0 0, 0 100%, 100% 50%)', marginLeft: '4px' }}></div>
            </div>
            <svg viewBox="0 0 512 512" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M74.8 440.3L253 261.2 74.8 82.2c-2.4 2.4-4 5.8-4 9.6v339c0 3.8 1.6 7.2 4 9.5z" fill="#2196F3"/>
              <path d="M375.3 138.8l-87.7 87.7-34.6 34.7L74.8 82.2c4.1-4.4 10.1-6.6 16.5-5.9 6.4.7 12.1 4.3 15.3 9.9l268.7 152.6z" fill="#4CAF50"/>
              <path d="M375.3 373.2L106.6 525.8c-3.2 5.6-8.9 9.2-15.3 9.9-6.4.7-12.4-1.5-16.5-5.9l178.2-179.1 34.6 34.7 87.7 87.8z" fill="#E91E63"/>
              <path d="M375.3 373.2l-34.6-34.7-34.6-34.7 34.6-34.7 34.6-34.7 48.9 27.8c18.8 10.7 18.8 56.7 0 67.4l-48.9 43.6z" fill="#FFC107"/>
            </svg>
          </div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-4">Download Our Mobile App</h3>
        <button className="flex items-center gap-2 font-bold text-slate-900 text-lg hover:text-[#dc2625] transition-colors group">
          Click Here <ArrowRight className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
        </button>
      </div>
    </section>
  );
});

DownloadAppBanner.displayName = 'DownloadAppBanner';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Memoize category lookups
  const categoryMap = useMemo(() => {
    const map = new Map();
    categories.forEach(cat => {
      map.set(cat.id, cat);
    });
    return map;
  }, []);

  const bonusCat = categoryMap.get('bonus');
  const freeFireCat = categoryMap.get('freefire');
  const othersCat = categoryMap.get('others');
  const socialCat = categoryMap.get('social');
  const appsCat = categoryMap.get('apps');

  // Memoized product click handler
  const handleProductClick = useCallback((productId: string) => {
    navigate(`/store/product/${productId}`);
  }, [navigate]);

  return (
    <div className="pb-24 bg-[#F8F9FA] min-h-screen relative">
      
      {/* Notice Bar */}
      <NoticeBar />

      {/* Hero Section */}
      <section className="container mx-auto px-2 md:px-4 pt-2 pb-3">
        <HeroSlider />
      </section>

      {/* BONUS EVENT */}
      {bonusCat && (
        <ProductSection
          category={bonusCat}
          icon={<Gift size={20} />}
          color="text-[#dc2625]"
          gridCols="grid-cols-2 md:grid-cols-4 lg:grid-cols-5"
          onProductClick={handleProductClick}
        />
      )}

      {/* FREE FIRE TOPUP */}
      {freeFireCat && (
        <ProductSection
          category={freeFireCat}
          icon={<Flame size={20} />}
          color="text-orange-500"
          onProductClick={handleProductClick}
        />
      )}

      {/* OTHERS GAMES */}
      {othersCat && (
        <ProductSection
          category={othersCat}
          icon={<Gamepad2 size={20} />}
          color="text-indigo-600"
          onProductClick={handleProductClick}
        />
      )}

      {/* LIKE-FOLLOW-SUBSCRIBER */}
      {socialCat && (
        <ProductSection
          category={socialCat}
          icon={<Gamepad2 size={20} />}
          color="text-blue-600"
          onProductClick={handleProductClick}
        />
      )}

      {/* APP SUBSCRIPTION */}
      {appsCat && (
        <ProductSection
          category={appsCat}
          icon={<Smartphone size={20} />}
          color="text-purple-600"
          onProductClick={handleProductClick}
        />
      )}

      {/* DOWNLOAD APP BANNER */}
      <DownloadAppBanner />
    </div>
  );
};

// Export with default for lazy loading
export default HomePage;
