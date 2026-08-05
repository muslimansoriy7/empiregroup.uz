"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Accessible listbox dropdown, replacing the native <select> in the form.
 *
 * Built to the spec that came with it: Enter/Space open and select, Escape
 * closes and returns focus, arrows wrap, Home/End jump, and the trigger carries
 * aria-expanded plus aria-haspopup="listbox" with each row as role="option".
 * Open/close, row slide-in and the chevron all stop under prefers-reduced-motion.
 *
 * A hidden native input carries the value so the surrounding form still submits
 * the way it always did.
 */

export type DropdownItem = { label: string; value: string };

export function NxDropdown({
  items,
  value,
  onChange,
  placeholder,
  name,
  label,
}: {
  items: DropdownItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  name?: string;
  label: string;
}) {
  const reduce = useReducedMotion();
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const listRef = React.useRef<HTMLUListElement>(null);
  const id = React.useId().replace(/:/g, "");

  const selected = items.find((i) => i.value === value);

  const close = React.useCallback((focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && e.target instanceof Node && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    // Move the caret to the selected row, or the first one.
    const start = Math.max(0, items.findIndex((i) => i.value === value));
    setFocused(start);
    const raf = requestAnimationFrame(() =>
      listRef.current?.querySelectorAll<HTMLElement>("[role=option]")[start]?.focus()
    );
    return () => cancelAnimationFrame(raf);
  }, [open, items, value]);

  const focusRow = (next: number) => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>("[role=option]");
    if (!rows?.length) return;
    const wrapped = (next + rows.length) % rows.length;
    setFocused(wrapped);
    rows[wrapped]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) setOpen(true);
        else focusRow(focused + 1);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) setOpen(true);
        else focusRow(focused - 1);
        break;
      case "Home":
        if (open) {
          e.preventDefault();
          focusRow(0);
        }
        break;
      case "End":
        if (open) {
          e.preventDefault();
          focusRow(items.length - 1);
        }
        break;
    }
  };

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, bounce: 0 };

  return (
    <div className="nx-dd" ref={rootRef} onKeyDown={onKeyDown}>
      {name && <input type="hidden" name={name} value={value} />}
      <button
        ref={triggerRef}
        type="button"
        className={`nx-dd-trigger${open ? " open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${selected?.label ?? placeholder}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={selected ? "" : "nx-dd-placeholder"}>
          {selected?.label ?? placeholder}
        </span>
        <motion.span
          className="nx-dd-caret"
          aria-hidden="true"
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 22 }}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
            <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={`nx-dd-${id}`}
            role="listbox"
            aria-label={label}
            className="nx-dd-list"
            initial={reduce ? false : { opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6, scale: 0.98 }}
            transition={spring}
          >
            {items.map((item, i) => {
              const isSelected = item.value === value;
              return (
                <motion.li
                  key={item.value}
                  role="option"
                  tabIndex={-1}
                  aria-selected={isSelected || focused === i}
                  aria-label={item.label}
                  className={`nx-dd-item${isSelected ? " selected" : ""}`}
                  initial={reduce ? false : { opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={reduce ? { duration: 0 } : { delay: i * 0.02, duration: 0.18 }}
                  onClick={() => {
                    onChange(item.value);
                    close();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onChange(item.value);
                      close();
                    }
                  }}
                  onFocus={() => setFocused(i)}
                >
                  <span>{item.label}</span>
                  {isSelected && (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <title>Tanlangan</title>
                      <path d="M3 8.5l3.2 3.2L13 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
