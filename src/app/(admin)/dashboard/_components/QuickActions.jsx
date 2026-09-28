'use client';

import React from 'react';
import Link from 'next/link';
import {
  PRODUCT_MANAGEMENT_ROUTE,
  CATEGORY_MANAGEMENT_ROUTE,
  ORDER_ROUTE,
  USERS_ROUTE,
  HOME_ROUTE,
} from '@/constants/routes';

export default function QuickActions() {
  const actions = [
    {
      title: 'Products Manager',
      desc: 'Edit prices, inventory, and listings',
      href: PRODUCT_MANAGEMENT_ROUTE,
      badge: 'Manage',
    },
    {
      title: 'Add New Product',
      desc: 'Create new catalog listing with photos',
      href: `${PRODUCT_MANAGEMENT_ROUTE}/add`,
      badge: 'Create',
    },
    {
      title: 'Categories Manager',
      desc: 'Create and organize product categories',
      href: CATEGORY_MANAGEMENT_ROUTE,
      badge: 'Categories',
    },
    {
      title: 'Customer Orders',
      desc: 'Review status, delivery, and payments',
      href: ORDER_ROUTE,
      badge: 'Orders',
    },
    {
      title: 'Admin & Users',
      desc: 'View registered accounts and admin users',
      href: USERS_ROUTE,
      badge: 'Users',
    },
    {
      title: 'View Storefront',
      desc: 'Preview live customer shopping experience',
      href: HOME_ROUTE,
      badge: 'Store',
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-primary dark:text-white">
        Quick Shortcuts
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((act, i) => {
          return (
            <Link
              key={i}
              href={act.href}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-zinc-900 group-hover:text-primary dark:text-zinc-100 transition-colors">
                    {act.title}
                  </span>
                  <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary">
                    {act.badge}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
                  {act.desc}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Access</span>
                <span>&rarr;</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
