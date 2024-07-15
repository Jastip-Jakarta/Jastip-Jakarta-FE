import Card from "@/components/Card/Card";
import Layout from "@/components/Layout";
import { uploadImgAdminJ } from "@/utils/apis/admin/api";
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
  console.log(ordersCustomer);

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

  const onSubmitUploadImgAdminJ = async (e: any) => {
    const orderIds = ordersCustomer?.orders.map((order) => order.order_id);
    try {
      const result = await uploadImgAdminJ({
        photo_packed: e.target.files[0],
        user_order_ids: orderIds!,
        delivery_batch_id: ordersCustomer?.delivery_batch as string,
      });
      toast.success(result.message);
    } catch (error: any) {
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

          {ordersCustomer?.estimasi ? (
            <p className="leading-relaxed text-sm">
              estimasi tiba <span className="font-semibold">{ordersCustomer?.estimasi}</span> di
              admin jakarta
            </p>
          ) : null}

          <div className="flex flex-col gap-3 w-full">
            {ordersCustomer?.orders.map((order) => (
              <Card
                key={order.order_id}
                orderProcess={order}
                onActionSelengkapnya={() => navigate(`/order/${order.order_id}`)}
                regionCodeOrderProcess={`${ordersCustomer.code} - ${ordersCustomer.region}`}
              />
            ))}
            <div className="px-3 py-4 rounded-lg bg-zinc-50 shadow w-full flex flex-col gap-3">
              <div className="font-bold text-sm">
                <h4>Photo paket dikemas admin jakarta</h4>
                <div className="space-x-4">
                  <label htmlFor="uploadImgAdminJ" className="text-[#0065FD]">
                    upload disini
                  </label>
                  <input
                    type="file"
                    hidden
                    id="uploadImgAdminJ"
                    onChange={onSubmitUploadImgAdminJ}
                  />

                  <span className="text-red-500">hapus</span>
                </div>
              </div>
              <div className="font-bold text-sm">
                <h4>Photo paket diterima admin perwakilan</h4>
                <div className="space-x-4">
                  <span className="text-[#0065FD]">upload disini</span>
                  <span className="text-red-500">hapus</span>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <div>
                  <h4 className="font-bold">Total berat</h4>
                  <span>{ordersCustomer?.total_weight}</span>
                </div>
                <div>
                  <h4 className="font-bold">Total Order</h4>
                  <span>{ordersCustomer?.total_order}</span>
                </div>
                <div>
                  <h4 className="font-bold">Harga</h4>
                  <span>Rp.{ordersCustomer?.total_price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerOrders;
