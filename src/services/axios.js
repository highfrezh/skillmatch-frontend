import axios from 'axios';

const BASE_URL = 'https://skillmatchapi.onrender.com/api/v1';

// Create Axios instance
const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach token to all requests
apiInstance.interceptors.request.use(
  (config) => {
    const access = localStorage.getItem('access');
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: auto-refresh token if expired
apiInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and not already retried
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem('refresh')
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the token
        const res = await axios.post(`${BASE_URL}/token/refresh/`, {
          refresh: localStorage.getItem('refresh'),
        });

        const newAccess = res.data.access;
        localStorage.setItem('access', newAccess);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return apiInstance(originalRequest);
      } catch (refreshError) {
        // Refresh token is invalid or expired
        console.error('Refresh token failed:', refreshError);
        localStorage.clear();
        window.location.href = '/'; // force logout
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
