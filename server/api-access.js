const publicReads = new Set([
  '/health', '/bootstrap', '/majors', '/challenges', '/resources', '/reviews',
  '/founders', '/premium-plans', '/market-data', '/kpi', '/categories'
]);

export function createApiAccessMiddleware(allowedOrigins = []) {
  const allowed = new Set(allowedOrigins);
  return (req, res, next) => {
    const origin = req.get('origin');
    const safeMethod = ['GET', 'HEAD', 'OPTIONS'].includes(req.method);
    if (!safeMethod && origin && !allowed.has(origin)) {
      return res.status(403).json({ message: 'Nguồn gửi yêu cầu không được phép.' });
    }

    const path = req.path;
    if (path.startsWith('/auth/')) return next();
    if (path === '/assistant/topics' && req.method === 'GET') return next();
    if (path === '/assistant/ask' && req.method === 'POST') return next();
    if (req.method === 'GET' && (publicReads.has(path) || path === '/workflow/catalog' || /^\/challenges\/[^/]+$/.test(path))) return next();
    if (path.startsWith('/workflow/')) return next();
    if (req.method === 'POST' && path === '/inquiries') return next();
    if (!req.session?.user) return res.status(401).json({ message: 'Vui lòng đăng nhập.' });
    if (req.method === 'POST' && path === '/reviews' && req.session.user.role === 'student') return next();
    if (path === '/subscriptions/upgrade' || path.startsWith('/subscriptions/orders') || /^\/mentors\/[^/]+\/(rate|payout)$/.test(path)) {
      return res.status(410).json({ message: 'Hãy sử dụng luồng review và thanh toán mới.' });
    }
    if (req.session.user.role === 'admin') return next();

    const ownUser = /^\/users\/([^/]+)(?:\/(path|portfolio|joined-challenges))?$/.exec(path);
    if (ownUser && ownUser[1] === req.session.user.id && req.session.user.role === 'student') {
      if (req.method === 'PUT' && !ownUser[2]) {
        const allowedFields = ['name', 'school', 'academicMajor', 'academicYear', 'phone', 'bio', 'portfolio'];
        req.body = Object.fromEntries(Object.entries(req.body || {}).filter(([key]) => allowedFields.includes(key)));
      }
      if (req.method === 'GET' || req.method === 'PUT' || (req.method === 'POST' && ownUser[2] === 'joined-challenges')) return next();
    }
    return res.status(403).json({ message: 'Chức năng này dành cho quản trị viên hoặc cần sử dụng luồng review mới.' });
  };
}
