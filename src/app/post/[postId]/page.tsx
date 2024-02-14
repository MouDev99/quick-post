'use client';

import { useParams } from "next/navigation";
import PostCard from "@/app/ui/post-card/post-card";
import { useEffect, useState } from "react";
import Spinner from "@/app/ui/spinner";
import { fetchPostById } from "@/app/lib/data";
import { PostType } from "@/app/lib/definitions";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function FullPostView() {
  const router = useRouter();
  const { postId }: { postId: string} = useParams();
  const [post, setPost]:
        [PostType | undefined, Function] = useState<PostType | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const post = await fetchPostById(postId);
      setPost(post);
    }
    fetchData();
  }, [])

  if (!post) return <Spinner />;

  return (
    <div className="ml-1 border-x border-gray-200 max-w-[560px] w-full sm:w-4/5 md:w-3/3">
      <div className="flex items-center w-full h-12">
        <div
          className="flex justify-center items-center ml-1 h-10 w-10 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="w-6 font-bold" />
        </div>
      </div>
      <PostCard
        fullView={true}
        idx={1}
        post={post}
      />
      <h2>Conditionally display post comments here!</h2>
    </div>
  )
};
