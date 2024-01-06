import { useQuery } from '@tanstack/react-query';
import ApiClient from '../services/apiClient';
import Location from '../types/Location';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

const provinsiApiClient = new ApiClient<Location>(url.provinsi.dev);
export const useProvince = () =>
  useQuery({
    queryKey: keys(url.provinsi.key),
    queryFn: provinsiApiClient.getAll,
  });

export const useKabupaten = (id_provinsi: string) => {
  const kabupatenApiClient = new ApiClient<Location>(
    `${url.kabupaten.dev}/${id_provinsi}`
  );

  return useQuery({
    queryKey: keys(url.kabupaten.key, id_provinsi),
    queryFn: kabupatenApiClient.getAll,
    enabled: Boolean(id_provinsi),
  });
};
