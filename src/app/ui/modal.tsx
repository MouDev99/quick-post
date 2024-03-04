'use client';

import {
  createContext,
  MouseEventHandler,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";

const ModalContext = createContext(null);

export default function ModalProvider({children}: {children: ReactNode}) {
  const ref = useRef(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    setValue(ref.current)
  }, [])

  return (
    <>
      <div ref={ref}></div>
      <ModalContext.Provider value={value}>
        {children}
      </ModalContext.Provider>
    </>
  )
}

export function Modal(
  {children, onClose, styles}:
  {children: ReactNode, onClose: MouseEventHandler, styles: string}
) {
  const modalNode = useContext(ModalContext);

  if (!modalNode) return null;

  const elements = (
    <div
      className="fixed top-0 left-0 right-0 bottom-0 z-50 w-full bg-[rgba(0,0,0,0.5)]"
      onClick={onClose}
    >
      <div
        className={styles}
        onClick={(e) => e.stopPropagation()}
      >
        <IconClose onClose={onClose} />
        {children}
      </div>
    </div>
  );

  return createPortal(elements, modalNode);
}

function IconClose({onClose}: {onClose: MouseEventHandler}) {

  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="currentColor"
      height="2em"
      width="2em"
      className="float-right p-2 text-black cursor-pointer rounded-full	hover:bg-gray-200 transition-all duration-300"
      onClick={onClose}
    >
      <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
    </svg>
  );
}
