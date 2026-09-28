'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  LOGIN_ROUTE,
  DASHBOARD_ROUTE,
  ORDER_ROUTE,
  CATEGORY_MANAGEMENT_ROUTE,
  USERS_ROUTE,
} from '@/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';
import { isUserAdmin } from '@/helpers/auth';

const AuthMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const isAdmin = isUserAdmin(user);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

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
    const roleDisplay = isAdmin ? 'Admin User' : (user.role || 'Customer');
    const displayName = user.name || user.email?.split('@')[0] || 'User';

    return (
      <div className="relative flex items-center gap-2" ref={menuRef}>
        {/* Clickable User Name */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-700 hover:border-primary/50 hover:text-primary transition dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
          title="Click to view user details"
        >
          <span className="max-w-[120px] truncate">{displayName}</span>
          <span className="text-[9px] text-zinc-400">▼</span>
        </button>

        {/* User Details Dropdown */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 z-50">
            <div className="pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {user.name || displayName}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {user.email || 'No email provided'}
              </p>
              <div className="mt-2 inline-block rounded-full bg-secondary/15 px-2.5 py-0.5 text-[10px] font-bold text-secondary">
                {roleDisplay}
              </div>
            </div>

            <div className="py-2 space-y-1 text-xs">
              {isAdmin && (
                <>
                  <Link
                    href={DASHBOARD_ROUTE}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-2.5 py-1.5 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                  >
                    Admin Dashboard
                  </Link>
                  <Link
                    href={CATEGORY_MANAGEMENT_ROUTE}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-2.5 py-1.5 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                  >
                    Manage Categories
                  </Link>
                  <Link
                    href={USERS_ROUTE}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-lg px-2.5 py-1.5 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
                  >
                    Admin Users
                  </Link>
                </>
              )}
              <Link
                href={ORDER_ROUTE}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-2.5 py-1.5 text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800 transition"
              >
                My Orders
              </Link>
            </div>

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                className="w-full rounded-xl bg-red-50 py-1.5 text-center text-xs font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-400 transition"
                onClick={logoutUser}
              >
                Log Out
              </button>
            </div>
          </div>
        )}

        <button
          className="text-xs text-secondary border-secondary border rounded-3xl px-3 py-1 font-semibold hover:bg-secondary hover:text-white transition active:scale-95"
          onClick={logoutUser}
        >
          Log Out
        </button>
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