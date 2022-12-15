import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GeolocationState = {
  value: {
    coords: {};
  };
};

const initialState: GeolocationState = {
  value: { coords: {} },
};

export const geolocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<any>) => {
      state.value.latitude = (action.payload.latitude);
      state.value.longitude = (action.payload.longitude);
    },
    deletePosition: (state, action: PayloadAction<string>) => {
      state.value.coords = {};
    },
  },
});

export const { addPosition, deletePosition } = geolocationSlice.actions;
export default geolocationSlice.reducer;