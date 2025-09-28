import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { loginUser, logout, clearError } from '../store/slices/authSlice';
import { LoginCredentials } from '../types/auth';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = (credentials: LoginCredentials) => {
    dispatch(loginUser(credentials));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const clearAuthError = () => {
    dispatch(clearError());
  };

  return {
    ...auth,
    login,
    logout: handleLogout,
    clearError: clearAuthError,
  };
};