
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  isEditing: boolean;
}

const initialState: ProfileState = {
  isEditing: false
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setIsEditing: (state, action: PayloadAction<boolean>) => {
      state.isEditing = action.payload;
    }
  }
});

export const { setIsEditing } = profileSlice.actions;
export default profileSlice.reducer;
