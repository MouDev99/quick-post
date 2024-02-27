import {
  EllipsisHorizontalIcon,
  EnvelopeIcon,
  UserPlusIcon
} from "@heroicons/react/24/outline";

export default function ProfileActionBar() {

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
        title="follow"
      >
        <UserPlusIcon className="w-5" />
      </button>
    </div>
  )
}
