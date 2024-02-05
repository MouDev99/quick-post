import PostCard from "../post-card/post-card";
import { posts } from '@/app/lib/placeholder-data';

export default function ForYou() {

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
      } )}
    </div>
  )
}
