import React from 'react';
import { BarChart2, TrendingUp, Users, CheckCircle2, Clock, Star, ArrowUpRight } from 'lucide-react';
import { EnrollmentsRevenueChart, CourseStatusDonutChart } from '../../components/AnalyticsChart';

export default function Analytics() {
  const metrics = [
    { title: "Monthly Active Users", value: "1,856", change: "+12.4%", desc: "vs last month", icon: Users, color: '#6366f1' },
    { title: "Course Completion Rate", value: "68.4%", change: "+6.7%", desc: "Avg time: 14 days", icon: CheckCircle2, color: '#10b981' },
    { title: "Average Quiz Score", value: "72.6%", change: "-3.2%", desc: "Target score: 75%", icon: Star, color: '#ef4444' },
    { title: "Attendance Rate", value: "85.3%", change: "+8.1%", desc: "For live lecture rooms", icon: Clock, color: '#f59e0b' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Reports & Performance Analytics</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Examine platform health, classroom metrics, and financial summaries</p>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          const isPositive = !m.change.includes('-');
          return (
            <div key={idx} className="smart-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'var(--bg-app)', color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
                <Icon size={18} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px' }}>{m.title}</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{m.value}</span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' }}>
                <span style={{ fontWeight: 700, color: isPositive ? 'var(--status-success)' : 'var(--status-danger)', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  {isPositive ? <ArrowUpRight size={12} /> : null}
                  {m.change}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>{m.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed SVG Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Enrollments vs Revenue */}
        <div className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', textAlign: 'left' }}>
            Platform Growth & Revenue Trends
          </h3>
          <div style={{ padding: '10px 0' }}>
            <EnrollmentsRevenueChart />
          </div>
        </div>

        {/* Course Status */}
        <div className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', textAlign: 'left' }}>
            Course Catalogue Distribution
          </h3>
          <div style={{ padding: '10px 0', maxWidth: '320px', margin: '0 auto', width: '100%' }}>
            <CourseStatusDonutChart />
          </div>
        </div>
      </div>
    </div>
  );
}
