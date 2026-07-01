import { apiFetch } from './api';

export const getPets = async () => {
  const response = await apiFetch('/api/pets');
  return response.data;
};

export const createPet = async (petData) => {
  const response = await apiFetch('/api/pets', {
    method: 'POST',
    body: JSON.stringify(petData)
  });
  return response.data;
};

export const updatePet = async (id, petData) => {
  const response = await apiFetch(`/api/pets/${id}`, {
    method: 'PUT',
    body: JSON.stringify(petData)
  });
  return response.data;
};

export const deletePet = async (id) => {
  const response = await apiFetch(`/api/pets/${id}`, {
    method: 'DELETE'
  });
  return response.data;
};
