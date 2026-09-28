import axios from 'axios';
import config from '@/config';
import formatParams from '@/helpers/formatParams';
import { getCategories, createCategory, deleteCategory } from '@/api/categories';

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
  getAll: getCategories,
  create: createCategory,
  delete: deleteCategory,
};
