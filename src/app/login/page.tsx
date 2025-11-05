"use client";

import { loginUser } from "@/api/api";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login (){
    const [form, setForm] = useState({email: "", password: ""});
    
    const handleChange = (e: { target: { name: any; value: any; }; })=> setForm({ ...form, [e.target.name]: e.target.value });
    
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        const router = useRouter();
        e.preventDefault();
        const res = await loginUser(form);
        if (res.token){
            console.log("token",res.token);
            
            localStorage.setItem("token", res.token);
            router.push("/dashboard");
        }else {
            alert(res.message || "Login failed");
        }
    };
    return(
        <>
        <Navbar />
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold text-teal-700 mb-4">Login</h1>
            <form onSubmit={handleSubmit}  className="w-80 space-y-4">
                <input type="email" name="email" placeholder="Email" className="border w-full p-2" onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" className="border w-full p-2" onChange={handleChange} />
                <button className="bg-teal-600 text-white w-full p-2 rounded">Login</button>
            </form>
        </div>
        </>
    );
} 