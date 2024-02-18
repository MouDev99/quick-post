import Link from "next/link";
import UserAvatar from "../user-avatar";
import { CommentType } from "@/app/lib/definitions";

export default function CommentCard({ comment }: { comment: CommentType }) {

  return (
    <div className="mb-2 text-black border-b border-gray-200">
      <div className="flex items-start justify-start pl-2 pb-2 space-x-1">
        <Link href={'/username'} className="w-12">
          <UserAvatar
              userId={comment.userid}
              userProfileUrl={comment.userProfileUrl}
              styles=""
            />
        </Link>
        <div className="text-sm w-fit">
          <Link href={'/username'}>
            <h3 className="font-bold leading-none">@{comment.username}</h3>
          </Link>
          <p className="text-xs leading-none text-gray-500 dark:text-gray-400">
            {comment.createdAt.toDateString()}
          </p>
          <p className="text-sm mt-2">
            {comment.content}
          </p>
        </div>
      </div>
  </div>
  )
}
