import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { keys } from './helper';
import { toast } from 'react-hot-toast';

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

export const useGetInfoPenawaran = () =>
  useQuery({
    queryKey: keys(url.info_penawaran.key),
    queryFn: () => http.get(url.info_penawaran.dev).then((data) => data),
  });
export const useGetInfoBuruh = () =>
  useQuery({
    queryKey: keys(url.info_buruh.key),
    queryFn: () => http.get(url.info_buruh.dev).then((data) => data),
  });

export const useUpdateLamaran = () =>
  useMutation({
    mutationFn: ({ id_buruh }: { id_buruh: string }) =>
      http.put(`${url.accept_buruh.dev}/${id_buruh}`).then((data) => data),
    onSuccess: () => {
      toast.dismiss();
      toast.success('Lamaran buruh diterima');
    },
    onError: () => {
      toast.dismiss();
      toast.error('Error dalam menerima lamaran...');
    },
  });
