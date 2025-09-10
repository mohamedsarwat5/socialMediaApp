import React, { useState } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import { toast } from 'react-toastify'
export default function LoginAndRegister() {

    const [activeForm, setActiveForm] = useState('singin')
    const handelSignUp = (values, { resetForm }) => {
        axios.post("https://linked-posts.routemisr.com/users/signup", values)
            .then((res) => {
                toast.success('done')
                console.log(res.data.message)
                resetForm()
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

    const handleSignIn = (values, {resetForm}) => {
        axios.post('https://linked-posts.routemisr.com/users/signin', values)
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
        <div className='min-h-[100dvh] w-full py-12 flex  flex-col bg-rose-950 px-5'>

            <div className='flex items-center justify-center gap-6 mb-8'>
                <button onClick={() => setActiveForm('singin')} className={`transition-all duration-300 ${activeForm === 'singin'?'bg-rose-500':'bg-transparent'} text-white py-2 px-4 rounded-xl cursor-pointer`}>Sign in</button>
                <button onClick={() => setActiveForm('register')} className={`transition-all duration-300 ${activeForm === 'register'?'bg-rose-500':'bg-transparent'} text-white py-2 px-4 rounded-xl cursor-pointer`}> Register</button>
            </div>

            <div className='relative md:w-3/12 w-full mx-auto flex   h-[600px] overflow-hidden'>

                <div className={`space-y-3.5 absolute w-full  transition-all duration-300 ${activeForm === 'register' ? 'translate-x-0' : 'translate-x-[150%]'}`}>
                    <h2 className='text-center text-white text-2xl font-semibold '>Register Now</h2>
                    <form onSubmit={handleSubmit} className=" ">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input onChange={handleChange} value={values.name} type="text" name='name' id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="your name" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input onChange={handleChange} value={values.email} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="your email" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input onChange={handleChange} value={values.password} type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="your password" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="rePassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input onChange={handleChange} value={values.rePassword} type="password" name='rePassword' id="rePassword" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="your rePassword" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="dateOfBirth" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input onChange={handleChange} value={values.dateOfBirth} type="date" name='dateOfBirth' id="dateOfBirth" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="your dateOfBirth" required />
                        </div>
                        <div className="mb-5 flex itec gap-2 text-white">
                            <label className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
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
                                    checked={values.gender === "female"}
                                    onChange={handleChange}
                                />
                                female
                            </label>
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
                <div className={`space-y-3.5 absolute w-full transition-all duration-300 ${activeForm === 'singin' ? "translate-x-0" : '-translate-x-[150%]'}`}>
                    <h2 className='text-center text-white text-2xl font-semibold '>Sign in Now</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="your email" required />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                            <input onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="your password" required />
                        </div>
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>



        </div>
    )
}
