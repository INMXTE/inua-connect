
import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobsSlice';
import resourcesReducer from './resourcesSlice';
import profileReducer from './profileSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    resources: resourcesReducer,
    profile: profileReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export both named export and default export
export { store as default };
