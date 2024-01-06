import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import { PayloadLand, PayloadUpdateLand, ResponseLand } from '../types/Land';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostLand = () => {
  const lahanApiClient = new ApiClient<PayloadLand>(url.lahan.dev);
  return useMutation({
    mutationFn: lahanApiClient.post,
    onSuccess: () => toast.success('Land baru berhasil disimpan'),
  });
};

export const useUpdateLand = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateLand) => {
      const lahanApiClient = new ApiClient<PayloadLand>(
        `${url.lahan.dev}/${id}`
      );
      return lahanApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Land berhasil diperbarui'),
  });

export const useDeleteLand = () =>
  useMutation({
    mutationFn: (id: string) => {
      const lahanApiClient = new ApiClient(`${url.lahan.dev}/${id}`);
      return lahanApiClient.delete();
    },
    onSuccess: () => toast.success(`Land berhasil dihapus`),
  });

export const useGetLands = () => {
  const lahanApiClient = new ApiClient<ResponseLand>(url.lahan.dev);
  return useQuery({
    queryKey: keys(url.lahan.key),
    queryFn: lahanApiClient.getAll,
  });
};
