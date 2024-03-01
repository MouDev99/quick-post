import { fetchFilteredPosts, fetchFilteredUsers } from "../lib/data";
import SearchResults from "../ui/search-results";


export default async function Page(
  {searchParams}:
  {searchParams: {query?: string}}
) {
  const query = searchParams.query;
  const [users, posts] = await Promise.all(
     [fetchFilteredUsers(query),
      fetchFilteredPosts(query)]
  )
  return (
    <SearchResults
      users={users}
      posts={posts}
      query={query}
    />
  )
}
