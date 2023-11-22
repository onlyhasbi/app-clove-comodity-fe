import http from '../services/ApiClient';
import { url } from '../utils/config/url';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { keys } from '../utils/keys';

type PayloadPengeringan = {
  id_tim: string;
  berat_kg: number;
  volume_liter: number;
  kering_pada_hari: Date;
  catatan: string;
  upah: number;
};

type PayloadUpdateBahan = {
  id_bahan: string;
  id_hasil: string;
};

type PayloadUpdatePengeringan = PayloadPengeringan & {
  id: string;
};

export const usePostPengeringan = () =>
  useMutation({
    mutationFn: (payload: PayloadPengeringan) =>
      http.post(url.pengeringan.dev, payload).then((data) => data),
    onSuccess: () => toast.success('Hasil Pengeringan baru berhasil disimpan'),
  });

export const useUpdatePengeringan = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdatePengeringan) =>
      http
        .put(`${url.pengeringan.dev}/${id}`, restPayload)
        .then((data) => data),
    onSuccess: () => toast.success('Hasil Pengeringan berhasil diperbarui'),
  });

export const useDeletePengeringan = () =>
  useMutation({
    mutationFn: (id: string) =>
      http.delete(`${url.pengeringan.dev}/${id}`).then((data) => data),
    onSuccess: () => toast.success(`Pengeringan berhasil dihapus`),
  });

export const useGetPengeringan = () =>
  useQuery({
    queryKey: keys(url.pengeringan.key),
    queryFn: () => http.get(url.pengeringan.dev).then((data) => data),
  });

export const useUpdateBahan = () =>
  useMutation({
    mutationFn: ({ id_bahan, id_hasil }: PayloadUpdateBahan) =>
      http
        .put(`${url.update_bahan.dev}/${id_bahan}/${id_hasil}`)
        .then((data) => data),
  });

export const useUpdatePembayaran = () =>
  useMutation({
    mutationFn: ({ id, status }: TUpdateStatusPayment) =>
      http.config({
        method: 'put',
        url: `${url.pembayaran_pengeringan.dev}/${id}`,
        params: {
          status,
        },
      }),
    onSuccess: () => toast.dismiss(),
  });
