'use client';

import Link from "next/link";
import UserAvatar from "../user-avatar";
import { useState } from "react";

export default function SuggestedUserCard() {
  const [following, setFollowing] = useState(false);

  return (
    <Link
      className="block p-2 w-full h-fit hover:bg-blue-100 transition-all duration-300"
      href={'#'}
    >
      <div className="flex items-center">
        <div className="flex">
          <UserAvatar
            userId={''}
            userProfileUrl={'https://files.edgestore.dev/9npb59a0efjg2hct/publicFiles/_public/d666455b-9cef-4941-9418-d3ec416492a6.jpg'}
            styles=""
          />
          <div className="ml-1">
            <h2 className="text-lg font-semibold">Demo-User</h2>
            <p className="text-xs leading-3">{new Date().toDateString()}</p>
          </div>
        </div>
        <button
          className={
            following ? 'ml-auto px-4 py-1 rounded-2xl font-bold border border-gray-300 hover:bg-red-100 hover:border-red-500 hover:text-red-500' :
            "ml-auto px-4 py-1 rounded-2xl text-white font-bold h-fit bg-[#0F1419]"
          }
          onClick={(e) => setFollowing(!following)}
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
