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
 * Bottom navigation for phones.
 *
 * The dock's magnification is kept — a finger dragging across the bar swells
 * the icon under it, driven by pointermove so touch behaves the way a cursor
 * does — but everything that was decoration has gone: no chip behind the
 * active item, no filled block on the last one, no tooltip repeating a label
 * that is already on screen. What is left states where you are with colour and
 * one short bar that slides between items.
 */

export type DockItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

const DEFAULT_SPRING: SpringOptions = { stiffness: 380, damping: 26, mass: 0.4 };

function DockButton({
  item,
  active,
  pointerX,
  magnification,
  distance,
  iconSize,
  springOptions,
}: {
  item: DockItem;
  active: boolean;
  pointerX: ReturnType<typeof useMotionValue<number>>;
  magnification: number;
  distance: number;
  iconSize: number;
  springOptions: SpringOptions;
}) {
  const ref = React.useRef<HTMLAnchorElement>(null);

  const distanceFromPointer = useTransform(pointerX, (val) => {
    const el = ref.current;
    if (!el) return distance * 100;
    const rect = el.getBoundingClientRect();
    return Math.abs(val - (rect.left + rect.width / 2));
  });

  const gaussian = (d: number) =>
    (magnification - 1) * Math.exp(-(d * d) / (2 * distance * distance)) + 1;

  const sizeRaw = useTransform(distanceFromPointer, (d) => iconSize * gaussian(d));
  const size = useSpring(sizeRaw, springOptions);

  return (
    <a
      ref={ref}
      href={item.href}
      aria-label={item.label}
      aria-current={active ? "true" : undefined}
      className={`nx-dock-item${active ? " on" : ""}`}
    >
      {/* Fixed-height row with the icon on its baseline, so swelling grows the
          icon upward instead of pushing the label down. */}
      <span className="nx-dock-iconrow" style={{ height: iconSize }}>
        <motion.span className="nx-dock-icon" style={{ width: size, height: size }}>
          {item.icon}
        </motion.span>
      </span>
      <span className="nx-dock-label">{item.label}</span>
      {active && (
        <motion.span
          layoutId="nx-dock-mark"
          className="nx-dock-mark"
          aria-hidden="true"
          transition={{ type: "spring", stiffness: 460, damping: 38, mass: 0.7 }}
        />
      )}
    </a>
  );
}

export function NxDock({
  items,
  activeId,
  hidden = false,
  magnification = 1.34,
  distance = 78,
  iconSize = 22,
  springOptions = DEFAULT_SPRING,
}: {
  items: DockItem[];
  activeId: string;
  /** Suppressed while the drawer or a modal owns the screen. */
  hidden?: boolean;
  magnification?: number;
  distance?: number;
  iconSize?: number;
  springOptions?: SpringOptions;
}) {
  const reduce = useReducedMotion();
  const pointerX = useMotionValue(Infinity);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = show && !hidden;

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="nx-dock"
          aria-label="Bottom navigation"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
          transition={
            reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 36, mass: 0.8 }
          }
          onPointerMove={(e) => pointerX.set(e.clientX)}
          onPointerLeave={() => pointerX.set(Infinity)}
        >
          {items.map((item) => (
            <DockButton
              key={item.id}
              item={item}
              active={item.id === activeId}
              pointerX={pointerX}
              magnification={reduce ? 1 : magnification}
              distance={distance}
              iconSize={iconSize}
              springOptions={springOptions}
            />
          ))}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
