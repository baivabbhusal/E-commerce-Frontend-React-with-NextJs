import api from './api';
import config from '@/config';
import axios from 'axios';

const DEFAULT_CATEGORIES = [
  {
    id: 'indoor-plants',
    name: 'Indoor Plants',
    description: 'Air-purifying & vibrant indoor greenery',
    imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'succulents',
    name: 'Succulents & Cacti',
    description: 'Low-maintenance desert greens',
    imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'flowering',
    name: 'Flowering Plants',
    description: 'Seasonal blooms & fragrant flora',
    imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'pots-planters',
    name: 'Pots & Planters',
    description: 'Handcrafted ceramic and terracotta pots',
    imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'plant-care',
    name: 'Plant Care',
    description: 'Organic soil, fertilizer, & tools',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'hanging-plants',
    name: 'Hanging Plants',
    description: 'Cascading greenery for walls and balconies',
    imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80',
  },
];

const LOCAL_STORAGE_KEY = 'custom_categories';

function getLocalCategories() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function saveLocalCategories(categories) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(categories));
  } catch (e) {
    console.error('Failed to save categories to localStorage:', e);
  }
}

export async function getCategories() {
  let backendCategories = [];
  try {
    const res = await axios.get(`${config.apiUrl}/api/categories`);
    const data = res.data;
    if (Array.isArray(data)) {
      backendCategories = data;
    } else if (Array.isArray(data?.items)) {
      backendCategories = data.items;
    } else if (Array.isArray(data?.categories)) {
      backendCategories = data.categories;
    }
  } catch (e) {
    // Backend endpoint might not exist yet, fallback gracefully
  }

  const localCategories = getLocalCategories();

  // Combine backend, local custom categories, and defaults (avoiding duplicate names)
  const combined = [...backendCategories];
  
  // Add local custom categories not already in combined
  for (const cat of localCategories) {
    if (!combined.some((c) => (c.name || '').toLowerCase() === (cat.name || '').toLowerCase())) {
      combined.push(cat);
    }
  }

  // If still empty, add default categories
  if (combined.length === 0) {
    return DEFAULT_CATEGORIES;
  }

  // Also include defaults if user hasn't overridden them
  for (const def of DEFAULT_CATEGORIES) {
    if (!combined.some((c) => (c.name || '').toLowerCase() === (def.name || '').toLowerCase())) {
      combined.push(def);
    }
  }

  return combined;
}

export async function createCategory(categoryData) {
  let created = null;

  // Try saving to backend API
  try {
    const res = await api.post('/api/categories', categoryData);
    if (res?.data) {
      created = res.data;
    }
  } catch (e) {
    console.warn('Backend category creation not available, persisting locally:', e.message);
  }

  // Persist locally
  const newCat = {
    id: created?._id || created?.id || `cat-${Date.now()}`,
    name: categoryData.name,
    description: categoryData.description || '',
    imageUrl: categoryData.imageUrl || 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80',
    createdAt: new Date().toISOString(),
  };

  const currentLocal = getLocalCategories();
  // Filter out any with same name
  const updated = [newCat, ...currentLocal.filter((c) => (c.name || '').toLowerCase() !== newCat.name.toLowerCase())];
  saveLocalCategories(updated);

  return newCat;
}

export async function deleteCategory(id) {
  try {
    await api.delete(`/api/categories/${id}`);
  } catch (e) {
    // Graceful fallback
  }

  const currentLocal = getLocalCategories();
  const updated = currentLocal.filter((c) => c.id !== id && c._id !== id);
  saveLocalCategories(updated);
  return true;
}
