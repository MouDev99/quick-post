'use client';

import { useEffect, useState } from "react";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";


export default function Header() {
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
      <button
        className="ml-auto h-fit p-[6px] rounded-full hover:bg-gray-200 transition-colors duration-300"
        onClick={() => setShowClearButton(prev => !prev)}
      >
        <div>
          <EllipsisHorizontalIcon className="w-6"/>
        </div>
      </button>
      {showClearButton && <ClearButton />}
    </div>
  )
}

function ClearButton() {

  return (
    <button
      className="absolute top-0 right-0 z-50 flex items-center bg-white h-full p-4 rounded-lg shadow-md border text-[#f4212e] text-md font-bold"
      onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
    >
      Clear all bookmarks
    </button>
  )
}
