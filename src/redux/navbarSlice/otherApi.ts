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

        // get notification
        getNotifications: builder.query({
            query: () => ({
                url: "/user/notifications",
                method: "GET",
                credentials: "include",
            }),

            keepUnusedDataFor: 0,
        }),

        // Accept request
        acceptFriendRequest: builder.mutation({
            query: (data) => ({
                url: "/user/acceptrequest",
                method: "PUT",
                credentials: "include",
                body: data,
            }),

            invalidatesTags: ["Chat"],
        }),
    }),
});

export const {
    useLazySearchUserQuery,
    useSendFriendRequestMutation,
    useGetNotificationsQuery,
    useAcceptFriendRequestMutation,
} = otherApi;

export default otherApi;
