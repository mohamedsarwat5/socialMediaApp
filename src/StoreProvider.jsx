import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext()

export default function StoreProvider({ children }) {

    const baseUrl = import.meta.env.VITE_BASE_URL


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


    return (
        <StoreContext.Provider value={{ token, setToken, getUserData ,getallPosts}}>
            {children}
        </StoreContext.Provider>
    )
}
