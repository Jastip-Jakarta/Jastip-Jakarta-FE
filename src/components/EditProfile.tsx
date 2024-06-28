import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { EditUserSchema, IEditUserType } from "@/utils/apis/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { editUser } from "@/utils/apis/user/api";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useAuth } from "@/utils/context/auth";
import Loading from "./Loading";

const EditProfile = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user, fetchUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<IEditUserType>({
    resolver: zodResolver(EditUserSchema),
  });

  useEffect(() => {
    setValue("name", user.name as string);
    setValue("email", user.email as string);
    setValue("phone", user.phone_number as number);
  }, [isOpen]);

  const onSubmitEditUser = handleSubmit(async (body: IEditUserType) => {
    setIsLoading(true);
    try {
      const response = await editUser(body);
      toast.success(response.message);
      onClose();
      fetchUser();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <>
      {isLoading ? <Loading /> : null}
      <form onSubmit={onSubmitEditUser} className="space-y-5">
        <h3 className="text-2xl font-semibold ">Edit Profile</h3>
        <div className="flex flex-col gap-1">
          <Label>Nama</Label>
          <Input {...register("name")} />
          {errors.name ? <p className="text-sm text-red-500 -mt-2">{errors.name.message}</p> : null}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Email</Label>
          <Input {...register("email")} />
          {errors.email ? (
            <p className="text-sm text-red-500 -mt-2">{errors.email.message}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1">
          <Label>Nomor whatsapp</Label>
          <Input {...register("phone")} />
          {errors.phone ? (
            <p className="text-sm text-red-500 -mt-2">{errors.phone.message}</p>
          ) : null}
        </div>
        <div className="flex justify-end space-x-8">
          <Button
            className="bg-slate-500 text-sm w-20 hover:bg-slate-400"
            size={"sm"}
            onClick={onClose}
            type="button"
          >
            Batal
          </Button>
          <Button type="submit" className="text-sm w-20" size={"sm"} disabled={isSubmitting}>
            Simpan
          </Button>
        </div>
      </form>
    </>
  );
};

export default EditProfile;
