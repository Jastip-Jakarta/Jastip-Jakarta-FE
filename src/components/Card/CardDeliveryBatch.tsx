import { IBatch } from "@/utils/apis/batch/types";
import { Button } from "../ui/button";

const CardDeliveryBatch = ({
  batch,
  onDownload,
}: {
  batch: IBatch;
  onDownload: (batch: string) => void;
}) => {
  return (
    <div className="bg-white px-3 py-4 rounded-md w-full space-y-3 shadow-sm border">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="uppercase font-bold text-base">Batch pengiriman</h3>
          <h3 className="font-semibold text-base tracking-wide">{batch.delivery_batch}</h3>
        </div>
        <Button
          size={"xs"}
          className="!text-[11px] rounded-full font-semibold"
          onClick={() => onDownload(batch.delivery_batch)}
        >
          DOWNLOAD CSV
        </Button>
      </div>
      <div className="flex items-center gap-8 text-sm ">
        <div className="flex flex-col">
          <h5 className="font-bold">BULAN</h5>
          <span className="font-medium">{batch.month}</span>
        </div>
        <div className="flex flex-col">
          <h5 className="font-bold">TAHUN</h5>
          <span className="font-medium">{batch.year}</span>
        </div>
        <div className="flex flex-col">
          <h5 className="font-bold">BATCH</h5>
          <span className="font-medium">{batch.batch}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDeliveryBatch;
