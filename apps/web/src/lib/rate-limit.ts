type Entry = { count: number; resetAt: number };
const attempts = new Map<string, Entry>();

export interface RateLimiter { check(key: string): Promise<{ allowed: boolean; retryAfter: number }> }

export class MemoryRateLimiter implements RateLimiter {
  constructor(private readonly limit = 5, private readonly windowMs = 10 * 60 * 1000) {}
  async check(key: string) {
    const now = Date.now();
    if (attempts.size > 5000) for (const [storedKey, entry] of attempts) if (entry.resetAt < now) attempts.delete(storedKey);
    const entry = attempts.get(key);
    if (!entry || entry.resetAt < now) { attempts.set(key, { count: 1, resetAt: now + this.windowMs }); return { allowed: true, retryAfter: 0 }; }
    entry.count += 1;
    return { allowed: entry.count <= this.limit, retryAfter: Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) };
  }
}

export const leadRateLimiter: RateLimiter = new MemoryRateLimiter();

