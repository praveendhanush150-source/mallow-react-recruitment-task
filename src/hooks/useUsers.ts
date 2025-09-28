import { useSelector } from 'react-redux';
import { RootState } from '../store/types';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  setSearchTerm,
  setViewMode,
  setCurrentPage,
} from '../store/slices/usersSlice';
import { User, UserFormData } from '../types/user';
import { useAppDispatch } from './useAppDispatch';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const {
    list,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    viewMode,
  } = useSelector((state: RootState) => state.users);

  const handleFetchUsers = async (page: number = 1) => {
    return await dispatch(fetchUsers(page)).unwrap();
  };

  const handleCreateUser = async (userData: UserFormData) => {
    return await dispatch(createUser(userData)).unwrap();
  };

  const handleUpdateUser = async (id: number, userData: UserFormData) => {
    return await dispatch(updateUser({ id, userData })).unwrap();
  };

  const handleDeleteUser = async (id: number) => {
    return await dispatch(deleteUser(id)).unwrap();
  };

  const handleSearch = (term: string) => {
    dispatch(setSearchTerm(term));
  };

  const handleViewModeChange = (mode: 'list' | 'card') => {
    dispatch(setViewMode(mode));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return {
    users: list,
    loading,
    error,
    currentPage,
    totalPages,
    searchTerm,
    viewMode,
    fetchUsers: handleFetchUsers,
    createUser: handleCreateUser,
    updateUser: handleUpdateUser,
    deleteUser: handleDeleteUser,
    setSearchTerm: handleSearch,
    setViewMode: handleViewModeChange,
    setCurrentPage: handlePageChange,
  };
};
