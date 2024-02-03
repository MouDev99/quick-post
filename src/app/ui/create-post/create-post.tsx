'use client';

import { memo, useState } from 'react';
import Link from 'next/link';
import EmojiPicker from './emoji-picker';
import PollCreator from './poll-creator';
import Modal from '../modal';
import { UserIcon as UserIconSolid } from '@heroicons/react/24/solid';
import {
  ChartBarSquareIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon
 } from '@heroicons/react/24/outline';
import Image from 'next/image';

const CreatePost = memo(() => {
  const [showPicker, setShowPicker] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [content, setContent] = useState('');

  return (
    <div>
      <div className='flex p-3 border-b border-gray-300'>
        <Link href='/profile' className='h-full w-fit'>
          <div className='h-full w-fit p-2 rounded-full bg-[#CDD6DC]'>
            <UserIconSolid className='w-8 text-[#677685]' />
          </div>
        </Link>
        <form className='w-full ml-2'>
          <textarea
            className='w-full max-h-24 text-md text-gray-700 outline-none rounded-lg p-1 border-b focus:p-3 focus:h-16 focus:shadow-md transition-all duration-500'
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
          </textarea>
          <div className='flex w-full h-10'>
            <div className='relative flex justify-start items-start'>
              <label htmlFor='file' className='p-2 rounded-full cursor-pointer hover:bg-blue-100'>
                <input
                  id='file'
                  type="file"
                  className='hidden'
                  onChange={(e) => {
                    const files = e.target.files;
                    if (!files) return;
                    const currImgSrc = URL.createObjectURL(files[0]);
                    setImgSrc(currImgSrc);
                  }}
                />
                <PhotoIcon strokeWidth={2} className='w-5 text-[#3A98EB]' />
              </label>
              <div
                className='p-2 w-fit hover:bg-blue-100 rounded-full cursor-pointer'
                onClick={() => setShowPicker(true)}
              >
                <FaceSmileIcon strokeWidth={2} className='w-5 text-[#3A98EB]' />
              </div>
              <div
                className='p-2 w-fit hover:bg-blue-100 rounded-full cursor-pointer'
                onClick={() => setShowPollModal(true)}
              >
                <ChartBarSquareIcon className='w-5 text-[#3A98EB]' />
              </div>

              <div className='p-2' aria-disabled={true}>
                <MapPinIcon strokeWidth={2} className='w-5 text-blue-200' />
              </div>

              {showPicker &&
                <EmojiPicker
                  hidePicker={() => setShowPicker(false)}
                  setContent={setContent}
                />
              }
              {showPollModal &&
                <Modal
                  styles='w-96 h-fit m-auto mt-56 md:left-2/4	md:top-44 md:m-0'
                  onClose={() => setShowPollModal(false)}
                >
                  <PollCreator />
                </Modal>
              }
            </div>
            <button
              type='submit'
              className={`${content.trim().length === 0 ? 'opacity-60' : 'hover:bg-blue-500'} ml-auto h-5/6 px-5 self-center rounded-2xl text-white font-bold bg-[#3A98EB]`}
              disabled={content.trim().length === 0}
            >
              Post
            </button>
          </div>
        </form>
      </div>

      {imgSrc &&
        <div className='w-full border-b border-gray-300'>
          <div
            className='w-fit p-1 ml-auto cursor-pointer rounded-full	hover:bg-gray-200 transition-all duration-100'
            onClick={() => setImgSrc(null)}
          >
            <XMarkIcon className='w-6'/>
          </div>
          <Image
            src={imgSrc}
            width={350}
            height={350}
            className='mx-auto mb-1 rounded-md'
            alt=''
          />
        </div>
      }
    </div>
  )
});

export default CreatePost;
