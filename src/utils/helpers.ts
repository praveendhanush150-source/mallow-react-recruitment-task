// Helper functions used throughout the application
import { User } from '../types/user';

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm) return users;
  
  const lowerSearchTerm = searchTerm.toLowerCase();
  return users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(lowerSearchTerm) ||
      user.last_name.toLowerCase().includes(lowerSearchTerm)
  );
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export const formatError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.response?.data?.error) return error.response.data.error;
  return 'An unexpected error occurred';
};

export {};
