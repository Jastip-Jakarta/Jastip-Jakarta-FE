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
        <h1 className="uppercase font-bold text-3xl tracking-wide">Order jastip</h1>

        <div className="flex flex-col gap-8">
          <h1 className="font-bold text-2xl">Langkah Pertama :</h1>
          <div className="border-2 border-black/25 rounded-2xl p-3 flex items-center gap-5">
            <Info className="size-12 flex-shrink-0" />
            <ul className="font-medium space-y-2 list-decimal">
              <li>SEBELUM KAMU ORDER JASTIP, KAMU HARUS MENGIRIM BARANG KAMU KE ALAMAT INI !</li>
              <li>METODE COD AKAN DITOLAK</li>
            </ul>
          </div>
          <div className="border border-black/25 rounded text-sm">
            <div className="flex flex-col">
              <span className="bg-black/10 text-black/80 p-2">Kontak</span>
              <Input placeholder="JastipJKT/Kode/Nama Kelurahan" className="!py-5 text-base" />
            </div>
            <Input value={"+62 853-4388-6462"} disabled className="!py-5 text-base" />
            <div className="flex flex-col">
              <span className="text-sm bg-black/10 text-black/80 p-2">Alamat</span>
              <div className="flex flex-col p-2 border-b">
                <span>DKI JAKARTA</span>
                <span>KOTA JAKARTA TIMUR</span>
                <span>PULO GADUNG</span>
                <span>13220</span>
              </div>
              <p className="p-2">Jalan Pemuda</p>
              <Input placeholder="Nama dan No. Pemesanan" className="!py-5 text-base" />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">Langkah Kedua :</h1>
            <h4 className="font-medium text-sm">Silahkan ini form dibawah ini</h4>
            <form onSubmit={onSubmitOrder} className="space-y-4">
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
                      <p className="text-sm">{form.msg}</p>
                    </>
                  )}
                </div>
              ))}
              <div className="flex justify-between">
                <Button
                  size={"sm"}
                  className="uppercase text-xs w-1/4 h-8 bg-[#8C98A9] hover:bg-[#8C98A9]/80"
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
