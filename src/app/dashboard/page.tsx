"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import { getMyRequests } from "@/api/api";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [requests, setRequests] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    const load = async () => {
      const res = await getMyRequests();
      if (res.redirect) {
        router.push("/login");
        return;
      }
      setRequests(res.requests || []);
    };
    load();
  }, [router]);

  const accepted = requests.filter(r => r.status === "accepted");
  const pending = requests.filter(r => r.status === "requested");
  const rejected = requests.filter(r => r.status === "rejected");

  return (
    <>
      <Navbar />
      <div className="p-8">
        <h1 className="text-2xl font-bold">My Dashboard</h1>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Accepted Events</h2>
          {accepted.length === 0 ? <p>No accepted events yet.</p> : accepted.map(r => (
            <div key={r._id} className="border p-3 my-2">
              <h3 className="font-bold">{r.eventId.title}</h3>
              <p>{r.eventId.description}</p>
              <p>{r.eventId.location}</p>
              <p>{r.eventId.date}</p>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Rejected Requests</h2>
          {rejected.length === 0 ? <p>No rejected requests.</p> : rejected.map(r => (
            <div key={r._id} className="border p-3 my-2">
              <h3 className="font-bold">{r.eventId.title}</h3>
              <p>Status: {r.status}</p>
            </div>
          ))}
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">Pending Requests</h2>
          {pending.length === 0 ? <p>No pending requests.</p> : pending.map(r => (
            <div key={r._id} className="border p-3 my-2">
              <h3 className="font-bold">{r.eventId.title}</h3>
              <p>Status: {r.status}</p>
            </div>
          ))}
        </section>

      </div>
    </>
  );
}
