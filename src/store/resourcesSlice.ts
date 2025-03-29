
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResourceProps } from '@/types/resources';

interface ResourcesState {
  savedResources: ResourceProps[];
}

const initialState: ResourcesState = {
  savedResources: []
};

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    saveResource: (state, action: PayloadAction<ResourceProps>) => {
      state.savedResources.push(action.payload);
    },
    unsaveResource: (state, action: PayloadAction<string>) => {
      state.savedResources = state.savedResources.filter(resource => resource.id !== action.payload);
    }
  }
});

export const { saveResource, unsaveResource } = resourcesSlice.actions;
export default resourcesSlice.reducer;
