"use client";
import Link from "next/link";
import React, {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage(){
    const router = useRouter();

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);

    const onLogin = async() => {
        try {
            const response = await axios.post("/api/users/login", user);
            console.log("login success", response.data);
            toast.success("login success");
            router.push("/profile")
        } catch (error: any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0){
            setButtonDisabled(false);
        }
        else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-900">Login</h1>

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
                    onClick={onLogin}
                    className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition"
                >Login</button>

                {/* Link */}
                <p className="text-center mt-4 text-sm text-black">
                    New User?{" "}
                    <Link href="/signup"
                    className="text-blue-500 hover:underline">Signup</Link>
                </p>
            </div>
        </div>
            
    );
}