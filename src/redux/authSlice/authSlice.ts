import { createSlice } from "@reduxjs/toolkit";
import {
    activateUser,
    googleAuth,
    userLogin,
    userRegister,
} from "./authReducers";

interface IAuthState {
    isAuthLoading: boolean;
    user: null | unknown; // You can use `null | unknown` or provide a more specific type
    userActivationToken: string;
    authMessage: null | string;
    authError: any;
}

const initialState: IAuthState = {
    isAuthLoading: false,
    user: undefined, //by default undefined
    userActivationToken: "",
    authMessage: null,
    authError: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearAuthMesssage: (state) => {
            state.authMessage = null;
        },
        clearAuthError: (state) => {
            state.authError = null;
        },
    },
    extraReducers: (builder) => {
        // =================================================================
        builder.addCase(userLogin.pending, (state) => {
            state.isAuthLoading = true;
        });

        builder.addCase(userLogin.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.user = action.payload;
            state.authMessage = action.payload.message;
        });

        builder.addCase(userLogin.rejected, (state, action) => {
            state.isAuthLoading = false;
            state.authError = action.payload?.message;
        });

        // =================================================================

        builder.addCase(userRegister.pending, (state) => {
            state.isAuthLoading = true;
        });

        builder.addCase(userRegister.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.userActivationToken = action.payload.activationToken;
            state.authMessage = action.payload.message;
        });

        builder.addCase(userRegister.rejected, (state, action) => {
            state.isAuthLoading = false;
            console.log("heres to", action);
            state.authError = action.payload?.message;
        });

        // =================================================================

        builder.addCase(activateUser.pending, (state) => {
            state.isAuthLoading = true;
        });

        builder.addCase(activateUser.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.userActivationToken = action.payload.activationToken;
            state.authMessage = action.payload.message;
        });

        builder.addCase(activateUser.rejected, (state, action) => {
            state.isAuthLoading = false;
            state.authError = action.payload?.message;
        });

        // ============================

        // Google Auth Pending

        builder.addCase(googleAuth.pending, (state) => {
            state.isAuthLoading = true;
        });
        builder.addCase(googleAuth.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.user = action.payload.user;
            state.authMessage = action.payload.message;
        });

        builder.addCase(googleAuth.rejected, (state, action) => {
            state.isAuthLoading = false;
            state.authError = action.payload;
        });
    },
});

export const { clearAuthError, clearAuthMesssage } = authSlice.actions;

export default authSlice.reducer;
