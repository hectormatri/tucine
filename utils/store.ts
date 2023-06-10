import { configureStore } from "@reduxjs/toolkit";
import modelSlice from "./modelSlice";

// store.ts

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


export const store = configureStore({
    reducer: {
        filmsDiscover: modelSlice.filmDiscoverSlice,
        infoMovie: modelSlice.infoMovie,
        trailerMovie: modelSlice.trailerMovie,
        movieFound: modelSlice.movieFound,
    }
})