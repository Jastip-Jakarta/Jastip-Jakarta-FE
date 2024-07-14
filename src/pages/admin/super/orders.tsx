import Card from "@/components/Card/Card";
import LayoutAdmin from "@/components/LayoutAdmin";
import SearchOrder from "@/components/SearchOrder";
import Tab, { tabType } from "@/components/Tab";
import { getOrdersByAdmin } from "@/utils/apis/admin/api";
import { getOrdersProcess, searchUserOrders } from "@/utils/apis/order/api";
import { IOrders, IOrdersProcess } from "@/utils/apis/order/types";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const OrdersAdminS = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<tabType>("wait");
  const [isOpenWait, setIsOpenWait] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [ordersWait, setOrdersWait] = useState<IOrders[]>();
  const [ordersProcess, setOrdersProcess] = useState<IOrdersProcess[] | null>();
  const [resultOrdersSearch, setResultOrdersSearch] = useState<IOrders[] | null>(null);
  const [isOpenProcessByBatch, setIsOpenProcessByBatch] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
    fetchOrdersProcess();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await getOrdersByAdmin();
      !result.data && setIsOpenWait(true);
      setOrdersWait(result.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchOrdersProcess = async () => {
    try {
      const result = await getOrdersProcess();
      setOrdersProcess(result.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
      <div className="space-y-4 max-w-5xl mx-auto">
        <h1 className="font-bold text-3xl">Order Titipan</h1>
        <SearchOrder onSubmit={handleSearchUserOrders} setKeyword={setKeyword} />
        <Tab setTab={setTab} tab={tab} />

        <div className="flex flex-col items-center gap-4 p-4">
          {tab === "wait" ? (
            <>
              {ordersWait?.map((orderWait) => (
                <div
                  key={orderWait.order_id}
                  className="bg-white  px-6 py-8 rounded-md w-full space-y-3 shadow-sm border "
                >
                  <h3 className="uppercase font-bold text-xl">menunggu diterima admin</h3>
                  <div className="max-w-4xl mx-auto space-y-10">
                    <Dialog open={isOpenOrder} onOpenChange={setIsOpenOrder}>
                      <DialogTrigger asChild>
                        <Card
                          key={orderWait.order_id}
                          order={orderWait}
                          onActionSelengkapnya={() => setIsOpenOrder(true)}
                        />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[525px]">
                        <DialogTitle className="text-xl font-semibold">Detail order</DialogTitle>
                        <form onSubmit={() => {}} className="space-y-2">
                          <h1>Detail order</h1>
                          <DialogFooter className="mt-5">
                            <Button type="submit">Simpan</Button>
                          </DialogFooter>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {ordersProcess?.length ? (
                ordersProcess.map((orderProcess, index) => (
                  <div key={index} className="bg-[#FCCA8F] rounded-[6px] px-4 py-3 space-y-3 ">
                    <div>
                      <h1 className="uppercase font-bold text-lg">Batch Pengiriman</h1>
                      <span className="text-xl -mt-5">{orderProcess.delivery_batch}</span>
                    </div>
                    {orderProcess.orders.map((order) => (
                      <div key={order.order_id} className="space-y-2">
                        <div className="flex items-center rounded-full py-2 px-3 font-bold bg-white text-xs max-w-max">
                          <span>
                            KODE WILAYAH : {orderProcess.code} - {orderProcess.region}
                          </span>
                        </div>
                        <p className="leading-relaxed text-sm">
                          estimasi tiba <span className="font-semibold">10 januari 2024</span> di
                          admin jakarta
                        </p>
                        {isOpenProcessByBatch === index ? (
                          <Card
                            orderProcess={order}
                            onActionSelengkapnya={() => navigate(`/order/${order.order_id}`)}
                            regionCodeOrderProcess={`${orderProcess.code} - ${orderProcess.region}`}
                          />
                        ) : null}
                      </div>
                    ))}

                    {/* INFROMASI ORDER BATCH */}
                    {isOpenProcessByBatch === index ? (
                      <div className="px-3 py-4 rounded-lg bg-zinc-50 shadow w-full flex flex-col gap-3">
                        <div className="font-bold text-sm">
                          <h4>Photo paket dikemas admin jakarta</h4>
                          <span className="text-[#0065FD]">buka disini</span>
                        </div>
                        <div className="font-bold text-sm">
                          <h4>Photo paket diterima admin perwakilan</h4>
                          <span className="text-[#0065FD]">buka disini</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <div>
                            <h4 className="font-bold">Total berat</h4>
                            <span>{orderProcess.total_weight}</span>
                          </div>
                          <div>
                            <h4 className="font-bold">Total Order</h4>
                            <span>{orderProcess.total_order}</span>
                          </div>
                          <div>
                            <h4 className="font-bold">Harga</h4>
                            <span>Rp.{orderProcess.total_price}</span>
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div
                      className="flex flex-col items-center cursor-pointer"
                      onClick={() => {
                        if (isOpenProcessByBatch === index) {
                          setIsOpenProcessByBatch(null);
                        } else {
                          setIsOpenProcessByBatch(index);
                        }
                      }}
                    >
                      <ChevronUp
                        className={`size-10 text-black/40 ${
                          isOpenProcessByBatch === index ? "rotate-0" : "rotate-180"
                        }`}
                      />
                      {isOpenProcessByBatch !== index ? (
                        <span className="text-sm -mt-2">buka untuk selengkapnya</span>
                      ) : null}
                    </div>
                  </div>
                ))
              ) : (
                <h2 className="text-center font-medium">
                  Belum ada orderan yang diproses mohon ditunggu!
                </h2>
              )}
            </>
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default OrdersAdminS;
