import { cn } from "@/lib/cn";

/**
 * BrowserFrame — clean Vercel-style browser chrome.
 * Monochrome traffic lights + hairline URL bar. Children render the UI mockup.
 */
export function BrowserFrame({
  url = "app.empiregroup.uz",
  showUrl = true,
  className,
  bodyClassName,
  float = false,
  children,
}: {
  url?: string;
  /** when false, the chrome shows only the traffic lights (no address bar) */
  showUrl?: boolean;
  className?: string;
  bodyClassName?: string;
  float?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-[var(--radius-card-lg)] border border-hairline bg-elevated",
        float ? "shadow-[var(--shadow-float)]" : "shadow-[var(--shadow-whisper)]",
        className
      )}
    >
      {/* chrome */}
      <div className="flex h-11 shrink-0 items-center gap-3 border-b border-hairline px-4">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-hairline" />
          <span className="size-2.5 rounded-full bg-hairline" />
          <span className="size-2.5 rounded-full bg-hairline" />
        </div>
        {showUrl && (
          <div className="ml-1 flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-[var(--radius-btn)] border border-hairline bg-canvas px-2.5">
            <svg
              viewBox="0 0 24 24"
              className="size-3 shrink-0 text-faint"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <rect x="5" y="11" width="14" height="9" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="truncate font-mono text-[11px] text-mute">
              {url}
            </span>
          </div>
        )}
      </div>
      {/* body */}
      <div className={cn("min-h-0 flex-1 bg-elevated", bodyClassName)}>
        {children}
      </div>
    </div>
  );
}
