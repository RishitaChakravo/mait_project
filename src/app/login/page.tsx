"use client"

import { useState } from "react"
import { Toaster } from "react-hot-toast"

export default function Login() {
    const [userInfo, setUserInfo] = useState<{email:string; password:string}>({
        email: "",
        password: ""
    })

    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-t from-blue-900 to-black">
            <p className="my-5 font-bold text-3xl tracking-widest">LOGIN</p>

            <div className="h-2 w-1/2 md:w-1/3 bg-gray-700 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-700"
                    style={{ width: "100%" }}
                ></div>
            </div>

            <div className="w-1/2 max-w-md mx-auto rounded-xl bg-white/5 flex flex-col justify-center px-10 py-8 space-y-6">
                <div className="space-y-1">
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={userInfo.email}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        className="bg-black/30 rounded-lg w-full px-2 py-1"
                    />
                </div>

                <div className="space-y-1">
                    <label>Password</label>
                    <input
                        type="password"
                        value={userInfo.password}
                        onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                        placeholder="Enter your password"
                        className="bg-black/30 rounded-lg w-full px-2 py-1"
                    />
                </div>

                <div className="flex justify-between items-center">
                    <button
                        className="mx-auto my-2 px-7 py-1 rounded-xl text-lg font-semibold text-white bg-black/50
                        hover:cursor-pointer transition-all duration-500 transform
                        hover:-translate-y-2 hover:scale-105 hover:bg-blue-600
                        shadow-md shadow-black/60 hover:shadow-blue-500/40"
                    >
                        Login
                    </button>
                </div>
            </div>
            <p className="text-sm mt-2">Don't have an account. <a href="/signup" className="text-blue-500 underline">SignUp</a></p>
            <Toaster position="bottom-right" />
        </div>
    )
}
