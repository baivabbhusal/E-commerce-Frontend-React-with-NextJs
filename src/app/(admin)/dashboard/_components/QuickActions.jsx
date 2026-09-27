'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  PlusCircle,
  ShoppingBag,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';
import {
  PRODUCT_MANAGEMENT_ROUTE,
  ORDER_ROUTE,
  HOME_ROUTE,
} from '@/constants/routes';

export default function QuickActions() {
  const actions = [
    {
      title: 'Products Manager',
      desc: 'Edit prices, categories, and inventory',
      href: PRODUCT_MANAGEMENT_ROUTE,
      icon: Package,
      badge: 'Manage',
    },
    {
      title: 'Add New Product',
      desc: 'Create new catalog listing with photos',
      href: `${PRODUCT_MANAGEMENT_ROUTE}/add`,
      icon: PlusCircle,
      badge: 'Create',
    },
    {
      title: 'Customer Orders',
      desc: 'Review status, delivery and items',
      href: ORDER_ROUTE,
      icon: ShoppingBag,
      badge: 'Orders',
    },
    {
      title: 'Storefront',
      desc: 'Preview user-facing customer view',
      href: HOME_ROUTE,
      icon: ExternalLink,
      badge: 'Store',
    },
  ];

  return (
    <div className="space-y-3">
      <h2 className="text-base font-bold text-primary dark:text-white">
        Quick Shortcuts
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {actions.map((act, i) => {
          const Icon = act.icon;
          return (
            <Link
              key={i}
              href={act.href}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-400 group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full bg-secondary/10 px-2 py-0.5 text-[10px] font-bold text-secondary">
                    {act.badge}
                  </span>
                </div>
                <h3 className="mt-3 text-sm font-bold text-zinc-900 transition-colors group-hover:text-primary dark:text-zinc-100">
                  {act.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {act.desc}
                </p>
              </div>

              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-primary dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Access</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
