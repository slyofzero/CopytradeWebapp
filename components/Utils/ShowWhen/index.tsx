import { ShowWhenProps } from "./types";

export function ShowWhen({ component, when, otherwise }: ShowWhenProps) {
  when ||= false;
  otherwise ||= <></>;

  if (when) {
    return <>{component}</>;
  }

  return <>{otherwise}</>;
}
