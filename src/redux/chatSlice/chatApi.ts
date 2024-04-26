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
                console.log("Page number", page);
                return {
                    url: `/chat/message/${chatId}?page=${page}`,
                    credentials: "include",
                };
            },

            providesTags: ["Message"],
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
    }),
});

export const {
    useChatDetailsQuery,
    useGetOldMessagesQuery,
    useSendAttachmentsMutation,
} = chatApi;

export default chatApi;
