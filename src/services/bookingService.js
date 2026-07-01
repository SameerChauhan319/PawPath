import { apiFetch } from './api';

export const getBookings = async () => {
  const response = await apiFetch('/api/bookings');
  return response.data;
};

export const createBooking = async (packageId, petId, travelDate) => {
  const response = await apiFetch('/api/bookings', {
    method: 'POST',
    body: JSON.stringify({ packageId, petId, travelDate })
  });
  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await apiFetch(`/api/bookings/${id}/cancel`, {
    method: 'PUT'
  });
  return response.data;
};
