import React, { useEffect } from 'react'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeCards } from '../redux/slides/allCards'

const C1 = () => {
    const playedCards = useSelector((state) => state.allCards.playedCards);
    const Cards = useSelector((state) => state.allCards.cards);
    const p1 = useSelector((state) => state.allCards.player_1_cards);
    const p2 = useSelector((state) => state.allCards.player_2_cards);
    const p1_count = useSelector((state) => state.allCards.p1_count);
    const p2_count = useSelector((state) => state.allCards.p2_count);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeCards())
    }, [dispatch])

    return (
        <div className='relative flex h-screen w-full  bg-red-500 items-center justify-center flex-wrap'>

            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 flex flex-row flex-wrap items-center justify-center">
                {p1.map((card, index) => {
                    return React.cloneElement(card, {
                        idx: index,
                        key: `left-${index}`,
                        // player: '1'
                    })
                })}
            </div>
            <div className='flex '>
                {
                    playedCards.map((Card) => {
                        return Card;
                    })
                }
            </div>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex flex-row flex-wrap items-center justify-center">
                {p2.map((card, index) => {
                    return React.cloneElement(card, {
                        idx: index,
                        key: `left-${index}`,
                    })
                })}
            </div>
            <div className='absolute left-0 top-0 flex flex-col h-full overflow-y-auto'>
                <div >
                    {/* {Cards.slice(14, Cards.length).map((card, index) =>
                        React.cloneElement(card, {
                            r: true,
                            idx: index + 14,
                            key: `left-${index + 14}`,
                            onClick: () => console.log(`Clicked card at index ${index + 14}`)
                        })
                    )} */}
                    {Cards.map((card, index) => {
                        return React.cloneElement(card, {
                            idx: index,
                            r: true,
                            key: `left-${index}`,
                        })
                    })}
                </div>
            </div>
        </div>
    )
}

export default C1

// first try
{/* <div className="flex flex-row flex-wrap mx-52 items-center justify-center">

{Array.from({ length: 7 }).map((_, j) => (
    Array.from({ length: 7 - j }).map((_, i) => (
        <CardLayout count={i + j} _const={j} key={i} />
    ))
))}

</div> */}
