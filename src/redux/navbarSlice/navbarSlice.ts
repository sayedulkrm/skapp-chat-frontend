import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // search   =====================

    searchModal: false,
    searchPeople: "",

    // Notifications =================
    notificationModal: false,
    notificationCount: 0,

    // Profile

    // New Group =================================
    newGroupModal: false,
    newGroupPeoples: [] as any[],
    newGroupName: "",

    // is File Menu =================================================

    isFileMenu: false,
    isDeleteMenu: false,
    uploadingLoader: false,
    seletectedDeleteChat: {
        chatId: "",
        groupChat: false,
    },
};

const navbarSlice = createSlice({
    name: "navbar",
    initialState,
    reducers: {
        setSearchModal: (state, action) => {
            state.searchModal = action.payload;
        },

        setSearchPeople: (state, action) => {
            state.searchPeople = action.payload;
        },

        // Notification modal =================

        setNotificationModal: (state, action) => {
            state.notificationModal = action.payload;
        },

        setNotificationCount: (state, action) => {
            state.notificationCount = action.payload;
        },

        // New Group =================================

        setNewGroupModal: (state, action) => {
            state.newGroupModal = action.payload;
        },

        setNewGroupPeoples: (state, action) => {
            // state.newGroupPeoples = action.payload;

            const existingIndex = state.newGroupPeoples.findIndex(
                (member) => member._id === action.payload._id
            );
            if (existingIndex !== -1) {
                // If already selected, remove from array
                state.newGroupPeoples.splice(existingIndex, 1);
            } else {
                // If not selected, add to array
                state.newGroupPeoples.push(action.payload);
            }
        },

        setGroupName: (state, action) => {
            state.newGroupName = action.payload;
        },

        setIsFileMenu: (state, action) => {
            state.isFileMenu = action.payload;
        },
        setIsDeleteMenu: (state, action) => {
            state.isDeleteMenu = action.payload;
        },
        setUploadingLoader: (state, action) => {
            state.uploadingLoader = action.payload;
        },
        setSeletectedDeleteChat: (state, action) => {},
    },
    // extraReducers: (builder) => {},
});

export const {
    setSearchModal,
    setSearchPeople,
    setNotificationModal,
    setNewGroupModal,
    setNewGroupPeoples,
    setGroupName,
    setIsDeleteMenu,
    setIsFileMenu,
    setSeletectedDeleteChat,
    setUploadingLoader,
    setNotificationCount,
} = navbarSlice.actions;

export default navbarSlice.reducer;
