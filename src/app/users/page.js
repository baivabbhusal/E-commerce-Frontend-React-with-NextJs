'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllUsers } from '@/api/users';
import { useSelector } from 'react-redux';
import { isUserAdmin } from '@/helpers/auth';
import Spinner from '@/components/Spinner';
import { DASHBOARD_ROUTE, HOME_ROUTE } from '@/constants/routes';

export default function UsersPage() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    let isMounted = true;

    async function fetchUsers() {
      try {
        setIsLoading(false);
        const res = await getAllUsers();
        const data = res?.data || res;
        let list = Array.isArray(data) ? data : (data?.users || data?.items || []);

        // If list is empty but currentUser is logged in, ensure currentUser is shown
        if (list.length === 0 && currentUser) {
          list = [
            {
              _id: currentUser._id || 'admin-curr',
              name: currentUser.name || 'Admin User',
              email: currentUser.email || 'admin@store.com',
              role: currentUser.role || 'ADMIN',
              createdAt: new Date().toISOString(),
            },
          ];
        }

        if (isMounted) {
          setUsers(list);
        }
      } catch (err) {
        console.warn('Failed to load users from backend, showing current session:', err.message);
        if (currentUser && isMounted) {
          setUsers([
            {
              _id: currentUser._id || 'admin-curr',
              name: currentUser.name || 'Admin User',
              email: currentUser.email || 'admin@store.com',
              role: currentUser.role || 'ADMIN',
              createdAt: new Date().toISOString(),
            },
          ]);
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchUsers();

    return () => {
      isMounted = false;
    };
  }, [currentUser]);

  const isAdmin = isUserAdmin(currentUser);

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (u.name || '').toLowerCase().includes(q) ||
      (u.email || '').toLowerCase().includes(q) ||
      (u.role || '').toLowerCase().includes(q);

    const role = (u.role || '').toUpperCase();
    const matchesRole =
      roleFilter === 'ALL'
        ? true
        : roleFilter === 'ADMIN'
        ? role === 'ADMIN' || role.includes('ADMIN')
        : role !== 'ADMIN' && !role.includes('ADMIN');

    return matchesSearch && matchesRole;
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6 max-w-6xl">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary dark:text-white">
              User Accounts
            </h1>
            <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-xs font-bold text-secondary">
              {users.length} Registered
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Overview of registered customers and administrator users.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <Link
              href={DASHBOARD_ROUTE}
              className="rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition"
            >
              Back to Dashboard
            </Link>
          ) : (
            <Link
              href={HOME_ROUTE}
              className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-200"
            >
              Back to Store
            </Link>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <input
          type="text"
          placeholder="Search by name, email, or role..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent px-3 py-1.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none dark:text-zinc-100"
        />

        <div className="flex items-center gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-zinc-100 dark:border-zinc-800 pt-2 sm:pt-0 sm:pl-3">
          <button
            onClick={() => setRoleFilter('ALL')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              roleFilter === 'ALL'
                ? 'bg-primary text-white'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setRoleFilter('ADMIN')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              roleFilter === 'ADMIN'
                ? 'bg-primary text-white'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            Admin Users
          </button>
          <button
            onClick={() => setRoleFilter('CUSTOMER')}
            className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
              roleFilter === 'CUSTOMER'
                ? 'bg-primary text-white'
                : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
            }`}
          >
            Customers
          </button>
        </div>
      </div>

      {/* Users Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Spinner className="h-8 w-8 fill-primary" />
          <p className="text-xs text-zinc-500">Loading user accounts...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-white dark:bg-zinc-900">
          <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
            No users match the criteria.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-zinc-50 text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="px-5 py-3">User</th>
                <th className="px-5 py-3">Email</th>
                <th className="px-5 py-3">Role</th>
                <th className="px-5 py-3">User ID</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredUsers.map((u) => {
                const role = (u.role || '').toUpperCase();
                const isUserAdminRole = role === 'ADMIN' || role.includes('ADMIN');
                const isSelf = currentUser?.email === u.email;

                return (
                  <tr
                    key={u._id || u.id || u.email}
                    className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="px-5 py-3.5 font-medium text-zinc-900 dark:text-zinc-100">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 font-bold text-xs">
                          {(u.name || u.email || 'U').charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {u.name || 'Anonymous User'}
                          </p>
                          {isSelf && (
                            <span className="text-[10px] text-primary font-bold">
                              (Current Session)
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-zinc-600 dark:text-zinc-300">
                      {u.email}
                    </td>

                    <td className="px-5 py-3.5">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          isUserAdminRole
                            ? 'bg-secondary/15 text-secondary dark:bg-secondary/25'
                            : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300'
                        }`}
                      >
                        {isUserAdminRole ? 'Admin User' : 'Customer'}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 font-mono text-[11px] text-zinc-400">
                      {u._id || u.id || '—'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
