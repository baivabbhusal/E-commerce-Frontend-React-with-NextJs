'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react';
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  ORDER_ROUTE,
  PRODUCT_MANAGEMENT_ROUTE,
} from '@/constants/routes';
import { useSelector } from 'react-redux';

const navItems = [
  {
    label: 'Overview',
    href: DASHBOARD_ROUTE,
    icon: LayoutDashboard,
  },
  {
    label: 'Products',
    href: PRODUCT_MANAGEMENT_ROUTE,
    icon: Package,
  },
  {
    label: 'Add Product',
    href: `${PRODUCT_MANAGEMENT_ROUTE}/add`,
    icon: PlusCircle,
  },
  {
    label: 'Orders',
    href: ORDER_ROUTE,
    icon: ShoppingBag,
  },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="border-b border-primary/10 bg-white/95 backdrop-blur dark:bg-zinc-900 dark:border-zinc-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left branding */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm shadow-primary/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-primary dark:text-zinc-100">
                  Admin Workspace
                </span>
                <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                  {user?.role || user?.roles?.[0] || 'ADMIN'}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Logged in as <span className="font-medium text-zinc-700 dark:text-zinc-300">{user?.name || user?.email || 'Administrator'}</span>
              </p>
            </div>
          </div>

          {/* Center Navigation Links */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === DASHBOARD_ROUTE
                  ? pathname === DASHBOARD_ROUTE
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-zinc-600 hover:bg-primary/10 hover:text-primary dark:text-zinc-300 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Switch back to store */}
          <div className="flex items-center gap-2">
            <Link
              href={HOME_ROUTE}
              className="inline-flex items-center gap-1.5 rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all dark:border-zinc-700 dark:text-zinc-200"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              View Live Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
