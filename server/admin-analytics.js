const DAY = 86400000;
const HCM_OFFSET = 7 * 3600000;

export const vietnamDay = value => {
  const time = new Date(value).getTime();
  return Number.isFinite(time) ? new Date(time + HCM_OFFSET).toISOString().slice(0, 10) : null;
};

export function buildAdminAnalytics({ students = [], mentors = [], submissions = [], reviews = [], orders = [], days = 30, now = new Date() }) {
  const today = vietnamDay(now);
  const end = Date.parse(`${today}T00:00:00.000Z`);
  const dates = Array.from({ length: days }, (_, index) => new Date(end - (days - 1 - index) * DAY).toISOString().slice(0, 10));
  const first = dates[0];
  const rows = dates.map(date => ({ date, students: 0, mentors: 0, submissions: 0, positiveRatings: 0 }));
  const byDay = new Map(rows.map(row => [row.date, row]));
  const count = (date, field) => { const row = byDay.get(vietnamDay(date)); if (row) row[field]++; };
  const validStudents = students.filter(item => (!item.role || item.role === 'student') && item.demoData !== true);
  const validMentors = mentors.filter(item => item.demoData !== true);
  const sent = submissions.filter(item => item.demoData !== true && (item.queuedAt || !['draft', 'cancelled'].includes(item.status)));
  const rated = sent.filter(item => Number.isInteger(Number(item.rating?.stars)) && Number(item.rating.stars) >= 1 && Number(item.rating.stars) <= 5);
  const testimonials = reviews.filter(item => item.status === 'approved' && item.studentId && Number.isInteger(Number(item.rating)) && Number(item.rating) >= 1 && Number(item.rating) <= 5);
  validStudents.forEach(item => count(item.createdAt, 'students'));
  validMentors.forEach(item => count(item.createdAt, 'mentors'));
  sent.forEach(item => count(item.queuedAt || item.createdAt, 'submissions'));
  rated.filter(item => Number(item.rating.stars) >= 4).forEach(item => count(item.rating.at, 'positiveRatings'));
  let cumulativeStudents = validStudents.filter(item => { const date = vietnamDay(item.createdAt); return date && date < first; }).length;
  const series = rows.map(row => ({ ...row, cumulativeStudents: cumulativeStudents += row.students }));
  return {
    days, from: first, to: today, series, revenue: buildRevenue(orders, submissions, dates),
    totals: { students: validStudents.length, mentors: validMentors.length, submissions: sent.length, completed: sent.filter(item => item.status === 'completed').length,
      ratedMentorReviews: rated.length, positiveMentorReviews: rated.filter(item => Number(item.rating.stars) >= 4).length,
      approvedTestimonials: testimonials.length, positiveTestimonials: testimonials.filter(item => Number(item.rating) >= 4).length },
    period: { students: rows.reduce((total, row) => total + row.students, 0), submissions: rows.reduce((total, row) => total + row.submissions, 0), positiveRatings: rows.reduce((total, row) => total + row.positiveRatings, 0) }
  };
}

export function buildRevenue(orders, submissions, dates) {
  const amount = value => Number.isSafeInteger(Number(value)) && Number(value) > 0 ? Number(value) : 0;
  const paid = orders.filter(o => o.status === 'completed' && o.demoData !== true && amount(o.price));
  const inPeriod = date => dates.includes(vietnamDay(date));
  const period = paid.filter(o => inPeriod(o.activatedAt));
  const payouts = submissions.filter(s => s.demoData !== true && s.reward?.paid === true);
  const payoutAmount = s => amount(s.reward.payoutLog?.amount ?? (Number(s.reward.base || 0) + Number(s.reward.bonus || 0)));
  return {
    total: paid.reduce((sum, o) => sum + amount(o.price), 0),
    period: period.reduce((sum, o) => sum + amount(o.price), 0),
    orders: period.length,
    mentorPaid: payouts.filter(s => inPeriod(s.reward.paidAt || s.reward.payoutLog?.confirmedAt)).reduce((sum, s) => sum + payoutAmount(s), 0),
    undatedOrders: paid.filter(o => !o.activatedAt || !vietnamDay(o.activatedAt)).length,
    series: dates.map(date => ({ date, revenue: period.filter(o => vietnamDay(o.activatedAt) === date).reduce((sum, o) => sum + amount(o.price), 0) })),
    plans: [...new Set(period.map(o => o.planId))].map(id => ({ id, name: period.find(o => o.planId === id)?.planName || id || 'Gói khác', orders: period.filter(o => o.planId === id).length, revenue: period.filter(o => o.planId === id).reduce((sum, o) => sum + amount(o.price), 0) }))
  };
}
