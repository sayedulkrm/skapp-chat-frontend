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
    }),
});

export const { useLazySearchUserQuery } = otherApi;

export default otherApi;
