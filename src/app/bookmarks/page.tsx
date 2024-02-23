import { auth } from '@/auth';
import { fetchBookmarkedPosts } from '../lib/data';
import Bookmarks from '../ui/bookmarks';

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const posts = await fetchBookmarkedPosts(user?.id);

  return (
    <Bookmarks
      posts={posts}
    />
  )
};
