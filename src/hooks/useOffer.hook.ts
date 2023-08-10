import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from './helper';

type PayloadOffer = {
  jenis_penawaran: string;
  jenis_komoditas: string;
  max: number;
  min: number;
  satuan: string;
  harga_rp: number;
  catatan: string;
};

type payloadUpdateOffer = PayloadOffer & {
  id: string;
};

export const usePostOffer = () =>
  useMutation({
    mutationFn: (payload: PayloadOffer) =>
      http.post(url.penawaran.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Penawaran baru berhasil disimpan'),
  });

export const useUpdateOffer = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: payloadUpdateOffer) =>
      http.put(`${url.penawaran.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Penawaran berhasil diperbarui'),
  });

export const useDeleteOffer = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.penawaran.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Penawaran berhasil dihapus`),
  });

export const useGetOffer = () =>
  useQuery({
    queryKey: keys(url.penawaran.key),
    queryFn: () => http.get(url.penawaran.dev).then((data) => data),
  });

export const useUpdateActive = () =>
  useMutation({
    mutationFn: ({ id, value }: UpdateStatus) =>
      http.config({
        method: 'put',
        url: `${url.update_status_penawaran.dev}/${id}`,
        params: {
          status: value,
        },
      }),
  });
