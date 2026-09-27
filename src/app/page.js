'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  ShoppingBag,
  TrendingUp,
} from 'lucide-react';
import { productApi, categoryApi } from '@/services/api';
import ProductCard from '@/components/common/ProductCard';
import { ProductCardSkeleton } from '@/components/common/Skeleton';
import plant from '@/assets/plant.png';

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [isCatLoading, setIsCatLoading] = useState(true);
  const [productsData, setProductsData] = useState({ items: [] });
  const [isProdLoading, setIsProdLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        const catRes = await categoryApi.getAll();
        if (isMounted) {
          setCategories(Array.isArray(catRes) ? catRes : catRes?.items || []);
        }
      } catch (err) {
        console.error('Failed to load categories:', err);
      } finally {
        if (isMounted) setIsCatLoading(false);
      }

      try {
        const prodRes = await productApi.getAll({ pageSize: 8, sortBy: 'newest' });
        if (isMounted) {
          setProductsData(
            Array.isArray(prodRes) ? { items: prodRes } : prodRes || { items: [] }
          );
        }
      } catch (err) {
        console.error('Failed to load products:', err);
      } finally {
        if (isMounted) setIsProdLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const products =
    productsData?.items || (Array.isArray(productsData) ? productsData : []);

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary/[0.04] dark:bg-zinc-950 px-4 py-16 sm:px-6 sm:py-24 lg:px-8 border-b border-primary/10">
        {/* Background decorative elements using primary & secondary tints */}
        <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

        {/* Decorative leaves */}
        <div className="absolute left-8 top-20 hidden text-primary/10 lg:block pointer-events-none">
          <svg
            width="180"
            height="180"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <path d="M165 20C90 35 40 75 35 145c45 5 95-20 130-75 12-19 18-37 20-50-7 0-13 0-20 0z" />
            <path
              d="M40 145C75 110 105 75 165 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>

        <div className="absolute bottom-0 right-10 hidden rotate-180 text-secondary/10 lg:block pointer-events-none">
          <svg
            width="160"
            height="160"
            viewBox="0 0 200 200"
            fill="currentColor"
          >
            <path d="M165 20C90 35 40 75 35 145c45 5 95-20 130-75 12-19 18-37 20-50-7 0-13 0-20 0z" />
            <path
              d="M40 145C75 110 105 75 165 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Content */}
          <div className="max-w-xl">
            {/* Small badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/80 dark:bg-zinc-900/80 px-4 py-2 text-sm font-medium text-primary dark:text-emerald-300 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Bring Nature Home
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-extrabold tracking-tight text-primary dark:text-zinc-100 sm:text-6xl lg:text-7xl">
              Grow Your
              <br />
              <span className="text-secondary">Happy Place.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-600 dark:text-zinc-300 sm:text-lg">
              Discover beautiful indoor plants, handcrafted pots, and everything
              you need to create a greener, calmer space.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                id="hero-shop-now-btn"
                className="group flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 transition hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" />
                Shop Plants
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/categories"
                className="rounded-full border border-primary/20 bg-white/80 dark:bg-zinc-900/80 px-7 py-3.5 text-sm font-semibold text-primary dark:text-zinc-100 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary hover:text-secondary hover:bg-white active:scale-95"
              >
                Explore Collection
              </Link>
            </div>

            {/* Trust points */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-400 font-bold">
                  ✓
                </span>
                Healthy Plants
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-400 font-bold">
                  ✓
                </span>
                Safe Delivery
              </div>

              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-primary/20 dark:text-emerald-400 font-bold">
                  ✓
                </span>
                Plant Care Tips
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            {/* Main image container */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-primary shadow-2xl shadow-primary/30 border border-primary/20">
              <Image
                src={plant}
                alt="Indoor Anthurium plant in handcrafted ceramic pot"
                priority
                className="h-[420px] w-full object-cover sm:h-[520px]"
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent" />

              {/* Floating product card */}
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/90 dark:bg-zinc-900/90 dark:border-zinc-700/50 p-4 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      Featured Plant
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-primary dark:text-zinc-100">
                      Anthurium Red Plant
                    </h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      Easy to care · Indoor
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-extrabold text-primary dark:text-emerald-400">
                      Rs. 1,499
                    </p>
                    <div className="mt-1 text-xs text-secondary">★★★★★</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating decorative circle */}
            <div className="absolute -right-5 -top-5 flex h-20 w-20 rotate-12 items-center justify-center rounded-full bg-secondary text-center text-xs font-bold text-white shadow-lg shadow-secondary/30">
              GROW
              <br />
              HAPPY
            </div>

            {/* Bottom floating badge */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-white dark:bg-zinc-900 px-5 py-4 shadow-xl border border-primary/10 sm:block">
              <p className="text-xs text-zinc-500 dark:text-zinc-400">Loved by plant parents</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-lg font-bold text-primary dark:text-zinc-100">4.9</span>
                <span className="text-secondary">★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Categories Carousel / Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">
                Shop by Category
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Browse through our wide selection of handpicked categories
              </p>
            </div>
            <Link
              href="/categories"
              className="text-xs font-semibold text-primary hover:text-secondary dark:text-emerald-400 dark:hover:text-secondary transition-colors flex items-center gap-1"
            >
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {isCatLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-28 rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"
                  />
                ))
              : categories.slice(0, 6).map((cat) => (
                  <Link
                    key={cat.id || cat.name}
                    href={`/products?category=${encodeURIComponent(cat.name || cat.id)}`}
                    className="group relative flex flex-col items-center justify-center rounded-2xl border border-zinc-200/80 bg-white p-4 text-center transition-all hover:border-primary hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl mx-5 bg-primary/5">
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <span className="font-semibold text-xs text-zinc-900 dark:text-zinc-100 group-hover:text-primary dark:group-hover:text-secondary transition-colors mt-2">
                      {cat.name}
                    </span>
                    {cat.description && (
                      <span className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                        {cat.description}
                      </span>
                    )}
                  </Link>
                ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-primary dark:text-white">
                  Featured Products
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Top picks and new arrivals with instant dispatch
                </p>
              </div>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-primary hover:text-secondary dark:text-emerald-400 dark:hover:text-secondary transition-colors flex items-center gap-1"
            >
              Explore Catalog <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {isProdLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id || product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-primary/20 bg-primary/[0.02] p-12 text-center dark:border-zinc-800">
              <ShoppingBag className="mx-auto h-12 w-12 text-primary/40 dark:text-zinc-500 mb-3" />
              <h3 className="text-base font-semibold text-primary dark:text-white">
                No products found
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 mb-4">
                Admin users can add products via the Product Management Suite.
              </p>
              <Link
                href="/product-management"
                className="inline-flex rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-secondary transition-colors shadow-sm"
              >
                Go to Product Management
              </Link>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
