import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User, UserFormData } from '../../types/user';
import { usersAPI } from '../../services/api/users';

interface UsersState {
  list: User[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  viewMode: 'list' | 'card';
}

const initialState: UsersState = {
  list: [],
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  searchTerm: '',
  viewMode: 'list',
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (page: number) => {
    const response = await usersAPI.getUsers(page);
    return response;
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData: UserFormData) => {
    const response = await usersAPI.createUser(userData);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ id, userData }: { id: number; userData: UserFormData }) => {
    const response = await usersAPI.updateUser(id, userData);
    return response;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id: number) => {
    await usersAPI.deleteUser(id);
    return id;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setViewMode: (state, action: PayloadAction<'list' | 'card'>) => {
      state.viewMode = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.data;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      })
      // Create User
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.list.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.list = state.list.filter((user) => user.id !== action.payload);
      });
  },
});

export const { setSearchTerm, setViewMode, setCurrentPage } = usersSlice.actions;
export default usersSlice.reducer;
