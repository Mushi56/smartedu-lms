import React, { useState } from 'react';
import { 
  Users, BookOpen, Video, CreditCard, DollarSign, Calendar, TrendingUp, TrendingDown,
  ArrowRight, ShieldAlert, CheckCircle, Clock, PlusCircle, Volume2, HelpCircle
} from 'lucide-react';
import { EnrollmentsRevenueChart, CourseStatusDonutChart, Sparkline } from '../../components/AnalyticsChart';

export default function Dashboard({ courses, classes, students, setActiveTab }) {
  const [dateRange, setDateRange] = useState('May 20 – May 26, 2024');

  // Filter 4 classes for Upcoming section
  const upcomingAdminClasses = classes.slice(0, 4);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* 1. Header with greeting and Date picker */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Welcome back, Admin! 👋</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Here's what's happening with your platform today.</p>
        </div>

        <button className="date-selector-btn click-press">
          <Calendar size={14} style={{ color: 'var(--primary-color)' }} />
          <span>{dateRange}</span>
        </button>
      </div>

      {/* 2. Five Analytics Stats Cards */}
      <div className="stats-row-grid">
        {/* Stat 1 */}
        <div className="stat-card-item">
          <div className="stat-card-icon-box" style={{ backgroundColor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
            <Users size={18} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label">Total Students</span>
            <span className="stat-card-value">2,543</span>
            <span className="stat-card-trend up">
              <TrendingUp size={12} />
              <span>+12.5%</span>
            </span>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="stat-card-item">
          <div className="stat-card-icon-box" style={{ backgroundColor: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
            <BookOpen size={18} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label">Total Courses</span>
            <span className="stat-card-value">128</span>
            <span className="stat-card-trend up">
              <TrendingUp size={12} />
              <span>+8.3%</span>
            </span>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="stat-card-item">
          <div className="stat-card-icon-box" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
            <Video size={18} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label">Live Classes</span>
            <span className="stat-card-value">{classes.length}</span>
            <span className="stat-card-trend up">
              <TrendingUp size={12} />
              <span>+14.2%</span>
            </span>
          </div>
        </div>

        {/* Stat 4 */}
        <div className="stat-card-item">
          <div className="stat-card-icon-box" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
            <CreditCard size={18} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label">Enrollments</span>
            <span className="stat-card-value">3,562</span>
            <span className="stat-card-trend up">
              <TrendingUp size={12} />
              <span>+15.7%</span>
            </span>
          </div>
        </div>

        {/* Stat 5 */}
        <div className="stat-card-item">
          <div className="stat-card-icon-box" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
            <DollarSign size={18} />
          </div>
          <div className="stat-card-details">
            <span className="stat-card-label">Total Revenue</span>
            <span className="stat-card-value">$12,450</span>
            <span className="stat-card-trend up">
              <TrendingUp size={12} />
              <span>+20.6%</span>
            </span>
          </div>
        </div>
      </div>

      {/* 3. Grid Row 2: Overview Curve Line Graph + Course Status Donut + Upcoming List */}
      <div className="chart-card-grid">
        {/* Curved Line Chart */}
        <div className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>Overview</span>
            <select style={{ padding: '4px 8px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="chart-container" style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <EnrollmentsRevenueChart />
          </div>
        </div>

        {/* Donut Chart */}
        <div className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>Course Status</span>
            <button 
              onClick={() => setActiveTab('courses')}
              className="section-link click-press"
              style={{ fontSize: '12px' }}
            >
              View all
            </button>
          </div>
          <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <CourseStatusDonutChart />
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>Upcoming Classes</span>
            <button 
              onClick={() => setActiveTab('live-classes')}
              className="section-link click-press"
              style={{ fontSize: '12px' }}
            >
              View all
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {upcomingAdminClasses.map((cls) => (
              <div key={cls.id} className="admin-class-row">
                <div className="admin-class-left">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200" 
                    className="instructor-avatar" 
                    alt="Instructor" 
                  />
                  <div>
                    <span className="admin-class-title">{cls.title}</span>
                    <p className="admin-class-meta">
                      {cls.teacher} • {cls.time}{cls.ampm}
                    </p>
                  </div>
                </div>
                
                {cls.isLive ? (
                  <span className="live-indicator-pill">Live</span>
                ) : (
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Scheduled</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Grid Row 3: Recent Enrollments Table + Sparklines Analytics Overview + Quick Actions */}
      <div className="table-card-grid">
        {/* Recent Enrollments Table */}
        <div className="smart-card" style={{ gridColumn: 'span 1' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>Recent Enrollments</span>
            <button 
              onClick={() => setActiveTab('enrollments')}
              className="section-link click-press"
              style={{ fontSize: '12px' }}
            >
              View all
            </button>
          </div>

          <div className="smart-table-wrapper">
            <table className="smart-table">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Enrolled On</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td td="true">
                      <div className="student-table-profile">
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>
                          {student.avatar}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <span className="student-table-name">{student.name}</span>
                          <p className="student-table-email">{student.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>{student.course}</td>
                    <td>{student.enrolledOn}</td>
                    <td style={{ fontWeight: 600 }}>{student.amount}</td>
                    <td>
                      <span className={`status-pill ${student.status === 'Completed' ? 'success' : 'pending'}`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Sparklines Panel */}
        <div className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>Analytics Overview</span>
            <button 
              onClick={() => setActiveTab('analytics')}
              className="section-link click-press"
              style={{ fontSize: '12px' }}
            >
              View report
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
            {/* Sparkline Item 1 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Active Students</span>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>1,856</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkline color="#10b981" isPositive={true} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--status-success)' }}>+11.4%</span>
              </div>
            </div>

            {/* Sparkline Item 2 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Course Completion Rate</span>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>68.4%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkline color="#10b981" isPositive={true} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--status-success)' }}>+6.7%</span>
              </div>
            </div>

            {/* Sparkline Item 3 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Average Quiz Score</span>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>72.6%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkline color="#ef4444" isPositive={false} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--status-danger)' }}>-3.2%</span>
              </div>
            </div>

            {/* Sparkline Item 4 */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block' }}>Attendance Rate</span>
                <span style={{ fontSize: '16px', fontWeight: 700 }}>85.3%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkline color="#10b981" isPositive={true} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--status-success)' }}>+8.1%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <span style={{ fontSize: '15px', fontWeight: 700, textAlign: 'left' }}>Quick Actions</span>
          
          <div className="quick-actions-grid" style={{ flex: 1 }}>
            <button onClick={() => setActiveTab('courses')} className="quick-action-btn click-press">
              <PlusCircle size={18} />
              <span>Add Course</span>
            </button>

            <button onClick={() => setActiveTab('live-classes')} className="quick-action-btn click-press">
              <Video size={18} />
              <span>Schedule Class</span>
            </button>

            <button onClick={() => setActiveTab('quizzes')} className="quick-action-btn click-press">
              <HelpCircle size={18} />
              <span>Add Quiz</span>
            </button>

            <button onClick={() => setActiveTab('announcements')} className="quick-action-btn click-press">
              <Volume2 size={18} />
              <span>Send Alert</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
