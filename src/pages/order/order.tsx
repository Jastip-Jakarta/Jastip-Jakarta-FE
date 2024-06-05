import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import packageIcon from "../../../public/images/package-2.png";
import waIcon from "../../../public/images/WhatsAppIcon.png";
import useTitle from "@/utils/hooks/useTitle";

const Order = () => {
  const [isOpen, setIsOpen] = useState(false);
  const changeTitle = useTitle();
  useEffect(() => {
    changeTitle("Jastip | Order");
  }, []);

  return (
    <Layout>
      <div className="py-3 px-5 space-y-6 ">
        <h1 className="font-bold text-3xl">Order Titipan kamu</h1>
        <div className="flex items-center bg-white  pl-3 pr-1 py-1 rounded-full overflow-hidden ring ring-[#FCCA8F]">
          <Search />
          <Input className="border-none " placeholder="Cari order titipan kamu" />
          <Button className="!w-[134px] rounded-full">Search</Button>
        </div>
        <div className="relative min-h-[100px] flex justify-center items-center gap-2 bg-white px-4 py-2 rounded-md ">
          <h3 className="uppercase font-bold absolute top-2 left-4">menunggu diterima admin</h3>
          <div className={`py-14 flex flex-col items-center ${isOpen ? "block" : "hidden"} `}>
            <img src={packageIcon} alt="package-icon" />
            <p className="font-semibold -mt-3 text-sm">kamu belum memiliki orderan jastip</p>
            <PlusCircle className="size-10 mt-5 cursor-pointer" />
            <p className="font-semibold  text-sm">Tambahkan Orderan Jastip</p>
          </div>
          <div
            className="absolute bottom-2 flex flex-col items-center cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <ChevronUp className={`size-10 text-black/40 ${isOpen ? "rotate-0" : "rotate-180"}`} />
            {!isOpen ? <span className="text-sm -mt-2">buka untuk selengkapnya</span> : null}
          </div>
        </div>
      </div>
      <div className="absolute bottom-5 left-5">
        <Button className="bg-[#1E9C09] hover:bg-[#1E9C09]/80 rounded-bl-none uppercase text-[10px] space-x-1">
          <img src={waIcon} alt="wa-icon" />
          <span>hubungi admin</span>
        </Button>
      </div>
    </Layout>
  );
};

export default Order;
