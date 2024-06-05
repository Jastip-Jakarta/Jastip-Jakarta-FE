import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
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

const Login: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      setIsOpen(false);
      <Navigate to={"/order"} />;
    } catch (error: any) {
      toast.error(error.message);
    }
  });
  return (
    <Dialog open={isOpen} onOpenChange={(v) => setIsOpen(v)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogDescription className="py-3 text-start">
            Kalau kamu sudah mempunyai akun JASTIP Jakarta silahkan login.{" "}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSumbitLogin}>
          <div className="grid gap-4">
            <div className="grid grid-rows-1 items-center justify-items-start gap-4">
              <Label htmlFor="email_no_wa">Email / Nomor Whatsapp</Label>
              <Input id="email_no_wa" className="col-span-3" {...register("email_or_phone")} />
              {errors.email_or_phone ? (
                <p className="text-sm text-red-500 -mt-2">{errors.email_or_phone.message}</p>
              ) : null}
            </div>

            <div className="grid grid-rows-1 items-center justify-items-start gap-4">
              <Label htmlFor="kata-sandi">Kata Sandi</Label>
              <Input id="kata-sandi" className="col-span-3" {...register("password")} />
              {errors.password ? (
                <p className="text-sm text-red-500 -mt-2 mb-2">{errors.password.message}</p>
              ) : null}
            </div>
          </div>
          <DialogFooter className="!flex-col gap-2">
            <Button type="submit" disabled={isSubmitting}>
              Masuk
            </Button>
            <p className="text-sm">
              kalau kamu belum memiliki akun silahkan daftar disini{" "}
              <span
                className="font-bold underline underline-offset-4 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                disini
              </span>
            </p>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Login;
