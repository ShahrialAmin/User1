import React from 'react';
import { Product } from '../../../types';
import { ProductCard } from './ProductCard';

interface Props {
  products: Product[];
  onProductClick: (product: Product) => void;
}

export const ProductGrid: React.FC<Props> = ({ products, onProductClick }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-2 md:gap-4">
        {products.map((product) => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
        ))}
    </div>
  );
};