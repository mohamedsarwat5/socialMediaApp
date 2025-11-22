import React from 'react'
import Logo from './Logo'
import './loading.css'
export default function Loading() {
    return (
        <div className='min-h-screen bg-bg-hero flex items-center justify-center   '>
             {/* <Logo className={'text-6xl animate-bounce text-pink'}/> */}
             <div className=' text-6xl text-pink font-bold word'>
                <span>B</span>
                <span>U</span>
                <span>Z</span>
                <span>Z</span>
                <span>L</span>
                <span>Y</span>
             </div>
             {/* <span className="loaderr"></span> */}
        </div>
    )
}
