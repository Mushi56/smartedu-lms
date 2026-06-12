import React, { useState } from 'react';
import { FileText, Download, Search, File, Image, Video, BookOpen } from 'lucide-react';

const allResources = [
  { id: 1, name: 'SAT Math Formula Sheet', type: 'PDF', size: '2.4 MB', course: 'SAT Math Mastery', date: 'May 10, 2026' },
  { id: 2, name: 'IELTS Writing Samples', type: 'PDF', size: '1.8 MB', course: 'IELTS Speaking Success', date: 'May 12, 2026' },
  { id: 3, name: 'Essay Writing Guide', type: 'PDF', size: '3.1 MB', course: 'Essay Writing Excellence', date: 'May 18, 2026' },
  { id: 4, name: 'GRE Quant Formula Sheet', type: 'PDF', size: '1.2 MB', course: 'GRE Quantitative Reasoning', date: 'May 15, 2026' },
  { id: 5, name: 'TOEFL Vocabulary List', type: 'PDF', size: '0.9 MB', course: 'TOEFL iBT Complete Guide', date: 'May 14, 2026' },
  { id: 6, name: 'SAT Practice Test #1', type: 'PDF', size: '4.5 MB', course: 'SAT Math Mastery', date: 'May 22, 2026' },
  { id: 7, name: 'Linear Equations Cheat Sheet', type: 'Image', size: '0.5 MB', course: 'SAT Math Mastery', date: 'May 20, 2026' },
  { id: 8, name: 'IELTS Speaking Part 2 Tips', type: 'Video', size: '28 MB', course: 'IELTS Speaking Success', date: 'May 25, 2026' },
];

const typeIcons = {
  PDF: FileText,
  Image: Image,
  Video: Video,
};

const typeColors = {
  PDF: { bg: 'rgba(239, 68, 68, 0.08)', color: '#ef4444' },
  Image: { bg: 'rgba(59, 130, 246, 0.08)', color: '#3b82f6' },
  Video: { bg: 'rgba(168, 85, 247, 0.08)', color: '#a855f7' },
};

export default function Resources() {
  const [searchFilter, setSearchFilter] = useState('');
  const [activeType, setActiveType] = useState('All');

  const types = ['All', 'PDF', 'Image', 'Video'];

  const filtered = allResources.filter(r => {
    const matchesType = activeType === 'All' || r.type === activeType;
    const matchesSearch = r.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
                          r.course.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>My Resources</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Download study materials, notes, and practice tests</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 34px', fontSize: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
            />
          </div>
        </div>
      </div>

      {/* Type Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setActiveType(t)}
            className="click-press"
            style={{
              padding: '6px 16px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
              backgroundColor: activeType === t ? 'var(--primary-color)' : 'var(--bg-card)',
              color: activeType === t ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Resources List */}
      {filtered.length === 0 ? (
        <div className="smart-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <File size={40} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
          <h3>No Resources Found</h3>
          <p style={{ fontSize: '13px' }}>Try adjusting your search or filter.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((res) => {
            const IconComp = typeIcons[res.type] || FileText;
            const colors = typeColors[res.type] || typeColors.PDF;
            return (
              <div key={res.id} className="smart-card" style={{
                padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px', backgroundColor: colors.bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <IconComp size={20} style={{ color: colors.color }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                    <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{res.name}</h4>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{res.course}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{res.size}</span>
                      <span style={{
                        fontSize: '10px', fontWeight: 600, padding: '2px 8px', borderRadius: '4px',
                        backgroundColor: colors.bg, color: colors.color
                      }}>{res.type}</span>
                    </div>
                  </div>
                </div>
                <button
                  className="click-press"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                    borderRadius: '8px', backgroundColor: 'rgba(58, 32, 72, 0.06)', color: 'var(--primary-color)',
                    fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', flexShrink: 0
                  }}
                >
                  <Download size={14} /> Download
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
