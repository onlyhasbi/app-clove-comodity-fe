import http, { setAuthToken } from '../api';
import { SignInPayload } from '../element/auth/FormLogin';
import { url } from '../utils/config/url';
import { useMutation } from '@tanstack/react-query';

type Props = {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
};

export const useAuth = ({ onSuccess, onError }: Props) =>
  useMutation({
    mutationFn: (payload: SignInPayload) =>
      http.post(url.auth.dev, payload).then((data) => data),
    onSuccess,
    onError,
  });

export const isAuthenticated = (name: string) => {
  return Boolean(getToken(name));
};

export function setToken(name: string, token: string) {
  if (!name && !token) throw new Error('No token provided');
  localStorage.setItem(name, token);
}

export function deleteToken(name: string) {
  if (!name) throw new Error('Token name not provided');
  const token = localStorage.getItem(name);
  token && localStorage.removeItem(name);
}

export function getToken(name: string) {
  try {
    if (!name) throw new Error('Token name not provided');
    const token = localStorage.getItem(name);
    const tokenParse = token && JSON.parse(token);
    if (token) setAuthToken(tokenParse.accessToken);

    return tokenParse;
  } catch (e) {
    deleteToken(import.meta.env.VITE_TOKEN_NAME);
  }
}
