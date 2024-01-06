import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import {
  ResponseDryResult,
  DryResultPayload,
  UpdateMaterialPayload,
  UpdateDryResultPayload,
  UpdateStatusPayment,
} from '../types/DryResult';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostDryResult = () => {
  const dryResultApiClient = new ApiClient<DryResultPayload>(
    url.pengeringan.dev
  );
  return useMutation({
    mutationFn: dryResultApiClient.post,
    onSuccess: () => toast.success('Hasil Pengeringan baru berhasil disimpan'),
  });
};

export const useUpdateDryResult = () => {
  return useMutation({
    mutationFn: ({ id, ...restPayload }: UpdateDryResultPayload) => {
      const dryResultApiClient = new ApiClient<DryResultPayload>(
        `${url.pengeringan.dev}/${id}`
      );
      return dryResultApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Hasil Pengeringan berhasil diperbarui'),
  });
};

export const useDeleteDryResult = () =>
  useMutation({
    mutationFn: (id: string) => {
      const dryResultApiClient = new ApiClient(`${url.pengeringan.dev}/${id}`);
      return dryResultApiClient.delete();
    },
    onSuccess: () => toast.success(`Pengeringan berhasil dihapus`),
  });

export const useGetDryResult = () => {
  const dryResultApiClient = new ApiClient<ResponseDryResult>(
    url.pengeringan.dev
  );
  return useQuery({
    queryKey: keys(url.pengeringan.key),
    queryFn: dryResultApiClient.getAll,
  });
};

export const useUpdateMaterial = () => {
  return useMutation({
    mutationFn: ({ id_bahan, id_hasil }: UpdateMaterialPayload) => {
      const materialApiClient = new ApiClient(
        `${url.update_bahan.dev}/${id_bahan}/${id_hasil}`
      );
      return materialApiClient.update({});
    },
  });
};

export const useUpdatePayment = () =>
  useMutation({
    mutationFn: ({ id, status }: UpdateStatusPayment) => {
      const paymentApiClient = new ApiClient(
        `${url.pembayaran_pengeringan.dev}/${id}?status=${status}`
      );
      return paymentApiClient.update({});
    },
    onSuccess: () => toast.dismiss(),
  });
