import { apiFetch } from './api';

export const getAdminStats = async () => {
  const response = await apiFetch('/api/admin/stats');
  return response.data;
};

export const getUsers = async () => {
  const response = await apiFetch('/api/admin/users');
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await apiFetch(`/api/admin/users/${id}`, {
    method: 'DELETE'
  });
  return response.data;
};

export const getAdminBookings = async () => {
  const response = await apiFetch('/api/admin/bookings');
  return response.data;
};

export const updateBookingStatus = async (id, bookingStatus) => {
  const response = await apiFetch(`/api/admin/bookings/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ bookingStatus })
  });
  return response.data;
};

export const updateBookingPaymentStatus = async (id, paymentStatus) => {
  const response = await apiFetch(`/api/admin/bookings/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify({ paymentStatus })
  });
  return response.data;
};

export const createPackage = async (packageData) => {
  const response = await apiFetch('/api/admin/packages', {
    method: 'POST',
    body: JSON.stringify(packageData)
  });
  return response.data;
};

export const updatePackage = async (id, packageData) => {
  const response = await apiFetch(`/api/admin/packages/${id}`, {
    method: 'PUT',
    body: JSON.stringify(packageData)
  });
  return response.data;
};

export const deletePackage = async (id) => {
  const response = await apiFetch(`/api/admin/packages/${id}`, {
    method: 'DELETE'
  });
  return response.data;
};

export const getAdminReviews = async () => {
  const response = await apiFetch('/api/admin/reviews');
  return response.data;
};

export const deleteAdminReview = async (id) => {
  const response = await apiFetch(`/api/admin/reviews/${id}`, {
    method: 'DELETE'
  });
  return response.data;
};
