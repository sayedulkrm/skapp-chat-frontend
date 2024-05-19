import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../components/Pages/Chat/MessageComponents/Features/Feature";
import { NEW_MESSAGE_ALEART } from "../../components/Constants/events";

const initialState = {
    // Attachment
    openAttachmentDialogBox: false,

    attachmentLoader: false,

    // =================

    userInputText: "",

    // Group

    openConfirmDeleteGroupBox: false,

    openAddMembersBox: false,

    // New Message Aleart
    newMessageAlert:
        getOrSaveFromStorage({ key: NEW_MESSAGE_ALEART, get: true }) ||
        <
            | {
                  chatId: string;
                  count: number;
              }
            | any
        >[],
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setOpenAttachmentDialogBox: (state, action) => {
            state.openAttachmentDialogBox = action.payload;
        },

        setAttachmentLoader: (state, action) => {
            state.attachmentLoader = action.payload;
        },
        // ========================

        setUserInputText: (state, action) => {
            state.userInputText = action.payload;
        },

        setOpenConfirmDeleteGroupBox: (state, action) => {
            state.openConfirmDeleteGroupBox = action.payload;
        },

        setOpenAddMembersBox: (state, action) => {
            state.openAddMembersBox = action.payload;
        },

        // New Message Aleart
        setNewMessageAlert: (state, action) => {
            const index = state.newMessageAlert.findIndex((item: any) => {
                return item.chatId === action.payload.chatId;
            });

            console.log("INDEX FROM REDUCER", index);

            if (index !== -1) {
                state.newMessageAlert[index].count += 1;
            } else {
                state.newMessageAlert.push({
                    chatId: action.payload.chatId,
                    count: 1,
                });
            }
        },

        removeNewMessageAlert: (state, action) => {
            state.newMessageAlert = state.newMessageAlert.filter(
                (item: any) => item.chatId !== action.payload
            );
        },
    },
});

export const {
    setOpenAttachmentDialogBox,
    setUserInputText,
    setOpenAddMembersBox,
    setOpenConfirmDeleteGroupBox,
    setAttachmentLoader,
    setNewMessageAlert,
    removeNewMessageAlert,
} = chatSlice.actions;

export default chatSlice.reducer;
