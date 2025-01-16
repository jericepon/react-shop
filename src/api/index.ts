import axios from "axios";

const API = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor to include the bearer token
API.interceptors.request.use(
  (config) => {
    const rootState = localStorage.getItem('persist:root');
    const { auth } = rootState ? JSON.parse(rootState) : {};
    const { authInfo } = JSON.parse(auth);
    const token = authInfo?.accessToken;
    if (token)
    {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;