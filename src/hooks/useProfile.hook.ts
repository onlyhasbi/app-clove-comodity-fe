import http from '../services/ApiClient';
import { url } from '../utils/config/url';
import { useQuery, useMutation } from '@tanstack/react-query';
import { keys } from '../utils/keys';
import { toast } from 'react-hot-toast';

export function useGetProfile() {
  return useQuery({
    queryKey: keys(url.profile.key),
    queryFn: () => http.get(url.profile.dev).then((data) => data),
  });
}

export const usePostProfile = () =>
  useMutation({
    mutationFn: (payload: PayloadRegisterProfile) =>
      http.post(url.profile.dev, payload).then((data) => data),
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (data: initialProfileProps) =>
      http.put(url.profile.dev, data).then((data) => data),
    onSuccess: () => toast.success('Profile berhasil diperbarui'),
  });

export function useGetSosmed() {
  return useQuery({
    queryKey: keys(url.sosmed.key),
    queryFn: () => http.get(url.sosmed.dev).then((data) => data),
  });
}

export const usePostSosmed = () =>
  useMutation({
    mutationFn: (payload: PayloadAddSosmed) =>
      http.post(url.sosmed.dev, payload).then((data) => data),
  });

export const useUpdateSosmed = () =>
  useMutation({
    mutationFn: (payload: PayloadUpdateSosmed) => {
      const { id, ...restPayload } = payload;
      return http
        .put(`${url.sosmed.dev}/${id}`, restPayload)
        .then((data) => data);
    },
  });
