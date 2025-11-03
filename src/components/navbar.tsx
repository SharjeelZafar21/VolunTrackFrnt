"use client";

import Link from "next/link";

export default function Navbar (){
    return(
        <nav className="bg-teal-600 text-white p-4 flex justify-between">
            <h1 className="font-bold text-xl" >VolunTrack</h1>
            <div className="space-x-4">
                <Link href="/">Home</Link>
                <Link href="/opportunities">Opportunities</Link>
                <Link href="/dashboard">Dashboard</Link>
                <Link href="/login">Login</Link>
            </div>
        </nav>
    );
}