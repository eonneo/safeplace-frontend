import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
        email: string | null;
        prenom: string | null;
        isConnected: boolean;
        isAvaible: boolean;
    };
};

const initialState: UserState = {
    value: {
        email: null,
        prenom: null,
        isConnected: false,
        isAvaible: false,
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
        handleAvaible: (state, action) => {
            state.value.isAvaible = action.payload.isAvaible;
            console.log('isAvaible reducer:' , action.payload);
        }
    },
});

export const { login, handleAvaible } = userSlice.actions;
export default userSlice.reducer;
