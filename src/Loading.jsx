import React from 'react'
import Logo from './Logo'

export default function Loading() {
    return (
        <div className=' -translate-y-20  min-h-screen bg-bg-herohero flex items-center justify-center flex-col gap-y-4 '>
             <Logo className={'text-6xl animate-bounce'}/>
             {/* <span className="loaderr"></span> */}
        </div>
    )
}
