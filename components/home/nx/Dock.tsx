"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type SpringOptions,
} from "framer-motion";

/**
 * The dock, as supplied — a gaussian magnification around the pointer, icons
 * that grow upward from a fixed baseline, and a tooltip that morphs between
 * items with a shared layoutId.
 *
 * Rebuilt against this repo (no unlumen primitives, no cn, no tailwind) and
 * adapted on the two points where a phone is not a desktop:
 *
 *  · the magnifier is driven by pointermove, not mousemove, so a finger
 *    dragging across the bar magnifies exactly the way a cursor does. The
 *    focus ring drives it too, so a keyboard reaches the same state.
 *  · labels are always on. The original hides them behind hover, which on a
 *    touchscreen means the only way to learn what an icon does is to press it
 *    and find out. The tooltip stays for pointer devices, where hover is real.
 */

export type DockItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  /** Renders as the filled action at the end of the row. */
  accent?: boolean;
};

const DEFAULT_SPRING: SpringOptions = { stiffness: 400, damping: 25, mass: 0.4 };

function DockButton({
  item,
  active,
  pointerX,
  magnification,
  distance,
  iconSize,
  borderRadius,
  springOptions,
  onHover,
  index,
}: {
  item: DockItem;
  active: boolean;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  magnification: number;
  distance: number;
  iconSize: number;
  borderRadius: number;
  springOptions: SpringOptions;
  onHover: (index: number | null, el: HTMLElement | null) => void;
  index: number;
}) {
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  const distanceFromPointer = useTransform(pointerX, (val) => {
    const el = wrapperRef.current;
    if (!el) return distance * 100;
    const rect = el.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const gaussian = (d: number) =>
    (magnification - 1) * Math.exp(-(d * d) / (2 * distance * distance)) + 1;

  const sizeRaw = useTransform(distanceFromPointer, (d) => iconSize * gaussian(d));
  const size = useSpring(sizeRaw, springOptions);

  return (
    <motion.div
      ref={wrapperRef}
      className="nx-dock-slot"
      // Animated width in flow: growing an icon pushes its neighbours aside
      // instead of overlapping them.
      style={{ width: size }}
    >
      {/* Fixed-height row with the icon anchored to its bottom, so the icon
          grows upward out of the bar rather than shunting the label down. */}
      <div className="nx-dock-iconrow" style={{ height: iconSize }}>
        <motion.div className="nx-dock-grow" style={{ width: size, height: size }}>
          <a
            href={item.href}
            aria-label={item.label}
            aria-current={active ? "true" : undefined}
            className={`nx-dock-btn${active ? " on" : ""}${item.accent ? " accent" : ""}`}
            style={{ borderRadius }}
            onPointerEnter={(e) => e.pointerType !== "touch" && onHover(index, e.currentTarget)}
            onPointerLeave={(e) => e.pointerType !== "touch" && onHover(null, null)}
            onFocus={(e) => onHover(index, e.currentTarget)}
            onBlur={() => onHover(null, null)}
          >
            {item.icon}
          </a>
        </motion.div>
      </div>

      <span className="nx-dock-label">{item.label}</span>
    </motion.div>
  );
}

export function NxDock({
  items,
  activeId,
  hidden = false,
  magnification = 1.75,
  distance = 88,
  iconSize = 42,
  gap = 2,
  borderRadius = 14,
  springOptions = DEFAULT_SPRING,
}: {
  items: DockItem[];
  activeId: string;
  /** Suppressed while the drawer or a modal owns the screen. */
  hidden?: boolean;
  magnification?: number;
  distance?: number;
  iconSize?: number;
  gap?: number;
  borderRadius?: number;
  springOptions?: SpringOptions;
}) {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(Infinity);
  const dockRef = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);
  const [tip, setTip] = React.useState<{ index: number; x: number; bottom: number } | null>(null);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* The tooltip is measured once per hovered item rather than on a standing
     rAF loop. The original polled every frame forever; the icon only moves
     while the magnifier spring settles, and a spring that has settled does
     not need to be re-measured sixty times a second. */
  const placeTip = React.useCallback((index: number | null, el: HTMLElement | null) => {
    if (index === null || !el || !dockRef.current) {
      setTip(null);
      return;
    }
    let frames = 0;
    const measure = () => {
      const dock = dockRef.current;
      if (!dock || !el.isConnected) return;
      const i = el.getBoundingClientRect();
      const d = dock.getBoundingClientRect();
      setTip({ index, x: i.left - d.left + i.width / 2, bottom: d.bottom - i.top });
      if (++frames < 24) requestAnimationFrame(measure);
    };
    measure();
  }, []);

  const visible = show && !hidden;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          ref={dockRef}
          className="nx-dock"
          aria-label="Bottom navigation"
          style={{ gap, borderRadius }}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 26, scale: 0.96 }}
          transition={
            reduce ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34, mass: 0.8 }
          }
          onPointerMove={(e) => pointerX.set(e.clientX)}
          onPointerLeave={() => pointerX.set(Infinity)}
        >
          {items.map((item, i) => (
            <DockButton
              key={item.id}
              index={i}
              item={item}
              active={item.id === activeId}
              pointerX={pointerX}
              magnification={reduce ? 1 : magnification}
              distance={distance}
              iconSize={iconSize}
              borderRadius={borderRadius}
              springOptions={springOptions}
              onHover={placeTip}
            />
          ))}

          <AnimatePresence>
            {tip && (
              <motion.span
                key="nx-dock-tip"
                layoutId="nx-dock-tip"
                className="nx-dock-tip"
                aria-hidden="true"
                style={{ left: tip.x, bottom: tip.bottom + 10, x: "-50%" }}
                initial={{ opacity: 0, y: 6, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.94 }}
                transition={{ duration: 0.13, ease: "easeOut" }}
              >
                {items[tip.index].label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
