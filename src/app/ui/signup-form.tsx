import {ExclamationCircleIcon } from '@heroicons/react/24/outline';

import { useFormState, useFormStatus } from 'react-dom';
import { signUp } from '../lib/actions';

export default function SignupFrom() {
  const initialState = {message: null, errors: {}};
  const [state, dispatch] = useFormState(signUp, initialState);
  const { pending } = useFormStatus();

  return (
    <form action={dispatch}>
      <h2 className="text-xl text-center font-semibold">Sign Up</h2>
      <div className="flex flex-col mt-4">
        <label htmlFor="username" className="text-lg font-semibold">Username</label>
        <input id="username" name="username" type="text" placeholder="Choose a username" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required />
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
        <input id="email" name="email" type="email" placeholder="Type your email" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required />
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
        <input id="password" name="password" type="password" placeholder="Type a strong password" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required />
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
        <input id="confirmPassword" name="confirmPassword" type="password" placeholder="Retype your password" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required />
        <div id="confirmPassword-error" aria-live="polite" aria-atomic="true">
          {state?.errors?.confirmPassword &&
            state.errors.confirmPassword.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-4">
        <button type="submit" aria-disabled={pending} className="flex justify-center rounded-xl py-2 w-full font-semibold text-md text-white bg-[#3A98EB] hover:opacity-90 transition-opacity duration-300">
        Sign Up
        </button>
      </div>
      <div
          className="flex h-5 mt-4 items-start"
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
    </form>
  )
}
