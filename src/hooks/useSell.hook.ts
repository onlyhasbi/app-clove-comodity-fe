import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ApiClient } from '../services/apiClient';
import {
  PayloadPenjualan,
  PayloadUpdatePenjualan,
  ResponseSell,
} from '../types/Sell';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostPenjualan = () => {
  const sellApiClient = new ApiClient<PayloadPenjualan>(url.penjualan.dev);
  return useMutation({
    mutationFn: sellApiClient.post,
    onSuccess: () => toast.success('Penjualan baru berhasil disimpan'),
  });
};

export const useUpdatePenjualan = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdatePenjualan) => {
      const sellApiClient = new ApiClient<PayloadPenjualan>(
        `${url.penjualan.dev}/${id}`
      );
      return sellApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Penjualan berhasil diperbarui'),
  });

export const useDeletePenjualan = () =>
  useMutation({
    mutationFn: (id: string) => {
      const sellApiClient = new ApiClient(`${url.penjualan.dev}/${id}`);
      return sellApiClient.delete();
    },
    onSuccess: () => toast.success(`Penjualan berhasil dihapus`),
  });

export const useGetPenjualan = () => {
  const sellApiClient = new ApiClient<ResponseSell>(url.penjualan.dev);
  return useQuery({
    queryKey: keys(url.penjualan.key),
    queryFn: sellApiClient.getAll,
  });
};
