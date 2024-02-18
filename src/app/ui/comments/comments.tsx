import { useEffect, useState } from "react"
import CommentCard from "../comment-card/comment-card"
import { fetchPostCommentsById } from "@/app/lib/data";
import { CommentType } from "@/app/lib/definitions";
import Spinner from "../spinner";

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<CommentType[] | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPostCommentsById(postId);
      setComments(data);
    }
    fetchData();
  }, []);

  if (!comments) return <Spinner />;

  return (
    <div className="">
      {comments.map((comment, idx) => {
        return (
          <CommentCard
            key={idx}
            comment={comment}
          />
        )
      })}
    </div>
  )
}
