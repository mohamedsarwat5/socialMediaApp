import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from './StoreProvider'
import Logo from './Logo'
import profile from '../public/user.png'
export default function Navbar() {
    const { setToken } = useContext(StoreContext)
    const [on, setOn] = useState(false)
    const handleMenu = () => {
        setOn(prev => !prev)
    }
    const logout = () => {
        localStorage.removeItem('token')
    }
    const handleDark = () => {
        document.documentElement.classList.toggle('dark-mode')
        document.documentElement.classList.toggle('dark')
    }
    const removeDark = () => {
        document.documentElement.classList.remove('dark-mode')
        document.documentElement.classList.remove('dark')
    }
    return (
        <div className='w-full p-4 md:px-12 bg-red-700 text-white   flex justify-between items-center'>
            <Logo className={'text-3xl'} />

            <div className='space-x-5 hidden md:block'>
                <NavLink to={'/home'}><i className="fa-regular fa-house"></i> Home</NavLink>
                <NavLink to={'/home/profile'}><i className="fa-regular fa-circle-user"></i> Profile</NavLink>

            </div>
            <div className='relative'>
                <img onClick={handleMenu} class="w-10 h-10 rounded-full cursor-pointer object-cover object-top" src={profile} alt=" "></img>
                <div className={` ${on ? 'opacity-100' : "opacity-0"} z-20 transition-all duration-300 ease-in-out  absolute right-0 top-12 bg-white dark:bg-black divide-y divide-gray-100 rounded-lg shadow-sm w-48 `}>
                    <div className="px-4 py-3 text-sm text-text-color ">
                        <div>Bonnie Green</div>
                        <div className="font-medium truncate">name@flowbite.com</div>
                    </div>
                    <ul className="py-2 text-sm text-text-color" aria-labelledby="avatarButton">
                        <li className='px-4 py-2 flex justify-between items-center hover:bg-pink transition-all duration-200 ease-in-out dark:hover:text-white cursor-pointer'>
                            <span className="block  ">Dark mode</span>
                            <label className="switch">
                                <input onClick={() => (handleDark(), setOn(false))} type="checkbox" />
                                <span className="slider" />
                            </label>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:hover:bg-pink transition-all duration-200 ease-in-out dark:hover:text-white cursor-pointer">Settings</a>
                        </li>
                        <li>
                            <a href="#" className="block px-4 py-2 hover:hover:bg-pink transition-all duration-200 ease-in-out dark:hover:text-white cursor-pointer">Earnings</a>
                        </li>
                    </ul>
                    <div className="py-1">
                        <NavLink onClick={() => (logout(), removeDark(), setOn(false))} to={'/'} className="block px-4 py-2 text-sm text-text-color hover:hover:bg-pink transition-all duration-200 ease-in-out  dark:hover:text-white cursor-pointer "><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out</NavLink>
                    </div>
                </div>

            </div>
        </div>
    )
}
