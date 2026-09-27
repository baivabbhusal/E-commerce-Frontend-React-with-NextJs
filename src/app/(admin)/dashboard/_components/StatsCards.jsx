'use client';

import React from 'react';
import { Package, Tags, DollarSign, Activity } from 'lucide-react';

export default function StatsCards({ products = [] }) {
  const totalProducts = products.length;
  const uniqueCategories = new Set(products.map((p) => p.category).filter(Boolean)).size;
  const totalValue = products.reduce((acc, p) => acc + (Number(p.price) || 0) * (Number(p.stock) || 1), 0);

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      subtext: `${totalProducts} catalog items`,
      icon: Package,
      iconBg: 'bg-primary/10 text-primary dark:bg-primary/25 dark:text-emerald-400',
    },
    {
      label: 'Active Categories',
      value: uniqueCategories || 6,
      subtext: 'Across shop sections',
      icon: Tags,
      iconBg: 'bg-secondary/15 text-secondary',
    },
    {
      label: 'Catalog Value',
      value: `Rs. ${totalValue.toLocaleString()}`,
      subtext: 'Estimated retail stock',
      icon: DollarSign,
      iconBg: 'bg-primary/10 text-primary dark:bg-primary/25 dark:text-emerald-400',
    },
    {
      label: 'System Status',
      value: 'Online',
      subtext: 'API connected',
      icon: Activity,
      iconBg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="flex items-center justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all hover:border-primary/30 dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
              <h3 className="mt-1.5 text-2xl font-black text-primary dark:text-zinc-100">
                {stat.value}
              </h3>
              <p className="mt-1 text-[11px] text-zinc-400 dark:text-zinc-500">
                {stat.subtext}
              </p>
            </div>

            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${stat.iconBg}`}>
              <Icon className="h-6 w-6" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
