"use client";
import {useParams} from "next/navigation";
export default function UserProfile(){
    const param = useParams();
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-2xl">profile page: <span className="p-2 rounded bg-orange-500 text-black">{param.id}</span></p>
        </div>
    )
}