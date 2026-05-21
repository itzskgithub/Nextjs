"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    

    const onSignup = async () => {
        try {
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup success", response.data);
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed", error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if(user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">
                    Create Account
                </h1>

                {/* Username */}
                <div className="relative mb-6">
                    <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-gray-600 capitalize">
                        Username
                    </label>
                    <input
                        type="text"
                        value={user.username}
                        onChange={(e) =>
                            setUser({ ...user, username: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-gray-700"
                    />
                </div>

                {/* Email */}
                <div className="relative mb-6">
                    <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-gray-600 capitalize">
                        Email
                    </label>
                    <input
                        type="email"
                        value={user.email}
                        onChange={(e) =>
                            setUser({ ...user, email: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-gray-700"
                    />
                </div>

                {/* Password */}
                <div className="relative mb-6">
                    <label className="absolute -top-3 left-3 bg-white px-1 text-sm text-gray-600 capitalize">
                        Password
                    </label>
                    <input
                        type="password"
                        value={user.password}
                        onChange={(e) =>
                            setUser({ ...user, password: e.target.value })
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-gray-700"
                    />
                </div>

                {/* Button */}
                <button
                    onClick={onSignup}
                    className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
                >
                    {buttonDisabled ? "Pahle details bhar" : "Ab sign up karle"}
                </button>

                {/* Link */}
                <p className="text-center mt-4 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}