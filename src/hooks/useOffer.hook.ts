import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import {
  PayloadOffer,
  PayloadUpdateOffer,
  ResponseOffer,
} from '../types/Offer';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostOffer = () => {
  const offerApiClient = new ApiClient<PayloadOffer>(url.penawaran.dev);
  return useMutation({
    mutationFn: offerApiClient.post,
    onSuccess: () => toast.success('Penawaran baru berhasil disimpan'),
  });
};

export const useUpdateOffer = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateOffer) => {
      const offerApiClient = new ApiClient<PayloadOffer>(
        `${url.penawaran.dev}/${id}`
      );
      return offerApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Penawaran berhasil diperbarui'),
  });

export const useDeleteOffer = () =>
  useMutation({
    mutationFn: (id: string) => {
      const offerApiClient = new ApiClient(`${url.penawaran.dev}/${id}`);
      return offerApiClient.delete();
    },
    onSuccess: () => toast.success(`Penawaran berhasil dihapus`),
  });

export const useGetOffer = () => {
  const offerApiClient = new ApiClient<ResponseOffer>(url.penawaran.dev);
  return useQuery({
    queryKey: keys(url.penawaran.key),
    queryFn: offerApiClient.getAll,
  });
};

export const useUpdateActive = () =>
  useMutation({
    mutationFn: ({ id, value }: UpdateStatus) => {
      const offerApiClient = new ApiClient(
        `${url.update_status_penawaran.dev}/${id}?status=${value}`
      );
      return offerApiClient.update({});
    },
  });
