import Home from "../ui/home";
import { fetchPosts, fetchFollowedUsersPosts } from "../lib/data";
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const [forYouPosts, followingPosts] =
    await Promise.all([fetchPosts(), fetchFollowedUsersPosts(user?.id)]);

  return (
    <Home
      forYouPosts={forYouPosts}
      followingPosts={followingPosts}
    />
  )
}
