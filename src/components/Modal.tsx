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

  return isOpen ? (
    <div className="absolute inset-0 z-50 bg-black/25" onClick={handleClickOutside}>
      <div
        ref={modalRef}
        className="absolute max-w-md rounded-lg shadow-lg py-10 px-5 w-full border bg-white text-black mx-auto  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
      >
        <X
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer size-6 hover:bg-black/5 rounded-full p-px opacity-80 hover:opacity-100 duration-200"
        />
        {children}
      </div>
    </div>
  ) : null;
};

export { Modal };
