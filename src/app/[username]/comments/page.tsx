import { fetchUserCommentsByUsername } from "@/app/lib/data";
import Link from "next/link";

export default async function Comments({params}: {params: {username: string}}) {
  const username = params.username;
  const comments = await fetchUserCommentsByUsername(username);

  return (
    <div>
     {comments.map((comment, idx) => {
      return (
        <div key={comment.postid + idx} className="grid gap-1 mt-2">
          <div className="border border-gray-200 rounded-lg p-3 pb-1 text-sm bg-gray-50 dark:[border-gray-800 bg-gray-950]">
            <p>{comment.content}</p>
            <div className="flex items-center space-x-2 text-sm">
              <Link className="font-medium underline" href={`/post/${comment.postid}`}>
                View post
              </Link>
              <time className="text-sm text-gray-500 dark:text-gray-400">{comment.createdAt.toDateString()}</time>
            </div>
          </div>
        </div>
      )
     })}
    </div>
  )
}
