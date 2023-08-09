import http from '../api';
import { url } from '../utils/config/url';
import { useQuery } from '@tanstack/react-query';
import { keys } from './helper';

export const useGetPengeringan = () =>
  useQuery({
    queryKey: keys(url.report_pengeringan.key),
    queryFn: () => http.get(url.report_pengeringan.dev).then((data) => data),
  });
export const useGetKomoditas = () =>
  useQuery({
    queryKey: keys(url.report_komoditas.key),
    queryFn: () => http.get(url.report_komoditas.dev).then((data) => data),
  });
export const useGetTransaksi = () =>
  useQuery({
    queryKey: keys(url.report_transaksi.key),
    queryFn: () => http.get(url.report_transaksi.dev).then((data) => data),
  });
export const useGetLahan = () =>
  useQuery({
    queryKey: keys(url.report_lahan.key),
    queryFn: () => http.get(url.report_lahan.dev).then((data) => data),
  });
