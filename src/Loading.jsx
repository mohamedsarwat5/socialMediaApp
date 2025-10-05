import React from 'react'
import Logo from './Logo'

export default function Loading() {
    return (
        <div className='   min-h-screen bg-bg-hero flex items-center justify-center   '>
             <Logo className={'text-6xl animate-bounce text-pink'}/>
             {/* <span className="loaderr"></span> */}
        </div>
    )
}
