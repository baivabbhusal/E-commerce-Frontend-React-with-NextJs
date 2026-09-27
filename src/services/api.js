import axios from 'axios';
import config from '@/config';
import formatParams from '@/helpers/formatParams';

export const productApi = {
  getAll: async (params = {}) => {
    try {
      const query = formatParams(params);
      const res = await axios.get(`${config.apiUrl}/api/products${query ? `?${query}` : ''}`);
      const data = res.data;
      if (Array.isArray(data)) {
        return { items: data };
      }
      if (data?.items) {
        return data;
      }
      if (data?.products) {
        return { items: data.products };
      }
      if (data?.data && Array.isArray(data.data)) {
        return { items: data.data };
      }
      return { items: [] };
    } catch (err) {
      console.warn('Could not fetch products from backend API, using fallback:', err.message);
      return { items: [] };
    }
  },

  getById: async (id) => {
    const res = await axios.get(`${config.apiUrl}/api/products/${id}`);
    return res.data;
  },
};

export const categoryApi = {
  getAll: async () => {
    try {
      // If backend has category endpoint, try it first
      const res = await axios.get(`${config.apiUrl}/api/categories`).catch(() => null);
      if (res?.data && (Array.isArray(res.data) || res.data?.items)) {
        return Array.isArray(res.data) ? res.data : res.data.items;
      }
    } catch (e) {
      // Fallback
    }

    // Default featured categories for the store
    return [
      {
        id: 'indoor-plants',
        name: 'Indoor Plants',
        description: 'Air-purifying & vibrant',
        imageUrl: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'succulents',
        name: 'Succulents & Cacti',
        description: 'Low-maintenance greens',
        imageUrl: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'flowering',
        name: 'Flowering Plants',
        description: 'Seasonal blooms',
        imageUrl: 'https://images.unsplash.com/photo-1597055181300-e3633a917c9c?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'pots-planters',
        name: 'Pots & Planters',
        description: 'Handcrafted ceramic pots',
        imageUrl: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'plant-care',
        name: 'Plant Care',
        description: 'Organic soil & fertilizer',
        imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 'hanging-plants',
        name: 'Hanging Plants',
        description: 'Cascading greenery',
        imageUrl: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80',
      },
    ];
  },
};
