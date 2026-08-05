import * as React from "react";

/**
 * Per-word crossfade — words fade up one after another as the line arrives.
 *
 * Deliberately not a motion component. The version this replaces used
 * framer-motion's `initial`, which is rendered into the HTML: every headline
 * on the page, the H1 included, was served with inline opacity:0 and only
 * became visible once React had hydrated and the observer had fired. On a slow
 * connection that is a blank hero; with JS blocked it is a blank page.
 *
 * Here the hidden state is CSS, applied only under `.nx-ready` — a class the
 * page adds from script — so the words are visible in the served HTML and stay
 * visible if the script never runs. The stagger is a static transition-delay
 * per word, so nothing is computed at runtime either. Same 8px drift, same
 * cubic-bezier(0.16, 1, 0.3, 1), a fraction of the cost.
 *
 * The whole string is on aria-label and the word spans are hidden, so a screen
 * reader hears a sentence rather than a list of words.
 */

type As = "h1" | "h2" | "h3" | "p" | "span";

export function PerWordCrossfade({
  text,
  as = "p",
  className,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  as?: As;
  className?: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between one word and the next. */
  stagger?: number;
}) {
  const words = text.split(" ");

  return React.createElement(
    as,
    { className: className ? `${className} nx-rvw` : "nx-rvw", "aria-label": text },
    /* The space is a text node between the spans, not the last character
       inside one. A span is inline-block here, and an inline-block drops the
       trailing space in its own content — which ran the words together
       wherever two of them shared a line. */
    words.map((word, i) => (
      <React.Fragment key={`${word}-${i}`}>
        <span
          className="nx-w"
          aria-hidden="true"
          style={{ transitionDelay: `${(delay + i * stagger).toFixed(3)}s` }}
        >
          {word}
        </span>
        {i < words.length - 1 ? " " : null}
      </React.Fragment>
    ))
  );
}
