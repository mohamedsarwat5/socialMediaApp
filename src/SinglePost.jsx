import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { StoreContext } from './StoreProvider';
import Loading from './Loading';

export default function SinglePost() {



    const { formatDateTime, likedPosts,setIsLoading,isLoading , setLikedPosts } = useContext(StoreContext)
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [singlePost, setSinglePost] = useState(null);
    const { id } = useParams();

    const getSinglePost = () => {
        setIsLoading(true);
        axios.get(`${baseUrl}/posts/${id}`, {
            headers: { token: localStorage.getItem('token') }
        })
            .then((response) => {
                setSinglePost(response.data.post);
            })
            .catch((error) => {
                console.log(error)
            })
            .finally(() => {
                setIsLoading(false);
            });
    }
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



    useEffect(() => {
        getSinglePost()
    }, [])

    return isLoading ?<Loading />: (
        <div className='min-h-dvh bg-bg-hero flex flex-col px-4 py-19 items-center gap-3'>
            <NavLink to={'/home'} className={'absolute left-4 top-4 z-10  w-10 h-10 flex items-center justify-center rounded-full'}>
                <i className="fa-solid fa-arrow-left text-black dark:text-white"></i>
            </NavLink>

            <div className="container md:w-lg  mx-auto pb-1 mb-4 bg-white dark:bg-gray-950 rounded-xl shadow-md">
                <div className="p-4 flex items-center space-x-2">
                    <img
                        className="h-10 w-10 object-cover rounded-full"
                        src={singlePost?.user.photo}
                        alt="profile"
                    />
                    <div>
                        <h2 className="text-gray-800 dark:text-gray-100 font-bold capitalize">
                            {singlePost?.user.name}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs">
                            {formatDateTime(singlePost?.createdAt)}
                        </p>
                    </div>
                </div>

                {singlePost?.image && (
                    <img className="w-full" src={singlePost?.image} alt="post" />
                )}

                <div className="ml-4 mt-3 mb-4 flex space-x-2">
                    <button onClick={() => toggleLike(singlePost?._id)}>
                        <i
                            className={`fa-heart text-xl cursor-pointer ${likedPosts.includes(singlePost?._id)
                                ? "fa-solid text-red-500"
                                : "fa-regular text-text-color"
                                }`}
                        ></i>
                    </button>

                    <i className="fa-regular fa-comment-dots dark:text-gray-100 text-xl"></i>
                </div>

                <div className="mx-4 mt-2 mb-4">
                    <p className="font-bold text-gray-800 dark:text-gray-100">
                        {singlePost?.user.name}
                    </p>
                    <p dir="auto" className="text-gray-700 dark:text-gray-400">
                        {singlePost?.body}
                    </p>
                </div>
            </div>

        </div>
    );

}