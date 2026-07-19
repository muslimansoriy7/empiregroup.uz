import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  className,
  dot = true,
}: {
  children: React.ReactNode;
  className?: string;
  dot?: boolean;
}) {
  return (
    <span className={cn("eyebrow inline-flex items-center gap-2", className)}>
      {dot && (
        <span
          aria-hidden
          className="inline-block size-1.5 rounded-full bg-ink/70"
        />
      )}
      {children}
    </span>
  );
}
