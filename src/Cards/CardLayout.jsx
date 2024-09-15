import React, { useEffect } from 'react'
import InnerCircle from './InnerCircle'
// import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { addToPlayer1, addToPlayer2 } from '../redux/slides/allCards';

function UpperLayout({ count, _const, rotated }) {
    return (
        <div className={`flex-1 flex items-center justify-center  ${rotated ? ' rotate-90' : ''}`}>
            {/* different cases */}
            {_const === 1 && (
                <div className="flex flex-row items-center justify-center">
                    <InnerCircle />
                </div>
            )}
            {_const === 2 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full items-center justify-items-center">
                    <InnerCircle />
                    <div />
                    <div />
                    <InnerCircle />
                </div>
            )}
            {_const === 3 && (
                <div className={`flex ${rotated ? 'flex-row' : 'flex-col '} gap-0  w-full  h-full items-center justify-items-center`}>
                    <div className="self-start flex-1 ">
                        <InnerCircle />
                    </div>
                    <div className=" flex-1">
                        <InnerCircle />
                    </div>
                    <div className="self-end flex-1">
                        <InnerCircle />
                    </div>
                </div>
            )}
            {_const === 4 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full items-center justify-items-center">
                    {Array.from({ length: _const }).map((_, i) => (
                        <InnerCircle key={i} />
                    ))}
                </div>
            )}
            {_const === 5 && (
                <div className={`grid grid-cols-3 grid-rows-3 ${rotated ? '' : ''}  w-full h-full items-center justify-items-center`}>
                    <div className="col-start-1 row-start-1">
                        <InnerCircle />
                    </div>
                    <div className="col-start-1 row-start-3">
                        <InnerCircle />
                    </div>
                    <div className="col-start-2 row-start-2">
                        <InnerCircle />
                    </div>
                    <div className="col-start-3 row-start-1">
                        <InnerCircle />
                    </div>
                    <div className="col-start-3 row-start-3">
                        <InnerCircle />
                    </div>
                </div>
            )}
            {_const === 6 && (
                <div className="grid gap-[2px] grid-rows-3 grid-cols-2 w-full h-full items-center justify-items-center">
                    {Array.from({ length: _const }).map((_, i) => (
                        <InnerCircle key={i} />
                    ))}
                </div>
            )}
        </div>
    )
}
function LowerLayout({ count, rotated }) {
    return (
        <div className={`flex-1 flex items-center justify-center ${rotated ? 'rotate-90' : ''}`}>
            {/* different cases */}
            {count === 1 && (
                <div className="flex flex-row items-center justify-center">
                    <InnerCircle />
                </div>
            )}
            {count === 2 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full items-center justify-items-center">
                    <InnerCircle />
                    <div />
                    <div />
                    <InnerCircle />
                </div>
            )}
            {count === 3 && (
                <div className="grid grid-cols-3 grid-rows-3 w-full h-full items-center justify-items-center">
                    <div className="col-start-1 row-start-1">
                        <InnerCircle />
                    </div>
                    <div className="col-start-2 row-start-2">
                        <InnerCircle />
                    </div>
                    <div className="col-start-3 row-start-3">
                        <InnerCircle />
                    </div>
                </div>
            )}
            {count === 4 && (
                <div className="grid grid-cols-2 grid-rows-2 gap-1 w-full h-full items-center justify-items-center">
                    {Array.from({ length: count }).map((_, i) => (
                        <InnerCircle key={i} />
                    ))}
                </div>
            )}
            {count === 5 && (
                <div className="grid grid-cols-3 grid-rows-3 w-full h-full items-center justify-items-center">
                    <div className="col-start-1 row-start-1">
                        <InnerCircle />
                    </div>
                    <div className="col-start-1 row-start-3">
                        <InnerCircle />
                    </div>
                    <div className="col-start-2 row-start-2">
                        <InnerCircle />
                    </div>
                    <div className="col-start-3 row-start-1">
                        <InnerCircle />
                    </div>
                    <div className="col-start-3 row-start-3">
                        <InnerCircle />
                    </div>
                </div>
            )}
            {count === 6 && (
                <div className="grid gap-[2px] grid-rows-3 grid-cols-2 w-full h-full items-center justify-items-center">
                    {Array.from({ length: count }).map((_, i) => (
                        <InnerCircle key={i} />
                    ))}
                </div>
            )}
        </div>
    )
}

const CardLayout = ({ count, _const, r, disabled }) => {
    // const dispatch = useDispatch();
    // const playedCards = useSelector((state) => state.allCards.playedCards);
    // const cards = useSelector((state) => state.allCards.cards)
    return (
        <>
            <div
                className={`${disabled ? 'pointer-events-none bg-neutral-400 cursor-not-allowed' : 'cursor-pointer bg-white'} rounded-lg shadow-md 
                ${r ? 'rotate-180 w-36 h-20 grid-cols-[1fr_4px_1fr] px-1 py-2' : 'px-2 py-1 w-20 h-36 grid-rows-[46%_4%_50%]'} 
                border-2 border-black mx-1 my-1  grid`}

            >
                <UpperLayout count={count} _const={_const} rotated={r} />
                <hr className={`${r ? 'w-[4px] h-full' : 'w-full h-[4px]'} bg-black rounded-full`} />
                <LowerLayout count={count} _const={_const} rotated={r} />
            </div>

        </>
    )
}

export default CardLayout