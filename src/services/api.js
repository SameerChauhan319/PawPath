const handleResponse = async (response) => {
  let data;
  try {
    data = await response.json();
  } catch (err) {
    data = { success: false, message: 'Server is temporarily unavailable.' };
  }
  
  if (response.status === 401) {
    window.dispatchEvent(new Event('auth-unauthorized'));
  }
  
  if (!response.ok) {
    const errorMsg = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMsg);
  }
  
  return data;
};

export const apiFetch = async (url, options = {}) => {
  const token = localStorage.getItem('pawpaths_token');
  
  
  const headers = {
    ...options.headers
  };
  
  
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  try {
    const response = await fetch(url, {
      ...options,
      headers
    });
    return await handleResponse(response);
  } catch (error) {
    
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error('Server is temporarily unavailable.');
    }
    throw error;
  }
};
