import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // Attachment
    openAttachmentDialogBox: false,

    userInputText: "",
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
    },
});

export const { setOpenAttachmentDialogBox, setUserInputText } =
    chatSlice.actions;

export default chatSlice.reducer;
