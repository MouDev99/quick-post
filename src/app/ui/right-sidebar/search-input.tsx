'use client';

import React, { useState } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SuggestedSearchResult from "./suggested-search-results";

export default function SearchInput() {
  const [query, setQuery] = useState('');

  return (
    <div className="sticky top-0 z-40 w-[355px] flex items-center px-3 border rounded-3xl text-gray-500 h-12 bg-gray-100 has-[:focus]:text-[#3A98EB] has-[:focus]:border-[1.5px] has-[:focus]:border-[#3A98EB] has-[:focus]:bg-white ">
      <MagnifyingGlassIcon className="w-6 stroke-2"/>
      <input
        id="search"
        type="text"
        className="peer w-full h-full rounded-3xl p-1 text-black text-md border-none outline-none bg-gray-100 focus:bg-white"
        placeholder="Search"
        onChange={e => setQuery(e.target.value)}
        value={query}
      />
      {query.length > 0 &&
       <ClearSearchInputButton
         setQuery={setQuery}
       />
      }

      {query.length > 0 &&
       <SuggestedSearchResult
         query={query}
       />
      }
    </div>
  )
}

function ClearSearchInputButton({setQuery}: {setQuery: Function}) {

  return (
    <button
      className="absolute right-2 z-50 p-[2px] border rounded-full text-white bg-[#3A98EB]"
      onClick={(e) => {
        e.stopPropagation();
        setQuery('');
        document.getElementById("search")?.focus();
      }}
    >
      <XMarkIcon className="w-5" />
    </button>
  )
}
