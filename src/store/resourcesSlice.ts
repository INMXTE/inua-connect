
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Resource } from '@/types/resource';

interface ResourcesState {
  resources: Resource[];
}

const initialState: ResourcesState = {
  resources: []
};

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {
    setResources: (state, action: PayloadAction<Resource[]>) => {
      state.resources = action.payload;
    },
    addResource: (state, action: PayloadAction<Resource>) => {
      state.resources.push(action.payload);
    },
    updateResource: (state, action: PayloadAction<Resource>) => {
      const index = state.resources.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.resources[index] = action.payload;
      }
    },
    deleteResource: (state, action: PayloadAction<string>) => {
      state.resources = state.resources.filter(r => r.id !== action.payload);
    }
  }
});

export const { setResources, addResource, updateResource, deleteResource } = resourcesSlice.actions;
export default resourcesSlice.reducer;
