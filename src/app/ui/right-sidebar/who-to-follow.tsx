'use client';

import SuggestedUserCard from "./suggested-user-card";
import { useSession } from "next-auth/react";
import { UserType } from "@/app/lib/definitions";

export default function WhoToFollow(
  {users}:
  {users: UserType[]}
) {
  const { data: session } = useSession();

  return (
    <div className="mt-2 pb-2 border rounded-2xl w-[355px] h-fit bg-[#f7f9f9]">
      <h2 className="text-[#0f1419] text-xl font-bold m-3">Who to follow</h2>
      {users.map((user, idx) => {
        return (
          <SuggestedUserCard
            key={idx}
            user={user}
            sessionUserId={session?.user?.id}
          />
        )
      })}
    </div>
  )
}
