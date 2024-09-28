"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Control, ControllerRenderProps } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { FormFieldType } from "./forms/PatientForm";
import Image from "next/image";
import { Input } from "./ui/input";

interface CustomFormFieldType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  placeholder: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  chilren?: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({
  field,
  Props,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  field: ControllerRenderProps<any, string>;
  Props: CustomFormFieldType;
}) => {
  const { placeholder, fieldType, iconSrc, iconAlt } = Props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            placeholder={placeholder}
            defaultCountry="IN"
            international
            withCountryCallingCode
            value={field.value}
            className="input-phone"
            onChange={(number) => field.onChange(number)}
          />
        </FormControl>
      );
    default:
      return null;
  }
};

const CustomFormField = (Props: CustomFormFieldType) => {
  const { control, name, fieldType, label } = Props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderField field={field} Props={Props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
