import React from "react";
import InnerCircle from "./InnerCircle";

export default function CardLowerLayout({ count, rotated }) {
    return (
        <div className={`flex-1 flex items-center justify-center ${rotated ? "rotate-90" : ""}`}>
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
    );
}
