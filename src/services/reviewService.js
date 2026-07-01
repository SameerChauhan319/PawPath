import { apiFetch } from './api';

export const createReview = async (packageId, rating, comment) => {
  const response = await apiFetch('/api/reviews', {
    method: 'POST',
    body: JSON.stringify({ packageId, rating, comment })
  });
  return response.data;
};

export const updateReview = async (id, rating, comment) => {
  const response = await apiFetch(`/api/reviews/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ rating, comment })
  });
  return response.data;
};

export const deleteReview = async (id) => {
  const response = await apiFetch(`/api/reviews/${id}`, {
    method: 'DELETE'
  });
  return response.data;
};
