
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExtendedProfile } from '@/types/database';

interface ProfileState {
  isEditing: boolean;
  profile: ExtendedProfile | null;
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
    updateProfile: (state, action: PayloadAction<ExtendedProfile>) => {
      state.profile = action.payload;
    }
  }
});

export const { setIsEditing, updateProfile } = profileSlice.actions;
export default profileSlice.reducer;
