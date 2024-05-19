import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import authSliceReducer from "./authSlice/authSlice";
import chatSliceReducer from "./chatSlice/chatSlice";
import navbarSliceReducer from "./navbarSlice/navbarSlice";

const store = configureStore({
    reducer: {
        // Login, Register etc
        auth: authSliceReducer,
        // Auth navbar
        navbar: navbarSliceReducer,

        // Chat, Attachments etc

        chat: chatSliceReducer,

        // RTK QUERRY
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

// will call auth fun here

const initializeStore = async () => {
    // await store.dispatch(updateUserToken());
    // await store.dispatch(googleAuth());
    // await store.dispatch(getUserProfile());

    await store.dispatch(
        apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
    );

    await store.dispatch(
        apiSlice.endpoints.googleAuth.initiate({}, { forceRefetch: true })
    );
    await store.dispatch(
        apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
    );
};

initializeStore();
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
