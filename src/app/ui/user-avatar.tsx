'user client';

import Image from 'next/image';
import { UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import { useSession } from "next-auth/react";

export default function UserAvatar({ styles }: {styles: string}) {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user?.image) return <NoProfilePicAvatar />

  return (
    <Image
      width={45}
      height={45}
      src={user.image}
      className={'rounded-full ' + styles}
      alt='profile-pic'
    />
  )
}

function NoProfilePicAvatar() {

  return (
    <div className='h-full p-2 rounded-full bg-[#CDD6DC]'>
      <UserIconSolid className='w-8 text-[#677685]' />
    </div>
  )
}
