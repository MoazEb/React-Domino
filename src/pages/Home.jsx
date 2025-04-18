import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { initializeCards } from "../redux/slides/allCards";
import { motion, AnimatePresence } from "framer-motion";
import CardLayout from "../components/CardLayout";
import Draw from "../pages/Draw";
import Winner from "../pages/Winner";
import UnsupportedScreen from "./UnsupportedScreen";
import * as gameLogic from "../utils/gameLogic";

const Home = () => {
    const dispatch = useDispatch();
    const [role, setRole] = useState(true);
    const Cards = useSelector((state) => state.allCards.cards);
    const [player_1_cards, Set_player1_cards] = useState(Cards.slice(0, 7));
    const [player_2_cards, Set_player2_cards] = useState(Cards.slice(7, 14));
    const [remainingStart, setRemainingStart] = useState(14);
    const [playedCards, setPlayedCards] = useState([]);
    const [allowedNums, setAllowedNums] = useState([]);
    const [player_1_have, setPlayer_1_have] = useState(true);
    const [player_2_have, setPlayer_2_have] = useState(true);
    const [p_1_have, setP_1_have] = useState(true);
    const [p_2_have, setP_2_have] = useState(true);
    const [matchEnded, setMatchEnded] = useState(false);

    useEffect(() => {
        dispatch(initializeCards());
    }, [dispatch]);

    useEffect(() => {
        Set_player1_cards(Cards.slice(0, 7));
        Set_player2_cards(Cards.slice(7, 14));
    }, [Cards]);

    useEffect(() => {
        checkWinner();
        HandleAllowedPlay();
    }, [playedCards, player_1_cards, player_2_cards]);

    const checkWinner = () => {
        if (playedCards.length > 1) {
            const allowedNumbers = gameLogic.getAllowedNumbers(playedCards);
            setAllowedNums(allowedNumbers);

            // Check if player 1 has playable cards
            let phave1 = gameLogic.playerHasPlayableCard(player_1_cards, playedCards);
            setP_1_have(phave1);

            // Check if player 2 has playable cards
            let phave2 = gameLogic.playerHasPlayableCard(player_2_cards, playedCards);
            setP_2_have(phave2);

            // Check if game is deadlocked
            if (!phave1 && !phave2) {
                const remainingCards = Cards.slice(remainingStart, 28);
                const deckHasPlayable = gameLogic.deckHasPlayableCards(remainingCards, allowedNumbers);

                if (!deckHasPlayable) {
                    setMatchEnded(true);
                    return;
                }
            }

            // Handle player turn skipping if they don't have playable cards
            if (remainingStart >= 28) {
                if (role && !phave1) {
                    setRole((prev) => !prev);
                    console.log("executed 27 first");
                    return;
                } else if (!role && !phave2) {
                    setRole((prev) => !prev);
                    console.log("executed 27 middle");
                    return;
                } else if (!phave1 && !phave2) {
                    checkWinner();
                    console.log("executed 27 end");
                    return;
                }
                console.log("executed 27 finally");
            }
        }

        // Check win conditions
        const gameStatus = gameLogic.checkGameStatus(player_1_cards, player_2_cards, playedCards);
        if (gameStatus.gameEnded) {
            setMatchEnded(true);
            return;
        }
    };

    const HandleAllowedPlay = () => {
        if (playedCards.length === 1) {
            const allowedNumbers = gameLogic.getAllowedNumbers(playedCards);
            setAllowedNums(allowedNumbers);

            // Check if player 1 has playable cards
            let have1 = gameLogic.playerHasPlayableCard(player_1_cards, playedCards);
            if (!have1 && role) {
                alert("player 1 please swipe a Card");
                setPlayer_1_have(have1);
            }

            // Check if player 2 has playable cards
            let have2 = gameLogic.playerHasPlayableCard(player_2_cards, playedCards);
            if (!have2 && !role) {
                setPlayer_2_have(have2);
            }
        } else if (playedCards.length > 1) {
            const allowedNumbers = gameLogic.getAllowedNumbers(playedCards);
            setAllowedNums(allowedNumbers);

            // Check if player 1 has playable cards
            let have1 = gameLogic.playerHasPlayableCard(player_1_cards, playedCards);
            if (!have1 && role) {
                setPlayer_1_have(have1);
            }

            // Check if player 2 has playable cards
            let have2 = gameLogic.playerHasPlayableCard(player_2_cards, playedCards);
            if (!have2 && !role) {
                setPlayer_2_have(have2);
            }
        }
    };

    const insertRight = (card) => {
        setPlayedCards([...playedCards, card]);
    };

    const insertLeft = (card) => {
        setPlayedCards([card, ...playedCards]);
    };

    const handleRemoving = (player, idx) => {
        const updatedCards = gameLogic.removeCardFromHand(player === "p1" ? player_1_cards : player_2_cards, idx);
        player === "p1" ? Set_player1_cards(updatedCards) : Set_player2_cards(updatedCards);
    };

    const handleInsertSimilar = (newCard, newCardReversed) => {
        const userInput = prompt("Please enter L to play, R to play right:");
        if (userInput.toLowerCase() === "l" && playedCards[0].count === newCard._const) insertLeft(newCard);
        else if (userInput.toLowerCase() === "l" && playedCards[0].count === newCard.count) insertLeft(newCardReversed);
        else if (userInput.toLowerCase() === "r" && playedCards[playedCards.length - 1].count === newCard._const)
            insertRight(newCard);
        else insertRight(newCardReversed);
    };

    const insertToPlayedCards = (k) => {
        // Use gameLogic to determine card placement
        const card = { key: k };
        const placement = gameLogic.determineCardPlacement(card, playedCards, allowedNums);

        if (!placement) return;

        if (placement.position === "right") {
            insertRight(placement.card);
        } else if (placement.position === "left") {
            insertLeft(placement.card);
        } else if (placement.position === "both") {
            handleInsertSimilar(placement.card, placement.reversedCard);
        }
    };

    const handleRole = (k, idx, player) => {
        setRole((prv) => !prv);
        insertToPlayedCards(k);
        handleRemoving(player, idx);
    };

    const handleSwipe = () => {
        if (remainingStart >= 28) return;

        if (role) {
            const { playerCards, startIndex } = gameLogic.drawCard(player_1_cards, Cards, remainingStart);
            Set_player1_cards(playerCards);
            setRemainingStart(startIndex);
            console.log(player_1_have);
            setPlayer_1_have((prv) => !prv);
        } else {
            const { playerCards, startIndex } = gameLogic.drawCard(player_2_cards, Cards, remainingStart);
            Set_player2_cards(playerCards);
            setRemainingStart(startIndex);
            console.log(player_2_have);
            setPlayer_2_have((prv) => !prv);
        }
    };

    const disableOrNot = () => {
        if (!player_1_have) {
            return false;
        } else if (!player_2_have) {
            return false;
        }
        return true;
    };

    return (
        <>
            {!matchEnded && (
                <>
                    <UnsupportedScreen />

                    <div className={`relative hidden sm:flex h-screen w-full items-center justify-center flex-wrap`}>
                        <div
                            className={`absolute top-0 left-1/2 ${
                                role ? "flex" : "hidden"
                            } transform -translate-x-1/2 flex-row flex-wrap items-center justify-center`}
                        >
                            <AnimatePresence>
                                {player_1_cards.map((p, index) => (
                                    <motion.div
                                        key={p.key}
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 20 }}
                                        transition={{ duration: 0.5 }}
                                        onClick={() =>
                                            playedCards.length > 0 &&
                                            !(allowedNums.includes(p.count) || allowedNums.includes(p._const))
                                                ? null
                                                : handleRole(p.key, index, "p1")
                                        }
                                    >
                                        <CardLayout
                                            _const={p._const}
                                            count={p.count}
                                            player={"p1"}
                                            disabled={
                                                playedCards.length > 0 &&
                                                !(allowedNums.includes(p.count) || allowedNums.includes(p._const))
                                            }
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        <motion.div className="flex max-w-5xl flex-wrap gap-y-4 justify-start">
                            <AnimatePresence>
                                {playedCards.map((card, index) => (
                                    <motion.div
                                        key={card.key}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CardLayout _const={+card._const} count={+card.count} r={true} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        <div
                            className={`absolute bottom-0 left-1/2 ${
                                role ? "hidden" : "flex"
                            } transform -translate-x-1/2 flex-row flex-wrap items-center justify-center`}
                        >
                            <AnimatePresence>
                                {player_2_cards.map((p, index) => (
                                    <motion.div
                                        key={p.key}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() =>
                                            playedCards.length > 0 &&
                                            !(allowedNums.includes(p.count) || allowedNums.includes(p._const))
                                                ? null
                                                : handleRole(p.key, index, "p2")
                                        }
                                    >
                                        <CardLayout
                                            _const={p._const}
                                            count={p.count}
                                            player={"p2"}
                                            disabled={
                                                playedCards.length > 0 &&
                                                !(allowedNums.includes(p.count) || allowedNums.includes(p._const))
                                            }
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* pull cards */}
                        <motion.div
                            className={`absolute left-0 top-0 flex flex-col ${
                                disableOrNot() ? "pointer-events-none cursor-not-allowed bg-slate-200" : ""
                            }  h-full overflow-y-auto`}
                            onClick={handleSwipe}
                        >
                            <AnimatePresence>
                                {Cards.slice(remainingStart, 28).map((card) => (
                                    <motion.div
                                        key={card.key}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CardLayout
                                            disabled={(player_1_have || player_2_have) && disableOrNot()}
                                            // _const={card._const}
                                            // count={card.count}
                                            isCenterLine={false}
                                            r={true} // r => rotated
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </>
            )}
            {matchEnded && (player_1_cards.length === 0 || player_2_cards.length === 0) && (
                <Winner player={player_1_cards.length === 0 ? "Player 1" : "Player 2"} />
            )}
            {matchEnded && player_1_cards.length > 0 && player_2_cards.length > 0 && <Draw />}
        </>
    );
};

export default Home;
