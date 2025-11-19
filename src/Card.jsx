import React, { useContext, useEffect, useRef, useState } from 'react'
import { StoreContext } from './StoreProvider'
import Loading from './Loading'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

export default function Card() {

    const baseUrl = import.meta.env.VITE_BASE_URL
    const { getUserData } = useContext(StoreContext)
    const [userData, setUserData] = useState()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const displayUserData = async () => {
        setIsLoading(true)
        const response = await getUserData()
        console.log(response)
        setUserData(response.data.user)
        setIsLoading(false)
    }

    const inputRefImage = useRef()
    const changePhoto = (src) => {
        if (src) {
            const formData = new FormData()
            formData.append('photo', src)
            axios.put(`${baseUrl}/users/upload-photo`, formData, {
                headers: {
                    token: localStorage.getItem('token')
                }
            }).then(res => {
                console.log(res)
                getUserData()
                displayUserData()
            })
        }
    }
    useEffect(() => {
        displayUserData()
    }, [])

    return (

        isLoading ? (<Loading />) : (<div className="  md:w-12/12  mx-auto  bg-bg-hero relative  ">
            {isModalOpen && (<div className=' absolute inset-0 bg-black/80 z-[9999999]'>
                <div className=' flex items-center justify-center min-h-screen relative '>
                    <button onClick={() => setIsModalOpen(false)} className='bg-bg-hero w-10 h-10 absolute end-3 top-3 rounded-full cursor-pointer'>
                        <i className="fa-solid fa-xmark  text-black dark:text-white "></i>
                    </button>
                    <img loading='lazy' src={userData?.photo} className='md:w-5/12' alt="" />
                </div>
            </div>)}

            <NavLink to={'/home'} className={'absolute left-4 top-4 z-10  bg-bg-hero w-10 h-10 flex items-center justify-center rounded-full'}>
                <i className="fa-solid fa-arrow-left text-black dark:text-white"></i>
            </NavLink>
            <div className=" h-48 md:h-[300px]  overflow-hidden">
                <img loading='lazy' className=" object-bottom object-cover w-full" src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ" alt="Mountain" />
            </div>
            <div className='relative w-fit mx-auto'>
                <button onClick={() => inputRefImage.current.click()} className='absolute md:bottom-4 md:end-4 cursor-pointer shadow-md bottom-2 end-2 rounded-full w-12 h-12 bg-bg-hero flex items-center justify-center z-50 '>
                    <i className="fa-solid fa-camera text-black dark:text-white text-2xl"></i>
                </button>

                <div className="mx-auto w-40 h-40 lg:w-60 lg:h-60 lg:-mt-32 relative -mt-20 border-4 border-white dark:border-black rounded-full bg overflow-hidden">
                    <img loading='lazy' onClick={() => setIsModalOpen(true)} className="object-cover object-center " src={userData?.photo} alt={userData?.name} />
                    <input onChange={(e) => changePhoto(e.target.files[0])} type="file" className='hidden' ref={inputRefImage} accept='image/*' />
                </div>
            </div>

            <div className="text-center mt-2">
                <h2 className="font-semibold capitalize text-2xl text-text-color">{userData?.name}</h2>
                <p className="text-gray-500 dark:text-gray-300 capitalize">welcome to my profile</p>
            </div>
            <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around shadow-md">
                <li className="flex flex-col items-center text-gray-500 dark:text-gray-300 justify-around">
                    <div className='flex items-center gap-x-1 font-semibold'>
                        <svg className="w-4 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                        <p>Posts</p>
                    </div>
                    <div>2k</div>
                </li>
                <li className="flex flex-col items-center text-gray-500 dark:text-gray-300 justify-between">
                    <div className='flex items-center gap-x-1 font-semibold'>
                        <svg className="w-4 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
                        </svg>
                        <p>Followers</p>
                    </div>
                    <div>10k</div>
                </li>
                <li className="flex flex-col items-center text-gray-500 dark:text-gray-300 justify-around">
                    <div className='flex items-center gap-x-1 font-semibold'>
                        <svg className="w-4 fill-current " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                        </svg>
                        <p>Friends</p>
                    </div>
                    <div>15</div>
                </li>
            </ul>

        </div>)












    )
}
