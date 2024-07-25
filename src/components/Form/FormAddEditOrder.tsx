import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IOrderType } from "@/utils/apis/order/types";
import { FORM_ORDER } from "@/utils/constants/add-order";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { valueOptionType } from "../../pages/admin/super/orders";

interface AddEditOrderProps {
  errors: FieldErrors<IOrderType>;
  register: UseFormRegister<IOrderType>;
  defaultValueOption?: valueOptionType;
  setValue: UseFormSetValue<IOrderType>;
}

const AddEditOrder = ({ register, errors, defaultValueOption, setValue }: AddEditOrderProps) => {
  return FORM_ORDER.map((form, index) => (
    <div className="space-y-1" key={index}>
      {!form.options ? (
        <>
          <Label>{form.label}</Label>
          <Input placeholder={form.placeholder} {...register(form.formName as any)} />
          {errors?.[form.formName as keyof typeof errors] ? (
            <p className="text-sm text-red-500 -mt-2">
              {errors?.[form.formName as keyof typeof errors]?.message?.toString()}
            </p>
          ) : null}
          <p className="text-xs">{form.msg}</p>
        </>
      ) : (
        <>
          <Label>{form.label}</Label>
          <Select
            defaultValue={
              form.label === "Toko Online" ? defaultValueOption?.online_store : defaultValueOption?.code
            }
            onValueChange={(e) => setValue(form.formName as any, e)}
          >
            <SelectTrigger className="!ring-0">
              <SelectValue placeholder={form.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {form.options.map((option) => (
                <SelectItem
                  key={option}
                  value={form.label === "Kode Wilayah" ? option.split("-")[0].replace(" ", "") : option}
                >
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors?.[form.formName as keyof typeof errors] ? (
            <p className="text-xs text-red-500 -mt-2">
              {errors?.[form.formName as keyof typeof errors]?.message}
            </p>
          ) : null}

          {form.formName == "region_code" ? (
            <p className="text-xs">
              {form.msg} <span className="font-bold">disini.</span>
            </p>
          ) : (
            <p className="text-xs">{form.msg}</p>
          )}
        </>
      )}
    </div>
  ));
};

export default AddEditOrder;
