const rateMap = new Map<string, number[]>();

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 10;

export function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const timestamps = rateMap.get(ip) ?? [];

  // Remove entries outside the window
  const valid = timestamps.filter((t) => now - t < WINDOW_MS);

  if (valid.length >= MAX_REQUESTS) {
    rateMap.set(ip, valid);
    return { allowed: false, remaining: 0 };
  }

  valid.push(now);
  rateMap.set(ip, valid);
  return { allowed: true, remaining: MAX_REQUESTS - valid.length };
}
