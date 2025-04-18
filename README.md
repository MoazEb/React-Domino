# Domino Game - React Implementation

## Overview

This project is a digital implementation of the classic domino game built with React and Redux. Players take turns placing compatible domino tiles, trying to be the first to use all their tiles. The game supports two players on the same device with an intuitive drag-and-drop interface.

## Features

-   Real-time game board updates
-   Animated card movements and transitions
-   Turn-based gameplay with player indicators
-   Draw pile for when players can't make a move
-   Win/loss detection and end-game screens
-   Responsive design that works on tablets and desktops

## Technical Structure

### Core Components

-   Home.js: Main game component that manages the game state and UI
-   gameLogic.js: Utility file containing game logic functions
-   CardLayout.js: Component for rendering individual domino tiles
-   Winner.js and Draw.js: End-game screens
-   Redux store: Manages game state and card initialization

## Game Logic Functions

The game logic is separated into reusable functions in gameLogic.js:

-   checkAllowAtFirst(): Validates first move playability
-   checkAllowThen(): Checks if a card can be played based on board state
-   getAllowedNumbers(): Determines which numbers are playable
-   playerHasPlayableCard(): Checks if player has valid moves
-   determineCardPlacement(): Calculates where a card can be placed
-   checkGameStatus(): Determines if game has ended
-   isGameDeadlocked(): Checks if no more moves are possible
-   removeCardFromHand(): Removes played card from player's hand
-   drawCard(): Handles drawing cards from the deck

## How To Play

1. Players start with 7 cards each
2. Player 1 goes first
3. Players take turns placing compatible dominoes
4. If a player can't make a move, they must draw from the pile
5. First player to use all their dominoes wins
6. If neither player can make a move and the draw pile is empty, the game ends in a draw

## Installation and Setup

1. Clone the repository: `git clone https://github.com/yourusername/domino-game.git`
2. Install dependencies: `cd domino-game` and `npm install`
3. Start the development server: `npm start`
4. Open your browser to `http://localhost:3000`

## Technologies Used

-   React for UI components
-   Redux for state management
-   Framer Motion for animations
-   CSS for styling

## Future Improvements

-   Add online multiplayer support
-   Implement AI opponent option
-   Add customizable game rules
-   Create mobile-friendly version
-   Add sound effects and music
-   Implement user profiles and statistics

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
