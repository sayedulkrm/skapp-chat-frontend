import apiSlice from "../api/apiSlice";

const chatApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // get chatDetails
        chatDetails: builder.query({
            query: ({ chatId, populate = false }) => {
                let url = `/chat/${chatId}`;

                if (populate) url += "?populate=true";

                return {
                    url,
                    method: "GET",
                    credentials: "include",
                };
            },

            providesTags: ["Chat"],
        }),

        // get message
        getOldMessages: builder.query({
            query: ({ chatId, page }) => {
                console.log("Heyyyy Its chat id", chatId);
                return {
                    url: `/chat/message/${chatId}?page=${page}`,
                    credentials: "include",
                };
            },

            // providesTags: ["Message"],
            keepUnusedDataFor: 0,
        }),

        // send attachments

        sendAttachments: builder.mutation({
            query: (data) => ({
                url: "/chat/message",
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),

        // send attachments

        newGroup: builder.mutation({
            query: ({ name, members }) => {
                console.log("AM from RTK", name, members);

                return {
                    url: "/chat/new/group-chat",
                    method: "POST",
                    credentials: "include",
                    body: { name, members },
                };
            },

            invalidatesTags: ["Chat"],
        }),
    }),
});

export const {
    useChatDetailsQuery,
    useGetOldMessagesQuery,
    useSendAttachmentsMutation,
    useNewGroupMutation,
} = chatApi;

export default chatApi;
