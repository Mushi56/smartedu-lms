import React, { useState } from 'react';
import { 
  Flame, Clock, Calendar, ChevronRight, Play, Star, BookOpen, Bell, Search, 
  SlidersHorizontal, MoreVertical, Plus, UserPlus, ShoppingBag, Send, 
  BarChart2, Shield, ChevronDown, Check, GraduationCap, DollarSign, Users, Award, User
} from 'lucide-react';

export default function Home({ db, user, currentPortal, onSelectCourse, onSelectLiveClass, onSelectTab, onOpenDrawer }) {
  const { courses = [], classes = [], streak = 14, overallProgress = 67 } = db;
  const isAdmin = currentPortal === 'admin';

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
    { title: 'Total Students', value: '12,458', change: '↑ 12.5%', icon: Users, color: '#7c3aed' },
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
    { id: 'ra-1', type: 'order', title: 'New order #ORD-1256', sub: 'UI/UX Design Masterclass', time: 'May 23, 2025 10:24 AM', amount: '+$49.00', icon: ShoppingBag, bg: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed' },
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

  // Render Student view
  if (!isAdmin) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: '#faf9fc', margin: '-16px -16px calc(-76px - var(--safe-bottom)) -16px' }}>
        
        {/* Purple Welcome Header */}
        <div className="custom-home-purple-bg">
          {/* Logo & Alerts Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'calc(10px + var(--safe-top))' }}>
            <div onClick={onOpenDrawer} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} className="click-press">
              {/* Stacked logo geometry */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <div style={{ width: '16px', height: '6px', background: '#caba61', borderRadius: '1.5px', transform: 'skewX(-15deg)' }} />
                <div style={{ width: '18px', height: '6px', background: '#ffffff', borderRadius: '1.5px', transform: 'skewX(-15deg)' }} />
                <div style={{ width: '14px', height: '6px', background: '#caba61', borderRadius: '1.5px', transform: 'skewX(-15deg)' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
                <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1px', color: '#ffffff' }}>SURIA</span>
                <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.8px', color: '#caba61' }}>TECH</span>
              </div>
            </div>

            {/* Notification Bell */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button 
                onClick={onOpenDrawer}
                className="click-press"
                style={{ background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff', position: 'relative' }}
              >
                <Bell size={18} />
                <span style={{ position: 'absolute', top: '8px', right: '8px', backgroundColor: '#caba61', width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #37123c', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '7px', fontWeight: 800, color: '#37123c' }}>
                  3
                </span>
              </button>
            </div>
          </div>

          {/* User Welcome Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '8px 0 16px 0', textAlign: 'left' }}>
            <img 
              onClick={onOpenDrawer}
              src={user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"} 
              alt="Avatar" 
              style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #caba61', cursor: 'pointer' }}
              className="click-press"
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Welcome back,</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                  {user?.name || 'Aisha Rahman'}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(202, 186, 97, 0.16)', border: '1px solid #caba61', borderRadius: '6px', padding: '1px 6px' }}>
                  <span style={{ fontSize: '8px', color: '#caba61', fontWeight: 800 }}>Gold Learner</span>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Goal Card (Overlapping header) */}
          <div 
            onClick={() => onSelectTab('explore')}
            className="custom-home-card click-press"
            style={{ 
              flexDirection: 'column', 
              gap: '12px',
              padding: '16px', 
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Award size={18} />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <span style={{ fontSize: '10.5px', color: '#8c7f94', fontWeight: 600 }}>Learning Goal</span>
                  <h4 style={{ fontSize: '12.5px', fontWeight: 800, color: '#1e0926', marginTop: '1px' }}>Complete UI/UX Design Course</h4>
                </div>
              </div>
              <ChevronRight size={16} style={{ color: '#a095a8' }} />
            </div>
            
            {/* Progress Slider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '6px', backgroundColor: '#f0ecf4', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', backgroundColor: '#caba61', borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '11px', fontWeight: 800, color: '#1e0926' }}>65%</span>
            </div>
          </div>

        </div>

        {/* Content Section */}
        <div className="custom-home-content-container">

          {/* Search Bar */}
          <div className="custom-home-search-bar">
            <Search size={16} style={{ color: '#a095a8' }} />
            <input 
              type="text" 
              placeholder="Search courses" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button style={{ background: 'none', border: 'none', color: '#1e0926', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <SlidersHorizontal size={16} />
            </button>
          </div>

          {/* Featured Courses */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="section-header">
              <h3 className="section-title">Featured Courses</h3>
              <button onClick={() => onSelectTab('explore')} className="section-see-all">See All</button>
            </div>

            <div className="hide-scrollbar" style={{ display: 'flex', gap: '14px', overflowX: 'auto', paddingBottom: '4px', margin: '0 -16px', paddingLeft: '16px', paddingRight: '16px' }}>
              {decoratedCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => onSelectCourse(course)}
                  className="custom-course-thumbnail-card click-press"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="custom-course-thumbnail">
                    <img src={course.thumbnail} alt={course.title} />
                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '8px', fontWeight: 700, padding: '2px 6px', borderRadius: '10px' }}>
                      {course.category}
                    </div>
                  </div>
                  <div className="custom-course-info">
                    <h4 className="custom-course-title">{course.title}</h4>
                    <div className="custom-course-meta">
                      <span className="custom-course-rating">
                        <Star size={10} fill="#caba61" stroke="none" />
                        {course.rating} <span style={{ color: '#8c7f94', fontWeight: 500 }}>({course.reviewsCount})</span>
                      </span>
                      <span className="custom-course-price">{course.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Learning */}
          {activeCourse && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="section-header">
                <h3 className="section-title">Continue Learning</h3>
                <button onClick={() => onSelectTab('explore')} className="section-see-all">See All</button>
              </div>

              <div 
                onClick={() => onSelectCourse(activeCourse)}
                className="custom-home-card click-press"
                style={{ 
                  flexDirection: 'row', 
                  alignItems: 'center', 
                  gap: '12px', 
                  padding: '12px',
                  cursor: 'pointer'
                }}
              >
                <img 
                  src={activeCourse.thumbnail} 
                  alt={activeCourse.title} 
                  style={{ width: '56px', height: '56px', borderRadius: '10px', objectFit: 'cover' }}
                />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <h4 style={{ fontSize: '12.5px', fontWeight: 800, color: '#1e0926', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%' }}>
                    {activeCourse.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ flex: 1, height: '4px', backgroundColor: '#f0ecf4', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ width: `${activeCourse.progress}%`, height: '100%', backgroundColor: '#caba61' }} />
                    </div>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#8c7f94', whiteSpace: 'nowrap' }}>
                      {activeCourse.progress}% Complete
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCourse(activeCourse);
                    }}
                    className="click-press"
                    style={{
                      background: '#311442',
                      color: '#ffffff',
                      border: 'none',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '10.5px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Continue
                  </button>
                  <button style={{ background: 'none', border: 'none', color: '#a095a8', cursor: 'pointer' }}>
                    <MoreVertical size={14} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Upcoming Live Class */}
          {classes.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="section-header">
                <h3 className="section-title">Upcoming Live Class</h3>
                <button onClick={() => onSelectTab('live-classes')} className="section-see-all">See All</button>
              </div>

              <div className="custom-home-card" style={{ padding: '14px', gap: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  
                  {/* Left: Info */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ backgroundColor: '#fff6f0', border: '1px solid #ffd2be', borderRadius: '6px', padding: '2px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#f97316' }} />
                        <span style={{ fontSize: '8.5px', color: '#f97316', fontWeight: 800 }}>LIVE</span>
                      </div>
                    </div>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1e0926', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {classes[0].title}
                    </h4>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                      <img 
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=60" 
                        alt="Teacher" 
                        style={{ width: '20px', height: '20px', borderRadius: '50%' }}
                      />
                      <span style={{ fontSize: '10.5px', color: '#8c7f94', fontWeight: 600 }}>By {classes[0].teacher}</span>
                    </div>
                  </div>

                  {/* Right: Date Time & Join */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', alignItems: 'flex-end', textAlign: 'right' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', color: '#8c7f94', fontWeight: 600 }}>
                        <Calendar size={11} style={{ color: '#caba61' }} /> May 24, 2025
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', color: '#8c7f94', fontWeight: 600 }}>
                        <Clock size={11} style={{ color: '#caba61' }} /> {classes[0].time}
                      </span>
                    </div>

                    <button 
                      onClick={() => onSelectLiveClass(classes[0])}
                      className="click-press"
                      style={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #caba61',
                        color: '#caba61',
                        padding: '6px 16px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        marginTop: '4px'
                      }}
                    >
                      Join
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Recommended Teachers */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div className="section-header">
              <h3 className="section-title">Recommended Teachers</h3>
              <button onClick={() => onSelectTab('explore')} className="section-see-all">See All</button>
            </div>

            <div className="hide-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', margin: '0 -16px', paddingLeft: '16px', paddingRight: '16px' }}>
              {recommendedTeachers.map((teacher, index) => (
                <div key={index} className="teacher-card">
                  <img src={teacher.avatar} alt={teacher.name} className="teacher-avatar" />
                  <span className="teacher-name">{teacher.name}</span>
                  <span className="teacher-title">{teacher.title}</span>
                  <div className="teacher-rating-badge">
                    <Star size={8} fill="#caba61" stroke="none" />
                    <span>{teacher.rating}</span>
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: '#faf9fc', margin: '-16px -16px calc(-76px - var(--safe-bottom)) -16px' }}>
      
      {/* Purple Welcome Header */}
      <div className="custom-home-purple-bg">
        {/* Logo & Admin Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'calc(10px + var(--safe-top))' }}>
          <div onClick={onOpenDrawer} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} className="click-press">
            {/* Stacked logo geometry */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <div style={{ width: '16px', height: '6px', background: '#caba61', borderRadius: '1.5px', transform: 'skewX(-15deg)' }} />
              <div style={{ width: '18px', height: '6px', background: '#ffffff', borderRadius: '1.5px', transform: 'skewX(-15deg)' }} />
              <div style={{ width: '14px', height: '6px', background: '#caba61', borderRadius: '1.5px', transform: 'skewX(-15deg)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.1 }}>
              <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '1px', color: '#ffffff' }}>SURIA</span>
              <span style={{ fontSize: '10px', fontWeight: 500, letterSpacing: '0.8px', color: '#caba61' }}>TECH</span>
            </div>
          </div>

          {/* Admin Avatar & Dropdown */}
          <div 
            onClick={onOpenDrawer}
            className="click-press"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.08)', padding: '5px 12px', borderRadius: '20px', cursor: 'pointer' }}
          >
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#caba61', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#37123c' }}>
              <User size={13} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff' }}>Admin</span>
            <ChevronDown size={12} style={{ color: '#ffffff', opacity: 0.8 }} />
          </div>
        </div>

        {/* Admin Welcome Details */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '14px 0 16px 0', textAlign: 'left' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(202, 186, 97, 0.12)', border: '1.5px solid #caba61', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#caba61' }}>
            <Shield size={24} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255, 255, 255, 0.6)', fontWeight: 500 }}>Welcome back,</span>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff', margin: 0 }}>Admin</h2>
          </div>
        </div>

        {/* Metrics Row (Overlapping header, horizontal scroll) */}
        <div className="hide-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', margin: '0 -16px -30px -16px', padding: '0 16px', zIndex: 20 }}>
          {adminMetrics.map((metric, idx) => {
            const IconComponent = metric.icon;
            return (
              <div 
                key={idx} 
                className="custom-home-card" 
                style={{ 
                  width: '130px', 
                  flexShrink: 0, 
                  padding: '12px',
                  boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 650, color: '#8c7f94', whiteSpace: 'nowrap' }}>{metric.title}</span>
                  <IconComponent size={14} style={{ color: '#a095a8' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 800, color: '#1e0926' }}>{metric.value}</span>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: '#10b981' }}>{metric.change}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Content Section */}
      <div className="custom-home-content-container" style={{ marginTop: '20px' }}>

        {/* Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
          <h3 className="section-title">Quick Actions</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px', padding: '4px 0' }}>
            {[
              { label: 'Add Course', icon: Plus },
              { label: 'Add Teacher', icon: UserPlus },
              { label: 'View Orders', icon: ShoppingBag },
              { label: 'Send Message', icon: Send },
              { label: 'Generate Report', icon: BarChart2 }
            ].map((act, index) => {
              const ActionIcon = act.icon;
              return (
                <div 
                  key={index}
                  onClick={() => handleQuickAction(act.label)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', flex: 1, cursor: 'pointer' }}
                  className="click-press"
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', backgroundColor: 'rgba(55, 18, 60, 0.06)', border: '1px solid rgba(55, 18, 60, 0.05)', color: '#37123c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActionIcon size={16} />
                  </div>
                  <span style={{ fontSize: '8.5px', fontWeight: 700, color: '#504156', textAlign: 'center', lineHeight: 1.2, whiteSpace: 'nowrap' }}>
                    {act.label.split(' ')[0]}<br/>{act.label.split(' ')[1] || ''}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pending Approvals */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="section-header">
            <h3 className="section-title">Pending Approvals</h3>
            <button onClick={() => onSelectTab('courses')} className="section-see-all">See All</button>
          </div>

          <div className="hide-scrollbar" style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '4px', margin: '0 -16px', paddingLeft: '16px', paddingRight: '16px' }}>
            {pendingApprovals.map((pa) => (
              <div 
                key={pa.id} 
                className="custom-home-card" 
                style={{ 
                  width: '180px', 
                  flexShrink: 0, 
                  padding: '14px', 
                  justifyContent: 'space-between',
                  textAlign: 'left',
                  height: '136px'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#caba61' }} />
                    <span style={{ fontSize: '8.5px', color: '#caba61', fontWeight: 800, textTransform: 'uppercase' }}>{pa.type}</span>
                  </div>
                  <h4 style={{ fontSize: '11px', fontWeight: 800, color: '#1e0926', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', height: '30px', lineHeight: 1.35 }}>
                    {pa.title}
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <img src={pa.avatar} alt="Author" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                    <span style={{ fontSize: '9px', color: '#8c7f94', fontWeight: 600 }}>{pa.author}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleReviewAction(pa)}
                  className="click-press"
                  style={{
                    width: '100%',
                    backgroundColor: '#ffffff',
                    border: '1px solid #e8e2ee',
                    color: '#37123c',
                    padding: '5px 0',
                    borderRadius: '8px',
                    fontSize: '10.5px',
                    fontWeight: 750,
                    cursor: 'pointer',
                    marginTop: '8px',
                    textAlign: 'center'
                  }}
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Charts & Analytics Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '12px' }}>
          
          {/* Revenue Analytics Card */}
          <div className="custom-home-card" style={{ padding: '12px', textAlign: 'left', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#1e0926' }}>Revenue Analytics</span>
              <span style={{ fontSize: '8.5px', color: '#8c7f94', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 600 }}>This Month <ChevronDown size={8} /></span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e0926' }}>$98,765</span>
              <span style={{ fontSize: '8px', color: '#10b981', fontWeight: 700 }}>↑ 15.7% <span style={{ color: '#8c7f94', fontWeight: 500 }}>vs last month</span></span>
            </div>

            {/* Custom SVG Line Chart */}
            <div style={{ width: '100%', height: '50px', marginTop: '6px' }}>
              <svg width="100%" height="100%" viewBox="0 0 100 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="purpleGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25"/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                  </linearGradient>
                </defs>
                {/* Fill area under curve */}
                <path d="M 0,45 C 10,40 20,42 30,35 C 40,28 50,15 60,25 C 70,35 80,10 100,5 L 100,50 L 0,50 Z" fill="url(#purpleGrad)" />
                {/* Stroke line */}
                <path d="M 0,45 C 10,40 20,42 30,35 C 40,28 50,15 60,25 C 70,35 80,10 100,5" fill="none" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
                {/* Dots at peaks */}
                <circle cx="60" cy="25" r="1.5" fill="#7c3aed" />
                <circle cx="100" cy="5" r="1.5" fill="#7c3aed" />
              </svg>
            </div>
            {/* Axis labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '7px', color: '#a095a8', fontWeight: 700 }}>
              <span>Apr 20</span>
              <span>May 04</span>
              <span>May 18</span>
            </div>
          </div>

          {/* Course Distribution Donut */}
          <div className="custom-home-card" style={{ padding: '12px', textAlign: 'left', gap: '8px' }}>
            <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#1e0926' }}>Course Distribution</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {/* Donut Chart SVG */}
              <div style={{ width: '64px', height: '64px', position: 'relative', flexShrink: 0 }}>
                <svg width="100%" height="100%" viewBox="0 0 100 100">
                  {/* Total circle path = 282.7 (radius=45) */}
                  {/* Design 32% (stroke length: 90.5, offset: 0) */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#7c3aed" strokeWidth="12" strokeDasharray="90.5 192.2" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  {/* Development 28% (stroke length: 79.2, offset: -90.5) */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="12" strokeDasharray="79.2 203.5" strokeDashoffset="-90.5" transform="rotate(-90 50 50)" />
                  {/* Marketing 18% (stroke length: 50.9, offset: -169.7) */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="50.9 231.8" strokeDashoffset="-169.7" transform="rotate(-90 50 50)" />
                  {/* Business 12% (stroke length: 33.9, offset: -220.6) */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="33.9 248.8" strokeDashoffset="-220.6" transform="rotate(-90 50 50)" />
                  {/* Others 10% (stroke length: 28.3, offset: -254.5) */}
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="28.3 254.4" strokeDashoffset="-254.5" transform="rotate(-90 50 50)" />
                </svg>
                {/* Center text */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1.1 }}>
                  <span style={{ fontSize: '11px', fontWeight: 800, color: '#1e0926' }}>356</span>
                  <span style={{ fontSize: '7px', color: '#8c7f94', fontWeight: 650 }}>Courses</span>
                </div>
              </div>

              {/* Legends list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', flex: 1 }}>
                {[
                  { name: 'Design', pct: '32%', color: '#7c3aed' },
                  { name: 'Develop', pct: '28%', color: '#3b82f6' },
                  { name: 'Market', pct: '18%', color: '#10b981' },
                  { name: 'Business', pct: '12%', color: '#f59e0b' },
                  { name: 'Others', pct: '10%', color: '#ef4444' }
                ].map((leg, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '8px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: leg.color }} />
                      <span style={{ color: '#8c7f94' }}>{leg.name}</span>
                    </div>
                    <span style={{ color: '#1e0926', fontWeight: 800 }}>{leg.pct}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Recent Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="section-header">
            <h3 className="section-title">Recent Activity</h3>
            <button onClick={() => onSelectTab('orders')} className="section-see-all">See All</button>
          </div>

          <div className="custom-home-card" style={{ padding: '12px', gap: '14px' }}>
            {recentActivity.map((activity) => {
              const ActivityIcon = activity.icon;
              return (
                <div key={activity.id} style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between', gap: '10px' }}>
                  
                  {/* Left content */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: activity.bg, color: activity.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <ActivityIcon size={14} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                      <h4 style={{ fontSize: '11.5px', fontWeight: 800, color: '#1e0926', margin: 0 }}>{activity.title}</h4>
                      <span style={{ fontSize: '9px', color: '#8c7f94', fontWeight: 600 }}>{activity.sub}</span>
                    </div>
                  </div>

                  {/* Right metadata */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px', textAlign: 'right', flexShrink: 0 }}>
                    <span style={{ fontSize: '8px', color: '#a095a8', fontWeight: 700 }}>{activity.time.split(' ')[2] === 'AM' || activity.time.split(' ')[2] === 'PM' ? `${activity.time.split(' ')[0]} ${activity.time.split(' ')[1]} ${activity.time.split(' ')[2]}` : activity.time}</span>
                    {activity.amount && (
                      <span style={{ fontSize: '10px', fontWeight: 800, color: '#10b981' }}>{activity.amount}</span>
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
