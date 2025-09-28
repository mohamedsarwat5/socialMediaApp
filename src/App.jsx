
import React from 'react'
import LoginAndRegister from './LoginAndRegister/LoginAndRegister'
import { ToastContainer } from 'react-toastify'





export default function App() {



  return (<>

      <LoginAndRegister/>
      <ToastContainer position='top-center' toastClassName="bg-black text-white rounded-xl shadow-lg"/>
  </>
  )
}
