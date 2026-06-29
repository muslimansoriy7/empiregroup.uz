const hits = new Map();
const WINDOW_MS = 60_000;
const MAX_HITS = 5;

export function ratelimit(ip) {
  const now = Date.now();
  const record = hits.get(ip);

  if (!record || now - record.start > WINDOW_MS) {
    hits.set(ip, { start: now, count: 1 });
    return { success: true };
  }

  record.count += 1;
  if (record.count > MAX_HITS) return { success: false };
  return { success: true };
}
