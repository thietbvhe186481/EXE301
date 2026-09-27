import { Router } from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { createIpRateLimiter } from './rate-limit.js';

export const inquirySchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254).transform(value => value.toLowerCase()),
  phone: z.string().trim().max(30).default(''),
  message: z.string().trim().min(15).max(2000)
}).strict();

export function createInquiriesRouter({ ContactInquiry }) {
  const router = Router();
  const rateLimit = createIpRateLimiter({ maxRequests: 5, windowMs: 60 * 60 * 1000 });
  router.post('/', rateLimit, async (req, res, next) => {
    const parsed = inquirySchema.safeParse(req.body);
    if (!parsed.success) return res.status(422).json({ message: parsed.error.issues[0].message });
    try {
      const inquiry = await ContactInquiry.create({ inquiryId: `INQ-${randomUUID()}`, ...parsed.data, submittedAt: new Date() });
      res.status(201).json({ success: true, inquiry });
    } catch (error) {
      next(error);
    }
  });
  return router;
}
