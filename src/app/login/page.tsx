"use client";

import { loginUser } from "@/api/api";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login (){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password
        };
        const res = await loginUser(data);
        if (res.token){
            console.log("token",res.token);
            
            localStorage.setItem("token", res.token);
            localStorage.setItem("role",res.user.role);

            const userRole = localStorage.getItem("role");
            if(userRole == "organizer"){
                router.push("/organizer/dashboard");
            } else if(userRole == "volunteer"){
                router.push("/dashboard");
            }
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
                <input type="email" name="email" placeholder="Email" className="border w-full p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" name="password" placeholder="Password" className="border w-full p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="bg-teal-600 text-white w-full p-2 rounded">Login</button>
            </form>
        </div>
        </>
    );
}