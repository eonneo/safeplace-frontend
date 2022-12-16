import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
        email: string | null;
        prenom: string | null;
        isConnected: boolean;
        isAvailable: boolean;
        isReadyToAccomodate: boolean;
    };
};

const initialState: UserState = {
    value: {
        email: null,
        prenom: null,
        isConnected: false,
        isAvailable: false,
        isReadyToAccomodate: false,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.email = action.payload.email;
            state.value.prenom = action.payload.prenom;
            state.value.isConnected = action.payload.isConnected;
            console.log('reducer login:',action.payload);
        },
        handleAvailable: (state, action) => {
            state.value.isAvailable = action.payload.isAvailable;
            console.log('isAvailable reducer:' , action.payload);
        },
        handleAccomodate: (state, action) => {
            state.value.isAvailable = action.payload.isReadyToAccomodate;
            console.log('isReadyToAccomodate reducer:' , action.payload);
        },
    },
});

export const { login, handleAvailable, handleAccomodate } = userSlice.actions;
export default userSlice.reducer;
