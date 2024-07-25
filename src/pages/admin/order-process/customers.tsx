import ContainerCustomers from "@/components/Customers";
import Layout from "@/components/Layout";
import { getOrdersProcessCustomersByAdmin } from "@/utils/apis/order/api";
import { IOrdersProcessCustomers } from "@/utils/apis/order/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
export interface IEstimation {
  tanggal: string;
  bulan: string;
  tahun: string;
}

const Customers = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [ordersProcessCustomers, setOrdersProcessCustomers] = useState<IOrdersProcessCustomers>();

  useEffect(() => {
    fetchOrdersProcessCustomers(params.code!, params.batch!);
  }, [params]);

  const fetchOrdersProcessCustomers = async (code: string, batch: string) => {
    try {
      const result = await getOrdersProcessCustomersByAdmin(code, batch);
      setOrdersProcessCustomers(result.data);
    } catch (error: any) {
      navigate("/orders");
      toast.error(error.message);
    }
  };

  return (
    <Layout>
      <div className=" pt-3 px-2.5 space-y-6 ">
        <ContainerCustomers data={ordersProcessCustomers!} />
      </div>
    </Layout>
  );
};

export default Customers;
