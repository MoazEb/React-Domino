import React from 'react'

const Winner = ({ player }) => {
    return (
        <div className='flex flex-col gap-5 h-screen z-20 w-full items-center justify-center'>
            <h1 className='poppins text-6xl font-light '> {player} Won</h1>
            <button onClick={() => window.location.reload()} className='bg-yellow-600 hover:bg-yellow-700 text-white text-lg font-bold py-4 px-8 rounded-lg'>Start Again?</button>
        </div>
    )
}

export default Winner