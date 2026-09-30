import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { CuteFounderAvatar } from './CuteFounderAvatar';
import { apiService } from '../services/api';

const defaultFounders = [
  {
    id: 'founder-huy',
    name: 'Nguyễn Sỹ Huy',
    role: 'CEO',
    roleFull: 'Chief Executive Officer',
    bio: 'Định hướng chiến lược & phát triển hệ sinh thái Portfolio sinh viên'
  },
  {
    id: 'founder-thiet',
    name: 'Bùi Văn Thiết',
    role: 'CTO',
    roleFull: 'Chief Technology Officer',
    bio: 'Kiến trúc sư hệ thống nền tảng, tích hợp AI & phân luồng chấm điểm'
  },
  {
    id: 'founder-linh',
    name: 'Lê Phương Linh',
    role: 'COO',
    roleFull: 'Chief Operating Officer',
    bio: 'Quản trị vận hành, quy chuẩn Mentor Review & kết nối doanh nghiệp'
  },
  {
    id: 'founder-ngoc',
    name: 'Lương Hồng Ngọc',
    role: 'CPO',
    roleFull: 'Chief Product Officer',
    bio: 'Thiết kế trải nghiệm người dùng, Bản đồ nghề & Trung tâm thử thách'
  },
  {
    id: 'founder-giang',
    name: 'Tạ Thị Minh Giang',
    role: 'CMO',
    roleFull: 'Chief Marketing Officer',
    bio: 'Phát triển cộng đồng sinh viên và kết nối cơ hội nghề nghiệp'
  },
  {
    id: 'founder-nghia',
    name: 'Phạm Khắc Nghĩa',
    role: 'CFO',
    roleFull: 'Chief Financial Officer',
    bio: 'Quản trị tài chính, các gói Premium & Quỹ thưởng thù lao Mentor'
  }
];

export function FoundersSection({ founders }) {
  const [list, setList] = useState(founders && founders.length > 0 ? founders : defaultFounders);

  useEffect(() => {
    if (founders && founders.length > 0) {
      setList(founders);
      return;
    }
    // Fetch directly from MongoDB
    apiService.getFounders().then((data) => {
      if (data && data.length > 0) {
        setList(data);
      }
    }).catch(() => {});
  }, [founders]);

  const foundersList = list;

  return (
    <section className="jr-founders-open-section">
      <div className="jr-founders-badge">
        <Sparkles size={14} />
        <span>ĐỘI NGŨ SÁNG LẬP</span>
      </div>

      <h2 className="jr-founders-title">
        <span className="white-text">NGƯỜI </span>
        <span className="gold-text">SÁNG LẬP</span>
      </h2>

      <p className="jr-founders-subtitle">
        Đội ngũ sinh viên xây dựng nơi người học ở nhiều lĩnh vực có thể luyện tập, nhận góp ý và trình bày năng lực.
      </p>

      <div className="jr-founders-grid-unboxed">
        {foundersList.map((founder) => (
          <div className="jr-founder-unboxed-card" key={founder.id}>
            <div className="jr-founder-avatar-unboxed">
              <CuteFounderAvatar id={founder.id} name={founder.name} role={founder.role} />
            </div>
            <strong className="jr-founder-name-unboxed">{founder.name}</strong>
            <span className="jr-founder-role-pill">{founder.role}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
