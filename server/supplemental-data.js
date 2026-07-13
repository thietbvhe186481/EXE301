const demoMentors = [
  { id: 'mentor-dev-frontend', name: 'Linh Pham', email: 'linh.frontend@portfolio.vn', password: 'mentor123', expertise: ['Frontend', 'UI Engineering', 'Design System'], strongestField: 'React Frontend Architecture', level: 'Lead Mentor', companies: ['Shopee', 'VNG', 'DesignOps Studio'] },
  { id: 'mentor-dev-mobile', name: 'Minh Do', email: 'minh.mobile@portfolio.vn', password: 'mentor123', expertise: ['Mobile', 'Flutter', 'Firebase'], strongestField: 'Mobile Product Delivery', level: 'Senior Mentor', companies: ['MoMo', 'Be Group', 'HealthTech Lab'] },
  { id: 'mentor-dev-ai', name: 'Nam Ho', email: 'nam.ai@portfolio.vn', password: 'mentor123', expertise: ['AI / Data', 'Python', 'LLM'], strongestField: 'AI Product Prototyping', level: 'Principal Mentor', companies: ['Zalo AI', 'Trusting Social', 'AI Lab'] },
  { id: 'mentor-mkt-content', name: 'Mai Nguyen', email: 'mai.content@portfolio.vn', password: 'mentor123', expertise: ['Content', 'Social Media', 'Brand Marketing'], strongestField: 'Integrated Content Strategy', level: 'Senior Mentor', companies: ['Ogilvy', 'Dentsu', 'EduBrand'] },
  { id: 'mentor-mkt-performance', name: 'Trang Vo', email: 'trang.performance@portfolio.vn', password: 'mentor123', expertise: ['Performance Marketing', 'Growth', 'CRM / Lifecycle'], strongestField: 'Paid Growth and Funnel Analytics', level: 'Lead Mentor', companies: ['Lazada', 'Tiki', 'FinTech Growth Team'] },
  { id: 'mentor-mkt-research', name: 'Duy Lam', email: 'duy.research@portfolio.vn', password: 'mentor123', expertise: ['SEO', 'Market Research', 'Growth'], strongestField: 'Market Research and SEO Strategy', level: 'Senior Mentor', companies: ['YouNet', 'Decision Lab', 'SaaS Growth Studio'] },
  { id: 'mentor-design-ui', name: 'Vy Hoang', email: 'vy.ui@portfolio.vn', password: 'mentor123', expertise: ['UI Design', 'Product Design', 'Brand Design'], strongestField: 'Product Interface Systems', level: 'Lead Mentor', companies: ['Figma Partner Studio', 'Grab', 'FinTech Design'] },
  { id: 'mentor-design-ux', name: 'Phuc Le', email: 'phuc.ux@portfolio.vn', password: 'mentor123', expertise: ['UX Design', 'UX Research', 'Product Design'], strongestField: 'UX Research and Product Discovery', level: 'Principal Mentor', companies: ['NielsenIQ', 'One Mount', 'Product Lab'] },
  { id: 'mentor-design-motion', name: 'Tu Tran', email: 'tu.motion@portfolio.vn', password: 'mentor123', expertise: ['Motion Design', 'Graphic Design', 'Brand Design'], strongestField: 'Motion and Visual Storytelling', level: 'Senior Mentor', companies: ['Dinosaur Vietnam', 'Creative Studio X', 'Media Lab'] }
];

const demoStudents = [
  ['student-dev-frontend', 'An Tran', 'an.frontend@portfolio.vn', 'dev', ['frontend', 'fullstack', 'architecture']],
  ['student-dev-backend', 'Bao Le', 'bao.backend@portfolio.vn', 'dev', ['backend', 'devops', 'architecture']],
  ['student-dev-mobile', 'Chi Nguyen', 'chi.mobile@portfolio.vn', 'dev', ['mobile', 'backend', 'devops']],
  ['student-dev-ai', 'Dat Pham', 'dat.ai@portfolio.vn', 'dev', ['ai', 'backend', 'architecture']],
  ['student-dev-devops', 'Hieu Vu', 'hieu.devops@portfolio.vn', 'dev', ['devops', 'backend', 'architecture']],
  ['student-mkt-content', 'Ha Bui', 'ha.content@portfolio.vn', 'mkt', ['content', 'social', 'brand']],
  ['student-mkt-seo', 'Khanh Tran', 'khanh.seo@portfolio.vn', 'mkt', ['seo', 'content', 'growth']],
  ['student-mkt-ads', 'Long Dang', 'long.ads@portfolio.vn', 'mkt', ['performance', 'growth', 'crm']],
  ['student-mkt-brand', 'My Ho', 'my.brand@portfolio.vn', 'mkt', ['brand', 'research', 'content']],
  ['student-mkt-crm', 'Nhi Phan', 'nhi.crm@portfolio.vn', 'mkt', ['crm', 'growth', 'performance']],
  ['student-design-ui', 'Oanh Do', 'oanh.ui@portfolio.vn', 'design', ['ui', 'product', 'brand']],
  ['student-design-ux', 'Phuong Mai', 'phuong.ux@portfolio.vn', 'design', ['ux', 'research', 'product']],
  ['student-design-product', 'Quan Hoang', 'quan.product@portfolio.vn', 'design', ['product', 'ui', 'ux']],
  ['student-design-motion', 'Son Ta', 'son.motion@portfolio.vn', 'design', ['motion', 'graphic', 'brand']],
  ['student-design-brand', 'Thao Vo', 'thao.brand@portfolio.vn', 'design', ['brand', 'graphic', 'motion']],
  ['student-cross-01', 'Gia Han', 'giahan@portfolio.vn', 'dev', ['frontend', 'fullstack', 'devops']],
  ['student-cross-02', 'Tuan Kiet', 'tuankiet@portfolio.vn', 'mkt', ['growth', 'performance', 'seo']],
  ['student-cross-03', 'Yen Nhi', 'yennhi@portfolio.vn', 'design', ['ux', 'product', 'research']]
];

const challengeTemplates = [
  { suffix: 'audit', label: 'Audit and improvement plan', difficulty: 'Junior', xp: 360, due: '7 days' },
  { suffix: 'case-study', label: 'Portfolio case study', difficulty: 'Mid-level', xp: 520, due: '10 days' },
  { suffix: 'capstone', label: 'End-to-end capstone project', difficulty: 'Senior', xp: 760, due: '16 days' },
  { suffix: 'strategy', label: 'Roadmap and measurement strategy', difficulty: 'Lead', xp: 920, due: '21 days' }
];

const statusCycle = ['draft', 'submitted', 'reviewed', 'rejected', 'submitted', 'reviewed'];
const timeCycle = ['08:20', '09:45', '10:30', '13:10', '14:25', '16:40', '19:05', '21:15'];

function pushUniqueById(target, rows) {
  const known = new Set(target.map((item) => item.id));
  rows.forEach((row) => {
    if (!known.has(row.id)) {
      known.add(row.id);
      target.push(row);
    }
  });
}

function upsertById(target, row) {
  const index = target.findIndex((item) => item.id === row.id);
  if (index >= 0) {
    target[index] = { ...target[index], ...row };
    return;
  }
  target.push(row);
}

function findMajor(majors, key) {
  return majors.find((major) => major.key === key);
}

function columnByKey(majors, majorKey, columnKey) {
  return findMajor(majors, majorKey)?.columns.find((column) => column.key === columnKey);
}

function columnKeyByTitle(majors, majorKey, title) {
  return findMajor(majors, majorKey)?.columns.find((column) => column.title === title)?.key;
}

function roleIdFor(majors, majorKey, columnKey, levelIndex) {
  const column = columnByKey(majors, majorKey, columnKey) ?? findMajor(majors, majorKey)?.columns[0];
  return column?.roles[Math.min(levelIndex, column.roles.length - 1)]?.id;
}

function mentorForTrack(track) {
  return demoMentors.find((mentor) => mentor.expertise.includes(track)) ??
    demoMentors.find((mentor) => mentor.expertise.some((item) => track.includes(item) || item.includes(track))) ??
    demoMentors[0];
}

function challengeById(challenges, id) {
  return challenges.find((challenge) => challenge.id === id);
}

export function augmentSeedData(seed) {
  const { adminAccounts, categories, challenges, majors, mentorAccounts, mentorFeedback, notifications, resources, submissions, userProfiles } = seed;

  upsertById(adminAccounts, {
    id: 'admin-demo',
    name: 'Portfolio Admin',
    email: 'admin@portfolio.vn',
    password: 'admin123',
    role: 'admin',
    title: 'Platform Operations Manager',
    department: 'Career Platform Operations',
    seniority: 'Head Admin',
    permissions: ['manage_challenges', 'manage_users', 'review_submissions', 'edit_content', 'manage_mentors', 'view_reports'],
    responsibilities: [
      'Quản lý danh mục ngành, chuyên ngành và thử thách',
      'Theo dõi tiến độ nộp bài và chất lượng feedback',
      'Phân quyền mentor, kiểm tra dữ liệu demo và báo cáo vận hành'
    ],
    managedModules: ['Career Map', 'Challenge Hub', 'Submissions', 'Mentor Reviews', 'User Portfolio'],
    operatingMetrics: {
      weeklyActiveStudents: 126,
      pendingReviews: 18,
      publishedChallenges: 103,
      activeMentors: 10
    },
    activityLog: [
      'Cập nhật bộ lọc quản lý challenge',
      'Duyệt mentor cho track Backend và Product Design',
      'Kiểm tra 18 submission đang chờ review'
    ],
    status: 'active'
  });

  upsertById(mentorAccounts, {
    id: 'mentor-demo',
    name: 'Anh Tran',
    email: 'mentor@portfolio.vn',
    password: 'mentor123',
    role: 'mentor',
    expertise: ['Backend', 'Full Stack', 'Software Architecture', 'DevOps'],
    strongestField: 'Backend API & System Design',
    level: 'Senior Mentor',
    education: [
      'B.S. Computer Science - University of Engineering and Technology',
      'AWS Solutions Architect Associate',
      'MongoDB Node.js Developer Path'
    ],
    workHistory: [
      { company: 'FPT Software', role: 'Backend Engineer', period: '2018-2020' },
      { company: 'Tiki', role: 'Senior Backend Developer', period: '2020-2023' },
      { company: 'FinTech SaaS Lab', role: 'Solution Architect', period: '2023-2026' }
    ],
    companies: ['FPT Software', 'Tiki', 'FinTech SaaS Lab'],
    domains: ['E-commerce', 'Booking system', 'Payment workflow', 'Career platform', 'API Security'],
    reviewStyle: 'Review theo checklist: đúng yêu cầu, kiến trúc, bảo mật, README, khả năng đưa vào portfolio.',
    achievements: ['Reviewed 180+ student projects', 'Designed 12 production APIs', 'Mentored 35 junior developers'],
    availability: 'Tue/Thu/Sun 19:30-22:00',
    currentCompany: 'FinTech SaaS Lab',
    jobTitle: 'Solution Architect',
    yearsOfExperience: 8,
    strongestTools: ['Node.js', 'MongoDB', 'Docker', 'AWS', 'System Design'],
    reviewCapacity: 12,
    reviewQueue: ['dev-api', 'auto-dev-backend-case-study', 'auto-dev-fullstack-capstone'],
    menteeLevels: ['Junior', 'Mid-level', 'Senior'],
    languages: ['Vietnamese', 'English'],
    rating: 4.9,
    activeStudents: ['demo-student', 'student-dev-backend', 'student-dev-devops']
  });

  pushUniqueById(challenges, majors.flatMap((major) => major.columns.flatMap((column) => (
    challengeTemplates.map((template, index) => {
      const mentor = mentorForTrack(column.title);
      const roleItem = column.roles[Math.min(index + 1, column.roles.length - 1)];
      return {
        id: `auto-${major.key}-${column.key}-${template.suffix}`,
        majorKey: major.key,
        track: column.title,
        title: `${column.title} ${template.label}`,
        difficulty: template.difficulty,
        xp: template.xp + index * 35,
        due: template.due,
        mentor: mentor.name,
        mentorId: mentor.id,
        tags: [column.title, roleItem.level, major.short, template.suffix],
        summary: `Realistic ${column.title} assignment for ${roleItem.title}: define requirements, create evidence, submit links, and prepare a portfolio-ready explanation.`,
        rubric: ['Requirement coverage', 'Evidence quality', 'Decision rationale', 'Portfolio readiness'],
        recommendedForRoleId: roleItem.id
      };
    })
  ))));

  pushUniqueById(adminAccounts, [
    {
      id: 'admin-ops',
      name: 'Operations Admin',
      email: 'ops@portfolio.vn',
      password: 'admin123',
      role: 'admin',
      permissions: ['manage_challenges', 'manage_users', 'review_submissions', 'view_reports']
    }
  ]);

  pushUniqueById(mentorAccounts, demoMentors.map((mentor, index) => ({
    ...mentor,
    role: 'mentor',
    education: [
      `${mentor.level} certification - Portfolio Mentor Program`,
      `Professional track: ${mentor.strongestField}`,
      'Project review, rubric design, student coaching'
    ],
    workHistory: mentor.companies.map((company, companyIndex) => ({
      company,
      role: companyIndex === 0 ? 'Specialist' : companyIndex === 1 ? 'Senior Specialist' : mentor.level,
      period: `${2016 + companyIndex * 3}-${2018 + companyIndex * 3}`
    })),
    domains: mentor.expertise.concat(['Portfolio Review', 'Career Coaching']),
    reviewStyle: `Focus on ${mentor.strongestField}, clear evidence, measurable outcomes, and next-step guidance.`,
    achievements: [
      `Reviewed ${120 + index * 17}+ portfolio submissions`,
      `Mentored ${24 + index * 4}+ learners`,
      `Built ${8 + index} reusable review rubrics`
    ],
    availability: ['Mon/Wed 19:30-21:30', 'Tue/Thu 20:00-22:00', 'Sat 09:00-11:30'][index % 3],
    rating: Number((4.7 + (index % 3) * 0.1).toFixed(1)),
    activeStudents: []
  })));

  pushUniqueById(userProfiles, demoStudents.map(([id, name, email, majorKey, trackKeys], index) => {
    const major = findMajor(majors, majorKey);
    const path = trackKeys.map((trackKey, trackIndex) => roleIdFor(majors, majorKey, trackKey, Math.min(trackIndex + 1, 4))).filter(Boolean);
    const joined = challenges
      .filter((challenge) => challenge.majorKey === majorKey && trackKeys.includes(columnKeyByTitle(majors, majorKey, challenge.track)))
      .slice(0, 7)
      .map((challenge) => challenge.id);

    return {
      id,
      name,
      email,
      password: '123456',
      selectedMajorKey: majorKey,
      careerGoal: path[path.length - 1] ?? `${major?.title ?? 'Career'} Specialist`,
      path,
      joinedChallengeIds: joined,
      stats: {
        completedChallenges: 2 + (index % 7),
        mentorRating: Number((4.2 + (index % 7) * 0.1).toFixed(1)),
        portfolioProjects: 1 + (index % 5),
        verifiedSkills: 8 + index * 2
      },
      portfolio: {
        headline: `${major?.title ?? 'Career'} portfolio - ${trackKeys.join(' / ')}`,
        bio: `${name} is building a role-focused portfolio with roadmap, submissions, mentor feedback, and published case studies.`,
        publishedProjects: joined.slice(0, 3).map((challengeId) => challengeById(challenges, challengeId)?.title ?? challengeId),
        links: [`https://github.com/demo/${id}`, `https://${id}.portfolio.demo`]
      },
      badges: ['Career path saved', 'Challenge participant', index % 2 ? 'Mentor reviewed' : 'Portfolio draft', index % 3 ? 'Skill evidence ready' : 'Needs review']
    };
  }));

  const generatedSubmissions = userProfiles.flatMap((user, userIndex) => (
    (user.joinedChallengeIds ?? []).slice(0, 8).map((challengeId, challengeIndex) => {
      const challenge = challengeById(challenges, challengeId);
      const status = statusCycle[(userIndex + challengeIndex) % statusCycle.length];
      return {
        id: `sub-${user.id}-${challengeId}`,
        userId: user.id,
        challengeId,
        status,
        primaryLink: `https://github.com/demo/${user.id}-${challengeId}`,
        secondaryLink: `https://${user.id}-${challengeId}.demo`,
        notes: `Submission for ${challenge?.title ?? challengeId}. Includes evidence, result notes, and portfolio summary.`,
        updatedAt: timeCycle[(userIndex + challengeIndex) % timeCycle.length]
      };
    })
  ));

  pushUniqueById(submissions, generatedSubmissions);
  pushUniqueById(submissions, [
    {
      id: 'sub-demo-mentor-review-dev-api',
      userId: 'demo-student',
      challengeId: 'dev-api',
      status: 'submitted',
      primaryLink: 'https://github.com/demo/portfolio-api',
      secondaryLink: 'https://portfolio-api.demo/swagger',
      notes: 'Demo submission for mentor account: API has auth, product/order modules, seed data, and Swagger docs.',
      updatedAt: '09:30'
    },
    {
      id: 'sub-student-dev-backend-mentor-review',
      userId: 'student-dev-backend',
      challengeId: 'auto-dev-backend-case-study',
      status: 'submitted',
      primaryLink: 'https://github.com/demo/student-dev-backend-api-review',
      secondaryLink: 'https://student-dev-backend-api-review.demo',
      notes: 'Needs mentor review on database design, validation flow, and portfolio storytelling.',
      updatedAt: '10:45'
    },
    {
      id: 'sub-student-dev-devops-mentor-review',
      userId: 'student-dev-devops',
      challengeId: 'auto-dev-devops-capstone',
      status: 'submitted',
      primaryLink: 'https://github.com/demo/student-devops-pipeline',
      secondaryLink: 'https://student-devops-pipeline.demo',
      notes: 'CI/CD pipeline with Docker, health check, rollback note, and monitoring screenshot.',
      updatedAt: '13:20'
    }
  ]);

  pushUniqueById(mentorFeedback, generatedSubmissions
    .filter((submission, index) => submission.status === 'reviewed' || (submission.status === 'submitted' && index % 4 === 0))
    .map((submission, index) => {
      const challenge = challengeById(challenges, submission.challengeId);
      return {
        id: `fb-${submission.userId}-${submission.challengeId}`,
        userId: submission.userId,
        challengeId: submission.challengeId,
        score: 72 + (index % 24),
        title: `${challenge?.track ?? 'Project'} review result`,
        strengths: ['Clear requirement coverage', 'Evidence is easy to inspect', 'Good portfolio storytelling'],
        improvements: ['Add measurable before-after result', 'Explain trade-offs more directly', 'Polish final presentation for recruiter scan'],
        reviewer: challenge?.mentor ?? mentorAccounts[index % mentorAccounts.length].name,
        createdAt: timeCycle[index % timeCycle.length]
      };
    }));
  pushUniqueById(mentorFeedback, [
    {
      id: 'fb-demo-mentor-dev-dashboard',
      userId: 'demo-student',
      challengeId: 'dev-dashboard',
      score: 86,
      title: 'Dashboard đã đủ minh chứng portfolio',
      strengths: ['Luồng filter rõ', 'Có trạng thái trống', 'UI dễ scan'],
      improvements: ['Thêm số liệu trước-sau', 'Bổ sung test responsive', 'Viết README gọn hơn'],
      reviewer: 'Anh Tran',
      createdAt: '15:10'
    },
    {
      id: 'fb-student-devops-pipeline-history',
      userId: 'student-dev-devops',
      challengeId: 'auto-dev-devops-audit',
      score: 90,
      title: 'Pipeline evidence rõ ràng',
      strengths: ['Có sơ đồ deploy', 'Có rollback plan', 'Log minh chứng đầy đủ'],
      improvements: ['Thêm alert threshold', 'Làm rõ quyền môi trường production'],
      reviewer: 'Anh Tran',
      createdAt: '16:35'
    }
  ]);

  mentorAccounts.forEach((mentor) => {
    const computedStudents = userProfiles
      .filter((student) => student.joinedChallengeIds?.some((challengeId) => challengeById(challenges, challengeId)?.mentor === mentor.name))
      .slice(0, 8)
      .map((student) => student.id);
    mentor.activeStudents = computedStudents.length ? computedStudents : (mentor.activeStudents ?? []);
  });

  pushUniqueById(resources, majors.flatMap((major) => major.columns.flatMap((column) => ([
    { id: `res-${major.key}-${column.key}-starter`, majorKey: major.key, track: column.title, title: `${column.title} starter toolkit`, type: 'Toolkit', url: `https://portfolio.demo/resources/${major.key}/${column.key}/starter`, difficulty: 'Junior' },
    { id: `res-${major.key}-${column.key}-case-study`, majorKey: major.key, track: column.title, title: `${column.title} case study template`, type: 'Template', url: `https://portfolio.demo/resources/${major.key}/${column.key}/case-study`, difficulty: 'Mid-level' },
    { id: `res-${major.key}-${column.key}-rubric`, majorKey: major.key, track: column.title, title: `${column.title} mentor review rubric`, type: 'Rubric', url: `https://portfolio.demo/resources/${major.key}/${column.key}/rubric`, difficulty: 'Senior' }
  ]))));

  pushUniqueById(categories, majors.flatMap((major) => major.columns.map((column) => ({
    id: `cat-${major.key}-${column.key}`,
    name: `${major.short} - ${column.title}`,
    majorKey: major.key,
    description: `${column.title} roadmap, challenges, resources, submissions, and mentor review queue.`
  }))));

  pushUniqueById(notifications, [
    ...userProfiles.flatMap((user, index) => [
      { id: `noti-${user.id}-path`, userId: user.id, role: 'student', title: `Career path updated for ${user.name}`, unread: index % 2 === 0, createdAt: timeCycle[index % timeCycle.length] },
      { id: `noti-${user.id}-submission`, userId: user.id, role: 'student', title: `${user.joinedChallengeIds?.length ?? 0} joined challenges are ready for portfolio evidence`, unread: index % 3 === 0, createdAt: timeCycle[(index + 2) % timeCycle.length] }
    ]),
    ...mentorAccounts.map((mentor, index) => ({
      id: `noti-${mentor.id}-queue`,
      userId: mentor.id,
      role: 'mentor',
      title: `${mentor.activeStudents?.length ?? 0} active students assigned to ${mentor.name}`,
      unread: index % 2 === 1,
      createdAt: timeCycle[(index + 1) % timeCycle.length]
    })),
    { id: 'noti-admin-dataset', userId: 'admin-demo', role: 'admin', title: `${challenges.length} challenges, ${userProfiles.length} students, ${submissions.length} submissions seeded for demo`, unread: true, createdAt: '08:00' }
  ]);
}
