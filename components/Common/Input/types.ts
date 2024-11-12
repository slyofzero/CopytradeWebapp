import { MatchFuncType } from "@/utils";
import { inputCva } from "./cva";
import { VariantProps } from "class-variance-authority";
import { ChangeEvent } from "react";

/* eslint-disable */
interface OmittedProps {
  onChange: never;
  type: never;
}
type HTMLInputElementProps = React.InputHTMLAttributes<HTMLInputElement>;
type HTMLInputElementOmittedProps = Omit<
  HTMLInputElementProps,
  keyof OmittedProps
>;
export type InputVariantProps = VariantProps<typeof inputCva>;

export interface InputProps
  extends HTMLInputElementOmittedProps,
    InputVariantProps {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  match?: MatchFuncType[];
  name: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => any;
  showValidationError?: boolean;
}
