'use client';

import React from 'react';
import Navlinks from '@/constants/navlinks';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { isUserAdmin } from '@/helpers/auth';
import { DASHBOARD_ROUTE, PRODUCT_MANAGEMENT_ROUTE } from '@/constants/routes';
import { ShieldCheck } from 'lucide-react';

const NavbarMenu = () => {
  const pathname = usePathname();
  const { user } = useSelector((state) => state.auth);
  const isAdmin = isUserAdmin(user);

  return (
    <nav className="hidden md:flex items-center gap-5">
      {Navlinks.map((navlink) => {
        const isActive =
          pathname === navlink.route ||
          (navlink.route !== '/' && pathname.startsWith(navlink.route));
        return (
          <Link
            key={navlink.route}
            href={navlink.route}
            className={`text-sm hover:text-primary transition-colors ${
              isActive
                ? 'text-secondary font-semibold'
                : 'text-zinc-700 dark:text-zinc-300'
            }`}
          >
            {navlink.label}
          </Link>
        );
      })}

      {isAdmin && (
        <Link
          href={DASHBOARD_ROUTE}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full transition-all ${
            pathname.startsWith(DASHBOARD_ROUTE) ||
            pathname.startsWith(PRODUCT_MANAGEMENT_ROUTE)
              ? 'bg-primary text-white shadow-sm'
              : 'bg-primary/10 text-primary hover:bg-primary hover:text-white dark:bg-primary/20 dark:text-emerald-300'
          }`}
        >
          <ShieldCheck className="h-3.5 w-3.5" />
          Admin Panel
        </Link>
      )}
    </nav>
  );
};

export default NavbarMenu;