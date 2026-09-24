import React, { useState } from 'react';
import {
  BarChart2,
  BookOpen,
  Compass,
  Crown,
  FileUp,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Moon,
  MoveDown,
  Rocket,
  ShieldCheck,
  Sun,
  UserRound
} from 'lucide-react';

export function Header({ page, go, currentUser, theme, setTheme, logout, loginAs, onOpenQrPayment }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const currentRole = currentUser?.type ?? currentUser?.user?.role;
  const userPlan = currentUser?.user?.subscription?.planName || 'Free';
  const isVipOrPro = userPlan.toLowerCase().includes('pro') || userPlan.toLowerCase().includes('vip') || userPlan.toLowerCase().includes('premium');

  const studentNav = [
    { id: 'home', label: 'Trang chủ', icon: Compass, target: 'home' },
    { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard, target: 'roadmap' },
    { id: 'trends', label: 'Xu hướng', icon: BarChart2, target: 'trends' },
    { id: 'hub', label: 'Thử thách', icon: Rocket, target: 'hub' },
    { id: 'submit', label: 'Nộp bài', icon: FileUp, target: 'submit' },
    { id: 'feedback', label: 'Góp ý Mentor', icon: MessageSquareText, target: 'feedback' },
    { id: 'portfolio', label: 'Hồ sơ Portfolio', icon: UserRound, target: 'portfolio' },
    { id: 'learning', label: 'Học liệu FPT', icon: GraduationCap, target: 'learning' },
    { id: 'pricing', label: 'Gói Premium', icon: Crown, target: 'pricing' }
  ];

  const publicNav = [
    { id: 'home', label: 'Trang chủ', icon: Compass, target: 'home' },
    { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard, target: 'roadmap' },
    { id: 'trends', label: 'Xu hướng thị trường', icon: BarChart2, target: 'trends' },
    { id: 'hub', label: 'Thử thách dự án', icon: Rocket, target: 'hub' },
    { id: 'portfolio', label: 'Hồ sơ Portfolio', icon: UserRound, target: 'portfolio' },
    { id: 'learning', label: 'Học liệu FPT', icon: GraduationCap, target: 'learning' },
    { id: 'pricing', label: 'Gói Premium', icon: Crown, target: 'pricing' },
    { id: 'about', label: 'Về chúng tôi', icon: BookOpen, target: 'about' }
  ];

  const mentorNav = [
    { id: 'mentor', label: 'Mentor Workspace', icon: GraduationCap, target: 'mentor' },
    { id: 'portfolio', label: 'Duyệt Portfolio SV', icon: UserRound, target: 'portfolio' },
    { id: 'hub', label: 'Kho thử thách', icon: Rocket, target: 'hub' },
    { id: 'learning', label: 'Học liệu FPT', icon: GraduationCap, target: 'learning' },
    { id: 'home', label: 'Trang chủ', icon: Compass, target: 'home' }
  ];

  const adminNav = [
    { id: 'admin', label: 'Admin Workspace', icon: ShieldCheck, target: 'admin' },
    { id: 'portfolio', label: 'Quản lý Portfolio', icon: UserRound, target: 'portfolio' },
    { id: 'learning', label: 'Học liệu FPT', icon: GraduationCap, target: 'learning' },
    { id: 'home', label: 'Trang chủ', icon: Compass, target: 'home' }
  ];

  const currentNav = currentRole === 'student' ? studentNav : currentRole === 'mentor' ? mentorNav : currentRole === 'admin' ? adminNav : publicNav;

  const roleBadgeLabel = currentUser
    ? `${currentUser.user?.name || 'Sinh viên'} (${(currentUser.user?.selectedMajorKey || 'SE').toUpperCase()})`
    : 'Guest';

  return (
    <header className="topbar">
      <button className="brand" onClick={() => go('home')} aria-label="Portfolio Trang chủ">
        <Rocket size={22} color="#0284c7" />
        <span style={{ fontWeight: 800, fontSize: '18px', color: 'inherit', letterSpacing: '-0.5px' }}>Portfolio</span>
        <span style={{ fontSize: '10px', background: 'linear-gradient(135deg, #0284c7, #6366f1)', color: '#fff', padding: '2px 8px', borderRadius: '999px', fontWeight: 700, letterSpacing: '0.5px' }}>FPT HUB</span>
      </button>

      <nav className="flow-nav role-nav" aria-label="Điều hướng chính">
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isActive = page === item.id || item.target === page;
          return (
            <button
              type="button"
              key={item.id}
              className={`flow-pill ${isActive ? 'active' : ''}`}
              onClick={() => go(item.target)}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="topbar-actions">
        {!currentUser && (
          <button className="primary-action compact" onClick={() => go('auth')}>
            <UserRound size={15} /> <span>Đăng nhập</span>
          </button>
        )}

        <div className="account-menu">
          <button className="ghost-action compact" type="button" onClick={() => setDemoMenuOpen((open) => !open)}>
            <span>Đổi vai trò</span>
            <MoveDown size={12} />
          </button>
          {demoMenuOpen && (
            <div className="nav-dropdown demo-dropdown" onClick={(e) => e.stopPropagation()}>
              <div className="dropdown-section-title">Chọn tài khoản kiểm thử</div>
              <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('student-dev'); }}>
                <span className="role-dot student" /> <span>Student Dev (SE)</span>
              </button>
              <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('student-design'); }}>
                <span className="role-dot student" /> <span>Student Design (GD)</span>
              </button>
              <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('student-mkt'); }}>
                <span className="role-dot student" /> <span>Student Mkt (MKT)</span>
              </button>
              <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('mentor'); }}>
                <span className="role-dot mentor" /> <span>Mentor (Reviewer)</span>
              </button>
              <button type="button" className="nav-dropdown-item" onClick={() => { setDemoMenuOpen(false); loginAs('admin'); }}>
                <span className="role-dot admin" /> <span>Admin (Quản trị)</span>
              </button>
            </div>
          )}
        </div>

        {currentUser && (
          <div className="account-menu">
            <button className="role-chip" type="button" onClick={() => setAccountOpen((open) => !open)}>
              <UserRound size={15} />
              <span>{roleBadgeLabel}</span>
              <span style={{ fontSize: '10px', background: isVipOrPro ? '#10b981' : '#64748b', color: '#fff', padding: '1px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>
                {userPlan}
              </span>
              <MoveDown size={12} />
            </button>

            {accountOpen && (
              <div className="nav-dropdown account-dropdown" onClick={(e) => e.stopPropagation()}>
                {currentRole === 'student' && (
                  <>
                    <button type="button" className="nav-dropdown-item" onClick={() => { setAccountOpen(false); go('portfolio'); }}>
                      <UserRound size={14} /> <span>Hồ sơ Portfolio</span>
                    </button>
                    <button type="button" className="nav-dropdown-item" onClick={() => { setAccountOpen(false); go('submissionHistory'); }}>
                      <FileUp size={14} /> <span>Lịch sử nộp bài</span>
                    </button>
                    <button type="button" className="nav-dropdown-item" onClick={() => { setAccountOpen(false); onOpenQrPayment?.(); }}>
                      <Crown size={14} color="#f59e0b" /> <span>Quét QR Nâng cấp VIP</span>
                    </button>
                  </>
                )}
                <button type="button" className="nav-dropdown-item danger" onClick={() => { setAccountOpen(false); logout(); }}>
                  <LogOut size={14} /> <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        )}

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          title={theme === 'dark' ? 'Chuyển sang Light mode' : 'Chuyển sang Dark mode'}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>
      </div>
    </header>
  );
}
