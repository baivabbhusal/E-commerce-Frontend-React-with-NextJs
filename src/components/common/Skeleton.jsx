import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 animate-pulse">
      <div className="relative aspect-square w-full rounded-xl bg-zinc-200 dark:bg-zinc-800" />
      <div className="mt-4 space-y-2">
        <div className="h-3 w-1/3 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        <div className="h-4 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex items-center justify-between pt-2">
          <div className="h-5 w-1/4 rounded bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
