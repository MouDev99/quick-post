import { PostType } from "@/app/lib/definitions"
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon
} from "@heroicons/react/24/outline";
import { UserIcon as UserIconSolid } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

export default function PostCard(
  {
    post,
    idx
  }:
  {
    post: PostType,
    idx: number
  }
) {
  const {
    content,
    imgUrl,
    user,
    comments,
    numOfShares,
    numOfLikes,
    createdAt
  } = post;

  return (
    <div className={`h-fit flex pt-2 mt-2 border-b border-gray-300 ${idx === 0 ? 'border-t border-gray-300' : ''}`}>
      <div className="w-fit px-2 h-full">
        <Link href='/profile' className='h-full w-fit'>
          <div className='h-full w-fit p-2 mx-auto rounded-full bg-[#CDD6DC]'>
            <UserIconSolid className='w-8 text-[#677685]' />
          </div>
        </Link>
      </div>
      <div className="w-full h-full">
        <div className="flex justify-between">
          <span className="text-md text-[#0f1419] font-semibold">
            @{user.username}
            <time className="ml-1 text-sm text-[#536471]">
              {createdAt.toDateString()}
            </time>
          </span>
          <div className='p-1 w-fit h-fit hover:bg-blue-100 rounded-full cursor-pointer'>
            <EllipsisHorizontalIcon className="w-6" />
          </div>
        </div>

        <div className="text-md text-[#0f1419] whitespace-pre-line	">
          {content.slice(0, 2*Math.floor(content.length/3))}...
        </div>

        <Link
          href={'#'}
          className="text-md text-[#1d9bf0] hover:underline"
        >
          Show more
        </Link>

        <div>
          {imgUrl &&
            <Image
              width={250}
              height={250}
              src={imgUrl}
              alt="img"
            />
          }
        </div>

        <div className="flex justify-between mt-1 md:justify-around">
          <div className="flex items-center p-1 rounded-full text-[#536471] cursor-pointer hover:text-blue-700 hover:font-semibold">
            <div className="flex items-center justify-center p-1 rounded-full cursor-pointer hover:bg-blue-200 hover:text-blue-500 hover:font-semibold">
              <ChatBubbleOvalLeftEllipsisIcon className="w-6" />
            </div>
            <span className="text-sm">{comments.length}</span>
          </div>

          <div className="flex items-center p-1 rounded-full text-[#536471] cursor-pointer hover:text-green-700 hover:font-semibold">
            <div className="flex items-center justify-center p-1 rounded-full cursor-pointer hover:bg-green-200 hover:text-green-500 hover:font-semibold">
              <ShareIcon className="w-6" />
            </div>
            <span className="text-sm">{numOfShares}</span>
          </div>

          <div className="flex items-center p-1 rounded-full text-[#536471] cursor-pointer hover:text-red-700 hover:font-semibold">
            <div className="flex items-center justify-center p-1 rounded-full cursor-pointer hover:bg-red-200 hover:text-red-500 hover:font-semibold">
              <HeartIcon className="w-6" />
            </div>
            <span className="text-sm">{numOfLikes}</span>
          </div>

          <div className="flex items-center p-1 rounded-full text-[#536471] cursor-pointer hover:text-purple-700 hover:font-semibold">
            <div className="flex items-center justify-center p-1 rounded-full cursor-pointer hover:bg-purple-200 hover:text-purple-500">
              <BookmarkIcon className="w-6" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
