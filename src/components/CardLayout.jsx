import React from "react";
import CardUpperLayout from "./CardUpperLayout";
import CardLowerLayout from "./CardLowerLayout";

const CardLayout = ({ count, _const, r, disabled, isCenterLine = true }) => {
    return (
        <>
            <div
                className={`${
                    disabled ? "pointer-events-none bg-neutral-400 cursor-not-allowed" : "cursor-pointer bg-white"
                } rounded-lg shadow-md 
                ${
                    r
                        ? "rotate-180 w-36 h-20 grid-cols-[1fr_4px_1fr] px-1 py-2"
                        : "px-2 py-1 w-20 h-36 grid-rows-[46%_4%_50%]"
                } 
                border-2 border-black mx-1 my-1  grid`}
            >
                <CardUpperLayout count={count} _const={_const} rotated={r} />

                {isCenterLine && <hr className={`${r ? "w-[4px] h-full" : "w-full h-[4px]"} bg-black rounded-full`} />}
                <CardLowerLayout count={count} _const={_const} rotated={r} />
            </div>
        </>
    );
};

export default CardLayout;
