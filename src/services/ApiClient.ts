import axios, { AxiosError, AxiosResponse } from 'axios';

const onError = (error: AxiosError) => {
  if ((error.response?.data as ErrorResponse)?.statusCode == 401) {
    //token basi atau salah
    // throw new Error('invalid token');
  }

  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse<any, any>) => response;
axios.interceptors.response.use(onResponse, onError);

export const setAuthToken = (token: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

const http = {
  config: axios,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
