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
  PDF: { bg: 'rgba(239, 68, 68, 0.06)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.15)' },
  Image: { bg: 'rgba(59, 130, 246, 0.06)', color: '#3b82f6', border: 'rgba(59, 130, 246, 0.15)' },
  Video: { bg: 'rgba(168, 85, 247, 0.06)', color: '#a855f7', border: 'rgba(168, 85, 247, 0.15)' },
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
      // Mock alert or toast
      const notification = document.createElement('div');
      notification.style.position = 'fixed';
      notification.style.bottom = '90px';
      notification.style.left = '50%';
      notification.style.transform = 'translateX(-50%)';
      notification.style.backgroundColor = '#1e0926';
      notification.style.color = '#fff';
      notification.style.padding = '8px 16px';
      notification.style.borderRadius = '20px';
      notification.style.fontSize = '12px';
      notification.style.fontWeight = 'bold';
      notification.style.zIndex = '100000';
      notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      notification.innerText = `Downloaded: ${name}`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 2500);
    }, 1500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '100%' }} className="animate-fade-in">
      {/* Premium Title Header */}
      <div style={{ textAlign: 'left', padding: '4px 0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e0926', margin: '0 0 4px 0' }}>My Resources</h2>
        <p style={{ fontSize: '12px', color: '#8c7f94', margin: 0, fontWeight: 500 }}>
          Access, preview, and download study notes, cheat sheets, and practice exams.
        </p>
      </div>

      {/* Styled Search Bar */}
      <div className="custom-home-search-bar" style={{ margin: 0 }}>
        <Search size={16} style={{ color: '#a095a8' }} />
        <input
          type="text"
          placeholder="Search materials or courses..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{ fontSize: '13px' }}
        />
        {searchFilter && (
          <button 
            onClick={() => setSearchFilter('')}
            style={{ background: 'none', border: 'none', color: '#a095a8', fontSize: '11px', fontWeight: 700, cursor: 'pointer' }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Horizontal Category Tabs */}
      <div style={{ 
        display: 'flex', 
        gap: '6px', 
        overflowX: 'auto', 
        paddingBottom: '6px', 
        margin: '0 -16px',
        paddingLeft: '16px',
        paddingRight: '16px',
        scrollbarWidth: 'none'
      }} className="hide-scrollbar">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className="click-press"
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '11.5px',
              fontWeight: 700,
              backgroundColor: activeType === t ? '#311442' : '#ffffff',
              color: activeType === t ? '#ffffff' : '#8c7f94',
              border: '1.5px solid',
              borderColor: activeType === t ? '#311442' : '#f0ecf4',
              whiteSpace: 'nowrap',
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
        <div className="custom-home-card" style={{ padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px' }}>
          <File size={36} style={{ color: '#a095a8', marginBottom: '12px' }} />
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1e0926', margin: '0 0 4px 0' }}>No Resources Found</h4>
          <p style={{ fontSize: '11px', color: '#8c7f94', margin: 0, textAlign: 'center' }}>We couldn't find matching materials. Check spelling or select another tab.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((res) => {
            const IconComp = typeIcons[res.type] || FileText;
            const colors = typeColors[res.type] || typeColors.PDF;
            const isDownloading = downloadingId === res.id;
            const isDownloaded = downloadedIds.has(res.id);

            return (
              <div 
                key={res.id} 
                className="custom-home-card click-press" 
                style={{
                  padding: '12px 14px', 
                  flexDirection: 'row',
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  gap: '12px',
                  border: `1px solid ${colors.border}`,
                  transition: 'transform 0.15s ease'
                }}
              >
                {/* Left side: Icon + Text */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '38px', 
                    height: '38px', 
                    borderRadius: '10px', 
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
                      fontSize: '12.5px', 
                      fontWeight: 800, 
                      color: '#1e0926', 
                      margin: 0, 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis', 
                      whiteSpace: 'nowrap' 
                    }}>
                      {res.name}
                    </h4>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '3px' }}>
                      <span style={{ fontSize: '10px', color: '#8c7f94', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {res.course}
                      </span>
                      <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#a095a8', flexShrink: 0 }} />
                      <span style={{ fontSize: '9px', color: '#a095a8', fontWeight: 700, flexShrink: 0 }}>
                        {res.size}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right side: Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  {/* Quick Preview Button */}
                  <button
                    onClick={() => setPreviewResource(res)}
                    className="click-press"
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(55, 18, 60, 0.04)',
                      color: '#311442',
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
                      padding: '8px 12px',
                      borderRadius: '8px',
                      backgroundColor: isDownloaded ? 'rgba(43, 168, 74, 0.08)' : '#311442',
                      color: isDownloaded ? '#2BA84A' : '#ffffff',
                      border: 'none',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      minWidth: '78px',
                      justifyContent: 'center'
                    }}
                  >
                    {isDownloading ? (
                      <span className="spinner" style={{ width: '10px', height: '10px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.6s linear infinite' }} />
                    ) : isDownloaded ? (
                      <>
                        <CheckCircle size={11} /> Saved
                      </>
                    ) : (
                      <>
                        <Download size={11} /> Save
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modern Preview Modal */}
      {previewResource && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(30, 9, 38, 0.75)',
          backdropFilter: 'blur(4px)',
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
            boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textAlign: 'left'
          }}>
            {/* Grab handle for sheet look */}
            <div style={{ width: '40px', height: '4px', backgroundColor: '#e8e2ee', borderRadius: '2px', alignSelf: 'center', margin: '-8px 0 4px 0' }} />

            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '12px' }}>
              <div>
                <span style={{ 
                  fontSize: '9px', 
                  fontWeight: 800, 
                  color: typeColors[previewResource.type]?.color, 
                  backgroundColor: typeColors[previewResource.type]?.bg,
                  padding: '2px 8px',
                  borderRadius: '4px',
                  border: `1px solid ${typeColors[previewResource.type]?.border}`
                }}>
                  {previewResource.type} RESOURCE
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#1e0926', marginTop: '6px', marginBottom: '2px' }}>{previewResource.name}</h3>
                <span style={{ fontSize: '11px', color: '#8c7f94', fontWeight: 500 }}>Syllabus: {previewResource.course}</span>
              </div>
              <button 
                onClick={() => setPreviewResource(null)}
                style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#f0ecf4', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e0926', cursor: 'pointer' }}
              >
                <X size={14} />
              </button>
            </div>

            {/* Document Content Viewport */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              backgroundColor: '#faf9fc',
              border: '1.5px solid #f0ecf4',
              borderRadius: '12px',
              padding: '16px',
              minHeight: '220px',
              maxHeight: '340px'
            }}>
              {previewResource.type === 'Video' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'rgba(168, 85, 247, 0.1)', color: '#a855f7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Video size={24} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#1e0926' }}>Video Lesson Preview</span>
                    <p style={{ fontSize: '11px', color: '#8c7f94', margin: '4px 0 0 0' }}>{previewResource.content}</p>
                  </div>
                  <button 
                    style={{ background: '#311442', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                    onClick={() => alert('Starting video lecture player...')}
                  >
                    Play Video <ExternalLink size={10} />
                  </button>
                </div>
              ) : previewResource.type === 'Image' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }}>
                  <div style={{ width: '100%', flex: 1, backgroundColor: '#caba611c', border: '2px dashed #caba613b', borderRadius: '8px', minHeight: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Image size={32} style={{ color: '#caba61' }} />
                  </div>
                  <p style={{ fontSize: '11.5px', color: '#504156', lineHeight: 1.4, margin: 0 }}>{previewResource.content}</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e8e2ee', paddingBottom: '6px' }}>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#a095a8' }}>DOCUMENT PREVIEW</span>
                    <span style={{ fontSize: '9px', fontWeight: 700, color: '#a095a8' }}>PAGE 1 OF 1</span>
                  </div>
                  <p style={{ fontSize: '12px', color: '#311442', lineHeight: 1.6, fontWeight: 550, margin: 0 }}>
                    {previewResource.content}
                  </p>
                  <p style={{ fontSize: '11.5px', color: '#8c7f94', lineHeight: 1.5, margin: 0 }}>
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
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  border: '1.5px solid #e8e2ee',
                  color: '#8c7f94',
                  fontSize: '12px',
                  fontWeight: 700,
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
                  borderRadius: '10px',
                  backgroundColor: '#311442',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px'
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
