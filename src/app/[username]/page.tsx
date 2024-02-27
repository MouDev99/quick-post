import { fetchUserPostsByUsername } from "../lib/data";
import PostCard from "../ui/post-card";

export default async function Page({params}: {params: {username: string}}) {
  const username = params.username;
  const posts = await fetchUserPostsByUsername(username);

  return (
    <div>
      {posts.map((post, idx) => {
        return (
          <PostCard
            key={post.id}
            post={post}
            fullView={false}
            // idx set to idx +1 to not add a border-t class
            // see <PostCard /> at app/ui/post-card/index.tsx
            idx={idx+1}
          />
        )
      })}
    </div>
  )
}
