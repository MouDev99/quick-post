'use client';

import React from "react";
import Link from "next/link";
import UserAvatar from "../user-avatar";
import { useState } from "react";
import { UserType } from "@/app/lib/definitions";
import { followOrUnfollowUser } from "@/app/lib/actions";

export default function SuggestedUserCard(
  {user, sessionUserId}:
  {user: UserType, sessionUserId: string | undefined}
) {
  const [following, setFollowing] = useState(false);

  const handleFollowOrUnfollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!sessionUserId) return;

    const action = following ? 'unfollow' : 'follow';
    const followerId = parseInt(sessionUserId);
    const userId = user.id;

    try {
      await followOrUnfollowUser(action, followerId, userId);
    } catch(error) {
      console.error(error);
    } finally {
      setFollowing(!following);
    }
  }

  return (
    <Link
      className="block p-2 w-full h-fit hover:bg-blue-100 transition-all duration-300"
      href={`/${user.username}`}
    >
      <div className="flex items-center w-full">
        <div className="flex">
          <UserAvatar
            userProfileUrl={user.userProfileUrl}
            noProfilePicStyles="w-8"
            styles="w-12"
            userId={user.id}
          />
          <div className="ml-1">
            <h2 className="text-lg font-semibold">{user.username}</h2>
            <p className="text-xs leading-3">{user.createdAt.toDateString()}</p>
          </div>
        </div>
        <button
          className={
            following ? 'ml-auto px-4 py-1 rounded-2xl font-bold border border-gray-300 hover:bg-red-100 hover:border-red-500 hover:text-red-500' :
            "ml-auto px-4 py-1 rounded-2xl text-white font-bold h-fit bg-[#0F1419]"
          }
          onClick={handleFollowOrUnfollowClick}
          onMouseEnter={(e) => {
            const innerTxt = e.currentTarget.innerText;
            if (innerTxt === 'Following') {
              e.currentTarget.innerText = "Unfollow";
            }
          }}
          onMouseLeave={(e) => {
            if (following) {
              e.currentTarget.innerText = "Following";
            }
          }}
        >
          {following ? 'Unfollow' : 'Follow'}
        </button>
      </div>
    </Link>
  )
}
