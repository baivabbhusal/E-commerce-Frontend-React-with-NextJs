'use client';

import React from 'react';
import { LOGIN_ROUTE, DASHBOARD_ROUTE } from '@/constants/routes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/auth/authSlice';
import { isUserAdmin } from '@/helpers/auth';
import { ShieldCheck, LogOut, User } from 'lucide-react';

const AuthMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const isAdmin = isUserAdmin(user);

  function logoutUser() {
    dispatch(logout());
    router.push(LOGIN_ROUTE);
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {isAdmin && (
          <Link
            href={DASHBOARD_ROUTE}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white shadow-sm shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        )}

        <div className="hidden lg:flex items-center gap-1 text-xs font-medium text-zinc-600 dark:text-zinc-300">
          <User className="h-3.5 w-3.5 text-primary" />
          <span className="max-w-[100px] truncate">{user.name || user.email?.split('@')[0]}</span>
        </div>

        <button
          className="inline-flex items-center gap-1 text-xs text-secondary border-secondary border rounded-3xl px-3 py-1 font-semibold hover:bg-secondary hover:text-white transition active:scale-95"
          onClick={logoutUser}
        >
          <LogOut className="h-3 w-3" />
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