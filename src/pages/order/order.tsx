import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, PlusCircle, Search } from "lucide-react";
import { useEffect, useState } from "react";
import packageIcon from "../../../public/images/package-2.png";
import waIcon from "../../../public/images/WhatsAppIcon.png";
import useTitle from "@/utils/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { getOrders, getOrdersProcess } from "@/utils/apis/order/api";
import { IOrders, IOrdersProcess } from "@/utils/apis/order/types";
import toast from "react-hot-toast";
import Card from "@/components/Card";

type tabType = "wait" | "process";

const Order = () => {
  const changeTitle = useTitle();
  const navigate = useNavigate();
  const [tab, setTab] = useState<tabType>("wait");
  const [isOpenWait, setIsOpenWait] = useState(false);
  const [isOpenProcessByBatch, setIsOpenProcessByBatch] = useState<number | null>(null);
  const [orders, setOrders] = useState<IOrders[]>();
  const [ordersProcess, setOrdersProcess] = useState<IOrdersProcess[]>();

  useEffect(() => {
    changeTitle("Jastip | Order");
    fetchOrders();
    fetchOrdersProcess();
  }, []);

  const fetchOrders = async () => {
    try {
      const result = await getOrders();
      !result.data && setIsOpenWait(true);
      setOrders(result.data);
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
  return (
    <Layout>
      <div className="pb-20 pt-3 px-5 space-y-6 ">
        <h1 className="font-bold text-3xl">Order Titipan kamu</h1>
        {/* SEARCH */}
        <div className="flex items-center bg-white  pl-3 pr-1 py-1 rounded-full overflow-hidden ring ring-[#FCCA8F]">
          <Search />
          <Input className="border-none " placeholder="Cari order titipan kamu" />
          <Button className="!w-[134px] rounded-full">Search</Button>
        </div>

        {/* TAB */}
        <div
          className={`relative flex items-center mx-auto max-w-sm bg-slate-100 rounded-md overflow-hidden p-1 font-medium text-sm `}
        >
          <div
            className={`w-full text-center py-1 cursor-pointer rounded-md ${
              tab === "wait" ? "bg-white" : "bg-transparent text-black/50"
            }`}
            onClick={() => setTab("wait")}
          >
            Menunggu
          </div>
          <div
            className={`w-full text-center py-1 cursor-pointer rounded-md ${
              tab === "process" ? "bg-white" : "bg-transparent text-black/50"
            }`}
            onClick={() => setTab("process")}
          >
            Diproses
          </div>
        </div>

        {/* CONTENT */}
        {tab === "wait" ? (
          <div className="relative min-h-[100px] flex justify-center items-center gap-2 bg-white px-4 py-2 rounded-md ">
            <h3 className="uppercase font-bold absolute top-2 left-4">menunggu diterima admin</h3>
            <div
              className={`py-10 ${orders?.length ? "gap-12" : "gap-2"} flex-col items-center ${
                isOpenWait ? "flex" : "hidden"
              } w-full`}
            >
              {!orders?.length ? (
                <>
                  <img src={packageIcon} alt="package-icon" />
                  <p className="font-semibold -mt-3 text-sm">kamu belum memiliki orderan jastip</p>
                  <PlusCircle
                    className="size-10 mt-5 cursor-pointer"
                    onClick={() => navigate("/order")}
                  />
                  <p className="font-semibold  text-sm">Tambahkan Orderan Jastip</p>
                </>
              ) : (
                <>
                  {orders.map((order, index) => (
                    <Card
                      key={index}
                      order={order}
                      onActionSelengkapnya={() => navigate(`/order/${order?.order_id}`)}
                    />
                  ))}
                </>
              )}
            </div>
            <div
              className="absolute bottom-2 flex flex-col items-center cursor-pointer"
              onClick={() => setIsOpenWait(!isOpenWait)}
            >
              <ChevronUp
                className={`size-10 text-black/40 ${isOpenWait ? "rotate-0" : "rotate-180"}`}
              />
              {!isOpenWait ? <span className="text-sm -mt-2">buka untuk selengkapnya</span> : null}
            </div>
          </div>
        ) : (
          <>
            {ordersProcess?.map((orderProcess, index) => (
              <div key={index} className="bg-[#FCCA8F] rounded-[6px] px-4 py-3 space-y-3 ">
                <div>
                  <h1 className="uppercase font-bold text-lg">Batch Pengiriman</h1>
                  <span className="text-xl -mt-5">-</span>
                </div>
                {orderProcess.orders.map((order) => (
                  <div key={order.order_id} className="space-y-2">
                    <div className="flex items-center rounded-full py-2 px-3 font-bold bg-white text-xs max-w-max">
                      <span>
                        KODE WILAYAH : {orderProcess.code} - {orderProcess.region}
                      </span>
                    </div>
                    <p className="leading-relaxed text-sm">
                      estimasi tiba <span className="font-semibold">10 januari 2024</span> di admin
                      jakarta
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
            ))}
          </>
        )}
      </div>

      {/* WHATSAPP ADMIN */}
      <div className="fixed bottom-0 ">
        <div className="absolute bottom-5 left-5">
          <Button className="bg-[#1E9C09] hover:bg-[#1E9C09]/80 rounded-bl-none uppercase text-[10px] space-x-1 px-8">
            <img src={waIcon} alt="wa-icon" />
            <span>hubungi admin</span>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
