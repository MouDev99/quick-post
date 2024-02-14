'use client';

import { useEffect, useState } from "react";
import PostCard from "../post-card/post-card";
import { fetchPosts } from "@/app/lib/data";
import { PostType } from "@/app/lib/definitions";
import Spinner from "../spinner";

export default  function ForYou() {
  const [posts, setPosts]:
    [PostType[] | undefined, Function] = useState<PostType[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchPosts();
      setPosts(posts);
    }
    fetchData();
  }, [])

  if (!posts) return <Spinner />;

  return (
    <div className="h-fit mt-4">
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
  )
}
