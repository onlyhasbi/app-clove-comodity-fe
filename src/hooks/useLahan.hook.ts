import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from './helper';

type PayloadLahan = {
  nama: string;
  lokasi: string;
  luas_m2: string;
  status_hak_panen: string;
};

type payloadUpdateLahan = PayloadLahan & {
  id: string;
};

export const usePostLahan = () =>
  useMutation({
    mutationFn: (payload: PayloadLahan) =>
      http.post(url.lahan.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Lahan baru berhasil disimpan'),
  });

export const useUpdateLahan = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: payloadUpdateLahan) =>
      http.put(`${url.lahan.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Lahan baru berhasil diperbarui'),
  });

export const useDeleteLahan = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.lahan.dev}/${id}`).then((data) => {
        console.log(data);
        return data;
      }),
    onSuccess: () => toast.success(`Lahan berhasil dihapus`),
  });

export const useGetLahan = () =>
  useQuery({
    queryKey: keys(url.lahan.key),
    queryFn: () => http.get(url.lahan.dev).then((data) => data),
  });
