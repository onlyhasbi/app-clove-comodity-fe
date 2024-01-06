import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import { PayloadTeam, UpdatePayloadTeam, ResponseTeam } from '../types/Team';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostTeam = () => {
  const teammApiClient = new ApiClient<PayloadTeam>(url.tim.dev);
  return useMutation({
    mutationFn: teammApiClient.post,
    onSuccess: () => toast.success('Team baru berhasil disimpan'),
  });
};

export const useUpdateTeam = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: UpdatePayloadTeam) => {
      const teammApiClient = new ApiClient<PayloadTeam>(`${url.tim.dev}/${id}`);
      return teammApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Team berhasil diperbarui'),
  });

export const useDeleteTeam = () =>
  useMutation({
    mutationFn: (id: string) => {
      const teammApiClient = new ApiClient(`${url.tim.dev}/${id}`);
      return teammApiClient.delete();
    },
    onSuccess: () => toast.success(`Team berhasil dihapus`),
  });

export const useGetTeam = () => {
  const teammApiClient = new ApiClient<ResponseTeam>(url.tim.dev);
  return useQuery({
    queryKey: keys(url.tim.key),
    queryFn: teammApiClient.getAll,
  });
};
