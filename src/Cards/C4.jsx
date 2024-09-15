import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeCards } from '../redux/slides/allCards'
import { motion, AnimatePresence } from 'framer-motion'
import CardLayout from './CardLayout'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const C2 = () => {
    // ... (keep existing state and useEffect hooks)

    const [dropZone, setDropZone] = useState(null);

    const onDragStart = (start) => {
        const { source } = start;
        const player = source.droppableId;
        const cardIndex = source.index;

        if ((player === 'player1' && role) || (player === 'player2' && !role)) {
            const card = player === 'player1' ? player_1_cards[cardIndex] : player_2_cards[cardIndex];
            if (isValidMove(card)) {
                setDropZone(getDropZonePosition(card));
            }
        }
    };

    const onDragEnd = (result) => {
        setDropZone(null);
        if (!result.destination) return;

        const { source, destination } = result;
        const player = source.droppableId;
        const cardIndex = source.index;

        if ((player === 'player1' && role && destination.droppableId === 'playArea') ||
            (player === 'player2' && !role && destination.droppableId === 'playArea')) {
            const card = player === 'player1' ? player_1_cards[cardIndex] : player_2_cards[cardIndex];
            if (isValidMove(card)) {
                handleRole(card.key, cardIndex, player === 'player1' ? 'p1' : 'p2');
            }
        }
    };

    const isValidMove = (card) => {
        if (playedCards.length === 0) return true;
        const leftCard = playedCards[0];
        const rightCard = playedCards[playedCards.length - 1];
        return card._const === leftCard._const || card.count === leftCard._const ||
            card._const === rightCard.count || card.count === rightCard.count;
    };

    const getDropZonePosition = (card) => {
        if (playedCards.length === 0) return 'center';
        const leftCard = playedCards[0];
        const rightCard = playedCards[playedCards.length - 1];
        if (card._const === leftCard._const || card.count === leftCard._const) return 'left';
        if (card._const === rightCard.count || card.count === rightCard.count) return 'right';
        return null;
    };

    // ... (keep existing functions)

    return (
        <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <div className={`relative flex h-screen w-full items-center justify-center flex-wrap`}>
                <Droppable droppableId="player1" direction="horizontal">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`absolute top-0 left-1/2 ${role ? 'flex' : 'hidden'} transform -translate-x-1/2 flex-row flex-wrap items-center justify-center`}
                        >
                            <AnimatePresence>
                                {player_1_cards.map((p1, index) => (
                                    <Draggable key={p1.key} draggableId={p1.key} index={index}>
                                        {(provided) => (
                                            <motion.div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <CardLayout
                                                    _const={p1._const}
                                                    count={p1.count}
                                                    player={'p1'}
                                                    disabled={!isValidMove(p1)}
                                                />
                                            </motion.div>
                                        )}
                                    </Draggable>
                                ))}
                            </AnimatePresence>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="playArea" direction="horizontal">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className='flex max-w-5xl flex-wrap relative'
                        >
                            <AnimatePresence>
                                {playedCards.map((card, index) => (
                                    <motion.div
                                        key={card.key}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <CardLayout _const={+card._const} count={+card.count} r={true} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {dropZone && (
                                <div className={`absolute ${dropZone === 'left' ? 'left-0' : dropZone === 'right' ? 'right-0' : 'left-1/2 transform -translate-x-1/2'} top-1/2 transform -translate-y-1/2 w-12 h-24 border-2 border-dashed border-gray-400 rounded-md`}></div>
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="player2" direction="horizontal">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={`absolute bottom-0 left-1/2 ${role ? 'hidden' : 'flex'} transform -translate-x-1/2 flex-row flex-wrap items-center justify-center`}
                        >
                            <AnimatePresence>
                                {player_2_cards.map((p1, index) => (
                                    <Draggable key={p1.key} draggableId={p1.key} index={index}>
                                        {(provided) => (
                                            <motion.div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <CardLayout
                                                    _const={p1._const}
                                                    count={p1.count}
                                                    player={'p2'}
                                                    disabled={!isValidMove(p1)}
                                                />
                                            </motion.div>
                                        )}
                                    </Draggable>
                                ))}
                            </AnimatePresence>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <motion.div
                    className={`absolute left-0 top-0 flex flex-col ${(disableOrNot()) ? 'pointer-events-none cursor-not-allowed bg-orange-500' : ''}  h-full overflow-y-auto`}
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
                                    disabled={((player_1_have) || (player_2_have))}
                                    _const={card._const}
                                    count={card.count}
                                    r={true}
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </DragDropContext>
    )
}

export default C2