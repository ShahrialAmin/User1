import React from 'react';
import { LayoutGrid, Gift, Flame, Gamepad2, ThumbsUp, Smartphone, Layers } from 'lucide-react';
import { Category } from '../../../types';

interface Props {
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  categories: Category[];
}

export const ProductFilters: React.FC<Props> = ({ activeCategory, onCategoryChange, categories }) => {
  const categoryTabs = [
    { id: 'all', title: 'All' },
    ...categories.map(c => ({ id: c.id, title: c.title }))
  ];

  return (
    <div className="sticky top-16 z-30 bg-slate-50/95 backdrop-blur-sm pb-2 pt-2 transition-all -mx-2 md:mx-0">
         <div className="flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] gap-2 px-2 md:px-0 md:p-1 md:bg-white md:rounded-xl md:shadow-sm md:border md:border-gray-100">
            {categoryTabs.map((tab) => {
                const isActive = activeCategory === tab.id;
                
                // Icon mapping
                let Icon = Layers;
                if (tab.id === 'bonus') Icon = Gift;
                if (tab.id === 'freefire') Icon = Flame;
                if (tab.id === 'others') Icon = Gamepad2;
                if (tab.id === 'social') Icon = ThumbsUp;
                if (tab.id === 'apps') Icon = Smartphone;
                if (tab.id === 'all') Icon = LayoutGrid;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onCategoryChange(tab.id)}
                        className={`flex-none py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap border shadow-sm md:shadow-none ${
                            isActive
                            ? 'bg-indigo-600 text-white border-indigo-600 md:shadow-md'
                            : 'bg-white md:bg-transparent text-slate-500 border-gray-100 md:border-transparent hover:bg-gray-50 hover:text-slate-700'
                        }`}
                    >
                        <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-white' : 'opacity-70'} />
                        {tab.title}
                    </button>
                );
            })}
        </div>
    </div>
  );
};