import { useMutation } from '@tanstack/react-query';
import { SignInPayload } from '../features/auth/FormLogin';
import { ApiClient, setAuthToken } from '../services/apiClient';
import { url } from '../utils/config/url';

type Props = {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
};

const authApiClient = new ApiClient<SignInPayload>(url.auth.dev);
export const useAuth = ({ onSuccess, onError }: Props) =>
  useMutation({
    mutationFn: (payload: SignInPayload) => authApiClient.post(payload),
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
