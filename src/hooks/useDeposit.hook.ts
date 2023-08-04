import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from './helper';

type PayloadSetoran = {
  id_hasil_panen: string;
  id_buruh: string;
  volume_liter: string;
  berat_kg: string;
  upah_rp: string;
  waktu: string;
  catatan: string;
};

type PayloadUpdateSetoran = PayloadSetoran & {
  id: string;
};

export const usePostSetoran = () =>
  useMutation({
    mutationFn: (payload: PayloadSetoran) =>
      http.post(url.setoran.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Setoran baru berhasil disimpan'),
  });

export const useUpdateSetoran = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateSetoran) =>
      http.put(`${url.setoran.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Setoran berhasil diperbarui'),
  });

export const useDeleteSetoran = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.setoran.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Setoran berhasil dihapus`),
  });

export const useGetSetoran = () =>
  useQuery({
    queryKey: keys(url.setoran.key),
    queryFn: () => http.get(url.setoran.dev).then((data) => data),
  });
