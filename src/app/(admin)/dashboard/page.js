'use client';

import React, { useEffect, useState } from 'react';
import DashboardHeader from './_components/DashboardHeader';
import StatsCards from './_components/StatsCards';
import QuickActions from './_components/QuickActions';
import RecentProducts from './_components/RecentProducts';
import { productApi } from '@/services/api';

export default function AdminDashboardPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadDashboardData() {
      try {
        const res = await productApi.getAll({ pageSize: 50 });
        const items = res?.items || (Array.isArray(res) ? res : []);
        if (isMounted) {
          setProducts(items);
        }
      } catch (err) {
        console.error('Error loading dashboard products:', err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadDashboardData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Header with Title and Add Product Button */}
      <DashboardHeader />

      {/* KPI Stats Cards */}
      <StatsCards products={products} />

      {/* Quick Navigation Shortcuts */}
      <QuickActions />

      {/* Recent Catalog Items Section */}
      <RecentProducts products={products} isLoading={isLoading} />
    </div>
  );
}
