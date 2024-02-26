import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';

import usersSlice from './users/usersSlice';
import appraisal_reportsSlice from './appraisal_reports/appraisal_reportsSlice';
import featuresSlice from './features/featuresSlice';
import pdf_formsSlice from './pdf_forms/pdf_formsSlice';
import appraisal_summarySlice from './appraisal_summary/appraisal_summarySlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,

    users: usersSlice,
    appraisal_reports: appraisal_reportsSlice,
    appraisal_summary: appraisal_summarySlice,
    features: featuresSlice,
    pdf_forms: pdf_formsSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
