import type { ComponentType, HTMLAttributes } from "react";

export type IconComponent = ComponentType<
  HTMLAttributes<HTMLDivElement> & { size?: number }
>;
