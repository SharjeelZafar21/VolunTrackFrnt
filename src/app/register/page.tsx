"use client";
import { registerUser } from "@/api/api";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register (){
    const router = useRouter();
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("volunteer");
    
    const handleSubmit = async (e: any) => {
    e.preventDefault();
     const data = {
            email: email,
            password: password,
            name: name,
            role: role
        };
    const res = await registerUser(data);
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("role",res.user.role);

      const userRole = localStorage.getItem("role");
      if(userRole == "organizer"){
        router.push("/organizer/dashboard");
      } else if(userRole == "volunteer"){
        router.push("/dashboard");
      }
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
        <input name="name" placeholder="Name" className="border w-full p-2" value={name} onChange={(e) => setName(e.target.value)} />
        <input name="email" placeholder="Email" className="border w-full p-2" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input name="password" type="password" placeholder="Password" className="border w-full p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
        <select name="Role" className="border w-full p-2" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="volunteer">Volunteer</option> 
          <option value="organizer">Event Organizer</option> 
        </select>
        <button className="bg-teal-600 text-white w-full p-2 rounded">Register</button>
      </form>
    </div>
    </>
    )
}