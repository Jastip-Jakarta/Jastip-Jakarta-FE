import { FC, PropsWithChildren } from "react";
import Navbar from "./Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className="bg-black/80">
        <div className="relative max-w-[500px] flex flex-col  mx-auto bg-[#FDEACA] min-h-screen ">
          <Navbar />
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
