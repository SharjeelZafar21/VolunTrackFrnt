"use client";

import { approveRequest, getVolunteerProfile, rejectRequest } from "@/api/api";
import Navbar from "@/components/navbar";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function VolunteerProfile({ params, searchParams }: any) {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const userId: any = use(params);
  const requestId: any = use(searchParams);
  console.log("userId",userId.userId);
  console.log("requestId",requestId.requestId);
  

  const getProfile = async () => {

    const data = await getVolunteerProfile(userId.userId);
    console.log("volunteer profile", data);
    
    setProfile(data);

  };

  useEffect(() => {
    getProfile();
  }, [userId]);

  if (!profile) return <p>No Profile there</p>;
  

  return (
    <>
    <Navbar />
    <div className="p-10">
      <div className="mt-2 flex justify-between">
        <div>
          <h1 className="text-3xl font-bold">{profile.name}</h1>
          <p className="text-gray-600">{profile.email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => approveRequest(requestId.requestId).then(()=>{router.push("/organizer/dashboard")})}
            className="px-2 bg-green-500 text-white rounded cursor-pointer">Accept</button>
          <button onClick={() => rejectRequest(requestId.requestId).then(()=>{router.push("/organizer/dashboard")})}
            className="px-2 bg-red-500 text-white rounded cursor-pointer">Reject</button>
        </div>
      </div>

      <h2 className="text-xl mt-4 font-semibold">Skills</h2>
      <p>{profile.skills.join(", ")}</p>

      <h2 className="text-xl mt-4 font-semibold">Impact Score</h2>
      <p className="text-2xl font-bold text-green-700">
        {profile.averageImpactScore.toFixed(1)} / 10
      </p>

      <h2 className="text-xl mt-6 font-semibold">Completed Events</h2>

      <div className="space-y-4 mt-2">
        {profile.completedEvents?.map((e: any) => (
          <div key={e._id} className="p-3 border rounded ">
            <h3 className="font-bold">{e.eventId.title}</h3>
            <p>{e.eventId.description}</p>
            <p>{e.eventId.location}</p>
            <p>Score: {e.impactScore}</p>
            <p className="text-sm text-gray-600">{e.eventId.date}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}
