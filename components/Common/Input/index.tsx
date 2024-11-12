import { ChangeEvent, useId } from "react";
import { InputProps } from "./types";
import { classNames } from "@/utils";
import { inputCva } from "./cva";
import { useInputValidation } from "@/hooks";
import { ShowWhen } from "@/components/Utils";

export function Input({
  className = "",
  match,
  label,
  labelClassName = "",
  type,
  required,
  containerClassName,
  onChange,
  showValidationError = true,
  ...props
}: InputProps) {
  const fieldId = useId();
  const { checkValidation, ref, validationError } =
    useInputValidation<HTMLInputElement>({
      match,
      required,
    });

  const labelComponent = (
    <label
      className={classNames("fw-bold text-sm ml-4", labelClassName)}
      htmlFor={fieldId}
    >
      {label}
    </label>
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange?.(e);
    checkValidation(value);
  };

  const headerLikeComponent = (
    <div className="flex justify-between">
      <ShowWhen component={labelComponent} when={label} />
      <ShowWhen
        component={<span className="text-red-500">{validationError}</span>}
        when={showValidationError}
      />
    </div>
  );

  return (
    <div className={classNames(inputCva({ type }), containerClassName || "")}>
      <ShowWhen
        component={headerLikeComponent}
        when={label || (validationError && showValidationError)}
      />

      <input
        id={fieldId}
        ref={ref}
        className={classNames(
          "bg-black rounded-2xl w-full border-[1.5px] outline-none px-4 placeholder:text-white/75",
          className,
          validationError ? "border-red-500" : "border-white"
        )}
        // @ts-ignore
        onChange={onchange || handleInputChange}
        required={required}
        onInvalid={(e: ChangeEvent<HTMLInputElement>) => {
          e.preventDefault();
          const { value } = e.target;
          checkValidation(value);
        }}
        onInput={(e: ChangeEvent<HTMLInputElement>) => {
          e.target.setCustomValidity("");
        }}
        {...props}
      />
    </div>
  );
}
