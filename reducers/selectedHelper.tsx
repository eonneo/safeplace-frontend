import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SelectedHelperState = {
    value: {
        email: string | null;
        prenom: string | null;
        avatarUri: string | null;
        isConnected: boolean;
        isReadyToAccomodate: boolean;
        isReadyToLift: boolean;
        isReadyToAssist: boolean;
        isReadyToMove: boolean;
        mustComeToMe: boolean;
        token: string | null;
        latitude: number | null;
        longitude: number | null;
        id: string | null;
    };
};

const initialState: SelectedHelperState = {
    value: {
        email: null,
        prenom: null,
        avatarUri: null,
        isConnected: false,
        isReadyToAccomodate: false,
        isReadyToLift: false,
        isReadyToAssist: false,
        isReadyToMove: false,
        mustComeToMe: false,
        token: null,
        latitude: null,
        longitude: null,
        id: null,
    },
};

export const selectedHelperSlice = createSlice({
    name: 'selectedHelper',
    initialState,
    reducers: {
        addHelperInfos: (state, action) => {
            state.value.email = action.payload.email;
            state.value.prenom = action.payload.prenom;
            state.value.avatarUri = action.payload.avatarUri;
            state.value.isConnected = action.payload.isConnected;
            state.value.isReadyToAccomodate = action.payload.isReadyToAccomodate;
            state.value.isReadyToLift = action.payload.isReadyToLift;
            state.value.isReadyToAssist = action.payload.isReadyToAssist;
            state.value.isReadyToMove = action.payload.isReadyToMove;
            state.value.mustComeToMe = action.payload.mustComeToMe;
            state.value.latitude = action.payload.latitude;
            state.value.longitude = action.payload.longitude;
        
            console.log('reducer selectedHelper:',action.payload);
        },        
    },
});

export const { addHelperInfos } = selectedHelperSlice.actions;
export default selectedHelperSlice.reducer;