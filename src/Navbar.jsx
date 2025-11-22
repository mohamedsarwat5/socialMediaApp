import React, { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from './StoreProvider'
import Logo from './Logo'
import profile from '/user.png'
export default function Navbar() {
    const { setToken, getUserData } = useContext(StoreContext)
    const [userData, setUserData] = useState(null)
    const [on, setOn] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const handleMenu = () => {
        setOn(prev => !prev)
    }
    const logout = () => {
        localStorage.removeItem('token')
    }
    const handleDark = () => {
        document.documentElement.classList.toggle('dark-mode')
        document.documentElement.classList.toggle('dark')
        setIsChecked((prev) => !prev)
    }
    const removeDark = () => {
        document.documentElement.classList.remove('dark-mode')
        document.documentElement.classList.remove('dark')
        setIsChecked((prev) => !prev)
    }

    const displayUserData = async () => {
        setIsLoading(true)
        const response = await getUserData()
        // console.log(response)
        setUserData(response.data.user)
        setIsLoading(false)
    }
    useEffect(() => {
        displayUserData()
    }, [])


    return (
        <div className='w-full p-4 md:px-12 bg-bg-hero border-b border-gray-400 dark:border-gray-400 text-white z-50  flex justify-between items-center'>
            <Logo className={'text-3xl bg-clip-text text-transparent bg-[linear-gradient(135deg,#ec4899_30%,#9333ea_100%)]'} />

            {/* <div className='space-x-5 hidden md:block text-text-color'>
                <NavLink to={'/home'}><i className="fa-regular fa-house"></i> Home</NavLink>
                <NavLink to={'/home/profile'}><i className="fa-regular fa-circle-user"></i> Profile</NavLink>

            </div> */}
            <div className='relative'>
                <div  className='border border-text-color rounded-full p-1'>
                    <img loading='lazy' onClick={handleMenu} className="w-10 h-10 rounded-full cursor-pointer object-cover object-top" src={userData?.photo ? userData.photo : profile} alt=" "></img>
                </div>
                <div className={` ${on ? 'opacity-100 z-50' : "opacity-0 !z-0"}  transition-all duration-300 ease-in-out  absolute right-0 top-12 bg-white dark:bg-black divide-y dark:divide-gray-100 divide-gray-950 rounded-lg shadow-sm w-48 `}>
                    <div className="px-4 py-3 text-sm text-text-color ">
                        <div>{userData?.name}</div>
                        <div className="font-medium truncate">{userData?.email}</div>
                    </div>
                    <ul className="py-2 text-sm text-text-color" >
                        <li  className=''>



                            <NavLink to={'/home'} className={'flex items-center space-x- px-4 py-2 hover:hover:bg-pink transition-all duration-200 ease-in-out dark:hover:text-white cursor-pointer '}><svg className="me-1 w-[19px] h-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd" />
                            </svg>
                                Home</NavLink>
                        </li>
                        <li  className=''>

                            <NavLink to={'/home/profile'} className={'flex items-center space-x- px-4 py-2 hover:hover:bg-pink transition-all duration-200 ease-in-out dark:hover:text-white cursor-pointer  '}><svg className="me-1 w-[19px] h-[19px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd" />
                            </svg>
                                My Profile</NavLink>

                        </li>
                        <li onClick={() => (handleDark(), setOn(false))} className='px-4 py-2 flex justify-between items-center hover:bg-pink transition-all duration-200 ease-in-out dark:hover:text-white cursor-pointer'>
                            <span className="flex items-center  "> <svg className="w-[19px] h-[19px] me-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clipRule="evenodd" />
                            </svg>

                                Dark mode</span>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={(e) => {
                                        setIsChecked(e.target.checked);
                                        handleDark();
                                        setOn(false);
                                    }}
                                />
                                <span className="slider" />
                            </label>
                        </li>

                        <NavLink to={'settings'} className={'flex items-center space-x- px-4 py-2 hover:hover:bg-pink transition-all duration-200 ease-in-out dark:hover:text-white cursor-pointer '}>
                        <i className='fa-solid fa-gear me-1 w-[19px] '></i>
                                Settings</NavLink>

                    </ul>
                    <div className="py-1">
                        <NavLink onClick={() => (logout(), removeDark(), setOn(false))} to={'/'} className="block px-4 py-2 text-sm text-text-color hover:hover:bg-pink transition-all duration-200 ease-in-out  dark:hover:text-white cursor-pointer "><i className="fa-solid fa-arrow-right-from-bracket"></i> Sign out</NavLink>
                    </div>
                </div>

            </div>
        </div>
    )
}
