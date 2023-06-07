import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { filmsDiscoverInterface } from "../interfaceFilms";
import { infoMovieInterface } from "../interfaceFilms";

export const filmDiscoverSlice = createSlice({
    name: "filmDiscoverSlice",
    initialState: [] as filmsDiscoverInterface[],
    reducers: {
        handleInitialStateFilms(state, action) {
            console.log(state)
            return action.payload;
        },
    },
});

export const infoMovie = createSlice({
    name: "infoMovie",
    initialState: {} as infoMovieInterface,
    reducers: {
        handleInitialStateInfoMovie(state, action) {
            console.log(state)
            return action.payload;
        },
    },
});

export const { handleInitialStateFilms } = filmDiscoverSlice.actions;
export const { handleInitialStateInfoMovie } = infoMovie.actions;

export default {
    filmDiscoverSlice: filmDiscoverSlice.reducer,
    infoMovie: infoMovie.reducer,
}

