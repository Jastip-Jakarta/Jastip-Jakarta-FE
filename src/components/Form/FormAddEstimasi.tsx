import { IEstimation } from "@/pages/admin/order-process/customers";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
interface FormAddEstimasiProps {
  onSubmit: (e: any) => void;
  estimasi: IEstimation;
}
const FormAddEstimasi = ({ estimasi, onSubmit }: FormAddEstimasiProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-4 items-center">
      <div className="flex items-center bg-white rounded-md">
        <Input
          placeholder="tanggal"
          className="bg-transparent shadow-none ring-0 border-none"
          defaultValue={estimasi?.tanggal}
          name="tanggal"
        />
        /
        <Input
          placeholder="bulan"
          className="bg-transparent shadow-none ring-0 border-none"
          defaultValue={estimasi?.bulan}
          name="bulan"
        />
        /
        <Input
          placeholder="tahun"
          className="bg-transparent shadow-none ring-0 border-none"
          defaultValue={estimasi?.tahun}
          name="tahun"
        />
      </div>
      <Button type="submit" size={"xs"} className="uppercase max-w-32 text-xs font-medium">
        Simpan
      </Button>
    </form>
  );
};

export default FormAddEstimasi;
