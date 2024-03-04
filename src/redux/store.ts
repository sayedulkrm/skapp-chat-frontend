import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice/authSlice";
import navbarSliceReducer from "./navbarSlice/navbarSlice";
import chatSliceReducer from "./chatSlice/chatSlice";

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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
