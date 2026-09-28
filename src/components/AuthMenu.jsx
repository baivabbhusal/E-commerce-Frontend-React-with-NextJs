'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LOGIN_ROUTE, DASHBOARD_ROUTE, HOME_ROUTE, ORDER_ROUTE } from '@/constants/routes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';
import { isUserAdmin } from '@/helpers/auth';

const ADMIN_PREFIXES = ['/dashboard', '/product-management'];

const AuthMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = isUserAdmin(user);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const isOnAdminRoute = ADMIN_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function logoutUser() {
    setIsOpen(false);
    dispatch(logout());
    router.push(LOGIN_ROUTE);
  }

  if (user) {
    const displayName = user.name || user.email?.split('@')[0] || 'User';
    const initial = displayName.charAt(0).toUpperCase();
    const roleLabel = isAdmin ? 'Admin' : (user.role || 'User');

    return (
      <div className="relative" ref={menuRef}>
        {/* Circle Avatar Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          title={displayName}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shadow-md ring-2 ring-primary/30 hover:scale-105 hover:shadow-lg transition-all active:scale-95 select-none"
        >
          {initial}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-900 z-50 overflow-hidden">
            {/* User info header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white font-bold text-sm shrink-0">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">{displayName}</p>
                <span className="text-[10px] font-semibold text-secondary">{roleLabel}</span>
              </div>
            </div>

            {/* Links */}
            <div className="py-1.5">
              {/* Admin Panel — only for admins who are NOT already on admin routes */}
              {isAdmin && !isOnAdminRoute && (
                <Link
                  href={DASHBOARD_ROUTE}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                >
                  Admin Panel
                </Link>
              )}

              {/* Live Store — only when on admin routes */}
              {isOnAdminRoute && (
                <Link
                  href={HOME_ROUTE}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                >
                  Live Store
                </Link>
              )}

              {/* My Orders — only for non-admin users */}
              {!isAdmin && (
                <Link
                  href={ORDER_ROUTE}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                >
                  My Orders
                </Link>
              )}
            </div>

            {/* Logout */}
            <div className="border-t border-zinc-100 dark:border-zinc-800 p-2">
              <button
                onClick={logoutUser}
                className="w-full rounded-xl bg-red-50 py-2 text-xs font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 transition active:scale-95"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={LOGIN_ROUTE}
      className="text-xs sm:text-sm text-secondary border-secondary border-2 font-semibold rounded-3xl px-4 py-1 hover:bg-secondary hover:text-white transition"
    >
      Login
    </Link>
  );
};

export default AuthMenu;
