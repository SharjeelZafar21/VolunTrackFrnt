"use client";

import { useEffect, useState } from "react";
import { getVolunteerMyProfile } from "@/api/api";
import Navbar from "@/components/navbar";

export default function VolunteerSelfProfile() {
  const [profile, setProfile] = useState<any>(null);

  const loadProfile = async () => {
    const data = await getVolunteerMyProfile();
    console.log("My profile", data);

    setProfile(data);
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (!profile) return <p className="p-10">Loading profile...</p>;

  return (
    <>
      <Navbar />
      <div className="p-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
        <p className="text-gray-600">{profile.email}</p>

        {/* Skills */}
        <h2 className="text-xl mt-6 font-semibold">Skills</h2>
        {profile.skills?.length > 0 ? (
          <p>{profile.skills.join(", ")}</p>
        ) : (
          <p className="text-gray-500">No skills listed.</p>
        )}

        {/* Interest */}
        <h2 className="text-xl mt-6 font-semibold">Interests</h2>
        {profile.interest?.length > 0 ? (
          <p>{profile.interest.join(", ")}</p>
        ) : (
          <p className="text-gray-500">No interests added.</p>
        )}

        {/* Impact Score */}
        <h2 className="text-xl mt-6 font-semibold">Impact Score</h2>
        <p className="text-2xl font-bold text-green-700">
          {profile.averageImpactScore.toFixed(1)} / 10
        </p>

        {/* Completed Events */}
        <h2 className="text-xl mt-6 font-semibold">Completed Events</h2>

        {profile.completedEvents?.length === 0 ? (
          <p className="text-gray-500">No completed events yet.</p>
        ) : (
          <div className="space-y-4 mt-2">
            {profile.completedEvents.map((e: any) => (
              <div key={e._id} className="p-4 border rounded">
                <h3 className="font-bold">{e.eventId.title}</h3>
                <p>Impact Score: {e.impactScore}</p>
                <p className="text-sm text-gray-600">{e.eventId.location}</p>
                <p className="text-sm text-gray-600">{e.eventId.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
