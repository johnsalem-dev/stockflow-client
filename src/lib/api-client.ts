import Axios, { type InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

import { env } from '@/config/env';
// import paths from '@/config/paths';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  // Ensure cookies/tokens are sent with requests
//   config.withCredentials = true;
  return config;
}

export const api = Axios.create({
  baseURL: env.API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
api.interceptors.response.use(
  (response) => {
    // Unwraps the data so we don't have to do response.data in every fetcher
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
    
    // Using react-hot-toast for global API error feedback
    toast.error(message);

    if (error.response?.status === 401) {
    //   const searchParams = new URLSearchParams();
    //   const redirectTo = searchParams.get('redirectTo') || window.location.pathname;
    //   window.location.href = paths.auth.login.getHref(redirectTo);
    }

    return Promise.reject(error);
  },
);