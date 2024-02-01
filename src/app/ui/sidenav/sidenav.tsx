import { auth, signOut } from "@/auth";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  BellIcon,
  EnvelopeIcon,
  ListBulletIcon,
  BookmarkIcon,
  UserIcon,
 } from '@heroicons/react/24/outline';
import Link from 'next/link';
import PostButton from './post-button';
import UserInfo from './user-info';

const signOutUser = async () => {
  'use server';
  await signOut();
};

const navItems = [
  {title: 'Home', link: '/feed', Icon: HomeIcon},
  {title: 'Explore', link: '/explore', Icon: MagnifyingGlassIcon},
  {title: 'Notifications', link: '/notifications', Icon: BellIcon},
  {title: 'Messages', link: '/messages', Icon: EnvelopeIcon},
  {title: 'Lists', link: '/lists', Icon: ListBulletIcon },
  {title: 'Bookmarks', link: '/bookmarks', Icon: BookmarkIcon},
  {title: 'Profile', link: '/profile', Icon: UserIcon},
];

export default async function SideNav() {
  const session = await auth();

  return (
    <div className='flex flex-col md:w-72 border-2 border-green-500'>
      {navItems.map((item, i) => <NavItem key={i} item={item}/>)}
      <PostButton />
      <UserInfo user={session?.user} signOutUser={signOutUser}/>
    </div>
  )
}

function NavItem({item}: {item: any}) {
  const { title, link, Icon } = item;

  return (
    <Link
      key={title}
      href={link}
      className="flex h-[48px] items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-md font-medium hover:bg-gray-200 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <Icon className="w-6" />
      <p className="hidden md:block">{title}</p>
    </Link>
  )
}
