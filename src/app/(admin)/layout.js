'use client';

import React, { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
import { HOME_ROUTE, LOGIN_ROUTE } from '@/constants/routes';
import { isUserAdmin } from '@/helpers/auth';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import AdminHeader from '@/components/admin/AdminHeader';

const AdminLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  const hasAdminAccess = isUserAdmin(user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const token =
      typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

    // If client is mounted and neither user nor token exists, redirect to login
    if (!user && !token) {
      router.push(LOGIN_ROUTE);
      return;
    }

    // If user is loaded but doesn't have admin privileges, redirect to home
    if (user && !hasAdminAccess) {
      router.push(HOME_ROUTE);
    }
  }, [isMounted, user, hasAdminAccess, router]);

  // Loading state while mounting or waiting for user rehydration
  if (!isMounted || !user || !hasAdminAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3 py-20">
        <Spinner className="h-10 w-10 fill-primary" />
        <p className="text-xs text-zinc-500 font-medium">Verifying admin credentials...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50/60 dark:bg-zinc-950">
      <AdminHeader />
      <div className="pb-12">{children}</div>
    </div>
  );
};

export default AdminLayout;