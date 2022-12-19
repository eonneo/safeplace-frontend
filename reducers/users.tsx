import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
        email: string | null;
        prenom: string | null;
        avatarUri: string | null;
        isConnected: boolean;
        isAvailable: boolean;
        isReadyToAccomodate: boolean;
        isReadyToLift: boolean;
        isReadyToAssist: boolean;
    };
};

const initialState: UserState = {
    value: {
        email: null,
        prenom: null,
        avatarUri: null,
        isConnected: false,
        isAvailable: false,
        isReadyToAccomodate: false,
        isReadyToLift: false,
        isReadyToAssist: false,
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
            state.value.avatarUri = action.payload.avatarUri;
            console.log('reducer login:',action.payload);
        },
        handleAvailable: (state, action) => {
            state.value.isAvailable = action.payload.isAvailable;
            console.log('isAvailable reducer:' , action.payload);
        },
        handleAccomodate: (state, action) => {
            state.value.isReadyToAccomodate = action.payload.isReadyToAccomodate;
            console.log('isReadyToAccomodate reducer:' , action.payload);
        },
        handleReadyToLift: (state, action) => {
            state.value.isAvailable = action.payload.isReadyToLift;
            console.log('isReadyToLift reducer:' , action.payload);
        },
        handleReadyToAssist: (state, action) => {
            state.value.isReadyToAssist = action.payload.isReadyToAssist;
            console.log('isReadyToAssist reducer:' , action.payload);
        },
    },
});

export const { login, handleAvailable, handleAccomodate, handleReadyToLift, handleReadyToAssist } = userSlice.actions;
export default userSlice.reducer;
