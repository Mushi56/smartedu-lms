import React, { useState } from 'react';
import { FileText, Download, Search, File, Image, Video, Eye, X, BookOpen, CheckCircle, ExternalLink } from 'lucide-react';

const allResources = [
  { id: 1, name: 'SAT Math Formula Sheet', type: 'PDF', size: '2.4 MB', course: 'SAT Math Mastery', date: 'May 10, 2026', content: 'SAT Math formulas: Quadratic Equation, Pythagoras Theorem, Trigonometric identities, Area formulas, and probability concepts.' },
  { id: 2, name: 'IELTS Writing Samples', type: 'PDF', size: '1.8 MB', course: 'IELTS Speaking Success', date: 'May 12, 2026', content: 'Band 9 essays: Essay task 1 & task 2 sample answers. Learn key linking phrases and advanced vocabulary structures.' },
  { id: 3, name: 'Essay Writing Guide', type: 'PDF', size: '3.1 MB', course: 'Essay Writing Excellence', date: 'May 18, 2026', content: 'A step-by-step framework to brainstorm, structure, outline, and write academic essays. Includes thesis statement examples.' },
  { id: 4, name: 'GRE Quant Formula Sheet', type: 'PDF', size: '1.2 MB', course: 'GRE Quantitative Reasoning', date: 'May 15, 2026', content: 'High-frequency GRE quant formulas: Algebra rules, geometry properties, data analysis equations, and percentage shortcuts.' },
  { id: 5, name: 'TOEFL Vocabulary List', type: 'PDF', size: '0.9 MB', course: 'TOEFL iBT Complete Guide', date: 'May 14, 2026', content: '500 must-know academic words for TOEFL. Definitions, synonyms, and contextual sentences included.' },
  { id: 6, name: 'SAT Practice Test #1', type: 'PDF', size: '4.5 MB', course: 'SAT Math Mastery', date: 'May 22, 2026', content: 'Full-length SAT Math practice test with calculator and non-calculator sections. Answers and explanations attached.' },
  { id: 7, name: 'Linear Equations Cheat Sheet', type: 'Image', size: '0.5 MB', course: 'SAT Math Mastery', date: 'May 20, 2026', content: 'Visual representation of slope-intercept form, point-slope form, and graph translations.' },
  { id: 8, name: 'IELTS Speaking Part 2 Tips', type: 'Video', size: '28 MB', course: 'IELTS Speaking Success', date: 'May 25, 2026', content: 'Video lesson: Ms. Sarah Johnson breaks down how to structure your 2-minute talk, using the cue card effectively.' },
];

const typeIcons = {
  PDF: FileText,
  Image: Image,
  Video: Video,
};

const typeColors = {
  PDF: { bg: 'rgba(239, 68, 68, 0.06)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.1)' },
  Image: { bg: 'rgba(59, 130, 246, 0.06)', color: '#3b82f6', border: 'rgba(59, 130, 246, 0.1)' },
  Video: { bg: 'rgba(168, 85, 247, 0.06)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.1)' },
};

export default function Resources() {
  const [searchFilter, setSearchFilter] = useState('');
  const [activeType, setActiveType] = useState('All');
  const [downloadingId, setDownloadingId] = useState(null);
  const [downloadedIds, setDownloadedIds] = useState(new Set());
  const [previewResource, setPreviewResource] = useState(null);

  const types = ['All', 'PDF', 'Image', 'Video'];

  const filtered = allResources.filter(r => {
    const matchesType = activeType === 'All' || r.type === activeType;
    const matchesSearch = r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          r.course.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesType && matchesSearch;
  });

  const handleDownload = (id, name) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      setDownloadedIds(prev => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      
      const notification = document.createElement('div');
      notification.style.position = 'fixed';
      notification.style.bottom = '90px';
      notification.style.left = '50%';
      notification.style.transform = 'translateX(-50%)';
      notification.style.backgroundColor = 'var(--text-primary)';
      notification.style.color = '#fff';
      notification.style.padding = '10px 20px';
      notification.style.borderRadius = '20px';
      notification.style.fontSize = '12px';
      notification.style.fontWeight = 'bold';
      notification.style.zIndex = '100000';
      notification.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
      notification.innerText = `Downloaded: ${name}`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2500);
    }, 1500);
  };

  const premiumCard = {
    background: '#ffffff',
    borderRadius: '20px',
    border: '1px solid rgba(0,0,0,0.02)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.02)',
    padding: '16px',
    position: 'relative'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100%' }} className="animate-fade-in">
      {/* Title Header */}
      <div style={{ textAlign: 'left' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>My Resources</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 550 }}>
          Access, preview, and download study notes, cheat sheets, and practice exams.
        </p>
      </div>

      {/* Styled Search Bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: '#fff', border: '1px solid rgba(0,0,0,0.03)', borderRadius: '16px',
        padding: '12px 16px', boxShadow: '0 4px 16px rgba(0,0,0,0.02)'
      }}>
        <Search size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search materials or courses..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{
            border: 'none', background: 'none', outline: 'none',
            fontSize: '13px', fontFamily: 'inherit', color: 'var(--text-primary)', flex: 1,
            fontWeight: 500
          }}
        />
        {searchFilter && (
          <button 
            onClick={() => setSearchFilter('')}
            style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: '11px', fontWeight: 800, cursor: 'pointer' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Horizontal Category Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '8px', 
        overflowX: 'auto', 
        paddingBottom: '6px'
      }} className="hide-scrollbar">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className="click-press"
            style={{
              flexShrink: 0,
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 750,
              border: 'none',
              backgroundColor: activeType === t ? 'var(--primary-color)' : '#fff',
              color: activeType === t ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeType === t ? '0 4px 12px rgba(99,102,241,0.2)' : '0 2px 8px rgba(0,0,0,0.02)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Resource Cards Grid */}
      {filtered.length === 0 ? (
        <div style={{
          ...premiumCard, padding: '48px 24px', textAlign: 'center', display: 'flex',
          flexDirection: 'column', alignItems: 'center', gap: '12px'
        }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
            <File size={24} />
          </div>
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>No Resources Found</h4>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 500 }}>We couldn't find matching materials. Check spelling or select another tab.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map((res) => {
            const IconComp = typeIcons[res.type] || FileText;
            const colors = typeColors[res.type] || typeColors.PDF;
            const isDownloading = downloadingId === res.id;
            const isDownloaded = downloadedIds.has(res.id);

            return (
              <div 
                key={res.id} 
                className="click-press" 
                style={{
                  ...premiumCard,
                  padding: '12px 16px', 
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  gap: '14px',
                  border: `1px solid ${colors.border}`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.015)'
                }}
              >
                {/* Left side: Icon + Text */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '40px', 
                    height: '40px', 
                    borderRadius: '12px', 
                    backgroundColor: colors.bg,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    flexShrink: 0
                  }}>
                    <IconComp size={18} style={{ color: colors.color }} />
                  </div>
                  
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <h4 style={{ 
                      fontSize: '13px', 
                      fontWeight: 800, 
                      color: 'var(--text-primary)', 
                      margin: 0, 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap',
                      lineHeight: 1.3
                    }}>
                      {res.name}
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '3px' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {res.course}
                      </span>
                      <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: 'var(--text-muted)', flexShrink: 0 }} />
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 700, flexShrink: 0 }}>
                        {res.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                  {/* Quick Preview Button */}
                  <button
                    onClick={() => setPreviewResource(res)}
                    className="click-press"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(99, 102, 241, 0.06)',
                      color: 'var(--primary-color)',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Quick Preview"
                  >
                    <Eye size={14} />
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(res.id, res.name)}
                    disabled={isDownloading}
                    className="click-press"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '10px',
                      backgroundColor: isDownloaded ? 'rgba(16, 185, 129, 0.08)' : 'var(--primary-color)',
                      color: isDownloaded ? '#10b981' : '#ffffff',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      minWidth: '78px',
                      justifyContent: 'center',
                      boxShadow: isDownloaded ? 'none' : '0 2px 8px rgba(99,102,241,0.15)'
                    }}
                  >
                    {isDownloading ? (
                      <span className="spinner" style={{ width: '10px', height: '10px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
                    ) : isDownloaded ? (
                      <>
                        <CheckCircle size={12} /> Saved
                      </>
                    ) : (
                      <>
                        <Download size={12} /> Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modern Preview Modal / Bottom Sheet */}
      {previewResource && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 99999,
        }} className="animate-fade-in">
          <div style={{
            width: '100%',
            maxHeight: '90%',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px',
            boxShadow: '0 -10px 30px rgba(0,0,0,0.05)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textAlign: 'left'
          }}>
            {/* Grab handle */}
            <div style={{ width: '40px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', alignSelf: 'center', margin: '-8px 0 4px 0' }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px' }}>
              <div>
                <span style={{ 
                  fontSize: '9px', 
                  fontWeight: 800, 
                  color: typeColors[previewResource.type]?.color, 
                  backgroundColor: typeColors[previewResource.type]?.bg,
                  padding: '4px 10px',
                  borderRadius: '10px',
                  border: `1px solid ${typeColors[previewResource.type]?.border}`
                }}>
                  {previewResource.type} RESOURCE
                </span>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '8px', marginBottom: '2px' }}>{previewResource.name}</h3>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 550 }}>Syllabus: {previewResource.course}</span>
              </div>
              <button 
                onClick={() => setPreviewResource(null)}
                style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f1f5f9', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Document Content Viewport */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#f8fafc',
              border: '1px solid rgba(0,0,0,0.03)',
              borderRadius: '16px',
              padding: '16px',
              minHeight: '220px',
              maxHeight: '340px'
            }}>
              {previewResource.type === 'Video' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px', minHeight: '200px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Video size={22} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)' }}>Video Lesson Preview</span>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 0 0', fontWeight: 500 }}>{previewResource.content}</p>
                  </div>
                  <button 
                    style={{ 
                      background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)', 
                      color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '20px', 
                      fontSize: '11px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', 
                      cursor: 'pointer', boxShadow: '0 4px 12px rgba(99,102,241,0.2)' 
                    }}
                    onClick={() => alert('Starting video lecture player...')}
                  >
                    Play Video <ExternalLink size={12} />
                  </button>
                </div>
              ) : previewResource.type === 'Image' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
                  <div style={{ width: '100%', flex: 1, backgroundColor: 'rgba(99, 102, 241, 0.03)', border: '2px dashed rgba(99, 102, 241, 0.15)', borderRadius: '12px', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image size={32} style={{ color: 'var(--primary-color)' }} />
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, fontWeight: 550 }}>{previewResource.content}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.03)', paddingBottom: '6px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)' }}>DOCUMENT PREVIEW</span>
                    <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-muted)' }}>PAGE 1 OF 1</span>
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-primary)', lineHeight: 1.6, fontWeight: 600, margin: 0 }}>
                    {previewResource.content}
                  </p>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0, fontWeight: 500 }}>
                    This resource contains essential notes compiled by your course mentor to help you revise key syllabus points before mock assessments. Use the download action to save the complete high-resolution PDF package.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setPreviewResource(null)}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  borderRadius: '12px',
                  backgroundColor: '#ffffff',
                  border: '1px solid rgba(0,0,0,0.05)',
                  color: 'var(--text-secondary)',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  const id = previewResource.id;
                  const name = previewResource.name;
                  setPreviewResource(null);
                  handleDownload(id, name);
                }}
                style={{
                  flex: 1.2,
                  padding: '10px 0',
                  borderRadius: '12px',
                  backgroundColor: 'var(--primary-color)',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 12px rgba(99,102,241,0.15)'
                }}
              >
                <Download size={14} /> Download File ({previewResource.size})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Spin style injector */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
