import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserState = {
    value: {
        email: string | null;
    };
};

const initialState: UserState = {
    value: { email: null },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
        },
});

export const {  } = userSlice.actions;
export default userSlice.reducer;
