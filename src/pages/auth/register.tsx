import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IRegisterType, RegisterSchema } from "@/utils/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { Register as RegisterAction } from "@/utils/apis/auth/api";
import toast from "react-hot-toast";
import { Modal } from "@/components/Modal";
import InputPassword from "@/components/InputPassword";

const Register: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [passwordHide, setPasswordHide] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterType>({ resolver: zodResolver(RegisterSchema) });

  const onSumbitRegister = handleSubmit(async (body: IRegisterType) => {
    try {
      const result = await RegisterAction(body);
      onClose();
      toast.success(result.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  });
  return (
    <>
      <p className="text-base pb-6 text-slate-500 ">
        Sebelum menggunakan JASTIP Jakarta kamu harus mendaftar dulu yah!
      </p>
      <form onSubmit={onSumbitRegister} className="space-y-4">
        <div className="grid gap-4">
          <div className="grid grid-rows-1 items-center justify-items-start gap-2">
            <Label htmlFor="Nama" className="text-right">
              Nama
            </Label>
            <Input id="Nama" className="col-span-3" {...register("name")} />
            {errors.name ? (
              <p className="text-sm text-red-500 -mt-2">{errors.name.message}</p>
            ) : null}
          </div>
          <div className="grid grid-rows-1 items-center justify-items-start gap-2">
            <Label htmlFor="Email" className="text-right">
              Email
            </Label>
            <Input id="Email" className="col-span-3" {...register("email")} />
            {errors.email ? (
              <p className="text-sm text-red-500 -mt-2">{errors.email.message}</p>
            ) : null}
          </div>
          <div className="grid grid-rows-1 items-center justify-items-start gap-2">
            <Label htmlFor="nomor-wa" className="text-right">
              Nomor Whatsapp
            </Label>
            <Input id="nomor-wa" className="col-span-3" {...register("phone")} />
            {errors.phone ? (
              <p className="text-sm text-red-500 -mt-2">{errors.phone.message}</p>
            ) : null}
          </div>
          <div className="grid grid-rows-1 items-center justify-items-start gap-2">
            <Label htmlFor="kata-sandi" className="text-right">
              Kata Sandi
            </Label>
            <InputPassword hide={passwordHide} onHide={setPasswordHide} register={register} />

            {errors.password ? (
              <p className="text-sm text-red-500 -mt-2">{errors.password.message}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button disabled={isSubmitting} type="submit">
            {isSubmitting ? "loading" : "Daftar"}
          </Button>
          <p className="text-sm">
            kalau kamu sudah memiliki akun silahkan login{" "}
            <span
              className="font-bold underline underline-offset-4 cursor-pointer"
              onClick={() => onClose()}
            >
              disini
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default Register;
