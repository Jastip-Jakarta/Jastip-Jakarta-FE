import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getOrder, updateOrder } from "@/utils/apis/order/api";
import { IOrders, IOrderType, orderSchema } from "@/utils/apis/order/types";
import { FORM_ORDER } from "@/utils/constants/add-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const DetailOrder = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState<IOrders>();
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const result = await getOrder(orderId!);
      setOrder(result.data);
    } catch (error: any) {
      navigate("/orders");
      toast.error(error.message);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IOrderType>({ resolver: zodResolver(orderSchema) });

  const onSubmitUpdateOrder = handleSubmit(async (body: IOrderType) => {
    try {
      const result = await updateOrder(orderId as string, body);
      toast.success(result.message);
      reset();
      navigate("/orders");
    } catch (error: any) {
      toast.error(error.message);
    }
  });
  useEffect(() => {
    setValue("item_name", order?.item_name as string);
    setValue("tracking_number", order?.tracking_number as string);
    setValue("whatsapp_number", order?.whatsapp_number as number);
    setValue("online_store", order?.online_store as string);
    setValue("code", order?.code as string);
  }, [isEdit]);

  return (
    <Layout>
      <div className="py-3 px-5 ">
        <form
          onSubmit={onSubmitUpdateOrder}
          className="bg-white w-full  min-h-[calc(100vh-110px)] p-4 rounded-sm flex flex-col gap-10"
        >
          <div className="flex justify-between ">
            <div className="w-1/2">
              <h3 className="font-bold ">Nama Penerima</h3>
              <h4 className="font-semibold text-lg">{order?.name}</h4>
            </div>
            <div className=" space-y-1 w-1/2 ">
              <h3 className="font-bold text-sm uppercase">Status</h3>
              <div className="flex items-center gap-2">
                <Button
                  size={"sm"}
                  disabled
                  variant={"secondary"}
                  className="uppercase !text-[11px] !font-bold max-w-36 rounded-full disabled:opacity-100"
                >
                  {order?.status}
                </Button>
                <Info className="size-6 flex-shrink-0" />
              </div>
              <p className="text-xs italic">Admin Jakarta sedang menunggu paket kamu</p>
            </div>
          </div>

          {!isEdit ? (
            <div className="flex justify-between items-start flex-1">
              <div className="space-y-4 w-1/2">
                <h4 className="text-sm font-semibold">Nomor order : {order?.order_id}</h4>
                <div>
                  <h4 className="font-bold text-sm">Nama barang</h4>
                  <span>{order?.item_name}</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm">Kode Wilayah</h4>
                  <span>
                    {order?.code} - {order?.region}
                  </span>
                  <p className="whitespace-nowrap text-xs">paket mu diantar ke alamat sini</p>
                  <p className="whitespace-pre text-sm font-semibold">{order?.full_address}</p>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Nomor telepon whatsapp</h4>
                  <span>+62{order?.whatsapp_number}</span>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Nomor Resi</h4>
                  <div className="flex items-center gap-3">
                    <span>{order?.tracking_number}</span> - <span>{order?.online_store}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm">Berat</h4>
                  <span>{order?.weight_item} Kg</span>
                </div>
              </div>
              <div className="flex flex-col pr-10 w-1/2">
                <span className="font-bold text-sm">Nomor Resi Jastip</span>
                <span>{order?.tracking_number_jastip ? order.tracking_number_jastip : "-"}</span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 flex-1">
              {FORM_ORDER.map((form) => (
                <div className="space-y-1">
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
                      <Select onValueChange={(e) => setValue(form.formName as any, e)}>
                        <SelectTrigger className="!ring-0">
                          <SelectValue placeholder={form.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {form.options.map((option) => (
                            <SelectItem value={option}>{option}</SelectItem>
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
            </div>
          )}

          {!isEdit ? (
            <div className="w-full space-y-2 flex items-center gap-36">
              <div className="flex items-center gap-2">
                <span
                  className="text-nowrap font-semibold text-black/50 text-sm cursor-pointer"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Informasi
                </span>
                <Pencil className="size-3" />
              </div>
              <Button
                size={"sm"}
                className="w-full rounded-full h-8"
                type="button"
                onClick={() => {
                  navigate("/orders");
                }}
              >
                Kembali
              </Button>
            </div>
          ) : (
            <div className="w-full space-y-2 flex items-center gap-36">
              <Button
                size={"sm"}
                className="w-full rounded-full h-8 bg-[#8C98A9] hover:bg-[#8C98A9]/80"
                onClick={() => setIsEdit(false)}
                type="button"
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button
                size={"sm"}
                className="w-full rounded-full h-8"
                type="submit"
                disabled={isSubmitting}
              >
                Simpan
              </Button>
            </div>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default DetailOrder;
