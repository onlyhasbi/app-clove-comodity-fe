import http from '../api';
import { url } from '../utils/config/url';
import { useQuery } from '@tanstack/react-query';
import { keys } from './helper';

export const useGetPengeringan = () =>
  useQuery({
    queryKey: keys(url.penawaran.key),
    queryFn: () => http.get(url.penawaran.dev).then((data) => data),
  });
export const useGetKomoditas = () =>
  useQuery({
    queryKey: keys(url.penawaran.key),
    queryFn: () => http.get(url.penawaran.dev).then((data) => data),
  });
export const useGetTransaksi = () =>
  useQuery({
    queryKey: keys(url.penawaran.key),
    queryFn: () => http.get(url.penawaran.dev).then((data) => data),
  });
export const useGetLahan = () =>
  useQuery({
    queryKey: keys(url.penawaran.key),
    queryFn: () => http.get(url.penawaran.dev).then((data) => data),
  });
