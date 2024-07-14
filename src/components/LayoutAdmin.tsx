import { ReactNode, useState } from "react";
import SidebarAdmin from "./SidebarAdmin";

const LayoutAdmin = ({ children }: { children: ReactNode }) => {
  const [isOpenSide, setIsOpenSide] = useState(true);
  return (
    <div className="flex items-start min-h-screen">
      <SidebarAdmin isOpen={isOpenSide} setIsOpen={setIsOpenSide} />
      <div className="bg-[#FDEACA] pb-20 pt-5 px-3 grow min-h-screen">{children}</div>
    </div>
  );
};

export default LayoutAdmin;
