import { apiFetch } from './api';

export const login = async (email, password) => {
  const response = await apiFetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  return response.data; 
};

export const register = async (name, email, password, role) => {
  const response = await apiFetch('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ name, email, password, role })
  });
  return response.data;
};

export const getProfile = async () => {
  const response = await apiFetch('/api/auth/profile');
  return response.data;
};

export const updateProfile = async (name, email, password) => {
  const response = await apiFetch('/api/auth/profile', {
    method: 'PUT',
    body: JSON.stringify({ name, email, password })
  });
  return response.data;
};
