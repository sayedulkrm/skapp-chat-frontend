import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../backend";

// 57:02

const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${server}` }),
    tagTypes: ["Chat", "User"],

    endpoints: (builder) => ({
        myChats: builder.query({
            query: () => ({
                url: "/chat/my",
                method: "GET",
                credentials: "include",
            }),
            // here we use tags for fetching data againg. Because RTK default behaviour is cached and if we don't use the tags we cant see the latest data
            providesTags: ["Chat"],
        }),
    }),
});

export const { useMyChatsQuery } = apiSlice;

export default apiSlice;
