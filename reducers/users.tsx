import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
        email: string | null;
        prenom: string | null;
        isConnected: boolean;
    };
};

const initialState: UserState = {
    value: {
        email: null,
        prenom: null,
        isConnected: false,
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
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer;
