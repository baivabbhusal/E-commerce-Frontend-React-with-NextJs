'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  DASHBOARD_ROUTE,
  HOME_ROUTE,
  ORDER_ROUTE,
  PRODUCT_MANAGEMENT_ROUTE,
  CATEGORY_MANAGEMENT_ROUTE,
  USERS_ROUTE,
  LOGIN_ROUTE,
} from '@/constants/routes';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';

const navItems = [
  {
    label: 'Overview',
    href: DASHBOARD_ROUTE,
  },
  {
    label: 'Products',
    href: PRODUCT_MANAGEMENT_ROUTE,
  },
  {
    label: 'Add Product',
    href: `${PRODUCT_MANAGEMENT_ROUTE}/add`,
  },
  {
    label: 'Categories',
    href: CATEGORY_MANAGEMENT_ROUTE,
  },
  {
    label: 'Orders',
    href: ORDER_ROUTE,
  },
  {
    label: 'Users',
    href: USERS_ROUTE,
  },
];

export default function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
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
  const roleDisplay = user?.role ? (user.role.toLowerCase() === 'admin' ? 'Admin User' : user.role) : 'Admin User';

  return (
    <div className="border-b border-primary/10 bg-white/95 backdrop-blur dark:bg-zinc-900 dark:border-zinc-800 relative z-40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Left branding & User Profile Trigger */}
          <div className="flex items-center gap-3 relative" ref={dropdownRef}>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-primary dark:text-zinc-100 text-sm">
                  Admin Workspace
                </span>
                <span className="rounded-full bg-secondary/15 px-2 py-0.5 text-[10px] font-bold text-secondary">
                  {roleDisplay}
                </span>
              </div>

              {/* Clickable User Name button that opens Admin User details */}
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Logged in as:</span>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen((prev) => !prev)}
                  className="group inline-flex items-center gap-1 text-xs font-semibold text-primary dark:text-emerald-400 hover:underline cursor-pointer"
                  title="Click to view Admin User details"
                >
                  <span>{displayName}</span>
                  <span className="text-[10px] text-zinc-400 transition-transform group-hover:translate-y-0.5">
                    ▼
                  </span>
                </button>
              </div>
            </div>

            {/* Admin User Details Dropdown / Popover */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-72 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 z-50">
                <div className="flex items-center gap-3 pb-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold text-sm">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {user?.name || displayName}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {user?.email || 'admin@store.com'}
                    </p>
                  </div>
                </div>

                {/* User Information */}
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

                {/* Quick Navigation Links */}
                <div className="py-2 space-y-1">
                  <Link
                    href={USERS_ROUTE}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block rounded-lg px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                  >
                    View All Users
                  </Link>
                  <Link
                    href={CATEGORY_MANAGEMENT_ROUTE}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block rounded-lg px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                  >
                    Manage Categories
                  </Link>
                  <Link
                    href={PRODUCT_MANAGEMENT_ROUTE}
                    onClick={() => setIsDropdownOpen(false)}
                    className="block rounded-lg px-2.5 py-1.5 text-xs text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                  >
                    Manage Products
                  </Link>
                </div>

                {/* Logout Action */}
                <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-xl bg-red-50 py-2 text-center text-xs font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 transition"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Center Navigation Links (Clean, no unnecessary icons) */}
          <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
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

          {/* Right: Switch back to store */}
          <div className="flex items-center gap-2">
            <Link
              href={HOME_ROUTE}
              className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary hover:text-white transition-all dark:border-zinc-700 dark:text-zinc-200"
            >
              Live Store
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
