import CardDeliveryBatch from "@/components/Card/CardDeliveryBatch";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBatch, getBatch } from "@/utils/apis/batch/api";
import { BatchPayload, batchSchema, IBatch } from "@/utils/apis/batch/types";
import { FORM_ADD_BATCH } from "@/utils/constants/add-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { LoaderCircle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeliveryBatchAdminSuper = () => {
  const [batchs, setBatchs] = useState<IBatch[]>();
  const [isOpenAddBatch, setIsOpenAddBatch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BatchPayload>({ resolver: zodResolver(batchSchema) });

  useEffect(() => {
    getBatchs();
  }, []);

  const getBatchs = async () => {
    setIsLoading(true);
    try {
      const result = await getBatch();
      setBatchs(result.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitAddBatch = handleSubmit(async (body: BatchPayload) => {
    try {
      const result = await createBatch(body);
      toast.success(result.message);
      reset();
      setIsOpenAddBatch(false);
      getBatchs();
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  const onDownloadCsv = async (batch: string) => {
    try {
      window.location.href = `${import.meta.env.VITE_BASE_URL}/download/csv?batch=${batch}`;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <LayoutAdmin>
      <div className="space-y-10 max-w-5xl mx-auto">
        <div className="space-y-4">
          <h1 className="font-semibold text-3xl">Batch Pengiriman</h1>

          <Dialog open={isOpenAddBatch} onOpenChange={setIsOpenAddBatch}>
            <DialogTrigger asChild>
              <Button className="space-x-3">
                <Plus /> <span>Tambah batch pengiriman</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogTitle className="text-xl font-semibold">Tambah batch pengiriman</DialogTitle>
              <form onSubmit={onSubmitAddBatch}>
                {FORM_ADD_BATCH.map((input) => (
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
        <div className="relative grid grid-cols-2 gap-6">
          {isLoading ? (
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center flex-col gap-1">
              <LoaderCircle className="animate-spin" />
              <span> Loading...</span>
            </div>
          ) : (
            batchs?.map((batch) => (
              <CardDeliveryBatch batch={batch} key={batch.batch} onDownload={onDownloadCsv} />
            ))
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
};

export default DeliveryBatchAdminSuper;
