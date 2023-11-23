import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import FetchResponse from '../types/ApiClient';
import { BASE_URL } from '../utils/config/url';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

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
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export class ApiClient<T> {
  endpoint = '';
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = () =>
    axiosInstance.get<FetchResponse<T>>(this.endpoint).then((res) => res.data);

  get = (config: AxiosRequestConfig) =>
    axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res.data);

  post = (payload: T) =>
    axiosInstance.post(this.endpoint, payload).then((res) => res.data);

  update = (payload: T) =>
    axiosInstance.put(this.endpoint, payload).then((res) => res.data);

  delete = () => axiosInstance.delete(this.endpoint).then((res) => res.data);
}
