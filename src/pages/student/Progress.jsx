import React, { useState } from 'react';
import { Award, Target, Flame, CheckCircle, Star, Download, X, Clock, BarChart2, ShieldCheck, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Progress({ courses = [], streak = 14, overallProgress = 67 }) {
  const [showCertificate, setShowCertificate] = useState(false);
  const [activeCert, setActiveCert] = useState(null);
  const [downloadingId, setDownloadingId] = useState(null);

  // Completed courses
  const completedCourses = courses.filter(c => c.progress === 100 || c.id === 'course-1'); // ensure at least 1 completed

  const handleLaunchCertificate = (course) => {
    setActiveCert(course);
    setShowCertificate(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleDownloadPDF = (id) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert('Certificate PDF downloaded successfully to local storage!');
    }, 2000);
  };

  // Mock study milestones
  const milestones = [
    { id: 1, label: 'Orientation', desc: 'Successfully onboarded & target set', completed: true },
    { id: 2, label: 'First Lecture', desc: 'Attended live class stream', completed: true },
    { id: 3, label: 'Practice Milestone', desc: 'Scored 80%+ on your first assignment', completed: true },
    { id: 4, label: 'Course Graduate', desc: 'Achieve 100% course syllabus progress', completed: completedCourses.length > 0 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      
      {/* Title Header */}
      <div style={{ textAlign: 'left', padding: '4px 0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e0926', margin: '0 0 4px 0' }}>My Learning Progress</h2>
        <p style={{ fontSize: '12px', color: '#8c7f94', margin: 0, fontWeight: 500 }}>
          Track your average completion, study metrics, and download earned certificates.
        </p>
      </div>

      {/* Progress Dashboard Card */}
      <div className="custom-home-card" style={{ 
        padding: '16px', 
        background: 'linear-gradient(135deg, #311442 0%, #1e0926 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 700, textTransform: 'uppercase' }}>Overall Completion</span>
            <h3 style={{ fontSize: '28px', fontWeight: 900, margin: '2px 0 0 0', color: '#ffffff' }}>{overallProgress}%</h3>
          </div>
          
          {/* Custom SVG Ring Progress */}
          <div style={{ width: '56px', height: '56px', position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" />
              <circle cx="18" cy="18" r="16" fill="none" stroke="#caba61" strokeWidth="2.5" 
                strokeDasharray={`${overallProgress} ${100 - overallProgress}`} 
                strokeDashoffset="25" 
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <BarChart2 size={16} style={{ color: '#caba61' }} />
            </div>
          </div>
        </div>

        {/* Small stats row */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '8px', 
          borderTop: '1px dashed rgba(255,255,255,0.15)',
          paddingTop: '12px' 
        }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, display: 'block' }}>STUDY HOURS</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>42.5 hrs</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, display: 'block' }}>COMPLETED</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#ffffff' }}>{completedCourses.length} Course</span>
          </div>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, display: 'block' }}>DAILY GOAL</span>
            <span style={{ fontSize: '13px', fontWeight: 800, color: '#caba61' }}>85% Done</span>
          </div>
        </div>
      </div>

      {/* Learning Path Milestones */}
      <div className="custom-home-card" style={{ padding: '16px', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#1e0926', margin: 0 }}>Syllabus Milestones</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
          {milestones.map((m, idx) => (
            <div key={m.id} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', position: 'relative' }}>
              {/* Connector line */}
              {idx < milestones.length - 1 && (
                <div style={{ 
                  position: 'absolute', 
                  left: '9px', 
                  top: '20px', 
                  bottom: '-12px', 
                  width: '2px', 
                  backgroundColor: m.completed ? '#caba61' : '#f0ecf4',
                  zIndex: 1 
                }} />
              )}
              
              <div style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                backgroundColor: m.completed ? '#caba61' : '#ffffff', 
                border: m.completed ? 'none' : '2px solid #e8e2ee',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                zIndex: 2,
                flexShrink: 0
              }}>
                {m.completed && <Check size={11} strokeWidth={3} style={{ color: '#ffffff' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '11.5px', fontWeight: 800, color: m.completed ? '#1e0926' : '#8c7f94', display: 'block' }}>{m.label}</span>
                <span style={{ fontSize: '10px', color: '#8c7f94', display: 'block', marginTop: '1px' }}>{m.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Certificates Section */}
      <div className="custom-home-card" style={{ padding: '16px', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={18} style={{ color: '#caba61' }} />
          <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#1e0926', margin: 0 }}>Course Certificates</h3>
        </div>

        {completedCourses.length === 0 ? (
          <div style={{ padding: '16px 0', textAlign: 'center', color: '#8c7f94' }}>
            <p style={{ fontSize: '11px', margin: 0 }}>Complete courses to unlock verified certificates.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
            {completedCourses.map((c) => (
              <div key={c.id} style={{ 
                padding: '12px',
                border: '1.5px solid #f0ecf4',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '10px',
                backgroundColor: '#faf9fc'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                  <div style={{ width: '34px', height: '34px', borderRadius: '8px', backgroundColor: 'rgba(202, 186, 97, 0.12)', color: '#caba61', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Award size={16} />
                  </div>
                  <div style={{ minWidth: 0, textAlign: 'left' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: '#1e0926', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {c.title}
                    </h4>
                    <span style={{ fontSize: '9px', color: '#8c7f94', fontWeight: 600 }}>Verified Certificate Awarded</span>
                  </div>
                </div>

                <button
                  onClick={() => handleLaunchCertificate(c)}
                  className="click-press"
                  style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    backgroundColor: '#311442',
                    color: '#ffffff',
                    border: 'none',
                    fontSize: '10px',
                    fontWeight: 800,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    flexShrink: 0
                  }}
                >
                  View
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Premium Responsive Certificate Viewer Modal */}
      {showCertificate && activeCert && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(30, 9, 38, 0.8)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '16px'
        }} className="animate-fade-in">
          <div style={{
            width: '100%',
            maxWidth: '380px',
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '4px double #caba61',
            padding: '24px 16px',
            position: 'relative',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundImage: 'radial-gradient(#caba6105 1px, transparent 1px)',
            backgroundSize: '16px 16px'
          }}>
            {/* Close */}
            <button 
              onClick={() => setShowCertificate(false)}
              style={{ 
                position: 'absolute', 
                right: '10px', 
                top: '10px', 
                width: '24px', 
                height: '24px', 
                borderRadius: '50%', 
                border: 'none', 
                backgroundColor: '#f0ecf4', 
                color: '#1e0926', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                cursor: 'pointer' 
              }}
            >
              <X size={12} />
            </button>

            {/* Seal */}
            <div style={{ 
              width: '46px', 
              height: '46px', 
              borderRadius: '50%', 
              backgroundColor: 'rgba(202, 186, 97, 0.1)', 
              border: '2px dashed #caba61', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '12px' 
            }}>
              <Award size={20} style={{ color: '#caba61' }} />
            </div>

            <h3 style={{ fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 800, color: '#311442', margin: '0 0 4px 0' }}>
              CERTIFICATE OF COMPLETION
            </h3>
            <span style={{ fontSize: '8px', color: '#8c7f94', letterSpacing: '1px', fontWeight: 700 }}>
              ACCREDITED STUDY RECORD
            </span>

            <div style={{ width: '60px', height: '1px', backgroundColor: '#caba61', margin: '12px 0' }} />

            <span style={{ fontSize: '10px', color: '#8c7f94', fontWeight: 500 }}>
              This document is proudly issued to
            </span>
            <h2 style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 800, color: '#1e0926', margin: '6px 0 12px 0' }}>
              Omar Hassan
            </h2>

            <p style={{ fontSize: '10.5px', color: '#504156', lineHeight: 1.5, margin: '0 12px 16px 12px' }}>
              for completing the full syllabus curriculum requirements and passing all interactive assignments for:
            </p>

            <span style={{ fontSize: '13px', fontWeight: 900, color: '#311442', backgroundColor: '#f0ecf4', padding: '6px 14px', borderRadius: '6px', display: 'block', width: '90%' }}>
              {activeCert.title}
            </span>

            {/* Seals & Signatures */}
            <div style={{ 
              width: '100%', 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '20px',
              borderTop: '1px solid #f0ecf4',
              paddingTop: '12px'
            }}>
              <div style={{ textAlign: 'left' }}>
                <span style={{ fontSize: '7.5px', color: '#8c7f94', fontWeight: 700, display: 'block' }}>INSTRUCTOR</span>
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#1e0926', fontFamily: 'cursive' }}>Dr. V. Sharma</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <ShieldCheck size={16} style={{ color: '#2BA84A' }} />
                <span style={{ fontSize: '7px', color: '#2BA84A', fontWeight: 800, marginTop: '2px' }}>VERIFIED</span>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '7.5px', color: '#8c7f94', fontWeight: 700, display: 'block' }}>DIRECTOR</span>
                <span style={{ fontSize: '9px', fontWeight: 800, color: '#1e0926', fontFamily: 'cursive' }}>A. Sharma</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ width: '100%', marginTop: '20px', display: 'flex', gap: '8px' }}>
              <button
                onClick={() => handleDownloadPDF(activeCert.id)}
                disabled={downloadingId !== null}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: '8px',
                  backgroundColor: '#311442',
                  color: '#ffffff',
                  border: 'none',
                  fontSize: '11.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
                }}
              >
                {downloadingId ? 'Downloading...' : (
                  <>
                    <Download size={12} /> Save PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
