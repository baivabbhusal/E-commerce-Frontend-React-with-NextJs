'use client';

import { usePathname } from 'next/navigation';
import Header from './header';

const ADMIN_PREFIXES = ['/dashboard', '/product-management'];

export default function HeaderWrapper() {
  const pathname = usePathname();
  const isAdminRoute = ADMIN_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );
  if (isAdminRoute) return null;
  return <Header />;
}
