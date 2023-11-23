import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import {
  PayloadHasil,
  PayloadUpdateLahan,
  ResponseHarvestResult,
} from '../types/HarvestResult';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostHasil = () => {
  const harvestResultApiClient = new ApiClient<PayloadHasil>(
    url.hasil_panen.dev
  );
  return useMutation({
    mutationFn: harvestResultApiClient.post,
    onSuccess: () => toast.success('Hasil baru berhasil disimpan'),
  });
};

export const useUpdateHasil = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateLahan) => {
      const harvestResultApiClient = new ApiClient<PayloadHasil>(
        `${url.hasil_panen.dev}/${id}`
      );
      return harvestResultApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Hasil panen berhasil diperbarui'),
  });

export const useDeleteHasil = () =>
  useMutation({
    mutationFn: (id: string) => {
      const harvestResultApiClient = new ApiClient(
        `${url.hasil_panen.dev}/${id}`
      );
      return harvestResultApiClient.delete();
    },
    onSuccess: () => toast.success(`Hasil panen berhasil dihapus`),
  });

export const useGetHasil = () => {
  const harvestResultApiClient = new ApiClient<ResponseHarvestResult>(
    url.hasil_panen.dev
  );
  return useQuery({
    queryKey: keys(url.hasil_panen.key),
    queryFn: harvestResultApiClient.getAll,
  });
};
