'use client';

import { useState } from 'react';
import CreatePost from '../create-post';
import {Modal} from '../modal';
import { PencilSquareIcon } from '@heroicons/react/24/outline';

export default function PostButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='flex w-full h-[48px] items-center justify-center mt-4'>
      <button
        className='flex justify-center items-center w-full h-full rounded-full md:rounded-3xl font-bold bg-[#3A98EB] hover:bg-blue-500 transition-colors duration-300'
        onClick={(e) => setShowModal(true)}
      >
        <div className='hidden xl:block text-lg text-white'>
          Post
        </div>
        <PencilSquareIcon className='w-7 text-white xl:hidden'/>
      </button>
      {showModal &&
       <Modal
         styles='absolute top-0 left-0 right-0 bottom-0 mx-auto mt-24 p-1 w-fit h-fit bg-white rounded-lg max-h-full'
         onClose={() => setShowModal(false)}
       >
         <div className='mx-8 my-6'>
           <CreatePost />
         </div>
       </Modal>
      }
    </div>
  )
}
