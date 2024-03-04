import { followOrUnfollowUser } from "@/app/lib/actions";
import {
  CheckIcon,
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";

export default function ProfileActionBar(
  {isFollowed, sessionUserId, userId}:
  {isFollowed: boolean,
   sessionUserId: string | undefined,
   userId: number
  }
) {

  const handleFollowOrUnfollowClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!sessionUserId) return;

    const action = isFollowed ? 'unfollow' : 'follow';
    const followerId = parseInt(sessionUserId);

    try {
      await followOrUnfollowUser(action, followerId, userId);
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <div className="absolute -bottom-12 right-4 z-40 w-fit h-10 flex items-center gap-1 sm:ml-auto">
      <button
        className="w-fit h-full border-2 p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
        title="more"
      >
        <EllipsisHorizontalIcon className="w-5" />
      </button>
      <button
        className="w-fit h-full border-2 p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
        title="message"
      >
        <EnvelopeIcon className="w-5" />
      </button>
      <button
        className="w-fit h-full border-2 p-2 rounded-full hover:bg-gray-200 transition-all duration-300"
        title={isFollowed? "unfollow" : "follow"}
        onClick={handleFollowOrUnfollowClick}
      >
        {isFollowed?
         <CheckIcon className="w-5" /> :
         <UserPlusIcon className="w-5" />
        }
      </button>
    </div>
  )
}
