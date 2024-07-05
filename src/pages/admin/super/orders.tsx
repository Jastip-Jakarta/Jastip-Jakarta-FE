import LayoutAdmin from "@/components/LayoutAdmin";
import SearchOrder from "@/components/SearchOrder";
import { searchUserOrders } from "@/utils/apis/order/api";
import { IOrders } from "@/utils/apis/order/types";
import { useState } from "react";
import toast from "react-hot-toast";

const OrdersAdminS = () => {
  const [keyword, setKeyword] = useState("");
  const [resultOrdersSearch, setResultOrdersSearch] = useState<IOrders[] | null>(null);
  const handleSearchUserOrders = async (e: any) => {
    e.preventDefault();
    try {
      if (keyword === "") {
        setResultOrdersSearch(null);
        return;
      }
      const result = await searchUserOrders(keyword);
      setResultOrdersSearch(result.data);
      if (!result.data) {
        toast.error("Titipan tidak ditemukan!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <LayoutAdmin>
      <div className="space-y-4">
        <h1 className="font-bold text-3xl">Cari Order Titipan</h1>
        <SearchOrder onSubmit={handleSearchUserOrders} setKeyword={setKeyword} />
        {JSON.stringify(resultOrdersSearch)}
      </div>
    </LayoutAdmin>
  );
};

export default OrdersAdminS;
