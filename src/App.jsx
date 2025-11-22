
import React from 'react'
import LoginAndRegister from './LoginAndRegister/LoginAndRegister'
import { ToastContainer } from 'react-toastify'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import StoreProvider from './StoreProvider'
import Home from './Home'
import Layout from './Layout'
import MyProfile from './MyProfile'
import ProtectedRouting from './ProtectedRouting'
import SinglePost from './SinglePost'
import Settings from './Settings'





export default function App() {

  const router = createBrowserRouter([
    {
      path: '/', element: <LoginAndRegister></LoginAndRegister>,
    },
    {
      path: "/home", element: (<ProtectedRouting><Layout /></ProtectedRouting>), children: [
        { index: true, element: <Home /> },
        { path: 'profile', element: <MyProfile /> },
        { path: 'post/:id', element: <SinglePost /> },
        { path: 'settings', element: <Settings /> },

      ]
    }
  ])


  return (<>
    <StoreProvider>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer position='top-center' toastClassName="bg-black text-white rounded-xl shadow-lg" />
    </StoreProvider>
  </>
  )
}
