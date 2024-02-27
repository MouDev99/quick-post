import Link from "next/link";
import { useSession } from "next-auth/react";
import UserAvatar from "../user-avatar";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { UserProfileDetailsType } from "@/app/lib/definitions";
import SetUpProfileButton from "./set-up-profile-button";
import ProfileActionBar from "./profile-action-bar";

export default function UserDetails(
  {userDetails}:
  {userDetails: UserProfileDetailsType}
) {
  const {data: session} = useSession();
  const sessionUserId = session?.user?.id;
  const {
    id: userId,
    username,
    profileUrl,
    joinedAt,
    numOfFollowers,
    numOfFollowing,
  } = userDetails;

  return (
    <>
      <div className="relative flex w-full h-32 sm:h-48 bg-[#d0d9de] ">
        <div className="absolute -bottom-12 sm:-bottom-14 left-4 w-fit rounded-full border-4 border-white">
          <UserAvatar
            styles="w-28 h-28 md:w-36 md:h-36"
            noProfilePicStyles = "w-24 h-24 md:w-32 md:h-32"
            userProfileUrl={profileUrl}
            userId={userId}
          />
        </div>
        {sessionUserId && Number(sessionUserId) === userId ?
          <SetUpProfileButton /> :
          <ProfileActionBar />
        }
      </div>
      <div className="flex flex-col w-full h-fit px-4 py-3 ">
        <div className="my-3 mt-12">
          <h1 className="text-xl text-[#0f1419] font-extrabold leading-tight">{username}</h1>
          <div className="flex items-center text-sm text-[#536471] leading-none">
            <CalendarDaysIcon className="mx-1 w-5" />
            <span>Joined {joinedAt.toLocaleDateString()}</span>
          </div>
        </div>
        <div className="flex gap-4 w-full">
          <Link
           href={"#"}
           className="underline-offset-2 hover:underline"
          >
            <span className="text-[#0f1419] text-md font-extrabold">{numOfFollowing}</span>
            <span className="text-[#536471] text-sm ml-1">Following</span>
          </Link>
          <Link
           href={"#"}
           className="underline-offset-2 hover:underline"
          >
            <span className="text-[#0f1419] text-md font-extrabold">{numOfFollowers}</span>
            <span className="text-[#536471] text-sm ml-1">Followers</span>
          </Link>
        </div>
      </div>
    </>
  )
}
