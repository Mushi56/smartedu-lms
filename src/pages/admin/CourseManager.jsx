import React, { useState, useEffect, useRef } from 'react';
import {
  PlusCircle, Edit3, Trash2, BookOpen, Video, ChevronDown,
  ChevronRight, Upload, X, Check, LayoutGrid, List,
  Star, Users, Clock, DollarSign, Globe, BarChart2,
  FileText, Image, PlayCircle, Plus, ArrowLeft, Save, Eye,
  GraduationCap, Layers, Tag, AlertCircle, Bold, Italic,
  Underline, Strikethrough, Quote, ListIcon, ListOrdered, Link,
  Compass, ShieldCheck, HelpCircle, Award, Lock, Zap, Download,
  Mail, Phone, MapPin, ExternalLink, CheckCircle, XCircle, Info
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

export default function CourseManager({ courses, setCourses, initialView = 'list' }) {
  const [view, setView] = useState(initialView);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [expandedModule, setExpandedModule] = useState(null);

  // Form State matching the Add New Course Mockup exactly
  const [form, setForm] = useState({
    title: 'SAT Math Mastery',
    shortTitle: 'SAT Math',
    category: 'Scholarship Exams',
    subcategory: 'SAT',
    level: 'Advanced',
    description: 'A complete SAT Math preparation course covering advanced concepts, problem-solving strategies, and timed practice tests to help you achieve a high SAT score.',
    learningOutcomes: [
      'Master all SAT Mathematics topics',
      'Advanced problem-solving techniques',
      'Time management strategies for SAT',
      'Full-length practice tests with solutions'
    ],
    language: 'English',
    duration: '24 Hours',
    targetStudents: 'High School Students',
    requirements: 'Basic algebra knowledge is recommended.',
    teacher: 'Dr. Ahmed Al-Hassan',
    coTeachers: ['Ms. Sarah Johnson', 'Mr. Michael Chen'],
    tags: ['SAT', 'Math', 'Scholarship Exams', 'Advanced', 'Problem Solving'],
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80',
    priceType: 'Paid',
    price: '79.00',
    discountPrice: '59.00',
    discountEnabled: true,
    currency: 'USD - US Dollar',
    publishImmediately: true,
    visibility: 'Public (Everyone)',
    provideCertificate: true,
    allowPreview: false,
    enrollmentLimit: '2000',
    enrollmentLimitEnabled: false,
    modules: []
  });

  const [newOutcome, setNewOutcome] = useState('');
  const [newTag, setNewTag] = useState('');
  const [showAddTagInput, setShowAddTagInput] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');

  // Sync view prop changes
  useEffect(() => {
    setView(initialView);
    if (initialView === 'create') {
      setForm({
        title: 'SAT Math Mastery',
        shortTitle: 'SAT Math',
        category: 'Scholarship Exams',
        subcategory: 'SAT',
        level: 'Advanced',
        description: 'A complete SAT Math preparation course covering advanced concepts, problem-solving strategies, and timed practice tests to help you achieve a high SAT score.',
        learningOutcomes: [
          'Master all SAT Mathematics topics',
          'Advanced problem-solving techniques',
          'Time management strategies for SAT',
          'Full-length practice tests with solutions'
        ],
        language: 'English',
        duration: '24 Hours',
        targetStudents: 'High School Students',
        requirements: 'Basic algebra knowledge is recommended.',
        teacher: 'Dr. Ahmed Al-Hassan',
        coTeachers: ['Ms. Sarah Johnson', 'Mr. Michael Chen'],
        tags: ['SAT', 'Math', 'Scholarship Exams', 'Advanced', 'Problem Solving'],
        thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80',
        priceType: 'Paid',
        price: '79.00',
        discountPrice: '59.00',
        discountEnabled: true,
        currency: 'USD - US Dollar',
        publishImmediately: true,
        visibility: 'Public (Everyone)',
        provideCertificate: true,
        allowPreview: false,
        enrollmentLimit: '2000',
        enrollmentLimitEnabled: false,
        modules: []
      });
      setActiveStep(1);
    }
  }, [initialView]);

  const handleOutcomeAdd = (e) => {
    e.preventDefault();
    if (!newOutcome.trim()) return;
    setForm(f => ({ ...f, learningOutcomes: [...f.learningOutcomes, newOutcome.trim()] }));
    setNewOutcome('');
  };

  const handleOutcomeDelete = (idx) => {
    setForm(f => ({ ...f, learningOutcomes: f.learningOutcomes.filter((_, i) => i !== idx) }));
  };

  const handleTagAdd = (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;
    if (!form.tags.includes(newTag.trim())) {
      setForm(f => ({ ...f, tags: [...f.tags, newTag.trim()] }));
    }
    setNewTag('');
    setShowAddTagInput(false);
  };

  const handleTagDelete = (tag) => {
    setForm(f => ({ ...f, tags: f.tags.filter(t => t !== tag) }));
  };

  const handleCoTeacherToggle = (tName) => {
    if (form.coTeachers.includes(tName)) {
      setForm(f => ({ ...f, coTeachers: f.coTeachers.filter(t => t !== tName) }));
    } else {
      setForm(f => ({ ...f, coTeachers: [...f.coTeachers, tName] }));
    }
  };

  const handleSave = () => {
    const obj = {
      id: selectedCourseId || `course-${Date.now()}`,
      title: form.title,
      teacher: form.teacher,
      category: form.category,
      price: parseFloat(form.price) || 0,
      description: form.description,
      level: form.level,
      language: form.language,
      thumbnail: form.thumbnail,
      modules: form.modules,
      progress: 0,
      enrolledDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      chaptersCount: form.modules.length,
      studentsCount: 4250,
      rating: 4.9,
    };

    if (view === 'edit' && selectedCourseId) {
      setCourses(courses.map(c => c.id === selectedCourseId ? obj : c));
    } else {
      setCourses([obj, ...courses]);
    }
    setView('list');
    setSelectedCourseId(null);
  };

  const handleAddModule = (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    setForm(f => ({
      ...f,
      modules: [...f.modules, { id: `m-${Date.now()}`, title: newModuleTitle.trim(), lessons: [] }]
    }));
    setNewModuleTitle('');
  };

  const handleDeleteModule = (modId) => {
    setForm(f => ({ ...f, modules: f.modules.filter(m => m.id !== modId) }));
  };

  const handleAddLesson = (modId, lessonTitle, lessonDuration) => {
    setForm(f => ({
      ...f,
      modules: f.modules.map(m => m.id !== modId ? m : {
        ...m,
        lessons: [...m.lessons, {
          id: `l-${Date.now()}`,
          title: lessonTitle,
          duration: lessonDuration || '10:00',
          videoUrl: ''
        }]
      })
    }));
  };

  const handleDeleteLesson = (modId, lessonId) => {
    setForm(f => ({
      ...f,
      modules: f.modules.map(m => m.id !== modId ? m : {
        ...m,
        lessons: m.lessons.filter(l => l.id !== lessonId)
      })
    }));
  };

  // ─── LIST VIEW ─────────────────────────────────────────────────────────────
  if (view === 'list') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>Course Catalog</h2>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Manage and deploy learning courses for SURIA TECH pupils.</p>
          </div>
          <button onClick={() => { setView('create'); setActiveStep(1); }} className="btn-primary click-press" style={{ padding: '10px 20px' }}>
            <PlusCircle size={16} />
            <span>Add New Course</span>
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {courses.map(course => (
            <div key={course.id} className="smart-card" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '18px 22px', borderLeft: '4px solid var(--primary-color)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <BookOpen size={20} style={{ color: 'var(--primary-color)' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '2px', color: 'var(--text-primary)' }}>{course.title}</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
                  Instructor: {course.teacher} · Category: <span style={{ fontWeight: 600 }}>{course.category}</span> · Price: <span style={{ fontWeight: 700, color: 'var(--status-success)' }}>${course.price}</span>
                </p>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => { setSelectedCourseId(course.id); openEdit(course.id); }} className="btn-primary click-press" style={{ padding: '8px 16px', fontSize: '12px' }}>
                  <Edit3 size={12} /> Manage
                </button>
                <button onClick={() => setCourses(courses.filter(c => c.id !== course.id))} style={{ padding: '8px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', cursor: 'pointer' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const openEdit = (id) => {
    const c = courses.find(x => x.id === id);
    if (!c) return;
    setForm({
      title: c.title,
      shortTitle: c.shortTitle || c.title.split(' ')[0],
      category: c.category || 'Scholarship Exams',
      subcategory: c.subcategory || 'General',
      level: c.level || 'Advanced',
      description: c.description || 'No description provided.',
      learningOutcomes: c.learningOutcomes || ['Standard exam preps'],
      language: c.language || 'English',
      duration: c.duration || '20 Hours',
      targetStudents: c.targetStudents || 'High School Students',
      requirements: c.requirements || 'Basic skills.',
      teacher: c.teacher || 'Dr. Ahmed Al-Hassan',
      coTeachers: c.coTeachers || [],
      tags: c.tags || ['General'],
      thumbnail: c.thumbnail || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80',
      priceType: c.price ? 'Paid' : 'Free',
      price: String(c.price || '0.00'),
      discountPrice: String(c.discountPrice || '0.00'),
      discountEnabled: !!c.discountPrice,
      currency: c.currency || 'USD - US Dollar',
      publishImmediately: true,
      visibility: 'Public (Everyone)',
      provideCertificate: true,
      allowPreview: false,
      enrollmentLimit: '2000',
      enrollmentLimitEnabled: false,
      modules: c.modules || []
    });
    setView('edit');
    setActiveStep(1);
  };

  // ─── ADD NEW COURSE WORKSPACE (STEPS 1 - 5) ──────────────────────────────────
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left', background: '#FAF9FB', minHeight: '100vh', margin: '-24px', padding: '24px' }}>
      
      {/* 1. Header Toolbar with Title and Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Courses &nbsp;&gt;&nbsp; {view === 'edit' ? 'Edit Course' : 'Add New Course'}
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            {view === 'edit' ? 'Edit Course' : 'Add a New Course'}
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Create a comprehensive course and publish it for students.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setView('list')}
            className="click-press"
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: '1px solid var(--primary-color)',
              background: '#ffffff',
              color: 'var(--primary-color)',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Save as Draft
          </button>
          
          <button 
            onClick={() => {
              if (activeStep < 5) {
                setActiveStep(prev => prev + 1);
              } else {
                handleSave();
              }
            }}
            className="click-press"
            style={{
              padding: '10px 24px',
              borderRadius: '8px',
              border: 'none',
              background: 'var(--secondary-color)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(202, 186, 97, 0.2)'
            }}
          >
            {activeStep === 5 ? 'Publish Course' : 'Save & Continue'}
          </button>
        </div>
      </div>

      {/* 2. Horizontal 5-Step Wizard Progress Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        background: '#ffffff', 
        borderRadius: '12px', 
        padding: '16px 24px', 
        border: '1px solid var(--border-color)',
        gap: '8px',
        overflowX: 'auto'
      }}>
        {[
          { step: 1, title: 'Course Details', desc: 'Basic information' },
          { step: 2, title: 'Curriculum', desc: 'Add lessons & sections' },
          { step: 3, title: 'Pricing & Settings', desc: 'Set price & access' },
          { step: 4, title: 'Media & Resources', desc: 'Upload images & files' },
          { step: 5, title: 'Review & Publish', desc: 'Finalize & publish' }
        ].map((s) => {
          const isActive = activeStep === s.step;
          const isDone = activeStep > s.step;
          return (
            <React.Fragment key={s.step}>
              <div 
                onClick={() => setActiveStep(s.step)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '12px', 
                  cursor: 'pointer',
                  opacity: isActive || isDone ? 1 : 0.6,
                  flexShrink: 0
                }}
              >
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: isActive ? 'var(--primary-color)' : isDone ? 'var(--status-success)' : '#e2e8f0',
                  color: isActive || isDone ? '#ffffff' : 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '13px'
                }}>
                  {isDone ? <Check size={14} /> : s.step}
                </div>
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 800, color: isActive ? 'var(--primary-color)' : 'var(--text-primary)', margin: 0 }}>
                    {s.title}
                  </h4>
                  <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                    {s.desc}
                  </span>
                </div>
              </div>
              {s.step < 5 && (
                <div style={{ 
                  flex: 1, 
                  borderTop: '2px dotted var(--border-color)', 
                  margin: '0 8px',
                  minWidth: '20px'
                }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── STEP 1 VIEW: COURSE DETAILS ────────────────────────────────────── */}
      {activeStep === 1 && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '20px', alignItems: 'start' }} className="responsive-hero-grid">
          
          {/* LEFT FORM COLUMN (Basic Information & Outcome list) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Basic Info Card */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} style={{ color: 'var(--primary-color)' }} />
                <span>Basic Information</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Course Title *</label>
                  <input 
                    type="text" 
                    value={form.title} 
                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))} 
                    style={{ fontSize: '13px' }}
                  />
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Short Title (Optional)</label>
                  <input 
                    type="text" 
                    value={form.shortTitle} 
                    onChange={e => setForm(f => ({ ...f, shortTitle: e.target.value }))} 
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Category *</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} style={{ fontSize: '13px' }}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Subcategory</label>
                  <select value={form.subcategory} onChange={e => setForm(f => ({ ...f, subcategory: e.target.value }))} style={{ fontSize: '13px' }}>
                    {SUBCATEGORIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Level *</label>
                  <select value={form.level} onChange={e => setForm(f => ({ ...f, level: e.target.value }))} style={{ fontSize: '13px' }}>
                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Course Description *</label>
                
                {/* Description Formatting toolbar */}
                <div style={{ display: 'flex', gap: '4px', border: '1px solid var(--border-color)', borderBottom: 'none', background: '#fafafb', padding: '6px 12px', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><Bold size={13} /></button>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><Italic size={13} /></button>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><Underline size={13} /></button>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><Strikethrough size={13} /></button>
                  <span style={{ borderLeft: '1px solid var(--border-color)', margin: '0 4px' }}></span>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><Quote size={13} /></button>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><ListIcon size={13} /></button>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><ListOrdered size={13} /></button>
                  <span style={{ borderLeft: '1px solid var(--border-color)', margin: '0 4px' }}></span>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><Link size={13} /></button>
                  <button type="button" style={{ background: 'none', border: 'none', color: '#666', padding: '4px', cursor: 'pointer' }}><Image size={13} /></button>
                </div>

                <textarea 
                  value={form.description} 
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  rows={4}
                  maxLength={800}
                  style={{ 
                    borderTopLeftRadius: 0, 
                    borderTopRightRadius: 0, 
                    fontSize: '13px', 
                    lineHeight: 1.5,
                    fontFamily: 'inherit',
                    padding: '10px 12px'
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {form.description.length} / 800 characters
                </div>
              </div>
            </div>

            {/* What Students Will Learn Outcomes */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>What students will learn</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {form.learningOutcomes.map((outcome, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#FAF9FB', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={11} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: '12px', color: 'var(--text-primary)', flex: 1 }}>{outcome}</span>
                    <button type="button" onClick={() => handleOutcomeDelete(idx)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Outcome inline form */}
              <form onSubmit={handleOutcomeAdd} style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <input 
                  type="text" 
                  placeholder="e.g. Master trigonometry ratios" 
                  value={newOutcome} 
                  onChange={e => setNewOutcome(e.target.value)} 
                  style={{ fontSize: '12px', flex: 1 }}
                />
                <button type="submit" className="btn-primary click-press" style={{ padding: '8px 14px', fontSize: '12px', borderRadius: '8px' }}>
                  Add
                </button>
              </form>
            </div>

            {/* Course Details Secondary Card */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Compass size={16} style={{ color: 'var(--primary-color)' }} />
                <span>Course Details</span>
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Language *</label>
                  <select value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} style={{ fontSize: '13px' }}>
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Estimated Duration *</label>
                  <div style={{ position: 'relative' }}>
                    <input 
                      type="text" 
                      value={form.duration} 
                      onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} 
                      style={{ fontSize: '13px', paddingLeft: '32px' }}
                    />
                    <Clock size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Target Students</label>
                <select value={form.targetStudents} onChange={e => setForm(f => ({ ...f, targetStudents: e.target.value }))} style={{ fontSize: '13px' }}>
                  {TARGET_STUDENTS.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Course Requirements (Optional)</label>
                <textarea 
                  value={form.requirements} 
                  onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))}
                  rows={2}
                  maxLength={300}
                  style={{ fontSize: '13px', padding: '10px' }}
                />
                <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {form.requirements.length} / 300 characters
                </div>
              </div>
            </div>
          </div>

          {/* CENTER FORM COLUMN (Teacher, Tags, Thumbnail) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Teacher Selection Card */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <GraduationCap size={16} style={{ color: 'var(--primary-color)' }} />
                <span>Teacher & Category</span>
              </h3>

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Select Teacher *</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', border: '1px solid var(--border-color)', borderRadius: '8px', background: '#ffffff' }}>
                  <img src={TEACHERS.find(t => t.name === form.teacher)?.avatar || TEACHERS[0].avatar} alt="Teacher" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{form.teacher}</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>{TEACHERS.find(t => t.name === form.teacher)?.specialty}</div>
                  </div>
                  <div style={{ color: 'var(--status-success)', display: 'flex', alignItems: 'center' }}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Assign Co-teachers */}
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Assign Co-Teachers (Optional)</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 10px', background: '#ffffff' }}>
                  {form.coTeachers.map(teacherName => (
                    <span key={teacherName} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(124, 58, 237, 0.08)', color: 'var(--primary-color)', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px' }}>
                      {teacherName}
                      <X size={10} style={{ cursor: 'pointer' }} onClick={() => handleCoTeacherToggle(teacherName)} />
                    </span>
                  ))}
                  {TEACHERS.map(t => {
                    if (t.name === form.teacher || form.coTeachers.includes(t.name)) return null;
                    return (
                      <span 
                        key={t.name}
                        onClick={() => handleCoTeacherToggle(t.name)}
                        style={{ display: 'inline-flex', alignItems: 'center', background: '#f1f5f9', color: '#475569', fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '20px', cursor: 'pointer' }}
                      >
                        + {t.name}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Course Tags */}
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Course Tags</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                  {form.tags.map(tag => (
                    <span key={tag} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(124, 58, 237, 0.08)', color: 'var(--primary-color)', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px' }}>
                      {tag}
                      <X size={10} style={{ cursor: 'pointer' }} onClick={() => handleTagDelete(tag)} />
                    </span>
                  ))}
                  
                  {showAddTagInput ? (
                    <form onSubmit={handleTagAdd} style={{ display: 'inline-flex' }}>
                      <input 
                        type="text" 
                        value={newTag} 
                        onChange={e => setNewTag(e.target.value)} 
                        placeholder="Tag..."
                        autoFocus
                        style={{ padding: '2px 6px', fontSize: '10px', borderRadius: '4px', width: '60px' }}
                      />
                    </form>
                  ) : (
                    <span 
                      onClick={() => setShowAddTagInput(true)}
                      style={{ display: 'inline-flex', alignItems: 'center', background: 'none', border: '1px dotted var(--primary-color)', color: 'var(--primary-color)', fontSize: '10px', fontWeight: 700, padding: '2px 8px', borderRadius: '20px', cursor: 'pointer' }}
                    >
                      + Add Tag
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Course Thumbnail Upload Box */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Course Thumbnail *</h3>
              
              <div style={{ position: 'relative', width: '100%', height: '130px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
                <img src={form.thumbnail} alt="Thumbnail Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <button style={{ position: 'absolute', top: '10px', right: '10px', width: '28px', height: '28px', borderRadius: '6px', background: 'rgba(255,255,255,0.9)', color: 'var(--text-primary)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                  <Edit3 size={12} />
                </button>
              </div>

              <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Recommended size: 1280x720px (16:9)</span>

              {/* Dotted Upload row of preview media */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                <div style={{ height: '36px', borderRadius: '4px', overflow: 'hidden' }}>
                  <img src={form.thumbnail} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ height: '36px', borderRadius: '4px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=100&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ height: '36px', borderRadius: '4px', overflow: 'hidden' }}>
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=100&q=80" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ height: '36px', border: '1px dotted var(--primary-color)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', fontSize: '14px', cursor: 'pointer', fontWeight: 800 }}>
                  +
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM COLUMN (Pricing, Publishing Options, Auto Save) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Pricing Options */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <DollarSign size={16} style={{ color: 'var(--primary-color)' }} />
                <span>Pricing</span>
              </h3>

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>Price Type</label>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    <input 
                      type="radio" 
                      name="priceType" 
                      value="Paid" 
                      checked={form.priceType === 'Paid'} 
                      onChange={e => setForm(f => ({ ...f, priceType: e.target.value }))} 
                    />
                    <span>Paid</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 600 }}>
                    <input 
                      type="radio" 
                      name="priceType" 
                      value="Free" 
                      checked={form.priceType === 'Free'} 
                      onChange={e => setForm(f => ({ ...f, priceType: e.target.value }))} 
                    />
                    <span>Free</span>
                  </label>
                </div>
              </div>

              {form.priceType === 'Paid' && (
                <>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Course Price (USD) *</label>
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        value={form.price} 
                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))} 
                        style={{ fontSize: '13px', paddingLeft: '24px' }}
                      />
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>$</span>
                    </div>
                  </div>

                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Discount Price (Optional)</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 600 }}>
                        <span>Enable</span>
                        <input 
                          type="checkbox" 
                          checked={form.discountEnabled} 
                          onChange={e => setForm(f => ({ ...f, discountEnabled: e.target.checked }))} 
                        />
                      </label>
                    </div>
                    {form.discountEnabled && (
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="text" 
                          value={form.discountPrice} 
                          onChange={e => setForm(f => ({ ...f, discountPrice: e.target.value }))} 
                          style={{ fontSize: '13px', paddingLeft: '24px' }}
                        />
                        <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 700, color: 'var(--text-muted)' }}>$</span>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Currency</label>
                <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} style={{ fontSize: '13px' }}>
                  <option value="USD - US Dollar">USD - US Dollar</option>
                  <option value="MYR - Malaysian Ringgit">MYR - Malaysian Ringgit</option>
                  <option value="SAR - Saudi Riyal">SAR - Saudi Riyal</option>
                </select>
              </div>
            </div>

            {/* Publishing Options Card */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={16} style={{ color: 'var(--primary-color)' }} />
                <span>Publishing Options</span>
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Status</div>
                  <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Publish immediately</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={form.publishImmediately} 
                  onChange={e => setForm(f => ({ ...f, publishImmediately: e.target.checked }))} 
                />
              </div>

              <div className="form-group" style={{ marginTop: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Course Visibility</label>
                <select value={form.visibility} onChange={e => setForm(f => ({ ...f, visibility: e.target.value }))} style={{ fontSize: '12px' }}>
                  <option value="Public (Everyone)">Public (Everyone)</option>
                  <option value="Private (Link Only)">Private (Link Only)</option>
                </select>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Certificate</div>
                  <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Provide completion certificate</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={form.provideCertificate} 
                  onChange={e => setForm(f => ({ ...f, provideCertificate: e.target.checked }))} 
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px', marginTop: '4px' }}>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Trial Access</div>
                  <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Allow preview lessons</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={form.allowPreview} 
                  onChange={e => setForm(f => ({ ...f, allowPreview: e.target.checked }))} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '12px' }}>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Enrollment Limit</div>
                    <span style={{ fontSize: '9px', color: 'var(--text-secondary)' }}>Cap total students count</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={form.enrollmentLimitEnabled} 
                    onChange={e => setForm(f => ({ ...f, enrollmentLimitEnabled: e.target.checked }))} 
                  />
                </div>
                {form.enrollmentLimitEnabled && (
                  <input 
                    type="number" 
                    value={form.enrollmentLimit} 
                    onChange={e => setForm(f => ({ ...f, enrollmentLimit: e.target.value }))} 
                    style={{ padding: '6px 10px', fontSize: '11px', borderRadius: '6px', border: '1px solid var(--border-color)' }}
                  />
                )}
              </div>
            </div>

            {/* Gold Auto Save Notice Card */}
            <div style={{ 
              padding: '16px', 
              background: '#FFF8E6', 
              border: '1px solid #FFE0A3', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'start',
              gap: '12px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <div style={{ 
                width: '32px', height: '32px', borderRadius: '50%', 
                background: '#FFC92F', color: '#1a0a26',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShieldCheck size={16} />
              </div>
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#6A4A00', margin: '0 0 2px 0' }}>Auto Save</h4>
                <p style={{ fontSize: '10px', color: '#8F6F1F', margin: 0, lineHeight: 1.4 }}>
                  Your changes are automatically saved every few seconds.
                </p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* ── STEP 2 VIEW: CURRICULUM WORKSPACE ───────────────────────────────── */}
      {activeStep === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Module Editor */}
          <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Layers size={18} style={{ color: 'var(--primary-color)' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Course Curriculum</h3>
                <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Create modules, sections, and add videos lessons</p>
              </div>
            </div>

            {/* Add Module Box */}
            <form onSubmit={handleAddModule} style={{ display: 'flex', gap: '10px', padding: '16px', background: '#FAF9FB', border: '1px dashed var(--border-color)', borderRadius: '10px' }}>
              <input 
                type="text" 
                placeholder="Chapter / Module Title..." 
                value={newModuleTitle}
                onChange={e => setNewModuleTitle(e.target.value)}
                style={{ flex: 1, fontSize: '12px' }}
              />
              <button type="submit" className="btn-primary click-press" style={{ padding: '8px 16px', fontSize: '12px' }}>
                Add Module
              </button>
            </form>

            {/* Modules List Accordion */}
            {form.modules.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-muted)' }}>
                <Layers size={36} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p style={{ fontSize: '13px', fontWeight: 600, margin: '0 0 2px 0' }}>No chapters created yet</p>
                <p style={{ fontSize: '11px', margin: 0 }}>Create your first learning unit above</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {form.modules.map((mod, idx) => {
                  const isExpanded = expandedModule === mod.id;
                  return (
                    <ModuleAccordionItem
                      key={mod.id}
                      mod={mod}
                      idx={idx}
                      isExpanded={isExpanded}
                      setExpandedModule={setExpandedModule}
                      onDeleteModule={handleDeleteModule}
                      onAddLesson={handleAddLesson}
                      onDeleteLesson={handleDeleteLesson}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Guidelines Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="smart-card" style={{ padding: '20px', background: '#ffffff' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px 0' }}>📋 Syllabus Summary</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Total Chapters</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{form.modules.length}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Total Lessons</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{form.modules.flatMap(m => m.lessons).length}</span>
                </div>
              </div>
            </div>

            <div className="smart-card" style={{ padding: '20px', background: 'var(--primary-glow)', border: '1px solid rgba(58,32,72,0.1)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--primary-color)', margin: '0 0 10px 0' }}>💡 Teaching Tips</h4>
              <ul style={{ paddingLeft: '16px', fontSize: '11px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px', margin: 0 }}>
                <li>Keep video duration within 10-15 minutes for better retention.</li>
                <li>Add descriptive titles to lectures to set expectations.</li>
                <li>Conclude modules with an exam or review sheet.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 3: PRICING & SETTINGS ───────────────────────────────────────── */}
      {activeStep === 3 && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Left: Pricing + Access Settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Pricing Card */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(202,186,97,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <DollarSign size={18} style={{ color: '#CABA61' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Pricing Configuration</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Set course price, discounts, and currency</p>
                </div>
              </div>

              {/* Price Type Selector */}
              <div>
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Price Type</label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {['Free', 'Paid', 'Subscription'].map(type => (
                    <label key={type} style={{
                      flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                      padding: '14px 12px', borderRadius: '10px', cursor: 'pointer',
                      border: `2px solid ${form.priceType === type ? 'var(--primary-color)' : 'var(--border-color)'}`,
                      background: form.priceType === type ? 'var(--primary-glow)' : '#fafafb',
                      transition: 'all 0.2s'
                    }}>
                      <input type="radio" name="priceType3" value={type} checked={form.priceType === type} onChange={e => setForm(f => ({ ...f, priceType: e.target.value }))} style={{ display: 'none' }} />
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: form.priceType === type ? 'var(--primary-color)' : '#e2e8f0', color: form.priceType === type ? '#fff' : 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {type === 'Free' ? <Zap size={16} /> : type === 'Paid' ? <DollarSign size={16} /> : <Award size={16} />}
                      </div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: form.priceType === type ? 'var(--primary-color)' : 'var(--text-primary)' }}>{type}</span>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', textAlign: 'center' }}>
                        {type === 'Free' ? 'No cost to enroll' : type === 'Paid' ? 'One-time payment' : 'Monthly/yearly plan'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {form.priceType === 'Paid' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Regular Price *</label>
                    <div style={{ position: 'relative' }}>
                      <input type="text" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} style={{ fontSize: '14px', fontWeight: 700, paddingLeft: '28px' }} />
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text-secondary)', fontSize: '14px' }}>$</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Discount Price</label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '5px', cursor: 'pointer', fontSize: '10px', color: 'var(--text-secondary)' }}>
                        <input type="checkbox" checked={form.discountEnabled} onChange={e => setForm(f => ({ ...f, discountEnabled: e.target.checked }))} />
                        Enable
                      </label>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <input type="text" value={form.discountPrice} onChange={e => setForm(f => ({ ...f, discountPrice: e.target.value }))} disabled={!form.discountEnabled} style={{ fontSize: '14px', fontWeight: 700, paddingLeft: '28px', opacity: form.discountEnabled ? 1 : 0.4 }} />
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontWeight: 800, color: 'var(--text-secondary)', fontSize: '14px' }}>$</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Currency</label>
                <select value={form.currency} onChange={e => setForm(f => ({ ...f, currency: e.target.value }))} style={{ fontSize: '13px' }}>
                  <option value="USD - US Dollar">🇺🇸 USD - US Dollar</option>
                  <option value="MYR - Malaysian Ringgit">🇲🇾 MYR - Malaysian Ringgit</option>
                  <option value="SAR - Saudi Riyal">🇸🇦 SAR - Saudi Riyal</option>
                  <option value="EUR - Euro">🇪🇺 EUR - Euro</option>
                  <option value="GBP - British Pound">🇬🇧 GBP - British Pound</option>
                </select>
              </div>

              {/* Savings highlight */}
              {form.priceType === 'Paid' && form.discountEnabled && (
                <div style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.18)', borderRadius: '10px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={16} style={{ color: '#22c55e', flexShrink: 0 }} />
                  <div style={{ fontSize: '12px' }}>
                    <span style={{ fontWeight: 700, color: '#16a34a' }}>Discount Active</span>
                    <span style={{ color: 'var(--text-secondary)', marginLeft: '6px' }}>
                      Students save ${(parseFloat(form.price || 0) - parseFloat(form.discountPrice || 0)).toFixed(2)} ({Math.round(((parseFloat(form.price||0) - parseFloat(form.discountPrice||0)) / parseFloat(form.price||1)) * 100)}% off)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Access & Enrollment Settings */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Lock size={18} style={{ color: 'var(--primary-color)' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Access & Enrollment Settings</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Control who can enroll and how</p>
                </div>
              </div>

              {[
                { key: 'publishImmediately', label: 'Publish Immediately', sub: 'Make course visible to students right away', icon: <Zap size={15} /> },
                { key: 'provideCertificate', label: 'Completion Certificate', sub: 'Award certificate to students who finish the course', icon: <Award size={15} /> },
                { key: 'allowPreview', label: 'Allow Free Preview', sub: 'Let unregistered users preview the first lesson', icon: <Eye size={15} /> },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#fafafb', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: form[item.key] ? 'var(--primary-glow)' : '#e2e8f0', color: form[item.key] ? 'var(--primary-color)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{item.label}</div>
                      <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.sub}</div>
                    </div>
                  </div>
                  <label style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form[item.key]} onChange={e => setForm(f => ({ ...f, [item.key]: e.target.checked }))} style={{ display: 'none' }} />
                    <div style={{
                      width: '40px', height: '22px', borderRadius: '11px',
                      background: form[item.key] ? 'var(--primary-color)' : '#cbd5e1',
                      transition: 'all 0.2s', position: 'relative'
                    }}>
                      <div style={{
                        position: 'absolute', top: '3px', left: form[item.key] ? '21px' : '3px',
                        width: '16px', height: '16px', borderRadius: '50%', background: '#fff',
                        transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                      }} />
                    </div>
                  </label>
                </div>
              ))}

              {/* Visibility & Enrollment Limit */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Course Visibility</label>
                  <select value={form.visibility} onChange={e => setForm(f => ({ ...f, visibility: e.target.value }))} style={{ fontSize: '13px' }}>
                    <option value="Public (Everyone)">🌐 Public (Everyone)</option>
                    <option value="Private (Link Only)">🔒 Private (Link Only)</option>
                    <option value="Password Protected">🔑 Password Protected</option>
                  </select>
                </div>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Enrollment Limit</label>
                  <input
                    type="number"
                    value={form.enrollmentLimit}
                    onChange={e => setForm(f => ({ ...f, enrollmentLimit: e.target.value }))}
                    placeholder="Unlimited"
                    style={{ fontSize: '13px' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar: Summary + Tips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Pricing Summary Card */}
            <div className="smart-card" style={{ padding: '20px', background: '#ffffff' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BarChart2 size={14} style={{ color: 'var(--primary-color)' }} />
                Pricing Summary
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12px' }}>
                {[
                  { label: 'Regular Price', val: form.priceType === 'Paid' ? `$${form.price}` : 'Free' },
                  { label: 'Discount Price', val: form.discountEnabled && form.priceType === 'Paid' ? `$${form.discountPrice}` : '—' },
                  { label: 'Currency', val: form.currency.split(' - ')[0] },
                  { label: 'Enrollment Cap', val: form.enrollmentLimit || 'Unlimited' },
                  { label: 'Visibility', val: form.visibility },
                  { label: 'Certificate', val: form.provideCertificate ? 'Yes ✓' : 'No' },
                ].map(row => (
                  <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{row.label}</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{row.val}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(202,186,97,0.1)', borderRadius: '8px', textAlign: 'center' }}>
                <div style={{ fontSize: '22px', fontWeight: 800, color: '#CABA61' }}>
                  ${form.priceType === 'Paid' ? (form.discountEnabled ? form.discountPrice : form.price) : '0.00'}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Student will pay</div>
              </div>
            </div>

            <div style={{ padding: '16px', background: '#FFF8E6', border: '1px solid #FFE0A3', borderRadius: '12px', display: 'flex', alignItems: 'start', gap: '12px' }}>
              <ShieldCheck size={18} style={{ color: '#CABA61', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#6A4A00', margin: '0 0 4px 0' }}>Pricing Tips</h4>
                <ul style={{ paddingLeft: '14px', fontSize: '10px', color: '#8F6F1F', margin: 0, display: 'flex', flexDirection: 'column', gap: '4px', lineHeight: 1.5 }}>
                  <li>A discount of 20-30% boosts enrollments significantly.</li>
                  <li>Free courses get 3x more trial enrollments.</li>
                  <li>Certificates increase perceived course value.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 4: MEDIA & RESOURCES ────────────────────────────────────────── */}
      {activeStep === 4 && (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
          {/* Main upload column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Course Thumbnail Upload */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Image size={18} style={{ color: '#6366f1' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Course Thumbnail</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Recommended 1280×720px (16:9 ratio), max 5MB</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Preview */}
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-color)', aspectRatio: '16/9' }}>
                  <img src={form.thumbnail} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayCircle size={32} style={{ color: '#fff', opacity: 0.9 }} />
                  </div>
                  <div style={{ position: 'absolute', top: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', borderRadius: '6px', padding: '4px 8px', fontSize: '10px', fontWeight: 700, color: '#333' }}>
                    Preview
                  </div>
                </div>

                {/* Upload area */}
                <div style={{
                  border: '2px dashed var(--primary-color)', borderRadius: '12px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  gap: '10px', padding: '20px', cursor: 'pointer', background: 'var(--primary-glow)',
                  aspectRatio: '16/9'
                }}>
                  <Upload size={28} style={{ color: 'var(--primary-color)' }} />
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--primary-color)' }}>Click to Upload</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>or drag & drop here</div>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>PNG, JPG, WEBP (max 5MB)</div>
                  </div>
                </div>
              </div>

              {/* Thumbnail URL Input */}
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Or paste image URL</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={form.thumbnail} onChange={e => setForm(f => ({ ...f, thumbnail: e.target.value }))} placeholder="https://..." style={{ fontSize: '12px', flex: 1 }} />
                  <button type="button" style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#fff', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '12px' }}>
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Promotional Video */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Video size={18} style={{ color: '#ef4444' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Promotional Video</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Add a short intro video to attract students (YouTube or direct URL)</p>
                </div>
              </div>
              <div style={{ border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', cursor: 'pointer', background: '#fafafb' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(239,68,68,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Video size={24} style={{ color: '#ef4444' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Upload Promo Video</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>MP4, MOV, AVI — max 200MB</div>
                </div>
                <button type="button" className="btn-primary click-press" style={{ padding: '8px 20px', fontSize: '12px' }}>
                  Choose File
                </button>
              </div>
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Or paste YouTube / Vimeo URL</label>
                <input type="text" placeholder="https://youtube.com/watch?v=..." style={{ fontSize: '12px' }} />
              </div>
            </div>

            {/* Downloadable Resources */}
            <div className="smart-card" style={{ padding: '24px', background: '#ffffff', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(34,197,94,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Download size={18} style={{ color: '#22c55e' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Downloadable Resources</h3>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>PDFs, worksheets, notes, cheat sheets</p>
                </div>
              </div>

              <div style={{ border: '2px dashed var(--border-color)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', background: '#fafafb' }}>
                <FileText size={28} style={{ color: 'var(--text-muted)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Drag & drop resource files here</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>PDF, DOCX, XLSX, ZIP — max 20MB each</div>
                </div>
                <button type="button" style={{ padding: '8px 16px', fontSize: '11px', borderRadius: '8px', border: '1px solid var(--border-color)', background: '#fff', cursor: 'pointer', fontWeight: 600 }}>
                  Browse Files
                </button>
              </div>

              {/* Sample uploaded files */}
              {[
                { name: 'SAT_Math_Cheatsheet.pdf', size: '1.2 MB', type: 'PDF' },
                { name: 'Practice_Test_1.docx', size: '840 KB', type: 'DOCX' },
              ].map((file, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', background: '#fafafb', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '6px', background: 'rgba(99,102,241,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: 800, color: '#6366f1' }}>
                    {file.type}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{file.name}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{file.size}</div>
                  </div>
                  <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={14} /></button>
                </div>
              ))}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="smart-card" style={{ padding: '20px', background: '#ffffff' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle size={14} style={{ color: '#22c55e' }} />
                Media Checklist
              </h4>
              {[
                { label: 'Course thumbnail uploaded', done: true },
                { label: 'Promotional video added', done: false },
                { label: 'At least 1 resource file', done: true },
                { label: 'Preview image set', done: true },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--border-color)', fontSize: '12px' }}>
                  {item.done ? <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} /> : <XCircle size={14} style={{ color: '#cbd5e1', flexShrink: 0 }} />}
                  <span style={{ color: item.done ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: item.done ? 600 : 400 }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: '16px', background: 'var(--primary-glow)', border: '1px solid rgba(124,58,237,0.1)', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-color)', margin: '0 0 8px 0' }}>📸 Media Best Practices</h4>
              <ul style={{ paddingLeft: '14px', fontSize: '10px', color: 'var(--text-secondary)', margin: 0, display: 'flex', flexDirection: 'column', gap: '5px', lineHeight: 1.5 }}>
                <li>Use a bright, clear thumbnail with visible text.</li>
                <li>Promo video should be 1-3 minutes long.</li>
                <li>Organize PDFs with descriptive file names.</li>
                <li>Use 16:9 ratio for all video thumbnails.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 5: REVIEW & PUBLISH ─────────────────────────────────────────── */}
      {activeStep === 5 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Review Banner */}
          <div style={{ background: 'linear-gradient(135deg, var(--primary-color) 0%, #9333ea 100%)', borderRadius: '16px', padding: '28px 32px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Award size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '0 0 4px 0' }}>Ready to Publish!</h3>
                <p style={{ fontSize: '13px', opacity: 0.85, margin: 0 }}>Review all sections below and publish your course to the live catalog.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setActiveStep(1)} style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}>
                Edit Details
              </button>
              <button onClick={handleSave} className="click-press" style={{ padding: '10px 24px', borderRadius: '8px', border: 'none', background: '#CABA61', color: '#1a0a26', fontWeight: 800, fontSize: '13px', cursor: 'pointer', boxShadow: '0 4px 16px rgba(202,186,97,0.4)' }}>
                🚀 Publish Course
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', alignItems: 'start' }}>
            {/* Left: Course summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Course Preview Card */}
              <div className="smart-card" style={{ padding: '0', background: '#ffffff', overflow: 'hidden' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr' }}>
                  <div style={{ position: 'relative', height: '160px' }}>
                    <img src={form.thumbnail} alt="Course Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <PlayCircle size={36} style={{ color: '#fff' }} fill="rgba(255,255,255,0.9)" />
                    </div>
                  </div>
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '9px', fontWeight: 800, background: 'var(--primary-glow)', color: 'var(--primary-color)', padding: '2px 8px', borderRadius: '20px' }}>{form.category}</span>
                      <span style={{ fontSize: '9px', fontWeight: 800, background: 'rgba(202,186,97,0.15)', color: '#CABA61', padding: '2px 8px', borderRadius: '20px' }}>{form.level}</span>
                      <span style={{ fontSize: '9px', fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '20px' }}>{form.language}</span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{form.title}</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{form.description.substring(0, 100)}...</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)', marginTop: 'auto' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <img src={TEACHERS.find(t => t.name === form.teacher)?.avatar || TEACHERS[0].avatar} alt="" style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                        <span>{form.teacher}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#FFC92F' }}>
                        <Star size={10} fill="currentColor" />
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>4.9</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <Clock size={10} />
                        <span>{form.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sections Review Summary */}
              {[
                { step: 1, title: 'Course Details', icon: <FileText size={14} />, items: [`Title: ${form.title}`, `Category: ${form.category}`, `Level: ${form.level}`, `Language: ${form.language}`] },
                { step: 2, title: 'Curriculum', icon: <Layers size={14} />, items: [`${form.modules.length} modules added`, `${form.modules.flatMap(m => m.lessons).length} total lessons`, form.modules.length === 0 ? '⚠ No modules yet' : '✓ Ready'] },
                { step: 3, title: 'Pricing & Settings', icon: <DollarSign size={14} />, items: [`Type: ${form.priceType}`, form.priceType === 'Paid' ? `Price: $${form.discountEnabled ? form.discountPrice : form.price}` : 'Free enrollment', `Visibility: ${form.visibility}`, `Certificate: ${form.provideCertificate ? 'Yes' : 'No'}`] },
                { step: 4, title: 'Media & Resources', icon: <Image size={14} />, items: ['Thumbnail: ✓ Set', 'Promo video: Optional', '2 resource files attached'] },
              ].map(section => (
                <div key={section.step} className="smart-card" style={{ padding: '16px 20px', background: '#ffffff', display: 'flex', gap: '14px', alignItems: 'start' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {section.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Step {section.step}: {section.title}</h4>
                      <button onClick={() => setActiveStep(section.step)} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Edit3 size={11} /> Edit
                      </button>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {section.items.map((item, i) => (
                        <span key={i} style={{ fontSize: '10px', background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: '20px', fontWeight: 600 }}>{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Readiness Checklist & Publish */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="smart-card" style={{ padding: '20px', background: '#ffffff' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 14px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={14} style={{ color: '#22c55e' }} />
                  Publish Readiness
                </h4>
                {[
                  { label: 'Course title set', done: !!form.title },
                  { label: 'Description written', done: form.description.length > 30 },
                  { label: 'Category selected', done: !!form.category },
                  { label: 'Instructor assigned', done: !!form.teacher },
                  { label: 'Thumbnail uploaded', done: !!form.thumbnail },
                  { label: 'Curriculum built', done: form.modules.length > 0 },
                  { label: 'Pricing configured', done: form.priceType === 'Free' || parseFloat(form.price) > 0 },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid var(--border-color)' }}>
                    {item.done ? <CheckCircle size={14} style={{ color: '#22c55e', flexShrink: 0 }} /> : <XCircle size={14} style={{ color: '#f87171', flexShrink: 0 }} />}
                    <span style={{ fontSize: '12px', color: item.done ? 'var(--text-primary)' : 'var(--text-muted)', fontWeight: item.done ? 600 : 400 }}>{item.label}</span>
                  </div>
                ))}
              </div>

              {/* Tags Preview */}
              <div className="smart-card" style={{ padding: '16px 20px', background: '#ffffff' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 10px 0' }}>Course Tags</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {form.tags.map(tag => (
                    <span key={tag} style={{ fontSize: '10px', fontWeight: 700, background: 'var(--primary-glow)', color: 'var(--primary-color)', padding: '3px 10px', borderRadius: '20px' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Publish button */}
              <button onClick={handleSave} className="click-press" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 800, fontSize: '15px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(124,58,237,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <Award size={18} />
                Publish Course
              </button>

              <button onClick={() => setView('list')} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: '#fff', color: 'var(--text-secondary)', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}>
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Bottom Course Preview Section (Matches the Mockup bottom bar exactly) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '10px' }}>
        <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Course Preview <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>(How it will appear to students)</span>
        </h3>

        <div style={{ 
          background: '#ffffff', 
          border: '1px solid var(--border-color)', 
          borderRadius: '16px', 
          padding: '16px 20px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: 'var(--shadow-sm)'
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: 1, minWidth: '300px' }}>
            {/* Thumbnail left with Play Button overlay */}
            <div style={{ position: 'relative', width: '100px', height: '62px', borderRadius: '10px', overflow: 'hidden', flexShrink: 0 }}>
              <img src={form.thumbnail} alt="Preview cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <PlayCircle size={20} fill="currentColor" />
              </div>
            </div>

            {/* Course tags and details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ fontSize: '9px', fontWeight: 800, background: 'rgba(124, 58, 237, 0.08)', color: 'var(--primary-color)', padding: '2px 8px', borderRadius: '20px' }}>
                  {form.category}
                </span>
                <span style={{ fontSize: '9px', fontWeight: 800, background: 'rgba(202, 186, 97, 0.15)', color: '#CABA61', padding: '2px 8px', borderRadius: '20px' }}>
                  {form.level}
                </span>
                <span style={{ fontSize: '9px', fontWeight: 800, background: '#f1f5f9', color: '#475569', padding: '2px 8px', borderRadius: '20px' }}>
                  {form.language}
                </span>
              </div>
              
              <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {form.title}
              </h4>

              {/* Mentor profile rating row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '11px', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <img src={TEACHERS.find(t => t.name === form.teacher)?.avatar || TEACHERS[0].avatar} alt="Mentor" style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                  <span style={{ fontWeight: 600 }}>{form.teacher}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({TEACHERS.find(t => t.name === form.teacher)?.specialty})</span>
                </div>
                
                <span style={{ color: 'var(--border-color)' }}>|</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#FFC92F' }}>
                  <Star size={11} fill="currentColor" />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>4.9</span>
                  <span style={{ color: 'var(--text-muted)' }}>(210)</span>
                </div>

                <span style={{ color: 'var(--border-color)' }}>|</span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Users size={11} />
                  <span>4,250 Students</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing right */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--primary-color)' }}>
                ${form.priceType === 'Paid' ? (form.discountEnabled ? form.discountPrice : form.price) : '0'}
              </div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <Clock size={10} />
                <span>{form.duration}</span>
              </div>
            </div>

            <button 
              onClick={handleSave}
              className="click-press"
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                border: '1px solid var(--primary-color)',
                background: '#ffffff',
                color: 'var(--primary-color)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-glow)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#ffffff'; }}
            >
              Preview
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}

// ─── Collapsible Module Accordion component for Step 2 (Curriculum) ──────────
function ModuleAccordionItem({ mod, idx, isExpanded, setExpandedModule, onDeleteModule, onAddLesson, onDeleteLesson }) {
  const [lTitle, setLTitle] = useState('');
  const [lDuration, setLDuration] = useState('');

  const handleLessonSubmit = (e) => {
    e.preventDefault();
    if (!lTitle.trim()) return;
    onAddLesson(mod.id, lTitle.trim(), lDuration);
    setLTitle('');
    setLDuration('');
  };

  return (
    <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden', background: '#ffffff' }}>
      <div 
        onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
        style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: isExpanded ? '1px solid var(--border-color)' : 'none' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary-gradient)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
            {idx + 1}
          </div>
          <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{mod.title}</span>
          <span style={{ fontSize: '10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', padding: '2px 8px', borderRadius: '20px', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {mod.lessons.length} lessons
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button 
            onClick={(e) => { e.stopPropagation(); onDeleteModule(mod.id); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <Trash2 size={13} />
          </button>
          <div style={{ color: 'var(--text-secondary)' }}>
            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px', background: '#fafafb' }}>
          {/* Lessons sub-items */}
          {mod.lessons.map(les => (
            <div key={les.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', background: '#ffffff', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
              <PlayCircle size={14} style={{ color: 'var(--primary-color)' }} />
              <span style={{ fontSize: '12px', color: 'var(--text-primary)', flex: 1 }}>{les.title}</span>
              <span style={{ fontSize: '10px', color: 'var(--text-secondary)', marginRight: '6px' }}>{les.duration}</span>
              <button 
                onClick={() => onDeleteLesson(mod.id, les.id)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
              >
                <X size={12} />
              </button>
            </div>
          ))}

          {/* Add lesson sub-form */}
          <form onSubmit={handleLessonSubmit} style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
            <input 
              type="text" 
              placeholder="Lecture Title..." 
              value={lTitle}
              onChange={e => setLTitle(e.target.value)}
              style={{ flex: 1, fontSize: '11px', padding: '6px 10px' }}
            />
            <input 
              type="text" 
              placeholder="mm:ss" 
              value={lDuration}
              onChange={e => setLDuration(e.target.value)}
              style={{ width: '60px', fontSize: '11px', padding: '6px 10px' }}
            />
            <button type="submit" className="btn-primary click-press" style={{ padding: '6px 12px', fontSize: '11px' }}>
              Add Lesson
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
