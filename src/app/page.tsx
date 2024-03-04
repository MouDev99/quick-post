'use client';

import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';
import { useState } from 'react';
import { Modal } from '@/app/ui/modal';
import SignupFrom from '@/app/ui/signup-form';

export default function Page() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-7 md:p-18 md:flex-row md:justify-center md:gap-7">
      <div className="p-4 m-2 max-[190px]:hidden self-center">
        <Logo />
      </div>
      <div className="text-black shadow-sm px-2 py-4">
        <h1 className="font-bold text-2xl uppercase mt-3 mb-5 sm:text-3xl">Explore. Share. Connect.</h1>
        <h2 className="font-semibold text-2xl my-3 sm:text-3xl">Join today.</h2>
        <LoginForm />
        <div>
          <div className="w-full flex items-center h-3 mb-4">
            <span className="w-full h-1 bg-gray-300 rounded-lg"></span>
            <span className="mx-2 text-gray-600 font-semibold">Or</span>
            <span className="w-full h-1 bg-gray-300 rounded-lg"></span>
          </div>
          <button
            type="submit"
            className="flex justify-center rounded-xl py-2 w-full font-semibold text-md text-white bg-[#3A98EB] hover:opacity-90 transition-opacity duration-300"
            onClick={() => setShowSignup(true)}
          >
            Create Account
          </button>
        </div>
      </div>
      <div>
        {showSignup &&
          <Modal
            styles='absolute top-0 left-0 right-0 bottom-0 m-auto p-1 w-fit h-fit bg-white rounded-lg max-h-full overflow-auto'
            onClose={() => setShowSignup(false)}
          >
            <SignupFrom />
          </Modal>
        }
      </div>
    </main>
  );
}

function Logo() {

  return (
    <Image
      src={'/logo-no-background.png'}
      width={400}
      height={400}
      alt='logo image'
    />
  )
}
