import { createSlice } from "@reduxjs/toolkit";

//Interfaces
import { filmsDiscoverInterface } from "../interfaceFilms";


export const filmDiscoverSlice = createSlice({
    name: "filmDiscoverSlice",
    initialState: [] as filmsDiscoverInterface[],
    reducers: {
        handleInitialState(state, action) {
            console.log(state)
            return action.payload;
        },
    },
});

export const { handleInitialState } = filmDiscoverSlice.actions;

export default {
    filmDiscoverSlice: filmDiscoverSlice.reducer
}

