import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import { ResponseJob, PayloadUpdateJob, PayloadJob } from '../types/Job';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const usePostJob = () => {
  const workApiClient = new ApiClient<PayloadJob>(url.pekerjaan.dev);
  return useMutation({
    mutationFn: workApiClient.post,
    onSuccess: () => toast.success('Pekerjaan baru berhasil disimpan'),
  });
};

export const useUpdateJob = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: PayloadUpdateJob) => {
      const workApiClient = new ApiClient<PayloadJob>(
        `${url.pekerjaan.dev}/${id}`
      );
      return workApiClient.update(restPayload);
    },
    onSuccess: () => toast.success('Pekerjaan berhasil diperbarui'),
  });

export const useDeleteJob = () =>
  useMutation({
    mutationFn: (id: string) => {
      const workApiClient = new ApiClient(`${url.pekerjaan.dev}/${id}`);
      return workApiClient.delete();
    },
    onSuccess: () => toast.success(`Pekerjaan berhasil dihapus`),
  });

export const useGetJob = () => {
  const workApiClient = new ApiClient<ResponseJob>(url.pekerjaan.dev);
  return useQuery({
    queryKey: keys(url.pekerjaan.key),
    queryFn: workApiClient.getAll,
  });
};

export const useUpdateActive = () =>
  useMutation({
    mutationFn: ({ id, value }: UpdateStatus) => {
      const workApiClient = new ApiClient(
        `${url.update_status_lowongan.dev}/${id}?status=${value}`
      );
      return workApiClient.update({});
    },
  });
