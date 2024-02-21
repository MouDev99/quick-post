export default function AlertMessage(
  {cancelAction,
   performAction
  }:
  {cancelAction: React.MouseEventHandler<HTMLButtonElement>
   performAction: React.MouseEventHandler<HTMLButtonElement>
  }
) {

  return (
    <div className="">
      <span className="text-xl text-[#0f1419] font-bold">Clear all bookmarks?</span>
      <span className="text-sm text-[#536471] block mt-1 leading-tight">
        This can’t be undone and you’ll remove all posts you’ve added to your Bookmarks.
      </span>
      <button
        className="w-full rounded-3xl bg-[#f4212e] text-md text-white font-bold py-2 mt-5 hover:bg-[#DC1E29] transition-colors duration-300"
        onClick={performAction}
      >
        Clear
      </button>
      <button
        className="w-full rounded-3xl bg-[] text-md text-[#0f1419] font-bold py-2 mt-2 border hover:bg-gray-200 transition-colors duration-300"
        onClick={cancelAction}
      >
        Cancel
      </button>
    </div>
  )
}
