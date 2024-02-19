'use client';

import React, { useState } from "react";
import { EllipsisHorizontalIcon, PowerIcon } from '@heroicons/react/24/outline';
import UserAvatar from "../user-avatar";
import { useSession, signOut } from "next-auth/react";

export default function UserInfo() {
  const [showMore, setShowMore] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className='h-[58px] mt-auto mb-2 relative'>
      <button
        className='flex h-full items-center justify-between w-full px-1 py-4 shadow-lg rounded-3xl border-[1px] border-gray-200 hover:bg-gray-200'
        onClick={() => setShowMore(!showMore)}
      >
        <div className='flex items-center gap-1 w-full'>
          <UserAvatar
            styles={''}
            userProfileUrl={null}
            userId={user?.id?? ''}
          />
          <div className='flex-col items-start hidden lg:flex'>
            <h3 className='leading-5 text-base font-extrabold text-[#0f1419]'>@{user?.name}</h3>
            <h4 className='leading-4 text-[#536471]'>{user?.email}</h4>
          </div>
        </div>
        <EllipsisHorizontalIcon className='text-black w-7 hidden lg:block'/>
      </button>
      {showMore &&
        <div className='absolute -top-20 flex items-center h-[75px] w-full border-[1px] border-gray-200 rounded-lg shadow-lg'>
          <button
            className='w-full mx-1 my-1 p-2 flex justify-center rounded-lg text-red-800 font-bold hover:bg-gray-200'
            title="sign out"
            onClick={() => signOut()}
          >
           <PowerIcon className="w-6 text-red-800"/>
          <span className="hidden lg:inline">Logout</span>
          </button>
        </div>
      }
    </div>
  )
}
