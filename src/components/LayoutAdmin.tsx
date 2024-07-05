import { ReactNode, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";

const LayoutAdmin = ({ children }: { children: ReactNode }) => {
  const [isOpenSide, setIsOpenSide] = useState(true);
  return (
    <div className="flex items-center min-h-screen">
      <SidebarAdmin isOpen={isOpenSide} setIsOpen={setIsOpenSide} />
      <div className="bg-[#FDEACA] pb-20 pt-3 px-5 grow min-h-screen">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
