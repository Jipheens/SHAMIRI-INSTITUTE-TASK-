import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fulfilledNotify,
  rejectNotify,
  resetNotify,
} from '../../helpers/notifyStateHandler';

interface MainState {
  permissions: any;
  loading: boolean;
  count: number;
  refetch: boolean;
  notify: {
    showNotification: boolean;
    textNotification: string;
    typeNotification: string;
  };
}

const initialState: MainState = {
  permissions: [],
  loading: false,
  count: 0,
  refetch: false,
  notify: {
    showNotification: false,
    textNotification: '',
    typeNotification: 'warn',
  },
};

export const fetch = createAsyncThunk(
  'permissions/fetch',
  async (data: any) => {
    const { id, query } = data;
    const result = await axios.get(
      `permissions${query || (id ? `/${id}` : '')}`,
    );
    return id
      ? result.data
      : { rows: result.data.rows, count: result.data.count };
  },
);

export const deleteItem = createAsyncThunk(
  'permissions/deletePermissions',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`permissions/${id}`);
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const create = createAsyncThunk(
  'permissions/createPermissions',
  async (data: any, { rejectWithValue }) => {
    try {
      const result = await axios.post('permissions', { data });
      return result.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const uploadCsv = createAsyncThunk(
  'permissions/uploadCsv',
  async (file: File, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('filename', file.name);

      const result = await axios.post('permissions/bulk-import', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return result.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const update = createAsyncThunk(
  'permissions/updatePermissions',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await axios.put(`permissions/${payload.id}`, {
        id: payload.id,
        data: payload.data,
      });
      return result.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState,
  reducers: {
    setRefetch: (state, action: PayloadAction<boolean>) => {
      state.refetch = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetch.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(fetch.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });

    builder.addCase(fetch.fulfilled, (state, action) => {
      if (action.payload.rows && action.payload.count >= 0) {
        state.permissions = action.payload.rows;
        state.count = action.payload.count;
      } else {
        state.permissions = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });

    builder.addCase(deleteItem.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(state, `${'Permissions'.slice(0, -1)} has been deleted`);
    });

    builder.addCase(deleteItem.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });

    builder.addCase(create.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(create.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });

    builder.addCase(create.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(state, `${'Permissions'.slice(0, -1)} has been created`);
    });

    builder.addCase(update.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(update.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(state, `${'Permissions'.slice(0, -1)} has been updated`);
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });

    builder.addCase(uploadCsv.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(uploadCsv.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(state, 'Permissions has been uploaded');
    });
    builder.addCase(uploadCsv.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setRefetch } = permissionsSlice.actions;

export default permissionsSlice.reducer;
