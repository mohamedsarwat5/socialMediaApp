import React, { useState } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
// import { toast } from 'react-toastify'
import * as yup from "yup"
export default function LoginAndRegister() {
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [activeForm, setActiveForm] = useState('singin')
    const [toast, setToast] = useState(false)
    const handelSignUp = (values, { resetForm }) => {
        axios.post(`${baseUrl}/users/signup`, values)
            .then((res) => {
                // toast.success('done')
                setToast(true);
                setTimeout(() => {
                    setToast(false);
                }, 2000)
                console.log(res.data.message)
                resetForm()
                setTimeout(() => {
                    setActiveForm('singin')
                }, 2000);
            })
            .catch((err) => {
                console.error(err.response?.data || err.message)
                toast.error(err.response?.data.error)
            })
    }
    const { handleSubmit, values, handleChange } = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: "",
            rePassword: "",
            dateOfBirth: '',
            gender: ""
        },
        onSubmit: handelSignUp
    })

    const handleSignIn = (values, { resetForm }) => {
        axios.post(`${baseUrl}/users/signin`, values)
            .then((res) => {
                toast.success(res.data?.message),
                    resetForm()
            })
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
        },
        onSubmit: handleSignIn
    })
    return (

        <div className='min-h-[100dvh] w-full pt-12 flex  flex-col hero px-5'>
            <p className={`text-white flex items-center gap-x-2 transition-all duration-200 absolute left-1/2 -translate-x-1/2  w-3/12 mx-auto p-4 rounded-2xl bg font-semibold ${toast ? 'block' : 'hidden'} `}><i className='fa-solid fa-circle-check text-xl'></i> Register successfully </p>
            <h1 className='text-4xl  font-black text-center mb-8 bg-clip-text text-transparent tracking-wider uppercase  bg-[linear-gradient(135deg,#ec4899_30%,#9333ea_100%)] '>Buzzly</h1>
            <div className='flex items-center justify-center w-full md:w-3/12 mx-auto mb-8  bg-white/10 rounded-full z-10'>
                <button onClick={() => setActiveForm('singin')} className={`w-full rounded-full ease-in-out transition-all duration-300 ${activeForm === 'singin' ? 'bg' : 'bg-transparent'} text-white py-3 px-4 cursor-pointer`}>Sign in</button>
                <button onClick={() => setActiveForm('register')} className={`w-full rounded-full ease-in-out transition-all duration-300 ${activeForm === 'register' ? 'bg' : 'bg-transparent'} text-white py-3 px-4 cursor-pointer`}> Register</button>
            </div>

            <div className='relative md:w-3/12 w-full mx-auto flex  z-10 min-h-[500px]  overflow-hidden'>
                {/* <h2 className='text-center mx-auto text-white text-2xl font-semibold '>{activeForm === 'singin'?"Login now":"Register now"}</h2> */}

                <div className={`space-y-3.5 absolute w-full   ease-in-out transition-all duration-300 ${activeForm === 'register' ? 'translate-x-0' : 'translate-x-[150%]'}`}>
                    <form onSubmit={handleSubmit} className=" ">
                        <div className="mb-5">
                            {/* <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label> */}
                            <input onChange={handleChange} value={values.name} type="text" name='name' id="name" className="placeholder:text-white text-white bg-transparent outline-none transition-all duration-300 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter your name" required />
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label> */}
                            <input onChange={handleChange} value={values.email} type="email" name='email' id="email" className="placeholder:text-white text-white bg-transparent outline-none transition-all duration-300 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter your Email" required />
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label> */}
                            <input onChange={handleChange} value={values.password} type="password" name='password' id="password" className="placeholder:text-white text-white bg-transparent outline-none transition-all duration-300 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter your password" required />
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label> */}
                            <input onChange={handleChange} value={values.rePassword} type="password" name='rePassword' id="rePassword" className="placeholder:text-white text-white bg-transparent outline-none transition-all duration-300 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="Enter your re-password" required />
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label> */}
                            <input onChange={handleChange} value={values.dateOfBirth} type="date" name='dateOfBirth' id="dateOfBirth" className=" border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder:text-white text-white bg-transparent outline-none transition-all duration-300" placeholder="Enter your Birthday" required />
                        </div>
                        <div className="mb-5 flex itec gap-2 text-white">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    className='accent-pink-500'
                                    checked={values.gender === "male"}
                                    onChange={handleChange}
                                />
                                Male
                            </label>
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    className='accent-pink-500'
                                    checked={values.gender === "female"}
                                    onChange={handleChange}
                                />
                                female
                            </label>
                        </div>
                        <button type="submit" className="text-white b font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center bg cursor-pointer">Submit</button>
                    </form>
                </div>
                <div className={`space-y-3.5 absolute w-full  ease-in-out  transition-all duration-300 ${activeForm === 'singin' ? "translate-x-0" : '-translate-x-[150%]'}`}>
                    {/* <h2 className='text-center text-white text-2xl font-semibold '>Sign in Now</h2> */}
                    <form className=' ' onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                            {/* <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label> */}
                            <input onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id="email" className="text-white border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-300 block w-full p-2.5 bg-transparent placeholder:text-white" placeholder="Enter your Email" required />
                        </div>
                        <div className="mb-5">
                            {/* <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label> */}
                            <input onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id="password" className="text-white border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-[linear-gradient(135deg, #ec4899 0%, #9333ea 100%)] outline-none transition-all duration-300 block w-full p-2.5 bg-transparent placeholder:text-white " placeholder="Enter your Password" required />
                        </div>
                        <button type="submit" className="text-white  cursor-pointer font-medium rounded-lg text-sm  block w-full px-5 py-2.5 text-center  bg">Login</button>
                    </form>
                </div>
            </div>



        </div>
    )
}
