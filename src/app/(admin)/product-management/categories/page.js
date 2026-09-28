'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { categoryApi } from '@/services/api';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import { PRODUCT_MANAGEMENT_ROUTE } from '@/constants/routes';

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state for creating category
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    imageUrl: '',
  });

  const loadCategories = async () => {
    try {
      setIsLoading(true);
      const data = await categoryApi.getAll();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load categories:', err);
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Please enter a category name');
      return;
    }

    try {
      setIsSubmitting(true);
      await categoryApi.create({
        name: formData.name.trim(),
        description: formData.description.trim(),
        imageUrl: formData.imageUrl.trim() || undefined,
      });

      toast.success(`Category "${formData.name.trim()}" created successfully!`);
      setFormData({ name: '', description: '', imageUrl: '' });
      setShowModal(false);
      await loadCategories();
    } catch (err) {
      console.error('Error creating category:', err);
      toast.error('Could not create category. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id, name) => {
    if (!confirm(`Are you sure you want to delete category "${name}"?`)) {
      return;
    }

    try {
      await categoryApi.delete(id);
      toast.success(`Category "${name}" removed.`);
      await loadCategories();
    } catch (err) {
      console.error('Error deleting category:', err);
      toast.error('Failed to delete category');
    }
  };

  const filteredCategories = categories.filter((cat) => {
    const q = searchQuery.toLowerCase();
    return (
      (cat.name || '').toLowerCase().includes(q) ||
      (cat.description || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary dark:text-white">
              Category Management
            </h1>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary dark:bg-primary/20 dark:text-emerald-300">
              {categories.length} Total
            </span>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Create, view, and organize product categories for your store catalog.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={PRODUCT_MANAGEMENT_ROUTE}
            className="rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 transition"
          >
            All Products
          </Link>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-xl bg-primary px-4 py-2 text-xs sm:text-sm font-bold text-white shadow-md shadow-primary/20 hover:bg-primary/90 transition active:scale-95"
          >
            + Create Category
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex items-center justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-white p-3 dark:border-zinc-800 dark:bg-zinc-900">
        <input
          type="text"
          placeholder="Search categories by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-transparent px-3 py-1.5 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none dark:text-zinc-100"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-zinc-400 hover:text-zinc-600 px-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* Categories Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <Spinner className="h-8 w-8 fill-primary" />
          <p className="text-xs text-zinc-500">Loading categories...</p>
        </div>
      ) : filteredCategories.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-12 text-center bg-white dark:bg-zinc-900">
          <p className="text-base font-semibold text-zinc-800 dark:text-zinc-200">
            No categories found
          </p>
          <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
            {searchQuery
              ? 'No categories match your search filter.'
              : 'Get started by creating your first product category.'}
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 inline-flex items-center rounded-xl bg-primary px-4 py-2 text-xs font-bold text-white hover:bg-primary/90 transition"
          >
            + Create New Category
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((cat) => {
            const catId = cat._id || cat.id;
            return (
              <div
                key={catId || cat.name}
                className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="flex items-start gap-4">
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60">
                    <img
                      src={
                        cat.imageUrl ||
                        'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80'
                      }
                      alt={cat.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                      {cat.description || 'No description provided.'}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <Link
                    href={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="text-xs font-semibold text-primary hover:underline dark:text-emerald-400"
                  >
                    View in Store &rarr;
                  </Link>
                  <button
                    onClick={() => handleDeleteCategory(catId, cat.name)}
                    className="text-xs font-medium text-red-500 hover:text-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Category Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                Create New Category
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-400 hover:text-zinc-600 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Indoor Plants, Succulents, Pots"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of products in this category..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  placeholder="https://example.com/category-image.jpg"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm focus:border-primary focus:outline-none dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
                <p className="mt-1 text-[11px] text-zinc-400">
                  Leave blank to use a curated default image.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-primary px-5 py-2 text-xs font-bold text-white hover:bg-primary/90 transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Creating...' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
