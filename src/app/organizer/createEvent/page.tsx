"use client"

import { createEvent } from "@/api/api";
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation";
import { useState } from "react"

export default function CreateEvent() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState("");
    const [skills, setSkills] = useState("");
    const [toast, setToast] = useState<{ type: string; message: string } | null>(null);

    const showToast = (type: string, message: string) => {
      setToast({ type, message });
      setTimeout(() => setToast(null), 2500);
    };

    const handleSubmit = async (e: any) =>{
        e.preventDefault();

        const token = localStorage.getItem("token");
        if(!token){
            alert("You must be logged in");
            return;
        }

        const data = {
            title: title,
            description: description,
            location: location,
            date: date,
            skills: skills
        }

        const res = await createEvent(data, token);
        console.log("res in event create",res);
        

        if(res?.events) {
            showToast("success","Event Created!");
            setTimeout(() => router.push("/organizer/dashboard"), 2000);
        }else {
            showToast("error",res.message || "Failed to create event");
        }
    };
    return(
        <>
        <Navbar />

        <div className="flex flex-col items-center mt-10">
            <h1 className="text-3xl font-bold text-teal-700 mb-4">Create a new Event</h1>
            <form onSubmit={handleSubmit} className="w-96 space-y-4">
                <input 
                    type="text"
                    name="title"
                    placeholder="Event Title"
                    className="border w-full p-2"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />

                <textarea 
                    name="description" 
                    placeholder="Event Description"
                    className="border w-full p-2"
                    rows={4}
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                />

                <input 
                    name="location"
                    placeholder="Location"
                    className="border w-full p-2"
                    value={location}
                    onChange={(e)=> setLocation(e.target.value)}
                />
                
                <input 
                    type="datetime-local"
                    name="date"
                    className="border w-full p-2"
                    value={date}
                    onChange={(e)=> setDate(e.target.value)}
                />

                <input 
                    name="skillsRequired"
                    placeholder="Skills required"
                    className="border w-full p-2"
                    value={skills}
                    onChange={(e)=> setSkills(e.target.value)}
                />

                <button className="bg-teal-600 text-white w-full p-2 rounded">
                    Create Event    
                </button>


            </form>
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