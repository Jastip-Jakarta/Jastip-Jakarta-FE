import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FORM_ORDER } from "@/utils/constants/add-order";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { IOrderType, orderSchema } from "@/utils/apis/order/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { createOrder } from "@/utils/apis/order/api";
import { useNavigate } from "react-router-dom";
import informasiJastip from "../../../public/images/informasi-jastip.png";
const AddOrder = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IOrderType>({ resolver: zodResolver(orderSchema) });

  const onSubmitOrder = handleSubmit(async (body: IOrderType) => {
    try {
      const result = await createOrder(body);
      toast.success(result.message);
      reset();
      navigate("/orders");
    } catch (error: any) {
      toast.error(error.message);
    }
  });
  return (
    <Layout>
      <div className="m-3 px-4 py-5 bg-white rounded-md space-y-5">
        <h1 className="uppercase font-bold text-2xl tracking-wide">Order jastip</h1>

        <div className="flex flex-col gap-8">
          <h1 className="font-bold text-xl">Langkah Pertama :</h1>
          <div className="border-2 border-black/25 rounded-2xl p-3 flex items-center gap-5">
            <Info className="size-12 flex-shrink-0" />
            <ul className="font-medium space-y-2 list-decimal">
              <li>SEBELUM KAMU ORDER JASTIP, KAMU HARUS MENGIRIM BARANG KAMU KE ALAMAT INI !</li>
              <li>METODE COD AKAN DITOLAK</li>
            </ul>
          </div>

          <img src={informasiJastip} alt="" />

          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Langkah Kedua :</h1>
            <h4 className="font-medium text-sm">Silahkan ini form dibawah ini</h4>
            <form onSubmit={onSubmitOrder} className="space-y-4">
              {FORM_ORDER.map((form) => (
                <div className="space-y-1">
                  {!form.options ? (
                    <>
                      <Label>{form.label}</Label>
                      <Input
                        placeholder={form.placeholder}
                        {...register(form.formName as keyof typeof register)}
                      />
                      {errors?.[form.formName as keyof typeof errors] ? (
                        <p className="text-sm text-red-500 -mt-2">
                          {errors?.[form.formName as keyof typeof errors]?.message?.toString()}
                        </p>
                      ) : null}
                      <p className="text-xs">{form.msg}</p>
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
                      <p className="text-xs">{form.msg}</p>
                    </>
                  )}
                </div>
              ))}
              <div className="flex justify-between pt-3">
                <Button
                  size={"sm"}
                  type="button"
                  className="uppercase text-xs w-1/4 h-8 bg-[#8C98A9] hover:bg-[#8C98A9]/80"
                  onClick={() => navigate("/orders")}
                >
                  Batal
                </Button>
                <Button
                  size={"sm"}
                  className="uppercase text-xs w-1/4 h-8"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Order
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddOrder;
