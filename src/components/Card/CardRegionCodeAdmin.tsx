import { IRegion } from "@/utils/apis/region-code/types";

const CardRegionCodeAdmin = ({
  region,
  ...props
}: {
  region: IRegion;
  [propName: string]: any;
}) => {
  return (
    <div className="px-4 py-3 bg-white rounded-md space-y-2 text-sm cursor-pointer" {...props}>
      <h2 className="font-semibold text-xl">{region.code}</h2>
      <div className="flex flex-row font-medium gap-x-3">
        <span className="font-semibold">Wilayah</span>
        <span className="">:</span>
        <span>{region.region}</span>
      </div>
      <div className="flex flex-row font-medium gap-x-3">
        <span className="font-semibold">Alamat</span>
        <span className="">:</span>
        <span>{region.full_address}</span>
      </div>
      <div className="flex flex-row font-medium gap-x-3">
        <span className="font-semibold">Admin perwakilan</span>
        <span className="">:</span>
        <span>{region.admin_id}</span>
      </div>
      <div className="flex flex-row font-medium gap-x-3">
        <span className="font-semibold">Nomor whatsapp</span>
        <span className="">:</span>
        <span>{region.phone_number}</span>
      </div>
      <div className="flex flex-row font-medium gap-x-3">
        <span className="font-semibold">Harga kode wilayah</span>
        <span className="">:</span>
        <span>{Math.floor(200 + Math.random() * 3000000).toLocaleString("id-ID")}</span>
      </div>
    </div>
  );
};

export default CardRegionCodeAdmin;
