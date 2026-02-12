import React, { useState, useCallback, memo } from 'react';
import { Product } from '../../../types';
import { ImageOff } from 'lucide-react';

interface Props {
  product: Product;
  onClick: (product: Product) => void;
}

// Optimized ProductCard with React.memo
export const ProductCard = memo<Props>(({ product, onClick }) => {
  const [imgError, setImgError] = useState(false);

  // Memoize the click handler
  const handleClick = useCallback(() => {
    onClick(product);
  }, [onClick, product]);

  // Memoize error handler
  const handleImageError = useCallback(() => {
    setImgError(true);
  }, []);

  // Optimize image URL for better performance
  const optimizedImageUrl = product.image.includes('unsplash')
    ? `${product.image}&w=600&q=80&fm=webp`
    : product.image;

  return (
    <div 
      onClick={handleClick}
      className="group cursor-pointer w-full relative"
      role="button"
      tabIndex={0}
      aria-label={`View ${product.title}`}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleClick();
        }
      }}
    >
      <div className="aspect-[3/4] relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gray-100 shadow-sm group-hover:shadow-lg group-hover:-translate-y-1 transition-all duration-300 will-change-transform">
        {/* Image */}
        {!imgError ? (
          <picture>
            {/* WebP format for modern browsers */}
            <source 
              srcSet={optimizedImageUrl}
              type="image/webp"
            />
            {/* Fallback to original format */}
            <img 
              src={product.image} 
              alt={product.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
              onError={handleImageError}
              loading="lazy"
              decoding="async"
              // Add blur-up effect with low-quality placeholder
              style={{
                backgroundColor: '#f1f5f9',
              }}
            />
          </picture>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-300">
             <ImageOff size={32} aria-label="Image failed to load" />
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-x-0 bottom-0 h-[65%] bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex flex-col items-center justify-end">
            <h3 className="text-white font-bold text-xs sm:text-[13px] text-center leading-tight line-clamp-2 drop-shadow-md group-hover:scale-105 transition-transform duration-300 group-hover:underline decoration-white/80 underline-offset-2">
              {product.title}
            </h3>
            
            {/* Optional: Show price on hover for better UX */}
            {product.priceStart && (
              <p className="text-white/80 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                From {product.priceStart}
              </p>
            )}
        </div>
        
        {/* Badge if product has special status */}
        {product.badge && (
          <div className="absolute top-2 right-2 bg-[#dc2625] text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {product.badge}
          </div>
        )}
        
        {/* Hot badge */}
        {product.isHot && (
          <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-pulse">
            🔥 HOT
          </div>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function to prevent unnecessary re-renders
  return (
    prevProps.product.id === nextProps.product.id &&
    prevProps.product.image === nextProps.product.image &&
    prevProps.product.title === nextProps.product.title
  );
});

// Display name for debugging
ProductCard.displayName = 'ProductCard';
