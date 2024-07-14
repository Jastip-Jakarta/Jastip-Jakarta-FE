import { ILoginType, LoginSchema } from "@/utils/apis/auth/types";
import { useAuth } from "@/utils/context/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoginAdmin as loginAdminAction } from "@/utils/apis/auth/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import InputPassword from "@/components/InputPassword";
const LoginAdmin = () => {
  const [passwordHide, setPasswordHide] = useState(true);

  const { changeToken } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginType>({ resolver: zodResolver(LoginSchema) });

  const onSumbitLogin = handleSubmit(async (body: ILoginType) => {
    try {
      const result = await loginAdminAction(body);
      changeToken(result.data.token);
      localStorage.setItem("role", result.data.role);
      toast.success(result.message);
      result.data.role === "Super" ? navigate("/admin/dashboard") : navigate("/orders");
    } catch (error: any) {
      toast.error(error.message);
    }
  });
  return (
    <div className="bg-black/20">
      <div className="max-w-[500px] mx-auto bg-slate-100 min-h-screen text-black py-3 px-4 space-y-5">
        <div className="flex items-center relative">
          <button className="flex items-center gap-3 " onClick={() => navigate("/")}>
            <ArrowLeft className="size-7 " />
          </button>
          <h2 className="font-bold text-lg absolute left-1/2 -translate-x-1/2 text-nowrap">
            Masuk sebagai Admin
          </h2>
        </div>

        <form onSubmit={onSumbitLogin} className="space-y-4 py-3">
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
          <div className="flex flex-col gap-2">
            <Button type="submit" disabled={isSubmitting}>
              Masuk
            </Button>
            <span className="text-sm py-2 font-medium hover:underline underline-offset-2 cursor-pointer text-slate-600">
              Lupa Sandi?
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginAdmin;
