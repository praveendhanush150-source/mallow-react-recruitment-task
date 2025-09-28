import { httpClient } from '../httpClient';
import { User, UserFormData, UsersResponse } from '../../types/user';

export const usersAPI = {
  getUsers: async (page = 1): Promise<UsersResponse> => {
    const response = await httpClient.get(`/users?page=${page}`);
    return response.data;
  },

  createUser: async (userData: UserFormData): Promise<User> => {
    const response = await httpClient.post('/users', userData);
    return response.data;
  },

  updateUser: async (id: number, userData: UserFormData): Promise<User> => {
    const response = await httpClient.put(`/users/${id}`, userData);
    return response.data;
  },

  deleteUser: async (id: number): Promise<void> => {
    await httpClient.delete(`/users/${id}`);
  },
};