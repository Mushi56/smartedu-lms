import React, { useState } from 'react';
import {
  Users, BookOpen, DollarSign, TrendingUp, Star,
  UserPlus, Activity, ChevronRight, Video, BarChart2,
  ArrowUpRight, Clock, CheckCircle, AlertCircle
} from 'lucide-react';

const card = {
  background: '#fff',
  borderRadius: '16px',
  border: '1px solid #ede9f4',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
};

const sectionLabel = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const seeAllBtn = {
  fontSize: '11px', fontWeight: 700,
  color: 'var(--primary-color)',
  background: 'none', border: 'none', cursor: 'pointer', padding: 0,
};

const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=80&q=80',
];

export default function Dashboard({ courses, classes, students, setActiveTab }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const totalStudents = students ? students.length : 0;
  const totalTeachers = courses ? new Set(courses.map(c => c.teacher)).size : 0;
  const totalCourses = courses ? courses.length : 0;
  const totalRevenue = courses ? courses.reduce((acc, c) => acc + (c.price * (c.studentsCount || 0)), 0) : 0;

  const metricCards = [
    { label: 'Students', value: totalStudents.toLocaleString(), change: '+12%', icon: Users, color: '#3A2048', bg: 'rgba(58,32,72,0.08)' },
    { label: 'Teachers', value: totalTeachers.toLocaleString(), change: '+5%', icon: UserPlus, color: '#CABA61', bg: 'rgba(202,186,97,0.12)' },
    { label: 'Courses', value: totalCourses.toLocaleString(), change: '+8%', icon: BookOpen, color: '#0E7C7B', bg: 'rgba(14,124,123,0.08)' },
    { label: 'Revenue', value: `$${(totalRevenue / 1000).toFixed(1)}k`, change: '+18%', icon: DollarSign, color: '#2BA84A', bg: 'rgba(43,168,74,0.08)' },
  ];

  // Mini chart data for bar sparkline
  const barData = [35, 52, 40, 68, 45, 78, 60, 90, 55, 80, 72, 95];
  const maxBar = Math.max(...barData);

  // SVG line chart
  const linePoints = [80, 65, 72, 50, 60, 40, 45, 30, 42, 25, 35, 20];
  const lineMax = Math.max(...linePoints);
  const lineMin = Math.min(...linePoints);
  const chartH = 80;
  const chartW = 280;
  const pts = linePoints.map((v, i) => {
    const x = (i / (linePoints.length - 1)) * chartW;
    const y = chartH - ((v - lineMin) / (lineMax - lineMin)) * (chartH - 10) - 5;
    return `${x},${y}`;
  }).join(' ');

  // Recent activities (mock)
  const activities = [
    { icon: UserPlus, color: '#6366f1', bg: 'rgba(99,102,241,0.1)', text: 'New student registered', meta: 'Ahmed K. · SAT Math', time: '2m ago' },
    { icon: BookOpen, color: '#22c55e', bg: 'rgba(34,197,94,0.1)', text: 'Course published', meta: 'IELTS Writing Mastery', time: '18m ago' },
    { icon: DollarSign, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', text: 'Payment received', meta: '$149 · GRE Prep', time: '1h ago' },
    { icon: Video, color: '#ef4444', bg: 'rgba(239,68,68,0.1)', text: 'Live class started', meta: 'SAT Math Practice', time: '2h ago' },
    { icon: CheckCircle, color: '#0E7C7B', bg: 'rgba(14,124,123,0.1)', text: 'Student completed course', meta: 'Sara A. · TOEFL', time: '3h ago' },
  ];

  // Top courses (from real data or fallback)
  const topCourses = courses && courses.length > 0
    ? courses.slice(0, 4).map((c, i) => ({ ...c, enrollments: c.studentsCount || Math.floor(Math.random() * 500 + 100) }))
    : [
        { id: 't1', title: 'SAT Math Mastery', teacher: 'Dr. Ahmed', price: 149, enrollments: 1240 },
        { id: 't2', title: 'IELTS Writing', teacher: 'Ms. Sarah', price: 99, enrollments: 980 },
        { id: 't3', title: 'GRE Prep', teacher: 'Dr. Michael', price: 179, enrollments: 740 },
      ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }} className="animate-fade-in">

      {/* ── Welcome Banner ──────────────────────────────────────── */}
      <div style={{
        background: 'linear-gradient(135deg, #3A2048 0%, #5a2d80 100%)',
        borderRadius: '18px', padding: '18px 20px', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>Good morning 👋</div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, margin: '2px 0 4px 0' }}>Admin Dashboard</h2>
          <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.65)', margin: 0 }}>
            {totalCourses} active course{totalCourses !== 1 ? 's' : ''} · {totalStudents} student{totalStudents !== 1 ? 's' : ''}
          </p>
        </div>
        <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <BarChart2 size={24} style={{ color: '#fff' }} />
        </div>
      </div>

      {/* ── 4 Stat Cards in 2×2 grid ────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {metricCards.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} style={{ ...card, padding: '14px', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={16} style={{ color: m.color }} />
                </div>
                <span style={{ fontSize: '9.5px', fontWeight: 800, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 6px', borderRadius: '6px' }}>
                  {m.change}
                </span>
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{m.value}</div>
                <div style={{ fontSize: '10px', color: 'var(--text-secondary)', marginTop: '2px' }}>{m.label}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Revenue Chart ────────────────────────────────────────── */}
      <div style={card}>
        <div style={sectionLabel}>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Revenue Overview</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '1px' }}>Last 12 months</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>${(totalRevenue / 1000).toFixed(1)}k</div>
            <div style={{ fontSize: '9px', color: '#10b981', fontWeight: 700 }}>↑ 18% vs last yr</div>
          </div>
        </div>

        {/* SVG Bar Sparkline */}
        <div style={{ height: '80px', display: 'flex', alignItems: 'flex-end', gap: '4px' }}>
          {barData.map((v, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <div
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  width: '100%',
                  height: `${(v / maxBar) * 64}px`,
                  background: i === hoveredIdx ? 'var(--primary-color)' : i === barData.length - 1 ? '#CABA61' : 'rgba(58,32,72,0.18)',
                  borderRadius: '4px 4px 0 0',
                  transition: 'background 0.2s',
                  cursor: 'pointer',
                  minHeight: '4px',
                }}
              />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      {/* ── Enrollment Trend Line ───────────────────────────────── */}
      <div style={card}>
        <div style={sectionLabel}>
          <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Enrollment Trend</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#10b981', fontWeight: 700 }}>
            <ArrowUpRight size={12} /> +24 this week
          </div>
        </div>
        <svg viewBox={`0 0 ${chartW} ${chartH + 10}`} width="100%" height="80" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Fill */}
          <polygon
            points={`0,${chartH} ${pts} ${chartW},${chartH}`}
            fill="url(#lineGrad)"
          />
          {/* Line */}
          <polyline points={pts} fill="none" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Dots */}
          {linePoints.map((v, i) => {
            const x = (i / (linePoints.length - 1)) * chartW;
            const y = chartH - ((v - lineMin) / (lineMax - lineMin)) * (chartH - 10) - 5;
            return <circle key={i} cx={x} cy={y} r="3" fill="#6366f1" stroke="#fff" strokeWidth="1.5" />;
          })}
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '8px', color: 'var(--text-muted)', fontWeight: 600 }}>
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(m => (
            <span key={m}>{m}</span>
          ))}
        </div>
      </div>

      {/* ── Top Courses ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={sectionLabel}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Top Courses</span>
          <button style={seeAllBtn} onClick={() => setActiveTab('courses')}>See All</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topCourses.map((c, i) => (
            <div key={c.id} style={{ ...card, flexDirection: 'row', alignItems: 'center', gap: '12px', padding: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, background: '#3A2048', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {c.thumbnail
                  ? <img src={c.thumbnail} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <BookOpen size={16} style={{ color: 'rgba(255,255,255,0.7)' }} />
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 1px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.title}</h4>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{c.enrollments} enrolled</span>
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-color)', flexShrink: 0 }}>${c.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recent Activity ──────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={sectionLabel}>
          <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Recent Activity</span>
          <button style={seeAllBtn}>See All</button>
        </div>
        <div style={card}>
          {activities.map((act, i) => {
            const Icon = act.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', paddingBottom: i < activities.length - 1 ? '12px' : 0, borderBottom: i < activities.length - 1 ? '1px solid #ede9f4' : 'none' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: act.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <Icon size={13} style={{ color: act.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{act.text}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{act.meta}</div>
                </div>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', flexShrink: 0 }}>{act.time}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Quick Stats Row ──────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', paddingBottom: '8px' }}>
        {[
          { label: 'Avg Rating', value: '4.8', sub: 'Across all courses', icon: Star, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
          { label: 'Live Today', value: classes ? classes.filter(c => c.isLive).length.toString() : '0', sub: 'Active classes', icon: Video, color: '#ef4444', bg: 'rgba(239,68,68,0.1)' },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} style={{ ...card, padding: '14px', gap: '6px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={15} style={{ color: s.color }} />
              </div>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{s.label}</div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{s.sub}</div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
