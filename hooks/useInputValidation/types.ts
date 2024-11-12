import { MatchFuncType } from "@/utils/form-validation";

/* eslint-disable */
export type onChangeType = (name: string, value: string) => void;
export type ValidatableElement =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement;

export interface useInputValidationProps {
  required?: boolean;
  match?: MatchFuncType[];
}
