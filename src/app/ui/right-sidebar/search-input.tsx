import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchInput() {

  return (
    <div className="sticky top-0 z-50 w-[355px] flex gap-1 items-center px-3 border rounded-3xl text-gray-500 h-12 bg-gray-100 has-[:focus]:text-[#3A98EB] has-[:focus]:border-[1.5px] has-[:focus]:border-[#3A98EB] has-[:focus]:bg-white ">
      <label htmlFor="search" className="w-fit">
        <MagnifyingGlassIcon className="w-6"/>
      </label>
      <input
        id="search"
        type="text"
        className="w-full h-full rounded-3xl p-1 text-black text-md border-none outline-none bg-gray-100 focus:bg-white"
        placeholder="Search"
      />
    </div>
  )
}
