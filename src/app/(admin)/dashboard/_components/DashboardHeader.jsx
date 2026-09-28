'use client';

import React from 'react';
import Link from 'next/link';
import {
  PRODUCT_MANAGEMENT_ROUTE,
  CATEGORY_MANAGEMENT_ROUTE,
} from '@/constants/routes';
import { useSelector } from 'react-redux';

export default function DashboardHeader() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-primary dark:text-white">
          Admin Overview
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
          Welcome back, {user?.name || 'Admin'}! Here is what’s happening with your store today.
        </p>
      </div>

      <div className="flex items-center gap-2.5">
        <Link
          href={CATEGORY_MANAGEMENT_ROUTE}
          className="rounded-xl border border-primary/20 bg-white px-3.5 py-2 text-xs sm:text-sm font-semibold text-primary hover:bg-primary/5 transition dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-200"
        >
          + Create Category
        </Link>
        <Link
          href={`${PRODUCT_MANAGEMENT_ROUTE}/add`}
          className="rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/20 transition-all hover:bg-primary/90 active:scale-95"
        >
          + Add Product
        </Link>
      </div>
    </div>
  );
}
