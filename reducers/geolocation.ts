import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type GeolocationState = {
  value: {
    latitude: string, 
    longitude: string,
  };
};

const initialState: GeolocationState = {
  value: { 
    latitude: null, 
    longitude: null,}
};

export const geolocationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    addPosition: (state, action: PayloadAction<any>) => {
      console.log('reducer:',action.payload);
      state.value.latitude = (action.payload.latitude);
      state.value.longitude = (action.payload.longitude);
    },
    deletePosition: (state, action: PayloadAction<string>) => {
      state.value.latitude = null, 
      state.value.longitude = null}
  },
});

export const { addPosition, deletePosition } = geolocationSlice.actions;
export default geolocationSlice.reducer;