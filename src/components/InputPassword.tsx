import { Eye, EyeOff } from "lucide-react";
import { Input } from "./ui/input";
import { UseFormRegister } from "react-hook-form";

interface InputPasswordProps {
  hide: boolean;
  onHide: (condition: boolean) => void;
  register: UseFormRegister<any>;
}

const InputPassword = ({ hide, onHide, register }: InputPasswordProps) => {
  return (
    <div className="flex items-center w-full bg-white border rounded-md pr-2">
      <Input
        id="kata-sandi"
        className="col-span-3 border-none"
        type={hide ? "password" : "text"}
        {...register("password")}
      />
      {hide ? (
        <EyeOff className="cursor-pointer" onClick={() => onHide(false)} />
      ) : (
        <Eye className="cursor-pointer" onClick={() => onHide(true)} />
      )}
    </div>
  );
};

export default InputPassword;
