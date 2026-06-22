import React, { useState, useEffect } from 'react';
import { 
  User, GraduationCap, Award, Settings, Check, ArrowRight, ArrowLeft, 
  Upload, FileText, Globe, Star, Mail, Phone, MapPin, ExternalLink, 
  ShieldCheck, AlertCircle, Trash2, Video, Plus, DollarSign, X, CheckCircle,
  Briefcase, Heart, HelpCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const QUALIFICATIONS = ['Bachelor\'s Degree', 'Master\'s Degree', 'Ph.D.', 'Diploma / Professional Certificate', 'Other'];
const CATEGORIES = ['Scholarship Exams', 'Academic', 'Language', 'STEM', 'Arts', 'Business', 'Technology'];
const LANGUAGES_LIST = ['English', 'Arabic', 'Spanish', 'French', 'German', 'Mandarin', 'Malay', 'Urdu', 'Turkish', 'Japanese'];

export default function BecomeInstructor({ db, setDb }) {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Form State
  const [form, setForm] = useState({
    // Step 1: Personal Info
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    location: '',
    bio: '',
    avatar: user?.avatar || '',
    
    // Step 2: Education & Expertise
    qualification: QUALIFICATIONS[0],
    university: '',
    experienceYears: '2',
    category: CATEGORIES[0],
    linkedin: '',
    website: '',
    languages: ['English'],
    
    // Step 3: Certification & Documents
    certName: '',
    certifications: [],
    resumeFile: null,
    degreeFile: null,
    transcriptFile: null,

    // Step 4: Profile Setup
    headline: '',
    hourlyRate: '35',
    videoUrl: '',
    introBanner: '',
    
    // Step 5: Review & Submit
    agreeTerms: false
  });

  // Mock Upload Progress states
  const [uploadProgress, setUploadProgress] = useState({
    resume: 0,
    degree: 0,
    transcript: 0,
    avatar: 0
  });

  const [uploading, setUploading] = useState({
    resume: false,
    degree: false,
    transcript: false,
    avatar: false
  });

  // Custom Language Handler
  const toggleLanguage = (lang) => {
    if (form.languages.includes(lang)) {
      setForm(f => ({ ...f, languages: f.languages.filter(l => l !== lang) }));
    } else {
      setForm(f => ({ ...f, languages: [...f.languages, lang] }));
    }
  };

  // Custom Certifications Handlers
  const addCertification = (e) => {
    e.preventDefault();
    if (!form.certName.trim()) return;
    setForm(f => ({
      ...f,
      certifications: [...f.certifications, f.certName.trim()],
      certName: ''
    }));
  };

  const removeCertification = (index) => {
    setForm(f => ({
      ...f,
      certifications: f.certifications.filter((_, i) => i !== index)
    }));
  };

  // Mock File Upload Handler
  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(prev => ({ ...prev, [type]: true }));
    setUploadProgress(prev => ({ ...prev, [type]: 0 }));

    // Simulate progress
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

  // Remove File
  const handleRemoveFile = (type) => {
    setForm(f => ({ ...f, [`${type}File`]: null }));
    setUploadProgress(prev => ({ ...prev, [type]: 0 }));
  };

  // Submit Handler
  const handleSubmit = () => {
    if (!form.agreeTerms) {
      alert("Please agree to the Terms of Service & Instructor Honor Code to submit your application.");
      return;
    }

    // Persist application in central reactive db
    if (setDb && db) {
      const newApplication = {
        id: `app-${Date.now()}`,
        studentId: user?.id || 'guest',
        studentName: form.fullName,
        email: form.email,
        phone: form.phone,
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
        if (s.email === user?.email) {
          return { ...s, status: 'Instructor Pending' };
        }
        return s;
      }) || [];

      // Add a platform notification
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

  if (isSubmitted) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left', background: 'var(--bg-app)', minHeight: '100%', margin: '-24px', padding: '36px 24px', alignItems: 'center', justifyContent: 'center' }}>
        <div className="smart-card" style={{ maxWidth: '640px', width: '100%', padding: '40px', background: 'var(--bg-card)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', borderTop: '6px solid var(--secondary-color)', borderLeft: '1px solid var(--border-color)', borderRight: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(202, 186, 97, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary-color)' }}>
            <CheckCircle size={44} />
          </div>
          
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>Application Submitted Successfully!</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Thank you for applying to become an instructor at SURIA TECH. Our academic board will review your credentials, certificates, and video introduction.
            </p>
          </div>

          {/* Verification Steps Visual Timeline */}
          <div style={{ width: '100%', background: 'var(--bg-app)', padding: '20px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left', border: '1px solid var(--border-color)' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '4px' }}>Application Status Tracker</h4>
            
            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--status-success)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}><Check size={12} /></div>
                <div style={{ width: '2px', height: '30px', background: 'var(--status-success)' }}></div>
              </div>
              <div>
                <strong style={{ fontSize: '12.5px', color: 'var(--text-primary)', display: 'block' }}>Step 1: Submission Received</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Completed successfully on {new Date().toLocaleDateString()}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--primary-color)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>2</div>
                <div style={{ width: '2px', height: '30px', background: 'var(--border-color)' }}></div>
              </div>
              <div>
                <strong style={{ fontSize: '12.5px', color: 'var(--text-primary)', display: 'block' }}>Step 2: Credentials Review (Pending)</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Our team is reviewing your uploaded qualifications and resume. (Takes 24-48 hours)</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#e2e8f0', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>3</div>
              </div>
              <div>
                <strong style={{ fontSize: '12.5px', color: 'var(--text-muted)', display: 'block' }}>Step 3: Final Board Interview & Approval</strong>
                <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>You will receive an email invitation to schedule a brief video call.</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
            <button 
              onClick={() => {
                // Return to student dashboard
                window.location.reload();
              }}
              className="btn-primary click-press" 
              style={{ flex: 1, padding: '12px', borderRadius: '10px', fontWeight: 700 }}
            >
              Go to Student Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Live profile preview card helper
  const renderLivePreviewCard = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'sticky', top: '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Live Profile Preview</h4>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', background: 'rgba(202, 186, 97, 0.15)', color: 'var(--secondary-color)', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
          <Star size={10} fill="currentColor" /> Preview Mode
        </span>
      </div>

      {/* Instructor Premium Card Mockup */}
      <div className="smart-card" style={{ padding: '0px', overflow: 'hidden', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-md)', transition: 'all 0.3s ease' }}>
        {/* Banner area */}
        <div style={{ 
          height: '90px', 
          background: form.introBanner ? `url(${form.introBanner}) center/cover no-repeat` : 'linear-gradient(135deg, #3A2048 0%, #7c3aed 100%)',
          position: 'relative' 
        }}>
          {form.introBanner && <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }}></div>}
        </div>

        {/* Profile Info */}
        <div style={{ padding: '20px', marginTop: '-35px', display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative' }}>
          {/* Avatar with gold border */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <img 
              src={form.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'} 
              alt="Instructor Avatar" 
              style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--bg-card)', background: 'var(--bg-card)', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200'; }}
            />
            <span style={{ fontSize: '15px', fontWeight: 800, color: 'var(--primary-color)', background: 'var(--bg-app)', padding: '4px 12px', borderRadius: '10px', border: '1px solid var(--border-color)' }}>
              ${form.hourlyRate || '0'}<span style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 500 }}>/hr</span>
            </span>
          </div>

          <div style={{ textAlign: 'left' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              {form.fullName || 'Your Name'}
              <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '16px', height: '16px', borderRadius: '50%', background: 'rgba(43,168,74,0.1)', color: 'var(--accent-green)' }}>
                <Check size={10} strokeWidth={3} />
              </span>
            </h3>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, marginTop: '2px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>{form.category} Coach</span>
              <span>•</span>
              <span>{form.experienceYears} Years Exp</span>
            </p>

            <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '8px', lineHeight: 1.4, opacity: form.headline ? 1 : 0.4 }}>
              {form.headline || "E.g., SAT Prep Specialist & Mathematics Instructor"}
            </h4>

            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: 1.5, opacity: form.bio ? 1 : 0.4 }}>
              {form.bio ? (form.bio.length > 120 ? `${form.bio.substring(0, 120)}...` : form.bio) : "Write a short profile bio in Personal Info tab to tell students about your unique teaching style."}
            </p>
          </div>

          {/* Badges / Languages */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(58,32,72,0.05)', padding: '2px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 700, color: 'var(--primary-color)' }}>
              <Globe size={9} />
              {form.languages.join(', ') || 'No languages set'}
            </div>
            {form.qualification && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(202,186,97,0.08)', padding: '2px 8px', borderRadius: '6px', fontSize: '9px', fontWeight: 700, color: '#9c8e2d' }}>
                <GraduationCap size={9} />
                {form.qualification.split(' ')[0]}
              </div>
            )}
          </div>

          {/* Social connections */}
          {(form.linkedin || form.website) && (
            <div style={{ display: 'flex', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '2px' }}>
              {form.linkedin && (
                <a href={form.linkedin} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: '#0077b5', fontWeight: 600 }}>
                  <Briefcase size={11} style={{ color: '#0077b5' }} /> LinkedIn
                </a>
              )}
              {form.website && (
                <a href={form.website} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', color: 'var(--primary-color)', fontWeight: 600 }}>
                  <ExternalLink size={11} /> Portfolio
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Intro Video Preview placeholder */}
      {form.videoUrl && (
        <div className="smart-card" style={{ padding: '12px', background: 'var(--bg-card)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Video size={14} />
          </div>
          <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
            <strong style={{ fontSize: '11px', display: 'block', color: 'var(--text-primary)' }}>Introduction Video Linked</strong>
            <span style={{ fontSize: '9px', color: 'var(--text-secondary)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{form.videoUrl}</span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left', background: 'var(--bg-app)', minHeight: '100%', margin: '-24px', padding: '24px' }}>
      
      {/* 1. Header Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
            Dashboard &nbsp;&gt;&nbsp; Become an Instructor
          </span>
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Become an Instructor
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Apply to share your knowledge, inspire students, and earn on your schedule.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          {activeStep > 1 && (
            <button 
              onClick={() => setActiveStep(prev => prev - 1)}
              className="click-press"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: '1px solid var(--primary-color)',
                background: 'var(--bg-card)',
                color: 'var(--primary-color)',
                fontWeight: 700,
                fontSize: '13px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ArrowLeft size={14} /> Back
            </button>
          )}
          
          <button 
            onClick={() => {
              if (activeStep < 5) {
                setActiveStep(prev => prev + 1);
              } else {
                handleSubmit();
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
              boxShadow: '0 4px 12px rgba(202, 186, 97, 0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {activeStep === 5 ? 'Submit Application' : 'Save & Continue'} <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* 2. Step Progress Bar */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        background: 'var(--bg-card)', 
        borderRadius: '12px', 
        padding: '16px 24px', 
        border: '1px solid var(--border-color)',
        gap: '8px',
        overflowX: 'auto'
      }}>
        {[
          { step: 1, title: 'Personal Info', desc: 'Basic details' },
          { step: 2, title: 'Education & Expertise', desc: 'Qualifications' },
          { step: 3, title: 'Certifications', desc: 'Verify credentials' },
          { step: 4, title: 'Profile Setup', desc: 'Bio & Intro Video' },
          { step: 5, title: 'Review & Submit', desc: 'Final application' }
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

      {/* Main Grid: Steps 1-4 has split layout, Step 5 has unified details */}
      {activeStep < 5 ? (
        <div className="become-instructor-grid" style={{ display: 'grid', gap: '20px', alignItems: 'start' }}>
          
          {/* LEFT CONTAINER: Form Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* STEP 1: PERSONAL INFORMATION */}
            {activeStep === 1 && (
              <div className="smart-card animate-fade-in" style={{ padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <User size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Personal Information</span>
                </h3>

                <div className="form-row-2col" style={{ display: 'grid', gap: '14px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Full Name *</label>
                    <input 
                      type="text" 
                      value={form.fullName} 
                      onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                      placeholder="e.g. Dr. Ahmed Hassan"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Email Address *</label>
                    <input 
                      type="email" 
                      value={form.email} 
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="email@example.com"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div className="form-row-2col" style={{ display: 'grid', gap: '14px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Phone Number *</label>
                    <input 
                      type="text" 
                      value={form.phone} 
                      onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      placeholder="+60 12-345 6789"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Country / Location *</label>
                    <input 
                      type="text" 
                      value={form.location} 
                      onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                      placeholder="Kuala Lumpur, Malaysia"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Avatar URL or Paste */}
                <div className="form-row-2col" style={{ display: 'grid', gap: '14px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Profile Picture URL</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <input 
                        type="text" 
                        value={form.avatar} 
                        onChange={e => setForm(f => ({ ...f, avatar: e.target.value }))}
                        placeholder="Paste image URL here (e.g. from Unsplash or Google)"
                        style={{ fontSize: '13px', flex: 1 }}
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          const demoAvatars = [
                            'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200',
                            'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200',
                            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200',
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200'
                          ];
                          const randomIdx = Math.floor(Math.random() * demoAvatars.length);
                          setForm(f => ({ ...f, avatar: demoAvatars[randomIdx] }));
                        }}
                        style={{ fontSize: '11px', background: 'rgba(58,32,72,0.06)', color: 'var(--primary-color)', padding: '0 14px', borderRadius: '8px', border: '1px solid rgba(58,32,72,0.1)', cursor: 'pointer', fontWeight: 600 }}
                      >
                        Random Avatar
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Short Bio (Public) *</label>
                  <textarea 
                    value={form.bio} 
                    onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                    rows={4}
                    maxLength={500}
                    placeholder="Tell students about your passion for teaching, experience, and what they can expect from your classes."
                    style={{ fontSize: '13px', lineHeight: 1.5, padding: '10px 12px' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {form.bio.length} / 500 characters
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: EDUCATION AND EXPERTISE */}
            {activeStep === 2 && (
              <div className="smart-card animate-fade-in" style={{ padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <GraduationCap size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Education &amp; Expertise</span>
                </h3>

                <div className="form-row-2col" style={{ display: 'grid', gap: '14px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Highest Educational Qualification *</label>
                    <select 
                      value={form.qualification} 
                      onChange={e => setForm(f => ({ ...f, qualification: e.target.value }))}
                      style={{ fontSize: '13px' }}
                    >
                      {QUALIFICATIONS.map(q => <option key={q} value={q}>{q}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>University / Institution *</label>
                    <input 
                      type="text" 
                      value={form.university} 
                      onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
                      placeholder="e.g. University of Malaya"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>

                <div className="form-row-2col" style={{ display: 'grid', gap: '14px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Subject Expertise Category *</label>
                    <select 
                      value={form.category} 
                      onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                      style={{ fontSize: '13px' }}
                    >
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Teaching Experience *</label>
                    <select 
                      value={form.experienceYears} 
                      onChange={e => setForm(f => ({ ...f, experienceYears: e.target.value }))}
                      style={{ fontSize: '13px' }}
                    >
                      <option value="1">1 Year or Less</option>
                      <option value="2">2 - 3 Years</option>
                      <option value="5">4 - 6 Years</option>
                      <option value="10">7 - 10 Years</option>
                      <option value="15">10+ Years</option>
                    </select>
                  </div>
                </div>

                <div className="form-row-2col" style={{ display: 'grid', gap: '14px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>LinkedIn Profile URL (Optional)</label>
                    <input 
                      type="text" 
                      value={form.linkedin} 
                      onChange={e => setForm(f => ({ ...f, linkedin: e.target.value }))}
                      placeholder="https://linkedin.com/in/username"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Personal Website / Portfolio (Optional)</label>
                    <input 
                      type="text" 
                      value={form.website} 
                      onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                      placeholder="https://yourportfolio.com"
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Languages Spoken Tag Selector */}
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Languages Spoken (Select all that apply) *</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {LANGUAGES_LIST.map((lang) => {
                      const isSelected = form.languages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '20px',
                            border: isSelected ? '1.5px solid var(--secondary-color)' : '1.5px solid var(--border-color)',
                            backgroundColor: isSelected ? 'rgba(202,186,97,0.1)' : 'transparent',
                            color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                            fontSize: '11px',
                            fontWeight: isSelected ? 700 : 500,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {lang}
                          {isSelected && <Check size={11} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: CERTIFICATION AND DOCUMENTS */}
            {activeStep === 3 && (
              <div className="smart-card animate-fade-in" style={{ padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Section header */}
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <Award size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Certifications &amp; Documents</span>
                </h3>

                {/* Resume Upload Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>CV / Resume (PDF, DOCX) *</label>
                  
                  {form.resumeFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-app)' }}>
                      <FileText size={16} style={{ color: 'var(--primary-color)' }} />
                      <span style={{ fontSize: '12px', flex: 1, color: 'var(--text-primary)', fontWeight: 600 }}>{form.resumeFile}</span>
                      <button onClick={() => handleRemoveFile('resume')} style={{ color: 'var(--status-danger)', padding: '4px', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed var(--border-color)', borderRadius: '10px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: 'var(--bg-app)', position: 'relative' }}>
                      <input 
                        type="file" 
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload('resume', e)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                        disabled={uploading.resume}
                      />
                      {uploading.resume ? (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-color)' }}>Uploading CV... {uploadProgress.resume}%</span>
                          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                            <div style={{ width: `${uploadProgress.resume}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.15s ease' }}></div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload size={20} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Upload your Resume / CV</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>PDF, DOCX up to 5MB</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Degree / Graduation Certificate Upload */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)' }}>Highest Degree / Graduation Certificate *</label>
                  
                  {form.degreeFile ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '8px', background: 'var(--bg-app)' }}>
                      <FileText size={16} style={{ color: 'var(--primary-color)' }} />
                      <span style={{ fontSize: '12px', flex: 1, color: 'var(--text-primary)', fontWeight: 600 }}>{form.degreeFile}</span>
                      <button onClick={() => handleRemoveFile('degree')} style={{ color: 'var(--status-danger)', padding: '4px', cursor: 'pointer' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1.5px dashed var(--border-color)', borderRadius: '10px', padding: '20px', cursor: 'pointer', transition: 'all 0.2s', backgroundColor: 'var(--bg-app)', position: 'relative' }}>
                      <input 
                        type="file" 
                        accept=".pdf,.png,.jpg,.jpeg"
                        onChange={(e) => handleFileUpload('degree', e)}
                        style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                        disabled={uploading.degree}
                      />
                      {uploading.degree ? (
                        <div style={{ width: '100%', textAlign: 'center' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--primary-color)' }}>Uploading Certificate... {uploadProgress.degree}%</span>
                          <div style={{ width: '100%', height: '4px', background: '#e2e8f0', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                            <div style={{ width: `${uploadProgress.degree}%`, height: '100%', background: 'var(--primary-color)', transition: 'width 0.15s ease' }}></div>
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload size={20} style={{ color: 'var(--text-muted)', marginBottom: '8px' }} />
                          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>Upload Degree / Certificate scan</span>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>PDF, JPEG, PNG up to 5MB</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Add Certifications and Achievements list */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                  <h4 style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Add Certifications &amp; Licenses</h4>
                  
                  {form.certifications.length > 0 && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '4px 0' }}>
                      {form.certifications.map((cert, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: '8px', padding: '8px 12px' }}>
                          <Award size={14} style={{ color: 'var(--secondary-color)' }} />
                          <span style={{ fontSize: '12px', color: 'var(--text-primary)', flex: 1 }}>{cert}</span>
                          <button type="button" onClick={() => removeCertification(idx)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                            <X size={13} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={addCertification} style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      placeholder="e.g. Certified IELTS Trainer - British Council" 
                      value={form.certName} 
                      onChange={e => setForm(f => ({ ...f, certName: e.target.value }))}
                      style={{ fontSize: '12px', flex: 1 }}
                    />
                    <button type="submit" className="btn-primary click-press" style={{ padding: '8px 16px', fontSize: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Plus size={13} /> Add
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* STEP 4: PROFILE SETUP */}
            {activeStep === 4 && (
              <div className="smart-card animate-fade-in" style={{ padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <Settings size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Profile Setup</span>
                </h3>

                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Instructor Headline *</label>
                  <input 
                    type="text" 
                    value={form.headline} 
                    onChange={e => setForm(f => ({ ...f, headline: e.target.value }))}
                    placeholder="e.g. Senior SAT Math Coach & Calculus Teacher with Ph.D."
                    style={{ fontSize: '13px' }}
                  />
                  <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>Write a short professional catchphrase describing your teaching style and target students.</span>
                </div>

                <div className="form-row-2col" style={{ display: 'grid', gap: '14px' }}>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Hourly Teaching Rate ($ USD) *</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '13px', fontWeight: 700, color: 'var(--text-secondary)' }}>$</span>
                      <input 
                        type="number" 
                        value={form.hourlyRate} 
                        onChange={e => setForm(f => ({ ...f, hourlyRate: e.target.value }))}
                        placeholder="35"
                        style={{ fontSize: '13px', paddingLeft: '24px', width: '100%' }}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Intro Video URL (YouTube / Vimeo)</label>
                    <input 
                      type="text" 
                      value={form.videoUrl} 
                      onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))}
                      placeholder="e.g. https://www.youtube.com/watch?v=..."
                      style={{ fontSize: '13px' }}
                    />
                  </div>
                </div>

                {/* Profile Banner Image */}
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Profile Banner Image URL</label>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input 
                      type="text" 
                      value={form.introBanner} 
                      onChange={e => setForm(f => ({ ...f, introBanner: e.target.value }))}
                      placeholder="Paste background banner image URL (e.g. workspace, library)"
                      style={{ fontSize: '13px', flex: 1 }}
                    />
                    <button 
                      type="button" 
                      onClick={() => {
                        const demoBanners = [
                          'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600',
                          'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600',
                          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600'
                        ];
                        const randomIdx = Math.floor(Math.random() * demoBanners.length);
                        setForm(f => ({ ...f, introBanner: demoBanners[randomIdx] }));
                      }}
                      style={{ fontSize: '11px', background: 'rgba(58,32,72,0.06)', color: 'var(--primary-color)', padding: '0 14px', borderRadius: '8px', border: '1px solid rgba(58,32,72,0.1)', cursor: 'pointer', fontWeight: 600 }}
                    >
                      Use Demo Banner
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT CONTAINER: Live Profile Preview */}
          <div>
            {renderLivePreviewCard()}
          </div>
        </div>
      ) : (
        /* STEP 5: REVIEW AND SUBMIT */
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
            
            {/* Left Column: Summary of entered details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Application Details Summary Card */}
              <div className="smart-card" style={{ padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                  <ShieldCheck size={16} style={{ color: 'var(--primary-color)' }} />
                  <span>Review Application Details</span>
                </h3>

                {/* Personal Information Grid */}
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-color)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>1. Personal Info</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', fontSize: '12px', background: 'var(--bg-app)', padding: '14px', borderRadius: '8px' }}>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Full Name:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.fullName}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Email:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.email}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Phone:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.phone || 'Not provided'}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Location:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.location || 'Not provided'}</strong></div>
                    <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-secondary)' }}>Bio:</span> <p style={{ margin: '4px 0 0 0', lineHeight: 1.4, color: 'var(--text-primary)' }}>{form.bio || 'No bio provided'}</p></div>
                  </div>
                </div>

                {/* Education and Expertise */}
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-color)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>2. Education & Expertise</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', fontSize: '12px', background: 'var(--bg-app)', padding: '14px', borderRadius: '8px' }}>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Highest Degree:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.qualification}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>University:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.university || 'Not provided'}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Specialty Category:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.category}</strong></div>
                    <div><span style={{ color: 'var(--text-secondary)' }}>Teaching Experience:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.experienceYears} Years</strong></div>
                    <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-secondary)' }}>Languages Spoken:</span> <strong style={{ color: 'var(--text-primary)' }}>{form.languages.join(', ')}</strong></div>
                    {form.linkedin && <div style={{ gridColumn: 'span 2' }}><span style={{ color: 'var(--text-secondary)' }}>LinkedIn:</span> <a href={form.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{form.linkedin}</a></div>}
                  </div>
                </div>

                {/* Certifications and Documents */}
                <div>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-color)', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>3. Certifications &amp; Documents</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', background: 'var(--bg-app)', padding: '14px', borderRadius: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>CV / Resume File:</span>
                      <strong style={{ color: form.resumeFile ? 'var(--status-success)' : 'var(--status-danger)' }}>
                        {form.resumeFile || '⚠️ Missing CV document'}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Degree / Certificate Scan:</span>
                      <strong style={{ color: form.degreeFile ? 'var(--status-success)' : 'var(--status-danger)' }}>
                        {form.degreeFile || '⚠️ Missing Graduation certificate scan'}
                      </strong>
                    </div>
                    {form.certifications.length > 0 && (
                      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '8px', marginTop: '4px' }}>
                        <span style={{ color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Additional Certifications:</span>
                        <ul style={{ margin: 0, paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                          {form.certifications.map((cert, idx) => (
                            <li key={idx} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cert}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Public Card Preview + Submit checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Profile setup overview */}
              <div className="smart-card" style={{ padding: '20px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>4. Profile Setup Review</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Headline:</span>
                    <strong style={{ textAlign: 'right', maxWidth: '160px', color: 'var(--text-primary)' }}>{form.headline || 'Not provided'}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Hourly Rate:</span>
                    <strong style={{ color: 'var(--text-primary)' }}>${form.hourlyRate}/hr</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Intro Video Linked:</span>
                    <strong style={{ color: form.videoUrl ? 'var(--status-success)' : 'var(--text-muted)' }}>{form.videoUrl ? 'Yes' : 'No'}</strong>
                  </div>
                </div>
              </div>

              {/* Terms and Submit Form */}
              <div className="smart-card" style={{ padding: '20px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Honor Code &amp; Submission</h4>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <input 
                    type="checkbox" 
                    id="agreeTerms" 
                    checked={form.agreeTerms} 
                    onChange={e => setForm(f => ({ ...f, agreeTerms: e.target.checked }))}
                    style={{ marginTop: '3px', cursor: 'pointer' }}
                  />
                  <label htmlFor="agreeTerms" style={{ fontSize: '11px', lineHeight: 1.4, color: 'var(--text-secondary)', cursor: 'pointer' }}>
                    I agree to the <strong>SURIA TECH Instructor Honor Code</strong> and verify that all qualifications, documents, and credentials submitted are authentic and represent my own background.
                  </label>
                </div>

                {(!form.resumeFile || !form.degreeFile) && (
                  <div style={{ display: 'flex', gap: '8px', background: 'var(--status-danger-bg)', padding: '10px 12px', borderRadius: '8px', color: 'var(--status-danger)', fontSize: '10.5px', border: '1px solid rgba(239, 68, 68, 0.1)', alignItems: 'center' }}>
                    <AlertCircle size={14} style={{ flexShrink: 0 }} />
                    <span>Please upload all required certificates and resume in <strong>Step 3</strong> before submitting.</span>
                  </div>
                )}

                <button 
                  onClick={handleSubmit}
                  disabled={!form.agreeTerms || !form.resumeFile || !form.degreeFile}
                  className="btn-primary click-press"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '13px',
                    background: (!form.agreeTerms || !form.resumeFile || !form.degreeFile) ? 'var(--text-muted)' : 'var(--secondary-color)',
                    color: '#ffffff',
                    cursor: (!form.agreeTerms || !form.resumeFile || !form.degreeFile) ? 'not-allowed' : 'pointer',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <ShieldCheck size={16} />
                  <span>Submit Application</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
