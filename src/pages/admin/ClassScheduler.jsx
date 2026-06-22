import React, { useState } from 'react';
import { 
  Video, Plus, Download, Calendar as CalendarIcon, Clock, Users, BarChart2, Star, MoreVertical, 
  Search, ArrowLeft, ArrowRight, Check, Globe, HelpCircle, CheckCircle, AlertCircle, 
  MessageSquare, FileText, Share2, Shield, CalendarDays, RefreshCw, Layers, Edit3, Trash2, Mail, ExternalLink,
  ChevronLeft, ChevronRight, Sliders, PlayCircle, ToggleLeft, ToggleRight, CheckSquare, FileSpreadsheet, Eye, User
} from 'lucide-react';

export default function ClassScheduler({ classes, setClasses, courses, activeTab, setActiveTab }) {
  // Current step in the "Schedule a Class" wizard (1 to 4)
  const [wizardStep, setWizardStep] = useState(2); // Start at step 2 to match Screen 2, but user can navigate.
  
  // Dashboard & Table Filter States
  const [dashboardTab, setDashboardTab] = useState('All Classes');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [teacherFilter, setTeacherFilter] = useState('All Teachers');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Wizard Form States
  const [selectedCourseId, setSelectedCourseId] = useState('course-1');
  const [classTitle, setClassTitle] = useState('SAT Math Mastery - Advanced Problem Solving');
  const [teacherName, setTeacherName] = useState('Dr. Ahmed Al-Hassan');
  const [classCategory, setClassCategory] = useState('Scholarship Exams');
  const [classLevel, setClassLevel] = useState('Advanced Level');
  const [classLanguage, setClassLanguage] = useState('English');
  const [classDescription, setClassDescription] = useState('Master critical SAT Math sections and advanced question types with Dr. Ahmed Al-Hassan.');
  const [classThumbnail, setClassThumbnail] = useState('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=300');
  
  // Step 2 Form States (Date & Time)
  const [classDate, setClassDate] = useState('May 24, 2025');
  const [classTimezone, setClassTimezone] = useState('(GMT +03:00) Riyadh, Saudi Arabia');
  const [startTime, setStartTime] = useState('06:00 PM');
  const [endTime, setEndTime] = useState('07:30 PM');
  const [classDuration, setClassDuration] = useState('90 minutes');
  const [repeatOption, setRepeatOption] = useState('Do not repeat');
  const [calendarGoogle, setCalendarGoogle] = useState(false);
  const [calendarOutlook, setCalendarOutlook] = useState(false);
  const [calendarIcs, setCalendarIcs] = useState(false);

  // Step 3 Form States (Class Settings)
  const [classAccess, setClassAccess] = useState('Enrolled Students Only');
  const [recordClass, setRecordClass] = useState(true);
  const [shareRecording, setShareRecording] = useState(true);
  const [enableAttendance, setEnableAttendance] = useState(true);
  const [requireConfirmation, setRequireConfirmation] = useState(true);
  const [generateReport, setGenerateReport] = useState(true);
  const [enableChat, setEnableChat] = useState(true);
  const [enableQa, setEnableQa] = useState(true);
  const [enablePolls, setEnablePolls] = useState(true);
  const [enableHandRaise, setEnableHandRaise] = useState(true);
  const [enableWhiteboard, setEnableWhiteboard] = useState(true);
  const [joinBeforeTime, setJoinBeforeTime] = useState('15 minutes');
  const [joinAfterTime, setJoinAfterTime] = useState('5 minutes');
  const [waitingRoom, setWaitingRoom] = useState(true);
  const [autoAdmit, setAutoAdmit] = useState(true);
  const [sendReminder, setSendReminder] = useState('15 minutes before');
  const [sendFollowup, setSendFollowup] = useState(true);

  // Step 4 Form States (Review & Confirm)
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [notifyStudents, setNotifyStudents] = useState(true);
  const [reminder24h, setReminder24h] = useState(true);

  // List of high-fidelity mockup classes (dummy data as requested, matching Screen 1)
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
    },
    {
      id: 'mock-6',
      title: 'Arabic Language Basics',
      teacher: 'Ms. Fatima Al-Zahra',
      teacherAvatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=100',
      rating: '4.9',
      reviews: 98,
      course: 'Arabic Language Basics',
      category: 'Language Development',
      categoryBg: 'rgba(139, 92, 246, 0.08)',
      categoryColor: '#8b5cf6',
      date: 'May 21, 2025',
      time: '07:00 PM - 08:00 PM',
      timezone: '(GMT +3)',
      participants: 132,
      maxParticipants: 150,
      status: 'Completed',
      thumbnail: 'https://images.unsplash.com/photo-1566418705663-e39d33b82143?auto=format&fit=crop&q=80&w=300'
    },
    {
      id: 'mock-7',
      title: 'PMP Certification Prep',
      teacher: 'Mr. David Brown',
      teacherAvatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100',
      rating: '4.8',
      reviews: 75,
      course: 'PMP Certification Prep',
      category: 'Professional Certs',
      categoryBg: 'rgba(239, 68, 68, 0.08)',
      categoryColor: '#ef4444',
      date: 'May 19, 2025',
      time: '05:00 PM - 06:30 PM',
      timezone: '(GMT +3)',
      participants: 89,
      maxParticipants: 100,
      status: 'Canceled',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300'
    }
  ]);

  // Form submit to append to the class list
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
    
    // Also save in the shared database
    if (setClasses && classes) {
      const dbCompatibleItem = {
        id: newClassId,
        title: classTitle,
        teacher: teacherName,
        courseId: selectedCourseId,
        time: startTime.split(' ')[0],
        ampm: startTime.split(' ')[1]?.toLowerCase() || 'pm',
        date: '2026-06-12', // standard date for backend
        dateLabel: 'Upcoming',
        isLive: false
      };
      setClasses([dbCompatibleItem, ...classes]);
    }

    // Redirect to All Live Classes
    setActiveTab('live-classes');
    setWizardStep(1);
  };

  // Switch between views depending on active tab from parent router
  if (activeTab === 'schedule-class') {
    return renderWizardView();
  } else if (activeTab === 'class-recordings') {
    return renderRecordingsView();
  } else if (activeTab === 'live-categories') {
    return renderCategoriesView();
  } else if (activeTab === 'live-settings') {
    return renderSettingsView();
  } else {
    return renderDashboardView();
  }

  // --- 1. RENDER DASHBOARD VIEW (Image 1) ---
  function renderDashboardView() {
    // Stats list
    const stats = [
      { label: 'Total Live Classes', value: '248', rate: '12.4%', icon: CalendarDays, bg: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed' },
      { label: 'Upcoming Classes', value: '32', rate: '15.8%', icon: Video, bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
      { label: 'Completed Classes', value: '186', rate: '10.2%', icon: BarChart2, bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
      { label: 'Total Participants', value: '14,680', rate: '18.3%', icon: Users, bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
      { label: 'Total Watch Hours', value: '2,450', rate: '16.7%', icon: Clock, bg: 'rgba(236, 72, 153, 0.1)', color: '#ec4899' },
    ];

    // Calendar Cells for May 2025 (starts on Thursday)
    // 0: Sun, 1: Mon, 2: Tue, 3: Wed, 4: Thu, 5: Fri, 6: Sat
    const calendarDays = [
      // April padding
      { day: 27, current: false }, { day: 28, current: false }, { day: 29, current: false }, { day: 30, current: false },
      // May
      { day: 1, current: true, dot: 'blue' }, { day: 2, current: true }, { day: 3, current: true },
      { day: 4, current: true }, { day: 5, current: true, dot: 'green' }, { day: 6, current: true, dot: 'green' }, { day: 7, current: true },
      { day: 8, current: true }, { day: 9, current: true }, { day: 10, current: true },
      { day: 11, current: true }, { day: 12, current: true, dot: 'blue' }, { day: 13, current: true, dot: 'blue' }, { day: 14, current: true, dot: 'green' },
      { day: 15, current: true }, { day: 16, current: true }, { day: 17, current: true },
      { day: 18, current: true, dot: 'yellow' }, { day: 19, current: true, dot: 'yellow' }, { day: 20, current: true, dot: 'green' }, { day: 21, current: true, dot: 'green' },
      { day: 22, current: true, dot: 'green' }, { day: 23, current: true, dot: 'green' }, { day: 24, current: true, dot: 'purple', selected: true },
      { day: 25, current: true, dot: 'green' }, { day: 26, current: true, dot: 'green' }, { day: 27, current: true, dot: 'yellow' }, { day: 28, current: true, dot: 'yellow' },
      { day: 29, current: true, dot: 'blue' }, { day: 30, current: true, dot: 'blue' }, { day: 31, current: true, dot: 'green' },
      // June padding
      { day: 1, current: false }, { day: 2, current: false }, { day: 3, current: false }
    ];

    // Filter classes list based on tab
    const filteredClasses = mockClassesList.filter(c => {
      // Tab filter
      if (dashboardTab === 'Upcoming' && c.status !== 'Upcoming') return false;
      if (dashboardTab === 'Live Now' && c.status !== 'Live Now') return false;
      if (dashboardTab === 'Completed' && c.status !== 'Completed') return false;
      if (dashboardTab === 'Canceled' && c.status !== 'Canceled') return false;

      // Category filter
      if (categoryFilter !== 'All Categories' && c.category !== categoryFilter) return false;

      // Teacher filter
      if (teacherFilter !== 'All Teachers' && c.teacher !== teacherFilter) return false;

      // Search query
      if (searchQuery && !c.title.toLowerCase().includes(searchQuery.toLowerCase()) && !c.teacher.toLowerCase().includes(searchQuery.toLowerCase())) return false;

      return true;
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
        {/* Dashboard Title & Actions Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Live Classes</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Manage, schedule, and oversee all live classes on the platform.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '10px',
              border: '1.5px solid var(--border-color)',
              background: 'var(--bg-card)',
              color: 'var(--text-primary)',
              fontSize: '13px',
              fontWeight: 600
            }} className="click-press">
              <Download size={15} />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setActiveTab('schedule-class')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '10px',
                background: 'var(--secondary-color)',
                color: '#1e1b4b',
                fontSize: '13px',
                fontWeight: 700,
                border: 'none',
                boxShadow: '0 4px 12px rgba(202, 186, 97, 0.2)'
              }} className="click-press"
            >
              <Plus size={16} />
              <span>Schedule New Class</span>
            </button>
          </div>
        </div>

        {/* 5 Stats Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {stats.map((st, i) => {
            const Icon = st.icon;
            return (
              <div key={i} className="smart-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  backgroundColor: st.bg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: st.color,
                  flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>{st.label}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)' }}>{st.value}</span>
                    <span style={{ fontSize: '11px', color: '#10b981', fontWeight: 700 }}>↑ {st.rate}</span>
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>vs last month</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Column Main Layout Grid */}
        <div className="class-scheduler-grid dashboard-grid student-layout" style={{ display: 'grid', gap: '24px', alignItems: 'start' }}>
          
          {/* Left Column (Table, Tabs, Filters) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="smart-card" style={{ padding: '0px', overflow: 'visible' }}>
              {/* Tab Filters Bar */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid var(--border-color)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', gap: '4px', overflowX: 'auto', paddingBottom: '4px' }}>
                  {['All Classes', 'Upcoming', 'Live Now', 'Completed', 'Canceled'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setDashboardTab(tab)}
                      style={{
                        padding: '8px 16px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: dashboardTab === tab ? 'var(--primary-color)' : 'var(--text-secondary)',
                        borderRadius: '8px',
                        background: dashboardTab === tab ? 'rgba(58, 32, 72, 0.06)' : 'transparent',
                        border: 'none',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Dropdowns & Pickers */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 500 }}
                  >
                    <option>All Categories</option>
                    <option>Scholarship Exams</option>
                    <option>Language Tests</option>
                    <option>Graduate Exams</option>
                    <option>Academic Success</option>
                    <option>Language Development</option>
                    <option>Professional Certs</option>
                  </select>

                  <select 
                    value={teacherFilter}
                    onChange={(e) => setTeacherFilter(e.target.value)}
                    style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', border: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 500 }}
                  >
                    <option>All Teachers</option>
                    <option>Dr. Ahmed Al-Hassan</option>
                    <option>Ms. Sarah Johnson</option>
                    <option>Ms. Lisa Park</option>
                    <option>Dr. Michael Chen</option>
                    <option>Mr. James Wilson</option>
                    <option>Ms. Fatima Al-Zahra</option>
                    <option>Mr. David Brown</option>
                  </select>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-color)',
                    background: 'var(--bg-input)',
                    color: 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: 500
                  }}>
                    <CalendarIcon size={13} />
                    <span>May 1 - May 31, 2025</span>
                  </div>

                  <button style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    border: '1.5px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '12px',
                    fontWeight: 600
                  }}>
                    <Sliders size={13} />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Live Search Box */}
              <div style={{ padding: '12px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center' }}>
                <Search size={16} style={{ color: 'var(--text-muted)', marginRight: '8px' }} />
                <input
                  type="text"
                  placeholder="Search classes or teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{ border: 'none', padding: '4px', fontSize: '13px', width: '100%', outline: 'none', background: 'transparent' }}
                />
              </div>

              {/* Table */}
              <div className="smart-table-wrapper" style={{ marginTop: '0px' }}>
                <table className="smart-table" style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: '20px' }}>Class & Teacher</th>
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
                          <AlertCircle size={24} style={{ margin: '0 auto 8px auto', color: 'var(--text-muted)' }} />
                          <span style={{ fontSize: '13px' }}>No live classes found.</span>
                        </td>
                      </tr>
                    ) : (
                      filteredClasses.map((cls) => (
                        <tr key={cls.id}>
                          <td style={{ paddingLeft: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img 
                                src={cls.teacherAvatar} 
                                alt={cls.teacher} 
                                style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                              />
                              <div>
                                <span style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)', display: 'block', marginBottom: '2px' }}>{cls.title}</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{cls.teacher}</span>
                                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px', fontSize: '11px', color: '#f59e0b', fontWeight: 600 }}>
                                    <Star size={11} fill="#f59e0b" style={{ marginTop: '-1px' }} />
                                    <span>{cls.rating}</span>
                                    <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({cls.reviews})</span>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div>
                              <span style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '4px' }}>{cls.course}</span>
                              <span style={{
                                fontSize: '10px',
                                fontWeight: 600,
                                padding: '3px 8px',
                                borderRadius: '4px',
                                background: cls.categoryBg,
                                color: cls.categoryColor
                              }}>
                                {cls.category}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-primary)', fontWeight: 500 }}>
                                <CalendarIcon size={12} style={{ color: 'var(--text-muted)' }} />
                                <span>{cls.date}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: 'var(--text-secondary)' }}>
                                <Clock size={12} style={{ color: 'var(--text-muted)' }} />
                                <span>{cls.time} <span style={{ color: 'var(--text-muted)' }}>{cls.timezone}</span></span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
                                <Users size={12} style={{ color: 'var(--text-muted)' }} />
                                <span>{cls.participants} / {cls.maxParticipants}</span>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: 'var(--border-color)', minWidth: '60px' }}>
                                  <div style={{
                                    height: '100%',
                                    borderRadius: '2px',
                                    background: '#2BA84A',
                                    width: `${Math.round((cls.participants / cls.maxParticipants) * 100)}%`
                                  }} />
                                </div>
                                <span style={{ fontSize: '10px', color: '#2BA84A', fontWeight: 700 }}>
                                  {Math.round((cls.participants / cls.maxParticipants) * 100)}%
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: '4px 10px',
                              borderRadius: '20px',
                              fontSize: '11px',
                              fontWeight: 700,
                              background: cls.status === 'Live Now' ? '#e6f7ed' : cls.status === 'Upcoming' ? '#ebf3fe' : cls.status === 'Completed' ? '#f1f3f9' : '#feebeb',
                              color: cls.status === 'Live Now' ? '#2BA84A' : cls.status === 'Upcoming' ? '#3b82f6' : cls.status === 'Completed' ? 'var(--text-secondary)' : '#ef4444'
                            }}>
                              <span style={{
                                width: '6px',
                                height: '6px',
                                borderRadius: '50%',
                                background: cls.status === 'Live Now' ? '#2BA84A' : cls.status === 'Upcoming' ? '#3b82f6' : cls.status === 'Completed' ? 'var(--text-secondary)' : '#ef4444',
                                display: 'inline-block'
                              }} />
                              <span>{cls.status}</span>
                            </span>
                          </td>
                          <td style={{ paddingRight: '20px', textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                              {cls.status === 'Live Now' ? (
                                <button style={{
                                  padding: '6px 14px',
                                  borderRadius: '6px',
                                  border: '1.5px solid #7c3aed',
                                  background: 'transparent',
                                  color: '#7c3aed',
                                  fontSize: '11px',
                                  fontWeight: 700
                                }} className="click-press">
                                  Join Class
                                </button>
                              ) : cls.status === 'Upcoming' ? (
                                <button style={{
                                  padding: '6px 14px',
                                  borderRadius: '6px',
                                  border: '1.5px solid var(--border-color)',
                                  background: 'transparent',
                                  color: 'var(--text-primary)',
                                  fontSize: '11px',
                                  fontWeight: 600
                                }} className="click-press">
                                  View Details
                                </button>
                              ) : cls.status === 'Completed' ? (
                                <button style={{
                                  padding: '6px 14px',
                                  borderRadius: '6px',
                                  border: '1.5px solid #7c3aed',
                                  background: 'transparent',
                                  color: '#7c3aed',
                                  fontSize: '11px',
                                  fontWeight: 700
                                }} className="click-press">
                                  View Recording
                                </button>
                              ) : (
                                <button style={{
                                  padding: '6px 14px',
                                  borderRadius: '6px',
                                  border: '1.5px solid var(--border-color)',
                                  background: 'transparent',
                                  color: 'var(--text-primary)',
                                  fontSize: '11px',
                                  fontWeight: 600
                                }} className="click-press">
                                  View Details
                                </button>
                              )}
                              <button style={{ color: 'var(--text-muted)', padding: '4px' }}>
                                <MoreVertical size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Footer */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderTop: '1px solid var(--border-color)',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Showing 1 to {filteredClasses.length} of 248 classes</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button style={{ padding: '6px', border: '1.5px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-secondary)' }}><ChevronLeft size={14} /></button>
                  <button style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary-color)', color: '#ffffff', borderRadius: '6px', fontSize: '12px', fontWeight: 600 }}>1</button>
                  <button style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', borderRadius: '6px', fontSize: '12px' }}>2</button>
                  <button style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', borderRadius: '6px', fontSize: '12px' }}>3</button>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>...</span>
                  <button style={{ width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1.5px solid var(--border-color)', color: 'var(--text-secondary)', borderRadius: '6px', fontSize: '12px' }}>36</button>
                  <button style={{ padding: '6px', border: '1.5px solid var(--border-color)', borderRadius: '6px', color: 'var(--text-secondary)' }}><ChevronRight size={14} /></button>
                  
                  <select style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px', border: '1.5px solid var(--border-color)', marginLeft: '12px' }}>
                    <option>10 / page</option>
                    <option>20 / page</option>
                    <option>50 / page</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Calendar, Upcoming, stats) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Calendar Card */}
            <div className="smart-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Calendar</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button style={{ padding: '2px', color: 'var(--text-secondary)' }}><ChevronLeft size={14} /></button>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>May 2025</span>
                  <button style={{ padding: '2px', color: 'var(--text-secondary)' }}><ChevronRight size={14} /></button>
                </div>
              </div>

              {/* Weekday headers */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center', marginBottom: '8px' }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((wd) => (
                  <span key={wd} style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)' }}>{wd}</span>
                ))}
              </div>

              {/* Days Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
                {calendarDays.map((cd, index) => (
                  <div
                    key={index}
                    style={{
                      height: '32px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      fontSize: '11px',
                      fontWeight: cd.selected ? 700 : 500,
                      color: cd.selected ? '#ffffff' : cd.current ? 'var(--text-primary)' : 'var(--text-muted)',
                      backgroundColor: cd.selected ? 'var(--primary-color)' : 'transparent',
                      borderRadius: cd.selected ? '50%' : '0px',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{cd.day}</span>
                    {/* Status dot under day */}
                    {cd.dot && !cd.selected && (
                      <span style={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: cd.dot === 'green' ? '#2BA84A' : cd.dot === 'blue' ? '#3b82f6' : cd.dot === 'yellow' ? '#f59e0b' : '#ef4444',
                        position: 'absolute',
                        bottom: '2px'
                      }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Classes Card */}
            <div className="smart-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Upcoming Classes</span>
                <span style={{ fontSize: '11px', color: '#7c3aed', fontWeight: 600, cursor: 'pointer' }}>View All</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {mockClassesList.slice(0, 4).map((upc) => (
                  <div key={upc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img 
                        src={upc.teacherAvatar} 
                        alt={upc.teacher} 
                        style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }}
                      />
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, display: 'block', color: 'var(--text-primary)', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '140px' }} title={upc.title}>{upc.course}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>{upc.teacher}</span>
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>Today, 06:00 PM</span>
                      </div>
                    </div>
                    <button style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: '1.5px solid var(--border-color)',
                      fontSize: '10px',
                      fontWeight: 600,
                      color: 'var(--text-primary)'
                    }} className="click-press">
                      Join
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Class Stats Card */}
            <div className="smart-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>Live Class Stats</span>
                <select style={{ fontSize: '10px', border: '1px solid var(--border-color)', padding: '2px 6px', borderRadius: '6px', color: 'var(--text-secondary)' }}>
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Average Attendance Rate</span>
                    <span style={{ color: 'var(--text-primary)' }}>78%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}>
                    <div style={{ width: '78%', height: '100%', background: 'var(--primary-color)', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Average Feedback Rating</span>
                    <span style={{ color: 'var(--text-primary)' }}>4.7 / 5</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}>
                    <div style={{ width: '94%', height: '100%', background: 'var(--primary-color)', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Classes Completed</span>
                    <span style={{ color: 'var(--text-primary)' }}>186</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}>
                    <div style={{ width: '70%', height: '100%', background: 'var(--primary-color)', borderRadius: '3px' }} />
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, marginBottom: '6px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>No-show Rate</span>
                    <span style={{ color: 'var(--text-primary)' }}>8%</span>
                  </div>
                  <div style={{ height: '6px', background: 'var(--border-color)', borderRadius: '3px' }}>
                    <div style={{ width: '8%', height: '100%', background: 'var(--primary-color)', borderRadius: '3px' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. RENDER WIZARD VIEW (Images 2, 3, 4) ---
  function renderWizardView() {
    // Stepper Configuration
    const steps = [
      { num: 1, label: 'Class Information', sub: 'Basic details' },
      { num: 2, label: 'Date & Time', sub: 'Select schedule' },
      { num: 3, label: 'Class Settings', sub: 'Options & permissions' },
      { num: 4, label: 'Review & Confirm', sub: 'Review and publish' }
    ];

    const handleBackStep = () => {
      if (wizardStep > 1) setWizardStep(wizardStep - 1);
    };

    const handleNextStep = () => {
      if (wizardStep < 4) setWizardStep(wizardStep + 1);
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
        {/* Wizard title with a back button to All Live Classes */}
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
              color: 'var(--text-primary)'
            }} className="click-press"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              Schedule a New Live Class
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              {wizardStep === 1 && "Enter basic class details and instructor profile."}
              {wizardStep === 2 && "Set the date, time, duration and timezone for your live class."}
              {wizardStep === 3 && "Configure class settings and permissions."}
              {wizardStep === 4 && "Please review all details before publishing your live class."}
            </p>
          </div>
        </div>

        {/* Dynamic Stepper Header */}
        <div className="smart-card" style={{ padding: '20px 30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', flexWrap: 'wrap', gap: '20px' }}>
            {steps.map((st, i) => {
              const isCompleted = st.num < wizardStep;
              const isActive = st.num === wizardStep;
              return (
                <div key={st.num} style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: i === steps.length - 1 ? 'initial' : 1, position: 'relative' }}>
                  {/* Step circle */}
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '13px',
                    fontWeight: 700,
                    backgroundColor: isCompleted ? 'var(--primary-color)' : isActive ? 'transparent' : 'transparent',
                    color: isCompleted ? '#ffffff' : isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                    border: isCompleted ? 'none' : isActive ? '2px solid var(--primary-color)' : '2px solid var(--border-color)',
                    flexShrink: 0
                  }}>
                    {isCompleted ? <Check size={16} /> : st.num}
                  </div>
                  {/* Step labels */}
                  <div style={{ textAlign: 'left' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)', display: 'block' }}>{st.label}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{st.sub}</span>
                  </div>
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div style={{
                      flex: 1,
                      height: '2px',
                      background: isCompleted ? 'var(--primary-color)' : 'var(--border-color)',
                      marginLeft: '12px',
                      marginRight: '12px',
                      minWidth: '20px'
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 2 Column Form Layout Grid */}
        <div className="class-scheduler-grid dashboard-grid student-layout" style={{ display: 'grid', gap: '24px', alignItems: 'start' }}>
          
          {/* LEFT PANEL - Form Card matching wizardStep */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Step 1 Form Card */}
            {wizardStep === 1 && (
              <div className="smart-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(58, 32, 72, 0.08)', display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                    <Sliders size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Class Information</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Fill out the core subject details and assign a tutor.</p>
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Select Associated Course <span style={{ color: '#ef4444' }}>*</span></label>
                  <select 
                    value={selectedCourseId}
                    onChange={(e) => setSelectedCourseId(e.target.value)}
                    style={{ fontSize: '13px', width: '100%', padding: '10px 14px' }}
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Lecture Title <span style={{ color: '#ef4444' }}>*</span></label>
                  <input 
                    type="text" 
                    value={classTitle}
                    onChange={(e) => setClassTitle(e.target.value)}
                    placeholder="e.g. SAT Math Mastery - Advanced Problem Solving"
                    style={{ fontSize: '13px', width: '100%', padding: '10px 14px' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Instructor Name <span style={{ color: '#ef4444' }}>*</span></label>
                    <input 
                      type="text" 
                      value={teacherName}
                      onChange={(e) => setTeacherName(e.target.value)}
                      placeholder="Tutor name"
                      style={{ fontSize: '13px', width: '100%', padding: '10px 14px' }}
                    />
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Category / Tag</label>
                    <input 
                      type="text" 
                      value={classCategory}
                      onChange={(e) => setClassCategory(e.target.value)}
                      placeholder="Category"
                      style={{ fontSize: '13px', width: '100%', padding: '10px 14px' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Level</label>
                    <select 
                      value={classLevel} 
                      onChange={(e) => setClassLevel(e.target.value)}
                      style={{ fontSize: '13px', width: '100%', padding: '10px 14px' }}
                    >
                      <option>Beginner Level</option>
                      <option>Intermediate Level</option>
                      <option>Advanced Level</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Language</label>
                    <select 
                      value={classLanguage} 
                      onChange={(e) => setClassLanguage(e.target.value)}
                      style={{ fontSize: '13px', width: '100%', padding: '10px 14px' }}
                    >
                      <option>English</option>
                      <option>Arabic</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Class Description</label>
                  <textarea 
                    value={classDescription}
                    onChange={(e) => setClassDescription(e.target.value)}
                    placeholder="Enter description..."
                    rows={4}
                    style={{ fontSize: '13px', width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid var(--border-color)' }}
                  />
                </div>

                <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Thumbnail URL</label>
                  <input 
                    type="text" 
                    value={classThumbnail}
                    onChange={(e) => setClassThumbnail(e.target.value)}
                    placeholder="Image link..."
                    style={{ fontSize: '13px', width: '100%', padding: '10px 14px' }}
                  />
                </div>
              </div>
            )}

            {/* Step 2 Form Card (Image 2) */}
            {wizardStep === 2 && (
              <div className="smart-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(58, 32, 72, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                    <CalendarIcon size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Date & Time</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Select the schedule for your live class session</p>
                  </div>
                </div>

                {/* Grid Inputs Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', flexWrap: 'wrap' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Select Date <span style={{ color: '#ef4444' }}>*</span></label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <CalendarIcon size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                      <input 
                        type="text" 
                        value={classDate} 
                        onChange={(e) => setClassDate(e.target.value)}
                        style={{ paddingLeft: '38px', fontSize: '13px', width: '100%' }}
                      />
                    </div>
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Time Zone <span style={{ color: '#ef4444' }}>*</span></label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Globe size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                      <select 
                        value={classTimezone} 
                        onChange={(e) => setClassTimezone(e.target.value)}
                        style={{ paddingLeft: '38px', fontSize: '13px', width: '100%', appearance: 'none' }}
                      >
                        <option>(GMT +03:00) Riyadh, Saudi Arabia</option>
                        <option>(GMT +08:00) Kuala Lumpur, Malaysia</option>
                        <option>(GMT +00:00) London, United Kingdom</option>
                        <option>(GMT -05:00) New York, USA</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Grid Inputs Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Start Time <span style={{ color: '#ef4444' }}>*</span></label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Clock size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                      <select 
                        value={startTime} 
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{ paddingLeft: '38px', fontSize: '13px', width: '100%' }}
                      >
                        <option>06:00 PM</option>
                        <option>07:00 PM</option>
                        <option>08:00 PM</option>
                        <option>10:00 AM</option>
                        <option>11:00 AM</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>End Time <span style={{ color: '#ef4444' }}>*</span></label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Clock size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                      <select 
                        value={endTime} 
                        onChange={(e) => setEndTime(e.target.value)}
                        style={{ paddingLeft: '38px', fontSize: '13px', width: '100%' }}
                      >
                        <option>07:30 PM</option>
                        <option>08:30 PM</option>
                        <option>09:00 PM</option>
                        <option>11:30 AM</option>
                        <option>12:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Duration <span style={{ color: '#ef4444' }}>*</span></label>
                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                      <Clock size={15} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
                      <select 
                        value={classDuration} 
                        onChange={(e) => setClassDuration(e.target.value)}
                        style={{ paddingLeft: '38px', fontSize: '13px', width: '100%' }}
                      >
                        <option>90 minutes</option>
                        <option>60 minutes</option>
                        <option>120 minutes</option>
                        <option>30 minutes</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Duration restriction note alert */}
                <div style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  backgroundColor: '#f3e8ff',
                  border: '1px solid rgba(124, 58, 237, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  color: '#7c3aed'
                }}>
                  <AlertCircle size={16} />
                  <span style={{ fontSize: '11px', fontWeight: 600 }}>Live class duration should be between 30 minutes to 6 hours.</span>
                </div>

                {/* Repeat options */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Repeat Option</span>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {['Do not repeat', 'Daily', 'Weekly', 'Monthly', 'Custom'].map((opt) => (
                      <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 500 }}>
                        <input
                          type="radio"
                          name="repeatOption"
                          value={opt}
                          checked={repeatOption === opt}
                          onChange={(e) => setRepeatOption(e.target.value)}
                          style={{ accentColor: 'var(--primary-color)', cursor: 'pointer' }}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Calendar integrations */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Add to Calendar</span>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>Synchronize this class with your calendar.</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                    
                    <button
                      onClick={() => setCalendarGoogle(!calendarGoogle)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: calendarGoogle ? '1.5px solid #7c3aed' : '1.5px solid var(--border-color)',
                        background: calendarGoogle ? 'rgba(124, 58, 237, 0.04)' : 'var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}
                    >
                      <CalendarIcon size={14} style={{ color: '#ea4335' }} />
                      <span>Google Calendar</span>
                      {calendarGoogle && <Check size={12} style={{ color: '#7c3aed', marginLeft: 'auto' }} />}
                    </button>

                    <button
                      onClick={() => setCalendarOutlook(!calendarOutlook)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: calendarOutlook ? '1.5px solid #7c3aed' : '1.5px solid var(--border-color)',
                        background: calendarOutlook ? 'rgba(124, 58, 237, 0.04)' : 'var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}
                    >
                      <CalendarIcon size={14} style={{ color: '#0078d4' }} />
                      <span>Outlook Calendar</span>
                      {calendarOutlook && <Check size={12} style={{ color: '#7c3aed', marginLeft: 'auto' }} />}
                    </button>

                    <button
                      onClick={() => setCalendarIcs(!calendarIcs)}
                      style={{
                        padding: '12px',
                        borderRadius: '10px',
                        border: calendarIcs ? '1.5px solid #7c3aed' : '1.5px solid var(--border-color)',
                        background: calendarIcs ? 'rgba(124, 58, 237, 0.04)' : 'var(--bg-card)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: 'var(--text-primary)'
                      }}
                    >
                      <Download size={14} style={{ color: 'var(--text-secondary)' }} />
                      <span>Export (.ics)</span>
                      {calendarIcs && <Check size={12} style={{ color: '#7c3aed', marginLeft: 'auto' }} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3 Form Card (Image 3) */}
            {wizardStep === 3 && (
              <div className="smart-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(58, 32, 72, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                    <Sliders size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Class Settings</h3>
                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Configure the options and permissions for your live class.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
                  {/* Left inner column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Class Access */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Class Access</span>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)', marginBottom: '4px' }}>Control who can access and join this live class.</p>
                      
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                          { val: 'Public', desc: 'Anyone can view and join this class' },
                          { val: 'Registered Users', desc: 'Only registered users can join' },
                          { val: 'Enrolled Students Only', desc: 'Only students enrolled in this course' },
                          { val: 'Invite Only', desc: 'Only invited students can join' }
                        ].map((ac) => (
                          <label key={ac.val} style={{
                            display: 'flex',
                            gap: '10px',
                            cursor: 'pointer',
                            padding: '10px',
                            borderRadius: '8px',
                            border: '1.5px solid var(--border-color)',
                            backgroundColor: classAccess === ac.val ? 'rgba(58, 32, 72, 0.02)' : 'transparent'
                          }}>
                            <input
                              type="radio"
                              name="classAccess"
                              value={ac.val}
                              checked={classAccess === ac.val}
                              onChange={(e) => setClassAccess(e.target.value)}
                              style={{ accentColor: 'var(--primary-color)', marginTop: '2px', cursor: 'pointer' }}
                            />
                            <div>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{ac.val}</span>
                              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{ac.desc}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Recording Settings */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Recording Settings</span>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Manage recording options for this live class.</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Record this live class</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>The class will be recorded automatically</span>
                        </div>
                        <button onClick={() => setRecordClass(!recordClass)} style={{ color: recordClass ? '#7c3aed' : 'var(--text-muted)' }}>
                          {recordClass ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                        </button>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Make recording available to students</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Students can watch the recording after class</span>
                        </div>
                        <button onClick={() => setShareRecording(!shareRecording)} style={{ color: shareRecording ? '#7c3aed' : 'var(--text-muted)' }}>
                          {shareRecording ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                        </button>
                      </div>
                    </div>

                    {/* Attendance & Reports */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Attendance & Reports</span>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Track attendance and generate reports.</p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Enable attendance tracking</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Track students' attendance for this class</span>
                        </div>
                        <button onClick={() => setEnableAttendance(!enableAttendance)} style={{ color: enableAttendance ? '#7c3aed' : 'var(--text-muted)' }}>
                          {enableAttendance ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                        </button>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Require attendance confirmation</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Students must confirm attendance</span>
                        </div>
                        <button onClick={() => setRequireConfirmation(!requireConfirmation)} style={{ color: requireConfirmation ? '#7c3aed' : 'var(--text-muted)' }}>
                          {requireConfirmation ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                        </button>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Generate class report</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Report will be available after class</span>
                        </div>
                        <button onClick={() => setGenerateReport(!generateReport)} style={{ color: generateReport ? '#7c3aed' : 'var(--text-muted)' }}>
                          {generateReport ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right inner column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    
                    {/* Interactive Features */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Interactive Features</span>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Enable interactive tools for better engagement.</p>

                      {[
                        { title: 'Enable Chat', desc: 'Allow students to send messages', state: enableChat, toggle: setEnableChat },
                        { title: 'Enable Q&A', desc: 'Students can ask questions', state: enableQa, toggle: setEnableQa },
                        { title: 'Enable Polls', desc: 'Conduct live polls during class', state: enablePolls, toggle: setEnablePolls },
                        { title: 'Enable Hand Raise', desc: 'Students can raise hand', state: enableHandRaise, toggle: setEnableHandRaise },
                        { title: 'Enable Whiteboard', desc: 'Use whiteboard during class', state: enableWhiteboard, toggle: setEnableWhiteboard }
                      ].map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0' }}>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            <MessageSquare size={14} style={{ marginTop: '3px', color: 'var(--text-muted)' }} />
                            <div>
                              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>{item.title}</span>
                              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{item.desc}</span>
                            </div>
                          </div>
                          <button onClick={() => item.toggle(!item.state)} style={{ color: item.state ? '#7c3aed' : 'var(--text-muted)' }}>
                            {item.state ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Class Join Settings */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Class Join Settings</span>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Configure how students join your live class.</p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Join before start time</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Allow students to join before the class starts</span>
                        </div>
                        <select 
                          value={joinBeforeTime} 
                          onChange={(e) => setJoinBeforeTime(e.target.value)}
                          style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px', border: '1.5px solid var(--border-color)' }}
                        >
                          <option>15 minutes</option>
                          <option>10 minutes</option>
                          <option>5 minutes</option>
                          <option>Not allowed</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Join after start time</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Allow students to join after the class starts</span>
                        </div>
                        <select 
                          value={joinAfterTime} 
                          onChange={(e) => setJoinAfterTime(e.target.value)}
                          style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px', border: '1.5px solid var(--border-color)' }}
                        >
                          <option>5 minutes</option>
                          <option>10 minutes</option>
                          <option>15 minutes</option>
                          <option>Anytime</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Waiting room</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Put students in waiting room before joining</span>
                        </div>
                        <button onClick={() => setWaitingRoom(!waitingRoom)} style={{ color: waitingRoom ? '#7c3aed' : 'var(--text-muted)' }}>
                          {waitingRoom ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                        </button>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Auto admit students</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Automatically admit students from waiting room</span>
                        </div>
                        <button onClick={() => setAutoAdmit(!autoAdmit)} style={{ color: autoAdmit ? '#7c3aed' : 'var(--text-muted)' }}>
                          {autoAdmit ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                        </button>
                      </div>
                    </div>

                    {/* Notifications */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Notifications</span>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>Send notifications and reminders to students.</p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Send class reminder</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Send reminder before class starts</span>
                        </div>
                        <select 
                          value={sendReminder} 
                          onChange={(e) => setSendReminder(e.target.value)}
                          style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px', border: '1.5px solid var(--border-color)' }}
                        >
                          <option>15 minutes before</option>
                          <option>30 minutes before</option>
                          <option>1 hour before</option>
                        </select>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Send follow-up email</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Send summary email after class</span>
                        </div>
                        <button onClick={() => setSendFollowup(!sendFollowup)} style={{ color: sendFollowup ? '#7c3aed' : 'var(--text-muted)' }}>
                          {sendFollowup ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4 Form Card (Image 4) */}
            {wizardStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="smart-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '20px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(58, 32, 72, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)' }}>
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>Review & Confirm</h3>
                      <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Please review all details before publishing your live class.</p>
                    </div>
                  </div>

                  {/* Summary Grid Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '20px' }}>
                    
                    {/* Class Overview Card */}
                    <div style={{ padding: '16px', border: '1.5px solid var(--border-color)', borderRadius: '12px', display: 'flex', gap: '12px' }}>
                      {/* Thumbnail with fallback */}
                      {classThumbnail ? (
                        <img
                          src={classThumbnail}
                          alt="Class Preview"
                          style={{ width: '80px', height: '60px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : null}
                      {/* Placeholder shown when empty or image fails */}
                      <div style={{
                        display: classThumbnail ? 'none' : 'flex',
                        width: '80px',
                        height: '60px',
                        borderRadius: '8px',
                        background: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        color: '#7c3aed'
                      }}>
                        <Video size={20} style={{ opacity: 0.5 }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#7c3aed', background: 'rgba(124, 58, 237, 0.06)', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginBottom: '4px' }}>{classCategory}</span>
                        <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '2px' }} title={classTitle}>{classTitle}</h4>
                        <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>Teacher: {teacherName}</span>
                        <span style={{ fontSize: '9px', color: 'var(--text-muted)' }}>{classLanguage} • {classDuration}</span>
                      </div>
                    </div>

                    {/* Date & Time Summary Card */}
                    <div style={{ padding: '16px', border: '1.5px solid var(--border-color)', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Date & Time</span>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Date:</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{classDate}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Time:</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{startTime} - {endTime}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Timezone:</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={classTimezone}>{classTimezone}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', marginBottom: '20px' }}>
                    
                    {/* Class Settings List Card */}
                    <div style={{ padding: '16px', border: '1.5px solid var(--border-color)', borderRadius: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Class Settings</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {[
                          { name: 'Access Permissions', val: classAccess },
                          { name: 'Recording', val: recordClass ? 'Enabled' : 'Disabled' },
                          { name: 'Attendance Tracking', val: enableAttendance ? 'Enabled' : 'Disabled' },
                          { name: 'Class Notifications', val: 'Enabled' },
                          { name: 'Waiting Room', val: waitingRoom ? 'Enabled' : 'Disabled' },
                          { name: 'Live Chat', val: enableChat ? 'Enabled' : 'Disabled' },
                          { name: 'Polls', val: enablePolls ? 'Enabled' : 'Disabled' },
                          { name: 'Q&A', val: enableQa ? 'Enabled' : 'Disabled' }
                        ].map((setting, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px' }}>
                            <span style={{ color: 'var(--text-muted)' }}>{setting.name}</span>
                            <span style={{ fontWeight: 700, color: '#10b981' }}>{setting.val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Publishing Checklist Card */}
                    <div style={{ padding: '16px', border: '1.5px solid var(--border-color)', borderRadius: '12px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Publishing Checklist</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {[
                          'Class information is complete',
                          'Date and time are scheduled',
                          'Class settings are configured',
                          'Teacher is assigned',
                          'Access permissions are set',
                          'All required fields are completed'
                        ].map((checkItem, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: 'var(--text-primary)' }}>
                            <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                              <Check size={10} strokeWidth={3} />
                            </div>
                            <span style={{ fontWeight: 500 }}>{checkItem}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Student Experience Mockup Preview Card */}
                  <div style={{ padding: '16px', border: '1.5px dashed var(--border-color)', borderRadius: '12px', background: 'rgba(58, 32, 72, 0.01)', marginBottom: '20px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>Student Experience Preview</span>
                    <div style={{ background: 'var(--bg-card)', border: '1.5px solid var(--border-color)', borderRadius: '10px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Video size={16} />
                        </div>
                        <div>
                          <span style={{ fontSize: '12px', fontWeight: 700, display: 'block', color: 'var(--text-primary)' }}>{classTitle}</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Join live lecture stream</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', background: '#e0f2fe', color: '#0369a1', borderRadius: '4px' }}>Live Chat</span>
                        <span style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', background: '#fef3c7', color: '#d97706', borderRadius: '4px' }}>Q&A</span>
                        <span style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', background: '#dcfce7', color: '#15803d', borderRadius: '4px' }}>Polls</span>
                      </div>
                    </div>
                  </div>

                  {/* Terms & Conditions Checkbox */}
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer', padding: '12px', borderRadius: '8px', border: '1.5px solid var(--border-color)', marginBottom: '20px' }}>
                    <input 
                      type="checkbox" 
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      style={{ marginTop: '3px', cursor: 'pointer', accentColor: 'var(--primary-color)' }}
                    />
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      I confirm that all information is accurate and I have the right to schedule this class. By scheduling, I agree to the <strong style={{ color: 'var(--primary-color)' }}>SURIA TECH Live Class Terms of Service</strong>.
                    </span>
                  </label>

                  {/* Publish notification settings */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>Publish & Notification Options</span>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Notify students immediately</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Send email and push alerts upon scheduling</span>
                      </div>
                      <button onClick={() => setNotifyStudents(!notifyStudents)} style={{ color: notifyStudents ? '#7c3aed' : 'var(--text-muted)' }}>
                        {notifyStudents ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block' }}>Send reminder 24 hours before class</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Automatically trigger scheduled follow-ups</span>
                      </div>
                      <button onClick={() => setReminder24h(!reminder24h)} style={{ color: reminder24h ? '#7c3aed' : 'var(--text-muted)' }}>
                        {reminder24h ? <ToggleRight size={38} /> : <ToggleLeft size={38} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Footer Action Buttons inside the Left column */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
              {wizardStep > 1 ? (
                <button
                  onClick={handleBackStep}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '10px',
                    border: '1.5px solid var(--border-color)',
                    background: 'var(--bg-card)',
                    color: 'var(--text-primary)',
                    fontSize: '13px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }} className="click-press"
                >
                  <ChevronLeft size={16} />
                  <span>Previous: {steps[wizardStep - 2].label}</span>
                </button>
              ) : (
                <div /> // Spacer
              )}

              {wizardStep < 4 ? (
                <button
                  onClick={handleNextStep}
                  style={{
                    padding: '10px 24px',
                    borderRadius: '10px',
                    background: 'var(--secondary-color)',
                    color: '#1e1b4b',
                    fontSize: '13px',
                    fontWeight: 700,
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 12px rgba(202, 186, 97, 0.2)'
                  }} className="click-press"
                >
                  <span>Next: {steps[wizardStep].label}</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => {
                      setActiveTab('live-classes');
                      setWizardStep(1);
                    }}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      border: '1.5px solid var(--border-color)',
                      background: 'var(--bg-card)',
                      color: 'var(--text-primary)',
                      fontSize: '13px',
                      fontWeight: 600
                    }} className="click-press"
                  >
                    Save as Draft
                  </button>
                  
                  <button
                    onClick={handlePublishClass}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '10px',
                      background: 'var(--secondary-color)',
                      color: '#1e1b4b',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }} className="click-press"
                  >
                    <CalendarIcon size={14} />
                    <span>Schedule Class</span>
                  </button>

                  <button
                    onClick={handlePublishClass}
                    style={{
                      padding: '10px 24px',
                      borderRadius: '10px',
                      background: '#7c3aed',
                      color: '#ffffff',
                      fontSize: '13px',
                      fontWeight: 700,
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
                    }} className="click-press"
                  >
                    <Share2 size={14} />
                    <span>Publish & Notify</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT PANEL - Live Class Preview & Summary cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Class Preview Card */}
            <div className="smart-card" style={{ padding: '0px', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                {/* Thumbnail or placeholder */}
                {classThumbnail ? (
                  <img
                    src={classThumbnail}
                    alt="Class Preview"
                    style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* Fallback placeholder — shown when thumbnail is empty OR image fails to load */}
                <div style={{
                  display: classThumbnail ? 'none' : 'flex',
                  width: '100%',
                  height: '160px',
                  background: 'linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '8px',
                  color: '#7c3aed'
                }}>
                  <Video size={32} style={{ opacity: 0.5 }} />
                  <span style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af' }}>No thumbnail set</span>
                </div>

                {/* Live Preview Pill */}
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  background: '#10b981',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  Live Preview
                </span>

                {/* Clear thumbnail button */}
                {classThumbnail && (
                  <button
                    onClick={() => setClassThumbnail('')}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: 'rgba(239,68,68,0.85)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                    }} title="Remove thumbnail"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.3 }}>{classTitle}</h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    <User size={12} style={{ color: 'var(--text-muted)' }} />
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600 }}>{teacherName}</span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid var(--border-color)', paddingTop: '10px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 600, background: 'rgba(124, 58, 237, 0.06)', color: '#7c3aed', padding: '3px 8px', borderRadius: '4px' }}>{classCategory}</span>
                  <span style={{ fontSize: '9px', fontWeight: 600, background: '#fef3c7', color: '#d97706', padding: '3px 8px', borderRadius: '4px' }}>{classLevel}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '10px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Globe size={11} style={{ color: 'var(--text-muted)' }} />
                    <span>Language: {classLanguage}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Clock size={11} style={{ color: 'var(--text-muted)' }} />
                    <span>Duration: {classDuration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Schedule Summary Card */}
            <div className="smart-card" style={{ padding: '20px' }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>Schedule Summary</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <CalendarIcon size={14} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Date</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{classDate}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Clock size={14} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Time</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{startTime} - {endTime}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Globe size={14} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Time Zone</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={classTimezone}>{classTimezone}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <Clock size={14} style={{ color: 'var(--text-muted)', marginTop: '2px' }} />
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block' }}>Duration</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)' }}>{classDuration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Class Settings Summary (only steps 3 and 4) */}
            {wizardStep >= 3 && (
              <div className="smart-card" style={{ padding: '20px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>Class Settings Summary</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '11px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Access</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{classAccess}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Recording</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{recordClass ? (shareRecording ? 'Record & Share' : 'Record only') : 'Disabled'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Interactive</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)', textAlign: 'right', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {[enableChat && 'Chat', enableQa && 'Q&A', enablePolls && 'Polls', enableHandRaise && 'Hand Raise'].filter(Boolean).join(', ')}
                    </span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Attendance</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{enableAttendance ? 'Tracking Enabled' : 'Disabled'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Join Before</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{joinBeforeTime}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Join After</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{joinAfterTime}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Waiting Room</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{waitingRoom ? 'Enabled' : 'Disabled'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-muted)' }}>Reminders</span>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{sendReminder}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Ready to Publish green alert card (only step 4) */}
            {wizardStep === 4 && (
              <div style={{
                padding: '16px',
                borderRadius: '14px',
                backgroundColor: '#d1fae5',
                border: '1.5px solid rgba(16, 185, 129, 0.15)',
                display: 'flex',
                gap: '12px',
                color: '#10b981'
              }}>
                <CheckCircle size={20} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, marginBottom: '2px', color: '#065f46' }}>Ready to Publish!</h4>
                  <p style={{ fontSize: '10px', lineHeight: 1.4, color: '#047857' }}>Your live class is ready to be scheduled and students will be notified.</p>
                </div>
              </div>
            )}

            {/* Tips checklist card */}
            <div className="smart-card" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
              <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <CheckSquare size={14} style={{ color: '#10b981' }} />
                <span>{wizardStep === 3 ? "Tips for Class Settings" : "Tips for Scheduling"}</span>
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none', padding: 0, margin: 0 }}>
                {(wizardStep === 3 ? [
                  'Enable interactive tools to increase engagement',
                  'Allow students to join before the class starts',
                  'Recording helps absent students catch up',
                  'Send reminders to improve attendance'
                ] : [
                  'Choose a time that works best for most students',
                  'Ensure the duration is appropriate for the content',
                  'Add to calendar to avoid missing the class',
                  'Students will get reminders before the class starts'
                ]).map((tip, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '10px', color: 'var(--text-secondary)', lineHeight: 1.3 }}>
                    <span style={{ color: '#10b981', fontWeight: 'bold' }}>✓</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- 3. RENDER RECORDINGS VIEW ---
  function renderRecordingsView() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Class Recordings</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Review, download, and share past recorded sessions.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {mockClassesList.filter(c => c.status === 'Completed').map((cls) => (
            <div key={cls.id} className="smart-card" style={{ padding: '0px', overflow: 'hidden' }}>
              <div style={{ position: 'relative' }}>
                <img src={cls.thumbnail} alt={cls.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PlayCircle size={40} style={{ color: '#ffffff', opacity: 0.9, cursor: 'pointer' }} />
                </div>
                <span style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(0,0,0,0.7)', color: '#ffffff', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: 600 }}>
                  90 mins
                </span>
              </div>
              <div style={{ padding: '16px' }}>
                <span style={{ fontSize: '9px', fontWeight: 700, color: '#7c3aed', background: 'rgba(124, 58, 237, 0.06)', padding: '2px 6px', borderRadius: '4px', marginBottom: '8px', display: 'inline-block' }}>{cls.category}</span>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>{cls.title}</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Dr. Ahmed Al-Hassan • May 22, 2025</span>
                
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                  <button style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    border: '1.5px solid var(--border-color)',
                    fontSize: '11px',
                    fontWeight: 600,
                    color: 'var(--text-primary)'
                  }} className="click-press">Download</button>
                  <button style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '6px',
                    background: 'var(--primary-color)',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 600
                  }} className="click-press">Share Link</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- 4. RENDER CATEGORIES VIEW ---
  function renderCategoriesView() {
    const cats = [
      { name: 'Scholarship Exams', count: 18, bg: 'rgba(124, 58, 237, 0.08)', color: '#7c3aed' },
      { name: 'Language Tests', count: 24, bg: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6' },
      { name: 'Graduate Exams', count: 12, bg: 'rgba(245, 158, 11, 0.08)', color: '#f59e0b' },
      { name: 'Academic Success', count: 32, bg: 'rgba(16, 185, 129, 0.08)', color: '#10b981' },
      { name: 'Language Development', count: 15, bg: 'rgba(139, 92, 246, 0.08)', color: '#8b5cf6' },
      { name: 'Professional Certs', count: 9, bg: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' }
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Live Class Categories</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Manage classifications and subject groups for scheduling.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
          {cats.map((cat, i) => (
            <div key={i} className="smart-card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>{cat.name}</span>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{cat.count} scheduled classes</span>
              </div>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: cat.bg,
                color: cat.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '12px'
              }}>
                {cat.count}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- 5. RENDER SETTINGS VIEW ---
  function renderSettingsView() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)' }}>Live Class Settings</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Configure default rules, recording storage, and calendar setups.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          <div className="smart-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Default Preferences</h3>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Default Time Zone</label>
              <select style={{ fontSize: '12px' }}>
                <option>(GMT +03:00) Riyadh, Saudi Arabia</option>
                <option>(GMT +08:00) Kuala Lumpur, Malaysia</option>
              </select>
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Recording Storage Server</label>
              <select style={{ fontSize: '12px' }}>
                <option>AWS S3 Bucket (Primary)</option>
                <option>Google Cloud Storage (Backup)</option>
              </select>
            </div>
          </div>

          <div className="smart-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>Moderator Keys</h3>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Zoom API Key</label>
              <input type="password" value="••••••••••••••••••••••••••••••••" readOnly style={{ fontSize: '12px' }} />
            </div>

            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-primary)' }}>Webhook Security Token</label>
              <input type="password" value="••••••••••••••••••••••••••••••••" readOnly style={{ fontSize: '12px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
