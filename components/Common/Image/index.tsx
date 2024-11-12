import NextImage from "next/image";
import { ImageProps } from "./types";

export function Image({ height = 600, width = 600, ...props }: ImageProps) {
  return <NextImage height={height} width={width} {...props} />;
}
