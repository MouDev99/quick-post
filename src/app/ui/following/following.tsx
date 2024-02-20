'use client';

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Spinner from "../spinner";
import PostCard from "../post-card/post-card";
import { PostType } from "@/app/lib/definitions";
import { fetchFollowedUsersPosts } from "@/app/lib/data";

export default function Following() {
  const { data: session } = useSession();
  const [posts, setPosts]:
    [PostType[] | undefined, Function] = useState<PostType[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const posts = await fetchFollowedUsersPosts(session?.user?.id);
      setPosts(posts);
    }
    fetchData();
  }, [])

  if (!posts) return <Spinner />;

  return (
    <div>
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
