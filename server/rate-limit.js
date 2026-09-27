export function createIpRateLimiter({ maxRequests, windowMs, now = () => Date.now(), maxBuckets = 20000 }) {
  const buckets = new Map();
  return (req, res, next) => {
    const key = String(req.ip || req.socket?.remoteAddress || 'unknown').slice(0, 120);
    const time = now();
    let bucket = buckets.get(key);
    if (!bucket || time >= bucket.resetAt) bucket = { count: 0, resetAt: time + windowMs };
    if (bucket.count >= maxRequests) {
      res.set('Retry-After', String(Math.max(1, Math.ceil((bucket.resetAt - time) / 1000))));
      return res.status(429).json({ message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.' });
    }
    bucket.count += 1;
    buckets.set(key, bucket);
    if (buckets.size > maxBuckets) {
      for (const [address, item] of buckets) {
        if (time >= item.resetAt) buckets.delete(address);
        if (buckets.size <= maxBuckets) break;
      }
      while (buckets.size > maxBuckets) buckets.delete(buckets.keys().next().value);
    }
    next();
  };
}
