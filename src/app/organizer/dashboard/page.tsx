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
              <div key={event._id} className="p-4 border rounded shadow">
                <h3 className="text-xl font-bold">{event.title}</h3>
                <p className="text-gray-600">{event.description}</p>

                <div className="mt-4 flex gap-4">
                  <Link
                    className="text-blue-600 underline"
                    href={`/organizer/edit-event/${event._id}`}
                  >
                    Edit
                  </Link>
                  <button className="text-red-600 underline">Delete</button>
                </div>

                {/* Pending Requests Section */}
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-2">Volunteer Requests</h4>

                  {requests.filter((r: any) => r.eventId._id === event._id).length === 0 ? (
                    <p className="text-gray-500 text-sm">No requests yet.</p>
                  ) : (
                    requests
                      .filter((r: any) => r.eventId._id === event._id)
                      .map((req: any) => (
                        <div
                          key={req._id}
                          className="border p-3 rounded mt-2 flex justify-between"
                        >
                          <span>
                            {req.userId?.name || "Unknown User"}
                          </span>

                          {req.status === "requested" && (
                            <div className="flex gap-3">
                              <button
                                onClick={() => handleAccept(req._id)}
                                className="bg-green-600 text-white px-3 py-1 rounded"
                              >
                                Accept
                              </button>

                              <button
                                onClick={() => handleReject(req._id)}
                                className="bg-red-600 text-white px-3 py-1 rounded"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </div>
                      ))
                  )}
                </div>
                {/* Volunteers List */}
                <div className="mt-6">
                  <h4 className="font-semibold text-lg mb-2">Joined Volunteers</h4>

                  {event.joinedVolunteers?.length === 0 ? (
                      <p className="text-gray-500 text-sm">No volunteers joined yet.</p>
                  ) : (
                      <ul className="mt-2 space-y-2">
                          {event.joinedVolunteers.map((v: any) => (
                              <li
                                  key={v._id}
                                  className="p-2 border rounded flex justify-between"
                              >
                                  <span className="font-medium">{v.name || "Unknown User"}</span>
                                  <span className="text-sm text-gray-500">{v.email}</span>
                              </li>
                          ))}
                      </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
          
        )}

      </div>
    </>
  );
}
