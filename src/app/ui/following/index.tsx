import PostCard from "../post-card";
import { PostType } from "@/app/lib/definitions";

export default function Following({posts}: {posts: PostType[]}) {

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
