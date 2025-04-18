import { createSlice } from "@reduxjs/toolkit";
import CardLayout from "../../components/CardLayout";

const allCardsSlice = createSlice({
    name: "allCards",
    initialState: {
        cards: [],
        player1_avialabe: 0,
        player2_avialabe: 0,
    },
    reducers: {
        initializeCards: (state) => {
            const newCards = [];
            for (let j = 0; j < 7; j++) {
                for (let i = 0; i < 7 - j; i++) {
                    newCards.push({ count: i + j, _const: j, key: `${j}-${i + j}` });
                }
            }

            // Fisher-Yates shuffle
            for (let i = newCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
            }

            state.cards = newCards;
        },
        addToPlayer1: (state) => {
            state.player1_avialabe++;
            console.log("player1:::");
            console.log(state.player1_avialabe);
        },
        addToPlayer2: (state) => {
            state.player2_avialabe++;
            console.log("player2:::");
            console.log(state.player2_avialabe);
        },
    },
});

export const { initializeCards, addToPlayer1, addToPlayer2 } = allCardsSlice.actions;
export default allCardsSlice.reducer;
