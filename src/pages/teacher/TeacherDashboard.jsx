import React from 'react';
import {
  DollarSign, Users, BookOpen, Video, TrendingUp, Clock,
  ChevronRight, Star, Bell, Award, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import VerificationBadge from '../../components/VerificationBadge';

export default function TeacherDashboard({ db, user, setActiveTab }) {
  const teachers = db?.teachers || [];
  const myTeacher = teachers.find(t => t.email === user?.email) || teachers[0] || {};

  const metrics = [
    { title: 'Total Revenue', value: `$${(myTeacher.revenue || 0).toLocaleString()}`, change: '+12.5%', up: true, icon: DollarSign, color: '#10b981', bg: 'rgba(16,185,129,0.06)' },
    { title: 'Active Students', value: (myTeacher.students || 0).toLocaleString(), change: '+8.3%', up: true, icon: Users, color: '#3b82f6', bg: 'rgba(59,130,246,0.06)' },
    { title: 'Active Courses', value: myTeacher.courses || 0, change: '+2', up: true, icon: BookOpen, color: '#6366f1', bg: 'rgba(99,102,241,0.06)' },
    { title: 'Average Rating', value: myTeacher.rating || '4.8', change: '+0.1', up: true, icon: Star, color: '#f59e0b', bg: 'rgba(245,158,11,0.06)' }
  ];

  const upcomingClasses = (db?.classes || []).slice(0, 3);

  const recentEnrollments = [
    { id: 're1', student: 'Aisha Al-Otaibi', course: 'SAT Math Mastery', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=60' },
    { id: 're2', student: 'Khalid Mansoor', course: 'Python for Beginners', time: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60' },
    { id: 're3', student: 'Maria Rodriguez', course: 'IELTS Speaking Guide', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60' }
  ];

  const premiumCard = {
    background: 'var(--bg-card)',
    borderRadius: '24px',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-premium)',
    padding: '20px',
    position: 'relative'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: 'var(--bg-app)', margin: '-16px -16px 0 -16px' }} className="animate-fade-in">

      {/* Purple Header */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)',
        padding: '24px 20px 100px 20px',
        borderBottomLeftRadius: '32px',
        borderBottomRightRadius: '32px',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(79, 70, 229, 0.15)'
      }}>
        {/* Glow */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0) 70%)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0 14px 0' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>Welcome back,</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
                {user?.name || myTeacher.name}
              </h2>
              <VerificationBadge status={user?.verificationStatus || myTeacher.verificationStatus} size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Metrics (Grid) */}
      <div style={{ margin: '-60px 20px 0 20px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} style={{ ...premiumCard, padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', backgroundColor: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} />
                  </div>
                  <span style={{ fontSize: '10px', fontWeight: 800, color: m.up ? '#10b981' : '#ef4444', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {m.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                    {m.change}
                  </span>
                </div>
                <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', display: 'block', marginTop: '4px', letterSpacing: '-0.5px' }}>{m.value}</span>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>{m.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content Container */}
      <div style={{ padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

        {/* Pending Payout */}
        <div 
          onClick={() => setActiveTab('teacher-earnings')}
          className="click-press" 
          style={{ 
            ...premiumCard, 
            padding: '16px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            cursor: 'pointer', 
            border: '1px solid rgba(202,186,97,0.15)', 
            background: 'linear-gradient(135deg, rgba(202,186,97,0.05) 0%, rgba(202,186,97,0.01) 100%)' 
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(202,186,97,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={20} style={{ color: '#caba61' }} />
            </div>
            <div>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Payout</span>
              <h4 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '2px 0 0 0', letterSpacing: '-0.5px' }}>${(myTeacher.pendingPayout || 0).toLocaleString()}</h4>
            </div>
          </div>
          <ChevronRight size={18} style={{ color: 'var(--text-muted)' }} />
        </div>

        {/* Upcoming Classes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Upcoming Classes</h3>
            <button onClick={() => setActiveTab('teacher-live-classes')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>See All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {upcomingClasses.length > 0 ? upcomingClasses.map(cls => (
              <div key={cls.id} style={{ ...premiumCard, padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ 
                  width: '38px', height: '38px', borderRadius: '12px', 
                  background: cls.isLive ? 'rgba(239,68,68,0.1)' : 'rgba(99,102,241,0.08)', 
                  color: cls.isLive ? '#ef4444' : 'var(--primary-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' 
                }}>
                  <Video size={18} />
                </div>
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{cls.title}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px', fontWeight: 550 }}>
                    <Clock size={12} /> {cls.time} · {cls.duration || '60 mins'}
                  </span>
                </div>
                {cls.isLive && (
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(239, 68, 68, 0.1)', padding: '4px 10px', borderRadius: '10px' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                    <span style={{ fontSize: '9px', color: '#ef4444', fontWeight: 800 }}>LIVE</span>
                  </div>
                )}
              </div>
            )) : (
              <div style={{ ...premiumCard, padding: '30px', textAlign: 'center', color: 'var(--text-secondary)', fontWeight: 600 }}>
                No upcoming classes scheduled
              </div>
            )}
          </div>
        </div>

        {/* Recent Enrollments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Recent Enrollments</h3>
            <button onClick={() => setActiveTab('teacher-students')} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>See All</button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentEnrollments.map(enroll => (
              <div key={enroll.id} style={{ ...premiumCard, padding: '16px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <img src={enroll.avatar} alt={enroll.student} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} />
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>{enroll.student}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 550, display: 'block', marginTop: '1px' }}>Enrolled in {enroll.course}</span>
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700 }}>{enroll.time}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
