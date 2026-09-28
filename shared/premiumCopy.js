const premiumFeatures = [
  'Truy cập thử thách Premium trong thời hạn gói',
  'Chọn mentor phù hợp để góp ý bài thực hành',
  'Xem nhận xét theo từng tiêu chí và theo dõi bài đã nộp'
];

const premiumCopyById = {
  'premium-month': { highlight: 'Học theo tháng', description: 'Phù hợp khi bạn muốn thực hành và nhận góp ý trong một tháng.', badge: '' },
  'premium-quarter': { highlight: 'Học theo học kỳ', description: 'Có thêm thời gian làm bài, nhận góp ý và hoàn thiện sản phẩm trong ba tháng.', badge: '' },
  'premium-year': { highlight: 'Học dài hạn', description: 'Duy trì quyền truy cập thử thách và mentor trong mười hai tháng.', badge: '' }
};

export const describePremiumPlan = plan => premiumCopyById[plan.id]
  ? { ...plan, ...premiumCopyById[plan.id], features: premiumFeatures, limits: [] }
  : plan;
