import Card from "@/components/Card/Card";
import Layout from "@/components/Layout";
import { getOrdersProcessCustomerOrdersByAdmin } from "@/utils/apis/order/api";
import { IOrdersProcess } from "@/utils/apis/order/types";
import { ChevronLeft } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CustomerOrders = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [ordersCustomer, setOrdersCustomer] = useState<IOrdersProcess>();

  useEffect(() => {
    fetchOrdersProcessCustomers(params.batch!, params.code!, params.customerName!);
  }, [params]);

  const fetchOrdersProcessCustomers = async (batch: string, code: string, customerName: string) => {
    try {
      const result = await getOrdersProcessCustomerOrdersByAdmin(code, batch, customerName);
      setOrdersCustomer(result.data);
    } catch (error: any) {
      navigate("/orders");
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <div className=" py-3 px-5 space-y-6 ">
        <div className="bg-[#FCCA8F] rounded-[6px] px-4 pt-3 pb-16 space-y-5 flex flex-col items-start">
          <div className="flex items-center gap-4">
            <ChevronLeft
              className={`size-9 text-slate-800 cursor-pointer duration-200 `}
              onClick={() => navigate(`/customers/${params.batch}/${params.code}`)}
            />
            <div>
              <h1 className="uppercase font-bold text-base text-slate-800">Batch Pengiriman</h1>
              <span className="text-base font-semibold -mt-5">
                {ordersCustomer?.delivery_batch}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center rounded-full py-2 px-3 font-bold bg-white text-xs  ">
            KODE WILAYAH : {ordersCustomer?.code} - {ordersCustomer?.region}
          </div>

          <p className="leading-relaxed text-sm">
            estimasi tiba <span className="font-semibold">10 januari 2024</span> di admin jakarta
          </p>

          <div className="flex flex-col gap-3 w-full">
            {ordersCustomer?.orders.map((order) => (
              <Card
                orderProcess={order}
                onActionSelengkapnya={() => navigate(`/order/${order.order_id}`)}
                regionCodeOrderProcess={`${ordersCustomer.code} - ${ordersCustomer.region}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerOrders;
