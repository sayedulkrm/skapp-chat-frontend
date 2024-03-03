import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // search   =====================

    searchModal: false,
    searchPeople: "",

    // Notifications =================
    notificationModal: false,

    // Profile

    // New Group =================================
    newGroupModal: false,
    newGroupPeoples: [],
    newGroupName: "",
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

        // New Group =================================

        setNewGroupModal: (state, action) => {
            state.newGroupModal = action.payload;
        },

        setNewGroupPeoples: (state, action) => {
            state.newGroupPeoples = action.payload;
        },

        setGroupName: (state, action) => {
            state.newGroupName = action.payload;
        },
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
} = navbarSlice.actions;

export default navbarSlice.reducer;
