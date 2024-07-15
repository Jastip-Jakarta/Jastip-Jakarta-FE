import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createEstimatedOrders } from "@/utils/apis/admin/api";
import { getOrdersProcessCustomersByAdmin } from "@/utils/apis/order/api";
import { IOrdersProcessCustomers } from "@/utils/apis/order/types";
import { ChevronLeft, SquareArrowOutUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const Customers = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [estimasi, setEstimasi] = useState<string>();
  const [ordersProcessCustomers, setOrdersProcessCustomers] = useState<IOrdersProcessCustomers>();

  useEffect(() => {
    fetchOrdersProcessCustomers(params.code!, params.batch!);
  }, [params]);

  const fetchOrdersProcessCustomers = async (code: string, batch: string) => {
    try {
      const result = await getOrdersProcessCustomersByAdmin(code, batch);
      setOrdersProcessCustomers(result.data);
      setEstimasi(result.data.estimasi);
    } catch (error: any) {
      navigate("/orders");
      toast.error(error.message);
    }
  };

  const onClickCustomerName = (batch: string, code: string, name: string) => {
    navigate(`/customer-orders/${batch}/${code}/${name}`);
  };
  const onCreateEstimasi = async (e: any) => {
    e.preventDefault();
    try {
      const tanggal = e.target[0].value;
      const bulan = e.target[1].value;
      const tahun = e.target[2].value;
      if (!tanggal || !bulan || !tahun) {
        toast.error("Estimasi tidak valid");
        return;
      }
      const date = `${tanggal}/${bulan}/${tahun}`;
      const result = await createEstimatedOrders(
        date,
        ordersProcessCustomers?.code!,
        ordersProcessCustomers?.delivery_batch!
      );
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <Layout>
      <div className=" pt-3 px-5 space-y-6 ">
        <div className="bg-[#FCCA8F] rounded-[6px] px-4 pt-3 pb-16 space-y-5 flex flex-col items-start">
          <div className="flex items-center gap-4">
            <ChevronLeft
              className={`size-9 text-slate-800 cursor-pointer duration-200 `}
              onClick={() => navigate("/orders")}
            />
            <div>
              <h1 className="uppercase font-bold text-base text-slate-800">Batch Pengiriman</h1>
              <span className="text-base font-semibold -mt-5">
                {ordersProcessCustomers?.delivery_batch}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-full py-2 px-3 font-bold bg-white text-xs  ">
            KODE WILAYAH : {ordersProcessCustomers?.code} - {ordersProcessCustomers?.region}{" "}
          </div>

          <div className="flex justify-between items-end w-full gap-4">
            <div className="w-full space-y-1">
              <h4 className="text-sm font-semibold">Estimasi Tiba</h4>

              <form onSubmit={onCreateEstimasi} className="flex gap-4 items-center">
                <div className="flex items-center bg-white rounded-md">
                  <Input
                    placeholder="tanggal"
                    className="bg-transparent shadow-none ring-0 border-none"
                  />
                  /
                  <Input
                    placeholder="bulan"
                    className="bg-transparent shadow-none ring-0 border-none"
                  />
                  /
                  <Input
                    placeholder="tahun"
                    className="bg-transparent shadow-none ring-0 border-none"
                  />
                </div>
                <Button
                  type="submit"
                  size={"xs"}
                  className="uppercase max-w-32 text-xs font-medium"
                >
                  Simpan
                </Button>
              </form>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            {ordersProcessCustomers?.customer_jastip.map((customer, index) => (
              <div
                key={index}
                className="bg-white rounded-md flex justify-between items-center w-full px-4 py-3 cursor-pointer"
                onClick={() =>
                  onClickCustomerName(
                    ordersProcessCustomers.delivery_batch,
                    ordersProcessCustomers.code,
                    customer.name
                  )
                }
              >
                <h3 className="font-semibold text-base">{customer.name}</h3>
                <SquareArrowOutUpRight />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
