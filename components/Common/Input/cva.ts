import { cva } from "class-variance-authority";

export const inputCva = cva("flex flex-col gap-2", {
  variants: {
    type: {
      sm: "[&>input]:!h-8 [&>input]:placeholder:text-xs text-xs",
      md: "[&>input]:!h-10 [&>input]:placeholder:text-sm text-sm",
      lg: "[&>input]:!h-14 [&>input]:placeholder:text-md text-sm",
    },
  },
  defaultVariants: {
    type: "md",
  },
});
