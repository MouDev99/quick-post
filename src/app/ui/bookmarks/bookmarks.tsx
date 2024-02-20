'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Spinner from "../spinner";
import PostCard from "../post-card/post-card";
import { PostType } from "@/app/lib/definitions";
import { fetchBookmarkedPosts } from "@/app/lib/data";
import Header from "./header";

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
      <Header />
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
    </div>
  )
}
