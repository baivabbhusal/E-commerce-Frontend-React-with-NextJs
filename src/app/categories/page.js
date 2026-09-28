'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { categoryApi } from '@/services/api';
import { useSelector } from 'react-redux';
import { isUserAdmin } from '@/helpers/auth';
import Spinner from '@/components/Spinner';
import { CATEGORY_MANAGEMENT_ROUTE } from '@/constants/routes';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = isUserAdmin(user);

  useEffect(() => {
    async function load() {
      try {
        const data = await categoryApi.getAll();
        setCategories(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error('Failed to load categories:', e);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8 max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary dark:text-white">
            All Categories
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Explore our curated catalog by product categories.
          </p>
        </div>

        {isAdmin && (
          <Link
            href={CATEGORY_MANAGEMENT_ROUTE}
            className="self-start rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-sm hover:bg-primary/90 transition"
          >
            + Create & Manage Categories
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Spinner className="h-8 w-8 fill-primary" />
          <p className="text-xs text-zinc-500">Loading catalog categories...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-200 p-12 text-center dark:border-zinc-800">
          <p className="text-base font-semibold text-zinc-700 dark:text-zinc-300">
            No categories available yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {categories.map((cat) => {
            const catName = cat.name || cat.id;
            return (
              <Link
                key={cat.id || catName}
                href={`/products?category=${encodeURIComponent(catName)}`}
                className="group flex flex-col items-center rounded-2xl border border-zinc-200/80 bg-white p-4 text-center transition hover:border-primary hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800">
                  <img
                    src={
                      cat.imageUrl ||
                      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80'
                    }
                    alt={catName}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-3 text-xs sm:text-sm font-bold text-zinc-900 group-hover:text-primary dark:text-zinc-100 transition-colors">
                  {catName}
                </h3>
                {cat.description && (
                  <p className="mt-0.5 text-[11px] text-zinc-400 line-clamp-1">
                    {cat.description}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
