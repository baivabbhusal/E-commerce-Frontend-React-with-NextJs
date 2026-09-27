'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Edit, Package } from 'lucide-react';
import { PRODUCT_MANAGEMENT_ROUTE } from '@/constants/routes';
import emptyImage from '@/assets/images/products/imagePlaceholder.png';

export default function RecentProducts({ products = [], isLoading = false }) {
  const displayProducts = products.slice(0, 6);

  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
        <div>
          <h2 className="text-base font-bold text-primary dark:text-white">
            Recent Catalog Items
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Latest added items in your store
          </p>
        </div>
        <Link
          href={PRODUCT_MANAGEMENT_ROUTE}
          className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-secondary dark:text-emerald-400 transition-colors"
        >
          View Full Table <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      {isLoading ? (
        <div className="space-y-3 pt-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-12 w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 animate-pulse" />
          ))}
        </div>
      ) : displayProducts.length > 0 ? (
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {displayProducts.map((p) => {
            const id = p._id || p.id;
            const img = p.imageUrls?.[0] || p.imageUrl || emptyImage;
            return (
              <div
                key={id}
                className="flex items-center justify-between py-3 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40 rounded-xl px-2 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-primary/5 dark:bg-zinc-800 shrink-0">
                    <Image
                      src={img}
                      alt={p.name || 'Product'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {p.name}
                    </h4>
                    <span className="text-[11px] font-medium text-secondary">
                      {p.category || 'General'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-extrabold text-primary dark:text-emerald-400">
                      Rs. {Number(p.price || 0).toLocaleString()}
                    </p>
                    <p className="text-[10px] text-zinc-400">Stock: {p.stock ?? 'In Stock'}</p>
                  </div>

                  <Link
                    href={`${PRODUCT_MANAGEMENT_ROUTE}/update/${id}`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-white transition-colors"
                    title="Edit Product"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-10 text-center">
          <Package className="mx-auto h-10 w-10 text-zinc-300 dark:text-zinc-600 mb-2" />
          <p className="text-xs text-zinc-500">No products found yet in catalog.</p>
          <Link
            href={`${PRODUCT_MANAGEMENT_ROUTE}/add`}
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-secondary transition-colors"
          >
            Create First Product
          </Link>
        </div>
      )}
    </div>
  );
}
