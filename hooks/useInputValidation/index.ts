import { useRef, useState } from "react";
import { ValidatableElement, useInputValidationProps } from "./types";

export function useInputValidation<T extends ValidatableElement>({
  required,
  match,
}: useInputValidationProps) {
  const [validationError, setValidationError] = useState("");
  const ref = useRef<T>(null);

  const checkValidation = (value: any) => {
    const name = ref.current?.name;

    if (name) {
      const validate = (matchedValue: string | boolean) => {
        if (typeof matchedValue === "string") {
          setValidationError(matchedValue);
          ref.current?.setCustomValidity("not valid");
        } else {
          setValidationError("");
          ref.current?.setCustomValidity("");
        }
      };

      if (!value && required) {
        setValidationError("Please enter a value");
      } else if (match?.length) {
        for (const matchFunc of match) {
          const valueMatches = matchFunc(value);

          if (valueMatches instanceof Promise) {
            valueMatches.then((response) => validate(response));
          } else {
            validate(valueMatches);
          }
        }
      } else {
        setValidationError("");
        ref.current?.setCustomValidity("");
      }
    }
  };

  return { validationError, checkValidation, ref };
}
