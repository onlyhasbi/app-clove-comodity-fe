import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import { PayloadTim, PayloadUpdateTim, ResponseTim } from '../types/Team';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostTim = () => {
  const timApiClient = new ApiClient<PayloadTim>(url.tim.dev);
  return useMutation({
    mutationFn: timApiClient.post,
    onSuccess: () => toast.success('Tim baru berhasil disimpan'),
  });
};

export const useUpdateTim = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateTim) => {
      const timApiClient = new ApiClient<PayloadTim>(`${url.tim.dev}/${id}`);
      return timApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Tim berhasil diperbarui'),
  });

export const useDeleteTim = () =>
  useMutation({
    mutationFn: (id: string) => {
      const timApiClient = new ApiClient(`${url.tim.dev}/${id}`);
      return timApiClient.delete();
    },
    onSuccess: () => toast.success(`Tim berhasil dihapus`),
  });

export const useGetTim = () => {
  const timApiClient = new ApiClient<ResponseTim>(url.tim.dev);
  return useQuery({
    queryKey: keys(url.tim.key),
    queryFn: timApiClient.getAll,
  });
};
