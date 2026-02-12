import React from 'react';
import { Product } from '../../../types';
import { Star } from 'lucide-react';

interface Props {
  product: Product;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  return (
    <div 
      onClick={() => onClick(product)}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-indigo-600/30 transition-all duration-300 cursor-pointer overflow-hidden relative flex flex-col"
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
           <button className="w-full bg-indigo-600 text-white py-2 rounded-xl text-xs font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Top Up Now
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
             <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">{product.publisher}</div>
             <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">
                <Star size={10} fill="currentColor" /> {product.rating}
             </div>
        </div>
        
        <h3 className="font-bold text-slate-800 text-sm leading-tight mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {product.title}
        </h3>
        
        <div className="mt-auto pt-2 border-t border-gray-50 flex items-center justify-between">
           <span className="text-[10px] text-slate-400 font-medium">Starts from</span>
           <span className="text-sm font-black text-indigo-600">{product.priceStart || '৳50'}</span>
        </div>
      </div>
    </div>
  );
};