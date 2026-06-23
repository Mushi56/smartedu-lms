import React from 'react';
import { BarChart2, TrendingUp, Users, CheckCircle2, Clock, Star, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { EnrollmentsRevenueChart, CourseStatusDonutChart } from '../../components/AnalyticsChart';

export default function Analytics() {
  const metrics = [
    { title: "Monthly Active Users", value: "1,856", change: "+12.4%", desc: "vs last month", icon: Users, color: '#6366f1', bg: 'rgba(99, 102, 241, 0.08)' },
    { title: "Course Completion", value: "68.4%", change: "+6.7%", desc: "Avg time: 14 days", icon: CheckCircle2, color: '#10b981', bg: 'rgba(16, 185, 129, 0.08)' },
    { title: "Average Quiz Score", value: "72.6%", change: "-3.2%", desc: "Target score: 75%", icon: Star, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' },
    { title: "Attendance Rate", value: "85.3%", change: "+8.1%", desc: "For live lectures", icon: Clock, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>
          Reports & Performance Analytics
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Examine platform health, classroom metrics, and financial summaries
        </p>
      </div>

      {/* Stats Cards Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          const isPositive = !m.change.includes('-');
          return (
            <div 
              key={idx} 
              className="smart-card hover-glow" 
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'flex-start', 
                padding: '24px',
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-card)'
              }}
            >
              <div style={{ 
                width: '42px', 
                height: '42px', 
                borderRadius: '10px', 
                backgroundColor: m.bg, 
                color: m.color, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '16px',
                border: `1px solid ${m.bg}`
              }}>
                <Icon size={20} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px', letterSpacing: '0.5px' }}>
                {m.title}
              </span>
              <span style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', marginBottom: '8px', lineHeight: 1 }}>
                {m.value}
              </span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', flexWrap: 'wrap' }}>
                <span style={{ 
                  fontWeight: 800, 
                  color: isPositive ? '#10b981' : '#ef4444', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '2px',
                  backgroundColor: isPositive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}>
                  {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {m.change}
                </span>
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{m.desc}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed SVG Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Enrollments vs Revenue */}
        <div 
          className="smart-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', margin: 0 }}>
            Platform Growth & Revenue Trends
          </h3>
          <div style={{ padding: '10px 0' }}>
            <EnrollmentsRevenueChart />
          </div>
        </div>

        {/* Course Status */}
        <div 
          className="smart-card" 
          style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px',
            padding: '24px',
            borderRadius: '16px',
            border: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-card)'
          }}
        >
          <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', margin: 0 }}>
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
