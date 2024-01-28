export default function LoginForm() {

  return (
    <form className="my-2 max-w-full">
      <div className="flex flex-col">
        <label htmlFor="username" className="text-xl font-semibold">Username</label>
        <input id="username" type="text" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required/>
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="email" className="text-xl font-semibold">Email</label>
        <input id="email" type="email" className="w-full px-3 py-2 rounded-xl border-2 border-gray-300" required/>
      </div>
      <div className="mt-4">
        <button type="submit" className="flex justify-center rounded-xl py-2 w-full font-semibold text-md text-white bg-[#3A98EB] hover:opacity-90 transition-opacity duration-300">
          Sign in
        </button>
      </div>
    </form>
  )
}
