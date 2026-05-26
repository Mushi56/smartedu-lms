import React from 'react';
import { Flame, BookOpen, AlertCircle, Video, Play, ArrowRight } from 'lucide-react';
import CourseCard from '../../components/CourseCard';

export default function Dashboard({ courses, classes, streak, overallProgress, setActiveTab, onSelectCourse }) {
  // Filter for courses with active progress
  const activeCourses = courses.filter(c => c.progress > 0).slice(0, 3);
  
  // Filter live classes for today
  const todayClasses = classes.filter(c => c.dateLabel === 'Today').slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* 1. Purple gradient welcome banner with dynamic vector graphics */}
      <div className="welcome-banner">
        <div className="banner-left">
          <h2>Welcome back, Arjun! 👋</h2>
          <p>Let's continue your learning journey. You're on a {streak} day learning streak. Keep it up!</p>
          
          <div className="banner-stats">
            <div className="banner-stat-badge interactive">
              <Flame size={16} fill="#ff8a00" stroke="#ff8a00" />
              <span>{streak} Day Streak</span>
            </div>
            <div className="banner-stat-badge interactive" onClick={() => setActiveTab('courses')} style={{ cursor: 'pointer' }}>
              <BookOpen size={16} style={{ color: '#fff' }} />
              <span>12 Courses Enrolled</span>
            </div>
            <div className="banner-stat-badge interactive" onClick={() => setActiveTab('progress')} style={{ cursor: 'pointer' }}>
              {/* Dynamic progress circle outline */}
              <svg width="20" height="20" viewBox="0 0 20 20" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="10" cy="10" r="8" stroke="rgba(255,255,255,0.2)" strokeWidth="2.5" fill="none" />
                <circle cx="10" cy="10" r="8" stroke="#fff" strokeWidth="2.5" fill="none" strokeDasharray="50" strokeDashoffset={50 - (50 * overallProgress) / 100} />
              </svg>
              <span>{overallProgress}% Overall Progress</span>
            </div>
          </div>
        </div>

        {/* Beautiful vector illustration of a student studying */}
        <div className="banner-right">
          <svg className="vector-illustration" viewBox="0 0 200 160" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Backdrop circles */}
            <circle cx="130" cy="90" r="60" fill="rgba(255, 255, 255, 0.08)" />
            <circle cx="140" cy="70" r="35" fill="rgba(255, 255, 255, 0.06)" />
            
            {/* Table */}
            <rect x="50" y="125" width="130" height="8" rx="4" fill="#6c5dd3" opacity="0.3" />
            
            {/* Computer */}
            <rect x="100" y="85" width="45" height="30" rx="3" fill="#ffffff" stroke="#7c3aed" strokeWidth="2" />
            <line x1="100" y1="110" x2="145" y2="110" stroke="#7c3aed" strokeWidth="2" />
            <path d="M90 120H155L145 125H100L90 120Z" fill="#eaedf5" stroke="#7c3aed" strokeWidth="2" />
            
            {/* Human body and head */}
            <path d="M140 125C140 100 165 95 165 95C165 95 180 115 180 125" fill="#f3f4f6" stroke="#4f46e5" strokeWidth="2" />
            <rect x="155" y="100" width="20" height="25" rx="4" fill="#a78bfa" />
            <circle cx="165" cy="85" r="12" fill="#ffd0a7" stroke="#4f46e5" strokeWidth="2" />
            
            {/* Glasses */}
            <rect x="157" y="82" width="6" height="5" rx="1" stroke="#4f46e5" strokeWidth="1.5" />
            <rect x="165" y="82" width="6" height="5" rx="1" stroke="#4f46e5" strokeWidth="1.5" />
            <line x1="163" y1="84" x2="165" y2="84" stroke="#4f46e5" strokeWidth="1.5" />
            
            {/* Hair */}
            <path d="M153 82C153 78 158 75 165 75C172 75 177 78 177 82V85H153V82Z" fill="#312e81" />
            
            {/* Floating learning symbols */}
            <g transform="translate(40, 40)" opacity="0.8">
              <circle cx="10" cy="10" r="10" fill="#7c3aed" />
              <path d="M8 6L14 10L8 14V6Z" fill="white" />
            </g>
            <g transform="translate(85, 30)" opacity="0.8">
              <circle cx="8" cy="8" r="8" fill="#10b981" />
              <text x="8" y="11" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">AI</text>
            </g>
            <g transform="translate(150, 25)" opacity="0.8">
              <circle cx="8" cy="8" r="8" fill="#f59e0b" />
              <path d="M5 8H11M8 5V11" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </g>
          </svg>
        </div>
      </div>

      {/* 2. Continue Learning Cards Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="section-header">
          <span className="section-title">Continue Learning</span>
          <button onClick={() => setActiveTab('courses')} className="section-link click-press">
            View all
          </button>
        </div>
        <div className="course-grid">
          {activeCourses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onSelectCourse={onSelectCourse} 
            />
          ))}
        </div>
      </div>

      {/* 3. Upcoming Classes List Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="section-header">
          <span className="section-title">Upcoming Classes</span>
          <button onClick={() => setActiveTab('schedule')} className="section-link click-press">
            View full schedule
          </button>
        </div>
        
        {todayClasses.length === 0 ? (
          <div className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', color: 'var(--text-secondary)' }}>
            <AlertCircle size={18} />
            <span style={{ fontSize: '13px' }}>No live classes scheduled for today. Check the full schedule for future classes.</span>
          </div>
        ) : (
          <div className="upcoming-classes-list">
            {todayClasses.map((cls) => (
              <div key={cls.id} className="upcoming-class-row animate-fade-in">
                <div className="class-time-block">
                  <span className="class-time">{cls.time}</span>
                  <span className="class-ampm">{cls.ampm}</span>
                </div>
                
                <div className="class-info-block">
                  <span className="class-title">{cls.title}</span>
                  <span className="class-instructor">{cls.teacher}</span>
                </div>
                
                <div className="class-date-tag">Today</div>
                
                <button 
                  onClick={() => onSelectCourse(cls.courseId)}
                  className="join-live-btn click-press"
                >
                  Join Live
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
