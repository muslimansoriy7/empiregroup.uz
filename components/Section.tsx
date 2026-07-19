import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  id,
  className,
  containerClassName,
  topHairline = false,
  children,
}: {
  id?: string;
  className?: string;
  containerClassName?: string;
  topHairline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-10 py-[clamp(72px,9vw,128px)]",
        topHairline && "border-t border-hairline",
        className
      )}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
