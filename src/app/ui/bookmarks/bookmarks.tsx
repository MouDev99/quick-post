'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Spinner from "../spinner";
import PostCard from "../post-card/post-card";
import { PostType } from "@/app/lib/definitions";
import { fetchBookmarkedPosts } from "@/app/lib/data";
import BookmarksHeader from "./bookmarks-header";

export default function Bookmarks() {
  const { data: session } = useSession();
  const [posts, setPosts]:
    [PostType[] | undefined, Function] = useState<PostType[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchBookmarkedPosts(session?.user?.id);
      setPosts(posts);
    }
    fetchData();
  }, [])

  return (
    <div className="h-fit mt-4">
      <BookmarksHeader
        showOptionsButton={posts?.length ? true : false}
      />
      {!posts? <Spinner /> :
        posts.map((post, i) => {
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
      <h2 className="text-md sm:text-xl text-[#0f1419] font-extrabold">You haven't bookmarked any posts yet.</h2>
      <p className="mt-2 text-sm text-gray-500">Bookmark posts to easily find them again in the future.</p>
    </div>
  )
}
