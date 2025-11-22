
// export default function Settings() {
//   return (
//     <div className='min-h-dvh flex flex-col items-center p-4 bg-bg-hero'>
//         <h2 className='text-3xl font-semibold text-text-color'>Change your password</h2>
//     </div>
//   );
// }




import React, { useState, useRef, useContext } from "react";
import { Check, X, Eye, EyeOff } from "lucide-react";
import './settings.css';
import { StoreContext } from "./StoreProvider";
import { NavLink } from "react-router-dom";

export default function Settings() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const { isLoading } = useContext(StoreContext);

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
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  return (
    <div className='min-h-dvh flex flex-col items-center px-4 py-19 bg-bg-hero relative'>
      <NavLink to={'/home'} className={'absolute left-4 top-4 z-10  bg-bg-hero w-10 h-10 flex items-center justify-center rounded-full'}>
        <i className="fa-solid fa-arrow-left text-black dark:text-white"></i>
      </NavLink>
      <h2 className='text-3xl font-semibold text-text-color'>Change your password</h2>

      <div className="space-y-3  max-w-lg p-4 mx-auto w-full">
        {/* <label className="text-sm font-medium text-gray-700">New password</label> */}

        <div className="relative space-y-2">

          <form action="">
            <label className="text-sm font-medium text-text-color">Current password</label>
            <input type="password"
              className="w-full text-text-color border-gray-300 rounded-md px-3 py-2 text-base outline-none pr-10 border-2 focus:border-pink transition-all duration-300 mt-1"
              placeholder="Current password" />

            <div className="mt-4">
              <label className="text-base font-medium text-text-color">New password</label>
              <div className="relative">
                <input
                  ref={inputRef}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New password"
                  className="w-full text-text-color border-gray-300 rounded-md px-3 py-2 text-base outline-none pr-10 border-2 focus:border-pink transition-all duration-300 mt-1"
                />

                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-all duration-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button type="submit" className={`text-white flex items-center justify-center cursor-pointer font-medium rounded-lg text-sm   w-full px-5 py-2.5 text-center mt-4 ${isLoading ? "bg-disabled" : "bg"}`}>Change Password</button>
          </form>
        </div>

        {/* Show rules ONLY when focused AND not completed */}
        {focused && !completed && (
          <div className="space-y-1 mt-2 ">
            {rules.map((rule, i) => {
              const ok = rule.test(password);
              return (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {ok ? (
                    <Check className="text-green-500" size={18} />
                  ) : (
                    <X className="text-red-500" size={18} />
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