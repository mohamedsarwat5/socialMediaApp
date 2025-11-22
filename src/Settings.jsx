import React, { useState, useRef, useContext } from "react";
import { Check, X, Eye, EyeOff } from "lucide-react";
import './settings.css';
import { StoreContext } from "./StoreProvider";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const newPassword = useRef(null);
  const currentPassword = useRef(null);
  const { isLoading, setIsLoading, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const rules = [
    { test: (p) => p.length >= 8, label: "Must be at least 8 characters" },
    { test: (p) => /[A-Z]/.test(p), label: "Must contain at least one uppercase letter (A–Z)" },
    { test: (p) => /[a-z]/.test(p), label: "Must contain at least one lowercase letter (a–z)" },
    { test: (p) => /[0-9]/.test(p), label: "Must contain at least one number" },
    { test: (p) => /[^A-Za-z0-9]/.test(p), label: "Must contain at least one special character" },
  ];

  const completed = rules.every((r) => r.test(password));

  const toggleVisibility = () => {
    setShowPassword((v) => !v);
    setTimeout(() => newPassword.current?.focus(), 0);
  };

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const changePassword = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const values = {
      "password": currentPassword.current.value,
      "newPassword": newPassword.current.value
    }
    axios.patch(`${baseUrl}/users/change-password`, values, {
      headers: {
        token: localStorage.getItem('token')
      }
    }).then((response) => {
      toast.success('Password changed successfully');
      currentPassword.current.value = '';
      newPassword.current.value = '';
      localStorage.removeItem('token');
      setToken(null);        // مهم جدا
      navigate('/', { replace: true });

    })
      .catch((error) => {
        toast.error("Invalid current password");
      }).finally(() => {
        setIsLoading(false);
      })
  }
  const [showWarning, setShowWarning] = useState(false);

  const showWarningDialog = () => {
    if (currentPassword.current.value === '' || newPassword.current.value === '') {
      toast.error('Please fill in all fields');
    }
    else {
      setShowWarning(prev => !prev);
    }
  }


  return (
    <div className='min-h-dvh flex flex-col items-center px-4 py-19 bg-bg-hero relative'>
      <div className={"absolute inset-0 bg-bg-hero flex items-center justify-center z-20 p-4" + (showWarning ? " block" : " hidden")}>

        <div className="border border-pink p-5 rounded-lg relative max-w-lg w-full" >
          <button onClick={() => setShowWarning(prev => !prev)} className="absolute right-3 top-3 text-sm cursor-pointer">
            <i className="fa-solid fa-xmark text-text-color"></i>
          </button>
          <h2 className=" mb-7 font-semibold text-lg text-text-color">Warning!</h2>
          <p className="text-center text-text-color">Changing your password will log you out of all devices.</p>
          <div className="flex items-center space-x-3 justify-end w-full mt-12">
            <button onClick={() => setShowWarning(prev => !prev)} className="px-4 py-2 rounded-md border cursor-pointer text-text-color border-text-color">Cancel</button>
            <button onClick={(e) => changePassword(e)} className={`bg text-white px-4 py-2 rounded-md cursor-pointer`}>
              {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Continue'}
            </button>
          </div>
        </div>

      </div>
      <NavLink to={'/home'} className={'absolute left-4 top-4 z-10  bg-bg-hero w-10 h-10 flex items-center justify-center rounded-full'}>
        <i className="fa-solid fa-arrow-left text-black dark:text-white"></i>
      </NavLink>
      <h2 className='text-3xl font-semibold text-text-color'>Change your password</h2>

      <div className="space-y-3  max-w-lg p-4 mx-auto w-full">
        {/* <label className="text-sm font-medium text-gray-700">New password</label> */}

        <div className="relative space-y-2">

          <form onSubmit={(e) => e.preventDefault()}>
            <label className="text-sm font-medium text-text-color">Current password</label>
            <input type="password"
              required
              autoComplete="current-password"
              ref={currentPassword}
              className="w-full text-text-color border-gray-300 rounded-md px-3 py-2 text-base outline-none pr-10 border-2 focus:border-pink transition-all duration-300 mt-1"
              placeholder="Current password" />

            <div className="mt-4">
              <label className="text-base font-medium text-text-color">New password</label>
              <div className="relative">
                <input
                  required
                  autoComplete="new-password"
                  ref={newPassword}
                  type={showPassword ? "text" : "password"}
                  // value={newPassword.current?.value}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full text-text-color border-gray-300 rounded-md px-3 py-2 text-base outline-none pr-10 border-2 focus:border-pink transition-all duration-300 mt-1"
                />

                <button

                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all theEye duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button onClick={showWarningDialog} type="button" className={`text-white flex items-center justify-center cursor-pointer font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center mt-4 bg`}>Change Password</button>
          </form>
        </div>

{/* div not will be happen */}
        {/* Show rules ONLY when focused AND not completed */}
        {focused && !completed && (
          <div className="space-y-1 mt-2 ">
            {rules.map((rule, i) => {
              const ok = rule.test(password);
              return (
                <div key={i} className="flex items-center gap-2 text-sm whitespace-nowrap">
                  {ok ? (
                    <Check className="text-green-500 shrink-0" size={18} />
                  ) : (
                    <X className="text-red-500 shrink-0" size={18} />
                  )}

                  <span className={ok ? "text-green-600" : "text-red-600"}>
                    {rule.label}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}