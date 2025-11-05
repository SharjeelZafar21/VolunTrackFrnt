"use client";
import { registerUser } from "@/api/api";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register (){
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
    
    const handleSubmit = async (e) => {
      const router = useRouter();
    e.preventDefault();
    const res = await registerUser(form);
    if (res.token) {
      localStorage.setItem("token", res.token);
      router.push("/dashboard");
    } else {
      alert(res.message || "Registration failed");
    }
  };
    return(
        <>
        <Navbar />
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-3xl font-bold text-teal-700 mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <input name="name" placeholder="Name" className="border w-full p-2" onChange={handleChange} />
        <input name="email" placeholder="Email" className="border w-full p-2" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" className="border w-full p-2" onChange={handleChange} />
        <button className="bg-teal-600 text-white w-full p-2 rounded">Register</button>
      </form>
    </div>
    </>
    )
}