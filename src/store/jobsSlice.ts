
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { JobProps } from '@/components/JobCard';

interface JobsState {
  jobs: JobProps[];
  savedJobs: JobProps[];
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  savedJobs: [],
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<JobProps[]>) => {
      state.jobs = action.payload;
    },
    addJob: (state, action: PayloadAction<JobProps>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<JobProps>) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
    saveJob: (state, action: PayloadAction<JobProps>) => {
      state.savedJobs.push(action.payload);
    },
    unsaveJob: (state, action: PayloadAction<string>) => {
      state.savedJobs = state.savedJobs.filter(job => job.id !== action.payload);
    },
    toggleSavedJob: (state, action: PayloadAction<JobProps>) => {
      const jobId = action.payload.id;
      const isJobSaved = state.savedJobs.some(job => job.id === jobId);
      
      if (isJobSaved) {
        state.savedJobs = state.savedJobs.filter(job => job.id !== jobId);
      } else {
        state.savedJobs.push(action.payload);
      }
    }
  }
});

export const { setJobs, addJob, updateJob, deleteJob, saveJob, unsaveJob, toggleSavedJob } = jobsSlice.actions;
export default jobsSlice.reducer;
