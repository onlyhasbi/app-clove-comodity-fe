import axios, {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

const onErrorResponse = (error: AxiosError) => {
  if ((error.response?.data as ErrorResponse)?.statusCode == 401) {
    throw new Error('invalid token');
  }
};

const onResponse = (response: AxiosResponse<any, any>) => response;
axios.interceptors.response.use(onResponse, onErrorResponse);

const onRequest = (config: InternalAxiosRequestConfig) => config;
axios.interceptors.request.use(onRequest, onErrorResponse);

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
