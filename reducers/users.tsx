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
        isReadyToMove: boolean;
        mustComeToMe: boolean;
        token: string | null;
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
        isReadyToMove: false,
        mustComeToMe: false,
        token: null,
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
            state.value.token = action.payload.token;
            state.value.avatarUri = action.payload.avatarUri;
            console.log('reducer login:',action.payload);
        },
        setHelperSettings: (state, action) => {
            state.value.isAvailable = action.payload.isAvailable;
            state.value.isReadyToAssist = action.payload.isReadyToAssist;
            state.value.isReadyToAccomodate = action.payload.isReadyToAccomodate;
            state.value.isReadyToLift = action.payload.isReadyToLift;
            state.value.isReadyToMove = action.payload.isReadyToMove;
            state.value.mustComeToMe = action.payload.mustComeToMe;
            console.log('reducer helpersettings:', action.payload)
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
            state.value.isReadyToLift = action.payload.isReadyToLift;
            console.log('isReadyToLift reducer:' , action.payload);
        },
        handleReadyToAssist: (state, action) => {
            state.value.isReadyToAssist = action.payload.isReadyToAssist;
            console.log('isReadyToAssist reducer:' , action.payload);
        },
        handleReadyToMove: (state, action) => {
            state.value.isReadyToMove = action.payload;
            console.log('isReadyToMove reducer:', action.payload)
        },
        handleComeToMe: (state, action) => {
            state.value.mustComeToMe = action.payload;
            console.log('mustComeToMe reducer:', action.payload)
        },
        addSelfie: (state, action) => {
            state.value.avatarUri = action.payload;
            console.log('addSelfie:', action.payload)
        },
        
    },
});

export const { login, setHelperSettings, handleAvailable, handleAccomodate, handleReadyToLift, handleReadyToAssist, handleReadyToMove, handleComeToMe, addSelfie } = userSlice.actions;
export default userSlice.reducer;
