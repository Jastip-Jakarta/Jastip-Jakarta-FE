import { FC, PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <>
      <div className="relative max-w-[500px]  flex flex-col mx-auto bg-[#FDEACA] min-h-screen ">
        <Navbar openSidebar={() => setIsOpenSidebar(true)} />
        <Sidebar isOpen={isOpenSidebar} setIsOpen={setIsOpenSidebar} />
        {children}
      </div>
    </>
  );
};

export default Layout;
