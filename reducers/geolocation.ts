import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GeolocationState = {
  value: {
    lastPosition: {latitude: string, longitude: string};
  };
};

const initialState: GeolocationState = {
  value: { lastPosition: {latitude: null, longitude: null} },
};

export const geolocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<any>) => {
      state.value.lastPosition.latitude = (action.payload.latitude);
      state.value.lastPosition.longitude = (action.payload.longitude);
    },
    deletePosition: (state, action: PayloadAction<string>) => {
      state.value.lastPosition = {latitude: null, longitude: null};
    },
  },
});

export const { addPosition, deletePosition } = geolocationSlice.actions;
export default geolocationSlice.reducer;