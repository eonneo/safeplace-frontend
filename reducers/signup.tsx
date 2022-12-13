import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SignupState = {
    value: {
        email: string | null;
        password: string | null;
    };
};

const initialState: SignupState = {
    value: {
        email: null,
        password: null
    },
};

export const userSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        getFirstSignupFields: (state, action) => {
            state.value.email = action.payload.email;
            state.value.password = action.payload.password;
            console.log('reducer:',action.payload)
        }
    },
});

export const { getFirstSignupFields } = userSlice.actions;
export default userSlice.reducer;