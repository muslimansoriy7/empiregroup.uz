"use client";

import * as React from "react";
import { motion } from "framer-motion";

/**
 * FAQ accordion.
 *
 * Springs the panel to its measured height instead of transitioning a guessed
 * max-height, so long and short answers open at the same speed. A ResizeObserver
 * keeps the target height honest when the copy reflows (locale switch, resize).
 * The closed card sits at 0.985 scale, which gives the open one a little
 * presence without moving anything around it.
 *
 * Styled through the .nx tokens rather than utility classes — the page carries
 * its own scoped stylesheet.
 */

export type NxAccordionItem = { question: React.ReactNode; answer: React.ReactNode };

function Row({
  item,
  isOpen,
  onToggle,
  itemId,
  panelId,
}: {
  item: NxAccordionItem;
  isOpen: boolean;
  onToggle: () => void;
  itemId: string;
  panelId: string;
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [contentH, setContentH] = React.useState(0);

  React.useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setContentH(el.scrollHeight));
    ro.observe(el);
    setContentH(el.scrollHeight);
    return () => ro.disconnect();
  }, []);

  return (
    <motion.div
      layout
      className={`nx-acc-row${isOpen ? " open" : ""}`}
      transition={{ type: "spring", stiffness: 280, damping: 28, mass: 0.9 }}
      animate={{ scale: isOpen ? 1 : 0.985 }}
      initial={false}
      style={{ originX: 0.5, originY: 0 }}
    >
      <button
        id={itemId}
        type="button"
        aria-controls={panelId}
        aria-expanded={isOpen}
        onClick={onToggle}
        className="nx-acc-q"
      >
        <span>{item.question}</span>
        <motion.span
          aria-hidden="true"
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.05 : 1 }}
          transition={{ type: "spring", stiffness: 480, damping: 28 }}
          className="nx-acc-ico"
        >
          {/* minus when open, plus when closed */}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 7h12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            {!isOpen && (
              <path d="M7 1v12" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
            )}
          </svg>
        </motion.span>
      </button>

      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={itemId}
        animate={{ height: isOpen ? contentH : 0, opacity: isOpen ? 1 : 0 }}
        initial={false}
        transition={{
          height: { type: "spring", stiffness: 340, damping: 34, mass: 0.9 },
          opacity: { duration: 0.2, ease: "easeOut" },
        }}
        style={{ overflow: "hidden" }}
        // Keeps the collapsed answer out of the reading and tab order.
        inert={!isOpen}
      >
        <motion.div
          ref={contentRef}
          animate={{ y: isOpen ? 0 : -8 }}
          transition={{ type: "spring", stiffness: 360, damping: 30, mass: 0.8 }}
          className="nx-acc-a"
        >
          <p>{item.answer}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function NxAccordion({
  items,
  idBase = "nx-acc",
}: {
  items: NxAccordionItem[];
  /* A caller-supplied, stable base rather than useId. Under the App Router the
     server and client trees are not identical, so useId handed out different
     values on each side and React logged a hydration mismatch on every
     question's id, aria-controls and aria-labelledby. There is one accordion
     on the page, so a fixed base is both unique and stable. */
  idBase?: string;
}) {
  const baseId = idBase;
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  return (
    <div className="nx-acc">
      {items.map((item, i) => (
        <Row
          key={i}
          item={item}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex((prev) => (prev === i ? null : i))}
          itemId={`${baseId}-q-${i}`}
          panelId={`${baseId}-a-${i}`}
        />
      ))}
    </div>
  );
}
