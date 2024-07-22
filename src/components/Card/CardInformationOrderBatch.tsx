import { useState } from "react";
import { Modal } from "../Modal";

interface CardInformationOrderBatchProps {
  data: {
    total_order: number;
    total_weight: number;
    total_price: number;
    photo_wrapped: string;
    photo_received: string;
  };
}
const CardInformationOrderBatch = ({ data }: CardInformationOrderBatchProps) => {
  const [isopenPhotoWrappedByRegionCode, setIsopenPhotoWrappedByRegionCode] = useState(false);
  const [isOpenPhotoReceivedByRegionCode, setIsOpenPhotoReceivedByRegionCode] = useState(false);

  return (
    <div className="px-3 py-4 rounded-lg bg-zinc-50 shadow w-full flex flex-col gap-3">
      <div className="font-bold text-sm">
        <h4>Photo paket dikemas admin jakarta</h4>
        <span
          className="text-[#0065FD] cursor-pointer"
          onClick={() => setIsopenPhotoWrappedByRegionCode(true)}
        >
          buka disini
        </span>
        <Modal
          isOpen={isopenPhotoWrappedByRegionCode}
          onClose={() => setIsopenPhotoWrappedByRegionCode(false)}
        >
          {data.photo_wrapped ? (
            <>
              <h3 className="font-semibold">Photo paket yang di kemas admin jakarta</h3>
              <div className="py-4">
                <img src={data.photo_wrapped} alt="photo_wrapped" className="rounded" />
              </div>
            </>
          ) : (
            <h1 className="text-center font-medium">Photo paket belum ada</h1>
          )}
        </Modal>
      </div>

      <div className="font-bold text-sm">
        <h4>Photo paket diterima admin perwakilan</h4>
        <span
          className="text-[#0065FD] cursor-pointer"
          onClick={() => setIsOpenPhotoReceivedByRegionCode(true)}
        >
          buka disini
        </span>
        <Modal
          isOpen={isOpenPhotoReceivedByRegionCode}
          onClose={() => setIsOpenPhotoReceivedByRegionCode(false)}
        >
          {data.photo_received ? (
            <>
              <h3 className="font-semibold">Photo paket yang di terima admin jakarta</h3>
              <div className="py-4">
                <img src={data.photo_received} alt="photo_received" className="rounded" />
              </div>
            </>
          ) : (
            <h1 className="text-center font-medium">Photo paket belum ada</h1>
          )}
        </Modal>
      </div>
      <div className="flex justify-between text-sm">
        <div>
          <h4 className="font-bold">Total berat</h4>
          <span>{data.total_weight}</span>
        </div>
        <div>
          <h4 className="font-bold">Total Order</h4>
          <span>{data.total_order}</span>
        </div>
        <div>
          <h4 className="font-bold">Harga</h4>
          <span>Rp. {data.total_price.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
};

export default CardInformationOrderBatch;
