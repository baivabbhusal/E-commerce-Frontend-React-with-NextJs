'use client';

import config from '@/config';
import axios from 'axios';
import api from './api';

async function getAllUsers() {
  try {
    const res = await api.get('/api/users');
    return res;
  } catch (err) {
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    return await axios.get(`${config.apiUrl}/api/users`, {
      headers: authToken ? { authorization: `Bearer ${authToken}` } : {},
    });
  }
}

export { getAllUsers };
