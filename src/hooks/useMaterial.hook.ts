import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import {
  PayloadMaterial,
  PayloadUpdateMaterial,
  ResponseMaterial,
} from '../types/Material';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostMaterial = () => {
  const materialApiClient = new ApiClient<PayloadMaterial>(url.bahan.dev);
  return useMutation({
    mutationFn: materialApiClient.post,
    onSuccess: () => toast.success('Bahan Pengeringan baru berhasil disimpan'),
  });
};

export const useUpdateMaterial = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateMaterial) => {
      const materialApiClient = new ApiClient<PayloadMaterial>(
        `${url.bahan.dev}/${id}`
      );
      return materialApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Bahan Pengeringan berhasil diperbarui'),
  });

export const useDeleteMaterial = () =>
  useMutation({
    mutationFn: (id: string) => {
      const materialApiClient = new ApiClient<PayloadMaterial>(
        `${url.bahan.dev}/${id}`
      );
      return materialApiClient.delete();
    },
    onSuccess: () => toast.success(`Bahan Pengeringan berhasil dihapus`),
  });

export const useGetMaterial = () => {
  const materialApiClient = new ApiClient<ResponseMaterial>(url.bahan.dev);

  return useQuery({
    queryKey: keys(url.bahan.key),
    queryFn: materialApiClient.getAll,
  });
};
