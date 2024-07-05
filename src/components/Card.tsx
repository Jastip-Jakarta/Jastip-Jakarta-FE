import { IOrders, IOrdersProcessItem } from "@/utils/apis/order/types";
import { Button } from "./ui/button";
import InfoStatus from "./InfoStatus";
interface ICardProps {
  order?: IOrders;
  orderProcess?: IOrdersProcessItem;
  regionCodeOrderProcess?: string;
  onActionSelengkapnya?: () => void;
}
const Card = ({
  order,
  onActionSelengkapnya,
  orderProcess,
  regionCodeOrderProcess,
}: ICardProps) => {
  return (
    <div className="px-3 py-4 rounded-lg bg-zinc-50 shadow w-full flex items-stretch ">
      <div className="w-1/2 space-y-2 ">
        <div>
          <h3 className="font-bold ">Nama Penerima</h3>
          <h4 className="font-semibold  text-lg">{order ? order.name : orderProcess?.name}</h4>
        </div>
        <div className="space-y-1 ">
          <h4 className="font-bold text-sm">Nama barang</h4>
          <span>{order ? order.item_name : orderProcess?.item_name}</span>
          <h4 className="font-bold text-sm">Kode Wilayah</h4>
          <span>{order ? `${order.code} - ${order.region}` : regionCodeOrderProcess}</span>
          <h4 className="font-bold text-sm">Nomor Resi</h4>
          <div className="flex items-center gap-3">
            <span>{order ? order.tracking_number : orderProcess?.tracking_number}</span> -{" "}
            <span>{order ? order.online_store : orderProcess?.online_store}</span>
          </div>
        </div>
      </div>
      <div className="w-1/2 flex flex-col justify-between">
        <div className="w-full space-y-1 ">
          <InfoStatus statusOrder={order ? order.status : orderProcess?.status} />
        </div>
        <div className="w-full space-y-2">
          <div className="flex flex-col">
            <span className="font-bold text-sm">Nomor Resi Jastip</span>
            <span className="text-sm">
              {orderProcess ? orderProcess.tracking_number_jastip : "-"}
            </span>
          </div>
          <Button size={"sm"} className="w-full rounded-full h-8" onClick={onActionSelengkapnya}>
            Lihat selengkapnya
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Card;
