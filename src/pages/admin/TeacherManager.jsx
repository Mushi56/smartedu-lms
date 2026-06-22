import React, { useState } from 'react';
import {
  UserPlus, Search, Star, BookOpen, Users, Mail,
  Phone, MapPin, Edit3, Trash2, CheckCircle, XCircle,
  Clock, Award, X, ChevronDown, Filter, ArrowLeft, Camera
} from 'lucide-react';

// ── Mock teacher data ──────────────────────────────────────────────
const MOCK_TEACHERS = [
  {
    id: 'teacher-1',
    name: 'Dr. Ahmed Al-Hassan',
    email: 'ahmed@suriatech.com',
    phone: '+60 11-1234 5678',
    specialty: 'SAT & ACT Expert',
    location: 'Kuala Lumpur, MY',
    courses: 5,
    students: 1240,
    rating: 4.9,
    status: 'active',
    joined: 'Jan 2024',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=120&q=80',
    bio: 'Dr. Ahmed has over 12 years of experience in standardized test preparation.',
    tags: ['SAT', 'ACT', 'PSAT'],
  },
  {
    id: 'teacher-2',
    name: 'Ms. Sarah Johnson',
    email: 'sarah@suriatech.com',
    phone: '+60 12-9876 5432',
    specialty: 'IELTS & TOEFL Expert',
    location: 'Penang, MY',
    courses: 3,
    students: 870,
    rating: 4.8,
    status: 'active',
    joined: 'Mar 2024',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    bio: 'Sarah is a certified IELTS examiner with Band 9 proficiency.',
    tags: ['IELTS', 'TOEFL', 'English'],
  },
  {
    id: 'teacher-3',
    name: 'Dr. Michael Chen',
    email: 'michael@suriatech.com',
    phone: '+60 17-5555 1234',
    specialty: 'GRE & GMAT Expert',
    location: 'Johor Bahru, MY',
    courses: 4,
    students: 650,
    rating: 4.7,
    status: 'pending',
    joined: 'Jun 2024',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
    bio: 'Dr. Michael holds a PhD in Mathematics from MIT.',
    tags: ['GRE', 'GMAT', 'Calculus'],
  },
  {
    id: 'teacher-4',
    name: 'Mr. David Wilson',
    email: 'david@suriatech.com',
    phone: '+60 14-2222 3333',
    specialty: 'Computer Science Expert',
    location: 'Shah Alam, MY',
    courses: 6,
    students: 2100,
    rating: 4.9,
    status: 'active',
    joined: 'Nov 2023',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    bio: 'David is a full-stack developer with expertise in AI & Data Science.',
    tags: ['Python', 'AI', 'DSA'],
  },
];

const EMPTY_FORM = {
  name: '', email: '', phone: '', specialty: '', location: '',
  bio: '', tags: '', status: 'active', avatar: ''
};

const cardStyle = {
  background: '#fff', borderRadius: '16px',
  border: '1px solid #ede9f4', padding: '16px',
  display: 'flex', flexDirection: 'column', gap: '12px'
};

const inputStyle = {
  width: '100%', padding: '10px 12px', fontSize: '13px',
  border: '1px solid #ede9f4', borderRadius: '10px',
  background: '#faf9fc', color: 'var(--text-primary)',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
};

const labelStyle = {
  fontSize: '10px', fontWeight: 700,
  color: 'var(--text-secondary)', display: 'block', marginBottom: '5px'
};

export default function TeacherManager() {
  const [teachers, setTeachers] = useState(MOCK_TEACHERS);
  const [view, setView] = useState('list'); // 'list' | 'add' | 'detail'
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = teachers.filter(t => {
    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.specialty.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || t.status === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  const totalStudents = teachers.reduce((s, t) => s + t.students, 0);
  const activeCount = teachers.filter(t => t.status === 'active').length;
  const avgRating = (teachers.reduce((s, t) => s + t.rating, 0) / teachers.length).toFixed(1);

  const handleSave = () => {
    const tagArr = form.tags.split(',').map(t => t.trim()).filter(Boolean);
    if (selected) {
      setTeachers(prev => prev.map(t => t.id === selected.id ? {
        ...t, ...form, tags: tagArr
      } : t));
    } else {
      setTeachers(prev => [{
        id: `teacher-${Date.now()}`,
        ...form,
        tags: tagArr,
        courses: 0, students: 0, rating: 0,
        joined: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      }, ...prev]);
    }
    setView('list'); setSelected(null); setForm(EMPTY_FORM);
  };

  const openEdit = (t) => {
    setForm({ name: t.name, email: t.email, phone: t.phone, specialty: t.specialty, location: t.location, bio: t.bio, tags: t.tags.join(', '), status: t.status, avatar: t.avatar });
    setSelected(t);
    setView('add');
  };

  const openDetail = (t) => { setSelected(t); setView('detail'); };

  const toggleStatus = (id) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, status: t.status === 'active' ? 'inactive' : 'active' } : t));
  };

  const deleteTeacher = (id) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  // ── DETAIL VIEW ────────────────────────────────────────────────
  if (view === 'detail' && selected) {
    const t = teachers.find(x => x.id === selected.id) || selected;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => { setView('list'); setSelected(null); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
          <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Teacher Profile</h2>
        </div>

        {/* Profile Card */}
        <div style={{ ...cardStyle, alignItems: 'center', textAlign: 'center', padding: '24px 16px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #ede9f4' }}>
            <img src={t.avatar} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>{t.name}</h3>
            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{t.specialty}</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {t.tags.map(tag => (
              <span key={tag} style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: 'var(--primary-glow)', color: 'var(--primary-color)' }}>{tag}</span>
            ))}
          </div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 800,
            padding: '4px 12px', borderRadius: '20px',
            background: t.status === 'active' ? 'rgba(16,185,129,0.1)' : t.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
            color: t.status === 'active' ? '#10b981' : t.status === 'pending' ? '#f59e0b' : '#ef4444'
          }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor' }} />
            {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
          </span>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[
            { label: 'Courses', val: t.courses, color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
            { label: 'Students', val: t.students.toLocaleString(), color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' },
            { label: 'Rating', val: t.rating, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
          ].map(s => (
            <div key={s.label} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #ede9f4', padding: '12px', textAlign: 'center' }}>
              <div style={{ fontSize: '18px', fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div style={cardStyle}>
          <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Contact Information</h4>
          {[
            { icon: Mail, label: t.email },
            { icon: Phone, label: t.phone },
            { icon: MapPin, label: t.location },
            { icon: Clock, label: `Joined ${t.joined}` },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#f5f3f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={13} style={{ color: 'var(--primary-color)' }} />
                </div>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Bio */}
        {t.bio && (
          <div style={cardStyle}>
            <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>About</h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>{t.bio}</p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => openEdit(t)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: 'var(--primary-color)', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }} className="click-press">
            Edit Profile
          </button>
          <button onClick={() => { toggleStatus(t.id); setSelected(prev => ({ ...prev, status: prev.status === 'active' ? 'inactive' : 'active' })); }}
            style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #ede9f4', background: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer', color: t.status === 'active' ? '#ef4444' : '#10b981' }} className="click-press">
            {t.status === 'active' ? 'Deactivate' : 'Activate'}
          </button>
        </div>
      </div>
    );
  }

  // ── ADD / EDIT VIEW ────────────────────────────────────────────
  if (view === 'add') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => { setView('list'); setSelected(null); setForm(EMPTY_FORM); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: '4px', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {selected ? 'Edit Teacher' : 'Add New Teacher'}
            </h2>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Fill in the teacher's information below</p>
          </div>
        </div>

        {/* Avatar Preview */}
        <div style={{ ...cardStyle, alignItems: 'center', padding: '20px' }}>
          <div style={{ position: 'relative', width: '72px', height: '72px' }}>
            <div style={{ width: '72px', height: '72px', borderRadius: '50%', overflow: 'hidden', background: '#ede9f4', border: '3px solid var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {form.avatar
                ? <img src={form.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <Users size={28} style={{ color: '#c4b5d6' }} />
              }
            </div>
          </div>
          <div style={{ width: '100%' }}>
            <label style={labelStyle}>Avatar URL</label>
            <input type="text" value={form.avatar} onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))} style={inputStyle} placeholder="https://example.com/photo.jpg" />
          </div>
        </div>

        {/* Basic Info */}
        <div style={cardStyle}>
          <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Basic Information</h4>

          <div>
            <label style={labelStyle}>Full Name *</label>
            <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} style={inputStyle} placeholder="e.g. Dr. Ahmed Al-Hassan" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Email *</label>
              <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} style={inputStyle} placeholder="teacher@email.com" />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} style={inputStyle} placeholder="+60 1x-xxxx" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Specialty / Subject *</label>
            <input type="text" value={form.specialty} onChange={e => setForm(f => ({ ...f, specialty: e.target.value }))} style={inputStyle} placeholder="e.g. SAT & ACT Expert" />
          </div>

          <div>
            <label style={labelStyle}>Location</label>
            <input type="text" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} style={inputStyle} placeholder="e.g. Kuala Lumpur, MY" />
          </div>
        </div>

        {/* Additional */}
        <div style={cardStyle}>
          <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Additional Info</h4>

          <div>
            <label style={labelStyle}>Bio / About</label>
            <textarea
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              rows={3}
              style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
              placeholder="Brief description about this teacher..."
            />
          </div>

          <div>
            <label style={labelStyle}>Tags (comma-separated)</label>
            <input type="text" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} style={inputStyle} placeholder="e.g. IELTS, TOEFL, English" />
          </div>

          <div>
            <label style={labelStyle}>Account Status</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['active', 'pending', 'inactive'].map(s => (
                <label key={s} onClick={() => setForm(f => ({ ...f, status: s }))}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '8px', borderRadius: '10px', cursor: 'pointer',
                    border: `1.5px solid ${form.status === s ? 'var(--primary-color)' : '#ede9f4'}`,
                    background: form.status === s ? 'var(--primary-glow)' : '#faf9fc',
                    fontSize: '10px', fontWeight: 700,
                    color: form.status === s ? 'var(--primary-color)' : 'var(--text-secondary)',
                    transition: 'all 0.15s', textTransform: 'capitalize'
                  }}>
                  {s}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={handleSave}
          disabled={!form.name || !form.email || !form.specialty}
          style={{
            width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
            background: !form.name || !form.email ? '#e2e8f0' : 'var(--primary-gradient)',
            color: !form.name || !form.email ? 'var(--text-muted)' : '#fff',
            fontWeight: 800, fontSize: '14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'
          }}
          className="click-press"
        >
          <CheckCircle size={16} />
          {selected ? 'Save Changes' : 'Add Teacher'}
        </button>
      </div>
    );
  }

  // ── LIST VIEW ──────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }} className="animate-fade-in">

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Teachers</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Manage your instructor team</p>
        </div>
        <button
          onClick={() => { setView('add'); setSelected(null); setForm(EMPTY_FORM); }}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }}
          className="click-press"
        >
          <UserPlus size={14} />
          Add
        </button>
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        {[
          { label: 'Total', value: teachers.length, color: '#7c3aed' },
          { label: 'Active', value: activeCount, color: '#10b981' },
          { label: 'Avg Rating', value: avgRating, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: '12px', border: '1px solid #ede9f4', padding: '12px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fff', border: '1px solid #ede9f4', borderRadius: '12px', padding: '10px 14px' }}>
        <Search size={14} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input type="text" placeholder="Search teachers or specialty..." value={search} onChange={e => setSearch(e.target.value)} style={{ border: 'none', background: 'none', outline: 'none', fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-primary)', flex: 1 }} />
      </div>

      {/* Status filter chips */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }} className="hide-scrollbar">
        {['All', 'Active', 'Pending', 'Inactive'].map(f => (
          <button key={f} onClick={() => setStatusFilter(f)}
            className="click-press"
            style={{
              flexShrink: 0, padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
              border: statusFilter === f ? 'none' : '1px solid #ede9f4',
              background: statusFilter === f ? 'var(--primary-color)' : '#fff',
              color: statusFilter === f ? '#fff' : 'var(--text-secondary)',
            }}>
            {f}
          </button>
        ))}
      </div>

      {/* Teacher Cards */}
      {filtered.length === 0 ? (
        <div style={{ ...cardStyle, alignItems: 'center', padding: '40px 20px', textAlign: 'center' }}>
          <Users size={36} style={{ color: '#ede9f4' }} />
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>No teachers found.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map(t => (
            <div
              key={t.id}
              style={{ background: '#fff', borderRadius: '16px', border: '1px solid #ede9f4', padding: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}
            >
              {/* Top Row: Avatar + info + status */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div onClick={() => openDetail(t)} style={{ cursor: 'pointer', position: 'relative', flexShrink: 0 }}>
                  <img src={t.avatar} alt={t.name} style={{ width: '46px', height: '46px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ede9f4', display: 'block' }} />
                  <span style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: '12px', height: '12px', borderRadius: '50%', border: '2px solid #fff',
                    background: t.status === 'active' ? '#10b981' : t.status === 'pending' ? '#f59e0b' : '#ef4444'
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }} onClick={() => openDetail(t)} style={{ flex: 1, minWidth: 0, cursor: 'pointer' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 1px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.name}</h3>
                  <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.specialty}</p>
                </div>
                {/* Edit / Delete */}
                <div style={{ display: 'flex', gap: '5px', flexShrink: 0 }}>
                  <button onClick={() => openEdit(t)} style={{ padding: '6px 10px', borderRadius: '8px', background: 'var(--primary-glow)', color: 'var(--primary-color)', border: 'none', cursor: 'pointer' }} className="click-press">
                    <Edit3 size={12} />
                  </button>
                  <button onClick={() => deleteTeacher(t.id)} style={{ padding: '6px 10px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', cursor: 'pointer' }} className="click-press">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>

              {/* Stats row */}
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { icon: BookOpen, val: `${t.courses} courses`, color: '#7c3aed' },
                  { icon: Users, val: `${t.students.toLocaleString()} students`, color: '#3b82f6' },
                  { icon: Star, val: t.rating, color: '#f59e0b' },
                ].map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '9.5px', fontWeight: 700, color: s.color, background: `${s.color}10`, padding: '4px 8px', borderRadius: '8px' }}>
                      <Icon size={10} />
                      {s.val}
                    </div>
                  );
                })}
              </div>

              {/* Tags */}
              {t.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                  {t.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '8.5px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', background: '#f5f3f9', color: 'var(--text-secondary)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Status Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid #f5f3f9' }}>
                <span style={{
                  fontSize: '10px', fontWeight: 700, padding: '3px 10px', borderRadius: '10px',
                  background: t.status === 'active' ? 'rgba(16,185,129,0.1)' : t.status === 'pending' ? 'rgba(245,158,11,0.1)' : 'rgba(239,68,68,0.1)',
                  color: t.status === 'active' ? '#10b981' : t.status === 'pending' ? '#f59e0b' : '#ef4444',
                  textTransform: 'capitalize'
                }}>
                  {t.status}
                </span>
                <button onClick={() => toggleStatus(t.id)} style={{ padding: '5px 12px', borderRadius: '8px', border: '1px solid #ede9f4', background: '#fff', color: 'var(--text-secondary)', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }} className="click-press">
                  {t.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
