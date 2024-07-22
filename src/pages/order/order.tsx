import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { ChevronUp, Plus, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import packageIcon from "../../../public/images/package-2.png";
import waIcon from "../../../public/images/WhatsAppIcon.png";
import useTitle from "@/utils/hooks/useTitle";
import { useNavigate } from "react-router-dom";
import {
  getOrders,
  getOrdersProcess,
  getOrdersProcessBatchByAdmin,
  searchUserOrders,
  searchUserOrdersByAdmin,
} from "@/utils/apis/order/api";
import { IOrderProcessBatch, IOrders, IOrdersProcess } from "@/utils/apis/order/types";
import toast from "react-hot-toast";
import Card from "@/components/Card/Card";
import { useAuth } from "@/utils/context/auth";
import { getOrdersByAdmin } from "@/utils/apis/admin/api";
import SearchOrder from "@/components/SearchOrder";
import Tab, { tabType } from "@/components/Tab";
import OrderProcessBatch from "@/components/OrderProcessBatch";
import CardInformationOrderBatch from "@/components/Card/CardInformationOrderBatch";

const Order = () => {
  const { user } = useAuth();
  const changeTitle = useTitle();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<tabType>("wait");
  const [orders, setOrders] = useState<IOrders[]>();
  const [isOpenWait, setIsOpenWait] = useState(false);
  const [ordersProcess, setOrdersProcess] = useState<IOrdersProcess[] | null>();
  const [resultOrdersSearch, setResultOrdersSearch] = useState<IOrders[] | null>(null);
  const [isOpenProcessByBatch, setIsOpenProcessByBatch] = useState<number | null>(null);
  const [ordersProcessBatch, setOrdersProcessBatch] = useState<IOrderProcessBatch[]>();
  const [isOpenOrderProcessRegionCode, setIsOpenOrderProcessRegionCode] = useState<string | null>();

  useEffect(() => {
    changeTitle("Jastip | Order");
    fetchOrders();
    if (user.role) {
      fetchOrdersProcessBatch();
    } else {
      fetchOrdersProcess();
    }
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
      const result = await (user.role ? searchUserOrdersByAdmin(keyword) : searchUserOrders(keyword));
      setResultOrdersSearch(result.data);
      if (!result.data) {
        toast.error("Titipan tidak ditemukan!");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const fetchOrdersProcessBatch = async () => {
    try {
      const result = await getOrdersProcessBatchByAdmin();
      setOrdersProcessBatch(result.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onClickRegionCode = (batch: string, regionCode: string) => {
    navigate(`/customers/${batch}/${regionCode}`);
  };

  return (
    <Layout>
      <div className="pb-20 pt-3 px-2.5 sm:px-3 space-y-6">
        <h1 className="font-bold text-2xl ms-1">Order Titipan kamu</h1>
        {/*SECTION SEARCH */}
        <SearchOrder onSubmit={handleSearchUserOrders} setKeyword={setKeyword} />

        {!resultOrdersSearch ? (
          <>
            {/*SECTION TAB */}
            <Tab setTab={setTab} tab={tab} />

            {/*SECTION CONTENT */}
            {tab === "wait" ? (
              // ORDERS WAIT
              <div className="relative min-h-[100px] flex justify-center items-center gap-2 bg-white px-3 py-2 rounded-md">
                <h3 className="uppercase font-bold absolute top-2.5 left-4">menunggu diterima admin</h3>
                <div
                  className={`py-10 ${orders?.length ? "gap-12" : "gap-2"} flex-col items-center ${
                    isOpenWait ? "flex" : "hidden"
                  } w-full`}
                >
                  {!user.role && !orders?.length ? (
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
                    orders?.map((order, index) => (
                      <Card
                        key={index}
                        order={order}
                        onActionSelengkapnya={() => navigate(`/order/${order?.order_id}`)}
                      />
                    ))
                  )}
                </div>
                <div
                  className="absolute bottom-2 flex flex-col items-center cursor-pointer"
                  onClick={() => setIsOpenWait(!isOpenWait)}
                >
                  <ChevronUp className={`size-10 text-black/40 ${isOpenWait ? "rotate-0" : "rotate-180"}`} />
                  {!isOpenWait ? <span className="text-sm -mt-2">buka untuk selengkapnya</span> : null}
                </div>
              </div>
            ) : // ORDER PROCESS USER
            ordersProcess?.length ? (
              ordersProcess.map((orderProcess, index) => (
                <div key={index} className="bg-[#FCCA8F] rounded-[6px] px-2.5 py-3 space-y-3 ">
                  <div>
                    <h1 className="uppercase font-bold text-lg">Batch Pengiriman</h1>
                    <span className="text-xl -mt-5">{orderProcess.delivery_batch}</span>
                  </div>
                  {orderProcess.detail_orders.map((information, indexDetail) => (
                    <div key={indexDetail} className="space-y-2">
                      <div className="flex items-center rounded-full py-2 px-3 font-bold bg-white text-xs max-w-max">
                        <span>
                          KODE WILAYAH : {information.code} - {information.region}
                        </span>
                      </div>
                      {information.estimasi ? (
                        <p className="leading-relaxed text-sm">
                          estimasi tiba <span className="font-semibold">{information.estimasi}</span> di admin
                          jakarta
                        </p>
                      ) : null}

                      {information.orders.map((order) =>
                        isOpenProcessByBatch == index ? (
                          <>
                            <Card
                              orderProcess={order}
                              onActionSelengkapnya={() => navigate(`/order/${order.order_id}`)}
                              regionCodeOrderProcess={`${information.code} - ${information.region}`}
                            />

                            {/* INFROMASI ORDER BATCH */}
                            <CardInformationOrderBatch
                              data={{
                                photo_wrapped: information.package_wrapped_photo,
                                photo_received: information.package_received_photo,
                                total_order: information.total_order,
                                total_price: information.total_price,
                                total_weight: information.total_weight,
                              }}
                            />
                          </>
                        ) : null
                      )}
                    </div>
                  ))}

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
            ) : ordersProcessBatch?.length ? (
              // ORDER PROCESS ADMIN
              ordersProcessBatch.map((batch, index) => (
                <OrderProcessBatch
                  key={index}
                  batch={batch}
                  onClickRegionCode={onClickRegionCode}
                  isOpen={isOpenOrderProcessRegionCode!}
                  setIsOpen={setIsOpenOrderProcessRegionCode}
                />
              ))
            ) : (
              <h2 className="text-center font-medium">Belum ada orderan yang diproses mohon ditunggu!</h2>
            )}
          </>
        ) : (
          // Result of search orders
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
      <div className="fixed w-full max-w-[500px] bottom-0">
        <div className="relative bottom-5 px-5 flex items-end justify-between">
          <Button className="bg-[#1E9C09] hover:bg-[#1E9C09]/80  uppercase text-[10px] space-x-1 rounded-full  size-14 sm:size-auto sm:rounded-xl sm:rounded-bl-none">
            <img src={waIcon} alt="wa-icon" className="size-8 object-cover" />
            <span className="hidden sm:block">hubungi admin</span>
          </Button>
          {orders?.length ? (
            <Button className="rounded-full size-14" onClick={() => navigate("/order")}>
              <Plus className="size-8" />
            </Button>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
