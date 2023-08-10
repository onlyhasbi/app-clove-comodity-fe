import http from '../api';
import { url } from '../utils/config/url';
import { useQuery } from '@tanstack/react-query';

import { keys } from './helper';

export const useAllUserAcc = () =>
  useQuery({
    queryKey: keys(url.all_acc.key),
    queryFn: () => http.get(url.all_acc.dev).then((data) => data),
  });

export const useAllUserBuruh = () =>
  useQuery({
    queryKey: keys(url.all_acc.key),
    queryFn: () => http.get(url.all_acc.dev).then((data) => data),
  });
