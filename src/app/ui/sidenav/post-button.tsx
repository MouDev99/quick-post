import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function PostButton() {

  return (
    <div className='flex h-[48px] items-center justify-center mt-4'>
      <button className='flex justify-center items-center w-full h-full rounded-full md:rounded-3xl font-bold bg-[#3A98EB] hover:bg-blue-500 transition-colors duration-300'>
        <div className='hidden md:block text-lg text-white'>
          Post
        </div>
        <PencilSquareIcon className='w-7 text-white md:hidden'/>
      </button>
    </div>
  )
}
