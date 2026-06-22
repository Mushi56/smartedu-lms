import React from 'react';
import { Flame, Clock, BookOpen, Award, FileText, Play, CheckCircle, Calendar, Star, MessageSquare, Folder, Heart, ChevronRight } from 'lucide-react';

export default function Dashboard({ courses, classes, streak, overallProgress, setActiveTab, onSelectCourse }) {
  // Calculate stats dynamically from actual course and class list data
  const completedLessons = courses ? courses.reduce((sum, c) => sum + Math.round((c.progress / 100) * (c.chaptersCount || 10)), 0) : 12;
  const inProgressLessons = courses ? courses.filter(c => c.progress > 0 && c.progress < 100).length : 2;
  const totalChapters = courses ? courses.reduce((sum, c) => sum + (c.chaptersCount || 10), 0) : 30;
  const remainingLessons = Math.max(0, totalChapters - completedLessons);

  const scheduleList = classes && classes.length > 0
    ? classes.slice(0, 3).map(c => ({
        id: c.id,
        title: c.title,
        type: c.isLive ? 'Live Class' : 'Scheduled Class',
        time: `${c.time} ${c.ampm.toUpperCase()}`
      }))
    : [
        { id: 's1', title: 'SAT Math Live Practice', type: 'Live Class', time: '06:00 PM' },
        { id: 's2', title: 'IELTS Speaking Workshop', type: 'Scheduled Class', time: '08:00 PM' }
      ];

  const recentResources = [
    { id: 1, name: 'SAT Math Formula Sheet', type: 'PDF', size: '2.4 MB' },
    { id: 2, name: 'IELTS Writing Samples', type: 'PDF', size: '1.8 MB' },
    { id: 3, name: 'GRE Quant Formula Sheet', type: 'PDF', size: '1.2 MB' }
  ];

  const achievements = [
    { label: "Courses Enrolled", count: courses ? courses.length : 0, color: "#eab308", bg: "rgba(234, 179, 8, 0.1)" },
    { label: "Lessons Completed", count: completedLessons, color: "#f97316", bg: "rgba(249, 115, 22, 0.1)" },
    { label: "Assignments Done", count: courses ? courses.filter(c => c.progress > 15).length + 1 : 3, color: "#a855f7", bg: "rgba(168, 85, 247, 0.1)" },
    { label: "Certificates Earned", count: courses ? courses.filter(c => c.progress === 100).length : 0, color: "#CABA61", bg: "rgba(202, 186, 97, 0.1)" }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
      
      {/* ROW 1: Progress & Live Class */}
      <div className="dash-row-1" style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Overall Progress Card */}
        <div className="dash-progress-card" style={{
          flex: '1.8 1 500px',
          background: 'linear-gradient(135deg, #3A2048 0%, #1e0b29 100%)',
          color: '#ffffff',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 30px rgba(58, 32, 72, 0.15)',
          minHeight: '160px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {/* Custom circular SVG progress indicator */}
            <div style={{ width: '100px', height: '100px', flexShrink: 0 }}>
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="7" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="var(--secondary-color)" strokeWidth="7" fill="none"
                  strokeDasharray="251" strokeDashoffset={251 - (251 * overallProgress) / 100}
                  strokeLinecap="round" transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 0.5s ease' }} />
                <text x="50" y="46" textAnchor="middle" dominantBaseline="middle" fill="#ffffff" fontSize="18" fontWeight="800">{overallProgress}%</text>
                <text x="50" y="64" textAnchor="middle" dominantBaseline="middle" fill="rgba(255, 255, 255, 0.6)" fontSize="9" fontWeight="600">Keep going!</text>
              </svg>
            </div>

            {/* Progress breakdown stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div className="dash-stats-row" style={{ display: 'flex', gap: '40px' }}>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', display: 'block' }}>Completed Lessons</span>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>{completedLessons}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', display: 'block' }}>In Progress</span>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>{inProgressLessons}</span>
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', display: 'block' }}>Remaining Lessons</span>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>{remainingLessons}</span>
                </div>
              </div>
              <button 
                onClick={() => setActiveTab('progress')}
                style={{
                  alignSelf: 'flex-start',
                  marginTop: '8px',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  backgroundColor: 'transparent'
                }}
                className="hover-bg-app click-press"
              >
                View Progress
              </button>
            </div>
          </div>
          
          <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--secondary-color)', alignSelf: 'flex-start', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Overall Progress
          </div>
        </div>

        {/* Next Live Class Card */}
        <div className="smart-card" style={{
          flex: '1.2 1 300px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          minHeight: '160px',
          position: 'relative'
        }}>
          {/* Live Tag */}
          <span style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            backgroundColor: 'rgba(43, 168, 74, 0.1)',
            color: '#2BA84A',
            fontSize: '10px',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#2BA84A' }}></span>
            Live
          </span>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ paddingRight: '40px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>Next Live Class</span>
              <h3 style={{ fontSize: '15px', fontWeight: 700, margin: '4px 0 2px 0', color: 'var(--text-primary)' }}>
                {classes && classes.length > 0 ? classes[0].title : 'No Upcoming Classes'}
              </h3>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
                {classes && classes.length > 0 ? `Instructor: ${classes[0].teacher}` : 'Enroll in a course to see live classes'}
              </p>
            </div>
            
            <div style={{ width: '46px', height: '46px', borderRadius: '8px', background: 'rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={20} color="var(--text-muted)" />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '14px 0', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} />
              {classes && classes.length > 0 ? `${classes[0].time} ${classes[0].ampm.toUpperCase()}` : '--:--'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} />
              {classes && classes.length > 0 ? '60 mins' : '-- min'}
            </span>
          </div>

          <button 
            onClick={() => onSelectCourse(classes && classes.length > 0 ? classes[0].courseId : 'course-1')}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: 'var(--secondary-color)',
              color: '#1e1b4b',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '12px'
            }}
            className="click-press"
          >
            Join Class
          </button>
        </div>
      </div>

      {/* ROW 2: My Courses Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>My Courses</h3>
          <button onClick={() => setActiveTab('courses')} style={{ fontSize: '12px', fontWeight: 600, color: 'var(--primary-color)' }}>View All</button>
        </div>

        <div className="dash-courses-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
          {courses.slice(0, 4).map((course, idx) => {
            const avatars = [
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
            ];
            return (
              <div 
                key={course.id}
                onClick={() => onSelectCourse(course.id)}
                className="smart-card click-press"
                style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '240px', cursor: 'pointer' }}
              >
                {/* Image block */}
                <div style={{ position: 'relative', height: '120px', width: '100%', overflow: 'hidden', background: '#3A2048' }}>
                  <img 
                    src={avatars[idx % avatars.length]} 
                    alt={course.teacher} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', right: '8px', padding: '3px 8px', borderRadius: '4px', background: 'rgba(0,0,0,0.6)', color: '#ffffff', fontSize: '10px', fontWeight: 600 }}>
                    {course.chaptersCount} Lessons
                  </div>
                </div>

                {/* Details block */}
                <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px 0', lineHeight: 1.3 }}>{course.title}</h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>{course.teacher}</span>
                  
                  {/* Progress bar */}
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', borderRadius: '3px', backgroundColor: 'var(--border-color)', overflow: 'hidden' }}>
                      <div style={{ width: `${course.progress}%`, height: '100%', backgroundColor: 'var(--secondary-color)', borderRadius: '3px' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROW 3: Upcoming Schedule & Recent Resources */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Upcoming Schedule */}
        <div className="smart-card" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Upcoming Schedule</h3>
            <button onClick={() => setActiveTab('schedule')} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-color)' }}>View Calendar</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {scheduleList.map((item) => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(58, 32, 72, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={16} style={{ color: 'var(--primary-color)' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{item.title}</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{item.type}</span>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Resources */}
        <div className="smart-card" style={{ flex: '1 1 350px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Recent Resources</h3>
            <button onClick={() => setActiveTab('resources')} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-color)' }}>View All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentResources.map((res) => (
              <div key={res.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-app)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(239, 68, 68, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <FileText size={16} style={{ color: '#ef4444' }} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{res.name}</h4>
                    <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{res.type} &bull; {res.size}</span>
                  </div>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 4: Achievements & Study Streak */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Achievements Grid */}
        <div className="smart-card" style={{ flex: '1.2 1 400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Achievements</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '14px' }}>
            {achievements.map((item, idx) => (
              <div key={idx} style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '6px', backgroundColor: 'var(--bg-app)' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={16} style={{ color: item.color }} />
                </div>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{item.count}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Study Streak Card */}
        <div className="smart-card" style={{ flex: '1 1 300px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Study Streak</h3>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>Keep up the great work!</p>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', fontWeight: 700, fontSize: '14px' }}>
              <Flame size={18} fill="#f97316" stroke="#f97316" />
              14 Days
            </div>
          </div>

          {/* Weekly streak representation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '90px', marginTop: '12px' }}>
            {[
              { day: 'M', height: 40 },
              { day: 'T', height: 60 },
              { day: 'W', height: 30 },
              { day: 'T', height: 75 },
              { day: 'F', height: 50 },
              { day: 'S', height: 90 },
              { day: 'S', height: 65 }
            ].map((item, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1 }}>
                <div style={{
                  width: '12px',
                  height: `${item.height}px`,
                  backgroundColor: idx === 5 ? 'var(--secondary-color)' : 'rgba(202, 186, 97, 0.3)',
                  borderRadius: '4px',
                  transition: 'height 0.3s ease'
                }}></div>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ROW 5: Continue Watching & Your Mentors */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        
        {/* Continue Watching */}
        <div className="smart-card" style={{ flex: '1.2 1 400px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Continue Watching</h3>
            <button onClick={() => setActiveTab('courses')} style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-color)' }}>View All</button>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-app)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
              {/* Fake Video Thumbnail */}
              <div style={{ width: '80px', height: '50px', borderRadius: '6px', background: '#3A2048', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" 
                  alt="Video cover" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }}
                />
                <Play size={16} style={{ color: '#ffffff', position: 'absolute' }} fill="#ffffff" />
              </div>
              
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>Quadratic Equations - Problem Solving</h4>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>SAT Math Mastery</span>
                
                {/* Progress bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                  <div style={{ flex: 1, height: '4px', borderRadius: '2px', backgroundColor: 'var(--border-color)', overflow: 'hidden' }}>
                    <div style={{ width: '60%', height: '100%', backgroundColor: 'var(--secondary-color)' }}></div>
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-secondary)' }}>60%</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onSelectCourse('course-1')}
              style={{
                marginLeft: '16px',
                padding: '6px 14px',
                borderRadius: '6px',
                backgroundColor: 'rgba(58, 32, 72, 0.08)',
                color: 'var(--primary-color)',
                fontSize: '11px',
                fontWeight: 700
              }}
              className="click-press"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Your Mentors */}
        <div className="smart-card" style={{ flex: '1 1 300px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Your Mentors</h3>
            <button style={{ fontSize: '11px', fontWeight: 600, color: 'var(--primary-color)' }}>View All</button>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'var(--bg-app)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" 
                alt="Dr. Ahmed Al-Hassan" 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Dr. Ahmed Al-Hassan</h4>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>SAT &amp; ACT Expert</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                  <Star size={10} fill="#f59e0b" stroke="none" />
                  <span style={{ fontSize: '10px', fontWeight: 700, color: '#f59e0b' }}>4.9</span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>(210)</span>
                </div>
              </div>
            </div>

            <button 
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1.5px solid var(--primary-color)',
                color: 'var(--primary-color)',
                fontSize: '11px',
                fontWeight: 700,
                backgroundColor: 'transparent'
              }}
              className="click-press"
            >
              Message
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
