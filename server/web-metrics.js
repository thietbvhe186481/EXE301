import mongoose from 'mongoose';
import { Router } from 'express';
import { z } from 'zod';
import { createIpRateLimiter } from './rate-limit.js';
const schema = new mongoose.Schema({ id: { type: String, unique: true }, createdAt: { type: Date, default: Date.now, expires: 8640000 }, loadMs: Number, activeSeconds: Number });
const Visit = mongoose.models.WebVisit || mongoose.model('WebVisit', schema);
export function createWebMetricsRouter() {
  const router = Router();
  router.post('/', createIpRateLimiter({ maxRequests: 12, windowMs: 60000 }), async (req, res, next) => {
    try {
      const data = z.object({ id: z.string().uuid(), loadMs: z.number().min(0).max(120000).nullable(), activeSeconds: z.number().int().min(0).max(86400) }).strict().parse(req.body);
      await Visit.updateOne({ id: data.id }, { $setOnInsert: { id: data.id, createdAt: new Date(), ...(data.loadMs !== null ? { loadMs: data.loadMs } : {}) }, $max: { activeSeconds: data.activeSeconds } }, { upsert: true });
      res.status(204).end();
    } catch (error) { next(error); }
  });
  router.get('/', async (req, res, next) => {
    try {
      if (req.session?.user?.role !== 'admin') return res.status(403).json({ message: 'Chỉ Admin được xem thống kê.' });
      const days = z.coerce.number().refine(n => [7, 30, 90].includes(n)).parse(req.query.days || 30);
      const rows = await Visit.find({ createdAt: { $gte: new Date(Date.now() - days * 86400000) } }).limit(50000).lean();
      const measured = rows.filter(r => Number.isFinite(r.loadMs));
      res.json({ loads: rows.length, loadSamples: measured.length, averageLoadMs: measured.length ? Math.round(measured.reduce((sum, r) => sum + r.loadMs, 0) / measured.length) : null, averageActiveSeconds: rows.length ? Math.round(rows.reduce((sum, r) => sum + (r.activeSeconds || 0), 0) / rows.length) : null, since: rows.length ? rows.reduce((first, r) => r.createdAt < first ? r.createdAt : first, rows[0].createdAt) : null, capped: rows.length === 50000 });
    } catch (error) { next(error); }
  });
  return router;
}
