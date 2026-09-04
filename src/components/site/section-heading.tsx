import { cn } from "@/lib/utils";
import { Reveal } from "@/components/site/reveal";

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
  titleClassName,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col items-center gap-4 text-center",
        align === "center" ? "sm:items-center sm:text-center" : "sm:items-start sm:text-left",
        className
      )}
    >
      <h2
        className={cn(
          "font-display text-[1.65rem] font-medium leading-[1.2] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]",
          titleClassName
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-[42ch] text-[15px] leading-relaxed text-muted-foreground sm:max-w-[60ch] sm:text-[17px]",
            align === "center" ? "mx-auto" : "mx-auto sm:mx-0"
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
