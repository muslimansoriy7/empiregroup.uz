import { cn } from "@/lib/cn";

/**
 * MeshGradient — Vercel's signature multi-stop bloom.
 * The ONLY decorative color on the page. Hero use only.
 * Soft radial blooms (develop / preview / ship stops) on the near-white canvas.
 * Blobs are positioned with offsets only (no translate) so the drift keyframe
 * — which sets `transform` — never fights an element's own centering.
 */
export function MeshGradient({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
    >
      {/* develop — blue → cyan, top center (70vw wide → 15vw inset centers it) */}
      <div
        className="absolute left-[15vw] top-[-22%] h-[62vh] w-[72vw] rounded-full opacity-70 blur-[86px] saturate-[1.15] animate-[mesh-drift_22s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-grad-develop-start), var(--color-grad-develop-end) 45%, transparent 72%)",
        }}
      />
      {/* preview — violet → pink, upper right */}
      <div
        className="absolute right-[2%] top-[-10%] h-[58vh] w-[50vw] rounded-full opacity-60 blur-[96px] saturate-[1.15] animate-[mesh-drift_27s_ease-in-out_infinite_reverse]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-grad-preview-start), var(--color-grad-preview-end) 45%, transparent 72%)",
        }}
      />
      {/* ship — red → amber, left */}
      <div
        className="absolute left-[-6%] top-[6%] h-[50vh] w-[42vw] rounded-full opacity-40 blur-[110px] animate-[mesh-drift_31s_ease-in-out_infinite]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-grad-ship-start), var(--color-grad-ship-end) 50%, transparent 75%)",
        }}
      />
      {/* cyan accent low-center for depth */}
      <div
        className="absolute left-[38%] top-[28%] h-[40vh] w-[40vw] rounded-full opacity-30 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-grad-develop-end), transparent 70%)",
        }}
      />
      {/* fade the bloom into the canvas so the hero text stays crisp */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_56%_at_50%_36%,transparent_0%,color-mix(in_srgb,var(--color-canvas)_70%,transparent)_68%,var(--color-canvas)_100%)]" />
    </div>
  );
}
