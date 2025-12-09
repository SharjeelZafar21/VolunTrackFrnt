"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("role"); // you are already storing in login
    setRole(storedRole);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    router.push("/login");
  };

  return (
    <nav className="bg-teal-600 text-white p-4 flex justify-between relative">
      <h1
        className="font-bold text-xl cursor-pointer"
        onClick={() => router.push("/")}
      >
        VolunTrack
      </h1>

      <div className="space-x-4 flex items-center">

        {/* COMMON LINKS */}
        <Link href="/">Home</Link>

        {/* Volunteer Links */}
        {role === "volunteer" && (
          <>
            <Link href="/dashboard">Dashboard</Link>
          </>
        )}

        {/* Organizer Links */}
        {role === "organizer" && (
          <>
            <Link href="/organizer/dashboard">Dashboard</Link>
            <Link href="/organizer/createEvent">Create Event</Link>
          </>
        )}

        {/* Not Logged In */}
        {!role && (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}

        {/* Profile Icon when logged in */}
        {role && (
          <div className="relative">
            <FaUserCircle
              size={28}
              className="cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
            />

            {menuOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded w-40">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={() =>{
                    if(role === 'volunteer'){
                      router.push("/profile")
                    }else{
                      router.push("/organizer/profile")
                    }
                    }}
                >
                  Profile
                </button>

                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
