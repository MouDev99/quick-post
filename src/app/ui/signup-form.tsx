'use client';

import { useState } from 'react';
import Image from 'next/image';
import {ArrowUpTrayIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import {UserIcon as UserIconSolid} from '@heroicons/react/24/solid';
import { useFormState, useFormStatus } from 'react-dom';
import { signUp } from '../lib/actions';
import { SignUpState } from '../lib/definitions';
import { useEdgeStore } from '../lib/edgestroe';

export default function SignupFrom() {
  const initialState: SignUpState = {message: null, errors: {}};
  const [state, dispatch] = useFormState<SignUpState>(signUp, initialState);
  const { pending } = useFormStatus();
  const [formData, setFormData] = useState(new FormData());

  // pp for profile picture
  const [ppImgSrc, setPpImgSrc] = useState<null | string>(null);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const handleImgUpload = async (e) => {
    const files = e.target?.files;
    if (!files) return;

    const file = files[0];
    if (file) {
      const tempUrl = URL.createObjectURL(file);
      setPpImgSrc(tempUrl);
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

  const handleChange = (e) => {
    const {name, value} = e.target;
    formData.set(name, value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    const ppUrl = await storeImgFile(file);
    if (ppUrl) formData.set('userProfileUrl', ppUrl);

    dispatch(formData); // Trigger form action
  };

  return (
    <form onSubmit={handleFormSubmit} className='grid grid-rows-6 grid-cols-2 gap-2 max-w-fit mx-auto max-[425px]:flex max-[425px]:flex-col'>
      <div className="flex flex-col justify-center text-center col-span-2 row-span-1 border border-gray-200 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold">Sign Up</h1>
        <p className="text-lg text-gray-500">Create your account and start exploring.</p>
      </div>
      <div className='flex flex-col justify-between row-span-4 p-2 border border-gray-200 rounded-lg shadow-md'>
        <div className="flex flex-col mt-4">
          <label htmlFor="username" className="text-lg font-semibold">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Choose a username"
            className="w-full px-3 py-2 rounded-xl border-2 border-gray-300"
            required
            onChange={handleChange}
          />
          <div id="username-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.username &&
              state.errors.username.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="email" className="text-lg font-semibold">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Type your email"
            className="w-full px-3 py-2 rounded-xl border-2 border-gray-300"
            required
            onChange={handleChange}
          />
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.email &&
              state.errors.email.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="password" className="text-lg font-semibold">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Type a strong password"
            className="w-full px-3 py-2 rounded-xl border-2 border-gray-300"
            required
            onChange={handleChange}
          />
          <div id="password-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.password &&
              state.errors.password.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        <div className="flex flex-col mt-2">
          <label htmlFor="confirmPassword" className="text-lg font-semibold">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Retype your password"
            className="w-full px-3 py-2 rounded-xl border-2 border-gray-300"
            required
            onChange={handleChange}
          />
          <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
            {state?.errors?.confirmPassword &&
              state.errors.confirmPassword.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
      </div>
      <div className='flex flex-col justify-center items-center h-full row-span-4 p-2 border border-gray-200 rounded-lg shadow-md'>
        <div className='flex justify-center items-center w-32 h-32 min-[425px]:w-48 min-[425px]:h-48 rounded-full bg-[#CDD6DC] border border-gray-200 shadow-lg'>
          {ppImgSrc ?
            <Image
              src={ppImgSrc || ''}
              width={128}
              height={128}
              alt='profile picture'
              className='w-full h-full object-cover rounded-full'
            /> :
            <UserIconSolid className='w-16 min-[425px]:w-24 text-[#677685]'/>
          }
        </div>
        <label htmlFor='file' className='flex justify-center p-2 rounded-full cursor-pointer'>
            <input
              id='file'
              type="file"
              className='hidden'
              name='profile-pic'
              onChange={handleImgUpload}
            />
          <span className="flex text-sm px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-100">
           <ArrowUpTrayIcon className='w-4 mr-1' /> Upload Profile Picture
          </span>
        </label>
      </div>
      <div className='col-span-2'>
        <div>
          <button type="submit" aria-disabled={pending} className="flex justify-center rounded-xl py-2 w-full font-semibold text-lg text-white bg-[#3A98EB] shadow-md hover:opacity-90 transition-opacity duration-300">
          Sign Up
          </button>
        </div>
        <div
            className="flex h-5 mt-2 items-start"
            aria-live="polite"
            aria-atomic="true"
          >
            {state?.message && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500 ml-1">{state?.message}</p>
              </>
            )}
        </div>
      </div>
    </form>
  )
}
