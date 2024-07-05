import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ChevronUp, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import packageIcon from "../../../public/images/package-2.png";
import waIcon from "../../../public/images/WhatsAppIcon.png";
import useTitle from "@/utils/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import { getOrders, getOrdersProcess, searchUserOrders } from "@/utils/apis/order/api";
import { IOrders, IOrdersProcess } from "@/utils/apis/order/types";
import toast from "react-hot-toast";
import Card from "@/components/Card";
import { useAuth } from "@/utils/context/auth";
import { getOrdersByAdmin } from "@/utils/apis/admin/api";
import SearchOrder from "@/components/SearchOrder";
import Tab, { tabType } from "@/components/Tab";

const Order = () => {
  const { user } = useAuth();
  const changeTitle = useTitle();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<tabType>("wait");
  const [orders, setOrders] = useState<IOrders[]>();
  const [isOpenWait, setIsOpenWait] = useState(false);
  const [ordersProcess, setOrdersProcess] = useState<IOrdersProcess[] | null>();
  const [isOpenProcessByBatch, setIsOpenProcessByBatch] = useState<number | null>(null);
  const [resultOrdersSearch, setResultOrdersSearch] = useState<IOrders[] | null>(null);

  useEffect(() => {
    changeTitle("Jastip | Order");
    fetchOrders();
    fetchOrdersProcess();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const result = await (user.role ? getOrdersByAdmin() : getOrders());
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
    <Layout>
      <div className="pb-20 pt-3 px-5 space-y-6 ">
        <h1 className="font-bold text-3xl">Order Titipan kamu</h1>
        {/*SECTION SEARCH */}
        <SearchOrder onSubmit={handleSearchUserOrders} setKeyword={setKeyword} />

        {!resultOrdersSearch ? (
          <>
            {/*SECTION TAB */}
            <Tab setTab={setTab} tab={tab} />

            {/*SECTION CONTENT */}
            {tab === "wait" ? (
              // ORDERS WAIT
              <div className="relative min-h-[100px] flex justify-center items-center gap-2 bg-white px-4 py-2 rounded-md ">
                <h3 className="uppercase font-bold absolute top-2 left-4">
                  menunggu diterima admin
                </h3>
                <div
                  className={`py-10 ${orders?.length ? "gap-12" : "gap-2"} flex-col items-center ${
                    isOpenWait ? "flex" : "hidden"
                  } w-full`}
                >
                  {!orders?.length ? (
                    <>
                      <img src={packageIcon} alt="package-icon" />
                      <p className="font-semibold -mt-3 text-sm">
                        kamu belum memiliki orderan jastip
                      </p>
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
                  {!isOpenWait ? (
                    <span className="text-sm -mt-2">buka untuk selengkapnya</span>
                  ) : null}
                </div>
              </div>
            ) : (
              // ORDER PROCESS
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
          </>
        ) : (
          <div className="flex flex-col gap-3">
            {resultOrdersSearch.map((order, index) => (
              <Card
                key={index}
                order={order}
                onActionSelengkapnya={() => navigate(`/order/${order?.order_id}`)}
              />
            ))}
          </div>
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
