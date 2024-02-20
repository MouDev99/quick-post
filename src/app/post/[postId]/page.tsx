'use client';

import { useParams } from "next/navigation";
import PostCard from "@/app/ui/post-card/post-card";
import { useEffect, useState } from "react";
import Spinner from "@/app/ui/spinner";
import { fetchPostById } from "@/app/lib/data";
import { PostType } from "@/app/lib/definitions";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CreateComment from "@/app/ui/create-comment/create-comment";
import UserAvatar from "@/app/ui/user-avatar";
import Comments from "@/app/ui/comments/comments";

export default function FullPostView() {
  const router = useRouter();
  const { data: session } = useSession();
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
    <div>
      <div className="flex items-center w-full h-12">
        <div
          className="flex justify-center items-center text-black ml-1 h-10 w-10 rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="w-6 font-bold" />
        </div>
      </div>
      <PostCard
        fullView={true}
        idx={0}
        post={post}
      />
      <div className="flex justify-start my-2 pb-2 w-full h-fit border-b">
        <div className="w-fit h-fit ml-2">
          <Link
            href='/profile'
          >
            <UserAvatar
              userId={session?.user?.id?? ''}
              userProfileUrl={null}
              styles=""
            />
          </Link>
        </div>
        <CreateComment
          postId={postId}
          userId={session?.user?.id}
        />
      </div>
      <Comments
        postId={postId}
      />
    </div>
  )
};
