/**
 * Checks if a card can be played at the first move
 */
export const checkAllowAtFirst = (card, firstCard) => {
    return (
        card._const === +firstCard[0] ||
        card._const === +firstCard[1] ||
        card.count === +firstCard[0] ||
        card.count === +firstCard[1]
    );
};

/**
 * Checks if a card can be played based on left and right cards on the board
 */
export const checkAllowThen = (card, leftCard, rightCard) => {
    return (
        card._const === +leftCard[1] ||
        card._const === +rightCard[0] ||
        card.count === +leftCard[1] ||
        card.count === +rightCard[0]
    );
};

/**
 * Gets the allowed numbers that can be played based on played cards
 */
export const getAllowedNumbers = (playedCards) => {
    if (playedCards.length === 0) return [];

    if (playedCards.length === 1) {
        const card = playedCards[0].key.split("-");
        return [+card[0], +card[1]];
    }

    const leftCard = playedCards[0].key.split("-");
    const rightCard = playedCards[playedCards.length - 1].key.split("-");
    return [+leftCard[1], +rightCard[0]];
};

/**
 * Checks if a player has a playable card
 */
export const playerHasPlayableCard = (playerCards, playedCards) => {
    if (playedCards.length === 0) return true;

    if (playedCards.length === 1) {
        const card = playedCards[0].key.split("-");
        return playerCards.some(p => checkAllowAtFirst(p, card));
    }

    const leftCard = playedCards[0].key.split("-");
    const rightCard = playedCards[playedCards.length - 1].key.split("-");
    return playerCards.some(p => checkAllowThen(p, leftCard, rightCard));
};

/**
 * Determines if there are any playable cards in remaining deck
 */
export const deckHasPlayableCards = (remainingCards, allowedNums) => {
    return remainingCards.some(
        card => allowedNums.includes(card._const) || allowedNums.includes(card.count)
    );
};

/**
 * Creates a formatted card object from key
 */
export const createCardFromKey = (key) => {
    const parts = key.split("-");
    return {
        _const: parts[0],
        count: parts[1],
        key: key
    };
};

/**
 * Creates a reversed card object
 */
export const createReversedCard = (card) => {
    return {
        _const: card.count,
        count: card._const,
        key: card.key.split("-").reverse().join("-")
    };
};

/**
 * Determines where to insert card (left or right)
 */
export const determineCardPlacement = (card, playedCards, allowedNums) => {
    const newCard = createCardFromKey(card.key);
    const newCardReversed = createReversedCard(newCard);

    if (playedCards.length === 0) {
        return { position: 'right', card: newCard };
    }

    // Special case when card can be placed on both sides
    if (
        allowedNums.includes(+newCard._const) &&
        allowedNums.includes(+newCard.count) &&
        newCard._const !== newCard.count &&
        allowedNums[0] !== allowedNums[1]
    ) {
        return { position: 'both', card: newCard, reversedCard: newCardReversed };
    }

    // Check left placement
    if (playedCards[0].count === newCard._const) {
        return { position: 'left', card: newCard };
    }

    if (playedCards[0].count === newCard.count) {
        return { position: 'left', card: newCardReversed };
    }

    // Check right placement
    if (playedCards[playedCards.length - 1]._const === newCard._const) {
        return { position: 'right', card: newCardReversed };
    }

    if (playedCards[playedCards.length - 1]._const === newCard.count) {
        return { position: 'right', card: newCard };
    }

    return null; // Card cannot be played
};

/**
 * Checks if the game has ended
 */
export const checkGameStatus = (player1Cards, player2Cards, playedCards) => {
    if (playedCards.length === 0) {
        return { gameEnded: false };
    }

    if (player1Cards.length === 0) {
        return { gameEnded: true, winner: "Player 1" };
    }

    if (player2Cards.length === 0) {
        return { gameEnded: true, winner: "Player 2" };
    }

    return { gameEnded: false };
};

/**
 * Check if game is deadlocked (no player can make a move)
 */
export const isGameDeadlocked = (p1CanPlay, p2CanPlay, deckHasCards) => {
    return !p1CanPlay && !p2CanPlay && !deckHasCards;
};

/**
 * Removes a card from player's hand
 */
export const removeCardFromHand = (playerCards, index) => {
    const newCards = [...playerCards];
    newCards.splice(index, 1);
    return newCards;
};

/**
 * Draws a card from the deck
 */
export const drawCard = (playerCards, deck, startIndex) => {
    if (startIndex >= deck.length) {
        return { playerCards, startIndex };
    }

    return {
        playerCards: [...playerCards, deck[startIndex]],
        startIndex: startIndex + 1
    };
};