import CardRegionCodeAdmin from "@/components/Card/CardRegionCodeAdmin";
import LayoutAdmin from "@/components/LayoutAdmin";
import SearchOrder from "@/components/SearchOrder";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createRegion, getRegions } from "@/utils/apis/region-code/api";
import { IRegion, RegionPayload, regionSchema } from "@/utils/apis/region-code/types";
import { FORM_REGION_CODE } from "@/utils/constants/add-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const RegionCodeAdminSuper = () => {
  const [regions, setRegions] = useState<IRegion[]>();
  const [isOpenAddRegionCode, setIsOpenAddRegionCode] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegionPayload>({ resolver: zodResolver(regionSchema) });

  const fetchRegions = async () => {
    try {
      const result = await getRegions();
      setRegions(result.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const onSubmitAddRegion = handleSubmit(async (body: RegionPayload) => {
    try {
      const result = await createRegion(body);
      toast.success(result.message);
      reset();
      setIsOpenAddRegionCode(false);
      getRegions();
    } catch (error: any) {
      toast.error(error.message);
    }
  });
  return (
    <LayoutAdmin>
      <div className="space-y-8 max-w-5xl mx-auto">
        <div className="space-y-3">
          <h1 className="font-semibold text-3xl">Kode Wilayah</h1>
          <div className="flex items-center gap-8">
            <SearchOrder
              onSubmit={async () => {}}
              setKeyword={() => {}}
              placeholder="Cari kode wilayah"
              className="ring-0 flex-1"
            />

            <Dialog open={isOpenAddRegionCode} onOpenChange={setIsOpenAddRegionCode}>
              <DialogTrigger asChild>
                <Button className="space-x-3">
                  <Plus />
                  <span>Tambah kode wilayah</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogTitle className="text-xl font-semibold">Tambah kode wilayah</DialogTitle>
                <form onSubmit={onSubmitAddRegion} className="space-y-2">
                  {FORM_REGION_CODE.map((input) => (
                    <div className="space-y-1" key={input.label}>
                      <Label className="font-semibold">{input.label}</Label>
                      <Input
                        placeholder={input.placeholder}
                        {...register(input.formName as keyof typeof register)}
                      />
                      {errors?.[input.formName as keyof typeof errors] ? (
                        <p className="text-sm text-red-500 -mt-2">
                          {errors?.[input.formName as keyof typeof errors]?.message?.toString()}
                        </p>
                      ) : null}
                    </div>
                  ))}
                  <DialogFooter className="mt-5">
                    <Button type="submit" disabled={isSubmitting}>
                      Simpan
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          {regions?.map((region, index) => (
            <CardRegionCodeAdmin region={region} key={index} />
          ))}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default RegionCodeAdminSuper;
