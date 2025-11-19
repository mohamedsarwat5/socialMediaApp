import React, { useEffect, useState } from 'react'
import Card from './Card'
import { jwtDecode } from 'jwt-decode'

import axios from 'axios'

export default function MyProfile() {

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


  const [userPosts, setUserPosts] = useState(null)
  const baseUrl = import.meta.env.VITE_BASE_URL

  const getUserPosts = () => {
    const token = localStorage.getItem("token")
    const tokenDecoded = jwtDecode(token)
    axios.get(`${baseUrl}/users/${tokenDecoded.user}/posts?limit=2`, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((res) => {
      setUserPosts(res.data.posts)
    }).catch(err => console.log(err))

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
  }, [])

  return (
    <div className='min-h-dvh bg-bg-hero flex flex-col'>
      <Card />
      {
        userPosts?.map((post, i) => <div key={i} className="container md:w-lg px-4 mx-auto  my-4 bg-white dark:bg-gray-950 rounded-xl shadow-md">

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
  )
}
