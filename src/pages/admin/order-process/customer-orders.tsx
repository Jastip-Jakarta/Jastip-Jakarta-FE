import ContainerCustomerOrders from "@/components/CustomerOrders";
import Layout from "@/components/Layout";
import { getOrdersProcessCustomerOrdersByAdmin } from "@/utils/apis/order/api";
import { IOrdersProcessCustomerOrders } from "@/utils/apis/order/types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const CustomerOrders = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [ordersCustomer, setOrdersCustomer] = useState<IOrdersProcessCustomerOrders>();

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
      <div className=" py-3 px-2.5 space-y-6 ">
        <ContainerCustomerOrders data={ordersCustomer!} />
      </div>
    </Layout>
  );
};

export default CustomerOrders;
