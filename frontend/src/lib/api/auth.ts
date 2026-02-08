import { api } from './client';
import type { AuthResponse } from '@/types';

// ─── Auth API Functions ─────────────────────────────────────────────────────

export async function registerUser(data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
}

export async function loginUser(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
}

export async function refreshToken(
  refreshToken: string,
): Promise<AuthResponse> {
  const response = await api.post<AuthResponse>('/auth/refresh', {
    refreshToken,
  });
  return response.data;
}

export async function logoutUser(): Promise<void> {
  await api.post('/auth/logout');
}
