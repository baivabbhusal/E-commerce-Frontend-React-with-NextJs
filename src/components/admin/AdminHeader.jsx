'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HOME_ROUTE,
  DASHBOARD_ROUTE,
  PRODUCT_MANAGEMENT_ROUTE,
  CATEGORY_MANAGEMENT_ROUTE,
  ORDER_ROUTE,
  USERS_ROUTE,
  LOGIN_ROUTE,
} from '@/constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';

const navItems = [
  { label: 'Overview', href: DASHBOARD_ROUTE },
  { label: 'Products', href: PRODUCT_MANAGEMENT_ROUTE },
  { label: 'Add Product', href: `${PRODUCT_MANAGEMENT_ROUTE}/add` },
  { label: 'Categories', href: CATEGORY_MANAGEMENT_ROUTE },
  { label: 'Orders', href: ORDER_ROUTE },
  { label: 'Users', href: USERS_ROUTE },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    router.push(LOGIN_ROUTE);
  };

  const displayName = user?.name || user?.email?.split('@')[0] || 'Administrator';
  const roleDisplay = user?.role
    ? user.role.toLowerCase() === 'admin' ? 'Admin User' : user.role
    : 'Admin User';
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <div className="border-b border-primary/10 bg-white/95 backdrop-blur dark:bg-zinc-900 dark:border-zinc-800 sticky top-0 z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">

          {/* Left: Branding */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-extrabold text-primary dark:text-zinc-100 text-sm">
              Admin Workspace
            </span>
            <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
              {roleDisplay}
            </span>
          </div>

          {/* Center: Nav Links */}
          <div className="flex flex-wrap items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === DASHBOARD_ROUTE
                  ? pathname === DASHBOARD_ROUTE
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-zinc-600 hover:bg-primary/10 hover:text-primary dark:text-zinc-300 dark:hover:bg-zinc-800'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right: Live Store + Avatar */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href={HOME_ROUTE}
              className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all dark:border-zinc-700 dark:text-zinc-200"
            >
              Live Store
            </Link>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                title={`${displayName} - click for options`}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shadow-md hover:scale-105 hover:shadow-lg transition-all active:scale-95 select-none ring-2 ring-primary/30"
              >
                {initial}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 z-50">
                  <div className="flex items-center gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shrink-0">
                      {initial}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                        {user?.name || displayName}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {user?.email || ''}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                        {roleDisplay}
                      </span>
                    </div>
                  </div>

                  <div className="py-3 space-y-2 text-xs border-b border-zinc-100 dark:border-zinc-800">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Account Role</span>
                      <span className="font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full text-[11px]">
                        {roleDisplay}
                      </span>
                    </div>
                    {user?._id && (
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500 dark:text-zinc-400">User ID</span>
                        <span className="font-mono text-[10px] text-zinc-700 dark:text-zinc-300 truncate max-w-[140px]">
                          {user._id}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 dark:text-zinc-400">Privileges</span>
                      <span className="font-medium text-emerald-600 dark:text-emerald-400">
                        Full Store Admin
                      </span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      onClick={handleLogout}
                      className="w-full rounded-xl bg-red-50 py-2 text-center text-xs font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 transition active:scale-95"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
