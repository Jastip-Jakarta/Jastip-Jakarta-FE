import { IEstimation } from "@/pages/admin/order-process/customers";
import { IOrdersProcessCustomers } from "@/utils/apis/order/types";
import { ChevronLeft, SquareArrowOutUpRight } from "lucide-react";
import { createEstimatedOrders } from "@/utils/apis/admin/api";
import FormAddEstimasi from "./Form/FormAddEstimasi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/utils/context/auth";

interface CustomersProps {
  data: IOrdersProcessCustomers;
  backAction?: () => void;
}
const ContainerCustomers = ({ data, backAction }: CustomersProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [_searchParams, setSearchParams] = useSearchParams();
  const [estimasi, setEstimasi] = useState<IEstimation>({ tanggal: "", bulan: "", tahun: "" });

  useEffect(() => {
    if (!data) return;
    const [tanggal, bulan, tahun] = data?.estimasi?.split(" ");
    if (tanggal && bulan && tahun) {
      setEstimasi({ tanggal, bulan, tahun });
    }
  }, [data]);

  const onClickCustomerName = (batch: string, code: string, name: string) => {
    if (user.role === "Super") {
      setSearchParams({ db: batch, c: code, name });
    } else {
      navigate(`/customer-orders/${batch}/${code}/${name}`);
    }
  };

  const onCreateEstimasi = async (e: any) => {
    e.preventDefault();
    try {
      const { tanggal, bulan, tahun }: IEstimation = {
        tanggal: e.target[0].value,
        bulan: e.target[1].value,
        tahun: e.target[2].value,
      };
      if (!tanggal || !bulan || !tahun) {
        toast.error("Estimasi tidak valid");
        return;
      }
      const date = `${tanggal}/${bulan}/${tahun}`;
      const result = await createEstimatedOrders(date, data?.code!, data?.delivery_batch!);
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  const handleBack = () => {
    if (user.role === "Super") {
      backAction!();
    } else {
      navigate("/orders");
    }
  };
  return (
    <div className="bg-[#FCCA8F] rounded-[6px] px-4 pt-3 pb-16 space-y-5 flex flex-col items-start w-full">
      <div className="flex items-center gap-4">
        <ChevronLeft className={`size-9 text-slate-800 cursor-pointer duration-200 `} onClick={handleBack} />
        <div>
          <h1 className="uppercase font-bold text-base text-slate-800">Batch Pengiriman</h1>
          <span className="text-base font-semibold -mt-5">{data?.delivery_batch}</span>
        </div>
      </div>

      <div className="flex items-center justify-center rounded-full py-2 px-3 font-bold bg-white text-xs  ">
        KODE WILAYAH : {data?.code} - {data?.region}{" "}
      </div>

      <div className="flex justify-between items-end w-full gap-4">
        <div className="w-full space-y-1">
          <h4 className="text-sm font-semibold">Estimasi Tiba</h4>
          <FormAddEstimasi onSubmit={(e) => onCreateEstimasi(e)} estimasi={estimasi} />
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {data?.customer_jastip.map((customer, index) => (
          <div
            key={index}
            className="bg-white rounded-md flex justify-between items-center w-full px-4 py-3 cursor-pointer"
            onClick={() => onClickCustomerName(data.delivery_batch, data.code, customer.name)}
          >
            <h3 className="font-semibold text-base">{customer.name}</h3>
            <SquareArrowOutUpRight />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContainerCustomers;
