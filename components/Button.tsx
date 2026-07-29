import { cn } from "@/lib/cn";

type Variant =
  | "primary" // black marketing pill
  | "secondary" // white marketing pill
  | "nav" // compact black 6px square
  | "nav-ghost"; // white 6px square w/ hairline

type Size = "lg" | "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap select-none " +
  "transition-[background-color,color,border-color,transform,box-shadow] duration-200 ease-out " +
  "active:translate-y-px disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-elevated border border-ink rounded-[var(--radius-pill)] hover:bg-ink-hover hover:border-ink-hover shadow-[var(--shadow-whisper)]",
  secondary:
    "bg-elevated text-ink rounded-[var(--radius-pill)] border border-hairline hover:border-ink/30 hover:bg-canvas",
  nav: "bg-ink text-elevated border border-ink rounded-[var(--radius-pill)] hover:bg-ink-hover hover:border-ink-hover",
  "nav-ghost":
    "bg-elevated text-ink rounded-[var(--radius-pill)] border border-hairline hover:border-ink/30 hover:bg-canvas",
};

const sizes: Record<Size, string> = {
  lg: "h-12 px-6 text-[15px]",
  md: "h-10 px-5 text-sm",
  sm: "h-9 px-3.5 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsAnchor = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsAnchor | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    ...rest
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("href" in props && props.href) {
    const { href, ...anchorRest } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    );
  }

  return (
    <button
      className={classes}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
}
