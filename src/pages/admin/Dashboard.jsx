import React, { useState } from 'react';
import { 
  Users, BookOpen, Video, CreditCard, DollarSign, Calendar, TrendingUp,
  UserPlus, Star, ArrowRight, Activity, PlusCircle, CheckCircle, HelpCircle
} from 'lucide-react';

export default function Dashboard({ courses, classes, students, setActiveTab }) {
  const [analyticsMonth, setAnalyticsMonth] = useState('This Month');
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Hardcoded values to match mockup exact states
  const totalStudents = "25,680";
  const totalTeachers = "1,248";
  const totalCourses = "2,324";
  const totalRevenue = "$248,750";

  const registrations = [
    { name: "Sara Ahmed", email: "sara.ahmed@example.com", role: "Student", time: "2 min ago", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
    { name: "Mohammed Ali", email: "mohammed.ali@example.com", role: "Student", time: "15 min ago", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
    { name: "Fatima Zahra", email: "fatima.zahra@example.com", role: "Student", time: "32 min ago", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
    { name: "Omar Hassan", email: "omar.hassan@example.com", role: "Student", time: "1 hr ago", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" },
    { name: "James Wilson", email: "james.wilson@example.com", role: "Teacher", time: "2 hr ago", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" }
  ];

  const topCourses = [
    { title: "SAT Math Mastery", enrollments: "4,250", price: "$59", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" },
    { title: "IELTS Speaking Success", enrollments: "3,860", price: "$49", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
    { title: "TOEFL iBT Complete Guide", enrollments: "3,210", price: "$54", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100" },
    { title: "GRE Quantitative Reasoning", enrollments: "2,980", price: "$59", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
    { title: "Essay Writing Excellence", enrollments: "2,450", price: "$49", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" }
  ];

  const activities = [
    { text: 'New course "Digital Marketing Mastery" created', meta: 'By Sarah Johnson', time: '10 min ago', color: '#a855f7', bg: 'rgba(168,85,247,0.1)' },
    { text: 'Payment received from Omar Hassan', meta: 'Amount: $59', time: '1 hr ago', color: '#22c55e', bg: 'rgba(34,197,94,0.1)' },
    { text: 'New teacher James Wilson joined', meta: 'Teacher ID: #T-9824', time: '2 hr ago', color: '#f97316', bg: 'rgba(249,115,22,0.1)' },
    { text: 'Live class "IELTS Writing" started', meta: 'By Fatima Al-Zahra', time: '3 hr ago', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
    { text: 'New review for "SAT Math Mastery"', meta: 'By Aisha Rahman', time: '5 hr ago', color: '#eab308', bg: 'rgba(234,179,8,0.1)' }
  ];

  const countryStats = [
    { label: 'United States', percent: '38%', count: 38, color: '#3A2048', strokeDash: '119 314', strokeOffset: '0' },
    { label: 'Saudi Arabia', percent: '22%', count: 22, color: '#CABA61', strokeDash: '69 314', strokeOffset: '-119' },
    { label: 'Egypt', percent: '15%', count: 15, color: '#FFC92F', strokeDash: '47 314', strokeOffset: '-188' },
    { label: 'India', percent: '10%', count: 10, color: '#0E7C7B', strokeDash: '31 314', strokeOffset: '-235' },
    { label: 'Others', percent: '15%', count: 15, color: '#94a3b8', strokeDash: '47 314', strokeOffset: '-266' }
  ];

  // SVG curved line chart coordinate calculation
  const days = ['May 1', 'May 6', 'May 11', 'May 16', 'May 21', 'May 26', 'May 31'];
  const studentsCoordsY = [120, 140, 110, 130, 90, 80, 100];
  const revenueCoordsY = [150, 160, 140, 150, 120, 130, 110];

  const getBezierPath = (yCoords) => {
    let path = `M 50,${yCoords[0]}`;
    for (let i = 0; i < yCoords.length - 1; i++) {
      const x1 = 50 + i * 80;
      const y1 = yCoords[i];
      const x2 = 50 + (i + 1) * 80;
      const y2 = yCoords[i + 1];
      const cx1 = x1 + 40;
      const cy1 = y1;
      const cx2 = x2 - 40;
      const cy2 = y2;
      path += ` C ${cx1},${cy1} ${cx2},${cy2} ${x2},${y2}`;
    }
    return path;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
      
      {/* SECTION 1: Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        
        {/* Total Students */}
        <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'rgba(58, 32, 72, 0.08)', color: '#3A2048', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Students</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0' }}>{totalStudents}</span>
            <span style={{ fontSize: '11px', color: '#2BA84A', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <TrendingUp size={12} />
              12.5% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>vs last month</span>
            </span>
          </div>
        </div>

        {/* Total Teachers */}
        <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'rgba(202, 186, 97, 0.15)', color: '#CABA61', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Users size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Teachers</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0' }}>{totalTeachers}</span>
            <span style={{ fontSize: '11px', color: '#2BA84A', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <TrendingUp size={12} />
              8.3% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>vs last month</span>
            </span>
          </div>
        </div>

        {/* Total Courses */}
        <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'rgba(14, 124, 123, 0.08)', color: '#0E7C7B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BookOpen size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Courses</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0' }}>{totalCourses}</span>
            <span style={{ fontSize: '11px', color: '#2BA84A', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <TrendingUp size={12} />
              10.7% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>vs last month</span>
            </span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px' }}>
          <div style={{ width: '46px', height: '46px', borderRadius: '12px', backgroundColor: 'rgba(43, 168, 74, 0.08)', color: '#2BA84A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DollarSign size={22} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Revenue</span>
            <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0' }}>{totalRevenue}</span>
            <span style={{ fontSize: '11px', color: '#2BA84A', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <TrendingUp size={12} />
              15.4% <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>vs last month</span>
            </span>
          </div>
        </div>

      </div>

      {/* SECTION 2: Line Chart & Donut Chart */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Line Chart */}
        <div className="smart-card" style={{ flex: '2 1 500px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Analytics Overview</h3>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', fontSize: '11px', fontWeight: 600 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#6366f1' }}></span>
                  Students
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--secondary-color)' }}></span>
                  Revenue
                </div>
              </div>
              <select 
                value={analyticsMonth} 
                onChange={(e) => setAnalyticsMonth(e.target.value)}
                style={{ padding: '4px 10px', fontSize: '11px', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: '#ffffff' }}
              >
                <option>This Month</option>
                <option>Last Month</option>
              </select>
            </div>
          </div>

          <div style={{ flex: 1, minHeight: '180px', position: 'relative' }}>
            {/* Custom SVG Line Chart */}
            <svg viewBox="0 0 580 180" width="100%" height="100%">
              {/* Horizontal grid lines */}
              <line x1="40" y1="40" x2="540" y2="40" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="80" x2="540" y2="80" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="120" x2="540" y2="120" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="40" y1="150" x2="540" y2="150" stroke="var(--border-color)" strokeWidth="1" />

              {/* Curves */}
              <path d={getBezierPath(studentsCoordsY)} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
              <path d={getBezierPath(revenueCoordsY)} fill="none" stroke="var(--secondary-color)" strokeWidth="3" strokeLinecap="round" />

              {/* Grid dots and Interaction anchors */}
              {studentsCoordsY.map((sy, idx) => {
                const x = 50 + idx * 80;
                const ry = revenueCoordsY[idx];
                const isHovered = hoveredIdx === idx;
                return (
                  <g key={idx} onMouseEnter={() => setHoveredIdx(idx)} onMouseLeave={() => setHoveredIdx(null)} style={{ cursor: 'pointer' }}>
                    {isHovered && (
                      <line x1={x} y1="30" x2={x} y2="150" stroke="#3A2048" strokeOpacity="0.15" strokeWidth="1.5" />
                    )}
                    <circle cx={x} cy={sy} r={isHovered ? 6 : 4} fill="#6366f1" stroke="#ffffff" strokeWidth="2" />
                    <circle cx={x} cy={ry} r={isHovered ? 6 : 4} fill="var(--secondary-color)" stroke="#ffffff" strokeWidth="2" />
                  </g>
                );
              })}

              {/* X Axis labels */}
              {days.map((day, idx) => (
                <text key={idx} x={50 + idx * 80} y="170" fill="var(--text-muted)" fontSize="9" fontWeight="600" textAnchor="middle">
                  {day}
                </text>
              ))}
            </svg>

            {/* Hover Tooltip */}
            {hoveredIdx !== null && (
              <div style={{
                position: 'absolute',
                left: `${40 + hoveredIdx * 70}px`,
                top: '10px',
                backgroundColor: '#ffffff',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                fontSize: '11px',
                border: '1px solid var(--border-color)',
                zIndex: 10
              }}>
                <span style={{ fontWeight: 700, display: 'block', marginBottom: '4px' }}>{days[hoveredIdx]}, 2026</span>
                <span style={{ color: '#6366f1', display: 'block', fontWeight: 600 }}>Students: {Math.round(25000 - studentsCoordsY[hoveredIdx] * 70)}</span>
                <span style={{ color: 'var(--secondary-color)', display: 'block', fontWeight: 600 }}>Revenue: ${Math.round(250000 - revenueCoordsY[hoveredIdx] * 700)}</span>
              </div>
            )}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="smart-card" style={{ flex: '1 1 250px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Students by Country</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ position: 'relative', width: '110px', height: '110px' }}>
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', width: '100%', height: '100%' }}>
                {countryStats.map((seg, idx) => (
                  <circle
                    key={idx}
                    cx="60"
                    cy="60"
                    r="50"
                    fill="transparent"
                    stroke={seg.color}
                    strokeWidth="10"
                    strokeDasharray={seg.strokeDash}
                    strokeDashoffset={seg.strokeOffset}
                    strokeLinecap="round"
                  />
                ))}
              </svg>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>25K</span>
                <span style={{ fontSize: '8px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Enrolled</span>
              </div>
            </div>

            {/* Legends list */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
              {countryStats.map((seg, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: seg.color }}></span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{seg.label}</span>
                  </div>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{seg.percent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Recent Registrations & Top Courses */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Recent Registrations */}
        <div className="smart-card" style={{ flex: '1.2 1 400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Recent Registrations</h3>
            <button onClick={() => setActiveTab('students')} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-color)' }}>View All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {registrations.map((user, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx !== registrations.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{user.name}</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{user.email}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    padding: '3px 8px',
                    borderRadius: '10px',
                    backgroundColor: user.role === 'Teacher' ? 'rgba(249,115,22,0.1)' : 'rgba(58,32,72,0.06)',
                    color: user.role === 'Teacher' ? '#f97316' : '#3A2048',
                    display: 'inline-block',
                    marginBottom: '2px'
                  }}>{user.role}</span>
                  <p style={{ fontSize: '9px', color: 'var(--text-muted)', margin: 0 }}>{user.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Courses */}
        <div className="smart-card" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Top Courses</h3>
            <button onClick={() => setActiveTab('courses')} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-color)' }}>View All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {topCourses.map((course, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: idx !== topCourses.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img 
                    src={course.avatar} 
                    alt={course.title} 
                    style={{ width: '38px', height: '38px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{course.title}</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Enrollments: {course.enrollments}</span>
                  </div>
                </div>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{course.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 4: Revenue Overview & Platform Activity */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Revenue Overview (Bar Chart) */}
        <div className="smart-card" style={{ flex: '1.2 1 400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Revenue Overview</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>$248,750</span>
                <span style={{ fontSize: '11px', color: '#2BA84A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '2px' }}>
                  <TrendingUp size={10} />
                  +15.4%
                </span>
              </div>
            </div>
            <button style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-color)' }}>View Report</button>
          </div>

          {/* Vertical Bar Chart SVG */}
          <div style={{ flex: 1, minHeight: '120px', display: 'flex', alignItems: 'flex-end', paddingTop: '10px' }}>
            <svg viewBox="0 0 450 120" width="100%" height="100%">
              {/* Grid lines */}
              <line x1="0" y1="30" x2="450" y2="30" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="0" y1="70" x2="450" y2="70" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3 3" />
              <line x1="0" y1="110" x2="450" y2="110" stroke="var(--border-color)" strokeWidth="1" />

              {/* Bars */}
              {[45, 60, 35, 70, 85, 50, 40, 95, 80, 55, 75, 90, 60, 85, 45, 70, 95, 30, 65, 80, 50, 75, 90].map((h, idx) => (
                <rect 
                  key={idx}
                  x={12 + idx * 18}
                  y={110 - h}
                  width="10"
                  height={h}
                  fill="rgba(58, 32, 72, 0.75)"
                  rx="3"
                  style={{ transition: 'height 0.3s ease' }}
                />
              ))}

              {/* Labels */}
              <text x="12" y="119" fill="var(--text-muted)" fontSize="8" fontWeight="600">May 1</text>
              <text x="210" y="119" fill="var(--text-muted)" fontSize="8" fontWeight="600" textAnchor="middle">May 16</text>
              <text x="410" y="119" fill="var(--text-muted)" fontSize="8" fontWeight="600" textAnchor="middle">May 31</text>
            </svg>
          </div>
        </div>

        {/* Platform Activity Logs */}
        <div className="smart-card" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Platform Activity</h3>
            <button style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-color)' }}>View All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {activities.map((act, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  backgroundColor: act.bg, 
                  color: act.color, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  <Activity size={13} />
                </div>
                
                <div style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ textAlign: 'left' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.3 }}>{act.text}</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{act.meta}</span>
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', flexShrink: 0, marginLeft: '12px' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
