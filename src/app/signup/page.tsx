"use client"
import { useState } from "react"
import { User } from "../components/interface";
import toast, { Toaster } from "react-hot-toast"
import axios from "axios"
import { useRouter } from "next/navigation";

export default function Signup() {
    const router = useRouter()
    const [step, setStep] = useState(1);
    const [user, setUser] = useState<User>({
        name: "",
        age: 0,
        gender: "",
        email: "",
        password: ""
    });
    const [confirmPass, setConfirmPass] = useState("")

    const submit = async () => {
        if (user.password !== confirmPass) {
            toast.error("Incorrect Password-Password doesn't match")
            console.log("Incorrect password")
            return
        }

        try {
            const response = await axios.post("/api/signup", {
                name: user.name,
                age: user.age,
                password: user.password,
                email: user.email,
                gender: user.gender
            })
            console.log("SignedIn", response.data)
            toast.success("Signed In")
        } catch (error) {
            console.log("Couldnt Sign in", error)
            toast.error("Couldnt Sign in-Server error or invalid info entered")
        } finally {
            setUser({
                name: "",
                age: 0,
                gender: "",
                email: "",
                password: ""
            })
            router.push('/')
        }
    }
    return (
        <div className="flex flex-col justify-center items-center h-screen w-screen bg-gradient-to-t from-blue-900 to-black">
            <p className="my-5 font-bold text-3xl tracking-widest">SIGN UP</p>
            <div className="h-2 w-1/2 md:w-1/3 bg-gray-700 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 transition-all duration-700"
                    style={{ width: step === 1 ? "50%" : "100%" }}
                ></div>
            </div>
            <div className="overflow-hidden w-1/2 max-w-md mx-auto">
                <div className="flex w-[200%] transition-transform duration-700 ease-in-out"
                    style={{ transform: step === 1 ? "translateX(0%)" : "translateX(-50%)" }}>
                    <div className="w-1/2 rounded-xl bg-white/5 flex flex-col justify-center pb-5">
                        <div className="space-y-5 px-10 py-5">
                            <div className="space-y-1">
                                <label>Name</label>
                                <input
                                    type="text"
                                    value={user.name}
                                    placeholder="Enter your name"
                                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                                    className="bg-black/30 rounded-lg w-full px-1 py-1" />
                            </div>
                            <div className="space-y-1">
                                <label>Email</label>
                                <input
                                    type="email"
                                    value={user.email}
                                    placeholder="Enter you email"
                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                    className="bg-black/30 rounded-lg w-full px-1 py-1" />
                            </div>
                            <div className="space-y-1">
                                <label>Gender</label>
                                <select
                                    value={user.gender}
                                    onChange={(e) => setUser({ ...user, gender: e.target.value })}
                                    className="bg-black/30 block rounded-lg px-1 py-1 w-full">
                                    <option value="">Select Gender</option>
                                    <option value="F">F</option>
                                    <option value="M">M</option>
                                    <option value="O">Other</option>
                                </select>
                            </div>
                            <div className="space-y-1">
                                <label>Age</label>
                                <input
                                    type="number"
                                    value={user.age}
                                    onChange={(e) => setUser({ ...user, age: Number(e.target.value) })}
                                    className="bg-black/30 rounded-lg w-full px-1 py-1" />
                            </div>
                        </div>
                        <button
                            className="mx-auto my-2 px-7 py-1 rounded-xl text-lg font-semibold text-white bg-black/50 
                            hover:cursor-pointer transition-all duration-500 transform 
                            hover:-translate-y-2 hover:scale-105 hover:bg-blue-600 
                            shadow-md shadow-black/60 hover:shadow-blue-500/40"
                            onClick={() => setStep(step === 1 ? 2 : 1)}
                        >
                            {step === 1 ? "Next" : "Back"}
                        </button>

                    </div>
                    <div className="w-1/2 rounded-xl bg-white/5 flex flex-col justify-center pb-5 px-5 space-y-2">
                        <div className="space-y-2 mt-4 text-sm text-gray-300">
                            <p>Password must include:</p>
                            <ul className="list-disc list-inside ml-2">
                                <li>At least 8 characters</li>
                                <li>At least one uppercase letter (A-Z)</li>
                                <li>At least one lowercase letter (a-z)</li>
                                <li>At least one number (0-9)</li>
                                <li>At least one special character (!@#$%^&*)</li>
                                <li>No spaces</li>
                            </ul>
                        </div>
                        <div className="space-y-1">
                            <label>Password : </label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                                className="bg-black/30 rounded-lg w-full px-1 py-1"
                            />
                        </div>
                        <div className="space-y-1">
                            <label>Confirm Password : </label>
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPass}
                                onChange={(e) => setConfirmPass(e.target.value)}
                                className="bg-black/30 rounded-lg w-full px-1 py-1"
                            />
                        </div>
                        <div className="flex justify-between items-center">
                            <button
                                className="my-2 px-7 py-1 rounded-xl text-lg font-semibold text-white bg-black/50 
                            hover:cursor-pointer transition-all duration-500 transform 
                            hover:-translate-y-2 hover:scale-105 hover:bg-blue-600 
                            shadow-md shadow-black/60 hover:shadow-blue-500/40"
                                onClick={() => setStep(step === 1 ? 2 : 1)}>{step === 1 ? "Next" : "Back"}</button>
                            <button
                                className="my-2 px-7 py-1 rounded-xl text-lg font-semibold text-white bg-black/50 
                            hover:cursor-pointer transition-all duration-500 transform 
                            hover:-translate-y-2 hover:scale-105 hover:bg-blue-600 
                            shadow-md shadow-black/60 hover:shadow-blue-500/40"
                                onClick={submit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-sm mt-2">Already have an account. <a href="/login" className="text-blue-500 underline">Login</a></p>
            <Toaster
                position="bottom-right"
            ></Toaster>
        </div>
    )
}