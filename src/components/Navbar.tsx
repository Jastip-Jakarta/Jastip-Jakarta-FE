import { Menu } from "lucide-react";
import brandIcon from "../../public/images/brand-icon.png";

import { useNavigate } from "react-router-dom";

const Navbar = ({ openSidebar }: { openSidebar: () => void }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="sticky top-0 z-50 h-[80px] flex justify-between items-center bg-white py-2 px-3 shadow-lg">
        <img
          src={brandIcon}
          alt="brand-icons"
          onClick={() => navigate("/")}
          className="cursor-pointer"
        />
        <Menu className="size-10 cursor-pointer" onClick={openSidebar} />
      </div>
    </>
  );
};

export default Navbar;
