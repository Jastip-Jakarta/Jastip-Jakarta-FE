import { Menu } from "lucide-react";
import brandIcon from "../../public/images/brand-icon.png";
import { useState } from "react";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  return (
    <>
      <div className="h-[80px] flex justify-between items-center bg-white py-2 px-3 shadow-lg">
        <img src={brandIcon} alt="brand-icons" />
        <Menu className="size-10 cursor-pointer" onClick={() => setIsOpenSidebar(!isOpenSidebar)} />
      </div>
      <Sidebar isOpen={isOpenSidebar} setIsOpen={setIsOpenSidebar} />
    </>
  );
};

export default Navbar;
