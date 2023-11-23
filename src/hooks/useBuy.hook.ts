import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ApiClient } from '../services/apiClient';
import {
  PayloadPembelian,
  PayloadUpdatePembelian,
  ResponseBuy,
} from '../types/Buy';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostPembelian = () => {
  const buyApiClient = new ApiClient<PayloadPembelian>(url.pembelian.dev);
  return useMutation({
    mutationFn: buyApiClient.post,
    onSuccess: () => toast.success('Pembelian baru berhasil disimpan'),
  });
};

export const useUpdatePembelian = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdatePembelian) => {
      const buyApiClient = new ApiClient<PayloadPembelian>(
        `${url.pembelian.dev}/${id}`
      );
      return buyApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Pembelian berhasil diperbarui'),
  });

export const useDeletePembelian = () =>
  useMutation({
    mutationFn: (id: string) => {
      const buyApiClient = new ApiClient<PayloadPembelian>(
        `${url.pembelian.dev}/${id}`
      );
      return buyApiClient.delete();
    },
    onSuccess: () => toast.success(`Pembelian berhasil dihapus`),
  });

export const useGetPembelian = () => {
  const buyApiClient = new ApiClient<ResponseBuy>(url.pembelian.dev);
  return useQuery({
    queryKey: keys(url.pembelian.key),
    queryFn: buyApiClient.getAll,
  });
};
