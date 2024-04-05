import apiSlice from "../api/apiSlice";

const otherApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        searchUser: builder.query({
            query: (userName) => ({
                url: `/user/search?name=${userName}`,
                method: "GET",
                credentials: "include",
            }),

            providesTags: ["User"],
        }),

        // send req
        sendFriendRequest: builder.mutation({
            query: (data) => ({
                url: "/user/sendrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),

            invalidatesTags: ["User"],
        }),
    }),
});

export const { useLazySearchUserQuery, useSendFriendRequestMutation } =
    otherApi;

export default otherApi;
