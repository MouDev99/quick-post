"use client";

import PostCard from "@/app/ui/post-card";
import { CommentType, PostType } from "@/app/lib/definitions";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CreateComment from "@/app/ui/create-comment";
import UserAvatar from "@/app/ui/user-avatar";
import CommentCard from "../comment-card";

export default function FullPostView(
  {post, postComments, sessionUserId}:
  {post: PostType, postComments: CommentType[], sessionUserId: string}
) {
  const router = useRouter();

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
              userId={sessionUserId?? ''}
              userProfileUrl={null}
              styles=""
            />
          </Link>
        </div>
        <CreateComment
          postId={post.id}
          userId={sessionUserId}
        />
      </div>
      <div>
        {postComments.map((comment, idx) => {
          return (
            <CommentCard
              key={idx}
              comment={comment}
            />
          )
        })}
      </div>
    </div>
  )
};
