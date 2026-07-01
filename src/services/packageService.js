import { apiFetch } from './api';

export const getPackages = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.destination) params.append('destination', filters.destination);
  if (filters.budget) params.append('budget', filters.budget);
  if (filters.petSize && filters.petSize !== 'All') params.append('petSize', filters.petSize);
  if (filters.transportType) params.append('transportType', filters.transportType);
  if (filters.rating) params.append('rating', filters.rating);
  if (filters.duration) params.append('duration', filters.duration);
  if (filters.sortBy) params.append('sortBy', filters.sortBy);

  const url = `/api/packages?${params.toString()}`;
  const response = await apiFetch(url);
  return response.data; 
};

export const getPackageById = async (id) => {
  const response = await apiFetch(`/api/packages/${id}`);
  return response.data; 
};
