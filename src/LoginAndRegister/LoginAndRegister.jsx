import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Formik, useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../StoreProvider'
import Logo from '../Logo'
import { toast } from 'react-toastify'

export default function LoginAndRegister() {
    const { Token, setToken } = useContext(StoreContext)
    const baseUrl = import.meta.env.VITE_BASE_URL
    const [activeForm, setActiveForm] = useState('singin')
    const [tooast, setTooast] = useState(false)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const handelSignUp = (values, { resetForm }) => {
        setIsLoading(true)
        axios.post(`${baseUrl}/users/signup`, values)
            .then((res) => {
                // toast.success('done')
                setTooast(true);
                setTimeout(() => {
                    setTooast(false);
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
            }).finally(() => {
                setIsLoading(false)
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
        setIsLoading(true)
        axios.post(`${baseUrl}/users/signin`, values)
            .then((res) => {
                resetForm()
                console.log("hello")
                if (res.data.message === 'success') {
                    setToken(res.data.token)
                    localStorage.setItem('token', res.data.token)
                    navigate('/home')
                }
            }).catch((err) => {
                toast.error(err.response?.data.error)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const routing = () => {
        if (localStorage.getItem('token')) {
            navigate('/home')
        }
    }
    useEffect(() => {
        routing()
    }, [])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: "",
        },
        onSubmit: handleSignIn
    })
    return (

        <div className='min-h-[100dvh] w-full pt-12 flex  flex-col bg-bg-hero px-5'>
            <p className={`text-white flex items-center gap-x-2 transition-all duration-200 absolute left-1/2 -translate-x-1/2 w-11/12  md:w-3/12 mx-auto p-4 rounded-2xl bg font-semibold top-8 ${tooast ? 'block' : 'hidden'} `}><i className='fa-solid fa-circle-check text-xl'></i> Register successfully </p>
            <Logo className={'text-center text-4xl mb-8 bg-clip-text text-transparent bg-[linear-gradient(135deg,#ec4899_30%,#9333ea_100%)]'} />
            <div className='border border-gray-500 flex items-center justify-center w-full md:w-3/12 mx-auto mb-8  bg-white/40 rounded-full z-10'>
                <button onClick={() => setActiveForm('singin')} className={`w-full rounded-full ease-in-out transition-all duration-300 ${activeForm === 'singin' ? 'bg text-white' : 'bg-transparent'} text-text-color py-3 px-4 cursor-pointer`}>Sign in</button>
                <button onClick={() => setActiveForm('register')} className={`w-full rounded-full ease-in-out transition-all duration-300 ${activeForm === 'register' ? 'bg text-white' : 'bg-transparent'} text-text-color py-3 px-4 cursor-pointer`}> Register</button>
            </div>

            <div className='relative md:w-3/12 w-full mx-auto flex    z-10 !min-h-[500px]  overflow-hidden'>
                {/* <h2 className='text-center mx-auto text-text-color text-2xl font-semibold '>{activeForm === 'singin'?"Login now":"Register now"}</h2> */}

                <div className={`space-y-3.5 absolute w-full   ease-in-out transition-all duration-300 ${activeForm === 'register' ? 'translate-x-0' : 'translate-x-[150%]'}`}>
                    <form onSubmit={handleSubmit} className=" ">
                        <div className="mb-5">

                            <input onChange={handleChange} value={values.name} type="text" name='name' id="name" className="placeholder:text-text-color text-text-color bg-transparent outline-none transition-all duration-300 border border-text-color  text-sm rounded-lg focus:ring-pink focus:border-pink block w-full p-2.5 " placeholder="Name" required />
                        </div>
                        <div className="mb-5">

                            <input onChange={handleChange} value={values.email} type="email" name='email' id="email" className="placeholder:text-text-color text-text-color bg-transparent outline-none transition-all duration-300 border border-text-color  text-sm rounded-lg focus:ring-pink focus:border-pink block w-full p-2.5 " placeholder="Email address" required />
                        </div>
                        <div className="mb-5">
                            <input onChange={handleChange} value={values.password} type="password" name='password' id="password" className="placeholder:text-text-color text-text-color bg-transparent outline-none transition-all duration-300 border border-text-color  text-sm rounded-lg focus:ring-pink focus:border-pink block w-full p-2.5 " placeholder="Password" required />
                        </div>
                        <div className="mb-5">

                            <input onChange={handleChange} value={values.rePassword} type="password" name='rePassword' id="rePassword" className="placeholder:text-text-color text-text-color bg-transparent outline-none transition-all duration-300 border border-text-color  text-sm rounded-lg focus:ring-pink focus:border-pink block w-full p-2.5 " placeholder="Confirm password" required />
                        </div>
                        <div className="mb-5 relative">
                            {!values.dateOfBirth && (
                                <span className='text-text-color absolute left-3 top-2 pointer-events-none md:hidden'>Date of Birth</span>
                            )}
                            <input onChange={handleChange} value={values.dateOfBirth} type="date" name='dateOfBirth' id="dateOfBirth" className=" border border-text-color  text-sm rounded-lg focus:ring-pink focus:border-pink block w-full  p-2.5  text-text-color bg-transparent outline-none transition-all duration-300" required />

                        </div>
                        <div className="mb-5 flex itec gap-2 text-text-color">
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
                        <button disabled={isLoading} type="submit" className={`text-white flex items-center justify-center cursor-pointer font-medium rounded-lg text-sm   w-full px-5 py-2.5 text-center ${isLoading ? "bg-disabled" : "bg"} `}>{isLoading ? <div className=" bg-transparent border-white border-2 animate-spin rounded-full border-t-transparent w-6 h-6"></div> : 'Register'}</button>
                    </form>
                </div>
                <div className={`space-y-3.5 absolute w-full  ease-in-out  transition-all duration-300 ${activeForm === 'singin' ? "translate-x-0" : '-translate-x-[150%]'}`}>
                    {/* <h2 className='text-center text-text-color text-2xl font-semibold '>Sign in Now</h2> */}
                    <form className=' ' onSubmit={formik.handleSubmit}>
                        <div className="mb-5">

                            <input onChange={formik.handleChange} value={formik.values.email} type="email" name='email' id="email" className="text-text-color border border-text-color  text-sm rounded-lg focus:ring-pink focus:border-pink outline-none transition-all duration-300 block w-full p-2.5 bg-transparent placeholder:text-text-color" placeholder="Email address" required />
                        </div>
                        <div className="mb-5">

                            <input onChange={formik.handleChange} value={formik.values.password} type="password" name='password' id="password" className="text-text-color border border-text-color  text-sm rounded-lg focus:ring-pink focus:border-pink outline-none transition-all duration-300 block w-full p-2.5 bg-transparent placeholder:text-text-color " placeholder="Password" required />
                        </div>
                        <button disabled={isLoading} type="submit" className={`text-white flex items-center justify-center cursor-pointer font-medium rounded-lg text-sm   w-full px-5 py-2.5 text-center ${isLoading ? "bg-disabled" : "bg"} `}>{isLoading ? <div className=" bg-transparent border-white border-2 animate-spin rounded-full border-t-transparent w-6 h-6"></div> : 'Login'}</button>
                    </form>
                </div>
            </div>



        </div>
    )
}
