import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeCards } from '../redux/slides/allCards'
import { motion } from 'framer-motion'
import CardLayout from './CardLayout'
import { div } from 'framer-motion/client'
const C2 = () => {
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
    useEffect(() => {
        dispatch(initializeCards())
    }, [dispatch])

    useEffect(() => {
        Set_player1_cards(Cards.slice(0, 7));
        Set_player2_cards(Cards.slice(7, 14));
    }, [Cards])

    useEffect(() => {
        checkWinner();
        HandleAllowedPlay();
    }, [playedCards, player_1_cards, player_2_cards])

    const checkWinner = () => {

        if (playedCards.length > 1) {
            const leftCard = playedCards[0].key.split("-");
            const rightCard = playedCards[playedCards.length - 1].key.split("-");
            setAllowedNums([+leftCard[1], +rightCard[0]])

            // handle have allowd cards or not
            let phave1 = player_1_cards.some(p1 => checkAllowThen(p1, leftCard, rightCard));
            setP_1_have(phave1);


            let phave2 = player_2_cards.some(p1 => checkAllowThen(p1, leftCard, rightCard));
            setP_2_have(phave2);

            if (!phave1 && !phave2) {
                const foundCards = Cards.slice(remainingStart, 28).some((card) =>
                    allowedNums.includes(card._const) || allowedNums.includes(card.count)
                );
                if (!foundCards) {
                    alert('It\'s a draw!');
                    return true;
                }
            }

            if (remainingStart >= 28) {
                if (role && !phave1) {
                    setRole(prev => !prev);
                    console.log('executed 27 first');
                    return;
                } else if (!role && !phave2) {
                    setRole(prev => !prev);
                    console.log('executed 27 middle');
                    return;
                }
                else if (!phave1 && !phave2) {
                    checkWinner();
                    console.log('executed 27 end');
                    return;
                }
                console.log('executed 27 finally');
            }
        }
        // //////////////////////////////////////


        if (player_1_cards.length === 0 && playedCards.length > 0) {
            alert('Player 1 has won!');
            return true;
        } else if (player_2_cards.length === 0 && playedCards.length > 0) {
            alert('Player 2 has won!');
            return true;
        }
        return false;
    }
    const checkAllowAtFirst = (p1, card) => {
        return (p1._const === +card[0] || p1._const === +card[1] || p1.count === +card[0] || p1.count === +card[1])
    }
    const checkAllowThen = (p1, leftCard, rightCard) => {
        return (p1._const === +leftCard[1] || p1._const === +rightCard[0] || p1.count === +leftCard[1] || p1.count === +rightCard[0])
    }
    const HandleAllowedPlay = () => {
        if (playedCards.length === 1) {
            const card = playedCards[0].key.split("-");
            setAllowedNums([+card[0], +card[1]])

            let have1 = player_1_cards.some((p) => checkAllowAtFirst(p, card))
            if (!have1 && role) {
                alert('player 1 please swipe a Card')
                setPlayer_1_have(have1)
            }

            let have2 = player_2_cards.some((p) => checkAllowAtFirst(p, card))
            if (!have2 && !role) {
                setPlayer_2_have(have2);
            }
        }
        else if (playedCards.length > 1) {
            const leftCard = playedCards[0].key.split("-");
            const rightCard = playedCards[playedCards.length - 1].key.split("-");
            setAllowedNums([+leftCard[1], +rightCard[0]])

            // handle have allowd cards or not
            let have1 = player_1_cards.some(p1 => checkAllowThen(p1, leftCard, rightCard));
            if (!have1 && role) {
                setPlayer_1_have(have1);
            }

            let have2 = player_2_cards.some(p1 => checkAllowThen(p1, leftCard, rightCard));
            if (!have2 && !role) {
                setPlayer_2_have(have2);
            }
        }
    }
    const handleRole = (k, idx, player) => {



        setRole(prv => !prv);

        const parts = k.split("-");
        const newCard = { _const: parts[0], count: parts[1], key: k };
        const newArr = player === 'p1' ? [...player_1_cards] : [...player_2_cards];
        newArr.splice(idx, 1);
        if (playedCards.length === 0) setPlayedCards([...playedCards, newCard]);
        else {
            if (playedCards[0].count === newCard._const) {
                setPlayedCards([newCard, ...playedCards]);
            }
            else if (playedCards[0].count === newCard.count) {
                const newCardReversed = { _const: parts[1], count: parts[0], key: k.split("").reverse().join("") };
                setPlayedCards([newCardReversed, ...playedCards]);
            }
            else if (playedCards[playedCards.length - 1]._const === newCard._const) {

                const newCardReversed = { _const: parts[1], count: parts[0], key: k.split("").reverse().join("") };
                setPlayedCards([...playedCards, newCardReversed]);

            }
            else if (playedCards[playedCards.length - 1]._const === newCard.count) {
                const newCard = { _const: parts[0], count: parts[1], key: k };
                setPlayedCards([...playedCards, newCard]);
            }
        }
        player === 'p1' ? Set_player1_cards(newArr) : Set_player2_cards(newArr);

    }
    const handleSwipe = () => {
        if (remainingStart >= 28) return
        if (role) {
            Set_player1_cards([...player_1_cards, Cards[remainingStart]]);
            console.log(player_1_have)
            setPlayer_1_have(prv => !prv)
        }
        else {
            Set_player2_cards([...player_2_cards, Cards[remainingStart]]);
            console.log(player_2_have)

            setPlayer_2_have(prv => !prv)
        }

        // HandleAllowedPlay();
        setRemainingStart(prv => prv + 1)

    }
    const disableOrNot = () => {
        if (!player_1_have) {
            return false
        } else if (!player_2_have) {
            return false
        }
        return true
    }
    return (
        <div className={`relative flex h-screen w-full    items-center justify-center flex-wrap`}>
            <div className={`absolute top-0 left-1/2 ${role ? 'flex' : 'hidden'} transform -translate-x-1/2 flex-row flex-wrap items-center justify-center`}>

                {player_1_cards.map((p1, index) => (
                    <div key={p1.key}
                        onClick={() => {
                            handleRole(p1.key, index, 'p1')
                        }}>
                        <CardLayout _const={p1._const} count={p1.count} player={'p1'} disabled={
                            p1._const === allowedNums[0] || p1._const === allowedNums[1]
                            || p1.count === allowedNums[0] || p1.count === allowedNums[1]
                        } />
                    </div>
                ))}

            </div>

            <div className='flex max-w-5xl flex-wrap '>
                {
                    playedCards.map((card) => (
                        // console.log(typeof card._const)
                        <div key={card.key}>
                            <CardLayout _const={+card._const} count={+card.count} r={true} />
                        </div>
                    ))
                }
            </div>
            <div className={`absolute bottom-0 left-1/2 ${role ? 'hidden' : 'flex'} transform -translate-x-1/2  flex-row flex-wrap items-center justify-center`}>
                {player_2_cards.map((p1, index) => (
                    <div key={p1.key}

                        onClick={() => {
                            handleRole(p1.key, index, 'p2')
                        }}>
                        <CardLayout _const={p1._const} count={p1.count} player={'p2'} disabled={
                            p1._const === allowedNums[0] || p1._const === allowedNums[1]
                            || p1.count === allowedNums[0] || p1.count === allowedNums[1]
                        } />
                    </div>
                ))}
            </div>
            <div className={`absolute left-0 top-0 flex flex-col ${(disableOrNot()) ? 'pointer-events-none cursor-not-allowed bg-orange-500' : ''}  h-full overflow-y-auto`} >
                <div
                    onClick={handleSwipe}
                >
                    {
                        Cards.slice(remainingStart, 28).map((card) => (
                            <CardLayout disabled={((player_1_have) || (player_2_have))} _const={card._const} count={card.count} key={card.key} r={true} />
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default C2