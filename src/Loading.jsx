import React from 'react'
import Logo from './Logo'

export default function Loading() {
    return (
        <div className='   min-h-screen bg-bg-herohero flex items-center justify-center   '>
             <Logo className={'text-6xl animate-bounce'}/>
             {/* <span className="loaderr"></span> */}
        </div>
    )
}
