'use client';

import { PostType, UserType } from "@/app/lib/definitions";
import Header from "./search-results-header";
import PostCard from "../post-card";
import Link from "next/link";
import UserAvatar from "../user-avatar";

export default function SearchResults(
  {users, posts, query}:
  {users: UserType[], posts: PostType[], query: string | undefined}
) {
  const noResults =
    users.length === 0 &&
    posts.length === 0;

  return (
    <div>
      <Header />
      <div className="my-4">
        {users.length > 0 &&
         <h2 className="text-[#0f1419] text-xl font-bold m-3 w-fit">
           People
         </h2>
        }
        {users.map((user, idx) => {
          return (
            <Link
              key={idx}
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
                    <p className="text-xs leading-3">{user.joinedAt.toDateString()}</p>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <div className="my-2">
        {posts.length > 0 &&
         <h2 className="text-[#0f1419] text-xl font-bold m-3 w-fit">
           Posts
         </h2>
        }
        {posts.map((post, i) => {
          return (
            <PostCard
              key={i}
              fullView={false}
              idx={i}
              post={post}
            />
          )
        })}
      </div>
      {query && noResults &&
        <div className="w-fit mx-2">
          <h2 className="text-md sm:text-xl text-[#0f1419] font-extrabold">Hmmm...</h2>
          <p className="mt-2 text-sm text-gray-500">We couldn&apos;t find any results for &quot;{query}&quot;.</p>
        </div>
      }
    </div>
  )
}
