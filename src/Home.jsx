import React, { useContext, useEffect, useRef, useState } from 'react';
import { StoreContext } from './StoreProvider';
import Loading from './Loading';
import Navbar from './Navbar';
import profile from '/user.png';
import Stories from './Stories';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export default function Home() {
    const { getallPosts, userData, formatDateTime, getUserData, setIsLoading, isLoading, displayUserData, errorMsg, displayPosts, createPost, imgRef, textRef, openModal, setOpenModal, allPosts, setAllPosts, likedPosts, toggleLike } = useContext(StoreContext);



    useEffect(() => {
        displayPosts();
        displayUserData();
    }, []);
    const [openMenu, setOpenMenu] = useState(null)
    const handleOpen = (postId) => {
        setOpenMenu(id => id === postId ? null : postId)
    }
    const [openPhotoModal, setOpenPhotoModal] = useState(false);

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <Navbar />

            <div
                className="bg-bg-hero min-h-screen flex flex-col p-4 items-center gap-3"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="bg-white dark:bg-gray-950 h-16 max-w-lg mx-auto w-full rounded-lg p-4 flex z-40 items-center cursor-pointer">
                    <Link to={`profile`}>
                        <img
                            className="w-10 h-10 rounded-full object-cover object-top mr-3"
                            src={userData?.photo ? userData.photo : profile}
                            alt=""
                        />
                    </Link>

                    <p
                        onClick={() => setOpenModal(true)}
                        className="text-gray-500 flex-1"
                    >
                        what's on your mind?
                    </p>

                    <button
                        className='cursor-pointer'
                        onClick={() => {
                            imgRef.current.value = null; // RESET BEFORE OPEN
                            setOpenModal(true);
                        }}
                    >
                        <i className="fa-solid fa-image text-green-500 fa-lg" />
                    </button>
                </div>

                {/* Create post modal */}
                {openModal && (
                    <div className="flex z-50 justify-center fixed inset-0 bg-black/80 transition-all duration-200">
                        <div className="bg-bg-hero rounded-2xl translate-y-16 relative h-fit max-w-lg w-full p-4">
                            <div className="border-b border-gray-400 pb-3 relative mb-3">
                                <h2 className="text-center font-bold text-text-color">Create Post</h2>
                                <button
                                    onClick={() => setOpenModal(false)}
                                    className="absolute -top-1 right-0 p-2"
                                >
                                    <i className="fa-solid fa-xmark text-text-color"></i>
                                </button>
                            </div>

                            {/* User + Upload image */}
                            <div className="flex items-center mb-2">
                                <img
                                    className="w-10 h-10 rounded-full object-cover object-top mr-3"
                                    src={userData?.photo ? userData.photo : profile}
                                    alt=""
                                />
                                <h2 className="text-text-color flex-1">{userData?.name}</h2>

                                <button
                                    onClick={() => {
                                        imgRef.current.value = null;
                                        imgRef.current.click();
                                    }}
                                    className="p-3 text-xl rounded-lg"
                                >
                                    <i className="fa-solid fa-image text-green-500"></i>
                                </button>

                                <input ref={imgRef} type="file" accept="image/*" className="hidden" />
                            </div>

                            {/* Post form */}
                            <form>
                                <textarea
                                    ref={textRef}
                                    className="w-full h-[200px] resize-none outline-none text-text-color"
                                    placeholder="Write something...."
                                ></textarea>

                                <button
                                    onClick={createPost}
                                    className="w-full bg text-white rounded-md p-2"
                                >
                                    Post
                                </button>
                                {errorMsg && (<p className='text-red-500 text-sm mt-2 text-center'>{errorMsg} </p>)}
                            </form>
                        </div>
                    </div>
                )}

                {/* Stories */}
                <div className="max-w-lg w-full overflow-x-auto hide-scrollbar-x">
                    <Stories />
                </div>

                {/* Posts */}
                {allPosts?.map((post, i) => (
                    <div key={i} className="relative overflow-hidden container md:w-lg  mx-auto pb-1 mb-4 bg-white dark:bg-gray-950 rounded-xl shadow-md">
                        {/* <div className='absolute inset-0 bg-text-color z-30'></div> */}
                        {/* Profile */}

                        <div className=" p-4 relative">
                            <button onClick={() => handleOpen(post._id)} className='absolute top-3 right-4 cursor-pointer text-text-color'>
                                <i className="fa-solid fa-ellipsis"></i>
                            </button>
                            <div
                                className={`${openMenu === post._id ? "opacity-100" : "opacity-0"}   bg-bg-hero border border-gray-300 w-fit h-fit rounded-md absolute right-5 top-10 flex flex-col  px-3 py-1 duration-300 transition-all`}>
                                <Link to={`post/${post._id}`} className='flex items-center cursor-pointer text-text-color'>
                                    {/* <span><i className="fa-solid fa-trash-can mr-1"></i></span> */}
                                    view post
                                </Link>

                            </div>
                            <div className="flex items-center space-x-2">
                                <img
                                    className="h-10 w-10 object-cover rounded-full"
                                    src={post.user?.photo}
                                    alt="profile"
                                />
                                <div>
                                    <h2 className="text-gray-800 dark:text-gray-100 font-bold capitalize">{post.user?.name}</h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-xs">
                                        {formatDateTime(post.createdAt)}</p>
                                </div>

                            </div>

                        </div>

                        {/* لو في صورة */}
                        {post.image ? (
                            <>
                                <img
                                    // onClick={() => setOpenPhotoModal(true)}
                                    className="w-full object-cover max-h-[400px]"
                                    src={post.image}
                                    alt="post"
                                />
                                {/* {openPhotoModal && (
                                    <div className='fixed inset-0 bg-bg-hero flex items-center justify-center'>
                                        <button onClick={() => setOpenPhotoModal(false)} className='absolute left-3 top-3 text-text-color'>
                                            <i className="fa-solid fa-xmark text-2xl"></i>
                                        </button>
                                        <img src={post.image} />
                                    </div>
                                )} */}

                                {/* Icons بعد الصورة */}
                                <div className="ml-4 mt-3 mb-4 flex space-x-2">
                                    <div className="flex space-x-1 items-center">
                                        <button onClick={() => toggleLike(post._id)} className=''>
                                            <i className={` fa-heart mt-1 cursor-pointer text-xl ${likedPosts.includes(post._id) ? "text-red-500 fa-solid" : " fa-regular text-text-color"}`}></i>
                                        </button>
                                        {/* {likedPosts.includes(post._id)? <span>Loved</span> :  <span>Love</span>} */}
                                    </div>
                                    <div className="flex space-x-1 items-center">
                                        <i className="fa-regular fa-comment-dots dark:text-gray-100  text-xl"></i>
                                        <span>{ }</span>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="mx-4 mt-2 mb-4 space-y-1">
                                    <p className="font-bold text-gray-800 dark:text-gray-100 capitalize">{post.user.name}</p>
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
                                        <i className={` fa-heart mt-1 cursor-pointer text-xl ${likedPosts.includes(post._id) ? "text-red-500 fa-solid" : " fa-regular text-text-color"}`}></i>
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
        </>
    );
}