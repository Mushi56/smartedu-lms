import React, { useState } from 'react';
import { 
  User, GraduationCap, Award, Settings, Check, ArrowRight, ArrowLeft, 
  Upload, FileText, Globe, Star, Mail, Phone, MapPin, ExternalLink, 
  ShieldCheck, AlertCircle, Trash2, Video, Plus, DollarSign, X, CheckCircle,
  Briefcase, Heart, HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const QUALIFICATIONS = ['Bachelor\'s Degree', 'Master\'s Degree', 'Ph.D.', 'Diploma / Professional Certificate', 'Other'];
const CATEGORIES = ['Scholarship Exams', 'Academic', 'Language', 'STEM', 'Arts', 'Business', 'Technology'];
const LANGUAGES_LIST = [
  'Afrikaans', 'Albanian', 'Amharic', 'Arabic', 'Armenian', 'Azerbaijani', 'Basque', 'Belarusian', 'Bengali', 'Bosnian', 
  'Bulgarian', 'Burmese', 'Catalan', 'Cebuano', 'Chichewa', 'Chinese (Mandarin)', 'Chinese (Cantonese)', 'Corsican', 'Croatian', 'Czech', 
  'Danish', 'Dutch', 'English', 'Esperanto', 'Estonian', 'Filipino', 'Finnish', 'French', 'Frisian', 'Galician', 
  'Georgian', 'German', 'Greek', 'Gujarati', 'Haitian Creole', 'Hausa', 'Hawaiian', 'Hebrew', 'Hindi', 'Hmong', 
  'Hungarian', 'Icelandic', 'Igbo', 'Indonesian', 'Irish', 'Italian', 'Japanese', 'Javanese', 'Kannada', 'Kazakh', 
  'Khmer', 'Kinyarwanda', 'Korean', 'Kurdish', 'Kyrgyz', 'Lao', 'Latin', 'Latvian', 'Lithuanian', 'Luxembourgish', 
  'Macedonian', 'Malagasy', 'Malay', 'Malayalam', 'Maltese', 'Maori', 'Marathi', 'Mongolian', 'Nepali', 'Norwegian', 
  'Odia (Oriya)', 'Pashto', 'Persian', 'Polish', 'Portuguese', 'Punjabi', 'Romanian', 'Russian', 'Samoan', 'Scots Gaelic', 
  'Serbian', 'Sesotho', 'Shona', 'Sindhi', 'Sinhala', 'Slovak', 'Slovenian', 'Somali', 'Spanish', 'Sundanese', 
  'Swahili', 'Swedish', 'Tajik', 'Tamil', 'Tatar', 'Telugu', 'Thai', 'Turkish', 'Turkmen', 'Ukrainian', 
  'Urdu', 'Uyghur', 'Uzbek', 'Vietnamese', 'Welsh', 'Xhosa', 'Yiddish', 'Yoruba', 'Zulu'
];
const COUNTRY_CODES = [
  { flag: '🇲🇾', code: '+60', name: 'Malaysia' },
  { flag: '🇸🇬', code: '+65', name: 'Singapore' },
  { flag: '🇬🇧', code: '+44', name: 'United Kingdom' },
  { flag: '🇺🇸', code: '+1', name: 'United States' },
  { flag: '🇨🇦', code: '+1', name: 'Canada' },
  { flag: '🇦🇺', code: '+61', name: 'Australia' },
  { flag: '🇮🇳', code: '+91', name: 'India' },
  { flag: '🇵🇰', code: '+92', name: 'Pakistan' },
  { flag: '🇸🇦', code: '+966', name: 'Saudi Arabia' },
  { flag: '🇦🇪', code: '+971', name: 'United Arab Emirates' },
  { flag: '🇹🇷', code: '+90', name: 'Turkey' },
  { flag: '🇧🇩', code: '+880', name: 'Bangladesh' }
];

// ── Shared Styles ─────────────────────────────────────────────────
const cardStyle = {
  background: '#fff', borderRadius: '16px',
  border: '1px solid #ede9f4', padding: '16px',
  display: 'flex', flexDirection: 'column', gap: '14px'
};

const labelStyle = {
  fontSize: '10px', fontWeight: 700,
  color: 'var(--text-secondary)', display: 'block', marginBottom: '5px',
  textTransform: 'uppercase', letterSpacing: '0.3px'
};

const inputStyle = {
  width: '100%', padding: '10px 12px', fontSize: '13px',
  border: '1px solid #ede9f4', borderRadius: '10px',
  background: '#faf9fc', color: 'var(--text-primary)',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
};

const sectionHeaderStyle = {
  fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)',
  borderBottom: '1px solid #ede9f4', paddingBottom: '10px',
  display: 'flex', alignItems: 'center', gap: '8px', margin: 0
};

export default function BecomeInstructor({ db, setDb }) {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [form, setForm] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    countryCode: '+60',
    location: '',
    bio: '',
    avatar: user?.avatar || '',
    qualification: QUALIFICATIONS[0],
    university: '',
    experienceYears: '2',
    category: CATEGORIES[0],
    linkedin: '',
    website: '',
    languages: ['English'],
    certName: '',
    certifications: [],
    resumeFile: null,
    degreeFile: null,
    headline: '',
    hourlyRate: '35',
    videoUrl: '',
    introBanner: '',
    agreeTerms: false
  });

  const [uploadProgress, setUploadProgress] = useState({ resume: 0, degree: 0 });
  const [uploading, setUploading] = useState({ resume: false, degree: false });

  const toggleLanguage = (lang) => {
    if (form.languages.includes(lang)) {
      setForm(f => ({ ...f, languages: f.languages.filter(l => l !== lang) }));
    } else {
      setForm(f => ({ ...f, languages: [...f.languages, lang] }));
    }
  };

  const addCertification = (e) => {
    e.preventDefault();
    if (!form.certName.trim()) return;
    setForm(f => ({ ...f, certifications: [...f.certifications, f.certName.trim()], certName: '' }));
  };

  const removeCertification = (index) => {
    setForm(f => ({ ...f, certifications: f.certifications.filter((_, i) => i !== index) }));
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(prev => ({ ...prev, [type]: true }));
    setUploadProgress(prev => ({ ...prev, [type]: 0 }));
    let prog = 0;
    const interval = setInterval(() => {
      prog += 20;
      setUploadProgress(prev => ({ ...prev, [type]: prog }));
      if (prog >= 100) {
        clearInterval(interval);
        setUploading(prev => ({ ...prev, [type]: false }));
        setForm(f => ({ ...f, [`${type}File`]: file.name }));
      }
    }, 150);
  };

  const handleRemoveFile = (type) => {
    setForm(f => ({ ...f, [`${type}File`]: null }));
    setUploadProgress(prev => ({ ...prev, [type]: 0 }));
  };

  const handleSubmit = () => {
    if (!form.agreeTerms) {
      alert("Please agree to the Terms of Service & Instructor Honor Code to submit.");
      return;
    }
    if (setDb && db) {
      const newApplication = {
        id: `app-${Date.now()}`,
        studentId: user?.id || 'guest',
        studentName: form.fullName,
        email: form.email,
        phone: `${form.countryCode} ${form.phone}`,
        location: form.location,
        bio: form.bio,
        qualification: form.qualification,
        university: form.university,
        experienceYears: form.experienceYears,
        category: form.category,
        hourlyRate: form.hourlyRate,
        headline: form.headline,
        status: 'Pending',
        submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };
      const updatedStudents = db.students?.map(s => {
        if (s.email === user?.email) return { ...s, status: 'Instructor Pending' };
        return s;
      }) || [];
      const newNotification = {
        id: `n-${Date.now()}`,
        text: `Your application to become an instructor is under review.`,
        time: 'Just now',
        read: false
      };
      setDb(prev => ({
        ...prev,
        students: updatedStudents,
        notifications: [newNotification, ...prev.notifications],
        instructorApplications: [newApplication, ...(prev.instructorApplications || [])]
      }));
    }
    setIsSubmitted(true);
  };

  const STEPS = [
    { step: 1, title: 'Personal', icon: User },
    { step: 2, title: 'Education', icon: GraduationCap },
    { step: 3, title: 'Documents', icon: Award },
    { step: 4, title: 'Profile', icon: Settings },
    { step: 5, title: 'Submit', icon: ShieldCheck }
  ];

  // ═══════════════════════════════════════════════════════════════
  // SUCCESS SCREEN
  // ═══════════════════════════════════════════════════════════════
  if (isSubmitted) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
        <div style={{ ...cardStyle, alignItems: 'center', textAlign: 'center', borderTop: '4px solid var(--secondary-color)', padding: '28px 16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(202, 186, 97, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-color)' }}>
            <CheckCircle size={32} />
          </div>
          <h2 style={{ fontSize: '17px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Application Submitted!</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Our academic board will review your credentials. You'll receive an email with the next steps.
          </p>
        </div>

        {/* Status Tracker */}
        <div style={cardStyle}>
          <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Application Status</h4>
          {[
            { num: 1, label: 'Submission Received', detail: `Completed on ${new Date().toLocaleDateString()}`, done: true },
            { num: 2, label: 'Credentials Review', detail: 'Under review (24-48 hrs)', active: true },
            { num: 3, label: 'Board Interview & Approval', detail: 'Video call will be scheduled via email' }
          ].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%',
                  background: s.done ? '#10b981' : s.active ? 'var(--primary-color)' : '#e2e8f0',
                  color: s.done || s.active ? '#fff' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '9px', fontWeight: 700
                }}>
                  {s.done ? <Check size={11} /> : s.num}
                </div>
                {i < 2 && <div style={{ width: '2px', height: '20px', background: s.done ? '#10b981' : '#ede9f4' }} />}
              </div>
              <div>
                <strong style={{ fontSize: '11px', color: s.done || s.active ? 'var(--text-primary)' : 'var(--text-muted)', display: 'block' }}>{s.label}</strong>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>{s.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => window.location.reload()}
          className="click-press"
          style={{
            padding: '12px', borderRadius: '12px', border: 'none',
            background: 'var(--primary-color)', color: '#fff',
            fontWeight: 700, fontSize: '13px', cursor: 'pointer', width: '100%'
          }}
        >
          Go to Student Dashboard
        </button>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  // MAIN FORM
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Become an Instructor</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>
          Share your knowledge, inspire students & earn on your schedule.
        </p>
      </div>

      {/* Step Progress — compact mobile circles */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: '#fff', borderRadius: '14px', padding: '12px 14px',
        border: '1px solid #ede9f4', gap: '4px'
      }}>
        {STEPS.map((s, i) => {
          const isActive = activeStep === s.step;
          const isDone = activeStep > s.step;
          const Icon = s.icon;
          return (
            <React.Fragment key={s.step}>
              <div
                onClick={() => setActiveStep(s.step)}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                  cursor: 'pointer', opacity: isActive || isDone ? 1 : 0.5, flex: '0 0 auto'
                }}
              >
                <div style={{
                  width: '30px', height: '30px', borderRadius: '50%',
                  background: isActive ? 'var(--primary-color)' : isDone ? '#10b981' : '#ede9f4',
                  color: isActive || isDone ? '#fff' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '11px', fontWeight: 700, transition: 'all 0.2s'
                }}>
                  {isDone ? <Check size={13} /> : <Icon size={13} />}
                </div>
                <span style={{ fontSize: '8px', fontWeight: 700, color: isActive ? 'var(--primary-color)' : 'var(--text-muted)' }}>
                  {s.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ flex: 1, height: '2px', background: isDone ? '#10b981' : '#ede9f4', borderRadius: '1px', minWidth: '12px' }} />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* ── STEP 1: Personal Info ──────────────────────────────── */}
      {activeStep === 1 && (
        <div style={cardStyle} className="animate-fade-in">
          <h3 style={sectionHeaderStyle}>
            <User size={15} style={{ color: 'var(--primary-color)' }} />
            Personal Information
          </h3>

          <div>
            <label style={labelStyle}>Full Name *</label>
            <input style={inputStyle} type="text" value={form.fullName}
              onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
              placeholder="Enter your full name" />
          </div>

          <div>
            <label style={labelStyle}>Email Address *</label>
            <input style={inputStyle} type="email" value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="Enter your email address" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Phone *</label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <select 
                  value={form.countryCode}
                  onChange={e => setForm(f => ({ ...f, countryCode: e.target.value }))}
                  style={{ 
                    padding: '10px 4px', 
                    fontSize: '12px', 
                    border: '1px solid #ede9f4', 
                    borderRadius: '10px', 
                    background: '#faf9fc', 
                    color: 'var(--text-primary)',
                    outline: 'none', 
                    fontFamily: 'inherit',
                    width: '74px',
                    flexShrink: 0
                  }}
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
                <input style={inputStyle} type="text" value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value.replace(/\D/g, '') }))}
                  placeholder="Phone number" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Location *</label>
              <input style={inputStyle} type="text" value={form.location}
                onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                placeholder="Enter city, country" />
            </div>
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label style={labelStyle}>Profile Picture *</label>
            {form.avatar ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', border: '1px solid #ede9f4', borderRadius: '12px', background: '#faf9fc' }}>
                <img 
                  src={form.avatar} 
                  alt="Profile Preview" 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--primary-color)' }} 
                />
                <span style={{ fontSize: '11px', flex: 1, color: 'var(--text-primary)', fontWeight: 600 }}>Avatar Uploaded</span>
                <button 
                  type="button"
                  onClick={() => setForm(f => ({ ...f, avatar: '' }))} 
                  style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '1.5px dashed #ede9f4', borderRadius: '12px', padding: '20px',
                cursor: 'pointer', background: '#faf9fc', position: 'relative', textAlign: 'center'
              }}>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const localUrl = URL.createObjectURL(file);
                      setForm(f => ({ ...f, avatar: localUrl }));
                    }
                  }}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                />
                <Upload size={18} style={{ color: 'var(--text-muted)', marginBottom: '6px' }} />
                <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Upload Profile Image</span>
                <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>PNG, JPG, or GIF up to 2MB</span>
              </div>
            )}
          </div>

          <div>
            <label style={labelStyle}>Short Bio *</label>
            <textarea
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical', lineHeight: 1.5 }}
              value={form.bio}
              onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
              maxLength={500}
              placeholder="Tell students about your passion for teaching..."
            />
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', textAlign: 'right', display: 'block', marginTop: '2px' }}>
              {form.bio.length}/500
            </span>
          </div>
        </div>
      )}

      {/* ── STEP 2: Education & Expertise ──────────────────────── */}
      {activeStep === 2 && (
        <div style={cardStyle} className="animate-fade-in">
          <h3 style={sectionHeaderStyle}>
            <GraduationCap size={15} style={{ color: 'var(--primary-color)' }} />
            Education & Expertise
          </h3>

          <div>
            <label style={labelStyle}>Highest Qualification *</label>
            <select style={inputStyle} value={form.qualification}
              onChange={e => setForm(f => ({ ...f, qualification: e.target.value }))}>
              {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
            </select>
          </div>

          <div>
            <label style={labelStyle}>University / Institution *</label>
            <input style={inputStyle} type="text" value={form.university}
              onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
              placeholder="Enter university or institution name" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Subject Category *</label>
              <select style={inputStyle} value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Experience *</label>
              <select style={inputStyle} value={form.experienceYears}
                onChange={e => setForm(f => ({ ...f, experienceYears: e.target.value }))}>
                <option value="1">1 Year or Less</option>
                <option value="2">2 - 3 Years</option>
                <option value="5">4 - 6 Years</option>
                <option value="10">7 - 10 Years</option>
                <option value="15">10+ Years</option>
              </select>
            </div>
          </div>

          <div>
            <label style={labelStyle}>LinkedIn Profile (Optional)</label>
            <input style={inputStyle} type="text" value={form.linkedin}
              onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
              placeholder="Enter LinkedIn profile link" />
          </div>

          <div>
            <label style={labelStyle}>Website / Portfolio (Optional)</label>
            <input style={inputStyle} type="text" value={form.website}
              onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
              placeholder="Enter website or portfolio link" />
          </div>

          {/* Languages */}
          <div>
            <label style={labelStyle}>Languages Spoken *</label>
            
            {/* Selected Language Tags */}
            {form.languages.length > 0 && (
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                {form.languages.map((lang) => (
                  <span
                    key={lang}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '16px',
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: 'rgba(202,186,97,0.12)',
                      color: 'var(--text-primary)',
                      border: '1px solid rgba(202, 186, 97, 0.3)'
                    }}
                  >
                    {lang}
                    <button
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '1px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <X size={10} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Selector Dropdown */}
            <select
              value=""
              onChange={(e) => {
                const val = e.target.value;
                if (val && !form.languages.includes(val)) {
                  toggleLanguage(val);
                }
              }}
              style={inputStyle}
            >
              <option value="" disabled>Select languages to add...</option>
              {LANGUAGES_LIST.map((lang) => (
                <option key={lang} value={lang} disabled={form.languages.includes(lang)}>
                  {lang} {form.languages.includes(lang) ? '✓' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ── STEP 3: Certifications & Documents ────────────────── */}
      {activeStep === 3 && (
        <div style={cardStyle} className="animate-fade-in">
          <h3 style={sectionHeaderStyle}>
            <Award size={15} style={{ color: 'var(--primary-color)' }} />
            Certifications & Documents
          </h3>

          {/* Resume Upload */}
          <div>
            <label style={labelStyle}>CV / Resume (PDF, DOCX) *</label>
            {form.resumeFile ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ede9f4', borderRadius: '10px', background: '#faf9fc' }}>
                <FileText size={14} style={{ color: 'var(--primary-color)' }} />
                <span style={{ fontSize: '11px', flex: 1, color: 'var(--text-primary)', fontWeight: 600 }}>{form.resumeFile}</span>
                <button onClick={() => handleRemoveFile('resume')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '1.5px dashed #ede9f4', borderRadius: '10px', padding: '18px',
                cursor: 'pointer', background: '#faf9fc', position: 'relative'
              }}>
                <input type="file" accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFileUpload('resume', e)}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                  disabled={uploading.resume} />
                {uploading.resume ? (
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-color)' }}>Uploading... {uploadProgress.resume}%</span>
                    <div style={{ width: '100%', height: '3px', background: '#ede9f4', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${uploadProgress.resume}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.15s' }} />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload size={18} style={{ color: 'var(--text-muted)', marginBottom: '6px' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Upload Resume / CV</span>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>PDF, DOCX up to 5MB</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Degree Upload */}
          <div>
            <label style={labelStyle}>Degree / Certificate *</label>
            {form.degreeFile ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', border: '1px solid #ede9f4', borderRadius: '10px', background: '#faf9fc' }}>
                <FileText size={14} style={{ color: 'var(--primary-color)' }} />
                <span style={{ fontSize: '11px', flex: 1, color: 'var(--text-primary)', fontWeight: 600 }}>{form.degreeFile}</span>
                <button onClick={() => handleRemoveFile('degree')} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}>
                  <Trash2 size={13} />
                </button>
              </div>
            ) : (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                border: '1.5px dashed #ede9f4', borderRadius: '10px', padding: '18px',
                cursor: 'pointer', background: '#faf9fc', position: 'relative'
              }}>
                <input type="file" accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(e) => handleFileUpload('degree', e)}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                  disabled={uploading.degree} />
                {uploading.degree ? (
                  <div style={{ width: '100%', textAlign: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-color)' }}>Uploading... {uploadProgress.degree}%</span>
                    <div style={{ width: '100%', height: '3px', background: '#ede9f4', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${uploadProgress.degree}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.15s' }} />
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload size={18} style={{ color: 'var(--text-muted)', marginBottom: '6px' }} />
                    <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-primary)' }}>Upload Degree / Certificate</span>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px' }}>PDF, JPEG, PNG up to 5MB</span>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Add Certifications */}
          <div style={{ borderTop: '1px solid #ede9f4', paddingTop: '12px' }}>
            <label style={labelStyle}>Additional Certifications</label>
            {form.certifications.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '8px' }}>
                {form.certifications.map((cert, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#faf9fc', border: '1px solid #ede9f4', borderRadius: '8px', padding: '7px 10px' }}>
                    <Award size={12} style={{ color: 'var(--secondary-color)', flexShrink: 0 }} />
                    <span style={{ fontSize: '11px', color: 'var(--text-primary)', flex: 1 }}>{cert}</span>
                    <button type="button" onClick={() => removeCertification(idx)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '2px' }}>
                      <X size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={addCertification} style={{ display: 'flex', gap: '8px' }}>
              <input style={{ ...inputStyle, flex: 1 }} type="text"
                placeholder="Enter certification name"
                value={form.certName}
                onChange={e => setForm(f => ({ ...f, certName: e.target.value }))} />
              <button type="submit" className="click-press"
                style={{
                  padding: '8px 14px', borderRadius: '10px', border: 'none',
                  background: 'var(--primary-color)', color: '#fff',
                  fontSize: '10px', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap'
                }}>
                <Plus size={12} /> Add
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── STEP 4: Profile Setup ─────────────────────────────── */}
      {activeStep === 4 && (
        <div style={cardStyle} className="animate-fade-in">
          <h3 style={sectionHeaderStyle}>
            <Settings size={15} style={{ color: 'var(--primary-color)' }} />
            Profile Setup
          </h3>

          <div>
            <label style={labelStyle}>Instructor Headline *</label>
            <input style={inputStyle} type="text" value={form.headline}
              onChange={e => setForm(f => ({ ...f, headline: e.target.value }))}
              placeholder="Enter your professional title or headline" />
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '3px', display: 'block' }}>
              A short catchy tagline describing your expertise.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={labelStyle}>Hourly Rate ($ USD) *</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>$</span>
                <input style={{ ...inputStyle, paddingLeft: '24px' }} type="number"
                  value={form.hourlyRate}
                  onChange={e => setForm(f => ({ ...f, hourlyRate: e.target.value }))}
                  placeholder="Enter hourly rate" />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Intro Video URL</label>
              <input style={inputStyle} type="text" value={form.videoUrl}
                onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))}
                placeholder="Enter YouTube or Vimeo video link" />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Profile Banner Image URL</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input style={{ ...inputStyle, flex: 1 }} type="text" value={form.introBanner}
                onChange={e => setForm(f => ({ ...f, introBanner: e.target.value }))}
                placeholder="Paste banner image URL" />
              <button type="button"
                onClick={() => {
                  const demos = [
                    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600',
                    'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600'
                  ];
                  setForm(f => ({ ...f, introBanner: demos[Math.floor(Math.random() * demos.length)] }));
                }}
                className="click-press"
                style={{
                  padding: '8px 12px', borderRadius: '10px', border: '1px solid #ede9f4',
                  background: 'rgba(124,58,237,0.06)', color: 'var(--primary-color)',
                  fontSize: '10px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap'
                }}
              >
                Demo
              </button>
            </div>
          </div>

          {/* Live Preview Card */}
          <div style={{ borderTop: '1px solid #ede9f4', paddingTop: '12px' }}>
            <span style={{ fontSize: '9px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <Star size={9} fill="currentColor" /> Live Preview
            </span>
            <div style={{ borderRadius: '14px', overflow: 'hidden', border: '1px solid #ede9f4', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
              <div style={{
                height: '60px',
                background: form.introBanner ? `url(${form.introBanner}) center/cover no-repeat` : 'linear-gradient(135deg, #3A2048 0%, #7c3aed 100%)',
                position: 'relative'
              }}>
                {form.introBanner && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />}
              </div>
              <div style={{ padding: '14px', marginTop: '-22px', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '8px' }}>
                  <img
                    src={form.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'}
                    alt=""
                    style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #fff', background: '#fff', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' }}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'; }}
                  />
                  <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--primary-color)' }}>
                    ${form.hourlyRate || '0'}<span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 500 }}>/hr</span>
                  </span>
                </div>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {form.fullName || 'Your Name'}
                  <span style={{ display: 'inline-flex', width: '14px', height: '14px', borderRadius: '50%', background: 'rgba(43,168,74,0.1)', color: '#22c55e', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={9} strokeWidth={3} />
                  </span>
                </h4>
                <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                  {form.category} Coach · {form.experienceYears} yrs exp
                </p>
                {form.headline && (
                  <p style={{ fontSize: '10px', fontWeight: 600, color: 'var(--text-primary)', margin: '6px 0 0 0', lineHeight: 1.3 }}>
                    {form.headline}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 5: Review & Submit ───────────────────────────── */}
      {activeStep === 5 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Review Summary */}
          <div style={cardStyle}>
            <h3 style={sectionHeaderStyle}>
              <ShieldCheck size={15} style={{ color: 'var(--primary-color)' }} />
              Review Your Application
            </h3>

            {/* Personal Info */}
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>1. Personal Info</h4>
              <div style={{ background: '#faf9fc', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                {[
                  ['Name', form.fullName],
                  ['Email', form.email],
                  ['Phone', form.phone || 'Not provided'],
                  ['Location', form.location || 'Not provided']
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <strong style={{ color: 'var(--text-primary)', textAlign: 'right', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>2. Education & Expertise</h4>
              <div style={{ background: '#faf9fc', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                {[
                  ['Qualification', form.qualification],
                  ['University', form.university || 'Not provided'],
                  ['Category', form.category],
                  ['Experience', `${form.experienceYears} Years`],
                  ['Languages', form.languages.join(', ')]
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <strong style={{ color: 'var(--text-primary)', textAlign: 'right', maxWidth: '55%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Documents */}
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>3. Documents</h4>
              <div style={{ background: '#faf9fc', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Resume</span>
                  <strong style={{ color: form.resumeFile ? '#10b981' : '#ef4444' }}>{form.resumeFile || '⚠️ Missing'}</strong>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Degree</span>
                  <strong style={{ color: form.degreeFile ? '#10b981' : '#ef4444' }}>{form.degreeFile || '⚠️ Missing'}</strong>
                </div>
                {form.certifications.length > 0 && (
                  <div style={{ borderTop: '1px solid #ede9f4', paddingTop: '6px', marginTop: '2px' }}>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '10px' }}>Certifications:</span>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '4px' }}>
                      {form.certifications.map((cert, idx) => (
                        <span key={idx} style={{ fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', background: 'rgba(202,186,97,0.1)', color: '#9c8e2d' }}>{cert}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Profile Setup */}
            <div>
              <h4 style={{ fontSize: '10px', fontWeight: 700, color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 8px 0' }}>4. Profile Setup</h4>
              <div style={{ background: '#faf9fc', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }}>
                {[
                  ['Headline', form.headline || 'Not provided'],
                  ['Rate', `$${form.hourlyRate}/hr`],
                  ['Intro Video', form.videoUrl ? 'Linked ✓' : 'No']
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                    <strong style={{ color: 'var(--text-primary)' }}>{v}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Terms & Submit */}
          <div style={cardStyle}>
            <h4 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Honor Code & Submission</h4>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <input type="checkbox" id="agreeTerms" checked={form.agreeTerms}
                onChange={e => setForm(f => ({ ...f, agreeTerms: e.target.checked }))}
                style={{ marginTop: '2px', cursor: 'pointer', flexShrink: 0 }} />
              <label htmlFor="agreeTerms" style={{ fontSize: '10px', lineHeight: 1.4, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                I agree to the <strong>SURIA TECH Instructor Honor Code</strong> and verify all credentials are authentic.
              </label>
            </div>

            {(!form.resumeFile || !form.degreeFile) && (
              <div style={{ display: 'flex', gap: '6px', background: 'rgba(239,68,68,0.06)', padding: '8px 10px', borderRadius: '8px', color: '#ef4444', fontSize: '10px', border: '1px solid rgba(239,68,68,0.1)', alignItems: 'center' }}>
                <AlertCircle size={13} style={{ flexShrink: 0 }} />
                <span>Upload required documents in <strong>Step 3</strong> before submitting.</span>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!form.agreeTerms || !form.resumeFile || !form.degreeFile}
              className="click-press"
              style={{
                width: '100%', padding: '12px', borderRadius: '12px', border: 'none',
                background: (!form.agreeTerms || !form.resumeFile || !form.degreeFile) ? '#c4b5c9' : 'var(--secondary-color)',
                color: '#fff', fontWeight: 700, fontSize: '12px',
                cursor: (!form.agreeTerms || !form.resumeFile || !form.degreeFile) ? 'not-allowed' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}
            >
              <ShieldCheck size={15} /> Submit Application
            </button>
          </div>
        </div>
      )}

      {/* ── Navigation Buttons ────────────────────────────────── */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {activeStep > 1 && (
          <button
            onClick={() => setActiveStep(prev => prev - 1)}
            className="click-press"
            style={{
              flex: 1, padding: '12px', borderRadius: '12px',
              border: '1px solid #ede9f4', background: '#fff',
              color: 'var(--text-primary)', fontWeight: 700, fontSize: '12px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '6px'
            }}
          >
            <ArrowLeft size={14} /> Back
          </button>
        )}
        {activeStep < 5 && (
          <button
            onClick={() => setActiveStep(prev => prev + 1)}
            className="click-press"
            style={{
              flex: 1, padding: '12px', borderRadius: '12px',
              border: 'none', background: 'var(--secondary-color)',
              color: '#fff', fontWeight: 700, fontSize: '12px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '6px',
              boxShadow: '0 4px 12px rgba(202, 186, 97, 0.2)'
            }}
          >
            Save & Continue <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}
