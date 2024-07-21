import Card from "@/components/Card/Card";
import LayoutAdmin from "@/components/LayoutAdmin";
import SearchOrder from "@/components/SearchOrder";
import Tab, { tabType } from "@/components/Tab";
import { getOrdersByAdmin } from "@/utils/apis/admin/api";
import {
  getOrder,
  // getOrdersProcess,
  getOrdersProcessBatchByAdmin,
  // searchUserOrders,
  searchUserOrdersByAdmin,
  updateOrder,
} from "@/utils/apis/order/api";
import {
  IOrderProcessBatch,
  IOrders,
  // IOrdersProcess,
  IOrderType,
  orderSchema,
} from "@/utils/apis/order/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FORM_ORDER } from "@/utils/constants/add-order";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import OrderProcessBatch from "@/components/OrderProcessBatch";

const OrdersAdminS = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, _setqueryParams] = useState({
    delivery_batch: searchParams.get("db") ?? "",
    code: searchParams.get("c") ?? "",
  });
  const [keyword, setKeyword] = useState("");
  const [tab, setTab] = useState<tabType>("wait");
  // const [isOpenWait, setIsOpenWait] = useState(false);
  const [isOpenOrder, setIsOpenOrder] = useState(false);
  const [ordersWait, setOrdersWait] = useState<IOrders[]>();
  const [cardOrderId, setCardOrderId] = useState<string | null>();
  const [valueOptionOrderInput, setValueOptionOrderInput] = useState<{
    name: string;
    status: string;
    online_store: string;
    code: string;
  }>();
  // const [resultOrdersSearch, setResultOrdersSearch] = useState<IOrders[] | null>(null);
  // const [isOpenProcessByBatch, setIsOpenProcessByBatch] = useState<number | null>(null);
  const [ordersProcessBatch, setOrdersProcessBatch] = useState<IOrderProcessBatch[]>();
  const [isOpenOrderProcessRegionCode, setIsOpenOrderProcessRegionCode] = useState<string | null>();

  useEffect(() => {
    fetchOrders();
    // fetchOrdersProcess();
    fetchOrdersProcessBatch();
  }, []);
  useEffect(() => {
    alert(`region_code : ${queryParams.code} delivery batch : ${queryParams.delivery_batch}`);
  }, [setSearchParams]);

  // GENERAL FORM
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IOrderType>({ resolver: zodResolver(orderSchema) });
  const onSubmitUpdateOrder = handleSubmit(async (body: IOrderType) => {
    try {
      const result = await updateOrder(cardOrderId as string, body);
      toast.success(result.message);
      reset();
      navigate("/orders");
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  const fetchOrder = async (order_id: string) => {
    try {
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
      navigate("/orders");
      toast.error(error.message);
    }
  };

  const fetchOrders = async () => {
    try {
      const result = await getOrdersByAdmin();
      // !result.data && setIsOpenWait(true);
      setOrdersWait(result.data);
    } catch (error: any) {
      toast.error(error.message);
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
        <Tab setTab={setTab} tab={tab} />

        <div className="flex flex-col items-center gap-4 p-4">
          {tab === "wait" ? (
            ordersWait?.length ? (
              <div className="bg-white px-6 py-5 rounded-md w-full space-y-10 shadow-sm border ">
                <h3 className="uppercase font-bold text-xl -mb-4">menunggu diterima admin</h3>
                {ordersWait?.map((orderWait, index) => (
                  <div className="max-w-4xl mx-auto border rounded-md">
                    <Card
                      key={index}
                      order={orderWait}
                      onActionSelengkapnya={() => {
                        fetchOrder(orderWait.order_id.toString());
                      }}
                    />
                  </div>
                ))}
                <Dialog open={isOpenOrder} onOpenChange={setIsOpenOrder}>
                  <DialogContent className="sm:max-w-[750px]">
                    <DialogTitle className="text-xl font-semibold">
                      <h1>Edit order</h1>
                    </DialogTitle>
                    <form onSubmit={onSubmitUpdateOrder} className="flex flex-col gap-3 flex-1">
                      {/* FORM GENERAL */}
                      {FORM_ORDER.map((form, index) => (
                        <div className="space-y-1" key={index}>
                          {!form.options ? (
                            <>
                              <Label>{form.label}</Label>
                              <Input placeholder={form.placeholder} {...register(form.formName as any)} />
                              {errors?.[form.formName as keyof typeof errors] ? (
                                <p className="text-sm text-red-500 -mt-2">
                                  {errors?.[form.formName as keyof typeof errors]?.message?.toString()}
                                </p>
                              ) : null}
                              <p className="text-sm">{form.msg}</p>
                            </>
                          ) : (
                            <>
                              <Label>{form.label}</Label>
                              <Select
                                value={
                                  form.label === "Toko Online"
                                    ? valueOptionOrderInput?.online_store
                                    : valueOptionOrderInput?.code
                                }
                                onValueChange={(e) => setValue(form.formName as any, e)}
                              >
                                <SelectTrigger className="!ring-0">
                                  <SelectValue placeholder={form.placeholder} />
                                </SelectTrigger>
                                <SelectContent>
                                  {form.options.map((option) => (
                                    <SelectItem key={option} value={option}>
                                      {option}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              {errors?.[form.formName as keyof typeof errors] ? (
                                <p className="text-sm text-red-500 -mt-2">
                                  {errors?.[form.formName as keyof typeof errors]?.message}
                                </p>
                              ) : null}

                              {form.formName == "region_code" ? (
                                <p className="text-sm">
                                  {form.msg} <span className="font-bold">disini.</span>
                                </p>
                              ) : (
                                <p className="text-sm">{form.msg}</p>
                              )}
                            </>
                          )}
                        </div>
                      ))}
                      <DialogFooter className="mt-5">
                        <Button type="submit">Simpan</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            ) : (
              <h2 className="text-center font-medium">Belum ada orderan !</h2>
            )
          ) : (
            <>
              {ordersProcessBatch?.length ? (
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
