import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Attachment
    openAttachmentDialogBox: false,

    attachmentLoader: false,

    // =================

    userInputText: "",

    // Group

    openConfirmDeleteGroupBox: false,

    openAddMembersBox: false,
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
    },
});

export const {
    setOpenAttachmentDialogBox,
    setUserInputText,
    setOpenAddMembersBox,
    setOpenConfirmDeleteGroupBox,
    setAttachmentLoader,
} = chatSlice.actions;

export default chatSlice.reducer;
