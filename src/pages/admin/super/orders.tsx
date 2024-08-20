import Card from "@/components/Card/Card";
import LayoutAdmin from "@/components/LayoutAdmin";
import SearchOrder from "@/components/SearchOrder";
import Tab, { tabType } from "@/components/Tab";
import { getOrdersByAdmin } from "@/utils/apis/admin/api";
import {
  getOrder,
  getOrdersProcessBatchByAdmin,
  getOrdersProcessCustomerOrdersByAdmin,
  getOrdersProcessCustomersByAdmin,
  searchUserOrdersByAdmin,
  updateOrderByAdminSuper,
} from "@/utils/apis/order/api";
import {
  IOrderProcessBatch,
  IOrders,
  IOrdersProcessCustomerOrders,
  IOrdersProcessCustomers,
  IOrderType,
  orderSchema,
} from "@/utils/apis/order/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OrderProcessBatch from "@/components/OrderProcessBatch";
import { LoaderCircle } from "lucide-react";
import AddEditOrder from "@/components/Form/FormAddEditOrder";

import ContainerCustomers from "@/components/Customers";
import ContainerCustomerOrders from "@/components/CustomerOrders";
export interface valueOptionType {
  name: string;
  status: string;
  online_store: string;
  code: string;
}
const OrdersAdminS = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<tabType>("wait");
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [ordersWait, setOrdersWait] = useState<IOrders[]>();
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  const [cardOrderId, setCardOrderId] = useState<string | null>();
  const [isLoadingOrdersWait, setIsLoadingOrdersWait] = useState(false);
  const [ordersCustomer, setOrdersCustomer] = useState<IOrdersProcessCustomerOrders | null>(); // orders customer
  const [ordersProcessBatch, setOrdersProcessBatch] = useState<IOrderProcessBatch[]>();
  const [valueOptionOrderInput, setValueOptionOrderInput] = useState<valueOptionType>();
  const [orderProcessCustomers, setOrderProcessCustomers] = useState<IOrdersProcessCustomers | null>();
  const [isOpenOrderProcessRegionCode, setIsOpenOrderProcessRegionCode] = useState<string | null>();
  const [isOpenCustomers, setIsOpenCustomers] = useState(false);
  const [isOpenCustomerOrders, setIsOpenCustomerOrders] = useState(false);
  useEffect(() => {
    fetchOrders();
    fetchOrdersProcessBatch();
  }, []);

  useEffect(() => {
    if (searchParams.has("db") && searchParams.has("c")) {
      setTab("process");
      if (searchParams.has("name")) {
        fetchOrdersProcessCustomers(
          searchParams.get("db")!,
          searchParams.get("c")!,
          searchParams.get("name")!
        );
        return;
      }
      fetchCustomers(searchParams.get("c")!, searchParams.get("db")!);
    }
  }, [searchParams.get("db"), searchParams.get("c"), searchParams.get("name")]);

  // UPDATE ORDER FORM
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IOrderType>({ resolver: zodResolver(orderSchema) });
  const onSubmitUpdateOrder = handleSubmit(async (body: IOrderType) => {
    try {
      const result = await updateOrderByAdminSuper(cardOrderId as string, body);
      toast.success(result.message);
      reset();
      navigate("/orders");
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  const fetchOrdersProcessCustomers = async (batch: string, code: string, customerName: string) => {
    try {
      setIsOpenCustomerOrders(true);
      const result = await getOrdersProcessCustomerOrdersByAdmin(code, batch, customerName);
      if (!result.data.orders) {
        setIsOpenCustomerOrders(false);
        return;
      }
      setOrdersCustomer(result.data);
    } catch (error: any) {
      setIsOpenCustomerOrders(false);
      navigate(pathname);
      toast.error(error.message);
    }
  };
  const fetchCustomers = async (code: string, batch: string) => {
    try {
      setIsOpenCustomers(true);
      const result = await getOrdersProcessCustomersByAdmin(code, batch);
      setOrderProcessCustomers(result.data);
    } catch (error: any) {
      setIsOpenCustomers(false);
      navigate(pathname);
      toast.error(error.message);
    }
  };
  const fetchOrder = async (order_id: string) => {
    try {
      setIsLoadingOrder(true);
      setIsOpenOrder(true);
      setCardOrderId(order_id);
      const result = await getOrder(order_id);
      const data = result.data;

      setValueOptionOrderInput({
        name: data.name,
        status: data.status,
        code: data.code,
        online_store: data.online_store,
      });
      setValue("item_name", data.item_name);
      setValue("tracking_number", data.tracking_number);
      setValue("online_store", data.online_store);
      setValue("whatsapp_number", data.whatsapp_number);
      setValue("code", data.code);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingOrder(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoadingOrdersWait(true);
      const result = await getOrdersByAdmin();
      // !result.data && setIsOpenWait(true);
      setOrdersWait(result.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoadingOrdersWait(false);
    }
  };

  const handleSearchUserOrders = async (e: any) => {
    e.preventDefault();
    try {
      if (keyword === "") {
        // setResultOrdersSearch(null);
        return;
      }
      const result = await searchUserOrdersByAdmin(keyword);
      // setResultOrdersSearch(result.data);
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

  return (
    <LayoutAdmin>
      <div className="space-y-4 max-w-5xl mx-auto">
        <h1 className="font-bold text-3xl">Order Titipan</h1>
        <SearchOrder onSubmit={handleSearchUserOrders} setKeyword={setKeyword} />
        <Tab
          setTab={(keyowrd) => {
            if (search) {
              navigate(pathname);
            }

            setTab(keyowrd);
          }}
          tab={tab}
        />

        <div className="flex flex-col items-center gap-4 p-4">
          {/* Modal detail order */}
          <Dialog open={isOpenOrder} onOpenChange={setIsOpenOrder}>
            <DialogContent className="sm:max-w-[750px] min-h-48">
              {isLoadingOrder ? (
                <div className="flex flex-col items-center justify-center gap-2">
                  <LoaderCircle className="animate-spin" /> Loading...
                </div>
              ) : (
                <>
                  <DialogTitle className="text-xl font-semibold">Edit order</DialogTitle>
                  <form onSubmit={onSubmitUpdateOrder} className="flex flex-col gap-3 flex-1">
                    <AddEditOrder
                      defaultValueOption={valueOptionOrderInput as valueOptionType}
                      errors={errors}
                      register={register}
                      setValue={setValue}
                    />
                    <DialogFooter className="mt-3">
                      <Button type="submit" className="min-w-28 h-9 rounded-md">
                        Simpan
                      </Button>
                    </DialogFooter>
                  </form>
                </>
              )}
            </DialogContent>
          </Dialog>
          {/* Modal detail order */}

          {tab === "wait" ? (
            isLoadingOrdersWait ? (
              <div className="flex items-center flex-col gap-2">
                <LoaderCircle className="animate-spin" />
                <span>Loading...</span>
              </div>
            ) : ordersWait?.length ? (
              <div className="bg-white px-6 py-5 rounded-md w-full space-y-10 shadow-sm border ">
                <h3 className="uppercase font-bold text-xl -mb-4">menunggu diterima admin</h3>
                {ordersWait?.map((orderWait, index) => (
                  <div className="max-w-4xl mx-auto border rounded-md" key={index}>
                    <Card
                      order={orderWait}
                      onActionSelengkapnya={() => {
                        fetchOrder(orderWait.order_id.toString());
                      }}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="text-center font-medium">Belum ada orderan !</h2>
            )
          ) : (
            <>
              {isOpenCustomerOrders ? (
                <ContainerCustomerOrders
                  data={ordersCustomer!}
                  backAction={() => {
                    setIsOpenCustomerOrders(false);
                    setOrdersCustomer(null);
                    searchParams.delete("name");
                    setSearchParams(searchParams);
                  }}
                  onClickSelengkapnya={(orderId) => fetchOrder(orderId.toString())}
                />
              ) : isOpenCustomers ? (
                <ContainerCustomers
                  data={orderProcessCustomers!}
                  backAction={() => {
                    setIsOpenCustomers(false);
                    setOrderProcessCustomers(null);
                    navigate(pathname);
                  }}
                />
              ) : ordersProcessBatch?.length ? (
                ordersProcessBatch.map((batch, index) => (
                  <OrderProcessBatch
                    key={index}
                    batch={batch}
                    onClickRegionCode={(delivery_batch, code) => {
                      setSearchParams({ db: delivery_batch, c: code });
                    }}
                    isOpen={isOpenOrderProcessRegionCode!}
                    setIsOpen={setIsOpenOrderProcessRegionCode}
                  />
                ))
              ) : (
                <h2 className="text-center font-medium">Belum ada orderan yang diproses mohon ditunggu!</h2>
              )}
            </>
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default OrdersAdminS;
