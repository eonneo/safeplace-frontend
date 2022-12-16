import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
        email: string | null;
        prenom: string | null;
        isConnected: boolean;
        isAvailable: boolean;
    };
};

const initialState: UserState = {
    value: {
        email: null,
        prenom: null,
        isConnected: false,
        isAvailable: false,
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
        }
    },
});

export const { login, handleAvailable } = userSlice.actions;
export default userSlice.reducer;
