import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../backend";

interface MyKnownError {
    message: string;
}

interface IRFromData {
    name: string;
    email: string;
    password?: string;
    avatar?: any;
}

interface ILFromData {
    email: string;
    password?: string;
}

export const userLogin = createAsyncThunk<
    any,
    ILFromData,
    {
        rejectValue: MyKnownError;
    }
>("user/login", async (formData, { rejectWithValue }) => {
    console.log("login: ", formData);

    try {
        const { data } = await axios.post(`${server}/user/login`, formData);

        console.log(data);
        return data;
    } catch (error: any) {
        return rejectWithValue(
            (error.response.data ?? error?.message) as MyKnownError
        );
    }
});

export const userRegister = createAsyncThunk<
    any,
    IRFromData,
    { rejectValue: MyKnownError }
>("user/register", async (formData, { rejectWithValue }) => {
    try {
        const { data } = await axios.post(`${server}/user/register`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });

        console.log(data);
        return data;
    } catch (error: any) {
        console.log(error);

        return rejectWithValue(
            (error.response.data ?? error?.message) as MyKnownError
        );
    }
});

interface IActivateUser {
    activation_token: string;
    activation_code: string;
}

export const activateUser = createAsyncThunk<
    any,
    IActivateUser,
    { rejectValue: MyKnownError }
>("user/activate", async (tokenData, { rejectWithValue }) => {
    console.log(tokenData);

    try {
        const { data } = await axios.post(
            `${server}/user/activate`,
            tokenData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );

        console.log(data);
        return data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue((error.response.data ?? error) as MyKnownError);
    }
});

// logout
export const userLogout = createAsyncThunk(
    "user/user-logout",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${server}/user/logout`, {
                withCredentials: true,
            });
            console.log("Am logging out", data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data ?? error) as any;
        }
    }
);

// google auth
export const googleAuth = createAsyncThunk(
    "user/google-auth",
    async (arg, { rejectWithValue }) => {
        console.log("Heyy am getting called", arg);
        try {
            const { data } = await axios.get(`${server}/google/login/success`, {
                withCredentials: true,
            });
            console.log("I am Google Auth ================", data);
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Update User Token

export const updateUserToken = createAsyncThunk<
    any,
    void,
    {
        rejectValue: any;
    }
>("user/updateToken", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${server}/user/refreshtoken`);

        console.log(data);
        return data;
    } catch (error: any) {
        return rejectWithValue(
            (error.response.data ?? error?.message) as MyKnownError
        );
    }
});

// Get User Profile

export const getUserProfile = createAsyncThunk<
    any,
    void,
    {
        rejectValue: MyKnownError;
    }
>("user/me", async (_, { rejectWithValue }) => {
    try {
        const { data } = await axios.get(`${server}/user/me`);

        console.log(data);
        return data;
    } catch (error: any) {
        return rejectWithValue(
            (error.response.data ?? error?.message) as MyKnownError
        );
    }
});
