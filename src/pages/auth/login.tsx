import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ILoginType, LoginSchema } from "@/utils/apis/auth/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Login as LoginAction } from "@/utils/apis/auth/api";
import { useAuth } from "@/utils/context/auth";
import { Navigate } from "react-router-dom";
import { Modal } from "@/components/Modal";
import InputPassword from "@/components/InputPassword";

const Login: FC<{ onClose: () => void }> = ({ onClose }) => {
  const [passwordHide, setPasswordHide] = useState(true);
  // const [isOpen, setIsOpen] = useState(false);
  const { changeToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginType>({ resolver: zodResolver(LoginSchema) });

  const onSumbitLogin = handleSubmit(async (body: ILoginType) => {
    try {
      const result = await LoginAction(body);
      changeToken(result.data.token);
      toast.success(result.message);
      onClose();
      <Navigate to={"/order"} />;
    } catch (error: any) {
      toast.error(error.message);
    }
  });
  return (
    <>
      <p className="text-base pb-6 text-slate-700 ">
        Kalau kamu sudah mempunyai akun JASTIP Jakarta silahkan login.
      </p>
      <form onSubmit={onSumbitLogin} className="space-y-4">
        <div className="grid gap-4">
          <div className="grid grid-rows-1 items-center justify-items-start gap-2">
            <Label htmlFor="email_no_wa">Email / Nomor Whatsapp</Label>
            <Input id="email_no_wa" className="col-span-3" {...register("email_or_phone")} />
            {errors.email_or_phone ? (
              <p className="text-sm text-red-500 -mt-2">{errors.email_or_phone.message}</p>
            ) : null}
          </div>

          <div className="grid grid-rows-1 items-center justify-items-start gap-2">
            <Label htmlFor="kata-sandi">Kata Sandi</Label>
            <InputPassword hide={passwordHide} onHide={setPasswordHide} register={register} />
            {errors.password ? (
              <p className="text-sm text-red-500 -mt-2 mb-2">{errors.password.message}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button type="submit" disabled={isSubmitting}>
            Masuk
          </Button>
          <span className="text-sm py-2 font-medium hover:underline underline-offset-2 cursor-pointer text-slate-600">
            Lupa Sandi?
          </span>
          <p className="text-[13px]">
            kalau kamu belum memiliki akun silahkan daftar disini{" "}
            <span
              className="font-bold underline underline-offset-4 cursor-pointer"
              onClick={onClose}
            >
              disini
            </span>
          </p>
        </div>
      </form>
    </>
  );
};

export default Login;
