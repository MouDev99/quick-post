'use client';

import { useParams } from "next/navigation";
import PostCard from "@/app/ui/post-card/post-card";
import { posts } from "@/app/lib/placeholder-data";
import { PostType } from "@/app/lib/definitions";

export default function FullPostView() {
  const { postId } = useParams();
  const post: PostType = posts.find(post => post.id === postId);

  return (
    <div className="ml-1 border-x border-gray-200 max-w-[560px] w-full sm:w-4/5 md:w-3/3">
      <PostCard
        fullView={true}
        idx={1}
        post={post}
      />
      <h2>Conditionally display post comments here!</h2>
    </div>
  )
};
