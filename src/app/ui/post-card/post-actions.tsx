import {
  FaceFrownIcon,
  FlagIcon,
  ListBulletIcon,
  NoSymbolIcon,
  PencilIcon,
  TrashIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

const actionItems = [
  {
    title: 'Not interested in this post',
    Icon: FaceFrownIcon
  },
  {
    title: 'Follow @**USER**',
    Icon: UserPlusIcon
  },
  {
    title: 'Add/remove @**USER** from Lists',
    Icon: ListBulletIcon
  },
  {
    title: 'Block @**USER**',
    Icon: NoSymbolIcon
  },
  {
    title: 'Report post',
    Icon: FlagIcon
  }
];

export default function PostActions({user}: {user: any}) {
  const { data: session } = useSession();

  if (session?.user?.id == user.id) {
    return (
      <div className="absolute z-50 top-0 right-0 bg-white rounded-lg border border-gray-300 shadow-md">
        <button className='flex justify-start items-center w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer'
        >
          <PencilIcon className='w-5' />
          <span className='text-md font-semibold ml-2'>
            Edit post
          </span>
        </button>

        <button className='flex justify-start items-center w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer'
        >
          <TrashIcon className='w-5' />
          <span className='text-md font-semibold ml-2'>
            Delete post
          </span>
        </button>
      </div>
    )
  }

  return (
    <div
      className="absolute z-50 top-0 right-0 bg-white rounded-lg border border-gray-300 shadow-md"
      onClick={(e) => e.nativeEvent.stopImmediatePropagation()}
    >
      {actionItems.map((item, i) => {
        return (
          <ActionItem
            key={i}
            item={item}
            user={user}
           />
        )
      })}
    </div>
  )
}

function ActionItem({item, user}: {item: any, user: any}) {
  const { title, Icon } = item;

  return (
    <button className='flex justify-start items-center w-full p-2 rounded-lg hover:bg-gray-100 cursor-pointer'
    >
      <Icon className='w-5'/>
      <span className='text-md font-semibold ml-2'>
        {title.replace('**USER**', user.username)}
      </span>
    </button>
  )
}
