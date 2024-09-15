import { configureStore } from "@reduxjs/toolkit";
import allCardsReducer from "./slides/allCards";

const store = configureStore({
    reducer: {
        allCards: allCardsReducer,
    },
});

export default store;