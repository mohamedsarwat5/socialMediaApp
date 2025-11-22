import axios, { all } from 'axios'
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useRef, useState } from 'react'

export const StoreContext = createContext()

export default function StoreProvider({ children }) {

    const baseUrl = import.meta.env.VITE_BASE_URL
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const TokenLocalStorage = localStorage.getItem('token')
        if (TokenLocalStorage) {
            setToken(TokenLocalStorage)

        }
    })
    const [Token, setToken] = useState(null)

    const token = localStorage.getItem('token')
    const getUserData = () => {
        return axios.get(`${baseUrl}/users/profile-data`, { headers: { token } })
            .then((response) => response)
    }
    const getallPosts = () => {
        return axios.get(`${baseUrl}/posts?limit=50&sort=-createdAt`, { headers: { token } })
            .then((response) => response)
    }


    const [openModal, setOpenModal] = useState(false);
    const textRef = useRef(null);
    const imgRef = useRef(null);

    const decode = token ? jwtDecode(token) : null;

    const [errorMsg, setErrorMsg] = useState("");
    const [allPosts, setAllPosts] = useState([]);

    const displayPosts = async () => {
        setIsLoading(true);
        let response = await getallPosts();
        const sorted = response.data.posts
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 50);

        setAllPosts(sorted);
        setIsLoading(false);
    };

    const createPost = async (e) => {
        e.preventDefault();

        const text = textRef.current?.value.trim();
        const image = imgRef.current?.files?.[0];

        // لو مفيش كتابة وفي صورة → ممنوع
        if (!text && image) {
            setErrorMsg("You must write something");
            return;
        }

        // لو مفيش كتابة ومفيش صورة → ممنوع
        if (!text && !image) {
            setErrorMsg("You can't post empty post");
            return;
        }

        setErrorMsg(""); // clear old errors

        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("body", text);

        try {
            const res = await axios.post(`${baseUrl}/posts`, formData, {
                headers: { token: localStorage.getItem('token') }
            });

            if (textRef.current) textRef.current.value = "";
            if (imgRef.current) imgRef.current.value = null;

            setOpenModal(false);
            setAllPosts(prev => [res.data.post, ...prev]);

            await displayPosts();
        } catch (err) {
            console.error(err);
        }
    };

    const [userData, setUserData] = useState(null);

    const displayUserData = async () => {
        setIsLoading(true);
        const response = await getUserData();
        setUserData(response.data.user);
        setIsLoading(false);
    };


    const getPostComments = () => {

    }



    function formatDateTime(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US');
        const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
        return `${formattedDate} ${formattedTime}`;
    }

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
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);


    return (
        <StoreContext.Provider value={{ token, setToken, getUserData, getallPosts, errorMsg, createPost, imgRef, textRef, openModal, setOpenModal, allPosts, formatDateTime, setAllPosts, displayPosts, setIsLoading, isLoading, displayUserData, userData, setUserData, likedPosts, setLikedPosts, toggleLike }}>
            {children}
        </StoreContext.Provider>
    )
}
