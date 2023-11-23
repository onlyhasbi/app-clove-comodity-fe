import { useQuery } from '@tanstack/react-query';
import { ApiClient } from '../services/apiClient';
import { url } from '../utils/config/url';
import { keys } from '../utils/keys';

export const useGetPengeringan = () => {
  const overviewApiClient = new ApiClient<any>(url.report_pengeringan.dev);
  return useQuery({
    queryKey: keys(url.report_pengeringan.key),
    queryFn: overviewApiClient.getAll,
  });
};

export const useGetKomoditas = () => {
  const overviewApiClient = new ApiClient<any>(url.report_komoditas.dev);
  return useQuery({
    queryKey: keys(url.report_komoditas.key),
    queryFn: overviewApiClient.getAll,
  });
};
export const useGetTransaksi = () => {
  const overviewApiClient = new ApiClient<any>(url.report_transaksi.dev);
  return useQuery({
    queryKey: keys(url.report_transaksi.key),
    queryFn: overviewApiClient.getAll,
  });
};

export const useGetLahan = () => {
  const overviewApiClient = new ApiClient<any>(url.report_lahan.dev);
  return useQuery({
    queryKey: keys(url.report_lahan.key),
    queryFn: overviewApiClient.getAll,
  });
};

export const useGetInfoPenawaran = () => {
  const overviewApiClient = new ApiClient<any>(url.info_penawaran.dev);

  return useQuery({
    queryKey: keys(url.info_penawaran.key),
    queryFn: overviewApiClient.getAll,
    refetchInterval: 6000,
  });
};
export const useGetInfoBuruh = () => {
  const overviewApiClient = new ApiClient<any>(url.info_buruh.dev);

  return useQuery({
    queryKey: keys(url.info_buruh.key),
    queryFn: overviewApiClient.getAll,
    refetchInterval: 6000,
  });
};
