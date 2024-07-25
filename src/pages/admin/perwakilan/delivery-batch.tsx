import CardDeliveryBatch from "@/components/Card/CardDeliveryBatch";
import Layout from "@/components/Layout";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBatch, getBatch } from "@/utils/apis/batch/api";
import { BatchPayload, batchSchema, IBatch } from "@/utils/apis/batch/types";
import { FORM_ADD_BATCH } from "@/utils/constants/add-order";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const DeliveryBatch = () => {
  const [batchs, setBatchs] = useState<IBatch[]>();
  const [isOpenAddBatch, setIsOpenAddBatch] = useState(false);

  useEffect(() => {
    getBatchs();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BatchPayload>({ resolver: zodResolver(batchSchema) });

  const getBatchs = async () => {
    try {
      const result = await getBatch();
      setBatchs(result.data);
    } catch (error: any) {
      toast.error(error.message);
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
    <Layout>
      <div className="pb-20 pt-3 px-5 space-y-6 ">
        <h1 className="font-bold text-2xl">Batch Pengiriman</h1>
        {batchs?.map((batch) => (
          <CardDeliveryBatch batch={batch} key={batch.batch} onDownload={onDownloadCsv} />
        ))}
      </div>

      <Modal isOpen={isOpenAddBatch} onClose={() => setIsOpenAddBatch(false)}>
        <h1 className="font-bold text-lg mb-6">Batch Pengiriman</h1>
        <form onSubmit={onSubmitAddBatch} className="space-y-4">
          {FORM_ADD_BATCH.map((input) => (
            <div className="space-y-1" key={input.label}>
              <Label className="font-semibold">{input.label}</Label>
              <Input placeholder={input.placeholder} {...register(input.formName as keyof typeof register)} />
              {errors?.[input.formName as keyof typeof errors] ? (
                <p className="text-sm text-red-500 -mt-2">
                  {errors?.[input.formName as keyof typeof errors]?.message?.toString()}
                </p>
              ) : null}
            </div>
          ))}
          <div className="flex items-center justify-between gap-16 pt-4">
            <Button
              size={"xs"}
              className="w-full text-xs rounded-full"
              variant={"menunggu-diterima"}
              type="button"
              onClick={() => setIsOpenAddBatch(false)}
            >
              Batal
            </Button>
            <Button size={"xs"} className="w-full text-xs rounded-full" disabled={isSubmitting} type="submit">
              Simpan
            </Button>
          </div>
        </form>
      </Modal>

      <div className="fixed bottom-5 border-black right-1/2 translate-x-1/2">
        <Button
          size={"xs"}
          onClick={() => setIsOpenAddBatch(true)}
          className="uppercase rounded-full text-xs font-semibold"
        >
          tambah batch pengiriman
        </Button>
      </div>
    </Layout>
  );
};

export default DeliveryBatch;
