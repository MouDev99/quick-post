import { UserType } from "@/app/lib/definitions";
import SearchInput from "./search-input";
import WhoToFollow from "./who-to-follow";

export default function RightSideBar(
  {usersToFollow}:
  {usersToFollow: UserType[]}
) {

  return (
    <div className="hidden min-[900px]:block w-fit ml-2 pt-1">
      <SearchInput />
      <WhoToFollow
        users={usersToFollow}
      />
    </div>
  )
}
