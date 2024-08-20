import { uploadImgAdminJ, uploadImgAdminP } from "@/utils/apis/admin/api";
import { IOrdersProcessCustomerOrders } from "@/utils/apis/order/types";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Card from "./Card/Card";
import { useAuth } from "@/utils/context/auth";
import Loading from "./Loading";

interface ContainerCustomerOrdersProps {
  data: IOrdersProcessCustomerOrders;
  backAction?: () => void;
  onClickSelengkapnya?: (orderId: number) => void;
}

const ContainerCustomerOrders = ({ data, backAction, onClickSelengkapnya }: ContainerCustomerOrdersProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitUploadImgAdminJ = async (e: any) => {
    try {
      setIsLoading(true);
      const result = await uploadImgAdminJ({
        code: data?.code!,
        batch: data?.delivery_batch!,
        user_id: data?.customer_jastip.id!,
        photo_packed: e.target.files[0],
      });
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmitUploadImgAdminP = async (e: any) => {
    try {
      if (data?.foto_orders.id_foto === 0) {
        toast.error("Harap upload foto paket di admin jakarta terlebih dahulu!");
        return;
      }
      setIsLoading(true);
      const result = await uploadImgAdminP(data?.foto_orders.id_foto!, {
        photo_received: e.target.files[0],
      });
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleBack = () => {
    if (user.role === "Super") {
      backAction!();
    } else {
      navigate(`/customers/${data.delivery_batch}/${data.code}`);
    }
  };
  return (
    <>
      {isLoading && <Loading />}
      <div className="bg-[#FCCA8F] rounded-[6px] px-2.5 pt-3 pb-16 space-y-5 flex flex-col items-start w-full">
        <div className="flex items-center gap-4">
          <ChevronLeft
            className={`size-9 text-slate-800 cursor-pointer duration-200 `}
            onClick={handleBack}
          />
          <div>
            <h1 className="uppercase font-bold text-base text-slate-800">Batch Pengiriman</h1>
            <span className="text-base font-semibold -mt-5">{data?.delivery_batch}</span>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-full py-2 px-3 font-bold bg-white text-xs  ">
          KODE WILAYAH : {data?.code} - {data?.region}
        </div>

        {data?.estimasi ? (
          <p className="leading-relaxed text-sm">
            estimasi tiba <span className="font-semibold">{data?.estimasi}</span> di admin jakarta
          </p>
        ) : null}

        <div className="flex flex-col gap-3 w-full">
          {data?.orders?.map((order) => (
            <Card
              key={order.order_id}
              orderProcess={order}
              onActionSelengkapnya={() => {
                if (onClickSelengkapnya) {
                  onClickSelengkapnya(order.order_id);
                } else {
                  navigate(`/order/${order.order_id}`);
                }
              }}
              regionCodeOrderProcess={`${data.code} - ${data.region}`}
            />
          ))}
          <div className="px-3 py-4 rounded-lg bg-zinc-50 shadow w-full flex flex-col gap-3">
            <div className="font-bold text-sm">
              <h4>Photo paket dikemas admin jakarta</h4>
              <div className="space-x-4">
                <label htmlFor="uploadImgAdminJ" className={`text-[#0065FD] cursor-pointer`}>
                  upload disini
                </label>
                <input type="file" hidden id="uploadImgAdminJ" onChange={onSubmitUploadImgAdminJ} />

                <span className={`text-red-500 cursor-pointer`}>hapus</span>
              </div>
            </div>
            <div className="font-bold text-sm">
              <h4>Photo paket diterima admin perwakilan</h4>
              <div className="space-x-4">
                <label htmlFor="uploadImgAdminP" className={`text-[#0065FD] cursor-pointer`}>
                  upload disini
                </label>
                <input type="file" hidden id="uploadImgAdminP" onChange={onSubmitUploadImgAdminP} />
                <span className={`text-red-500 cursor-pointer`}>hapus</span>
              </div>
            </div>
            <div className="flex justify-between text-sm">
              <div>
                <h4 className="font-bold">Total berat</h4>
                <span>{data?.total_weight}</span>
              </div>
              <div>
                <h4 className="font-bold">Total Order</h4>
                <span>{data?.total_order}</span>
              </div>
              <div>
                <h4 className="font-bold">Harga</h4>
                <span>Rp. {data?.total_price.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContainerCustomerOrders;
