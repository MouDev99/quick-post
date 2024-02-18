import { CreateCommentAction } from "@/app/lib/actions";
import { CommentState } from "@/app/lib/definitions";
import { useEffect } from "react";
import { useFormState } from "react-dom";

export default function CreateComment(
  {postId, userId}:
  {postId: string, userId: string | undefined}
) {
  const createCommentWithPostAndUserId = CreateCommentAction.bind(null, postId, userId);
  const initialState: CommentState = { errors: {} };
  const [state, dispatch] = useFormState(createCommentWithPostAndUserId, initialState);

  useEffect(() => {
    if (state.success) window.location.reload();
  }, [state]);

  return (
    <form
      action={dispatch}
      className="flex flex-col w-full mr-6 sm:w-3/4 sm:mr-0 border-none outline-none"
    >
      <textarea
        className="w-full p-2 max-h-44 h-[5rem] ml-1 rounded-lg border focus:h-24 focus:shadow-md focus:outline-none transition-all duration-500"
        name='content'
        placeholder="Write a comment here..."
      >
      </textarea>
      <button
        type="submit"
        className="self-end mt-1 rounded-3xl px-[.7rem] py-[.3rem] text-white text-sm bg-[#3A98EB] hover:bg-blue-500 transition-all duration-300"
      >
        Comment
      </button>
      {state?.errors?.content &&
        <div className="p-2 mt-1 text-red-800 bg-red-200 border border-red-700 rounded-lg">
          {state.errors.content.map((error, idx) => {
            return <p key={idx}>{error}</p>
          })}
        </div>
      }
      {state?.message &&
        <div className="p-2 mt-1 text-red-800 bg-red-200 border border-red-700 rounded-lg">
          {state.message}
        </div>
      }
    </form>
  )
}
