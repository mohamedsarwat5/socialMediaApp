import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from './StoreProvider'
import Logo from './Logo'
import profile from '../public/user.png'
export default function Navbar() {
    const { setToken, getUserData } = useContext(StoreContext)
    const [userData, setUserData] = useState(null)
    const [on, setOn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

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

    const displayUserData = async () => {
        setIsLoading(true)
        const response = await getUserData()
        console.log(response)
        setUserData(response.data.user)
        setIsLoading(false)
    }
    useEffect(() => {
      displayUserData()
    }, [])


    return (
        <div className='w-full p-4 md:px-12 bg-bg-hero border-b border-black text-white z-50  flex justify-between items-center'>
            <Logo className={'text-3xl'} />

            <div className='space-x-5 hidden md:block text-text-color'>
                <NavLink to={'/home'}><i className="fa-regular fa-house"></i> Home</NavLink>
                <NavLink to={'/home/profile'}><i className="fa-regular fa-circle-user"></i> Profile</NavLink>

            </div>
            <div className='relative'>
                <div onClick={handleMenu} className='border border-text-color rounded-full p-1'>
                    <img  className="w-10 h-10 rounded-full cursor-pointer object-cover object-top" src={userData?.photo ? userData.photo : profile} alt=" "></img>
                </div>
                <div className={` ${on ? 'opacity-100' : "opacity-0"} z-20 transition-all duration-300 ease-in-out  absolute right-0 top-12 bg-white dark:bg-black divide-y divide-gray-100 rounded-lg shadow-sm w-48 `}>
                    <div className="px-4 py-3 text-sm text-text-color ">
                        <div>{userData?.name}</div>
                        <div className="font-medium truncate">{userData?.email}</div>
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
