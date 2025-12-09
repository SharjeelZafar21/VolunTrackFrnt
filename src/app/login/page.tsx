"use client";

import { loginUser } from "@/api/api";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login (){
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    const showToast = (type: string, message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 2500);
    };
    
    const handleSubmit = async (e: any) => {
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

            showToast("success", "Login successful!");

            const userRole = localStorage.getItem("role");
            if(userRole == "organizer"){
                setTimeout(() => router.push("/organizer/dashboard"), 2000);
            } else if(userRole == "volunteer"){
                setTimeout(() => router.push("/dashboard"), 2000);
            }
        }else {
            showToast("error", res.message || "Login failed!");
        }
    };
    return(
        <>
        <Navbar />
        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold text-teal-700 mb-4">Login</h1>
            <form onSubmit={handleSubmit}  className="w-80 space-y-4">
                {/* Email */}
                <div>
                    <label className="font-semibold">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full border p-2 rounded mt-1"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                {/* PASSWORD */}
                <div>
                <label className="font-semibold">Password</label>
                <input
                    type="password"
                    required
                    className="w-full border p-2 rounded mt-1"
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                {/* Button */}
                <button
                type="submit"
                className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 cursor-pointer"
                >
                Login
                </button>
            </form>
            {/* TOAST POPUP */}
            {toast && (
                <div
                className={`fixed bottom-6 right-6 px-4 py-3 rounded shadow-lg text-white 
                ${
                    toast.type === "success" ? "bg-green-600" : "bg-red-600"
                } transition`}
                >
                {toast.message}
                </div>
            )}
        </div>
        </>
    );
}