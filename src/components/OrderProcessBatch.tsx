import { IOrderProcessBatch } from "@/utils/apis/order/types";
import { ChevronRight } from "lucide-react";

interface OrderProcessBatchProps {
  isOpen: string | null;
  batch: IOrderProcessBatch;
  onClickRegionCode: (batch: string, regionCode: string) => void;
  setIsOpen: (condition: string | null) => void;
}

const OrderProcessBatch = ({
  batch,
  onClickRegionCode,
  isOpen,
  setIsOpen,
}: OrderProcessBatchProps) => {
  return (
    <div className="bg-[#FCCA8F] rounded-[6px] px-4 py-3 space-y-3 relative ">
      <ChevronRight
        className={`absolute right-3 top-5 size-8  text-slate-800 cursor-pointer duration-200 ${
          isOpen === batch.delivery_batch ? "rotate-90" : "rotate-0"
        }`}
        onClick={() => setIsOpen(isOpen === batch.delivery_batch ? null : batch.delivery_batch)}
      />
      <div>
        <h1 className="uppercase font-bold text-base text-slate-800">Batch Pengiriman</h1>
        <span className="text-base font-medium -mt-5">{batch.delivery_batch}</span>
      </div>

      {/* REGION CODE */}
      {isOpen == batch.delivery_batch ? (
        <div className="space-y-2">
          <h3 className="uppercase font-semibold text-xs text-slate-800">KODE WILAYAH :</h3>
          <div className="grid grid-cols-3 gap-4">
            {batch.region_code.map((region_code) => (
              <div
                key={region_code.code}
                className="flex items-center justify-center rounded-full py-2 px-3 font-bold bg-white text-xs cursor-pointer"
                onClick={() => onClickRegionCode(batch.delivery_batch, region_code.code)}
              >
                <span className="text-nowrap ">
                  {region_code.code} - {region_code.region}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderProcessBatch;
