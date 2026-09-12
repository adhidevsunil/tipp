'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Sun, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/useCartStore';

export interface ProductType {
  _id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  images: { url: string; public_id: string }[];
  careInstructions: {
    sunlight: string;
    watering: string;
    difficulty: string;
  };
}

interface ProductCardProps {
  product: ProductType;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.stock > 0) {
      addToCart({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0]?.url || 'https://via.placeholder.com/400',
        qty: 1,
        stock: product.stock
      });
      alert('Added to cart!');
    }
  };

  return (
    <Link 
      href={`/product/${product._id}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl bg-white/60 p-3 shadow-sm glass hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2",
        className
      )}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={product.images[0]?.url || 'https://via.placeholder.com/400'}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.stock <= 0 ? (
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 backdrop-blur-md">
              Out of stock
            </span>
          ) : product.stock < 5 ? (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700 backdrop-blur-md">
              Only {product.stock} left
            </span>
          ) : null}
        </div>
        
        {/* Interaction overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center translate-y-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 px-4">
           <Button 
             variant="glass" 
             className="w-full bg-white/20 backdrop-blur-md hover:bg-white text-gray-900 border-none rounded-xl font-semibold shadow-lg"
             onClick={handleAddToCart}
             disabled={product.stock <= 0}
           >
             <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
           </Button>
        </div>
      </div>
      
      <div className="flex flex-1 flex-col p-4 pt-5">
        <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium text-primary-light uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center space-x-2">
            <span className="flex items-center" title="Sunlight">
              <Sun className="mr-1 h-3 w-3" /> {product.careInstructions?.sunlight}
            </span>
            <span className="flex items-center" title="Watering">
              <Droplets className="mr-1 h-3 w-3 text-blue-400" /> {product.careInstructions?.watering}
            </span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="mt-2 text-2xl font-black text-primary">
          ₹{product.price.toLocaleString('en-IN')}
        </p>
      </div>
    </Link>
  );
}
