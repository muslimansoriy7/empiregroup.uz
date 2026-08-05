"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Animated input — a floating label that rises out of the field on focus or
 * once there is a value, plus a focus rule that grows from the centre.
 *
 * Rebuilt from the supplied spec rather than copied, because the original
 * leaned on primitives this repo does not have. What the spec asked for and
 * this keeps:
 *
 *  · the label is a real <label htmlFor>, so clicking it focuses the field and
 *    a screen reader reads the pair; aria-label carries the same words for the
 *    case where the visual label is mid-flight.
 *  · the decorative icon is aria-hidden.
 *  · under prefers-reduced-motion the label snaps to position with no
 *    transition — the layout is identical, only the choreography stops.
 *
 * One thing the spec did not cover: an error message. It is wired to the field
 * with aria-describedby and announced politely, since a form that animates but
 * cannot tell you what went wrong is worse than a plain one.
 */

type Common = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  error?: string;
  autoComplete?: string;
  id?: string;
  name?: string;
};

type Props =
  | (Common & { as?: "input"; type?: string; rows?: never })
  | (Common & { as: "textarea"; type?: never; rows?: number });

export function NxAnimatedInput(props: Props) {
  const { label, value, onChange, icon, error, autoComplete, name } = props;
  const reduce = useReducedMotion();
  const reactId = React.useId().replace(/:/g, "");
  const id = props.id ?? `nx-in-${reactId}`;
  const errId = `${id}-err`;
  const [focused, setFocused] = React.useState(false);

  const isTextarea = props.as === "textarea";
  // A textarea's label can never sit on the baseline of a four-row box, so it
  // starts floated and stays there.
  const up = focused || value.length > 0 || isTextarea;

  const spring = reduce
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 520, damping: 38, mass: 0.7 };

  const shared = {
    id,
    name,
    value,
    autoComplete,
    "aria-label": label,
    "aria-invalid": Boolean(error) || undefined,
    "aria-describedby": error ? errId : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange(e.target.value),
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
  };

  return (
    <div
      className={[
        "nx-ai",
        isTextarea ? "nx-ai-area" : "",
        icon ? "nx-ai-hasicon" : "",
        focused ? "focused" : "",
        error ? "err" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="nx-ai-box">
        {icon && (
          <span className="nx-ai-icon" aria-hidden="true">
            {icon}
          </span>
        )}

        <motion.label
          htmlFor={id}
          className="nx-ai-label"
          initial={false}
          animate={{
            y: up ? "-0.92rem" : "0rem",
            scale: up ? 0.78 : 1,
          }}
          transition={spring}
        >
          {label}
        </motion.label>

        {isTextarea ? (
          <textarea className="nx-ai-field" rows={props.rows ?? 4} {...shared} />
        ) : (
          <input className="nx-ai-field" type={props.type ?? "text"} {...shared} />
        )}

        {/* Focus rule: grows from the centre so the eye is told which field is
            live without a colour change alone carrying the message. */}
        <motion.span
          className="nx-ai-rule"
          aria-hidden="true"
          initial={false}
          animate={{ scaleX: focused ? 1 : 0, opacity: focused ? 1 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>

      {error && (
        <span className="nx-field-err" id={errId} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
