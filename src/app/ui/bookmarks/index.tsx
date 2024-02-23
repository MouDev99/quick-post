'use client';

import PostCard from "../post-card";
import { PostType } from "@/app/lib/definitions";
import BookmarksHeader from "./bookmarks-header";

export default function Bookmarks({ posts }: { posts: PostType[] }) {

  return (
    <div className="h-fit mt-4">
      <BookmarksHeader
        showOptionsButton={posts?.length ? true : false}
      />
      {posts.map((post, i) => {
        return (
          <PostCard
            key={i}
            fullView={false}
            idx={i}
            post={post}
          />
        )})
      }
      {posts?.length === 0 && <NoContent />}
    </div>
  )
}

function NoContent() {

  return (
    <div className="w-fit sm:mt-9 mx-2">
      <h2 className="text-md sm:text-xl text-[#0f1419] font-extrabold">You haven&apos;t bookmarked any posts yet.</h2>
      <p className="mt-2 text-sm text-gray-500">Bookmark posts to easily find them again in the future.</p>
    </div>
  )
}
