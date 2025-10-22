"use client"
import axios from "axios";
import Link from "next/link";

export default function NavBar({loggedIn}: {loggedIn: boolean}) {
    const logout = async() => {
        try {
            const response = axios.post('/api/logout', {withCredentials:true})
            console.log(response)
        } catch (error) {
            console.log("Error while logging out: ",error)         
        }
    }
    return (<div className="fixed border flex justify-between z-50 w-[70%] shadow-black shadow-2xl bg-white px-4 py-2 left-1/2 -translate-x-1/2 rounded-4xl top-10 items-center">
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400">
            MedWin
        </p>
        <div className="space-x-3">
            <Link href="/signup">
                <button className="px-4 py-2 rounded-full border border-gray-300 text-gray-700 hover:bg-gray-100 transition">
                    Signup
                </button>
            </Link>
            <Link href="/login">
                <button className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:opacity-90 transition">
                Login
            </button>
            </Link>
            {
                loggedIn && <button onClick={logout}>
                    Logout
                </button>
            }
        </div>
    </div>)
}