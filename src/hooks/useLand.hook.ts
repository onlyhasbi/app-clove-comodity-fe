import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { ApiClient } from '../services/apiClient';
import { PayloadLahan, PayloadUpdateLahan, ResponseLahan } from '../types/Land';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostLahan = () => {
  const lahanApiClient = new ApiClient<PayloadLahan>(url.lahan.dev);
  return useMutation({
    mutationFn: lahanApiClient.post,
    onSuccess: () => toast.success('Lahan baru berhasil disimpan'),
  });
};

export const useUpdateLahan = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateLahan) => {
      const lahanApiClient = new ApiClient<PayloadLahan>(
        `${url.lahan.dev}/${id}`
      );
      return lahanApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Lahan berhasil diperbarui'),
  });

export const useDeleteLahan = () =>
  useMutation({
    mutationFn: (id: string) => {
      const lahanApiClient = new ApiClient(`${url.lahan.dev}/${id}`);
      return lahanApiClient.delete();
    },
    onSuccess: () => toast.success(`Lahan berhasil dihapus`),
  });

export const useGetLahan = () => {
  const lahanApiClient = new ApiClient<ResponseLahan>(url.lahan.dev);
  return useQuery({
    queryKey: keys(url.lahan.key),
    queryFn: lahanApiClient.getAll,
  });
};
