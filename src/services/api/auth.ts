import { httpClient } from '../httpClient';
import { LoginCredentials, LoginResponse } from '../../types/auth';

export const authAPI = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await httpClient.post('/login', credentials);
    return response.data;
  },
};