import http from '../api';
import { url } from '../utils/config/url';
import { useQuery, useMutation } from '@tanstack/react-query';
import { keys } from './helper';

type PayloadProfile = {
  nomor_telpon: string;
  jenis_pengguna: string;
  nama: string;
  sandi: string;
  alamat: string;
};

type payloadUpdateProfile = PayloadProfile & {
  id: string;
};

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
    mutationFn: (payload: PayloadProfile) =>
      http.post(url.profile.dev, payload).then((data) => data),
    onSuccess,
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: ({ id, ...restPayload }: payloadUpdateProfile) =>
      http.put(`${url.profile.dev}/${id}`, restPayload).then((data) => data),
  });
