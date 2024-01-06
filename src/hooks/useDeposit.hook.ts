import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import {
  PayloadDeposit,
  PayloadUpdateDeposit,
  ResponseDeposit,
} from '../types/Deposit';
import { UpdateStatusPayment } from '../types/DryResult';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostSetoran = () => {
  const depositApiClient = new ApiClient<PayloadDeposit>(url.setoran.dev);
  return useMutation({
    mutationFn: depositApiClient.post,
    onSuccess: () => toast.success('Setoran baru berhasil disimpan'),
  });
};

export const useUpdateSetoran = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateDeposit) => {
      const depositApiClient = new ApiClient<PayloadDeposit>(
        `${url.setoran.dev}/${id}`
      );
      return depositApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Setoran berhasil diperbarui'),
  });

export const useDeleteSetoran = () =>
  useMutation({
    mutationFn: (id: string) => {
      const depositApiClient = new ApiClient(`${url.setoran.dev}/${id}`);
      return depositApiClient.delete();
    },
    onSuccess: () => toast.success(`Setoran berhasil dihapus`),
  });

export const useGetSetoran = () => {
  const depositApiClient = new ApiClient<ResponseDeposit>(url.setoran.dev);
  return useQuery({
    queryKey: keys(url.setoran.key),
    queryFn: depositApiClient.getAll,
  });
};

export const useUpdateStatusSetoran = () =>
  useMutation({
    mutationFn: ({ id, status }: UpdateStatusPayment) => {
      const paymentApiClient = new ApiClient(
        `${url.pembayaran_setoran.dev}/${id}?status=${status}`
      );
      return paymentApiClient.update({});
    },
    onSuccess: () => toast.dismiss(),
  });
