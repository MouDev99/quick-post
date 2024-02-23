import { fetchPostById, fetchPostCommentsById } from "@/app/lib/data";
import FullPostView from "@/app/ui/post-full-view";
import { auth } from "@/auth";

export default async function Page({params}: {params: {postId: string}}) {
  const session = await auth();
  const user = session?.user;
  const postId = params.postId;
  const [post, postComments] =
    await Promise.all([fetchPostById(postId), fetchPostCommentsById(postId)]);

  return (
    <FullPostView
      post={post}
      postComments={postComments}
      sessionUserId={user?.id?? ''}
    />
  )
}
