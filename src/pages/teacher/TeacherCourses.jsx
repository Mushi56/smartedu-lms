import React, { useState } from 'react';
import { BookOpen, Plus, Search, Edit3, Trash2, Eye, Send, Clock, CheckCircle, XCircle, Filter, Star, X } from 'lucide-react';

export default function TeacherCourses({ db, setDb, user }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [editingCourseId, setEditingCourseId] = useState(null);

  // Form Fields
  const [courseTitle, setCourseTitle] = useState('');
  const [courseCategory, setCourseCategory] = useState('STEM');
  const [courseLevel, setCourseLevel] = useState('Beginner');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseThumbnail, setCourseThumbnail] = useState('');

  const rawCourses = db?.courses || [];

  // Map courses and add simulated metrics if missing
  const courses = rawCourses.map((c, i) => ({
    ...c,
    publishStatus: c.publishStatus || (i === 0 ? 'published' : i === 1 ? 'published' : i === 2 ? 'draft' : 'pending'),
    enrollments: c.studentsCount || Math.floor(Math.random() * 500) + 50,
    revenue: c.revenue || `$${(Math.random() * 5000 + 500).toFixed(0)}`,
    rating: c.rating || '4.8'
  }));

  const filtered = courses.filter(c => {
    const matchSearch = (c.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === 'all' || c.publishStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusConfig = {
    published: { label: 'Published', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
    draft: { label: 'Draft', color: 'var(--text-secondary)', bg: 'var(--bg-input)' },
    pending: { label: 'Pending Review', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
    rejected: { label: 'Rejected', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' }
  };

  const filters = ['all', 'published', 'draft', 'pending', 'rejected'];

  const premiumCard = {
    background: 'var(--bg-card)',
    borderRadius: '20px',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-premium)',
    padding: '16px',
    position: 'relative'
  };

  // Actions
  const handleOpenCreateModal = () => {
    setModalMode('create');
    setEditingCourseId(null);
    setCourseTitle('');
    setCourseCategory('STEM');
    setCourseLevel('Beginner');
    setCourseDescription('');
    setCourseThumbnail('');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (course) => {
    setModalMode('edit');
    setEditingCourseId(course.id);
    setCourseTitle(course.title || '');
    setCourseCategory(course.category || 'STEM');
    setCourseLevel(course.level || 'Beginner');
    setCourseDescription(course.description || '');
    setCourseThumbnail(course.thumbnail || '');
    setIsModalOpen(true);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const updated = rawCourses.filter(c => c.id !== courseId);
      setDb(prev => ({ ...prev, courses: updated }));
    }
  };

  const handleSaveCourse = (e) => {
    e.preventDefault();
    if (!courseTitle.trim()) {
      alert('Course Title is required.');
      return;
    }

    const defaultThumbnail = 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=400&q=80';

    if (modalMode === 'create') {
      const newCourse = {
        id: `c_${Date.now()}`,
        title: courseTitle,
        category: courseCategory,
        level: courseLevel,
        description: courseDescription || 'No description provided.',
        thumbnail: courseThumbnail.trim() || defaultThumbnail,
        teacher: user?.name || 'Instructor',
        progress: 0,
        studentsCount: 0,
        chaptersCount: 0,
        rating: '5.0',
        reviews: 0,
        publishStatus: 'draft',
        modules: []
      };

      const updated = [newCourse, ...rawCourses];
      setDb(prev => ({ ...prev, courses: updated }));
    } else {
      const updated = rawCourses.map(c => {
        if (c.id === editingCourseId) {
          return {
            ...c,
            title: courseTitle,
            category: courseCategory,
            level: courseLevel,
            description: courseDescription,
            thumbnail: courseThumbnail.trim() || c.thumbnail || defaultThumbnail
          };
        }
        return c;
      });
      setDb(prev => ({ ...prev, courses: updated }));
    }

    setIsModalOpen(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid var(--border-color)',
    backgroundColor: 'var(--bg-input)',
    color: 'var(--text-primary)',
    fontSize: '13px',
    outline: 'none',
    fontWeight: 500,
    fontFamily: 'inherit'
  };

  const labelStyle = {
    fontSize: '11px',
    fontWeight: 800,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '6px',
    display: 'block'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>My Courses</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 550 }}>Create and manage your syllabus</p>
        </div>
        <button 
          className="click-press" 
          style={{ 
            fontSize: '11px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '6px',
            background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '14px',
            fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.15)'
          }}
          onClick={handleOpenCreateModal}
        >
          <Plus size={14} /> Create Course
        </button>
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: 'var(--bg-card)', border: '1px solid var(--border-subtle)', borderRadius: '16px',
        padding: '12px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
      }}>
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input 
          type="text" 
          placeholder="Search courses..." 
          value={searchQuery} 
          onChange={e => setSearchQuery(e.target.value)}
          style={{
            border: 'none', background: 'none', outline: 'none',
            fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-primary)', flex: 1,
            fontWeight: 500
          }}
        />
      </div>

      {/* Status Filters */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {filters.map(f => (
          <button 
            key={f} 
            onClick={() => setStatusFilter(f)} 
            className="click-press"
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 750,
              border: 'none',
              background: statusFilter === f ? 'var(--primary-color)' : 'var(--bg-card)',
              color: statusFilter === f ? '#fff' : 'var(--text-secondary)',
              boxShadow: statusFilter === f ? '0 4px 12px rgba(99,102,241,0.2)' : '0 2px 10px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease'
            }}
          >
            {f === 'all' ? 'All Courses' : statusConfig[f]?.label || f}
          </button>
        ))}
      </div>

      {/* Course List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filtered.length === 0 ? (
          <div style={{ ...premiumCard, padding: '48px 24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--bg-input)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
              <BookOpen size={24} />
            </div>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0, fontWeight: 600 }}>No courses found</p>
          </div>
        ) : filtered.map(course => {
          const status = statusConfig[course.publishStatus] || statusConfig.draft;
          return (
            <div 
              key={course.id} 
              style={{ 
                ...premiumCard, 
                padding: '12px', 
                display: 'flex', 
                gap: '14px', 
                alignItems: 'center' 
              }}
            >
              <img 
                src={course.thumbnail} 
                alt={course.title}
                style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover', flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: status.color, backgroundColor: status.bg, padding: '3px 8px', borderRadius: '8px', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
                    {status.label}
                  </span>
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{course.title}</h4>
                <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                  <span>{course.enrollments} students</span>
                  <span style={{ color: 'var(--border-color)' }}>•</span>
                  <span style={{ color: 'var(--primary-color)', fontWeight: 800 }}>{course.revenue}</span>
                  <span style={{ color: 'var(--border-color)' }}>•</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
                    <Star size={11} fill="#f59e0b" stroke="none" />
                    <span>{course.rating || '4.8'}</span>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                <button onClick={() => handleOpenEditModal(course)} className="click-press" style={{ background: 'var(--bg-input)', border: 'none', cursor: 'pointer', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Edit"><Edit3 size={13} /></button>
                <button onClick={() => handleDeleteCourse(course.id)} className="click-press" style={{ background: 'rgba(239, 68, 68, 0.06)', border: 'none', cursor: 'pointer', color: '#ef4444', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Delete"><Trash2 size={13} /></button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CREATE & EDIT MODAL OVERLAY */}
      {isModalOpen && (
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(4px)',
          zIndex: 110,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px'
        }}>
          <div style={{
            background: 'var(--bg-card)',
            borderRadius: '24px',
            border: '1px solid var(--border-subtle)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
            width: '100%',
            maxWidth: '440px',
            maxHeight: '90%',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            animation: 'scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }} className="hide-scrollbar">
            
            {/* Modal Header */}
            <div style={{ padding: '20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {modalMode === 'create' ? 'Create New Course' : 'Edit Course Details'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="click-press"
                style={{ 
                  background: 'var(--bg-input)', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)',
                  width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveCourse} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Course Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Master React & Redux"
                  value={courseTitle}
                  onChange={e => setCourseTitle(e.target.value)}
                  style={inputStyle}
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={labelStyle}>Category</label>
                  <select 
                    value={courseCategory} 
                    onChange={e => setCourseCategory(e.target.value)}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="STEM">STEM</option>
                    <option value="Test Prep">Test Prep</option>
                    <option value="Language">Language</option>
                    <option value="Arts">Arts</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Difficulty Level</label>
                  <select 
                    value={courseLevel} 
                    onChange={e => setCourseLevel(e.target.value)}
                    style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Description</label>
                <textarea 
                  rows={4}
                  placeholder="Tell students what this course covers..."
                  value={courseDescription}
                  onChange={e => setCourseDescription(e.target.value)}
                  style={{ ...inputStyle, resize: 'none', height: '80px' }}
                />
              </div>

              <div>
                <label style={labelStyle}>Thumbnail URL</label>
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..."
                  value={courseThumbnail}
                  onChange={e => setCourseThumbnail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '12px', marginTop: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="click-press"
                  style={{
                    flex: 1, padding: '10px', borderRadius: '12px', border: '1px solid var(--border-color)',
                    background: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: 800, cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="click-press"
                  style={{
                    flex: 1, padding: '10px', borderRadius: '12px', border: 'none',
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', color: '#fff',
                    fontSize: '12px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.2)'
                  }}
                >
                  {modalMode === 'create' ? 'Create Course' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
