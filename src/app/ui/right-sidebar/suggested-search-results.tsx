import { useEffect, useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { fetchFilteredUsers } from "@/app/lib/data";
import { UserType } from "@/app/lib/definitions";
import Spinner from "../spinner";
import UserAvatar from "../user-avatar";

export default function SuggestedSearchResult({query}: {query: string}) {
  const [users, setUsers] =
    useState<UserType[] | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const users = await fetchFilteredUsers(query);
      setUsers(users);
      setLoading(false);
    }
    // set loading to true before fetching data
    // each time the query changes, so the Spinner shows.
    setLoading(true);
    fetchData();
  }, [query])

  return (
    <div
      className="absolute top-12 left-0 z-50 bg-white rounded-lg w-full h-fit border"
    >
      <Link
        href={`/search?query=${query}`}
        className="flex gap-1 px-2 py-4 w-full text-md border-b hover:bg-blue-100"
      >
        <MagnifyingGlassIcon className="w-6 sv stroke-2" />
        Search for &quot;{query}&quot;
      </Link>
      {loading ?
       <Spinner styles="w-6 h-6 border-2 border-t-2 mx-auto my-4"/> :
       users?.map(user => {
        return <FilteredUserInfo key={user.id} user={user} />
       })
      }
    </div>
  )
}

function FilteredUserInfo({user}: {user: UserType}) {

  return (
    <Link
      href={`/${user.username}`}
      className="px-2 py-3 block text-black border-b hover:bg-blue-100 transition-all duration-300"
    >
      <div className="flex">
        <UserAvatar
          userProfileUrl={user.userProfileUrl}
          noProfilePicStyles="w-8"
          styles="w-12"
          userId={user.id}
        />
        <div className="ml-1">
          <h2 className="text-lg font-semibold">{user.username}</h2>
          <p className="text-xs leading-3">{user.joinedAt.toDateString()}</p>
        </div>
      </div>
   </Link>
  )
}
