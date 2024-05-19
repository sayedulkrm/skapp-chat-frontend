import { createSlice } from "@reduxjs/toolkit";
import {
    activateUser,
    getUserProfile,
    googleAuth,
    updateUserToken,
    userLogin,
    userLogout,
    userRegister,
} from "./authReducers";

interface IAuthState {
    isAuthLoading: boolean;
    user: null | unknown | any; // You can use `null | unknown` or provide a more specific type
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

        getUser: (state, action) => {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        // User Login =================================================================
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

        // User Register =================================================================

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

        // Activate User =================================================================

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

        // User Logout =================================================================
        builder.addCase(userLogout.pending, (state) => {
            state.isAuthLoading = true;
        });

        builder.addCase(userLogout.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.user = null;
            state.authMessage = action.payload.message;
        });

        builder.addCase(userLogout.rejected, (state, action: any) => {
            state.isAuthLoading = false;
            state.authError = action.payload?.message;
        });

        // ============================

        // Update User Token ==================

        builder.addCase(updateUserToken.pending, (state) => {
            state.isAuthLoading = true;
        });
        builder.addCase(updateUserToken.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            // state.user = action.payload.user;
            state.authMessage = action.payload.message;
        });

        builder.addCase(updateUserToken.rejected, (state) => {
            state.isAuthLoading = false;
            // state.authError = action.payload;
        });

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

        // Get User Profile ==================

        builder.addCase(getUserProfile.pending, (state) => {
            state.isAuthLoading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.isAuthLoading = false;
            state.user = action.payload.user;
        });

        builder.addCase(getUserProfile.rejected, (state, action) => {
            state.isAuthLoading = false;
            state.authError = action.payload;
        });
    },
});

export const { clearAuthError, clearAuthMesssage, getUser } = authSlice.actions;

export default authSlice.reducer;
