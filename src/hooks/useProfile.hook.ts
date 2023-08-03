import http from '../api';
import { url } from '../utils/config/url';
import { useQuery, useMutation } from '@tanstack/react-query';
import { keys } from './helper';
import { toast } from 'react-hot-toast';

export function useGetProfile() {
  return useQuery({
    queryKey: keys(url.profile.key),
    queryFn: () => http.get(url.profile.dev).then((data) => data),
  });
}

type Props = {
  onSuccess: () => void;
};

export const usePostProfile = ({ onSuccess }: Props) =>
  useMutation({
    mutationFn: (payload: PayloadRegisterProfile) =>
      http.post(url.profile.dev, payload).then((data) => data),
    onSuccess,
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: initialProfileProps) =>
      http.put(`${url.profile.dev}/${id}`, restPayload).then((data) => data),
    onSuccess: () => toast.success('Profile berhasil diperbarui'),
  });
