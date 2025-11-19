import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreProvider'
import Loading from './Loading'
import Navbar from './Navbar'
import profile from '../public/user.png'
import Stories from './Stories'
import { Link } from 'react-router-dom'


export default function Home() {

    const { getallPosts, getUserData } = useContext(StoreContext)
    const [allPosts, setAllPosts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [userData, setUserData] = useState(null)
    const [likedPosts, setLikedPosts] = useState(
        JSON.parse(localStorage.getItem("likedPosts")) || []
    );
    const toggleLike = (id) => {
        let updated;
        if (likedPosts.includes(id)) {
            updated = likedPosts.filter((postId) => postId !== id);
        } else {
            updated = [...likedPosts, id];
        }
        setLikedPosts(updated);
        localStorage.setItem("likedPosts", JSON.stringify(updated));
    };

    const displayPosts = async () => {
        setIsLoading(true)
        let response = await getallPosts()
        console.log(response)
        const sortedPosts = response.data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )
        setAllPosts(sortedPosts)
        setIsLoading(false)
    }
    useEffect(() => {
        displayPosts()
    }, [])
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

    function formatDateTime(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US'); // النتيجة: 05/10/2025
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        return `${formattedDate} ${formattedTime}`;
    }
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(prev => !prev)

    return (

        isLoading ? (<Loading />) : (<>
            <Navbar />
            <div className='bg-bg-hero  min-h-screen flex flex-col p-4 items-center gap-3'
            onClick={(e) => e.stopPropagation()}>


                <div className='bg-white dark:bg-gray-950 h-16  max-w-lg mx-auto w-full rounded-lg p-4 flex z-50 items-center cursor-pointer'>
                    <Link to={`profile`}> <img className='w-10 h-10 rounded-full cursor-pointer object-cover object-top mr-3' src={userData?.photo ? userData.photo : profile} alt="" /></Link>
                    <p onClick={handleOpenModal} className='text-gray-500 flex-1'>what's on your mind?</p>
                    <button onClick={()=>handleOpenModal(true)}><i className="fa-solid fa-image text-green-500 fa-lg cursor-pointer" /></button>
                </div>

                <div className={`${openModal ? "flex z-50 " : "hidden z-0"} z-50  justify-center fixed inset-0 bg-black/80 transition-all duration-200`}>
                    <div className={`bg-bg-hero rounded-2xl translate-y-16 relative h-fit max-w-lg w-full p-4`}>

                        <div className='border-b header border-gray-400 pb-3 relative mb-3'>
                            <h2 className='text-center font-bold text-text-color'>Create Post</h2>
                            <button onClick={() => setOpenModal(false)} className='absolute -top-1  right-0 cursor-pointer  p-2 flex items-center justify-center '><i className='fa-solid fa-xmark text-text-color' ></i></button>
                        </div>
                        <div className='userData flex items-center mb-2'>
                            <img className='w-10 h-10 rounded-full cursor-pointer object-cover object-top mr-3' src={userData?.photo ? userData.photo : profile} alt="" />
                            <h2 className='text-text-color flex-1'>{userData?.name}</h2>
                             <div className=' p-3 text-xl  rounded-lg  flex items-center justify-center w-fit'>
                                <i className='fa-solid fa-image cursor-pointer text-green-500'></i>
                            </div>
                        </div>

                        <form action="" className=''>
                            <textarea name="" className=' w-full h-[200px] resize-none outline-none text-text-color' placeholder="Write something...."></textarea>

                            <button className=' w-full bg text-white rounded-md p-2 cursor-pointer '>Post</button>
                        </form>
                    </div>
                </div>

                <div className='max-w-lg w-full overflow-x-auto  hide-scrollbar-x'>
                    <Stories />
                </div>
                {allPosts?.slice().map((post, i) => (
                    <div key={i} className="container md:w-lg  bg-white dark:bg-gray-950 rounded-xl shadow-md">

                        {/* Profile */}
                        <div className=" p-4 ">
                            <div className="flex items-center space-x-2">
                                <img
                                    className="h-10 w-10 object-cover rounded-full"
                                    src={post.user.photo}
                                    alt="profile"
                                />
                                <div>
                                    <h2 className="text-gray-800 dark:text-gray-100 font-bold capitalize">{post.user.name}</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                                        {formatDateTime(post.createdAt)}</p>
                                </div>

                            </div>

                        </div>

                        {/* لو في صورة */}
                        {post.image ? (
                            <>
                                <img
                                    className="w-full"
                                    src={post.image}
                                    alt="post"
                                />

                                {/* Icons بعد الصورة */}
                                <div className="ml-4 mt-3 mb-4 flex space-x-2">
                                    <div className="flex space-x-1 items-center">
                                        <button onClick={() => toggleLike(post._id)} className=''>
                                            <i className={` fa-heart  cursor-pointer text-xl ${likedPosts.includes(post._id) ? "text-red-500 fa-solid" : " fa-regular"}`}></i>
                                        </button>
                                    </div>
                                    <div className="flex space-x-1 items-center">
                                        <i className="fa-regular fa-comment-dots dark:text-gray-100  text-xl"></i>
                                        <span>{ }</span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="mx-4 mt-2 mb-4 space-y-1">
                                    <p className="font-bold text-gray-800 dark:text-gray-100">{post.user.name}</p>
                                    <p dir='auto' className="text-gray-700 dark:text-gray-400">{post.body}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Body الأول */}
                                <div className="mx-4 mt-2 mb-4 space-y-1">
                                    <p className="font-bold text-gray-800">{post.title}</p>
                                    <p dir='auto' className="text-gray-700 dark:text-gray-400">{post.body}</p>
                                </div>

                                {/* Icons بعد البودي */}
                                <div className="ml-4 mt-2 mb-4 flex space-x-2">
                                    <button onClick={() => toggleLike(post._id)}>
                                        <i className={` fa-heart  cursor-pointer text-xl ${likedPosts.includes(post._id) ? "text-red-500 fa-solid" : " fa-regular"}`}></i>
                                    </button>
                                    <div className="flex space-x-1 items-center">
                                        <i className="fa-regular fa-comment-dots dark:text-gray-100 text-xl"></i>
                                        <span>{ }</span>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                ))}
            </div>
        </>)
    )
}
