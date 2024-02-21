import { useState } from "react";
import Modal from "../modal";
import AlertMessage from "../alert-message";
import { ClearAllBookmarksAction } from "@/app/lib/actions";

export default
function ClearButton(
  {setShowClearButton,
   userId
  }:
  {setShowClearButton: Function,
   userId: string | undefined
  }
) {
  const [showAlert, setShowAlert] = useState(false);
  const [showError, setShowError] = useState(false);

  const clearAllBookmarks = async (e: React.MouseEvent<HTMLButtonElement>) => {

    if (!userId) return;

    const userIdInt = parseInt(userId);
    const res = await ClearAllBookmarksAction(userIdInt);

    if (res?.success) window.location.reload();
    else {
      setShowError(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setShowAlert(false);
      setShowClearButton(false);
    }
  }

  const cancelAction = (e: React.MouseEvent<HTMLButtonElement>) => {
    setShowAlert(false);
    setShowClearButton(false);
  }

  return (
    <div className="absolute top-0 right-0 z-40">
      <button
        className="flex items-center bg-white px-3 py-2 rounded-lg shadow-md border text-[#f4212e] text-md font-bold"
        onClick={(e) => {
          e.nativeEvent.stopImmediatePropagation();
          setShowAlert(true)
        }}
      >
        Clear all bookmarks
      </button>
      {showAlert &&
        <Modal
          styles="w-80 h-fit sm:h-60 p-8 m-auto rounded-xl border-2 border-gray-200"
          onClose={cancelAction}
        >
          <AlertMessage
            performAction={clearAllBookmarks}
            cancelAction={cancelAction}
          />
        </Modal>
      }
      {showError &&
        <Modal
          styles="w-fit h-fit m-auto rounded-xl border border-red-600 "
          onClose={cancelAction}
        >
          <p className="text-red-600">An error has occurred. Try again later.</p>
        </Modal>
      }
    </div>
  )
}
