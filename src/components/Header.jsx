import React, { useEffect, useRef, useState } from 'react';
import {
  BarChart2, BookOpen, ChevronDown, Crown, FileUp, GraduationCap,
  LayoutDashboard, LogOut, Menu, Rocket, ShieldCheck, UserRound
} from 'lucide-react';

const links = {
  public: [
    { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard },
    { id: 'hub', label: 'Thử thách', icon: Rocket },
    { id: 'learning', label: 'Học liệu', icon: GraduationCap },
    { id: 'trends', label: 'Xu hướng thị trường', icon: BarChart2 },
    { id: 'portfolio', label: 'Hồ sơ Portfolio', icon: UserRound },
    { id: 'pricing', label: 'Gói Premium', icon: Crown }
  ],
  student: [
    { id: 'hub', label: 'Thử thách', icon: Rocket },
    { id: 'submit', label: 'Nộp bài', icon: FileUp },
    { id: 'feedback', label: 'Góp ý Mentor', icon: GraduationCap },
    { id: 'submissionHistory', label: 'Bài đã nộp', icon: FileUp },
    { id: 'portfolio', label: 'Hồ sơ Portfolio', icon: UserRound },
    { id: 'learning', label: 'Học liệu', icon: GraduationCap },
    { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard },
    { id: 'trends', label: 'Xu hướng thị trường', icon: BarChart2 },
    { id: 'pricing', label: 'Gói Premium', icon: Crown }
  ],
  mentor: [
    { id: 'mentor', label: 'Không gian Mentor', icon: GraduationCap },
    { id: 'learning', label: 'Học liệu', icon: BookOpen },
    { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard },
    { id: 'trends', label: 'Xu hướng thị trường', icon: BarChart2 }
  ],
  admin: [
    { id: 'admin', label: 'Quản trị', icon: ShieldCheck },
    { id: 'learning', label: 'Học liệu', icon: BookOpen },
    { id: 'roadmap', label: 'Bản đồ nghề', icon: LayoutDashboard },
    { id: 'trends', label: 'Xu hướng thị trường', icon: BarChart2 }
  ]
};

export function Header({ page, go, currentUser, logout, onOpenQrPayment }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const menuRef = useRef(null);
  const currentRole = currentUser?.type ?? currentUser?.user?.role;
  const currentLinks = links[currentRole] || links.public;
  const primaryLinks = currentLinks.filter(item => item.id !== 'pricing').slice(0, 4);
  const moreLinks = currentLinks.filter(item => !primaryLinks.includes(item));
  const userPlan = currentUser?.user?.subscription?.planName || 'Free';
  const roleBadgeLabel = currentUser?.user?.name || (currentRole === 'mentor' ? 'Mentor' : 'Sinh viên');

  useEffect(() => {
    if (!menuOpen && !accountOpen) return undefined;
    const closeOnOutside = event => {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
        setAccountOpen(false);
      }
    };
    const closeOnEscape = event => {
      if (event.key === 'Escape') { setMenuOpen(false); setAccountOpen(false); }
    };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen, accountOpen]);

  const navigate = target => { setMenuOpen(false); setAccountOpen(false); go(target); };
  const renderLink = item => {
    const Icon = item.icon;
    return <button key={item.id} type="button" className={`flow-pill ${page === item.id ? 'active' : ''}`} aria-label={item.label} aria-current={page === item.id ? 'page' : undefined} onClick={() => navigate(item.id)}>
      <Icon size={16} aria-hidden="true" /><span>{item.label}</span>
    </button>;
  };

  return <header className="topbar hub-topbar" ref={menuRef}>
    <button className="brand" onClick={() => navigate('home')} aria-label="Portfolio FPT Hub, trang chủ">
      <Rocket size={22} color="#0284c7" aria-hidden="true" />
      <span className="hub-brand-name">Portfolio</span>
      <span className="hub-brand-tag">FPT HUB</span>
    </button>

    <nav className="flow-nav role-nav hub-primary-nav" aria-label="Điều hướng chính">
      {primaryLinks.map(renderLink)}
      {currentLinks.length > 2 && <div className={`hub-menu-wrap ${moreLinks.length === 0 ? 'hub-mobile-menu-only' : ''}`}>
        <button type="button" className={`flow-pill hub-menu-trigger ${menuOpen ? 'active' : ''}`} aria-label="Danh mục điều hướng" aria-expanded={menuOpen} aria-haspopup="menu" onClick={() => setMenuOpen(value => !value)}>
          <Menu size={16} aria-hidden="true" /><span>Danh mục</span><ChevronDown size={14} aria-hidden="true" />
        </button>
        {menuOpen && <div className="hub-nav-menu" role="menu" aria-label="Các mục khác">
          {currentLinks.map(item => { const Icon = item.icon; const isPrimary = primaryLinks.includes(item); return <button key={item.id} role="menuitem" type="button" className={`hub-nav-menu-item ${isPrimary ? 'hub-menu-primary-item' : ''}`} onClick={() => navigate(item.id)}>
            <Icon size={17} aria-hidden="true" /><span>{item.label}</span>{page === item.id && <span className="hub-menu-current">Đang xem</span>}
          </button>; })}
        </div>}
      </div>}
    </nav>

    <div className="topbar-actions hub-topbar-actions">
      {!currentUser ? <>
        <button className="hub-login-action" type="button" onClick={() => navigate('auth')}><UserRound size={16} />Đăng nhập</button>
        <button className="hub-signup-action" type="button" onClick={() => navigate('auth')}>Tạo tài khoản</button>
      </> : <div className="account-menu">
        <button className="role-chip hub-account-trigger" type="button" aria-expanded={accountOpen} onClick={() => setAccountOpen(value => !value)}>
          <UserRound size={16} /><span>{roleBadgeLabel}</span><span className="hub-plan-badge">{userPlan}</span><ChevronDown size={14} />
        </button>
        {accountOpen && <div className="nav-dropdown account-dropdown hub-account-menu">
          {currentRole === 'student' && <>
            <button type="button" className="nav-dropdown-item" onClick={() => navigate('portfolio')}><UserRound size={15} /><span>Hồ sơ Portfolio</span></button>
            <button type="button" className="nav-dropdown-item" onClick={() => navigate('submissionHistory')}><FileUp size={15} /><span>Lịch sử bài nộp</span></button>
            <button type="button" className="nav-dropdown-item" onClick={() => { setAccountOpen(false); onOpenQrPayment?.(); }}><Crown size={15} /><span>Nâng cấp Premium</span></button>
          </>}
          <button type="button" className="nav-dropdown-item hub-signout" onClick={() => { setAccountOpen(false); logout(); }}><LogOut size={15} /><span>Đăng xuất</span></button>
        </div>}
      </div>}
    </div>
  </header>;
}
