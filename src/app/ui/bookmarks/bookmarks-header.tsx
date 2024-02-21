'use client';

import React, { useEffect, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import ClearButton from "./clear-bookmarks-button";


export default function BookmarksHeader(
  {showOptionsButton}:
  {showOptionsButton: boolean}
) {
  const [showClearButton, setShowClearButton] = useState(false);
  const {data: session} = useSession();

  useEffect(() => {
    const hideClearButton = () => setShowClearButton(false);
    if (showClearButton) document.addEventListener('click', hideClearButton);

    return () => document.removeEventListener('click', hideClearButton);
  }, [showClearButton])

  return (
    <div className="relative flex items-center mx-1 h-full">
      <div>
        <h1 className="text-xl text-[#0f1419] font-bold leading-tight">Bookmarks</h1>
        <span className="text-sm text-[#536471] leading-none block">@{session?.user?.name}</span>
      </div>

      {showOptionsButton &&
        <button
          className="ml-auto h-fit p-[6px] rounded-full hover:bg-gray-200 transition-colors duration-300"
          onClick={() => setShowClearButton(prev => !prev)}
        >
          <div>
            <EllipsisHorizontalIcon className="w-6" />
          </div>
        </button>
      }
      {showClearButton &&
       <ClearButton
         setShowClearButton={setShowClearButton}
         userId={session?.user?.id}
       />
      }
    </div>
  )
}
