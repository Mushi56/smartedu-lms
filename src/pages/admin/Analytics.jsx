import React from 'react';
import { BarChart2, TrendingUp, Users, CheckCircle2, Clock, Star, ArrowUpRight, ArrowDownRight, BookOpen, DollarSign } from 'lucide-react';

const cardStyle = {
  background: '#fff', borderRadius: '16px',
  border: '1px solid #ede9f4', padding: '16px',
  display: 'flex', flexDirection: 'column', gap: '12px'
};

export default function Analytics() {
  const metrics = [
    { title: 'Active Users', value: '1,856', change: '+12.4%', isPositive: true, icon: Users, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
    { title: 'Completion Rate', value: '68.4%', change: '+6.7%', isPositive: true, icon: CheckCircle2, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    { title: 'Avg Quiz Score', value: '72.6%', change: '-3.2%', isPositive: false, icon: Star, color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
    { title: 'Attendance', value: '85.3%', change: '+8.1%', isPositive: true, icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  ];

  // Revenue data
  const revenueData = [
    { month: 'Jan', value: 4200, enrollments: 120 },
    { month: 'Feb', value: 5100, enrollments: 145 },
    { month: 'Mar', value: 3800, enrollments: 110 },
    { month: 'Apr', value: 6200, enrollments: 190 },
    { month: 'May', value: 7100, enrollments: 215 },
    { month: 'Jun', value: 8400, enrollments: 248 },
  ];
  const maxRevenue = Math.max(...revenueData.map(d => d.value));

  // Course distribution
  const courseDistribution = [
    { label: 'Published', count: 78, percent: 61, color: '#6366f1' },
    { label: 'Draft', count: 32, percent: 25, color: '#38bdf8' },
    { label: 'Pending', count: 12, percent: 9, color: '#f59e0b' },
    { label: 'Archived', count: 6, percent: 5, color: '#94a3b8' },
  ];

  // Top courses
  const topCourses = [
    { name: 'SAT Math Mastery', students: 342, rating: 4.9, revenue: '$12,450' },
    { name: 'IELTS Speaking Success', students: 298, rating: 4.8, revenue: '$10,920' },
    { name: 'GRE Quantitative', students: 256, rating: 4.8, revenue: '$9,380' },
    { name: 'TOEFL Complete Guide', students: 234, rating: 4.7, revenue: '$8,100' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Reports & Analytics</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Platform performance and key metrics overview</p>
      </div>

      {/* Stats Grid - 2x2 */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <div key={i} style={{ ...cardStyle, padding: '12px', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={13} style={{ color: m.color }} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px',
                  color: m.isPositive ? '#10b981' : '#ef4444' }}>
                  {m.isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                  {m.change}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>{m.value}</span>
                <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)' }}>{m.title}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Revenue Bar Chart */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Revenue Trends</h3>
          <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
            <TrendingUp size={10} /> +18.3%
          </span>
        </div>

        {/* Bar Chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px', paddingTop: '8px' }}>
          {revenueData.map((d, i) => {
            const height = (d.value / maxRevenue) * 100;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '8px', fontWeight: 700, color: 'var(--text-primary)' }}>${(d.value / 1000).toFixed(1)}K</span>
                <div style={{ width: '100%', maxWidth: '32px', height: `${height}%`, borderRadius: '6px 6px 2px 2px',
                  background: i === revenueData.length - 1 ? 'var(--primary-gradient)' : 'rgba(99,102,241,0.15)',
                  transition: 'height 0.3s'
                }} />
                <span style={{ fontSize: '8px', fontWeight: 600, color: 'var(--text-muted)' }}>{d.month}</span>
              </div>
            );
          })}
        </div>

        {/* Summary row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f5f3f9', paddingTop: '10px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>$34.8K</span>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Total Revenue</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>1,028</span>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Enrollments</span>
          </div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>$33.85</span>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Avg/Student</span>
          </div>
        </div>
      </div>

      {/* Course Distribution */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Course Distribution</h3>

        {/* Horizontal stacked bar */}
        <div style={{ display: 'flex', height: '12px', borderRadius: '6px', overflow: 'hidden' }}>
          {courseDistribution.map((seg, i) => (
            <div key={i} style={{ width: `${seg.percent}%`, background: seg.color, transition: 'width 0.3s' }} />
          ))}
        </div>

        {/* Legend */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {courseDistribution.map((seg, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: seg.color, flexShrink: 0 }} />
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{seg.label}</span>
              <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-primary)', marginLeft: 'auto' }}>{seg.count}</span>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', paddingTop: '4px', borderTop: '1px solid #f5f3f9' }}>
          <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>128</span>
          <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Total Courses</span>
        </div>
      </div>

      {/* Top Performing Courses */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Top Performing Courses</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {topCourses.map((course, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#faf9fc', borderRadius: '10px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--primary-color)' }}>#{i + 1}</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{course.name}</h4>
                <div style={{ display: 'flex', gap: '8px', marginTop: '2px', fontSize: '9px', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Users size={8} /> {course.students}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}><Star size={8} fill="#f59e0b" /> {course.rating}</span>
                </div>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#10b981' }}>{course.revenue}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Timeline */}
      <div style={cardStyle}>
        <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Recent Activity</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { text: '15 new students enrolled in SAT Math', time: '2 hours ago', color: '#6366f1' },
            { text: 'IELTS Speaking course completion rate reached 85%', time: '4 hours ago', color: '#10b981' },
            { text: 'New review submitted for GRE Quantitative', time: '6 hours ago', color: '#f59e0b' },
            { text: 'Live class recording processed - Arabic Basics', time: '8 hours ago', color: '#8b5cf6' },
          ].map((activity, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', padding: '10px 0', borderBottom: i < 3 ? '1px solid #f5f3f9' : 'none' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: activity.color, flexShrink: 0, marginTop: '3px' }} />
                {i < 3 && <div style={{ width: '1px', flex: 1, background: '#f5f3f9', marginTop: '4px' }} />}
              </div>
              <div>
                <p style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>{activity.text}</p>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
