import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// axios.interceptors.request.use(null, () => {});

const onResponse = (response: AxiosResponse<any, any>) => response;

const onError = (error: AxiosError) => {
  if (error.response) {
    if (error.response.status >= 400 && error.response.status <= 500) {
      return Promise.reject(error);
    } else if (error.response.status === 503) {
      throw new Error(JSON.stringify({ code: '0053', message: 'Error Code' }));
    } else {
      toast.error(`${error.name} - ${error.message}`);
    }
  }
};

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
