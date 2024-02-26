import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {
  fulfilledNotify,
  rejectNotify,
  resetNotify,
} from '../../helpers/notifyStateHandler';

interface MainState {
  appraisal_summary: any;
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
  appraisal_summary: [],
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
  'appraisal_summary/fetch',
  async (data: any) => {
    const { id, query } = data;
    const result = await axios.get(
      `appraisal_summary${query || (id ? `/${id}` : '')}`,
    );
    return id
      ? result.data
      : { rows: result.data.rows, count: result.data.count };
  },
);

export const deleteItem = createAsyncThunk(
  'appraisal_summary/deleteAppraisal_summary',
  async (id: string, { rejectWithValue }) => {
    try {
      await axios.delete(`appraisal_summary/${id}`);
    } catch (error) {
      if (!error.response) {
        throw error;
      }

      return rejectWithValue(error.response.data);
    }
  },
);

export const create = createAsyncThunk(
  'appraisal_summary/createAppraisal_summary',
  async (data: any, { rejectWithValue }) => {
    try {
      const result = await axios.post('appraisal_summary', { data });
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
  'appraisal_summary/uploadCsv',
  async (file: File, { rejectWithValue }) => {
    try {
      const data = new FormData();
      data.append('file', file);
      data.append('filename', file.name);

      const result = await axios.post('appraisal_summary/bulk-import', data, {
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
  'appraisal_summary/updateAppraisal_summary',
  async (payload: any, { rejectWithValue }) => {
    try {
      const result = await axios.put(`appraisal_summary/${payload.id}`, {
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

export const appraisal_summarySlice = createSlice({
  name: 'appraisal_summary',
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
        state.appraisal_summary = action.payload.rows;
        state.count = action.payload.count;
      } else {
        state.appraisal_summary = action.payload;
      }
      state.loading = false;
    });

    builder.addCase(deleteItem.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });

    builder.addCase(deleteItem.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(
        state,
        `${'Appraisal_summary'.slice(0, -1)} has been deleted`,
      );
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
      fulfilledNotify(
        state,
        `${'Appraisal_summary'.slice(0, -1)} has been created`,
      );
    });

    builder.addCase(update.pending, (state) => {
      state.loading = true;
      resetNotify(state);
    });
    builder.addCase(update.fulfilled, (state) => {
      state.loading = false;
      fulfilledNotify(
        state,
        `${'Appraisal_summary'.slice(0, -1)} has been updated`,
      );
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
      fulfilledNotify(state, 'Appraisal_summary has been uploaded');
    });
    builder.addCase(uploadCsv.rejected, (state, action) => {
      state.loading = false;
      rejectNotify(state, action);
    });
  },
});

// Action creators are generated for each case reducer function
export const { setRefetch } = appraisal_summarySlice.actions;

export default appraisal_summarySlice.reducer;
