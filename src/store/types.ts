import { store } from './index';
import { AuthState } from '../types/auth';
import { User } from '../types/user';

export type AppDispatch = typeof store.dispatch;

export interface RootState {
  auth: AuthState;
  users: {
    list: User[];
    loading: boolean;
    error: string | null;
    currentPage: number;
    totalPages: number;
    searchTerm: string;
    viewMode: 'list' | 'card';
  };
}

export {};
