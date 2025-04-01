
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  isEditing: boolean;
  profile: any; // This should be properly typed based on your profile structure
}

const initialState: ProfileState = {
  isEditing: false,
  profile: null
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    },
    updateProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    }
  }
});

export const { setIsEditing, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
