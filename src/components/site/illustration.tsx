import { cn } from "@/lib/utils";

export function Illustration({
  src,
  width,
  height,
  className,
  priority,
}: {
  src: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      className={cn("h-auto w-full max-w-full select-none", className)}
    />
  );
}
