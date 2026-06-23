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
    { title: 'Total Revenue', value: `$${(myTeacher.revenue || 0).toLocaleString()}`, change: '+12.5%', up: true, icon: DollarSign, color: '#22c55e' },
    { title: 'Students', value: (myTeacher.students || 0).toLocaleString(), change: '+8.3%', up: true, icon: Users, color: '#3b82f6' },
    { title: 'Courses', value: myTeacher.courses || 0, change: '+2', up: true, icon: BookOpen, color: '#a855f7' },
    { title: 'Avg Rating', value: myTeacher.rating || '4.8', change: '+0.1', up: true, icon: Star, color: '#eab308' }
  ];

  const upcomingClasses = (db?.classes || []).slice(0, 3);

  const recentEnrollments = [
    { id: 're1', student: 'Aisha Al-Otaibi', course: 'SAT Math Mastery', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=60' },
    { id: 're2', student: 'Khalid Mansoor', course: 'Python for Beginners', time: '5 hours ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60' },
    { id: 're3', student: 'Maria Rodriguez', course: 'IELTS Speaking Guide', time: '1 day ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100%', backgroundColor: '#faf9fc', margin: '-16px -16px 0 -16px' }} className="animate-fade-in">

      {/* Purple Header */}
      <div className="custom-home-purple-bg">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '6px 0 14px 0' }}>
          <img
            src={user?.avatar || myTeacher.avatar}
            alt="Avatar"
            style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #caba61', flexShrink: 0 }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>Welcome back,</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {user?.name || myTeacher.name}
              </h2>
              <VerificationBadge status={user?.verificationStatus || myTeacher.verificationStatus} size={16} />
            </div>
          </div>
        </div>

        {/* Quick Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', margin: '0 0 -30px 0', zIndex: 20 }}>
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div key={i} className="custom-home-card" style={{ padding: '12px', gap: '6px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', backgroundColor: `${m.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={14} style={{ color: m.color }} />
                  </div>
                  <span style={{ fontSize: '9px', fontWeight: 700, color: m.up ? '#22c55e' : '#ef4444', display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {m.up ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    {m.change}
                  </span>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e0926', display: 'block', marginTop: '4px' }}>{m.value}</span>
                <span style={{ fontSize: '9px', fontWeight: 600, color: '#8c7f94' }}>{m.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="custom-home-content-container">

        {/* Pending Payout */}
        <div className="custom-home-card click-press" style={{ padding: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', border: '1px solid rgba(202,186,97,0.3)', background: 'linear-gradient(135deg, rgba(202,186,97,0.06), rgba(55,18,60,0.03))' }}
          onClick={() => setActiveTab('teacher-earnings')}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(202,186,97,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} style={{ color: '#caba61' }} />
            </div>
            <div>
              <span style={{ fontSize: '10px', color: '#8c7f94', fontWeight: 600 }}>Pending Payout</span>
              <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#1e0926', margin: '2px 0 0 0' }}>${(myTeacher.pendingPayout || 0).toLocaleString()}</h4>
            </div>
          </div>
          <ChevronRight size={16} style={{ color: '#a095a8' }} />
        </div>

        {/* Upcoming Classes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="section-header">
            <h3 className="section-title">Upcoming Classes</h3>
            <button onClick={() => setActiveTab('teacher-live-classes')} className="section-see-all">See All</button>
          </div>
          {upcomingClasses.length > 0 ? upcomingClasses.map(cls => (
            <div key={cls.id} className="custom-home-card" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: cls.isLive ? 'rgba(239,68,68,0.1)' : 'rgba(124,58,237,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Video size={16} style={{ color: cls.isLive ? '#ef4444' : '#7c3aed' }} />
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e0926', display: 'block' }}>{cls.title}</span>
                <span style={{ fontSize: '10px', color: '#8c7f94', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={10} /> {cls.time} · {cls.duration || '60 mins'}
                </span>
              </div>
              {cls.isLive && <span style={{ fontSize: '8px', fontWeight: 800, color: '#ef4444', background: 'rgba(239,68,68,0.1)', padding: '2px 8px', borderRadius: '10px' }}>LIVE</span>}
            </div>
          )) : (
            <div className="custom-home-card" style={{ padding: '20px', textAlign: 'center' }}>
              <span style={{ fontSize: '12px', color: '#8c7f94' }}>No upcoming classes scheduled</span>
            </div>
          )}
        </div>

        {/* Recent Enrollments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="section-header">
            <h3 className="section-title">Recent Enrollments</h3>
            <button onClick={() => setActiveTab('teacher-students')} className="section-see-all">See All</button>
          </div>
          {recentEnrollments.map(enroll => (
            <div key={enroll.id} className="custom-home-card" style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={enroll.avatar} alt={enroll.student} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e0926', display: 'block' }}>{enroll.student}</span>
                <span style={{ fontSize: '10px', color: '#8c7f94' }}>Enrolled in {enroll.course}</span>
              </div>
              <span style={{ fontSize: '9px', color: '#a095a8', fontWeight: 600 }}>{enroll.time}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
