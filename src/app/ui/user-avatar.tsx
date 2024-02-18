'user client';

import Image from 'next/image';
import { UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";

export default function UserAvatar(
  {userProfileUrl, styles, userId }:
  {
    userProfileUrl: string | null,
    styles: string,
    userId: number | string
  }
) {
  const { data: session } = useSession();

  let imgSrc;
  if (!userProfileUrl && (userId === session?.user?.id)) {
    imgSrc = session?.user?.image
  } else imgSrc = userProfileUrl;

  if (!imgSrc) return <NoProfilePicAvatar />

  return (
    <div className='border-2 border-gray-600 rounded-full overflow-hidden w-fit'>
      <Image
        width={45}
        height={45}
        src={imgSrc}
        className={'rounded-full object-cover aspect-square' + styles}
        alt='profile-pic'
      />
    </div>
  )
}

function NoProfilePicAvatar() {

  return (
    <div className='w-fit h-full p-2 rounded-full bg-[#CDD6DC]'>
      <UserIconSolid className='w-8 text-[#677685]' />
    </div>
  )
}
