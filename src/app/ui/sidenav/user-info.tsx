'use client';

import { useState } from "react";
import { UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import { EllipsisHorizontalIcon, PowerIcon } from '@heroicons/react/24/outline';

export default function UserInfo({ user, signOutUser }: {user: any, signOutUser: Function}) {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className='h-[58px] mt-auto mb-2 relative'>
      <button
        className='flex h-full items-center justify-between  w-full px-1 py-4 shadow-lg rounded-3xl border-[1px] border-gray-200 hover:bg-gray-200'
        onClick={() => setShowMore(!showMore)}
      >
        <div className='flex items-center gap-1 w-full'>
          <div className='h-full p-2 rounded-full bg-[#CDD6DC]'>
            <UserIconSolid className='w-8 text-[#677685]' />
          </div>
          <div className='flex-col items-start hidden md:flex'>
            <h3 className='leading-5 text-base font-extrabold text-[#0f1419]'>@{user?.name}</h3>
            <h4 className='leading-4 text-[#536471]'>{user?.email}</h4>
          </div>
        </div>
        <EllipsisHorizontalIcon className='w-7 hidden md:block'/>
      </button>
      {showMore &&
        <div className='absolute -top-20 flex items-center h-[75px] w-full border-[1px] border-gray-200 rounded-lg shadow-lg'>
          <button
            className='w-full mx-1 my-1 p-2 flex justify-center rounded-lg text-red-800 font-bold hover:bg-gray-200'
            title="sign out"
            onClick={() => signOutUser()}
          >
           <PowerIcon className="w-6 text-red-800"/>
          <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      }
    </div>
  )
}
