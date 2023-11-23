import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import ResponseDryResult, {
  PayloadPengeringan,
  PayloadUpdateBahan,
  PayloadUpdatePengeringan,
  TUpdateStatusPayment,
} from '../types/DryResult';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostPengeringan = () => {
  const dryResultApiClient = new ApiClient<PayloadPengeringan>(
    url.pengeringan.dev
  );
  return useMutation({
    mutationFn: dryResultApiClient.post,
    onSuccess: () => toast.success('Hasil Pengeringan baru berhasil disimpan'),
  });
};

export const useUpdatePengeringan = () => {
  return useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdatePengeringan) => {
      const dryResultApiClient = new ApiClient<PayloadPengeringan>(
        `${url.pengeringan.dev}/${id}`
      );
      return dryResultApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Hasil Pengeringan berhasil diperbarui'),
  });
};

export const useDeletePengeringan = () =>
  useMutation({
    mutationFn: (id: string) => {
      const dryResultApiClient = new ApiClient(`${url.pengeringan.dev}/${id}`);
      return dryResultApiClient.delete();
    },
    onSuccess: () => toast.success(`Pengeringan berhasil dihapus`),
  });

export const useGetPengeringan = () => {
  const dryResultApiClient = new ApiClient<ResponseDryResult>(
    url.pengeringan.dev
  );
  return useQuery({
    queryKey: keys(url.pengeringan.key),
    queryFn: dryResultApiClient.getAll,
  });
};

export const useUpdateBahan = () => {
  return useMutation({
    mutationFn: ({ id_bahan, id_hasil }: PayloadUpdateBahan) => {
      const materialApiClient = new ApiClient(
        `${url.update_bahan.dev}/${id_bahan}/${id_hasil}`
      );
      return materialApiClient.update({});
    },
  });
};

export const useUpdatePembayaran = () =>
  useMutation({
    mutationFn: ({ id, status }: TUpdateStatusPayment) => {
      const paymentApiClient = new ApiClient(
        `${url.pembayaran_pengeringan.dev}/${id}?status=${status}`
      );
      return paymentApiClient.update({});
    },
    onSuccess: () => toast.dismiss(),
  });
