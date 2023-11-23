import { useQuery } from '@tanstack/react-query';
import ApiClient from '../services/apiClient';
import { url } from '../utils/config/url';
import { ResponseUserBuruh } from '../types/User';
import { keys } from '../utils/keys';

export const useAllUserAcc = () => {
  const userApiClient = new ApiClient<any>(url.all_acc.dev);
  return useQuery({
    queryKey: keys(url.all_acc.key),
    queryFn: userApiClient.getAll,
  });
};

export const useAllUserBuruh = () => {
  const userApiClient = new ApiClient<ResponseUserBuruh>(url.all_buruh.dev);
  return useQuery({
    queryKey: keys(url.all_buruh.key),
    queryFn: userApiClient.getAll,
  });
};
