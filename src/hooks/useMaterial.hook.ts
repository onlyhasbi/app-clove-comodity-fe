import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from './helper';

type PayloadMaterial = {
  berat_kg: string;
  volume_liter: string;
  dikeringkan_pada_hari: string;
  catatan: string;
};

type PayloadUpdateMaterial = PayloadMaterial & {
  id: string;
};

export const usePostMaterial = () =>
  useMutation({
    mutationFn: (payload: PayloadMaterial) =>
      http.post(url.bahan.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Bahan Pengeringan baru berhasil disimpan'),
  });

export const useUpdateMaterial = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateMaterial) =>
      http.put(`${url.bahan.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Bahan Pengeringan berhasil diperbarui'),
  });

export const useDeleteMaterial = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.bahan.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Bahan Pengeringan berhasil dihapus`),
  });

export const useGetMaterial = () =>
  useQuery({
    queryKey: keys(url.penawaran.key),
    queryFn: () => http.get(url.bahan.dev).then((data) => data),
  });
