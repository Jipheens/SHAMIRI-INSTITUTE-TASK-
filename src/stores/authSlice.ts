import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import jwt from 'jsonwebtoken';

interface MainState {
  isFetching: boolean;
  errorMessage: string;
  currentUser: any;
  notify: any;
  token: string;
}

const initialState: MainState = {
  isFetching: false,
  errorMessage: '',
  currentUser: null,
  token: '',
  notify: {
    showNotification: false,
    textNotification: '',
    typeNotification: 'warn',
  },
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (creds: Record<string, string>) => {
    const response = await axios.post('auth/signin/local', creds);
    return response.data;
  },
);
export const findMe = createAsyncThunk('auth/findMe', async () => {
  const response = await axios.get('auth/me');
  return response.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      axios.defaults.headers.common['Authorization'] = '';
      state.currentUser = null;
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const token = action.payload;
      const user = jwt.decode(token);

      state.errorMessage = '';
      state.token = token;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.errorMessage = 'Something was wrong. Try again';
      state.isFetching = false;
    });
    builder.addCase(findMe.pending, () => {
      console.log('Pending findMe');
    });
    builder.addCase(findMe.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isFetching = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
