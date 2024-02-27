'use client';

import Image from 'next/image';
import { UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";

export default function UserAvatar(
  {userProfileUrl, styles, noProfilePicStyles, userId }:
  {userProfileUrl: string | null, styles: string, noProfilePicStyles?: string | undefined, userId: number | string}
) {
  const { data: session } = useSession();

  let imgSrc;
  if (!userProfileUrl && (userId === session?.user?.id)) {
    imgSrc = session?.user?.image
  } else imgSrc = userProfileUrl;

  if (!imgSrc) return (
    <NoProfilePicAvatar
      styles={noProfilePicStyles}
    />
  )

  return (
    <div className={'rounded-full overflow-hidden ' + styles}>
      <Image
        width={45}
        height={45}
        src={imgSrc}
        className={'border border-gray-500 rounded-full w-full h-full object-cover aspect-square '}
        alt='profile-pic'
      />
    </div>
  )
}

function NoProfilePicAvatar({styles}: {styles: string | undefined}) {

  return (
    <div className={'w-fit h-full p-2 rounded-full bg-[#CDD6DC] ' }>
      <UserIconSolid className={'text-[#677685] ' + styles} />
    </div>
  )
}
