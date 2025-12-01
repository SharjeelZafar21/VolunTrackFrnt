"use client"
import { getAllEvents, getMyRequests, requesttoJoinEvent, } from "@/api/api";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home (){
    const [events, setEvents] = useState([]);
    const [statuses, setStatuses] = useState<Record<string, string>>({});
    const router = useRouter();

    useEffect(()=>{
        const getEvents = async ()=>{
            const data = await getAllEvents();
            setEvents(data.events || []);
        };
        getEvents();
    }, []);

    // Load request statuses only if logged in
  useEffect(() => {
    const loadStatuses = async () => {
      const token = localStorage.getItem("token");
      if (!token) return; // Not logged in → no statuses needed

      const res = await getMyRequests();
      if (res?.requests) {
        const map: Record<string, string> = {};
        res.requests.forEach((r: any) => {
          map[r.eventId._id] = r.status; // requested | accepted | rejected
        });
        setStatuses(map);
      }
    };
    loadStatuses();
  }, []);

    const handleJoin = async(eventId: string)=>{
        const res = await requesttoJoinEvent(eventId);

        if(res.redirect){
            router.push("/login");
        }else{
            router.push("/dashboard")
        }

        alert(res.message);

        // Update status locally after requesting
        setStatuses((prev) => ({
            ...prev,
            [eventId]: "requested",
            }));
        };

        // Determine which button to show
        const renderJoinButton = (event: any) => {
            const status = statuses[event._id];

            if (status === "accepted") {
            return (
                <button className="bg-green-600 text-white w-full mt-4 p-2 rounded" disabled>
                Joined
                </button>
            );
            }

            if (status === "requested") {
            return (
                <button className="bg-yellow-600 text-white w-full mt-4 p-2 rounded" disabled>
                Requested
                </button>
            );
            }

            return (
            <button
                onClick={() => handleJoin(event._id)}
                className="bg-teal-600 text-white w-full mt-4 p-2 rounded"
            >
                Join
            </button>
            );
    }
    return(
        <>
          <Navbar />
            <section className="text-center mt-10">
                <h1  className="text-4xl font-bold text-teal-700">
                    Welcome to VolunTrack
                </h1>
                <p className="mt-4 text-gray-600">
                    Connect with local volunteering opportunities
                </p>
            </section>
            <div className="px-10 mt-10 mb-10">
                <h1 className="text-3xl font-bold text-teal-700">Upcoming Events</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-6 mt-6">
                    {events.map((event: any)=>(
                        <div key={event._id} className="border p-4 rounded shadow" >
                            <h2 className="text-xl font-bold">{event.title}</h2>
                            <p className="text-gray-600 mt-2">{event.description}</p>
                            <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                            <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()}</p>
                            <button onClick={()=>handleJoin(event._id)} className="bg-teal-600 text-white w-full mt-4 p-2 rounded">
                                Join
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}