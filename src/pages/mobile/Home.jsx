import React, { useState } from 'react';
import { 
  Flame, Clock, Calendar, ChevronRight, Play, Star, BookOpen, Bell, Search, 
  SlidersHorizontal, MoreVertical, Plus, UserPlus, ShoppingBag, Send, 
  BarChart2, Shield, ChevronDown, Check, GraduationCap, DollarSign, Users, Award, User, Sparkles, Video
} from 'lucide-react';
import VerificationBadge from '../../components/VerificationBadge';

export default function Home({ db, user, currentPortal, onSelectCourse, onSelectLiveClass, onSelectTab, onOpenDrawer }) {
  const { courses = [], classes = [], streak = 14, overallProgress = 67 } = db;
  const isAdmin = currentPortal === 'admin' || currentPortal === 'super-admin';
  const isTeacher = currentPortal === 'teacher';

  // ----------------------------------------------------
  // STUDENT PORTAL HOMEPAGE DATA & STATES
  // ----------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  
  // Custom mock data for student cards matching screenshots
  const recommendedTeachers = [
    { name: 'Michael Johnson', title: 'UI/UX Designer', rating: '4.9', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100' },
    { name: 'Sarah Williams', title: 'Web Developer', rating: '4.8', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100' },
    { name: 'David Brown', title: 'Digital Marketer', rating: '4.7', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100' }
  ];

  // Map courses dynamically, injecting ratings/reviews/prices to match 100% of screenshot details
  const decoratedCourses = courses.map((c, index) => {
    const courseMockDetails = [
      { rating: '4.8', reviews: '1.2K', price: '$49.00' },
      { rating: '4.7', reviews: '980', price: '$59.00' },
      { rating: '4.6', reviews: '870', price: '$39.00' }
    ];
    const details = courseMockDetails[index % courseMockDetails.length];
    return {
      ...c,
      rating: c.rating || details.rating,
      reviewsCount: c.reviews || details.reviews,
      price: details.price
    };
  });

  // Find an in-progress course to showcase in "Continue Learning"
  const activeCourse = decoratedCourses.find(c => c.progress > 0 && c.progress < 100) || decoratedCourses[0];

  // ----------------------------------------------------
  // ADMIN PORTAL HOMEPAGE DATA & STATES
  // ----------------------------------------------------
  const adminMetrics = [
    { title: 'Total Students', value: '12,458', change: '↑ 12.5%', icon: Users, color: '#6366f1' },
    { title: 'Total Courses', value: '356', change: '↑ 8.3%', icon: BookOpen, color: '#10b981' },
    { title: 'Revenue', value: '$98,765', change: '↑ 15.7%', icon: DollarSign, color: '#3b82f6' },
    { title: 'Active Orders', value: '1,245', change: '↑ 9.4%', icon: ShoppingBag, color: '#f59e0b' }
  ];

  const pendingApprovals = [
    { id: 'pa-1', type: 'New Course', title: 'Advanced Python Programming', author: 'By John Smith', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100' },
    { id: 'pa-2', type: 'New Teacher', title: 'Emily Davis', author: 'Data Scientist', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100' },
    { id: 'pa-3', type: 'Course Update', title: 'UI/UX Design Masterclass', author: 'By Michael Johnson', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100' }
  ];

  const recentActivity = [
    { id: 'ra-1', type: 'order', title: 'New order #ORD-1256', sub: 'UI/UX Design Masterclass', time: 'May 23, 2025 10:24 AM', amount: '+$49.00', icon: ShoppingBag, bg: 'rgba(99, 102, 241, 0.08)', color: '#6366f1' },
    { id: 'ra-2', type: 'student', title: 'New student registered', sub: 'James Anderson', time: 'May 23, 2025 09:15 AM', icon: User, bg: 'rgba(107, 114, 128, 0.08)', color: '#6b7280' }
  ];

  const handleReviewAction = (pa) => {
    alert(`Opening review workspace for approval request:\n${pa.type}: ${pa.title}\nSubmitted by: ${pa.author}`);
  };

  const handleQuickAction = (action) => {
    if (action === 'Add Course') {
      onSelectTab('courses');
    } else if (action === 'Add Teacher') {
      onSelectTab('teachers');
    } else if (action === 'View Orders') {
      onSelectTab('orders');
    } else {
      alert(`Launching Quick Action: ${action}`);
    }
  };

  // Common styles
  const premiumCard = {
    background: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
    padding: '20px',
    border: '1px solid rgba(0,0,0,0.02)',
    position: 'relative'
  };

  // Render Student view
  if (!isAdmin && !isTeacher) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: '#f8fafc', margin: '-16px -16px 0 -16px' }} className="animate-fade-in">
        
        {/* PREMIUM PURPLE HEADER */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
          padding: '24px 20px 60px 20px',
          borderBottomLeftRadius: '32px',
          borderBottomRightRadius: '32px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 10px 30px rgba(79, 70, 229, 0.2)'
        }}>
          {/* Subtle bg glow */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '150px',
            height: '150px',
            background: 'radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(236,72,153,0) 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                Welcome back
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
                  {user?.name || 'Aisha Rahman'}
                </h2>
                <VerificationBadge status={user?.verificationStatus || user?.role} size={16} />
              </div>
            </div>
            
            <div style={{
              width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', 
              display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)',
              cursor: 'pointer'
            }} onClick={() => onSelectTab('profile')} className="click-press">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                <Bell size={20} style={{ color: '#fff' }} />
              )}
            </div>
          </div>
        </div>

        {/* FLOATING LEARNING GOAL CARD */}
        <div style={{ margin: '-40px 20px 0 20px', position: 'relative', zIndex: 10 }}>
          <div 
            onClick={() => onSelectTab('explore')}
            className="click-press"
            style={{ 
              ...premiumCard, 
              padding: '18px 20px',
              display: 'flex', 
              flexDirection: 'column', 
              gap: '14px',
              cursor: 'pointer'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '12px', 
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.1) 0%, rgba(236,72,153,0.1) 100%)', 
                  color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Award size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Learning Goal</span>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 0 0' }}>Complete UI/UX Design</h4>
                </div>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ flex: 1, height: '6px', backgroundColor: '#f1f5f9', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)', borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)' }}>65%</span>
            </div>
          </div>
        </div>

        {/* MAIN CONTENT ZONE */}
        <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

          {/* SEARCH BAR */}
          <div style={{ 
            display: 'flex', alignItems: 'center', background: '#fff', 
            borderRadius: '16px', padding: '12px 16px', gap: '12px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.03)'
          }}>
            <Search size={18} style={{ color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search courses, mentors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}
            />
            <button style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 0 }}>
              <SlidersHorizontal size={18} />
            </button>
          </div>

          {/* FEATURED COURSES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Featured Courses</h3>
              <button onClick={() => onSelectTab('explore')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>See All</button>
            </div>

            <div className="hide-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', margin: '0 -20px', paddingLeft: '20px', paddingRight: '20px' }}>
              {decoratedCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="click-press"
                  style={{ 
                    ...premiumCard, 
                    padding: '0', 
                    width: '220px', 
                    flexShrink: 0, 
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                >
                  <div style={{ position: 'relative', height: '130px', width: '100%' }}>
                    <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(255,255,255,0.9)', color: 'var(--text-primary)', fontSize: '10px', fontWeight: 800, padding: '4px 8px', borderRadius: '12px', backdropFilter: 'blur(4px)' }}>
                      {course.category}
                    </div>
                  </div>
                  <div style={{ padding: '16px' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 8px 0', lineHeight: 1.3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {course.title}
                    </h4>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>
                        <Star size={14} fill="#f59e0b" stroke="none" />
                        {course.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>({course.reviewsCount})</span>
                      </span>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--primary-color)' }}>{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CONTINUE LEARNING */}
          {activeCourse && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Continue Learning</h3>
              </div>

              <div 
                onClick={() => onSelectCourse(activeCourse)}
                className="click-press"
                style={{ 
                  ...premiumCard, 
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer'
                }}
              >
                <div style={{ width: '80px', height: '80px', borderRadius: '16px', overflow: 'hidden', position: 'relative', flexShrink: 0 }}>
                  <img src={activeCourse.thumbnail} alt={activeCourse.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.95)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={14} fill="var(--primary-color)" stroke="none" style={{ marginLeft: '2px' }} />
                    </div>
                  </div>
                </div>
                
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {activeCourse.title}
                  </h4>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>By {activeCourse.teacher || 'Instructor'}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                    <div style={{ flex: 1, height: '4px', backgroundColor: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${activeCourse.progress}%`, height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', flexShrink: 0 }}>
                      {activeCourse.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* UPCOMING LIVE CLASS */}
          {classes.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Upcoming Live Class</h3>
                <button onClick={() => onSelectTab('live-classes')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>See All</button>
              </div>

              <div style={{ 
                ...premiumCard, 
                padding: '18px', 
                background: 'linear-gradient(135deg, #fff 0%, #f8fafc 100%)',
                border: '1px solid rgba(99, 102, 241, 0.1)',
                borderLeft: '4px solid #ef4444'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 10px', borderRadius: '12px', alignSelf: 'flex-start' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                      <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: 800, letterSpacing: '0.5px' }}>LIVE SOON</span>
                    </div>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                      {classes[0].title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=60" alt="Teacher" style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid #e2e8f0' }} />
                      <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>{classes[0].teacher}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '12px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>
                        <Calendar size={14} style={{ color: 'var(--primary-color)' }} /> May 24
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700 }}>
                        <Clock size={14} style={{ color: 'var(--primary-color)' }} /> {classes[0].time}
                      </span>
                    </div>
                    <button 
                      onClick={() => onSelectLiveClass(classes[0])}
                      className="click-press"
                      style={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                        color: '#ffffff', border: 'none', padding: '8px 20px', borderRadius: '16px',
                        fontSize: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.2)'
                      }}
                    >
                      Join Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* RECOMMENDED TEACHERS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Top Mentors</h3>
              <button onClick={() => onSelectTab('explore')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>See All</button>
            </div>

            <div className="hide-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', margin: '0 -20px', paddingLeft: '20px', paddingRight: '20px' }}>
              {recommendedTeachers.map((teacher, index) => (
                <div key={index} style={{ ...premiumCard, padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '140px', flexShrink: 0, gap: '10px' }} className="click-press">
                  <div style={{ position: 'relative' }}>
                    <img src={teacher.avatar} alt={teacher.name} style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <div style={{ position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%)', background: '#fff', borderRadius: '10px', padding: '2px 6px', display: 'flex', alignItems: 'center', gap: '2px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' }}>
                      <Star size={10} fill="#f59e0b" stroke="none" />
                      <span style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-primary)' }}>{teacher.rating}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '6px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>{teacher.name}</h4>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 500 }}>{teacher.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Render Admin view
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: '#f8fafc', margin: '-16px -16px 0 -16px' }} className="animate-fade-in">
      
      {/* PREMIUM PURPLE HEADER */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        padding: '24px 20px 40px 20px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(30, 27, 75, 0.2)'
      }}>
        {/* Subtle bg glow */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0) 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              Admin Dashboard
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
                {user?.name || 'Admin Panel'}
              </h2>
              <VerificationBadge status={user?.verificationStatus || user?.role} size={16} />
            </div>
          </div>
          
          <div style={{
            width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', 
            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)',
            cursor: 'pointer'
          }} className="click-press">
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            ) : (
              <Shield size={20} style={{ color: '#fff' }} />
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '0 20px', marginTop: '-20px', zIndex: 10, position: 'relative' }}>
        {/* Metrics Row - all 4 cards in one line */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
          {adminMetrics.map((metric, idx) => {
            const IconComponent = metric.icon;
            return (
              <div key={idx} style={{ ...premiumCard, padding: '14px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: `${metric.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <IconComponent size={16} style={{ color: metric.color }} />
                </div>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>{metric.value}</span>
                <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-secondary)', lineHeight: 1.2 }}>{metric.title}</span>
                <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981', marginTop: '2px' }}>{metric.change}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ADMIN CONTENT SECTION */}
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Quick Actions</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
            {[
              { label: 'Add Course', icon: Plus },
              { label: 'Add Teacher', icon: UserPlus },
              { label: 'View Orders', icon: ShoppingBag },
              { label: 'Messages', icon: Send },
              { label: 'Reports', icon: BarChart2 }
            ].map((act, index) => {
              const ActionIcon = act.icon;
              return (
                <div 
                  key={index}
                  onClick={() => handleQuickAction(act.label)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flex: 1, cursor: 'pointer' }}
                  className="click-press"
                >
                  <div style={{ width: '46px', height: '46px', borderRadius: '16px', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.04)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                    <ActionIcon size={18} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)', textAlign: 'center', lineHeight: 1.2 }}>
                    {act.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Approvals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Pending Approvals</h3>
            <button onClick={() => onSelectTab('courses')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>See All</button>
          </div>

          <div className="hide-scrollbar" style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '8px', margin: '0 -20px', paddingLeft: '20px', paddingRight: '20px' }}>
            {pendingApprovals.map((pa) => (
              <div 
                key={pa.id} 
                style={{ ...premiumCard, width: '220px', flexShrink: 0, padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 10px', borderRadius: '12px', alignSelf: 'flex-start' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                    <span style={{ fontSize: '10px', color: '#d97706', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>{pa.type}</span>
                  </div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.4, margin: '4px 0 0 0' }}>
                    {pa.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <img src={pa.avatar} alt="Author" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
                    <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600 }}>{pa.author}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleReviewAction(pa)}
                  className="click-press"
                  style={{
                    width: '100%', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)',
                    border: 'none', padding: '10px 0', borderRadius: '12px', fontSize: '12px', fontWeight: 800, cursor: 'pointer'
                  }}
                >
                  Review Request
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Charts & Analytics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '16px' }}>
          
          {/* Revenue Analytics Card */}
          <div style={{ ...premiumCard, padding: '18px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Revenue</span>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>This Month <ChevronDown size={12} /></span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)' }}>$98,765</span>
              <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 800 }}>↑ 15.7% <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>vs last month</span></span>
            </div>

            {/* Custom SVG Line Chart */}
            <div style={{ width: '100%', height: '60px', marginTop: '10px' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M 0,45 C 10,35 20,40 30,25 C 40,10 50,20 60,15 C 70,10 80,30 100,5 L 100,50 L 0,50 Z" fill="url(#blueGrad)" />
                <path d="M 0,45 C 10,35 20,40 30,25 C 40,10 50,20 60,15 C 70,10 80,30 100,5" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
                <circle cx="60" cy="15" r="2.5" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
                <circle cx="100" cy="5" r="2.5" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
              </svg>
            </div>
            {/* Axis labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--text-muted)', fontWeight: 700, marginTop: '4px' }}>
              <span>Apr 20</span>
              <span>May 04</span>
              <span>May 18</span>
            </div>
          </div>

          {/* Course Distribution Donut */}
          <div style={{ ...premiumCard, padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Distribution</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Donut Chart SVG */}
              <div style={{ width: '80px', height: '80px', position: 'relative', flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#6366f1" strokeWidth="14" strokeDasharray="90.5 192.2" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="14" strokeDasharray="79.2 203.5" strokeDashoffset="-90.5" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="50.9 231.8" strokeDashoffset="-169.7" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="14" strokeDasharray="33.9 248.8" strokeDashoffset="-220.6" transform="rotate(-90 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="14" strokeDasharray="28.3 254.4" strokeDashoffset="-254.5" transform="rotate(-90 50 50)" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>356</span>
                  <span style={{ fontSize: '9px', color: 'var(--text-secondary)', fontWeight: 700 }}>Total</span>
                </div>
              </div>

              {/* Legends list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {[
                  { name: 'Design', pct: '32%', color: '#6366f1' },
                  { name: 'Develop', pct: '28%', color: '#3b82f6' },
                  { name: 'Market', pct: '18%', color: '#10b981' }
                ].map((leg, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '10px', fontWeight: 700 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: leg.color }} />
                      <span style={{ color: 'var(--text-secondary)' }}>{leg.name}</span>
                    </div>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>{leg.pct}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Recent Activity</h3>
            <button onClick={() => onSelectTab('orders')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>See All</button>
          </div>

          <div style={{ ...premiumCard, padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recentActivity.map((activity, index) => {
              const ActivityIcon = activity.icon;
              return (
                <div key={activity.id} style={{ 
                  display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '12px',
                  borderBottom: index !== recentActivity.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                  paddingBottom: index !== recentActivity.length - 1 ? '12px' : '0'
                }}>
                  
                  {/* Left content */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: activity.bg, color: activity.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ActivityIcon size={18} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{activity.title}</h4>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>{activity.sub}</span>
                    </div>
                  </div>

                  {/* Right metadata */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>
                      {activity.time.split(' ')[2] === 'AM' || activity.time.split(' ')[2] === 'PM' 
                        ? `${activity.time.split(' ')[0]} ${activity.time.split(' ')[1]} ${activity.time.split(' ')[2]}` 
                        : activity.time}
                    </span>
                    {activity.amount && (
                      <span style={{ fontSize: '12px', fontWeight: 800, color: '#10b981' }}>{activity.amount}</span>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
