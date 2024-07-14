import { X } from "lucide-react";
import { ReactNode, useRef } from "react";

interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}
const Modal = ({ isOpen, onClose, children }: IModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (e: any) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/25" onClick={handleClickOutside}>
      <div className="absolute mx-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  max-w-md w-full p-2">
        <div
          ref={modalRef}
          className="relative rounded-lg shadow-lg  w-full border bg-white text-black  py-10 px-5"
        >
          <X
            onClick={onClose}
            className="absolute top-3 right-3 cursor-pointer size-7 hover:bg-black/5 rounded-full p-px opacity-80 hover:opacity-100 duration-200"
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export { Modal };
