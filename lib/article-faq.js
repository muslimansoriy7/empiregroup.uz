/**
 * Pulls a FAQPage out of an article's Markdown.
 *
 * Answer engines and Google's rich results both read FAQ markup, and our posts
 * are already written as questions — "GEO nima?", "Narx qanday hisoblanadi?".
 * Rather than ask an editor to maintain a second copy of that Q&A in the CMS,
 * this reads the headings that end in a question mark and takes the prose that
 * follows as the answer.
 *
 * Anything ambiguous is skipped: only real `##`/`###` headings count, only the
 * text before the next heading is used, and a page with fewer than two pairs
 * emits nothing rather than a thin, spammy-looking block.
 */

const MAX_ANSWER = 600;

/** Strips inline Markdown so the schema carries plain sentences. */
function plain(md) {
  return md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function faqFromMarkdown(markdown) {
  if (!markdown) return [];

  const lines = markdown.split('\n');
  const pairs = [];
  let question = null;
  let buffer = [];

  const flush = () => {
    if (!question) return;
    const answer = plain(buffer.join(' '));
    if (answer.length >= 40) {
      pairs.push({
        question,
        answer: answer.length > MAX_ANSWER ? `${answer.slice(0, MAX_ANSWER).trimEnd()}…` : answer,
      });
    }
    question = null;
    buffer = [];
  };

  for (const line of lines) {
    const heading = line.match(/^(#{2,3})\s+(.*\S)\s*$/);
    if (heading) {
      flush();
      const text = plain(heading[2]);
      // A heading is only a question if it asks one.
      if (text.endsWith('?')) question = text;
      continue;
    }
    if (question) {
      // Lists and tables read badly as an answer sentence — stop at the first.
      if (/^\s*([-*+]\s|\d+\.\s|\|)/.test(line)) {
        flush();
        continue;
      }
      if (line.trim()) buffer.push(line.trim());
    }
  }
  flush();

  return pairs.length >= 2 ? pairs : [];
}

export function faqSchemaFromMarkdown(markdown) {
  const pairs = faqFromMarkdown(markdown);
  if (!pairs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map((p) => ({
      '@type': 'Question',
      name: p.question,
      acceptedAnswer: { '@type': 'Answer', text: p.answer },
    })),
  };
}
