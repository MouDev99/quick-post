import Link from 'next/link';
import { Cog8ToothIcon } from '@heroicons/react/24/outline';

export default function TabNavigation(
  { activeTab, setActiveTab}:
  {
    activeTab: string,
    setActiveTab: Function
  }
) {
  const activeClass = 'font-extrabold text-gray-800 border-b-4 border-[#3A98EB]';

  return (
    <div className="sticky top-0 z-50 h-fit mb-2 bg-white border-b border-gray-300">
      <div className="grid grid-rows-2 grid-cols-2 gap-1 sm:grid-rows-1 sm:grid-cols-3 border-b-[1px] border-gray-300 shadow-sm">
        <Link
          href='/home'
          className='flex justify-start items-center pl-2 text-lg text-gray-800 font-bold sm:hidden'
        >
          Home
        </Link>
        <div className='w-full flex justify-end items-center sm:order-last'>
         <button className='flex justify-center items-center w-10 h-10 rounded-full hover:bg-gray-200'>
          <Cog8ToothIcon className='w-6' />
         </button>
        </div>
        <div
          className='flex justify-center items-center w-32 h-14 cursor-pointer hover:bg-gray-200'
          onClick={() => setActiveTab('ForYou')}
        >
          <span className={`flex items-center h-full text-md font-semibold text-gray-600 ${activeTab === "ForYou" ? activeClass : ''}`}>
            For you
          </span>
        </div>
        <div
          className='flex justify-center items-center w-32 h-14 cursor-pointer hover:bg-gray-200'
          onClick={() => setActiveTab('Following')}
        >
          <span className={`flex items-center h-full text-md font-semibold text-gray-600 ${activeTab === "Following" ? activeClass : ''}`}>
            Following
          </span>
        </div>
      </div>
    </div>
  )
};
