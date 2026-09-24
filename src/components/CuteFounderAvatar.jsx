import React from 'react';

export function CuteFounderAvatar({ id, name, role }) {
  if (id === 'founder-huy') {
    // Nguyễn Sỹ Huy - CEO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#0284c7" fillOpacity="0.1"/>
        <circle cx="60" cy="52" r="28" fill="#fed7aa"/>
        {/* Hair */}
        <path d="M34 46C34 30 46 22 62 22C76 22 86 28 86 42C86 45 83 45 81 40C77 30 70 28 60 28C48 28 42 34 38 46Z" fill="#18181b"/>
        <path d="M33 46C32 40 37 32 44 28C37 34 36 44 33 46Z" fill="#27272a"/>
        {/* Glasses */}
        <rect x="42" y="46" width="14" height="10" rx="3" stroke="#f59e0b" strokeWidth="2.5" fill="none"/>
        <rect x="64" y="46" width="14" height="10" rx="3" stroke="#f59e0b" strokeWidth="2.5" fill="none"/>
        <line x1="56" y1="51" x2="64" y2="51" stroke="#f59e0b" strokeWidth="2"/>
        <circle cx="49" cy="51" r="2" fill="#0f172a"/>
        <circle cx="71" cy="51" r="2" fill="#0f172a"/>
        {/* Smile & Blush */}
        <path d="M52 64C56 68 64 68 68 64" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="40" cy="58" rx="4" ry="2.5" fill="#fda4af" opacity="0.6"/>
        <ellipse cx="80" cy="58" rx="4" ry="2.5" fill="#fda4af" opacity="0.6"/>
        {/* Body */}
        <path d="M28 110C28 88 42 80 60 80C78 80 92 88 92 110H28Z" fill="#0284c7"/>
        <path d="M52 80L50 96M68 80L70 96" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
        <path d="M54 80C54 84 66 84 66 80" stroke="#bae6fd" strokeWidth="2"/>
      </svg>
    );
  }

  if (id === 'founder-thiet') {
    // Bùi Văn Thiết - CTO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#0f172a" fillOpacity="0.08"/>
        <circle cx="60" cy="52" r="28" fill="#fde68a"/>
        {/* Tech hair */}
        <path d="M35 44C35 26 48 20 60 20C74 20 85 27 85 44C78 30 70 26 58 26C45 26 38 34 35 44Z" fill="#09090b"/>
        {/* Headphones */}
        <path d="M32 50C32 34 44 26 60 26C76 26 88 34 88 50" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
        <rect x="29" y="46" width="6" height="14" rx="3" fill="#ea580c"/>
        <rect x="85" y="46" width="6" height="14" rx="3" fill="#ea580c"/>
        <circle cx="48" cy="50" r="2.5" fill="#18181b"/>
        <circle cx="72" cy="50" r="2.5" fill="#18181b"/>
        <path d="M53 63C57 67 63 67 67 63" stroke="#d97706" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="41" cy="57" rx="3.5" ry="2" fill="#fbbf24" opacity="0.7"/>
        <ellipse cx="79" cy="57" rx="3.5" ry="2" fill="#fbbf24" opacity="0.7"/>
        {/* Tech jacket */}
        <path d="M26 110C26 86 40 78 60 78C80 78 94 86 94 110H26Z" fill="#334155"/>
        <path d="M60 78V110" stroke="#0ea5e9" strokeWidth="2"/>
        <circle cx="44" cy="92" r="3" fill="#38bdf8"/>
      </svg>
    );
  }

  if (id === 'founder-linh') {
    // Lê Phương Linh - COO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#f59e0b" fillOpacity="0.08"/>
        <path d="M32 50C32 75 34 98 42 105C46 100 48 85 48 70C48 50 72 50 72 70C72 85 74 100 78 105C86 98 88 75 88 50C88 30 76 22 60 22C44 22 32 30 32 50Z" fill="#78350f"/>
        <circle cx="60" cy="52" r="26" fill="#fef08a"/>
        <path d="M36 44C42 36 50 34 60 34C70 34 78 36 84 44C80 34 72 26 60 26C48 26 40 34 36 44Z" fill="#92400e"/>
        <circle cx="48" cy="50" r="3" fill="#1e1b4b"/>
        <circle cx="50" cy="48" r="1" fill="#ffffff"/>
        <circle cx="72" cy="50" r="3" fill="#1e1b4b"/>
        <circle cx="74" cy="48" r="1" fill="#ffffff"/>
        <path d="M53 62C57 66 63 66 67 62" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="42" cy="57" rx="4.5" ry="3" fill="#f43f5e" opacity="0.5"/>
        <ellipse cx="78" cy="57" rx="4.5" ry="3" fill="#f43f5e" opacity="0.5"/>
        <circle cx="36" cy="38" r="3" fill="#f59e0b"/>
        <path d="M28 110C28 88 42 78 60 78C78 78 92 88 92 110H28Z" fill="#f97316"/>
        <path d="M60 78L52 92H68L60 78Z" fill="#ffedd5"/>
      </svg>
    );
  }

  if (id === 'founder-ngoc') {
    // Lương Hồng Ngọc - CPO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#8b5cf6" fillOpacity="0.08"/>
        <path d="M30 52C28 72 32 94 40 102C44 95 45 80 45 68C45 52 75 52 75 68C75 80 76 95 80 102C88 94 92 72 90 52C90 32 78 22 60 22C42 22 30 32 30 52Z" fill="#4c1d95"/>
        <circle cx="60" cy="52" r="26" fill="#fde047"/>
        <path d="M35 42C44 32 54 30 64 30C74 30 82 34 85 42C80 30 70 24 58 24C46 24 38 32 35 42Z" fill="#581c87"/>
        <circle cx="49" cy="50" r="3" fill="#3b0764"/>
        <circle cx="51" cy="48" r="1.2" fill="#ffffff"/>
        <circle cx="71" cy="50" r="3" fill="#3b0764"/>
        <circle cx="73" cy="48" r="1.2" fill="#ffffff"/>
        <path d="M53 62C57 66 63 66 67 62" stroke="#ec4899" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="43" cy="57" rx="4" ry="2.5" fill="#f472b6" opacity="0.6"/>
        <ellipse cx="77" cy="57" rx="4" ry="2.5" fill="#f472b6" opacity="0.6"/>
        <path d="M28 110C28 88 42 78 60 78C78 78 92 88 92 110H28Z" fill="#8b5cf6"/>
        <path d="M60 78L50 95M60 78L70 95" stroke="#e9d5ff" strokeWidth="2"/>
      </svg>
    );
  }

  if (id === 'founder-giang') {
    // Tạ Thị Minh Giang - CMO
    return (
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="120" height="120" rx="20" fill="#0d9488" fillOpacity="0.08"/>
        <circle cx="60" cy="52" r="26" fill="#fef08a"/>
        <path d="M34 46C34 28 46 22 60 22C74 22 86 28 86 46C82 32 72 26 60 26C48 26 38 32 34 46Z" fill="#1c1917"/>
        <path d="M78 28C88 24 98 32 94 48C90 42 86 36 78 28Z" fill="#292524"/>
        <circle cx="48" cy="50" r="2.8" fill="#0f172a"/>
        <circle cx="50" cy="48" r="1" fill="#ffffff"/>
        <circle cx="72" cy="50" r="2.8" fill="#0f172a"/>
        <circle cx="74" cy="48" r="1" fill="#ffffff"/>
        <path d="M51 61C55 67 65 67 69 61" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"/>
        <ellipse cx="42" cy="56" rx="4" ry="2.5" fill="#34d399" opacity="0.6"/>
        <ellipse cx="78" cy="56" rx="4" ry="2.5" fill="#34d399" opacity="0.6"/>
        <path d="M28 110C28 86 42 78 60 78C78 78 92 86 92 110H28Z" fill="#0d9488"/>
        <circle cx="60" cy="92" r="3" fill="#facc15"/>
      </svg>
    );
  }

  // Phạm Khắc Nghĩa - CFO
  return (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="120" height="120" rx="20" fill="#1e3a8a" fillOpacity="0.08"/>
      <circle cx="60" cy="52" r="28" fill="#fed7aa"/>
      <path d="M36 44C36 28 48 22 62 22C74 22 84 27 84 42C80 30 72 26 62 26C50 26 42 32 36 44Z" fill="#27272a"/>
      <rect x="42" y="47" width="14" height="9" rx="2.5" stroke="#0284c7" strokeWidth="2" fill="none"/>
      <rect x="64" y="47" width="14" height="9" rx="2.5" stroke="#0284c7" strokeWidth="2" fill="none"/>
      <line x1="56" y1="51.5" x2="64" y2="51.5" stroke="#0284c7" strokeWidth="1.5"/>
      <circle cx="49" cy="51.5" r="2" fill="#0f172a"/>
      <circle cx="71" cy="51.5" r="2" fill="#0f172a"/>
      <path d="M53 64C57 68 63 68 67 64" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round"/>
      <ellipse cx="40" cy="58" rx="3.5" ry="2" fill="#38bdf8" opacity="0.5"/>
      <ellipse cx="80" cy="58" rx="3.5" ry="2" fill="#38bdf8" opacity="0.5"/>
      <path d="M26 110C26 86 40 78 60 78C80 78 94 86 94 110H26Z" fill="#1e3a8a"/>
      <path d="M60 78L52 92H68L60 78Z" fill="#ffffff"/>
      <path d="M60 84L58 106L60 110L62 106L60 84Z" fill="#f59e0b"/>
    </svg>
  );
}
