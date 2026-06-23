import React, { useState } from 'react';
import { 
  Video, Plus, Download, Calendar as CalendarIcon, Clock, Users, BarChart2, Star, MoreVertical, 
  Search, ArrowLeft, ArrowRight, Check, Globe, HelpCircle, CheckCircle, AlertCircle, 
  MessageSquare, FileText, Share2, Shield, CalendarDays, RefreshCw, Layers, Edit3, Trash2, Mail, ExternalLink,
  ChevronLeft, ChevronRight, Sliders, PlayCircle, ToggleLeft, ToggleRight, CheckSquare, FileSpreadsheet, Eye, User
} from 'lucide-react';

export default function ClassScheduler({ classes, setClasses, courses, activeTab, setActiveTab }) {
  // Wizard flow state (1 to 4)
  const [wizardStep, setWizardStep] = useState(1);
  
  // Filtering & Search
  const [dashboardTab, setDashboardTab] = useState('All Classes');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [teacherFilter, setTeacherFilter] = useState('All Teachers');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Wizard state values
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || 'course-1');
  const [classTitle, setClassTitle] = useState('SAT Math Mastery - Advanced Problem Solving');
  const [teacherName, setTeacherName] = useState('Dr. Ahmed Al-Hassan');
  const [classCategory, setClassCategory] = useState('Scholarship Exams');
  const [classLevel, setClassLevel] = useState('Advanced Level');
  const [classLanguage, setClassLanguage] = useState('English');
  const [classDescription, setClassDescription] = useState('Master critical SAT Math sections and advanced question types with Dr. Ahmed Al-Hassan.');
  const [classThumbnail, setClassThumbnail] = useState('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=300');
  
  // Date & Time
  const [classDate, setClassDate] = useState('May 24, 2025');
  const [startTime, setStartTime] = useState('06:00 PM');
  const [endTime, setEndTime] = useState('07:30 PM');
  const [classTimezone, setClassTimezone] = useState('(GMT +03:00) Riyadh');
  const [repeatOption, setRepeatOption] = useState('Do not repeat');
  
  // Settings
  const [classAccess, setClassAccess] = useState('Enrolled Students Only');
  const [recordClass, setRecordClass] = useState(true);
  const [enableChat, setEnableChat] = useState(true);
  const [enableQa, setEnableQa] = useState(true);
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(false);

  // Mock list for live classes list details
  const [mockClassesList, setMockClassesList] = useState([
    {
      id: 'mock-1',
      title: 'SAT Math Mastery Live Session',
      teacher: 'Dr. Ahmed Al-Hassan',
      teacherAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      rating: '4.9',
      reviews: 210,
      course: 'SAT Math Mastery',
      category: 'Scholarship Exams',
      categoryBg: 'rgba(124, 58, 237, 0.08)',
      categoryColor: '#7c3aed',
      date: 'May 24, 2025',
      time: '06:00 PM - 07:30 PM',
      timezone: '(GMT +3)',
      participants: 245,
      maxParticipants: 300,
      status: 'Live Now',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'mock-2',
      title: 'IELTS Speaking Practice',
      teacher: 'Ms. Sarah Johnson',
      teacherAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
      rating: '4.8',
      reviews: 180,
      course: 'IELTS Speaking Success',
      category: 'Language Tests',
      categoryBg: 'rgba(59, 130, 246, 0.08)',
      categoryColor: '#3b82f6',
      date: 'May 24, 2025',
      time: '08:00 PM - 09:00 PM',
      timezone: '(GMT +3)',
      participants: 178,
      maxParticipants: 250,
      status: 'Upcoming',
      thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'mock-3',
      title: 'TOEFL iBT Writing Workshop',
      teacher: 'Ms. Lisa Park',
      teacherAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100',
      rating: '4.9',
      reviews: 156,
      course: 'TOEFL iBT Complete Guide',
      category: 'Language Tests',
      categoryBg: 'rgba(59, 130, 246, 0.08)',
      categoryColor: '#3b82f6',
      date: 'May 25, 2025',
      time: '07:00 PM - 08:30 PM',
      timezone: '(GMT +3)',
      participants: 210,
      maxParticipants: 250,
      status: 'Upcoming',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'mock-4',
      title: 'GRE Quantitative Strategies',
      teacher: 'Dr. Michael Chen',
      teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: '4.8',
      reviews: 142,
      course: 'GRE Quantitative Reasoning',
      category: 'Graduate Exams',
      categoryBg: 'rgba(245, 158, 11, 0.08)',
      categoryColor: '#f59e0b',
      date: 'May 26, 2025',
      time: '06:00 PM - 07:30 PM',
      timezone: '(GMT +3)',
      participants: 156,
      maxParticipants: 200,
      status: 'Upcoming',
      thumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'mock-5',
      title: 'Essay Writing Excellence',
      teacher: 'Mr. James Wilson',
      teacherAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      rating: '4.7',
      reviews: 120,
      course: 'Essay Writing Excellence',
      category: 'Academic Success',
      categoryBg: 'rgba(16, 185, 129, 0.08)',
      categoryColor: '#10b981',
      date: 'May 22, 2025',
      time: '06:00 PM - 07:30 PM',
      timezone: '(GMT +3)',
      participants: 198,
      maxParticipants: 200,
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=300'
    }
  ]);

  const handlePublishClass = () => {
    if (!termsAgreed) {
      alert("Please confirm the terms before scheduling.");
      return;
    }

    const newClassId = `class-${Date.now()}`;
    const newClassItem = {
      id: newClassId,
      title: classTitle,
      teacher: teacherName,
      teacherAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      rating: '5.0',
      reviews: 0,
      course: courses.find(c => c.id === selectedCourseId)?.title || classTitle,
      category: classCategory,
      categoryBg: 'rgba(124, 58, 237, 0.08)',
      categoryColor: '#7c3aed',
      date: classDate,
      time: `${startTime} - ${endTime}`,
      timezone: classTimezone.split(' ')[0],
      participants: 0,
      maxParticipants: 100,
      status: 'Upcoming',
      thumbnail: classThumbnail
    };

    setMockClassesList([newClassItem, ...mockClassesList]);
    
    if (setClasses && classes) {
      const dbCompatibleItem = {
        id: newClassId,
        title: classTitle,
        teacher: teacherName,
        courseId: selectedCourseId,
        time: startTime.split(' ')[0],
        ampm: startTime.split(' ')[1]?.toLowerCase() || 'pm',
        date: '2026-06-12', 
        dateLabel: 'Upcoming',
        isLive: false
      };
      setClasses([dbCompatibleItem, ...classes]);
    }

    setActiveTab('live-classes');
    setWizardStep(1);
  };

  // --- 1. Wizard View ---
  const renderWizardView = () => {
    const steps = [
      { num: 1, label: 'Class Information' },
      { num: 2, label: 'Date & Time' },
      { num: 3, label: 'Class Settings' },
      { num: 4, label: 'Review & Confirm' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => {
              setActiveTab('live-classes');
              setWizardStep(1);
            }}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: '1.5px solid var(--border-color)',
              background: 'var(--bg-card)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }} 
            className="click-press"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Schedule a New Live Class</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Step {wizardStep} of 4: {steps[wizardStep - 1].label}</p>
          </div>
        </div>

        {/* Stepper Header */}
        <div className="smart-card" style={{ padding: '16px 20px', borderRadius: '12px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', gap: '8px', flexWrap: 'wrap' }}>
            {steps.map((st, i) => {
              const isCompleted = st.num < wizardStep;
              const isActive = st.num === wizardStep;
              return (
                <div key={st.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: i === steps.length - 1 ? 'initial' : 1 }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 700,
                    backgroundColor: isCompleted ? 'var(--primary-color)' : isActive ? 'transparent' : 'transparent',
                    color: isCompleted ? '#ffffff' : isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                    border: isCompleted ? 'none' : isActive ? '2px solid var(--primary-color)' : '2px solid var(--border-color)',
                    flexShrink: 0
                  }}>
                    {isCompleted ? <Check size={14} /> : st.num}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', display: 'block' }}>{st.label}</span>
                  {i < steps.length - 1 && (
                    <div style={{ flex: 1, height: '2px', background: isCompleted ? 'var(--primary-color)' : 'var(--border-color)', minWidth: '10px' }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '24px' }} className="responsive-grid-1col">
          {/* Form Side */}
          <div className="smart-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {wizardStep === 1 && (
              <>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Associated Course</label>
                  <select value={selectedCourseId} onChange={e => setSelectedCourseId(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }}>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Class Title</label>
                  <input type="text" value={classTitle} onChange={e => setClassTitle(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }} />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Assign Teacher</label>
                  <input type="text" value={teacherName} onChange={e => setTeacherName(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }} />
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Class Category</label>
                  <select value={classCategory} onChange={e => setClassCategory(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }}>
                    <option>Scholarship Exams</option>
                    <option>Language Tests</option>
                    <option>Academic Success</option>
                  </select>
                </div>
              </>
            )}

            {wizardStep === 2 && (
              <>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Class Date</label>
                  <input type="text" value={classDate} onChange={e => setClassDate(e.target.value)} placeholder="e.g. May 24, 2025" style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700 }}>Start Time</label>
                    <input type="text" value={startTime} onChange={e => setStartTime(e.target.value)} placeholder="e.g. 06:00 PM" style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }} />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700 }}>End Time</label>
                    <input type="text" value={endTime} onChange={e => setEndTime(e.target.value)} placeholder="e.g. 07:30 PM" style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }} />
                  </div>
                </div>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Timezone</label>
                  <input type="text" value={classTimezone} onChange={e => setClassTimezone(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }} />
                </div>
              </>
            )}

            {wizardStep === 3 && (
              <>
                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700 }}>Who can access this class?</label>
                  <select value={classAccess} onChange={e => setClassAccess(e.target.value)} style={{ padding: '10px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }}>
                    <option>Enrolled Students Only</option>
                    <option>Public (Anyone with link)</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={recordClass} onChange={e => setRecordClass(e.target.checked)} />
                    <span>Automatically record live class</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={enableChat} onChange={e => setEnableChat(e.target.checked)} />
                    <span>Enable live class chat box</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={enableQa} onChange={e => setEnableQa(e.target.checked)} />
                    <span>Enable Q&A Panel</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={waitingRoom} onChange={e => setWaitingRoom(e.target.checked)} />
                    <span>Enable student waiting room</span>
                  </label>
                </div>
              </>
            )}

            {wizardStep === 4 && (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 8px' }}>Summary & Reviews</h3>
                  <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div><strong>Title:</strong> {classTitle}</div>
                    <div><strong>Teacher:</strong> {teacherName}</div>
                    <div><strong>Schedule:</strong> {classDate} at {startTime} - {endTime}</div>
                    <div><strong>Access:</strong> {classAccess}</div>
                    <div><strong>Recording:</strong> {recordClass ? 'Enabled' : 'Disabled'}</div>
                  </div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', cursor: 'pointer', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <input type="checkbox" checked={termsAgreed} onChange={e => setTermsAgreed(e.target.checked)} />
                    <span>I confirm the above details are correct.</span>
                  </label>
                </div>
              </>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '12px' }}>
              {wizardStep > 1 ? (
                <button onClick={() => setWizardStep(prev => prev - 1)} className="btn-secondary click-press" style={{ padding: '8px 16px', borderRadius: '6px' }}>Back</button>
              ) : <div />}
              
              {wizardStep < 4 ? (
                <button onClick={() => setWizardStep(prev => prev + 1)} className="btn-primary click-press" style={{ padding: '8px 16px', borderRadius: '6px', background: 'linear-gradient(135deg, var(--primary-color), #4f46e5)', color: '#ffffff', border: 'none' }}>Next Step</button>
              ) : (
                <button onClick={handlePublishClass} className="btn-primary click-press" style={{ padding: '8px 20px', borderRadius: '6px', background: 'linear-gradient(135deg, #10b981, #059669)', color: '#ffffff', border: 'none', fontWeight: 700 }}>Publish Class</button>
              )}
            </div>
          </div>

          {/* Quick Tips Info Side */}
          <div className="smart-card" style={{ padding: '20px', borderLeft: '4px solid var(--primary-color)' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, margin: '0 0 10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lightbulb size={16} style={{ color: 'var(--primary-color)' }} />
              <span>Step Guidelines</span>
            </h4>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.4, margin: '0 0 10px' }}>
              {wizardStep === 1 && "Link this class to a course in the active catalog so enrolled students automatically get notification warnings."}
              {wizardStep === 2 && "Double check timezone offsets to ensure global users connect at the correct local hour."}
              {wizardStep === 3 && "We recommend keeping recordings and chat enabled to secure interactive learning transcripts."}
              {wizardStep === 4 && "Confirm details. Publishing immediately issues app reminders to all enrolled student circles."}
            </p>
          </div>
        </div>
      </div>
    );
  };

  // --- 2. Dashboard View ---
  const renderDashboardView = () => {
    const stats = [
      { label: 'Total Live Classes', value: '248', rate: '12.4%', icon: CalendarDays, color: '#7c3aed' },
      { label: 'Upcoming Classes', value: '32', rate: '15.8%', icon: Video, color: '#10b981' },
      { label: 'Total Participants', value: '14.6K', rate: '18.3%', icon: Users, color: '#3b82f6' }
    ];

    const filteredClasses = mockClassesList.filter(c => {
      if (dashboardTab === 'Upcoming' && c.status !== 'Upcoming') return false;
      if (dashboardTab === 'Live Now' && c.status !== 'Live Now') return false;
      if (dashboardTab === 'Completed' && c.status !== 'Completed') return false;
      if (categoryFilter !== 'All Categories' && c.category !== categoryFilter) return false;
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Live Classes</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '4px 0 0' }}>Manage, schedule, and oversee all live classes on the platform.</p>
          </div>
          <button 
            onClick={() => setActiveTab('schedule-class')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary-color), #4f46e5)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }} 
            className="click-press"
          >
            <Plus size={16} />
            <span>Schedule New Class</span>
          </button>
        </div>

        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="smart-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-app)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: st.color,
                  border: '1.5px solid var(--border-color)'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block' }}>{st.label}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>{st.value}</span>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>↑ {st.rate}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filters & Search */}
        <div className="smart-card" style={{ padding: '0px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', gap: '4px', overflowX: 'auto' }}>
              {['All Classes', 'Upcoming', 'Live Now', 'Completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setDashboardTab(tab)}
                  style={{
                    padding: '8px 16px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: dashboardTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
                    borderRadius: '8px',
                    background: dashboardTab === tab ? 'var(--primary-glow)' : 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select 
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
                style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }}
              >
                <option>All Categories</option>
                <option>Scholarship Exams</option>
                <option>Language Tests</option>
              </select>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1.5px solid var(--border-color)',
                fontSize: '12px',
                color: 'var(--text-secondary)'
              }}>
                <Search size={13} />
                <input
                  type="text"
                  placeholder="Search classes..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{ border: 'none', outline: 'none', background: 'transparent', width: '100px', fontSize: '12px' }}
                />
              </div>
            </div>
          </div>

          {/* Listing Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className="smart-table" style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ paddingLeft: '20px' }}>Class details</th>
                  <th>Course</th>
                  <th>Date & Time</th>
                  <th>Participants</th>
                  <th>Status</th>
                  <th style={{ paddingRight: '20px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClasses.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                      No live classes found matching filters.
                    </td>
                  </tr>
                ) : (
                  filteredClasses.map(cls => (
                    <tr key={cls.id}>
                      <td style={{ paddingLeft: '20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img src={cls.teacherAvatar} alt={cls.teacher} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                          <div>
                            <span style={{ fontWeight: 800, fontSize: '13px', color: 'var(--text-primary)', display: 'block' }}>{cls.title}</span>
                            <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Instructor: {cls.teacher}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{cls.course}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '11px' }}>
                          <span style={{ fontWeight: 600 }}>{cls.date}</span>
                          <span style={{ color: 'var(--text-secondary)' }}>{cls.time}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: '12px', fontWeight: 600 }}>{cls.participants} / {cls.maxParticipants}</span>
                      </td>
                      <td>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: 800,
                          background: cls.status === 'Live Now' ? '#e6f7ed' : cls.status === 'Upcoming' ? '#ebf3fe' : '#f1f3f9',
                          color: cls.status === 'Live Now' ? '#2b844a' : cls.status === 'Upcoming' ? '#3b82f6' : 'var(--text-secondary)'
                        }}>
                          {cls.status}
                        </span>
                      </td>
                      <td style={{ paddingRight: '20px', textAlign: 'right' }}>
                        <button style={{
                          padding: '4px 10px',
                          borderRadius: '6px',
                          border: '1.5px solid var(--border-color)',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}>
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Render Sub-Views
  if (activeTab === 'schedule-class') {
    return renderWizardView();
  } else if (activeTab === 'class-recordings') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Class Recordings</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Review, download, and share past recorded sessions.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {mockClassesList.map((cls) => (
            <div key={cls.id} className="smart-card" style={{ padding: '0px', overflow: 'hidden', borderRadius: '16px' }}>
              <div style={{ position: 'relative' }}>
                <img src={cls.thumbnail} alt={cls.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlayCircle size={36} style={{ color: '#ffffff', opacity: 0.9, cursor: 'pointer' }} />
                </div>
              </div>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px' }}>{cls.title}</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>{cls.teacher} • {cls.date}</span>
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <button style={{ flex: 1, padding: '6px', borderRadius: '6px', border: '1.5px solid var(--border-color)', fontSize: '11px', fontWeight: 600 }}>Download</button>
                  <button style={{ flex: 1, padding: '6px', borderRadius: '6px', background: 'var(--primary-color)', color: '#ffffff', fontSize: '11px', border: 'none', fontWeight: 600 }}>Share Link</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (activeTab === 'live-categories') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Live Class Categories</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Manage classifications and subject groups for scheduling.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {['Scholarship Exams', 'Language Tests', 'Academic Success', 'Professional Certs'].map((cat, i) => (
            <div key={i} className="smart-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '12px' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{cat}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Live sessions enabled</span>
              </div>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--primary-glow)', color: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px' }}>
                {6 + i * 4}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (activeTab === 'live-settings') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 850, color: 'var(--text-primary)', margin: 0 }}>Live Class Settings</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Configure default rules, recording storage, and calendar setups.</p>
        </div>
        <div className="smart-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: 800, margin: '0 0 4px' }}>Global Preferences</h3>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700 }}>Default Calendar Timezone</label>
            <select style={{ padding: '8px', borderRadius: '6px', border: '1.5px solid var(--border-color)' }}>
              <option>(GMT +03:00) Riyadh, Saudi Arabia</option>
              <option>(GMT +08:00) Kuala Lumpur, Malaysia</option>
            </select>
          </div>
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '11px', fontWeight: 700 }}>Cloud Recording Storage</label>
            <select style={{ padding: '8px', borderRadius: '6px', border: '1.5px solid var(--border-color)' }}>
              <option>AWS S3 Bucket (Primary)</option>
              <option>Google Cloud Storage (Backup)</option>
            </select>
          </div>
        </div>
      </div>
    );
  } else {
    return renderDashboardView();
  }
}
