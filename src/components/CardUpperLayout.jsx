import React from "react";
import InnerCircle from "./InnerCircle";

export default function CardUpperLayout({ count, _const, rotated }) {
    return (
        <div className={`flex-1 flex items-center justify-center  ${rotated ? " rotate-90" : ""}`}>
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
                <div
                    className={`flex ${
                        rotated ? "flex-row" : "flex-col "
                    } gap-0  w-full  h-full items-center justify-items-center`}
                >
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
                <div
                    className={`grid grid-cols-3 grid-rows-3 ${
                        rotated ? "" : ""
                    }  w-full h-full items-center justify-items-center`}
                >
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
    );
}
