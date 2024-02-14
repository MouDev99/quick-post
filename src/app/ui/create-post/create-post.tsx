'use client';

import { memo, useEffect, useState } from 'react';
import Link from 'next/link';
import EmojiPicker from './emoji-picker';
import PollCreator from './poll-creator';
import Modal from '../modal';
import {
  ChartBarSquareIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
  XMarkIcon
 } from '@heroicons/react/24/outline';
import Image from 'next/image';
import UserAvatar from '../user-avatar';
import { useEdgeStore } from '@/app/lib/edgestroe';
import { useFormState } from 'react-dom';
import { createPostAction } from '@/app/lib/actions';
import { PostState } from '@/app/lib/definitions';
import { useSession } from 'next-auth/react';

const CreatePost = memo( function CreatePost() {
  const [showPicker, setShowPicker] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [imgSrc, setImgSrc] = useState('');
  const [content, setContent] = useState('');

  const initialState: PostState = {errors: {}};
  const [state, dispatch] = useFormState<PostState>(createPostAction, initialState);
  const [formData, setFormData] = useState(new FormData());
  const [file, setFile] = useState<File>();

  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();

  const handleImgUpload = async (e) => {
    const files = e.target?.files;
    if (!files) return;

    const file = files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setImgSrc(tempUrl);
      setFile(file);
    }
  }

  // uploads the image file to edgestore then
  // returns the image file url to use for the db.
  const storeImgFile = (file: File | undefined): Promise<string | null> => {
    return new Promise(async (resolve, reject) => {
      if (!file) resolve(null);
      else {
        try {
          const res = await edgestore.publicFiles.upload({ file });
          resolve(res.url);
        } catch (error) {
          reject(error);
        }
      }
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const ppUrl = await storeImgFile(file);
    if (ppUrl) formData.set('imgUrl', ppUrl);
    formData.set('userId', '' + session?.user?.id)
    // dispatch(formData);
    dispatch(formData);
  };

  useEffect(() => {
    if (state.success) window.location.reload();
  }, [state])

  return (
    <div>
      <div className='flex justify-center py-3 w-full  sm:w-5/6 mx-auto border-b border-gray-300 '>
        <Link href='/profile' className='h-full w-fit'>
          <UserAvatar
            styles={'sm:w-16 sm:h-16'}
            userProfileUrl={null}
            userId={session?.user?.id?? ''}
          />
        </Link>
        <form onSubmit={handleFormSubmit} className='sm:w-5/6 ml-2'>
          <textarea
            className='w-full max-h-44 h-24 text-md text-gray-700 outline-none rounded-lg p-3 border-b focus:h-28 focus:shadow-md transition-all duration-500'
            id='content'
            value={content}
            name='content'
            placeholder="What's on your mind?"
            onChange={(e) => {
              const {name, value} = e.target;
              formData.set(name, value);
              setContent(value);
            }}
          >
          </textarea>
          {state?.errors?.content &&
            <div className='h-fit bg-red-200 text-red-600 py-1 px-2 rounded-lg border border-red-600'>
              {state?.errors?.content?.map((error: string, idx: number) => {
                return <div key={idx}>{error}</div>
              })
              }
            </div>
          }
          <div className='flex w-full h-10'>
            <div className='relative flex justify-start items-start'>

              <label htmlFor='file' className='p-2 rounded-full cursor-pointer hover:bg-blue-100'>
                <input
                  id='file'
                  type="file"
                  className='hidden'
                  onChange={handleImgUpload}
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
                  content={content}
                  setContent={setContent}
                  formData={formData}
                />
              }
              {showPollModal &&
                <Modal
                  styles='w-96 h-fit m-auto mt-56 md:left-2/4	md:top-44 md:m-0 z-50 bg-white'
                  onClose={() => setShowPollModal(false)}
                >
                  <PollCreator />
                </Modal>
              }
            </div>
            <button
              type='submit'
              className={`${(content.trim().length === 0) && !imgSrc ? 'opacity-60' : 'hover:bg-blue-500'} ml-auto h-5/6 px-5 self-center rounded-2xl text-white font-bold bg-[#3A98EB]`}
              disabled={(content.trim().length === 0) && !imgSrc}
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
            className='mx-auto mb-1 rounded-md border border-gray-300'
            alt=''
          />
        </div>
      }
    </div>
  )
});

export default CreatePost;
