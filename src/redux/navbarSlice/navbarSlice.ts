import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchModal: false,
    searchPeople: "",
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
    },
    // extraReducers: (builder) => {},
});

export const { setSearchModal, setSearchPeople } = navbarSlice.actions;

export default navbarSlice.reducer;
