import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  ListBulletIcon,
  BookmarkIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import PostButton from './post-button';
import UserInfo from './user-info';
import { auth } from '@/auth';

export default async function SideNav() {
  const session = await auth();
  const username = session?.user?.name;

  const navItems = [
    {title: 'Home', link: '/home', Icon: HomeIcon},
    {title: 'Explore', link: '/explore', Icon: MagnifyingGlassIcon},
    {title: 'Notifications', link: '/notifications', Icon: BellIcon},
    {title: 'Messages', link: '/messages', Icon: EnvelopeIcon},
    {title: 'Lists', link: '/lists', Icon: ListBulletIcon },
    {title: 'Bookmarks', link: '/bookmarks', Icon: BookmarkIcon},
    {title: 'Profile', link: `/${username}`, Icon: UserIcon},
  ];

  return (
    <div className='sticky top-0 h-screen flex flex-col border-x border-gray-200 xl:w-72'>
      {navItems.map((item, i) => <NavItem key={i} item={item}/>)}
      <PostButton />
      <UserInfo />
    </div>
  )
}

function NavItem({item}: {item: any}) {
  const {title, link, Icon} = item;

  return (
    <Link
      key={title}
      href={link}
      className="flex h-[48px] items-center justify-center text-black gap-2 rounded-md p-3 text-md font-medium hover:bg-gray-200 lg:flex-none lg:justify-start lg:p-2 lg:px-3"
    >
      <Icon className="w-6" />
      <p className="hidden lg:block">{title}</p>
    </Link>
  )
}
