import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from './helper';

type PayloadPenjualan = {
  id_pembeli: string;
  jenis_komditas_cengkeh: string;
  berat_kg: string;
  harga_rp: string;
  waktu: string;
  catatan: string;
};

type PayloadUpdatePenjualan = PayloadPenjualan & {
  id: string;
};

export const usePostPenjualan = () =>
  useMutation({
    mutationFn: (payload: PayloadPenjualan) =>
      http.post(url.penjualan.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Penjualan baru berhasil disimpan'),
  });

export const useUpdatePenjualan = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdatePenjualan) =>
      http.put(`${url.penjualan.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Penjualan berhasil diperbarui'),
  });

export const useDeletePenjualan = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.penjualan.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Penjualan berhasil dihapus`),
  });

export const useGetPenjualan = () =>
  useQuery({
    queryKey: keys(url.penjualan.key),
    queryFn: () => http.get(url.penjualan.dev).then((data) => data),
  });
