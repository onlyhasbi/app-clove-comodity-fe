import http from '../services/ApiClient';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from '../utils/keys';

type PayloadWork = {
  jenis_pekerjaan: string;
  upah_rp: number;
  indikator_ukur: string;
  catatan: string;
};

type payloadUpdateWork = PayloadWork & {
  id: string;
};

export const usePostWork = () =>
  useMutation({
    mutationFn: (payload: PayloadWork) =>
      http.post(url.pekerjaan.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Pekerjaan baru berhasil disimpan'),
  });

export const useUpdateWork = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: payloadUpdateWork) =>
      http.put(`${url.pekerjaan.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Pekerjaan berhasil diperbarui'),
  });

export const useDeleteWork = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.pekerjaan.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Pekerjaan berhasil dihapus`),
  });

export const useGetWork = () =>
  useQuery({
    queryKey: keys(url.pekerjaan.key),
    queryFn: () => http.get(url.pekerjaan.dev).then((data) => data),
  });


  export const useUpdateActive = () =>
  useMutation({
    mutationFn: ({ id, value }: UpdateStatus) =>
      http.config({
        method: 'put',
        url: `${url.update_status_lowongan.dev}/${id}`,
        params: {
          status: value,
        },
      }),
  });