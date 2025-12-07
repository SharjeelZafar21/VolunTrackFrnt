"use client";
import { approveRequest, getMyEvents, getOrganizerRequests, rejectRequest, } from "@/api/api";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrgDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [requests, setRequests] = useState([]);

  

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    

    if (!token) {
      router.push("/login");
      return;
    }

    // Fetch organizer events
    const eventRes = await getMyEvents(token);
    setEvents(eventRes.events || []);
    

    // Fetch all volunteer requests for this organizer
    const reqRes = await getOrganizerRequests();
    setRequests(reqRes.requests || []);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAccept = async (requestId: string) => {
    const token = localStorage.getItem("token");
    await approveRequest(requestId);
    fetchData();
  };

  const handleReject = async (requestId: string) => {
    const token = localStorage.getItem("token");
    await rejectRequest(requestId);
    fetchData();
  };

  return (
    <>
      <Navbar />
      <div className="p-10">
        <h1 className="text-3xl font-bold text-teal-700 mb-6">Organizer Dashboard</h1>

        {/* Top Bar */}
        <div className="flex justify-between mb-6">
          <h2 className="text-xl font-semibold">Your Events</h2>
          <Link className="bg-teal-600 text-white px-4 py-2 rounded" href="createEvent">
            + Add Event
          </Link>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-2 gap-6">
            {events.map((event: any) => (
              <div 
                key={event._id} 
                className="p-4 border rounded shadow cursor-pointer"
                onClick={() => router.push(`/organizer/event/${event._id}`)}
              >
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>
                <p className="text-gray-600">{event.location}</p>
                <p className="text-gray-600">{event.date}</p>

                <div className="mt-4 flex gap-4">
                  <Link
                    className="text-blue-600 underline"
                    href={`/organizer/edit-event/${event._id}`}
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
          
        )}

      </div>
    </>
  );
}
