"use client";

import Navbar from "@/components/navbar";

export default function Login (){
    return(
        <>
        <Navbar />
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold text-teal-700 mb-4">Login</h1>
            <form  className="w-80 space-y-4">
                <input type="email" name="email" placeholder="Email" className="border w-full p-2" />
                <input type="password" name="password" placeholder="Password" className="border w-full p-2" />
                <button className="bg-teal-600 text-white w-full p-2 rounded">Login</button>
            </form>
        </div>
        </>
    );
}