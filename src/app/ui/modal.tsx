import { MouseEventHandler, ReactNode } from "react";

export default function Modal({ children, onClose }:
  {
    children: ReactNode,
    onClose: MouseEventHandler
  }
) {

  return (
    <div onClick={onClose} className="bg-transparent backdrop-blur-sm flex justify-center items-start pt-24 fixed top-0 left-0 w-full h-full sm:items-center sm:pt-0">
      <div className="relative w-96 px-4 py-6 bg-white rounded-md border-2 border-gray-300" onClick={(e) => e.stopPropagation()}>
        <IconClose onClose={onClose} />
        {children}
      </div>
    </div>
  )
}


function IconClose({onClose}: {onClose: MouseEventHandler}) {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="2em"
      width="2em"
      className="absolute top-[1px] right-[1px] cursor-pointer p-2 rounded-full	hover:bg-gray-200 transition-all duration-300"
      onClick={onClose}
    >
      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
    </svg>
  );
}