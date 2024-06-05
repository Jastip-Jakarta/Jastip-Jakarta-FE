import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { EditUserSchema, IEditUserType } from "@/utils/apis/user/types";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { editUser } from "@/utils/apis/user/api";
import { Button } from "./ui/button";
import { useModal } from "@/utils/context/modal";
import { useEffect } from "react";
import { useAuth } from "@/utils/context/auth";
import { Loader } from "lucide-react";

const EditProfile = () => {
  const { state, dispatch } = useModal();
  const { user } = useAuth();
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
  }, [state.isOpenEditProfile]);

  const onSubmitEditUser = handleSubmit(async (body: IEditUserType) => {
    try {
      const response = await editUser(body);
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  return (
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
        {errors.email ? <p className="text-sm text-red-500 -mt-2">{errors.email.message}</p> : null}
      </div>
      <div className="flex flex-col gap-1">
        <Label>Nomor whatsapp</Label>
        <Input {...register("phone")} />
        {errors.phone ? <p className="text-sm text-red-500 -mt-2">{errors.phone.message}</p> : null}
      </div>
      <div className="flex justify-end space-x-8">
        <Button
          className="bg-slate-500 text-sm w-20 hover:bg-slate-400"
          size={"sm"}
          onClick={() => dispatch({ type: "CLOSE_EDIT_PROFILE" })}
        >
          Batal
        </Button>
        <Button type="submit" className="text-sm w-20" size={"sm"}>
          {isSubmitting ? <Loader className="animate-spin " /> : "Simpan"}
        </Button>
      </div>
    </form>
  );
};

export default EditProfile;
