import React, { createContext, useEffect, useState } from 'react'

export const StoreContext = createContext()

export default function StoreProvider({ children }) {

    const [Token, setToken] = useState(null)
    useEffect(() => {
        const TokenLocalStorage = localStorage.getItem('token')
        if (TokenLocalStorage) {
            setToken(TokenLocalStorage)
            
        }
    })

    return (
        <StoreContext.Provider value={{ Token, setToken }}>
            {children}
        </StoreContext.Provider>
    )
}
