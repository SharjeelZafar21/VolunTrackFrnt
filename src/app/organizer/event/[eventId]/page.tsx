"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { approveRequest, rejectRequest, completeEvent, getOrganizerRequests, getMyEvents } from "@/api/api";
import Navbar from "@/components/navbar";

export default function EventDetails({ params }: any) {
  const eventId: any = use(params);
  const router = useRouter();
  console.log("eventId",eventId);
  
  const [events, setEvents] = useState<any>([]);
  const [requests, setRequests] = useState<any>([])
  const [impactVolunteer, setImpactVolunteer] = useState<string | null>(null);
  const [impactScore, setImpactScore] = useState<number>(0);

  const loadDetails = async () => {
    const token = localStorage.getItem("token");
    console.log("token in event detail", token);

    const reqRes = await getOrganizerRequests();
    console.log("requests", reqRes);
    // const myRequest = reqRes.requests.find((e: any)=> (e.eventId._id) === (eventId.eventId))
    // console.log("matched requests", myRequest);
    
    
    setRequests(reqRes.requests || [])

    const res = await getMyEvents(token);
    console.log("res", res);
    
    const event = res.events.find((e: any)=> String(e._id) === String(eventId.eventId))
    console.log("event matched",event);
    
    
    setEvents(event);
};

useEffect(() => {
    loadDetails();
}, []);

console.log("my events",events);
console.log("my requests",requests);
  if (!events) return <p>There are no events</p>;

  return (
    <>
    <Navbar />
    <div className="p-8">
      <h1 className="text-2xl font-bold text-white">{events.title}</h1>

      {/* Requests */}
      <h2 className="text-xl mt-6 font-semibold">Pending Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests.</p>
      ) : (
        requests
        .filter((r: any) => r.eventId._id === eventId.eventId)
        .map((r: any) => (
          <div key={r._id} className="p-3 border mt-2 flex justify-between">
            <span
            className="font-medium cursor-pointer"
            onClick={() => router.push(`/organizer/volunteerProfile/${r.userId._id}?requestId=${r._id}`)}
            >
                {r.userId.name}
            </span>
            <div className="flex gap-2">
              <button onClick={() => approveRequest(r._id).then(loadDetails)}
                className="px-2 bg-green-500 text-white rounded cursor-pointer">Accept</button>
              <button onClick={() => rejectRequest(r._id).then(loadDetails)}
                className="px-2 bg-red-500 text-white rounded cursor-pointer">Reject</button>
            </div>
          </div>
        ))
      )}

      {/* Joined Volunteers */}
      <h2 className="text-xl mt-6 font-semibold">Joined Volunteers</h2>
      {events?.joinedVolunteers?.length === 0 ? (
        <p>No volunteers yet.</p>
      ) : (
        events.joinedVolunteers?.map((v: any) => (
          <div key={v._id} className="p-3 border mt-2 flex justify-between">
            <span>{v.name}</span>
            <button
              className="px-2 bg-blue-600 text-white rounded cursor-pointer"
              onClick={() => setImpactVolunteer(v._id)}
            >
              Complete Event
            </button>
          </div>
        ))
      )}

      {/* Impact Score Modal */}
      {impactVolunteer && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 rounded shadow">
            <h3 className="font-bold text-black">Enter Impact Score</h3>
            <input
              type="number"
              min="1"
              max="10"
              className="border p-2 mt-2 w-full text-black"
              onChange={(e) => setImpactScore(Number(e.target.value))}
            />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setImpactVolunteer(null)}
                className="px-4 py-2 bg-red-400 rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={() =>
                  completeEvent(eventId.eventId, impactVolunteer, impactScore).then(() => {
                    setImpactVolunteer(null);
                    loadDetails();
                  })
                }
                className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
    </>
  );
}
