export default function SignupFrom() {

  return (
    <form>
      <div className="flex flex-col mt-4">
        <label htmlFor="username" className="text-xl font-semibold">Username</label>
        <input id="username" type="text" placeholder="Choose a username" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="email" className="text-xl font-semibold">Email</label>
        <input id="email" type="email" placeholder="Type your email" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="password" className="text-xl font-semibold">Password</label>
        <input id="password" type="password" placeholder="Type a strong password" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="confirmpassword" className="text-xl font-semibold">Confirm password</label>
        <input id="confirmpassword" type="password" placeholder="Retype your password" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required />
      </div>
      <div className="mt-4">
        <button type="submit" className="flex justify-center rounded-xl py-2 w-full font-semibold text-md text-white bg-[#3A98EB] hover:opacity-90 transition-opacity duration-300">
          Create Account
        </button>
      </div>
    </form>
  )
}
