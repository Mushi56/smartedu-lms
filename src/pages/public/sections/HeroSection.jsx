import React from 'react';
import { ArrowRight, Star, Play, CheckCircle, Award, BookOpen, Layers, Users, FileText, Activity } from 'lucide-react';

export default function HeroSection({ onGetStarted }) {
  return (
    <section style={{ 
      padding: '140px 8% 100px', 
      background: 'linear-gradient(180deg, #3A2048 0%, #291435 90%, #ffffff 90%, #ffffff 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative ambient glowing orbs */}
      <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(202, 186, 97, 0.08)', filter: 'blur(100px)', zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '20%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255, 201, 47, 0.06)', filter: 'blur(120px)', zIndex: 0 }}></div>

      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        display: 'grid', 
        gridTemplateColumns: '1fr 1.1fr', 
        gap: '40px',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }} className="responsive-hero-grid">
        
        {/* LEFT COLUMN: CALL TO ACTION */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left', color: '#ffffff' }}>
          
          {/* Main Title Heading */}
          <h1 style={{ 
            fontSize: '56px', 
            fontWeight: 800, 
            lineHeight: 1.1, 
            letterSpacing: '-1.5px',
            color: '#ffffff'
          }}>
            Pass the Exam <br />
            That <span style={{ color: '#FFC92F', borderBottom: '3px solid #FFC92F', paddingBottom: '2px' }}>Matters Most</span>
          </h1>

          {/* Subtitle Description */}
          <p style={{ 
            fontSize: '16px', 
            color: 'rgba(255, 255, 255, 0.75)', 
            lineHeight: 1.6, 
            maxWidth: '540px',
            fontWeight: 400
          }}>
            Connect with experienced instructors, join live classes, access quality study materials, and prepare confidently for scholarships, university admissions, and professional certifications.
          </p>

          {/* Buttons Group */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', marginTop: '10px' }}>
            <button 
              onClick={onGetStarted}
              className="click-press"
              style={{
                padding: '16px 32px',
                backgroundColor: '#FFC92F',
                color: '#1a0a26',
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 8px 24px rgba(255, 201, 47, 0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>Find a Teacher</span>
              <ArrowRight size={16} />
            </button>
            
            <button 
              className="click-press"
              style={{
                padding: '16px 32px',
                backgroundColor: 'transparent',
                color: '#ffffff',
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '2px solid rgba(255, 255, 255, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <span>Browse Courses</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Social Proof stats row */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px', 
            marginTop: '28px', 
            paddingTop: '24px', 
            borderTop: '1px solid rgba(255,255,255,0.1)',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ display: 'flex', marginRight: '8px' }}>
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=64&h=64" alt="Student" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #3A2048', marginLeft: '0px' }} />
                <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=64&h=64" alt="Student" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #3A2048', marginLeft: '-12px' }} />
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" alt="Student" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #3A2048', marginLeft: '-12px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', lineHeight: '1.1' }}>25,000+</span>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Students Worldwide</span>
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', lineHeight: '1.1' }}>1,200+</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Expert Teachers</span>
            </div>

            <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>

            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <span style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff', lineHeight: '1.1' }}>98%</span>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>Success Rate</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HIGH FIDELITY STUDENT DASHBOARD MOCKUP */}
        <div style={{ position: 'relative', width: '100%' }}>
          <div style={{ 
            background: 'var(--bg-card)',
            borderRadius: '16px',
            boxShadow: '0 30px 70px rgba(10, 5, 20, 0.3)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            overflow: 'hidden',
            width: '100%',
            height: '460px',
            textAlign: 'left',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px'
          }}>
            {/* Sidebar element */}
            <div style={{ 
              width: '54px', 
              background: '#fafafb', 
              borderRight: '1px solid #ededf0', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              padding: '16px 0',
              gap: '20px'
            }}>
              {/* Profile Avatar Spot */}
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#eaeaea', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=64&h=64" style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Sarah Avatar" />
              </div>
              {/* Sidebar Mini Nav Icons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center', color: '#888' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Layers size={13} />
                </div>
                <BookOpen size={13} />
                <Play size={13} />
                <Users size={13} />
                <FileText size={13} />
                <Activity size={13} />
              </div>
            </div>

            {/* Dashboard Workspace */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8f8fb' }}>
              {/* Inner Dashboard Header */}
              <div style={{ 
                height: '52px', 
                background: '#ffffff', 
                borderBottom: '1px solid #ededf0', 
                padding: '0 20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Welcome back, Sarah! 👋
                  </h3>
                  <p style={{ fontSize: '9px', color: 'var(--text-secondary)', margin: 0 }}>Let's continue your learning journey!</p>
                </div>
                
                {/* Top header controls */}
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', background: '#fff' }}>
                    <Star size={11} />
                  </div>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#666', background: '#fff' }}>
                    <Award size={11} />
                  </div>
                </div>
              </div>

              {/* Work space scrolling block */}
              <div style={{ 
                padding: '16px', 
                display: 'grid', 
                gridTemplateColumns: '1.2fr 1fr', 
                gap: '12px', 
                overflowY: 'auto',
                height: 'calc(100% - 52px)'
              }}>
                
                {/* LEFT INNER COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Course Progress Card */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '12px', 
                    padding: '14px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    border: '1px solid #ededf0'
                  }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>Course Progress</h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {/* Circular Gauge */}
                      <div style={{ position: 'relative', width: '56px', height: '56px', flexShrink: 0 }}>
                        <svg width="56" height="56" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#f3f4f6"
                            strokeWidth="3.5"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#10b981"
                            strokeWidth="3.5"
                            strokeDasharray="78, 100"
                          />
                        </svg>
                        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)' }}>
                          78%
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1, fontSize: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                          <span>Completed Lessons</span>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>32</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                          <span>In Progress</span>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>8</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#666' }}>
                          <span>Remaining Lessons</span>
                          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>12</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Learning Activity Line Chart */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '12px', 
                    padding: '12px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    border: '1px solid #ededf0',
                    position: 'relative'
                  }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '8px', color: 'var(--text-primary)' }}>Learning Activity</h4>
                    
                    {/* SVG Line Graph */}
                    <div style={{ height: '70px', position: 'relative', width: '100%' }}>
                      <svg width="100%" height="100%" viewBox="0 0 120 60" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="glowGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25"/>
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <path d="M 0 50 Q 15 35 30 45 T 60 25 T 90 15 T 120 30" fill="none" stroke="#7c3aed" strokeWidth="2.5" />
                        <path d="M 0 50 Q 15 35 30 45 T 60 25 T 90 15 T 120 30 L 120 60 L 0 60 Z" fill="url(#glowGrad)" />
                        <circle cx="90" cy="15" r="3.5" fill="#7c3aed" stroke="#ffffff" strokeWidth="1" />
                      </svg>
                      {/* Floating Activity Tooltip */}
                      <div style={{
                        position: 'absolute', top: '2px', left: '68%',
                        padding: '4px 6px', background: '#3A2048', color: '#ffffff',
                        borderRadius: '4px', fontSize: '9px', fontWeight: 700,
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)', whiteSpace: 'nowrap'
                      }}>
                        14.5 Hrs
                      </div>
                    </div>
                  </div>

                  {/* Course Enrollments */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div style={{ padding: '10px 14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #ededf0', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-color)' }}>24</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Active Courses</div>
                    </div>
                    <div style={{ padding: '10px 14px', background: '#ffffff', borderRadius: '10px', border: '1px solid #ededf0', textAlign: 'center' }}>
                      <div style={{ fontSize: '18px', fontWeight: 800, color: '#10b981' }}>8</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Completed</div>
                    </div>
                  </div>
                </div>

                {/* RIGHT INNER COLUMN */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Upcoming Live Classes */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '12px', 
                    padding: '14px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    border: '1px solid #ededf0'
                  }}>
                    <h4 style={{ fontSize: '11px', fontWeight: 700, marginBottom: '10px', color: 'var(--text-primary)' }}>Upcoming Live Classes</h4>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {[
                        { title: 'SAT Math Mastery', time: 'Today, 6:00 PM' },
                        { title: 'IELTS Speaking', time: 'Tomorrow, 4:30 PM' },
                        { title: 'University Essay', time: 'May 15, 7:00 PM' }
                      ].map((cls, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyItems: 'space-between', gap: '8px', paddingBottom: '6px', borderBottom: idx < 2 ? '1px solid #f1f2f5' : 'none' }}>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontWeight: 700, margin: 0, color: 'var(--text-primary)', fontSize: '10px' }}>{cls.title}</p>
                            <p style={{ margin: 0, color: '#888', fontSize: '9px' }}>{cls.time}</p>
                          </div>
                          <button style={{ padding: '4px 10px', background: 'var(--primary-glow)', color: 'var(--primary-color)', border: 'none', borderRadius: '12px', fontWeight: 700, fontSize: '9px', cursor: 'pointer' }}>
                            Join
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Featured Teacher */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '12px', 
                    padding: '12px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    border: '1px solid #ededf0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=64&h=64" style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} alt="Dr Ahmed" />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, margin: '0 0 2px 0', color: 'var(--text-primary)', fontSize: '10px' }}>Dr. Ahmed Al-Hassan</p>
                      <p style={{ margin: '0 0 2px 0', color: '#666', fontSize: '9px' }}>SAT & ACT Expert</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#FFC92F' }}>
                        <Star size={9} fill="currentColor" />
                        <span style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 600 }}>4.8 (320)</span>
                      </div>
                    </div>
                  </div>

                  {/* Recent Resources */}
                  <div style={{ 
                    background: '#ffffff', 
                    borderRadius: '12px', 
                    padding: '12px', 
                    boxShadow: '0 2px 10px rgba(0,0,0,0.02)',
                    border: '1px solid #ededf0'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Recent Resources</h4>
                      <a href="#" style={{ fontSize: '9px', fontWeight: 700, color: 'var(--primary-color)', textDecoration: 'none' }}>View All</a>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {[
                        { title: 'SAT Math Formula Sheet', size: 'PDF - 2.4 MB' },
                        { title: 'IELTS Writing Samples', size: 'PDF - 3.2 MB' },
                        { title: 'Essay Writing Audio', size: 'MP3 - 5.1 MB' }
                      ].map((res, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '4px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', flexShrink: 0 }}>
                            <FileText size={11} />
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{ fontWeight: 600, margin: 0, color: 'var(--text-primary)', fontSize: '9px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{res.title}</p>
                            <p style={{ margin: 0, color: '#888', fontSize: '8px' }}>{res.size}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
