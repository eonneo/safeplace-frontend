import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SignupState = {
    value: {
        email: string | null;
        password: string | null;
        nom: string | null;
        prenom: string | null;
        naissance: any | null;
        telephone: string | null;
        numeroRue: string | null;
        rue: string | null;
        codePostal: number | null;
        ville: string | null;
    };
};

const initialState: SignupState = {
    value: {
        email: null,
        password: null,
        nom: null,
        prenom: null,
        naissance: null,
        telephone: null,
        numeroRue: null,
        rue: null,
        codePostal: null,
        ville: null,
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
        },
        getRestSignupFields: (state, action) => {
            state.value.prenom = action.payload.prenom;
            state.value.nom = action.payload.nom;
            state.value.naissance = action.payload.naissance;
            state.value.telephone = action.payload.telephone;
            state.value.numeroRue = action.payload.numeroRue;
            state.value.rue = action.payload.rue;
            state.value.codePostal = action.payload.codePostal;
            state.value.ville = action.payload.ville;
            console.log('full reducer:', action.payload)
        }
    },
});

export const { getFirstSignupFields, getRestSignupFields } = userSlice.actions;
export default userSlice.reducer;