import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SelfieState = {
  value: {
    selfies: string[];
  };
};

const initialState: SelfieState = {
  value: { selfies: [] },
};

export const selfieSlice = createSlice({
  name: 'selfie',
  initialState,
  reducers: {
    addSelfie: (state, action: PayloadAction<string>) => {
      state.value.selfies.push(action.payload);
    },
    deleteSelfie: (state, action: PayloadAction<string>) => {
      state.value.selfies = state.value.selfies.filter((data) => data !== action.payload);
    },
  },
});

export const { addSelfie, deleteSelfie } = selfieSlice.actions;
export default selfieSlice.reducer;