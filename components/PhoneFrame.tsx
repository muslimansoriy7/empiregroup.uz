import { cn } from "@/lib/cn";

/**
 * PhoneFrame — minimal ink bezel, hairline screen. Children render the app UI.
 */
export function PhoneFrame({
  className,
  bodyClassName,
  float = false,
  children,
}: {
  className?: string;
  bodyClassName?: string;
  float?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative w-[280px] rounded-[44px] bg-ink p-2.5",
        float ? "shadow-[var(--shadow-float)]" : "shadow-[var(--shadow-whisper)]",
        className
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[34px] border border-hairline bg-elevated",
          bodyClassName
        )}
      >
        {/* notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}
