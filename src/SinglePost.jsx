import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { StoreContext } from './StoreProvider';
import Loading from './Loading';
import profile from '/user.png'
import { Send } from 'lucide-react';

export default function SinglePost() {



    const { formatDateTime, likedPosts, setIsLoading, isLoading, setLikedPosts } = useContext(StoreContext)
    const baseUrl = import.meta.env.VITE_BASE_URL;
    const [singlePost, setSinglePost] = useState(null);
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);

    const commentRef = useRef();


    const getSinglePost = () => {
        setIsLoading(true);
        axios.get(`${baseUrl}/posts/${id}`, {
            headers: { token: localStorage.getItem('token') }
        })
            .then((response) => {
                setSinglePost(response.data.post);
            })
            .catch((error) => {
                console.log(error.response?.data);
            })

            .finally(() => {
                setIsLoading(false);
            });
    }

    const getPostComments = () => {
        setCommentLoading(true);
        axios.get(`${baseUrl}/posts/${id}/comments`, {
            headers: { token: localStorage.getItem('token') }
        })
            .then((response) => {
                setComments(response.data.comments);
                console.log(response.data.comments)
            })
            .catch((error) => {
                console.log(error.response?.data);
            })
            .finally(() => {
                setCommentLoading(false);
            })
    }


    const CreateComment = () => {
        const text = commentRef.current.value.trim();
        if (!text) return;

        axios.post(`${baseUrl}/comments`, {
            content: text,
            post: id
        }, {
            headers: { token: localStorage.getItem('token') }
        })
            .then(() => {
                commentRef.current.value = '';
                getPostComments();
            })
            .catch((error) => {
                console.log(error.response?.data);
            })

    };


    const [openComments, setOpenComments] = useState(false);



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
        getSinglePost(),
            getPostComments()
    }, [])

    return isLoading ? <Loading /> : (
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

                    <button>
                        <i className="fa-regular fa-comment-dots dark:text-gray-100 text-xl"></i>
                    </button>
                </div>

                <div className="mx-4 mt-2 mb-4">
                    <p className="font-bold text-gray-800 dark:text-gray-100">
                        {singlePost?.user.name}
                    </p>
                    <p dir="auto" className="text-gray-700 dark:text-gray-400">
                        {singlePost?.body}
                    </p>
                </div>

                <div className=' mx-auto max-w-xs w-full lg:w-[450px] mb-3 lg:mb-4 relative'>
                    <button onClick={CreateComment} className='absolute right-0 top-1/2 -translate-y-1/2 p-2 text-text-color cursor-pointer'>
                        <Send size={16} strokeWidth={1.5} />
                    </button>
                    <input ref={commentRef} type="text" className='border w-full outline-none text-text-color py-1 pl-4 pr-8 rounded-3xl' placeholder='Write a comment' />
                </div>

                <div className={`mx-2 mb-4`}>
                    {/* <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">Comments</h3> */}
                    {comments.length === 0 ? (
                        <p className="text-gray-700 dark:text-gray-400">No comments yet.</p>) : (
                        commentLoading ? (<p className="text-gray-700 text-sm text-center dark:text-gray-400">Loading comments...</p>) : (
                            comments.map((comment) => (
                                <div key={comment._id} className="mb-3">

                                    <div className="p-4 flex items-center space-x-2">
                                        <span className='w-8 h-8 rounded-full border flex items-center justify-center bg-gray-100'>
                                            {comment?.commentCreator?.name?.trim("").slice(0, 1).toUpperCase()}
                                        </span>
                                        <div className='flex flex-col justify-center '>
                                            <h2 className="text-gray-800 dark:text-gray-100 font-bold capitalize">
                                                {comment?.commentCreator?.name}
                                            </h2>
                                            <p dir="auto" className="text-gray-700 dark:text-gray-400">{comment?.content}</p>

                                        </div>
                                    </div>
                                </div>
                            )))
                    )}
                </div>
            </div>

        </div>
    );

}