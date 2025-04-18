import React from 'react'
import CardLayout from './CardLayout'
const AllCards = () => {
    return (
        <div className="flex flex-row flex-wrap items-center justify-center">
            {Array.from({ length: 7 }).map((_, i) => (
                Array.from({ length: 7 - i }).map((_, j) => (
                    <CardLayout count={j} _const={i} key={j} />
                ))
            ))}
        </div>
    )
}

export default AllCards