'use client';

import { ChangeEvent, memo, useEffect, useState } from 'react';
import Link from 'next/link';
import EmojiPicker from './emoji-picker';
import PollCreator from './poll-creator';
import {Modal} from '../modal';
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
import Spinner from '../spinner';

const CreatePost = memo(function CreatePost() {
  const [showPicker, setShowPicker] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>('');
  const [content, setContent] = useState('');

  const initialState: PostState = {errors: {}};
  const [state, dispatch] = useFormState(createPostAction, initialState);
  const [formData, setFormData] = useState(new FormData());
  const [pending, setPending] = useState(false);
  const [file, setFile] = useState<File>();

  const { edgestore } = useEdgeStore();
  const { data: session } = useSession();

  const handleImgUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    if (!files) return;

    const file = files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      if (setImgSrc) setImgSrc(tempUrl);
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

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>)=> {
    e.preventDefault(); // Prevent the default form submission

    const ppUrl = await storeImgFile(file);
    if (ppUrl) formData.set('imgUrl', ppUrl);
    formData.set('userId', '' + session?.user?.id)
    dispatch(formData);
    setPending(true);
  };

  useEffect(() => {
    if (state.success) {
      if (setImgSrc) setImgSrc(null);
      setContent('');
    }
    setPending(false);
  }, [state])

  return (
    <div className='px-1'>
      <div className='flex justify-center pb-2 w-full mx-auto border-b border-gray-300 '>
        <Link href={`/${session?.user?.name}`} className='h-fit w-fit'>
          <UserAvatar
            styles={'w-14 h-fit'}
            noProfilePicStyles='w-10'
            userProfileUrl={null}
            userId={session?.user?.id?? ''}
          />
        </Link>
        <form onSubmit={handleFormSubmit} className='w-full max-w-[340px] ml-1'>
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
            <div className='h-fit bg-red-200 text-red-600 py-1 px-2 my-1 rounded-lg border border-red-600'>
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
                  styles='absolute top-0 left-1/2 right-0 bottom-0 mt-72 p-2 w-fit h-fit bg-white rounded-lg max-h-full overflow-auto'
                  onClose={() => setShowPollModal(false)}
                >
                  <PollCreator />
                </Modal>
              }
            </div>
            <button
              type='submit'
              className={`${(content.trim().length === 0) && !imgSrc ? 'opacity-60' : 'hover:bg-blue-500'} ml-auto w-20 h-5/6 px-5 self-center rounded-2xl text-white font-bold bg-[#3A98EB]`}
              disabled={((content.trim().length === 0) && !imgSrc) || pending}
            >
              {pending ?
               <Spinner
                 styles='w-5 h-5 border-2 border-t-2'
               /> :
               'Post'}
            </button>
          </div>
        </form>
      </div>

      {imgSrc &&
        <div className='w-full border-b border-gray-300'>
          <div
            className='w-fit p-1 ml-auto mr-1 my-1 cursor-pointer rounded-full	hover:bg-gray-200 transition-all duration-100'
            onClick={() => setImgSrc(null)}
          >
            <XMarkIcon className='w-6 text-black'/>
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
