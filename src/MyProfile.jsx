import React, { useContext, useEffect, useRef, useState } from 'react'
import Card from './Card'
import { jwtDecode } from 'jwt-decode'
import profile from '/user.png';

import axios from 'axios'
import Loading from './Loading';
import { StoreContext } from './StoreProvider';
import { Link } from 'react-router-dom';

export default function MyProfile() {

  const { token, setToken, getUserData, getallPosts, errorMsg, createPost, imgRef, textRef, openModal, setOpenModal, allPosts, setAllPosts, displayPosts, setIsLoading, isLoading, displayUserData, userData, setUserData } = useContext(StoreContext)

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

  const [openMenu, setOpenMenu] = useState(null)
  const handleOpen = (postId) => {
    setOpenMenu(id => id === postId ? null : postId)
  }

  const [loading, setLoading] = useState(false)

  const [userPosts, setUserPosts] = useState(null)
  const baseUrl = import.meta.env.VITE_BASE_URL

  const getUserPosts = () => {
    const token = localStorage.getItem("token")
    const tokenDecoded = jwtDecode(token)
    axios.get(`${baseUrl}/users/${tokenDecoded.user}/posts?limit=50`, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((res) => {
      const sortedPosts = res.data.posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      )
      setUserPosts(sortedPosts)
    }).catch(err => console.log(err))

  }

  const deletePost = (postId) => {
    setLoading(true)
    axios.delete(`${baseUrl}/posts/${postId}`, { headers: { token: localStorage.getItem('token') } })
      .then(() => {
        getUserPosts()
      }).catch((err) => console.log(err))
    .finally(() => setLoading(false))
  }
  const postText = useRef(null)
  const postImg = useRef()

  const updataPost = (postId) => {
    setLoading(true)
    const formData = new FormData()

    if (postText.current.value) {
      formData.append('body', postText.current.value)
    }
    if (postImg.current.files?.[0]) {
      formData.append('image', postImg.current.files?.[0])
    }
    axios.put(`${baseUrl}/posts/${postId}`, formData, { headers: { token: localStorage.getItem('token') } })
      .then(() => {
        getUserPosts()
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))

  }

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

  useEffect(() => {
    getUserPosts()
    displayUserData()
  }, [userPosts])



  return (
    <>
      {loading ? (<Loading />) : (
        <div className='min-h-dvh bg-bg-hero flex flex-col'>
          <Card />


          <div className="bg-white mb-2 dark:bg-gray-950 h-16 max-w-lg mx-auto w-full rounded-lg p-4 flex z-10 items-center cursor-pointer">
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
                    onClick={async (e) => {
                      const newPost = await createPost(e);

                      if (newPost) {
                        setUserPosts(prev => [newPost, ...prev]);
                      }
                    }}


                    className="w-full bg text-white rounded-md p-2"
                  >
                    Post
                  </button>
                  {errorMsg && (<p className='text-red-500 text-sm mt-2 text-center'>{errorMsg} </p>)}
                </form>
              </div>
            </div>
          )}
          <div className='px-4'>
            {
              userPosts?.map((post, i) =>
                <div key={i} className="container md:w-lg  mx-auto pb-1 mb-4 bg-white dark:bg-gray-950 rounded-xl shadow-md">
                  {/* Profile */}
                  <div className=" p-4 relative">
                    <button onClick={() => handleOpen(post._id)} className='absolute top-3 right-4 cursor-pointer text-text-color'>
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    <div
                      className={`${openMenu === post._id ? "opacity-100" : "opacity-0"}  space-y-1 bg-bg-hero border border-gray-300 w-[120px] h-[90px] rounded-md absolute right-5 top-10 flex flex-col items-start p-4 duration-300 transition-all`}>
                      <button onClick={() => deletePost(post._id)} className='flex items-center cursor-pointer text-text-color'>
                        <span><i className="fa-solid fa-trash-can mr-1"></i></span>
                        Delete
                      </button>
                      <hr className='text-text-color' />
                      <button className='flex items-center cursor-pointer text-text-color'>
                        <span><i className="fa-solid fa-pen-to-square mr-1"></i></span>
                        Edit
                      </button>
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
                        className="w-full"
                        src={post.image}
                        alt="post"
                      />

                      {/* Icons بعد الصورة */}
                      <div className="ml-4 mt-3 mb-4 flex space-x-2">
                        <div className="flex space-x-1 items-center">
                          <button onClick={() => toggleLike(post._id)} className=''>
                            <i className={` fa-heart  cursor-pointer text-xl ${likedPosts.includes(post._id) ? "text-red-500 fa-solid" : " fa-regular text-text-color"}`}></i>
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
                          <i className={` fa-heart  cursor-pointer text-xl ${likedPosts.includes(post._id) ? "text-red-500 fa-solid" : " fa-regular text-text-color"}`}></i>
                        </button>
                        <div className="flex space-x-1 items-center">
                          <i className="fa-regular fa-comment-dots dark:text-gray-100 text-xl"></i>
                          <span>{ }</span>
                        </div>
                      </div>
                    </>
                  )}

                </div>)
            }
          </div>

        </div>
      )}
    </>
  )
}
