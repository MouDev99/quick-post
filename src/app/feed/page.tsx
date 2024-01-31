import { auth, signOut } from "@/auth";
import { PowerIcon } from "@heroicons/react/24/outline";

export default async function Feed() {
  const session = await auth();

  return (
    <div className="w-full h-full bg-white">
      <h1>Welcome</h1>
      <h2>You are logged in as `{session?.user?.name}`</h2>
      <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex items-center justify-center m-x2 my-4">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
    </div>
  )
};
