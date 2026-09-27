'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Sparkles } from 'lucide-react';
import { PRODUCT_MANAGEMENT_ROUTE } from '@/constants/routes';
import { useSelector } from 'react-redux';

export default function DashboardHeader() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary dark:text-white">
            Admin Overview
          </h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-bold text-secondary">
            <Sparkles className="h-3 w-3" /> Live
          </span>
        </div>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Welcome back, {user?.name || 'Admin'}! Here is what’s happening with your store today.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href={`${PRODUCT_MANAGEMENT_ROUTE}/add`}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>
    </div>
  );
}
