import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice/authSlice";
import navbarSliceReducer from "./navbarSlice/navbarSlice";
import chatSliceReducer from "./chatSlice/chatSlice";
import { googleAuth } from "./authSlice/authReducers";

const store = configureStore({
    reducer: {
        // Login, Register etc
        auth: authSliceReducer,
        // Auth navbar
        navbar: navbarSliceReducer,

        // Chat, Attachments etc

        chat: chatSliceReducer,
    },
});

// will call auth fun here

const initializeStore = async () => {
    await store.dispatch(googleAuth());
};

initializeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
