import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Attachment
    openAttachmentDialogBox: false,

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
} = chatSlice.actions;

export default chatSlice.reducer;
