import http from '../api';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from './helper';

type PayloadTim = {
  nama_tim: string;
  ketua_tim: string;
};

type PayloadUpdateTim = PayloadTim & {
  id: string;
};

export const usePostTim = () =>
  useMutation({
    mutationFn: (payload: PayloadTim) =>
      http.post(url.tim.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Tim baru berhasil disimpan'),
  });

export const useUpdateTim = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateTim) =>
      http.put(`${url.tim.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Tim berhasil diperbarui'),
  });

export const useDeleteTim = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.tim.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Tim berhasil dihapus`),
  });

export const useGetTim = () =>
  useQuery({
    queryKey: keys(url.tim.key),
    queryFn: () => http.get(url.tim.dev).then((data) => data),
  });
