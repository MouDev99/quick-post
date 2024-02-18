'use client';

import {ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/app/lib/actions';

export default function LoginForm() {
  const [errorMessage, dispatch] = useFormState(authenticate, undefined);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch} className="my-2 max-w-full">
      <div className="flex flex-col text-black">
        <label htmlFor="username" className="text-lg font-semibold">Username</label>
        <input id="username" name='username' type="text" placeholder="Username" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required/>
      </div>
      <div className="flex flex-col mt-2 text-black">
        <label htmlFor="password" className="text-lg font-semibold">Password</label>
        <input id="password" name="password" type="password" placeholder="Password" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required/>
      </div>
      <div className="mt-4">
        <button type="submit" aria-disabled={pending} className="flex justify-center rounded-xl py-2 w-full font-semibold text-md text-white bg-[#3A98EB] hover:opacity-90 transition-opacity duration-300">
          Sign In
        </button>
      </div>
      <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage}</p>
            </>
          )}
        </div>
    </form>
  )
}
