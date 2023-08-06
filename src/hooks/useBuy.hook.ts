import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from './helper';

type PayloadPembelian = {
  id_penjual: string;
  jenis_komditas_cengkeh: string;
  berat_kg: number;
  harga_rp: number;
  waktu: Date;
  catatan: string;
};

type PayloadUpdatePembelian = PayloadPembelian & {
  id: string;
};

export const usePostPembelian = () =>
  useMutation({
    mutationFn: (payload: PayloadPembelian) =>
      http.post(url.pembelian.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Pembelian baru berhasil disimpan'),
  });

export const useUpdatePembelian = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdatePembelian) =>
      http.put(`${url.pembelian.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Pembelian berhasil diperbarui'),
  });

export const useDeletePembelian = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.pembelian.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Pembelian berhasil dihapus`),
  });

export const useGetPembelian = () =>
  useQuery({
    queryKey: keys(url.pembelian.key),
    queryFn: () => http.get(url.pembelian.dev).then((data) => data),
  });
