import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./authSlice/authSlice";
import navbarSliceReducer from "./navbarSlice/navbarSlice";

const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        navbar: navbarSliceReducer,
    },
});

// will call auth fun here

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
