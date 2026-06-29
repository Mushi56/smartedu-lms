import React, { useState, useEffect } from 'react';
import {
  PlusCircle, Edit3, Trash2, BookOpen, ChevronDown,
  ChevronRight, Upload, X, Check, Star, Users, Clock,
  DollarSign, FileText, Image, PlayCircle, ArrowLeft,
  GraduationCap, Layers, Tag, Bold, Italic,
  Underline, Strikethrough, Quote, ListIcon, ListOrdered, Link,
  ShieldCheck, Award, Lock, Zap, Download,
  CheckCircle, XCircle, Video, Plus, MoreVertical
} from 'lucide-react';

const CATEGORIES = ['Scholarship Exams', 'Academic', 'Language', 'STEM', 'Arts', 'Business', 'Technology'];
const SUBCATEGORIES = ['SAT', 'IELTS', 'TOEFL', 'GRE', 'Calculus', 'Algebra', 'Physics'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];
const LANGUAGES = ['English', 'Arabic', 'Malay', 'Mandarin', 'French'];
const TARGET_STUDENTS = ['High School Students', 'Undergraduates', 'Professionals', 'All Students'];

const TEACHERS = [
  { name: 'Dr. Ahmed Al-Hassan', specialty: 'SAT & ACT Expert', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80' },
  { name: 'Ms. Sarah Johnson', specialty: 'IELTS & TOEFL Expert', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80' },
  { name: 'Dr. Michael Chen', specialty: 'GRE & GMAT Expert', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80' },
  { name: 'Mr. David Wilson', specialty: 'Computer Science Expert', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' }
];

const STEPS = [
  { step: 1, label: 'Details' },
  { step: 2, label: 'Curriculum' },
  { step: 3, label: 'Pricing' },
  { step: 4, label: 'Media' },
  { step: 5, label: 'Publish' },
];

const emptyForm = {
  title: '', shortTitle: '', category: CATEGORIES[0], subcategory: SUBCATEGORIES[0],
  level: LEVELS[0], description: '', learningOutcomes: [], language: LANGUAGES[0],
  duration: '', targetStudents: TARGET_STUDENTS[0], requirements: '',
  teacher: TEACHERS[0]?.name || '', coTeachers: [], tags: [], thumbnail: '',
  priceType: 'Paid', price: '', discountPrice: '', discountEnabled: false,
  currency: 'USD - US Dollar', publishImmediately: true,
  visibility: 'Public (Everyone)', provideCertificate: true,
  allowPreview: false, enrollmentLimit: '', enrollmentLimitEnabled: false, modules: []
};

// ── Reusable input styles ────────────────────────────────────────
const inputStyle = { width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-input)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' };
const labelStyle = { fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' };
const cardStyle = { background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-premium)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' };
const sectionHeaderStyle = { fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' };

export default function CourseManager({ courses, setDb, initialView = 'list', user }) {
  const [view, setView] = useState(initialView);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [expandedModule, setExpandedModule] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [newOutcome, setNewOutcome] = useState('');
  const [newTag, setNewTag] = useState('');
  const [newModuleTitle, setNewModuleTitle] = useState('');

  useEffect(() => {
    setView(initialView);
    if (initialView === 'create') {
      setForm({
        ...emptyForm,
        teacher: user?.role?.toLowerCase() === 'teacher' ? user.name : (TEACHERS[0]?.name || '')
      });
      setActiveStep(1);
    }
  }, [initialView, user]);

  // Helpers
  const setCourses = (updater) => {
    if (setDb) {
      setDb(prev => ({ ...prev, courses: typeof updater === 'function' ? updater(prev.courses) : updater }));
    }
  };
  const getCourses = () => courses || [];

  const handleSave = () => {
    const obj = {
      id: selectedCourseId || `course-${Date.now()}`,
      title: form.title, teacher: form.teacher, category: form.category,
      price: parseFloat(form.price) || 0, description: form.description,
      level: form.level, language: form.language, thumbnail: form.thumbnail,
      modules: form.modules, progress: 0,
      publishStatus: form.publishImmediately ? 'published' : 'draft',
      enrolledDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      chaptersCount: form.modules.length, studentsCount: 0, rating: 0,
    };
    if (view === 'edit' && selectedCourseId) {
      setCourses(prev => prev.map(c => c.id === selectedCourseId ? obj : c));
    } else {
      setCourses(prev => [obj, ...prev]);
    }
    setView('list'); setSelectedCourseId(null);
  };

  const openEdit = (id) => {
    const c = getCourses().find(x => x.id === id);
    if (!c) return;
    setForm({
      ...emptyForm, title: c.title, shortTitle: c.shortTitle || '',
      category: c.category || CATEGORIES[0], level: c.level || LEVELS[0],
      description: c.description || '', language: c.language || 'English',
      duration: c.duration || '', teacher: c.teacher || TEACHERS[0].name,
      thumbnail: c.thumbnail || '', priceType: c.price ? 'Paid' : 'Free',
      price: String(c.price || ''), modules: c.modules || [],
    });
    setSelectedCourseId(id); setView('edit'); setActiveStep(1);
  };

  // ── LIST VIEW ─────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Courses</h2>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>Manage your course catalog</p>
          </div>
          <button
            onClick={() => { setView('create'); setActiveStep(1); setForm(emptyForm); setSelectedCourseId(null); }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px', padding: '9px 14px',
              background: 'var(--primary-gradient)', color: '#fff', border: 'none',
              borderRadius: '10px', fontSize: '12px', fontWeight: 700, cursor: 'pointer',
              flexShrink: 0
            }}
            className="click-press"
          >
            <PlusCircle size={14} />
            Add Course
          </button>
        </div>

        {/* Course List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {getCourses().length === 0 ? (
            <div style={{ ...cardStyle, alignItems: 'center', padding: '40px 20px', textAlign: 'center' }}>
              <BookOpen size={36} style={{ color: 'var(--border-color)' }} />
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0 }}>No courses yet. Create your first one!</p>
            </div>
          ) : getCourses().map(course => (
            <div key={course.id} style={{ ...cardStyle, flexDirection: 'row', alignItems: 'center', gap: '12px', padding: '14px' }}>
              {/* Thumbnail or icon */}
              <div style={{ width: '50px', height: '50px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0, background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {course.thumbnail
                  ? <img src={course.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <BookOpen size={20} style={{ color: 'var(--primary-color)' }} />
                }
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 2px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {course.title}
                </h3>
                <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: 0 }}>
                  {course.teacher} · <span style={{ color: 'var(--secondary-color)', fontWeight: 700 }}>${course.price}</span>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                <button
                  onClick={() => openEdit(course.id)}
                  style={{ padding: '7px 12px', borderRadius: '8px', background: 'var(--primary-glow)', color: 'var(--primary-color)', border: 'none', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
                  className="click-press"
                >
                  <Edit3 size={12} />
                </button>
                <button
                  onClick={() => setCourses(prev => prev.filter(c => c.id !== course.id))}
                  style={{ padding: '7px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', fontSize: '11px', cursor: 'pointer' }}
                  className="click-press"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── ADD / EDIT COURSE WORKSPACE ────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', margin: '-16px', padding: '16px', background: 'var(--bg-app)', minHeight: '100%', boxSizing: 'border-box' }}>

      {/* Top Bar: Back + Step Title + Actions */}
      <div style={{ background: 'var(--bg-card)', borderRadius: '14px', padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', border: '1px solid var(--border-subtle)' }}>
        <button
          onClick={() => setView('list')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', padding: '4px', flexShrink: 0 }}
          className="click-press"
        >
          <ArrowLeft size={18} />
        </button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 600 }}>
            {view === 'edit' ? 'Edit Course' : 'New Course'} · Step {activeStep} of 5
          </div>
          <h2 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {STEPS[activeStep - 1]?.label}
          </h2>
        </div>
        <button
          onClick={() => { if (activeStep < 5) setActiveStep(p => p + 1); else handleSave(); }}
          style={{
            padding: '8px 16px', borderRadius: '10px', border: 'none',
            background: 'var(--secondary-color)', color: '#fff',
            fontWeight: 700, fontSize: '12px', cursor: 'pointer', flexShrink: 0
          }}
          className="click-press"
        >
          {activeStep === 5 ? 'Publish' : 'Next →'}
        </button>
      </div>

      {/* Step Progress Dots */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'var(--bg-card)', borderRadius: '14px', padding: '12px 14px', border: '1px solid var(--border-subtle)' }}>
        {STEPS.map((s, i) => {
          const isActive = activeStep === s.step;
          const isDone = activeStep > s.step;
          return (
            <React.Fragment key={s.step}>
              <div
                onClick={() => setActiveStep(s.step)}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1, cursor: 'pointer' }}
              >
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: isActive ? 'var(--primary-color)' : isDone ? '#10b981' : '#e2e8f0',
                  color: isActive || isDone ? '#fff' : 'var(--text-secondary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: '11px', transition: 'all 0.2s'
                }}>
                  {isDone ? <Check size={12} strokeWidth={3} /> : s.step}
                </div>
                <span style={{ fontSize: '8.5px', fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--primary-color)' : 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ height: '2px', flex: 1, background: isDone ? '#10b981' : 'var(--border-color)', borderRadius: '1px', marginBottom: '14px' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── STEP 1: COURSE DETAILS ────────────────────────────────── */}
      {activeStep === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Basic Info */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <FileText size={15} style={{ color: 'var(--primary-color)' }} />
              Basic Information
            </div>

            <div>
              <label style={labelStyle}>Course Title *</label>
              <input type="text" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} style={inputStyle} placeholder="e.g. SAT Math Mastery Accelerator" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Category</label>
                <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={inputStyle}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Level</label>
                <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} style={inputStyle}>
                  {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Language</label>
                <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} style={inputStyle}>
                  {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Duration</label>
                <input type="text" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} style={inputStyle} placeholder="e.g. 20 hours" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Description *</label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                rows={4}
                maxLength={800}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                placeholder="Describe what students will learn..."
              />
              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{form.description.length}/800</span>
            </div>
          </div>

          {/* Instructor */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <GraduationCap size={15} style={{ color: 'var(--primary-color)' }} />
              Instructor
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {user?.role?.toLowerCase() === 'teacher' ? (
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                    borderRadius: '10px', border: '1.5px solid var(--primary-color)',
                    background: 'var(--primary-glow)'
                  }}
                >
                  <img src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{user?.name || form.teacher}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Course Instructor (You)</div>
                  </div>
                  <Check size={14} style={{ color: 'var(--primary-color)', flexShrink: 0 }} strokeWidth={3} />
                </div>
              ) : (
                TEACHERS.map(t => (
                  <label key={t.name} onClick={() => setForm(f => ({ ...f, teacher: t.name }))}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
                      borderRadius: '10px', cursor: 'pointer',
                      border: `1.5px solid ${form.teacher === t.name ? 'var(--primary-color)' : 'var(--border-color)'}`,
                      background: form.teacher === t.name ? 'var(--primary-glow)' : '#fafafb',
                      transition: 'all 0.15s'
                    }}
                  >
                    <img src={t.avatar} alt={t.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{t.specialty}</div>
                    </div>
                    {form.teacher === t.name && <Check size={14} style={{ color: 'var(--primary-color)', flexShrink: 0 }} strokeWidth={3} />}
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Target & Requirements */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <Users size={15} style={{ color: 'var(--primary-color)' }} />
              Target Students
            </div>
            <div>
              <label style={labelStyle}>Who is this course for?</label>
              <select value={form.targetStudents} onChange={e => setForm(f => ({ ...f, targetStudents: e.target.value }))} style={inputStyle}>
                {TARGET_STUDENTS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Requirements (Optional)</label>
              <textarea
                value={form.requirements}
                onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))}
                rows={2}
                style={{ ...inputStyle, resize: 'vertical' }}
                placeholder="e.g. Basic algebra knowledge"
              />
            </div>
          </div>

          {/* Learning Outcomes */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <Check size={15} style={{ color: 'var(--primary-color)' }} strokeWidth={3} />
              What Students Will Learn
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {form.learningOutcomes.map((outcome, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px', background: 'var(--bg-app)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <Check size={12} style={{ color: '#10b981', flexShrink: 0 }} strokeWidth={3} />
                  <span style={{ fontSize: '12px', flex: 1, color: 'var(--text-primary)' }}>{outcome}</span>
                  <button type="button" onClick={() => setForm(f => ({ ...f, learningOutcomes: f.learningOutcomes.filter((_, i) => i !== idx) }))}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}>
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
            <form onSubmit={e => { e.preventDefault(); if (!newOutcome.trim()) return; setForm(f => ({ ...f, learningOutcomes: [...f.learningOutcomes, newOutcome.trim()] })); setNewOutcome(''); }} style={{ display: 'flex', gap: '8px' }}>
              <input type="text" value={newOutcome} onChange={e => setNewOutcome(e.target.value)} placeholder="Add a learning outcome..." style={{ ...inputStyle, flex: 1, fontSize: '12px' }} />
              <button type="submit" style={{ padding: '10px 14px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', flexShrink: 0 }}>Add</button>
            </form>
          </div>

          {/* Tags */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>
              <Tag size={15} style={{ color: 'var(--primary-color)' }} />
              Course Tags
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {form.tags.map(tag => (
                <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'var(--primary-glow)', color: 'var(--primary-color)', fontSize: '11px', fontWeight: 700, padding: '4px 10px', borderRadius: '20px' }}>
                  {tag}
                  <X size={10} style={{ cursor: 'pointer' }} onClick={() => setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }))} />
                </span>
              ))}
            </div>
            <form onSubmit={e => { e.preventDefault(); if (!newTag.trim() || form.tags.includes(newTag.trim())) return; setForm(f => ({ ...f, tags: [...f.tags, newTag.trim()] })); setNewTag(''); }} style={{ display: 'flex', gap: '8px' }}>
              <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="Add tag..." style={{ ...inputStyle, flex: 1, fontSize: '12px' }} />
              <button type="submit" style={{ padding: '10px 14px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', flexShrink: 0 }}>+</button>
            </form>
          </div>
        </div>
      )}

      {/* ── STEP 2: CURRICULUM ───────────────────────────────────── */}
      {activeStep === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {[
              { label: 'Modules', value: form.modules.length },
              { label: 'Lessons', value: form.modules.flatMap(m => m.lessons).length },
            ].map(s => (
              <div key={s.label} style={{ ...cardStyle, flexDirection: 'row', alignItems: 'center', gap: '10px', padding: '12px' }}>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-color)' }}>{s.value}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{s.label}</span>
              </div>
            ))}
          </div>

          {/* Add Module */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}><Layers size={15} style={{ color: 'var(--primary-color)' }} /> Add Module</div>
            <form onSubmit={e => { e.preventDefault(); if (!newModuleTitle.trim()) return; setForm(f => ({ ...f, modules: [...f.modules, { id: `m-${Date.now()}`, title: newModuleTitle.trim(), lessons: [] }] })); setNewModuleTitle(''); }} style={{ display: 'flex', gap: '8px' }}>
              <input type="text" value={newModuleTitle} onChange={e => setNewModuleTitle(e.target.value)} placeholder="Module / Chapter title..." style={{ ...inputStyle, flex: 1, fontSize: '12px' }} />
              <button type="submit" style={{ padding: '10px 14px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 700, fontSize: '12px', cursor: 'pointer', flexShrink: 0 }}>Add</button>
            </form>
          </div>

          {/* Module List */}
          {form.modules.length === 0 ? (
            <div style={{ ...cardStyle, alignItems: 'center', padding: '32px 20px', textAlign: 'center' }}>
              <Layers size={32} style={{ color: 'var(--border-color)' }} />
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>No modules yet. Add your first chapter above.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {form.modules.map((mod, idx) => (
                <MobileModuleItem
                  key={mod.id} mod={mod} idx={idx}
                  isExpanded={expandedModule === mod.id}
                  setExpandedModule={setExpandedModule}
                  onDeleteModule={id => setForm(f => ({ ...f, modules: f.modules.filter(m => m.id !== id) }))}
                  onAddLesson={(modId, lt, ld, vn, attachments, vp) => setForm(f => ({ ...f, modules: f.modules.map(m => m.id !== modId ? m : { ...m, lessons: [...m.lessons, { id: `l-${Date.now()}`, title: lt, duration: ld || '10:00', videoName: vn, attachments: attachments || [], videoPreviewUrl: vp }] }) }))}
                  onDeleteLesson={(modId, lesId) => setForm(f => ({ ...f, modules: f.modules.map(m => m.id !== modId ? m : { ...m, lessons: m.lessons.filter(l => l.id !== lesId) }) }))}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── STEP 3: PRICING ─────────────────────────────────────── */}
      {activeStep === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Price type */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}><DollarSign size={15} style={{ color: 'var(--primary-color)' }} /> Price Type</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Free', 'Paid'].map(type => (
                <label key={type} onClick={() => setForm(f => ({ ...f, priceType: type }))}
                  style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    padding: '14px 8px', borderRadius: '12px', cursor: 'pointer',
                    border: `2px solid ${form.priceType === type ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    background: form.priceType === type ? 'var(--primary-glow)' : 'var(--bg-input)', transition: 'all 0.15s'
                  }}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: form.priceType === type ? 'var(--primary-color)' : 'var(--bg-input)', color: form.priceType === type ? '#fff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {type === 'Free' ? <Zap size={16} /> : <DollarSign size={16} />}
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: form.priceType === type ? 'var(--primary-color)' : 'var(--text-primary)' }}>{type}</span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', textAlign: 'center' }}>{type === 'Free' ? 'No cost to enroll' : 'One-time payment'}</span>
                </label>
              ))}
            </div>

            {form.priceType === 'Paid' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                <div>
                  <label style={labelStyle}>Regular Price (USD) *</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} style={{ ...inputStyle, paddingLeft: '28px' }} placeholder="0.00" />
                    <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text-muted)' }}>$</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ ...labelStyle, marginBottom: 0 }}>Discount Price</label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                      <input type="checkbox" checked={form.discountEnabled} onChange={e => setForm(f => ({ ...f, discountEnabled: e.target.checked }))} />
                      Enable
                    </label>
                  </div>
                  {form.discountEnabled && (
                    <div style={{ position: 'relative' }}>
                      <input type="text" value={form.discountPrice} onChange={e => setForm(f => ({ ...f, discountPrice: e.target.value }))} style={{ ...inputStyle, paddingLeft: '28px' }} placeholder="0.00" />
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text-muted)' }}>$</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div>
              <label style={labelStyle}>Currency</label>
              <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} style={inputStyle}>
                <option value="USD - US Dollar">🇺🇸 USD - US Dollar</option>
                <option value="MYR - Malaysian Ringgit">🇲🇾 MYR - Malaysian Ringgit</option>
                <option value="SAR - Saudi Riyal">🇸🇦 SAR - Saudi Riyal</option>
              </select>
            </div>
          </div>

          {/* Publishing Options */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}><Lock size={15} style={{ color: 'var(--primary-color)' }} /> Access Settings</div>

            {[
              { key: 'publishImmediately', label: 'Publish Immediately', sub: 'Make visible to students right away' },
              { key: 'provideCertificate', label: 'Completion Certificate', sub: 'Award certificate when course is done' },
              { key: 'allowPreview', label: 'Allow Free Preview', sub: 'Let guests preview the first lesson' },
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-color)' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.label}</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.sub}</div>
                </div>
                {/* Toggle Switch */}
                <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer', flexShrink: 0 }}>
                  <input type="checkbox" checked={form[item.key]} onChange={e => setForm(f => ({ ...f, [item.key]: e.target.checked }))} style={{ display: 'none' }} />
                  <div style={{ width: '38px', height: '20px', borderRadius: '10px', background: form[item.key] ? 'var(--primary-color)' : '#cbd5e1', transition: 'all 0.2s', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: '2px', left: form[item.key] ? '20px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: 'var(--bg-card)', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                </label>
              </div>
            ))}

            <div style={{ paddingTop: '4px' }}>
              <label style={labelStyle}>Course Visibility</label>
              <select value={form.visibility} onChange={e => setForm(f => ({ ...f, visibility: e.target.value }))} style={inputStyle}>
                <option value="Public (Everyone)">🌐 Public (Everyone)</option>
                <option value="Private (Link Only)">🔒 Private (Link Only)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 4: MEDIA ───────────────────────────────────────── */}
      {activeStep === 4 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Thumbnail */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}><Image size={15} style={{ color: 'var(--primary-color)' }} /> Course Thumbnail</div>

            {/* Preview */}
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-app)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {form.thumbnail ? (
                <>
                  <img src={form.thumbnail} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, thumbnail: '' }))}
                    style={{ position: 'absolute', top: '8px', right: '8px', width: '26px', height: '26px', borderRadius: '50%', background: 'rgba(239,68,68,0.9)', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  ><X size={12} strokeWidth={3} /></button>
                </>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', color: 'var(--text-muted)' }}>
                  <Image size={28} style={{ opacity: 0.4 }} />
                  <span style={{ fontSize: '11px' }}>No thumbnail selected</span>
                </div>
              )}
            </div>

            {/* URL Input */}
            <div>
              <label style={labelStyle}>Paste Image URL</label>
              <input type="text" value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))} style={inputStyle} placeholder="https://example.com/image.jpg" />
            </div>

            {/* Upload button */}
            <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '10px', border: '1.5px dashed var(--primary-color)', background: 'var(--primary-glow)', color: 'var(--primary-color)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}>
              <Upload size={14} />
              Upload from Device
              <input type="file" accept="image/*" style={{ display: 'none' }} onChange={e => {
                const file = e.target.files?.[0]; if (!file) return;
                const reader = new FileReader();
                reader.onload = ev => setForm(f => ({ ...f, thumbnail: ev.target.result }));
                reader.readAsDataURL(file); e.target.value = '';
              }} />
            </label>
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textAlign: 'center' }}>Recommended: 1280×720px (16:9) · JPG, PNG, WebP</span>
          </div>

          {/* Promo Video */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}><Video size={15} style={{ color: '#ef4444' }} /> Promotional Video</div>
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: 'var(--bg-input)', textAlign: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Video size={20} style={{ color: '#ef4444' }} />
              </div>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Upload Promo Video</div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>MP4, MOV — max 200MB</div>
              </div>
            </div>
            <div>
              <label style={labelStyle}>Or paste YouTube URL</label>
              <input type="text" style={inputStyle} placeholder="https://youtube.com/watch?v=..." />
            </div>
          </div>

          {/* Resources */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}><Download size={15} style={{ color: '#22c55e' }} /> Resources</div>
            <div style={{ border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', background: 'var(--bg-input)', textAlign: 'center' }}>
              <FileText size={24} style={{ color: 'var(--text-muted)', opacity: 0.6 }} />
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Attach PDFs, Worksheets, Notes</div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PDF, DOCX, XLSX — max 20MB</div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 5: REVIEW & PUBLISH ─────────────────────────────── */}
      {activeStep === 5 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Course preview card */}
          <div style={{ ...cardStyle, padding: '0', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', background: 'var(--bg-app)' }}>
              {form.thumbnail
                ? <img src={form.thumbnail} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Image size={32} style={{ color: 'var(--border-color)' }} /></div>
              }
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlayCircle size={22} style={{ color: '#311442' }} />
                </div>
              </div>
            </div>
            <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '8px', fontWeight: 800, background: 'var(--primary-glow)', color: 'var(--primary-color)', padding: '2px 8px', borderRadius: '20px' }}>{form.category}</span>
                <span style={{ fontSize: '8px', fontWeight: 800, background: 'rgba(202,186,97,0.15)', color: '#CABA61', padding: '2px 8px', borderRadius: '20px' }}>{form.level}</span>
              </div>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{form.title || 'Untitled Course'}</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <img src={TEACHERS.find(t => t.name === form.teacher)?.avatar || TEACHERS[0].avatar} alt="" style={{ width: '20px', height: '20px', borderRadius: '50%' }} />
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{form.teacher}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '4px' }}>
                <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--primary-color)' }}>
                  {form.priceType === 'Free' ? 'Free' : `$${form.discountEnabled ? form.discountPrice : form.price}`}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                  <Clock size={10} />{form.duration}
                </div>
              </div>
            </div>
          </div>

          {/* Readiness Checklist */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}><CheckCircle size={15} style={{ color: '#22c55e' }} /> Publish Readiness</div>
            {[
              { label: 'Course title set', done: !!form.title },
              { label: 'Description written', done: form.description.length > 20 },
              { label: 'Instructor assigned', done: !!form.teacher },
              { label: 'Thumbnail uploaded', done: !!form.thumbnail },
              { label: 'Curriculum built', done: form.modules.length > 0 },
              { label: 'Pricing configured', done: form.priceType === 'Free' || !!form.price },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                {item.done
                  ? <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} />
                  : <XCircle size={14} style={{ color: '#f87171', flexShrink: 0 }} />
                }
                <span style={{ fontSize: '12px', color: item.done ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: item.done ? 600 : 400 }}>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Publish Actions */}
          <button onClick={handleSave} className="click-press" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 800, fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: '0 6px 20px rgba(37,22,45,0.3)' }}>
            <Award size={18} /> Publish Course
          </button>
          <button onClick={() => setView('list')} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
            Save as Draft
          </button>
        </div>
      )}

      {/* Floating Next/Prev controls */}
      <div style={{ display: 'flex', gap: '10px', paddingBottom: '8px' }}>
        {activeStep > 1 && (
          <button onClick={() => setActiveStep(p => p - 1)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid var(--border-subtle)', background: 'var(--bg-card)', color: 'var(--text-primary)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }} className="click-press">
            ← Back
          </button>
        )}
        {activeStep < 5 && (
          <button onClick={() => setActiveStep(p => p + 1)} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }} className="click-press">
            Next →
          </button>
        )}
      </div>
    </div>
  );
}

// ── Mobile Module Accordion ────────────────────────────────────────
function MobileModuleItem({ mod, idx, isExpanded, setExpandedModule, onDeleteModule, onAddLesson, onDeleteLesson }) {
  const [lTitle, setLTitle] = useState('');
  const [lDuration, setLDuration] = useState('');
  
  // Video File state
  const [lVideoFile, setLVideoFile] = useState(null);
  const [lVideoPreviewUrl, setLVideoPreviewUrl] = useState('');

  // Multiple Attachments state
  const [lAttachments, setLAttachments] = useState([]);
  const [lAttachmentType, setLAttachmentType] = useState('Study Material');

  const ATTACHMENT_TYPES = ['Study Material', 'Practice Material', 'Assignment', 'Slides', 'Syllabus'];

  const handleUploadAttachment = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "");
      setLAttachments(prev => [
        ...prev,
        {
          id: `att-${Date.now()}-${Math.random()}`,
          name: nameWithoutExt,
          type: lAttachmentType,
          fileName: file.name
        }
      ]);
      e.target.value = '';
    }
  };

  const updateAttachment = (id, key, val) => {
    setLAttachments(prev => prev.map(att => att.id === id ? { ...att, [key]: val } : att));
  };

  const deleteAttachment = (id) => {
    setLAttachments(prev => prev.filter(att => att.id !== id));
  };

  return (
    <div style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
      {/* Module Header */}
      <div onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
        style={{ padding: '12px 14px', display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', background: isExpanded ? 'var(--primary-glow)' : 'var(--bg-card)' }}
      >
        <div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'var(--primary-gradient)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>
          {idx + 1}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mod.title}</div>
          <div style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{mod.lessons.length} lesson{mod.lessons.length !== 1 ? 's' : ''}</div>
        </div>
        <button onClick={e => { e.stopPropagation(); onDeleteModule(mod.id); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px', flexShrink: 0 }}>
          <Trash2 size={13} />
        </button>
        <span style={{ color: 'var(--text-secondary)', flexShrink: 0 }}>
          {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
        </span>
      </div>

      {/* Expanded: Lessons */}
      {isExpanded && (
        <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', background: 'var(--bg-input)' }}>
          {mod.lessons.map(les => (
            <div key={les.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', padding: '10px 12px', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-subtle)', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {les.videoPreviewUrl ? (
                  <div style={{ width: '56px', height: '32px', borderRadius: '4px', overflow: 'hidden', background: '#000', border: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                    <video src={les.videoPreviewUrl} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                  </div>
                ) : (
                  <PlayCircle size={14} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                )}
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{les.title}</span>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600, flexShrink: 0 }}>{les.duration}</span>
                <button onClick={() => onDeleteLesson(mod.id, les.id)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px', flexShrink: 0 }} className="click-press">
                  <X size={13} />
                </button>
              </div>
              
              {/* Media & Attachment tags inside lessons list */}
              {((les.videoName || les.videoUrl) || (les.attachments && les.attachments.length > 0)) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingLeft: '22px', marginTop: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                  {(les.videoName || les.videoUrl) && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Video size={12} style={{ color: '#3b82f6' }} /> Video: {les.videoName || 'Uploaded Lecture'}
                    </span>
                  )}
                  {les.attachments && les.attachments.map(att => (
                    <span key={att.id} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FileText size={12} style={{ color: '#10b981' }} />
                      <strong style={{ color: 'var(--text-secondary)' }}>{att.type || 'Attachment'}:</strong> {att.name || att.fileName}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Add lesson form */}
          <form onSubmit={e => { 
            e.preventDefault(); 
            if (!lTitle.trim()) return; 
            onAddLesson(
              mod.id, 
              lTitle.trim(), 
              lDuration || '10:00', 
              lVideoFile ? lVideoFile.name : '', 
              lAttachments,
              lVideoPreviewUrl
            ); 
            // Reset states
            setLTitle(''); 
            setLDuration(''); 
            setLVideoFile(null);
            setLVideoPreviewUrl('');
            setLAttachments([]);
            setLAttachmentType('Study Material');
          }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', padding: '12px', borderRadius: '12px', border: '1px dashed var(--border-color)', background: 'var(--bg-card)', textAlign: 'left' }}
          >
            <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)' }}>Add New Lesson</div>
            <input type="text" value={lTitle} onChange={e => setLTitle(e.target.value)} placeholder="Lesson title (e.g. Intro to SAT Functions)..." style={{ padding: '8px 10px', fontSize: '11px', border: '1px solid var(--border-subtle)', borderRadius: '8px', outline: 'none', background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'inherit' }} required />
            
            {/* Custom Video File Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>Lesson Video</div>
              
              {/* Bigger Video Preview Player */}
              {lVideoPreviewUrl && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', height: 'auto', borderRadius: '8px', overflow: 'hidden', background: '#000', border: '1px solid var(--border-subtle)' }}>
                    <video src={lVideoPreviewUrl} controls controlsList="nodownload" onContextMenu={e => e.preventDefault()} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Tap play to preview video</span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <label className="click-press" style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px',
                  border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)',
                  fontSize: '10.5px', fontWeight: 700, cursor: 'pointer', flexShrink: 0
                }}>
                  <Video size={13} style={{ color: '#3b82f6' }} /> Select Video File
                  <input 
                    type="file" 
                    accept="video/*" 
                    onChange={e => { 
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        setLVideoFile(file); 
                        setLVideoPreviewUrl(URL.createObjectURL(file));
                      }
                    }}
                    style={{ display: 'none' }} 
                  />
                </label>
                
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
                  {lVideoFile ? lVideoFile.name : 'No file selected (gallery/files)'}
                </span>
                {lVideoFile && (
                  <button type="button" onClick={() => { setLVideoFile(null); setLVideoPreviewUrl(''); }} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px', flexShrink: 0 }}>
                    <X size={12} />
                  </button>
                )}
              </div>
            </div>

            {/* Custom Document Attachment Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              <div style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>Lesson Attachments</div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '8px', alignItems: 'center' }}>
                <select 
                  value={lAttachmentType} 
                  onChange={e => setLAttachmentType(e.target.value)}
                  style={{ padding: '6px 10px', fontSize: '11px', border: '1px solid var(--border-subtle)', borderRadius: '8px', outline: 'none', background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'inherit', cursor: 'pointer' }}
                >
                  {ATTACHMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                </select>

                <label className="click-press" style={{
                  display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px',
                  border: '1px solid var(--border-color)', background: 'var(--bg-input)', color: 'var(--text-primary)',
                  fontSize: '10.5px', fontWeight: 700, cursor: 'pointer'
                }}>
                  <FileText size={13} style={{ color: '#10b981' }} /> Add Document
                  <input 
                    type="file" 
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.zip" 
                    onChange={handleUploadAttachment}
                    style={{ display: 'none' }} 
                  />
                </label>
              </div>

              {/* Multiple Uploaded Documents with Rename fields */}
              {lAttachments.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px', background: 'var(--bg-input)', padding: '10px', borderRadius: '10px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>Upload Queue ({lAttachments.length})</span>
                  {lAttachments.map(att => (
                    <div key={att.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--bg-card)', padding: '8px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)' }}>
                        <FileText size={10} style={{ color: '#10b981' }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>{att.fileName}</span>
                        <button type="button" onClick={() => deleteAttachment(att.id)} style={{ border: 'none', background: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}>
                          <X size={12} />
                        </button>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        <input 
                          type="text" 
                          value={att.name} 
                          onChange={e => updateAttachment(att.id, 'name', e.target.value)}
                          placeholder="Rename attachment..."
                          style={{ padding: '4px 8px', fontSize: '10.5px', border: '1px solid var(--border-subtle)', borderRadius: '6px', outline: 'none', background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'inherit' }}
                        />
                        <select 
                          value={att.type} 
                          onChange={e => updateAttachment(att.id, 'type', e.target.value)}
                          style={{ padding: '4px 6px', fontSize: '10.5px', border: '1px solid var(--border-subtle)', borderRadius: '6px', outline: 'none', background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'inherit', cursor: 'pointer' }}
                        >
                          {ATTACHMENT_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '8px' }}>
              <input type="text" value={lDuration} onChange={e => setLDuration(e.target.value)} placeholder="Lesson Duration (e.g. 15:30)" style={{ flex: 1, padding: '8px 10px', fontSize: '11px', border: '1px solid var(--border-subtle)', borderRadius: '8px', outline: 'none', background: 'var(--bg-input)', color: 'var(--text-primary)', fontFamily: 'inherit' }} />
              <button type="submit" style={{ padding: '8px 20px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '11px', cursor: 'pointer' }}>Add Lesson</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
