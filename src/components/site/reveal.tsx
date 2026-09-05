import * as React from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function RevealGroup({ children, className }: RevealProps) {
  return <div className={className}>{children}</div>;
}

export function RevealItem({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}
