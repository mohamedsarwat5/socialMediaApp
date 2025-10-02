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
        isLoading ? (<Loading />) : (<div className='bg-bg-hero min-h-screen flex flex-col py-4 items-center gap-3'>
            {allPosts?.map((post, i) => (
                <div key={i} className='w-4/12 max-w-6/12 min-h-[100px]  '>
                    <p className='text-text-color'>{post.body}</p>
                    <img src={post.image} alt="" />
                </div>
            ))}
        </div>)
    )
}
