import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import LayoutAdmin from "@/components/LayoutAdmin";
import SearchOrder from "@/components/SearchOrder";
import { DialogTitle } from "@radix-ui/react-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORM_REGION_CODE } from "@/utils/constants/add-order";
import CardRegionCodeAdmin from "@/components/Card/CardRegionCodeAdmin";
import { createRegion, getRegion, getRegions } from "@/utils/apis/region-code/api";
import { IRegion, RegionPayload, regionSchema } from "@/utils/apis/region-code/types";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { getAdminPerwakilan } from "@/utils/apis/admin/api";
import { IAdmin } from "@/utils/apis/admin/types";
import { useAuth } from "@/utils/context/auth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RegionCodeAdminSuper = () => {
  const { user } = useAuth();
  const [regions, setRegions] = useState<IRegion[]>();
  const [adminJId, setAdminJId] = useState<string | null>();
  const [adminPerwakilans, setAdminPerwakilans] = useState<IAdmin[]>();
  const [isOpenAddRegionCode, setIsOpenAddRegionCode] = useState(false);
  const [isOpenDetailRegionCode, setIsOpenDetailRegionCode] = useState(false);
  useEffect(() => {
    fetchRegions();
    fetchAdminPerwakilan();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegionPayload>({ resolver: zodResolver(regionSchema) });

  const fetchAdminPerwakilan = async () => {
    try {
      const result = await getAdminPerwakilan();
      setAdminPerwakilans(result.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
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
      fetchRegions();
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  const onOpenDetailRegion = async (code: string) => {
    setIsOpenDetailRegionCode(true);
    try {
      const result = await getRegion(code);
      setAdminJId(`${result.data.admin_id!}`);
      setValue("admin_id_perwakilan", result.data.admin_id!);
      setValue("phone", result.data.phone_number!);
      setValue("code", result.data.code!);
      setValue("region", result.data.region!);
      setValue("full_address", result.data.full_address!);
      setValue("price", 100000);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
                  {FORM_REGION_CODE.map((form) => (
                    <div key={form.label} className="space-y-1">
                      {form.label !== "Nama admin perwakilan" ? (
                        <>
                          <Label>{form.label}</Label>
                          <Input
                            placeholder={form.placeholder}
                            {...register(form.formName as any)}
                            disabled={user.role === "Perwakilan"}
                          />
                          {errors?.[form.formName as keyof typeof errors] ? (
                            <p className="text-sm text-red-500 -mt-2">
                              {errors?.[form.formName as keyof typeof errors]?.message?.toString()}
                            </p>
                          ) : null}
                        </>
                      ) : (
                        <>
                          <Label>{form.label}</Label>
                          <Select onValueChange={(e) => setValue(form.formName as any, e)}>
                            <SelectTrigger className="!ring-0">
                              <SelectValue placeholder={form.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {adminPerwakilans?.map((admin) => (
                                <SelectItem key={admin.admin_id} value={`${admin.admin_id}`}>
                                  {admin.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {errors?.[form.formName as keyof typeof errors] ? (
                            <p className="text-sm text-red-500 -mt-2">
                              {errors?.[form.formName as keyof typeof errors]?.message}
                            </p>
                          ) : null}
                        </>
                      )}
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
            <CardRegionCodeAdmin
              region={region}
              key={index}
              onClick={() => onOpenDetailRegion(region.code)}
            />
          ))}
          <Dialog open={isOpenDetailRegionCode} onOpenChange={setIsOpenDetailRegionCode}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogTitle className="text-xl font-semibold">Edit kode wilayah</DialogTitle>
              <form onSubmit={onSubmitAddRegion} className="space-y-2">
                {FORM_REGION_CODE.map((form) => (
                  <div key={form.label} className="space-y-1">
                    {form.label !== "Nama admin perwakilan" ? (
                      <>
                        <Label>{form.label}</Label>
                        <Input
                          placeholder={form.placeholder}
                          {...register(form.formName as any)}
                          disabled={user.role === "Perwakilan"}
                        />
                        {errors?.[form.formName as keyof typeof errors] ? (
                          <p className="text-sm text-red-500 -mt-2">
                            {errors?.[form.formName as keyof typeof errors]?.message?.toString()}
                          </p>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <Label>{form.label}</Label>
                        <Select
                          onValueChange={(e) => setValue(form.formName as any, e)}
                          value={adminJId!}
                        >
                          <SelectTrigger className="!ring-0">
                            <SelectValue placeholder={form.placeholder} />
                          </SelectTrigger>
                          <SelectContent>
                            {adminPerwakilans?.map((admin) => (
                              <SelectItem key={admin.admin_id} value={`${admin.admin_id}`}>
                                {admin.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors?.[form.formName as keyof typeof errors] ? (
                          <p className="text-sm text-red-500 -mt-2">
                            {errors?.[form.formName as keyof typeof errors]?.message}
                          </p>
                        ) : null}
                      </>
                    )}
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
    </LayoutAdmin>
  );
};

export default RegionCodeAdminSuper;
