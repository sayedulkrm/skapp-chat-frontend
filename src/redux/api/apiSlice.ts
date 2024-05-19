import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../backend";
import { getUser } from "../authSlice/authSlice";

// 57:02

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
    tagTypes: ["Chat", "User", "Message"],

    endpoints: (builder) => ({
        // refresh token
        refreshToken: builder.query({
            query: () => ({
                url: "/user/refreshtoken",
                method: "GET",
                credentials: "include" as const,
            }),
            // providesTags: ["Chat", "Message", "User"],
            // keepUnusedDataFor: 0,
        }),

        // Load users
        loadUser: builder.query({
            query: () => ({
                url: "/user/me",
                method: "GET",
                credentials: "include" as const,
            }),

            // providesTags: ["Chat", "Message", "User"],
            // keepUnusedDataFor: 0,

            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(getUser(result.data.user));
                } catch (error: any) {
                    console.log(error.message);
                }
            },
        }),

        // google auth

        googleAuth: builder.query({
            query: () => ({
                url: "/google/login/success",
                method: "GET",
                credentials: "include" as const,
            }),
            // providesTags: ["Chat", "Message", "User"],
            // keepUnusedDataFor: 0,

            async onQueryStarted(_, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(getUser(result.data.user));
                } catch (error: any) {
                    console.log(error.message);
                }
            },
        }),

        myChats: builder.query({
            query: () => ({
                url: "/chat/my",
                method: "GET",
                credentials: "include",
            }),
            // here we use tags for fetching data againg. Because RTK default behaviour is cached and if we don't use the tags we cant see the latest data
            providesTags: ["Chat"],
        }),

        myGroupChats: builder.query({
            query: () => ({
                url: "/chat/my/groups",
                method: "GET",
                credentials: "include",
            }),
            // here we use tags for fetching data againg. Because RTK default behaviour is cached and if we don't use the tags we cant see the latest data
            providesTags: ["Chat"],
        }),
    }),
});

export const {
    useRefreshTokenQuery,
    useLoadUserQuery,
    useGoogleAuthQuery,
    useMyChatsQuery,
    useMyGroupChatsQuery,
} = apiSlice;

export default apiSlice;
