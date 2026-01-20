// import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// export default function LoginPage() {
//     const navigate = useNavigate
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [errors, setErrors] = useState({ email: false, password: false })

import { useState } from "react";
import { Navigate } from "react-router-dom"

//     const handleSubmit = (e) => {
//         e.preventDefault()
//         // Validate email and password
//         const newErrors = {
//             email: !email.includes('@') || email.trim() === '', // simple validation
//             password: password.trim() === '',
//         }
//         setErrors(newErrors)

//         // submission  errors
//         if (!newErrors.email && !newErrors.password) {
//             navigate('/')
//         }
//     }
//     // const handleSubmit = (e) => {
//     //     e.preventDefault();
//     //     // Validate email and password
//     //     const newErrors = {
//     //         email: !email.includes('@') || email.trim() === '', // simple validation
//     //         password: password.trim() === '',
//     //     }
//     //     setErrors(newErrors)

//     //     if (!newErrors.email && !newErrors.password) {
//     //         navigate("/");
//     //     }
//     // };

//     return (
//         <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
//             {/* Card */}
//             <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
//                 <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

//                 <form onClick={handleSubmit}>
//                     {/* Email field */}
//                     <div className="mb-4 text-left">
//                         <label htmlFor="email" className="block text-sm font-medium text-gray-900 ">
//                             Email
//                         </label>
//                         <div className="mt-1 relative">
//                             <input
//                                 id="email"
//                                 name="email"
//                                 type="email"
//                                 placeholder="you@example.com"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className={` block w-full rounded-md border ${errors.email ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300 text-gray-900'
//                                     } bg-white py-2 px-3 pr-10 focus:outline-none focus:ring-2 ${errors.email ? 'focus:ring-red-600' : 'focus:ring-indigo-500'
//                                     } sm:text-sm`}
//                             />
//                             {errors.email && (
//                                 <ExclamationCircleIcon
//                                     className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500"
//                                     aria-hidden="true"
//                                 />
//                             )}
//                         </div>
//                         {errors.email && (
//                             <p className="mt-2 text-sm text-red-600" id="email-error">
//                                 Please Enter Valid Email
//                             </p>
//                         )}
//                     </div>

//                     {/* Password field */}
//                     <div className="mb-6 text-left">
//                         <label htmlFor="password" className="block text-sm font-medium text-gray-900">
//                             Password
//                         </label>
//                         <div className="mt-1 relative">
//                             <input
//                                 id="password"
//                                 name="password"
//                                 type="password"
//                                 placeholder="Enter your password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className={`block w-full rounded-md border ${errors.password ? 'border-red-300 text-red-900 placeholder-red-300' : 'border-gray-300 text-gray-900'
//                                     } bg-white py-2 px-3 pr-10 focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-600' : 'focus:ring-indigo-500'
//                                     } sm:text-sm`}
//                             />
//                             {errors.password && (
//                                 <ExclamationCircleIcon
//                                     className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-red-500"
//                                     aria-hidden="true"
//                                 />
//                             )}
//                         </div>
//                         {errors.password && (
//                             <p className="mt-2 text-sm text-red-600" id="password-error">
//                                 Password is required.
//                             </p>
//                         )}
//                     </div>

//                     {/* Sign in button */}
//                     <button
//                         type="submit"

//                         className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
//                     >
//                         Sign In
//                     </button>
//                 </form>
//             </div>
//         </div>
//     )
// }




import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../utils/AuthContext";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { signIn } = useAuth();



    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/api/login", {
                email,
                password,
            });

            if (res.data.success) {
                console.log("Login successful", res.data);
                console.log("LOGIN SUCCESS BLOCK HIT");
                console.log("Token:", res.data.token);
                // save token 
                localStorage.setItem("token", res.data.token);
                // ✅ VERY IMPORTANT
                signIn({
                    email,
                    token: res.data.token,
                });
                // redirect
                navigate("/");
            } else {
                // alert(res.data.message);
            }

        } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
            // alert("Invalid email or password");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            {/* Card */}
            <div className="w-full max-w-md bg-white shadow-md rounded-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

                <form onSubmit={handleLogin}>
                    {/* Email field */}
                    <div className="mb-4 text-left">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-900 ">
                            Email
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className={` block w-full rounded-md border  bg-white py-2 px-3 pr-10 focus:outline-none focus:ring-2  sm:text-sm`}
                            />

                        </div>

                    </div>

                    {/* Password field */}
                    <div className="mb-6 text-left">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                            Password
                        </label>
                        <div className="mt-1 relative">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className={`block w-full rounded-md border  bg-white py-2 px-3 pr-10 focus:outline-none focus:ring-2  sm:text-sm`}
                            />

                        </div>

                    </div>

                    {/* Sign in button */}
                    <button
                        type="submit"

                        // onClick={handleLogin}
                        className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    )
}
