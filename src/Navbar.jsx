import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { StoreContext } from './StoreProvider'

export default function Navbar() {
    const {setToken} = useContext(StoreContext)
    const logout = ()=>{
        localStorage.removeItem('token')
    }
    return (
        <div className='w-full p-4 bg-indigo-700 text-white '>
            <h2>brand</h2>

            <div className='space-x-5'>
                <NavLink to={'/home'}>Home</NavLink>
                <NavLink to={'/home/profile'}>Profile</NavLink>
                <NavLink onClick={logout} to={'/'}> logout</NavLink>
            </div>
        </div>
    )
}
