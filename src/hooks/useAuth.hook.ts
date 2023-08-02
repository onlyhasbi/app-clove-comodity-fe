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
  if (!name) return null;
  const token = localStorage.getItem(name) || null;
  if (token) setAuthToken(token);
  return token;
}

export function verifyToken() {
  console.log('verifyToken');
}
