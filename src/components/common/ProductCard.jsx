'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingBag, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/cart/cartSlice';
import { toast } from 'react-toastify';
import { PRODUCT_ROUTE } from '@/constants/routes';
import emptyImage from '@/assets/images/products/imagePlaceholder.png';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  if (!product) return null;

  const id = product._id || product.id;
  const imageSrc =
    (product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls[0]
      : null) ||
    product.imageUrl ||
    product.image ||
    emptyImage;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const productToAdd = {
      _id: id,
      name: product.name,
      price: product.price,
      imageUrls: product.imageUrls || (product.imageUrl ? [product.imageUrl] : []),
      category: product.category,
    };

    dispatch(addToCart(productToAdd));
    toast.success('Product added to cart!', {
      autoClose: 1200,
    });
  };

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
      <div>
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-primary/5 dark:bg-zinc-800/60">
          <Link href={`${PRODUCT_ROUTE}/${id}`} className="block h-full w-full">
            <Image
              src={imageSrc}
              alt={product.name || 'Product Image'}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </Link>

          {/* Discount Badge using secondary */}
          <span className="absolute top-2.5 left-2.5 rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Featured
          </span>
        </div>

        {/* Info */}
        <div className="mt-3.5 space-y-1">
          {product.category && (
            <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
              {product.category}
            </p>
          )}

          <Link href={`${PRODUCT_ROUTE}/${id}`}>
            <h3 className="line-clamp-1 text-sm font-bold text-zinc-900 transition-colors group-hover:text-primary dark:text-zinc-100">
              {product.name}
            </h3>
          </Link>

          {/* Rating using secondary */}
          <div className="flex items-center gap-1 text-xs text-secondary">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="font-semibold">4.9</span>
            <span className="text-[11px] text-zinc-400">(120+)</span>
          </div>
        </div>
      </div>

      {/* Price & Add to Cart button */}
      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 dark:border-zinc-800">
        <div>
          <p className="text-base font-extrabold text-primary dark:text-emerald-400">
            Rs. {Number(product.price || 0).toLocaleString()}
          </p>
        </div>

        <button
          onClick={handleAddToCart}
          aria-label="Add to cart"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-secondary hover:shadow-md active:scale-95"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
