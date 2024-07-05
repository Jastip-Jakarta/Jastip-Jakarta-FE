import { Button } from "../../components/ui/button";
import waIcon from "../../../public/images/WhatsAppIcon.png";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getRegions } from "@/utils/apis/region-code/api";
import { IRegion } from "@/utils/apis/region-code/types";

const RegionCode = () => {
  const [regions, setRegions] = useState<IRegion[]>();

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const result = await getRegions();
      setRegions(result.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onContactAdmin = (whatsappNumber: string) => {
    let newNumber = "";
    const deleteChar = [" ", "-", "+"];
    for (let i = 0; i < whatsappNumber.length; i++) {
      if (!deleteChar.includes(whatsappNumber[i])) {
        newNumber += whatsappNumber[i];
      }
    }
    window.location.href = `https://wa.me/${newNumber}/?text=HelloWorld`;
  };

  return (
    <Layout>
      <div className="flex flex-col items-center gap-4 p-4">
        {regions?.map((region) => (
          <div className="bg-white max-w-md px-3 py-4 rounded-md w-full space-y-3 shadow-sm border">
            <div>
              <h4 className="font-bold text-sm">Kode Wilayah</h4>
              <h3 className="font-bold text-lg">
                {region.code} - {region.region}
              </h3>
            </div>
            <div>
              <h5 className="font-bold text-sm">Alamat</h5>
              <p className="text-sm">{region.full_address}</p>
            </div>
            <div className="flex items-end justify-between">
              <div className="text-sm">
                <h4 className="font-medium">Nomor Telepon Admin</h4>
                <span>{region.phone_number}</span>
              </div>
              <Button
                size={"xs"}
                className="bg-[#1E9C09] hover:bg-[#1E9C09]/80 uppercase text-[10px] space-x-1 rounded-full"
                onClick={() => onContactAdmin(`${region.phone_number}`)}
              >
                <img src={waIcon} alt="wa-icon" />
                <span>hubungi admin</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default RegionCode;
