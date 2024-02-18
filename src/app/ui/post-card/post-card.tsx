'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PostType } from "@/app/lib/definitions";
import { useSession } from "next-auth/react";
import {
  BookmarkIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  ShareIcon
} from "@heroicons/react/24/outline";
import PostActions from "./post-actions";
import UserAvatar from "../user-avatar";
import {
  addOrRemoveFromBookmarks,
  likeOrDislikePost
} from "@/app/lib/actions";

export default function PostCard(
  {
    post,
    fullView,
    idx
  }:
  {
    post: PostType,
    fullView: boolean,
    idx: number
  }
) {
  const {
    id,
    content,
    imgUrl,
    userId,
    username,
    userProfileUrl,
    numOfLikes,
    numOfCmnts,
    likedByUsers,
    bookmarkedByUsers,
    createdAt
  } = post;

  const {data: session} = useSession();
  const sessionUser = session?.user;
  const [liked, setLiked] =
   useState(likedByUsers.includes(parseInt(sessionUser?.id?? 'false')));
  const [likeDisabled, setLikeDisabled] = useState(false);
  const [likes, setLikes] = useState(parseInt(numOfLikes));

  const [bookmarked, setBookmarked] =
    useState(bookmarkedByUsers.includes(parseInt(sessionUser?.id?? 'false')));
  const [bookmarkDisabled, setBookmarkDisabled] = useState(false);

  const [showPostActions, setShowPostActions] = useState(false);

  let postText;
  if (!content) postText = '';
  else {
    postText = fullView ? content :
      content.length < 100 ? content :
      content.slice(0, 2*Math.floor(content.length/3)) + '...';
  }

  useEffect(() => {
    const hidePostActions = () => setShowPostActions(false);

    if (showPostActions) {
      document.addEventListener('click', hidePostActions);
    }

    return () => document.removeEventListener('click', hidePostActions);
  }, [showPostActions])

  return (
    <div className={`h-fit min-h-48 flex pt-2 mt-2 border-b border-gray-300 ${idx === 0 ? 'border-t border-gray-300' : ''}`}>
      <div className="w-fit px-2 h-full">
        <Link href='/profile' className='h-full w-fit'>
          <UserAvatar
            styles=""
            userProfileUrl={userProfileUrl}
            userId={userId}
          />
        </Link>
      </div>
      <div className="relative flex flex-col w-full">
        <div className="flex justify-between">
          <span className="text-lg text-[#0f1419] font-semibold">
            <Link href='/profile'>@{username}</Link>
            <time className="ml-1 text-sm text-[#536471]">
              {new Date(createdAt).toDateString()}
            </time>
          </span>
          <div
            className='p-1 w-fit h-fit hover:bg-blue-100 rounded-full cursor-pointer text-black'
            onClick={() => setShowPostActions(true)}
          >
            <EllipsisHorizontalIcon className="w-6" />
          </div>
        </div>

        <Link href={`/post/${id}`} className="text-md text-[#0f1419] whitespace-pre-line">
          {postText}
        </Link>
        {showPostActions &&
            <PostActions
              user={{
                id: userId,
                username,
              }}
            />
          }

        {!fullView && (content && (content.length > postText.length)) &&
          <Link
            href={`post/${id}`}
            className="text-md text-[#1d9bf0] hover:underline"
          >
            Show more
          </Link>
        }

        <div>
          {imgUrl &&
            <Link href={`/post/${id}`}>
              <Image
                width={350}
                height={350}
                src={imgUrl}
                className="rounded-lg my-2 w-fit h-fit"
                alt="img"
              />
            </Link>
          }
        </div>

        <div className="flex justify-start mt-auto">
          <div className="flex flex-1 items-center p-1 rounded-full text-[#536471] cursor-pointer hover:text-blue-700">
            <div className="flex items-center justify-center p-1 rounded-full cursor-pointer hover:bg-blue-200 hover:text-blue-500">
              <ChatBubbleOvalLeftEllipsisIcon className="w-6" />
            </div>
            <span className="text-sm">{numOfCmnts}</span>
          </div>

          <div className="flex flex-1 items-center p-1 rounded-full text-[#536471] cursor-pointer hover:text-green-700">
            <div className="flex items-center justify-center p-1 rounded-full cursor-pointer hover:bg-green-200 hover:text-green-500">
              <ShareIcon className="w-5" />
            </div>
            <span className="text-sm">{0}</span>
          </div>

          <div className="flex flex-1 items-center p-1 rounded-full text-[#536471] cursor-pointer hover:text-red-700 ">
            <button
              className="flex items-center justify-center p-1 rounded-full hover:bg-red-200 hover:text-red-500"
              disabled={likeDisabled}
              onClick={async () => {
                try {
                  setLikeDisabled(true);

                  let sessionUserId: string | number | undefined = session?.user?.id;
                  if (sessionUserId) sessionUserId = parseInt(sessionUserId);
                  else return;

                  const action = liked ? 'dislike' : 'like';
                  const res = await likeOrDislikePost(action, sessionUserId, id);

                  if (res?.success) {
                    setLiked((prev) => !prev);
                    if (action === 'like') setLikes(prev => prev +1);
                    else if (action === 'dislike') setLikes(prev => prev -1);
                  }
                } catch (error) {
                  console.error(error);
                } finally {
                  setLikeDisabled(false);
                }
              }}
            >
              <HeartIcon className={liked ? 'w-6 text-red-500 fill-[#f44336]' : 'w-6'} />
            </button>
            <span className="text-sm">{likes}</span>
          </div>

          <div className="flex flex-1 items-center p-1 rounded-full text-[#536471] cursor-pointer hover:text-purple-700 hover:font-semibold">
            <button
              className="flex items-center justify-center p-1 rounded-full hover:bg-purple-200 hover:text-purple-500"
              disabled={bookmarkDisabled}
              onClick={async () => {
                try {
                  setBookmarkDisabled(true);

                  let sessionUserId: string | number | undefined = session?.user?.id;
                  if (sessionUserId) sessionUserId = parseInt(sessionUserId);
                  else return;

                  const action = bookmarked ? 'remove' : 'add';
                  const res = await addOrRemoveFromBookmarks(action, sessionUserId, id);
                  if (res?.success) setBookmarked((prev) => !prev);
                } catch (error) {
                  console.error(error);
                } finally {
                  setBookmarkDisabled(false);
                }
              }}
            >
              <BookmarkIcon className={bookmarked ? 'w-6 text-purple-500 fill-[#9c27b0]' : 'w-6'} />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}
