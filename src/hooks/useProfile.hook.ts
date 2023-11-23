import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import ApiClient from '../services/apiClient';
import {
  PayloadAddSosmed,
  PayloadRegisterProfile,
  PayloadUpdateSosmed,
  Profile,
  ResponseProfile,
} from '../types/Profile';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export function useGetProfile() {
  const profileApiClient = new ApiClient<ResponseProfile>(url.profile.dev);
  return useQuery({
    queryKey: keys(url.profile.key),
    queryFn: profileApiClient.getAll,
  });
}

export const usePostProfile = () => {
  const profileApiClient = new ApiClient<PayloadRegisterProfile>(
    url.profile.dev
  );
  return useMutation({
    mutationFn: profileApiClient.post,
  });
};

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (data: Profile) => {
      const profileApiClient = new ApiClient<Profile>(url.profile.dev);
      return profileApiClient.update(data);
    },
    onSuccess: () => toast.success('Profile berhasil diperbarui'),
  });

export function useGetSosmed() {
  const sosmedApiClient = new ApiClient<any>(url.sosmed.dev);
  return useQuery({
    queryKey: keys(url.sosmed.key),
    queryFn: sosmedApiClient.getAll,
  });
}

export const usePostSosmed = () => {
  const sosmedApiClient = new ApiClient<PayloadAddSosmed>(url.sosmed.dev);
  return useMutation({
    mutationFn: sosmedApiClient.post,
  });
};

export const useUpdateSosmed = () =>
  useMutation({
    mutationFn: (payload: PayloadUpdateSosmed) => {
      const { id, ...restPayload } = payload;
      const sosmedApiClient = new ApiClient<PayloadAddSosmed>(
        `${url.sosmed.dev}/${id}`
      );
      return sosmedApiClient.update(restPayload);
    },
  });
