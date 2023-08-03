import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from './helper';

type PayloadHasil = {
  id_lahan: string;
  berat_pengukuran_kg: string;
  volume_pengukuran_liter: string;
  waktu: string;
  catatan: string;
};

type payloadUpdateLahan = PayloadHasil & {
  id: string;
};

export const usePostHasil = () =>
  useMutation({
    mutationFn: (payload: PayloadHasil) =>
      http.post(url.hasil_panen.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Hasil baru berhasil disimpan'),
  });

export const useUpdateHasil = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: payloadUpdateLahan) =>
      http
        .put(`${url.hasil_panen.dev}/${id}`, restPayload)
        .then((data) => data),
    onSuccess: () => toast.success('Hasil panen berhasil diperbarui'),
  });

export const useDeleteHasil = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.hasil_panen.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Hasil panen berhasil dihapus`),
  });

export const useGetHasil = () =>
  useQuery({
    queryKey: keys(url.hasil_panen.key),
    queryFn: () => http.get(url.hasil_panen.dev).then((data) => data),
  });
