import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from './StoreProvider'
import Loading from './Loading'


export default function Home() {

    const { getallPosts } = useContext(StoreContext)
    const [allPosts, setAllPosts] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const displayPosts = async () => {
        setIsLoading(true)
        let response = await getallPosts()
        console.log(response)
        setAllPosts(response.data.posts)
        setIsLoading(false)
    }
    useEffect(() => {
        displayPosts()

    }, [])

    return (

        isLoading ? (<Loading />) : (<div className='bg-bg-hero  min-h-screen flex flex-col p-4 items-center gap-3'>
            {allPosts?.slice(4).map((post, i) => (
                <div key={i} className="container md:w-md  bg-white dark:bg-gray-950 rounded-xl shadow-md">

                    {/* Profile */}
                    <div className="flex p-4 justify-between">
                        <div className="flex items-center space-x-2">
                            <img
                                className="h-10 w-10 object-cover rounded-full"
                                src={post.user.photo}
                                alt="profile"
                            />
                            <h2 className="text-gray-800 dark:text-gray-100 font-bold">{post.user.name}</h2>
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
                                    <i className="fa-solid fa-heart text-red-500 text-xl"></i>
                                    <span>{}</span>
                                </div>
                                <div className="flex space-x-1 items-center">
                                    <i className="fa-regular fa-comment-dots dark:text-gray-100  text-xl"></i>
                                    <span>{}</span>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="ml-4 mt-2 mb-4 space-y-1">
                                <p className="font-bold text-gray-800 dark:text-gray-100">{post.user.name}</p>
                                <p dir='auto' className="text-gray-700 dark:text-gray-400">{post.body}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Body الأول */}
                            <div className="ml-4 mt-2 mb-4 space-y-1">
                                <p className="font-bold text-gray-800">{post.title}</p>
                                <p dir='auto' className="text-gray-700 dark:text-gray-400">{post.body}</p>
                            </div>

                            {/* Icons بعد البودي */}
                            <div className="ml-4 mt-2 mb-4 flex space-x-2">
                                <div className="flex space-x-1 items-center">
                                    <i className="fa-solid fa-heart text-red-500 text-xl"></i>
                                    <span>{}</span>
                                </div>
                                <div className="flex space-x-1 items-center">
                                    <i className="fa-regular fa-comment-dots dark:text-gray-100 text-xl"></i>
                                    <span>{}</span>
                                </div>
                            </div>
                        </>
                    )}

                </div>
            ))}
        </div>)
    )
}
