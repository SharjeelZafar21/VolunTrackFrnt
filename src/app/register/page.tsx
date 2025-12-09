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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [role, setRole] = useState("volunteer");

    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    const showToast = (type: string, message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 2500);
    };
    
    const handleSubmit = async (e: any) => {
    e.preventDefault();

     if (password !== confirmPassword) {
      showToast("error", "Passwords do not match!");
      return;
    }

     const data = {
            email: email,
            password: password,
            name: name,
            role: role
        };
    const res = await registerUser(data);
    if (res.token) {
      showToast("success", "Registration successful!");
      setTimeout(() => router.push("/login"), 2000);
      
    } else {
      showToast("error", res.message || "Registration failed!");
    }
  };
    return(
      <>
        <Navbar />
        <div className="p-10 max-w-md mx-auto">

        <h1 className="text-3xl font-bold text-center text-teal-700">
          Create Your Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className=" shadow-md p-6 rounded-md space-y-4"
        >
          {/* NAME */}
          <div>
            <label className="font-semibold">Name</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              required
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* ROLE */}
          <div>
            <label className="font-semibold">Role</label>
            <select
              className="w-full border p-2 rounded mt-1 bg-black"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="volunteer">Volunteer</option>
              <option value="organizer">Organizer</option>
            </select>
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

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="font-semibold">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full border p-2 rounded mt-1"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          {/* Button */}
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded hover:bg-teal-700 cursor-pointer"
          >
            Register
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
    )
}