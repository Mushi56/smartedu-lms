import React, { useState, useEffect } from 'react';
import { 
  Folder, Tag, Layers, Plus, Trash2, Edit3, Check, Search, 
  AlertCircle, X, ChevronDown, ChevronUp, Info, Briefcase, 
  Globe, GraduationCap, Award, BookOpen, ArrowLeft
} from 'lucide-react';

const cardStyle = {
  background: '#fff', borderRadius: '16px',
  border: '1px solid #ede9f4', padding: '16px',
  display: 'flex', flexDirection: 'column', gap: '12px'
};

const inputStyle = {
  width: '100%', padding: '10px 12px', fontSize: '13px',
  border: '1px solid #ede9f4', borderRadius: '10px',
  background: '#faf9fc', color: 'var(--text-primary)',
  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box'
};

const labelStyle = {
  fontSize: '10px', fontWeight: 700,
  color: 'var(--text-secondary)', display: 'block', marginBottom: '5px'
};

export default function CategoryTagManager({ defaultSection = 'categories' }) {
  const [activeSection, setActiveSection] = useState(defaultSection);

  // ── Data State ─────────────────────────────────────────────────
  const [categories, setCategories] = useState(() => {
    const saved = localStorage.getItem('suriatech_admin_categories');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'cat-1', name: 'Scholarship Exams', description: 'Preps for international and regional university scholarship exams', subcategories: ['SAT', 'GRE', 'GMAT'], color: '#a855f7', icon: 'Award' },
      { id: 'cat-2', name: 'Academic', description: 'Core academic subjects for school and university levels', subcategories: ['Calculus', 'Algebra', 'Physics', 'Chemistry'], color: '#3b82f6', icon: 'BookOpen' },
      { id: 'cat-3', name: 'Language', description: 'Language learning and proficiency certification preps', subcategories: ['IELTS', 'TOEFL', 'English', 'Arabic'], color: '#10b981', icon: 'Globe' },
      { id: 'cat-4', name: 'STEM', description: 'Science, Technology, Engineering, and Mathematics courses', subcategories: ['Python', 'Data Science', 'Calculus'], color: '#f59e0b', icon: 'Briefcase' },
      { id: 'cat-5', name: 'Arts', description: 'Creative writing, fine arts, and digital design classes', subcategories: ['UI/UX Design', 'Digital Painting'], color: '#ec4899', icon: 'Award' },
      { id: 'cat-6', name: 'Business', description: 'Entrepreneurship, finance, and management guidance', subcategories: ['Marketing', 'Finance Basics'], color: '#06b6d4', icon: 'Briefcase' }
    ];
  });

  const [tags, setTags] = useState(() => {
    const saved = localStorage.getItem('suriatech_admin_tags');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'tag-1', name: 'SAT Math', color: '#a855f7' },
      { id: 'tag-2', name: 'IELTS Prep', color: '#10b981' },
      { id: 'tag-3', name: 'Calculus', color: '#3b82f6' },
      { id: 'tag-4', name: 'Python', color: '#f59e0b' },
      { id: 'tag-5', name: 'Study Aids', color: '#6366f1' },
      { id: 'tag-6', name: 'Beginner Friendly', color: '#14b8a6' }
    ];
  });

  const [levels, setLevels] = useState(() => {
    const saved = localStorage.getItem('suriatech_admin_levels');
    if (saved) return JSON.parse(saved);
    return [
      { id: 'lvl-1', name: 'Beginner', description: 'No prior experience required. Introduces fundamental concepts step-by-step.', prerequisites: 'None', recommendedHours: '10-20 hrs' },
      { id: 'lvl-2', name: 'Intermediate', description: 'Requires basic knowledge. Focuses on practical usage and problem-solving.', prerequisites: 'Basic concepts / Beginner tier', recommendedHours: '20-40 hrs' },
      { id: 'lvl-3', name: 'Advanced', description: 'Deep dive into complex, professional-level challenges and edge cases.', prerequisites: 'Intermediate proficiency', recommendedHours: '40-60 hrs' },
      { id: 'lvl-4', name: 'All Levels', description: 'Broad curriculum structured to benefit absolute beginners up to experts.', prerequisites: 'None', recommendedHours: '20-50 hrs' }
    ];
  });

  // Persist
  useEffect(() => { localStorage.setItem('suriatech_admin_categories', JSON.stringify(categories)); }, [categories]);
  useEffect(() => { localStorage.setItem('suriatech_admin_tags', JSON.stringify(tags)); }, [tags]);
  useEffect(() => { localStorage.setItem('suriatech_admin_levels', JSON.stringify(levels)); }, [levels]);

  // ── Category State ─────────────────────────────────────────────
  const [editingCategory, setEditingCategory] = useState(null);
  const [showCatForm, setShowCatForm] = useState(false);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catColor, setCatColor] = useState('#3b82f6');
  const [catIcon, setCatIcon] = useState('Folder');
  const [catSubs, setCatSubs] = useState('');

  // ── Tag State ─────────────────────────────────────────────────
  const [editingTag, setEditingTag] = useState(null);
  const [showTagForm, setShowTagForm] = useState(false);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#3b82f6');

  // ── Level State ───────────────────────────────────────────────
  const [editingLevel, setEditingLevel] = useState(null);
  const [showLvlForm, setShowLvlForm] = useState(false);
  const [lvlName, setLvlName] = useState('');
  const [lvlDesc, setLvlDesc] = useState('');
  const [lvlPrereqs, setLvlPrereqs] = useState('');
  const [lvlHours, setLvlHours] = useState('');

  // ── Helpers ────────────────────────────────────────────────────
  const renderCategoryIcon = (iconName, color = 'var(--text-muted)') => {
    const props = { size: 16, style: { color } };
    switch (iconName) {
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <Folder {...props} />;
    }
  };

  // ── Category Actions ──────────────────────────────────────────
  const resetCatForm = () => { setCatName(''); setCatDesc(''); setCatColor('#3b82f6'); setCatIcon('Folder'); setCatSubs(''); setEditingCategory(null); setShowCatForm(false); };

  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catName.trim()) return;
    const subList = catSubs.split(',').map(s => s.trim()).filter(Boolean);
    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { ...c, name: catName.trim(), description: catDesc.trim(), color: catColor, icon: catIcon, subcategories: subList } : c));
    } else {
      setCategories(prev => [...prev, { id: `cat-${Date.now()}`, name: catName.trim(), description: catDesc.trim(), color: catColor, icon: catIcon, subcategories: subList }]);
    }
    resetCatForm();
  };

  const startEditCategory = (cat) => {
    setEditingCategory(cat); setCatName(cat.name); setCatDesc(cat.description || ''); setCatColor(cat.color || '#3b82f6'); setCatIcon(cat.icon || 'Folder'); setCatSubs(cat.subcategories ? cat.subcategories.join(', ') : '');
    setShowCatForm(true);
  };

  const handleDeleteCategory = (id) => { setCategories(prev => prev.filter(c => c.id !== id)); if (editingCategory?.id === id) resetCatForm(); };

  // ── Tag Actions ───────────────────────────────────────────────
  const resetTagForm = () => { setTagName(''); setTagColor('#3b82f6'); setEditingTag(null); setShowTagForm(false); };

  const handleSaveTag = (e) => {
    e.preventDefault();
    if (!tagName.trim()) return;
    if (editingTag) {
      setTags(prev => prev.map(t => t.id === editingTag.id ? { ...t, name: tagName.trim(), color: tagColor } : t));
    } else {
      setTags(prev => [...prev, { id: `tag-${Date.now()}`, name: tagName.trim(), color: tagColor }]);
    }
    resetTagForm();
  };

  const startEditTag = (tag) => { setEditingTag(tag); setTagName(tag.name); setTagColor(tag.color || '#3b82f6'); setShowTagForm(true); };
  const handleDeleteTag = (id) => { setTags(prev => prev.filter(t => t.id !== id)); if (editingTag?.id === id) resetTagForm(); };

  // ── Level Actions ─────────────────────────────────────────────
  const resetLvlForm = () => { setLvlName(''); setLvlDesc(''); setLvlPrereqs(''); setLvlHours(''); setEditingLevel(null); setShowLvlForm(false); };

  const handleSaveLevel = (e) => {
    e.preventDefault();
    if (!lvlName.trim()) return;
    if (editingLevel) {
      setLevels(prev => prev.map(l => l.id === editingLevel.id ? { ...l, name: lvlName.trim(), description: lvlDesc.trim(), prerequisites: lvlPrereqs.trim(), recommendedHours: lvlHours.trim() } : l));
    } else {
      setLevels(prev => [...prev, { id: `lvl-${Date.now()}`, name: lvlName.trim(), description: lvlDesc.trim(), prerequisites: lvlPrereqs.trim(), recommendedHours: lvlHours.trim() }]);
    }
    resetLvlForm();
  };

  const startEditLevel = (lvl) => { setEditingLevel(lvl); setLvlName(lvl.name); setLvlDesc(lvl.description || ''); setLvlPrereqs(lvl.prerequisites || ''); setLvlHours(lvl.recommendedHours || ''); setShowLvlForm(true); };
  const handleDeleteLevel = (id) => { setLevels(prev => prev.filter(l => l.id !== id)); if (editingLevel?.id === id) resetLvlForm(); };

  // ── RENDER ─────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }} className="animate-fade-in">

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Categories & Tags</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Manage course classifications, search tags, and difficulty levels</p>
      </div>

      {/* Section Tabs */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '2px' }} className="hide-scrollbar">
        {[
          { id: 'categories', label: 'Categories', count: categories.length },
          { id: 'tags', label: 'Tags', count: tags.length },
          { id: 'levels', label: 'Levels', count: levels.length }
        ].map(tab => {
          const isActive = activeSection === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveSection(tab.id)}
              className="click-press"
              style={{
                flexShrink: 0, padding: '7px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                border: isActive ? 'none' : '1px solid #ede9f4',
                background: isActive ? 'var(--primary-color)' : '#fff',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', gap: '6px'
              }}>
              {tab.label}
              <span style={{
                fontSize: '9px', padding: '1px 6px', borderRadius: '10px', fontWeight: 800,
                background: isActive ? 'rgba(255,255,255,0.2)' : '#f5f3f9',
                color: isActive ? '#fff' : 'var(--text-muted)'
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ════════ CATEGORIES SECTION ════════ */}
      {activeSection === 'categories' && (
        <>
          {/* Add button */}
          {!showCatForm && (
            <button onClick={() => { resetCatForm(); setShowCatForm(true); }}
              className="click-press"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
              <Plus size={14} /> Add New Category
            </button>
          )}

          {/* Category Form */}
          {showCatForm && (
            <div style={cardStyle} className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Folder size={14} style={{ color: 'var(--primary-color)' }} />
                  {editingCategory ? 'Edit Category' : 'New Category'}
                </h4>
                <button onClick={resetCatForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Category Name *</label>
                  <input type="text" value={catName} onChange={e => setCatName(e.target.value)} style={inputStyle} placeholder="e.g. Technology & Code" required />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={labelStyle}>Color</label>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <input type="color" value={catColor} onChange={e => setCatColor(e.target.value)}
                        style={{ padding: 0, width: '32px', height: '32px', border: '1px solid #ede9f4', cursor: 'pointer', borderRadius: '6px' }} />
                      <code style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{catColor}</code>
                    </div>
                  </div>
                  <div>
                    <label style={labelStyle}>Icon</label>
                    <select value={catIcon} onChange={e => setCatIcon(e.target.value)} style={{ ...inputStyle, fontSize: '11px' }}>
                      <option value="Folder">📁 Folder</option>
                      <option value="BookOpen">📖 Book</option>
                      <option value="Globe">🌐 Globe</option>
                      <option value="Briefcase">💼 Business</option>
                      <option value="GraduationCap">🎓 Cap</option>
                      <option value="Award">🏆 Award</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Subcategories (comma separated)</label>
                  <input type="text" value={catSubs} onChange={e => setCatSubs(e.target.value)} style={inputStyle} placeholder="e.g. Python, JS, Data Structures" />
                </div>

                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea value={catDesc} onChange={e => setCatDesc(e.target.value)} rows={2}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} placeholder="Short description..." />
                </div>

                <button type="submit" className="click-press"
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Check size={14} /> {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </form>
            </div>
          )}

          {/* Category Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {categories.map(cat => (
              <div key={cat.id} style={{ ...cardStyle, borderLeft: `4px solid ${cat.color || '#7c3aed'}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${cat.color}12`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {renderCategoryIcon(cat.icon, cat.color)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{cat.name}</h3>
                    <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {cat.description || 'No description'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    <button onClick={() => startEditCategory(cat)} style={{ padding: '6px 8px', borderRadius: '8px', background: 'var(--primary-glow)', color: 'var(--primary-color)', border: 'none', cursor: 'pointer' }} className="click-press">
                      <Edit3 size={12} />
                    </button>
                    <button onClick={() => handleDeleteCategory(cat.id)} style={{ padding: '6px 8px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', cursor: 'pointer' }} className="click-press">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Subcategories */}
                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', borderTop: '1px solid #f5f3f9', paddingTop: '8px' }}>
                    {cat.subcategories.map((sub, i) => (
                      <span key={i} style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '20px', background: '#f5f3f9', color: 'var(--text-secondary)' }}>
                        {sub}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* ════════ TAGS SECTION ════════ */}
      {activeSection === 'tags' && (
        <>
          {/* Add button */}
          {!showTagForm && (
            <button onClick={() => { resetTagForm(); setShowTagForm(true); }}
              className="click-press"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
              <Plus size={14} /> Add New Tag
            </button>
          )}

          {/* Tag Form */}
          {showTagForm && (
            <div style={cardStyle} className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tag size={14} style={{ color: 'var(--primary-color)' }} />
                  {editingTag ? 'Edit Tag' : 'New Tag'}
                </h4>
                <button onClick={resetTagForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveTag} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label style={labelStyle}>Tag Label *</label>
                  <input type="text" value={tagName} onChange={e => setTagName(e.target.value)} style={inputStyle} placeholder="e.g. IELTS Reading" required />
                </div>

                <div>
                  <label style={labelStyle}>Tag Color</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#6366f1', '#14b8a6', '#64748b'].map(col => (
                      <button key={col} type="button" onClick={() => setTagColor(col)}
                        style={{
                          width: '26px', height: '26px', borderRadius: '50%', backgroundColor: col,
                          border: tagColor === col ? '2.5px solid var(--text-primary)' : '2px solid transparent',
                          transform: tagColor === col ? 'scale(1.15)' : 'none',
                          cursor: 'pointer', transition: 'all 0.15s'
                        }} />
                    ))}
                  </div>
                </div>

                {/* Preview */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Preview:</span>
                  <span style={{ fontSize: '11px', background: `${tagColor}15`, color: tagColor, padding: '4px 12px', borderRadius: '20px', border: `1px solid ${tagColor}30`, fontWeight: 700 }}>
                    #{tagName || 'TagLabel'}
                  </span>
                </div>

                <button type="submit" className="click-press"
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Check size={14} /> {editingTag ? 'Update Tag' : 'Add Tag'}
                </button>
              </form>
            </div>
          )}

          {/* Tags Grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map(t => (
              <div key={t.id} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#fff', border: '1px solid #ede9f4', borderRadius: '12px',
                padding: '8px 12px', fontSize: '12px'
              }}>
                <span style={{
                  display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%',
                  background: t.color, flexShrink: 0
                }} />
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{t.name}</span>
                <div style={{ display: 'flex', gap: '2px', marginLeft: '4px' }}>
                  <button onClick={() => startEditTag(t)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }} className="click-press">
                    <Edit3 size={11} />
                  </button>
                  <button onClick={() => handleDeleteTag(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', padding: '2px' }} className="click-press">
                    <Trash2 size={11} />
                  </button>
                </div>
              </div>
            ))}
            {tags.length === 0 && (
              <div style={{ ...cardStyle, alignItems: 'center', width: '100%', padding: '30px 20px', textAlign: 'center' }}>
                <Tag size={28} style={{ color: '#ede9f4' }} />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>No tags created yet.</p>
              </div>
            )}
          </div>
        </>
      )}

      {/* ════════ LEVELS SECTION ════════ */}
      {activeSection === 'levels' && (
        <>
          {/* Add button */}
          {!showLvlForm && (
            <button onClick={() => { resetLvlForm(); setShowLvlForm(true); }}
              className="click-press"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
              <Plus size={14} /> Add New Level
            </button>
          )}

          {/* Level Form */}
          {showLvlForm && (
            <div style={cardStyle} className="animate-fade-in">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={14} style={{ color: 'var(--primary-color)' }} />
                  {editingLevel ? 'Edit Level' : 'New Level'}
                </h4>
                <button onClick={resetLvlForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveLevel} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <div>
                    <label style={labelStyle}>Level Name *</label>
                    <input type="text" value={lvlName} onChange={e => setLvlName(e.target.value)} style={inputStyle} placeholder="e.g. Beginner" required />
                  </div>
                  <div>
                    <label style={labelStyle}>Study Duration</label>
                    <input type="text" value={lvlHours} onChange={e => setLvlHours(e.target.value)} style={inputStyle} placeholder="e.g. 20-40 hrs" />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Prerequisites</label>
                  <input type="text" value={lvlPrereqs} onChange={e => setLvlPrereqs(e.target.value)} style={inputStyle} placeholder="e.g. Basic knowledge of Algebra" />
                </div>

                <div>
                  <label style={labelStyle}>Description</label>
                  <textarea value={lvlDesc} onChange={e => setLvlDesc(e.target.value)} rows={2}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} placeholder="What goals does this tier fulfill?" />
                </div>

                <button type="submit" className="click-press"
                  style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Check size={14} /> {editingLevel ? 'Update Level' : 'Add Level'}
                </button>
              </form>
            </div>
          )}

          {/* Level Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {levels.map(lvl => (
              <div key={lvl.id} style={cardStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(202,186,97,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Layers size={14} style={{ color: 'var(--secondary-color)' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{lvl.name}</h3>
                    <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>{lvl.recommendedHours || 'No duration set'}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                    <button onClick={() => startEditLevel(lvl)} style={{ padding: '6px 8px', borderRadius: '8px', background: 'var(--primary-glow)', color: 'var(--primary-color)', border: 'none', cursor: 'pointer' }} className="click-press">
                      <Edit3 size={12} />
                    </button>
                    <button onClick={() => handleDeleteLevel(lvl.id)} style={{ padding: '6px 8px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', cursor: 'pointer' }} className="click-press">
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  {lvl.description || 'No description'}
                </p>

                {lvl.prerequisites && lvl.prerequisites !== 'None' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: 'var(--text-muted)', borderTop: '1px solid #f5f3f9', paddingTop: '8px' }}>
                    <Info size={10} />
                    <span>Requires: <strong style={{ color: 'var(--text-primary)' }}>{lvl.prerequisites}</strong></span>
                  </div>
                )}
              </div>
            ))}
            {levels.length === 0 && (
              <div style={{ ...cardStyle, alignItems: 'center', padding: '30px 20px', textAlign: 'center' }}>
                <Layers size={28} style={{ color: '#ede9f4' }} />
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>No difficulty levels created yet.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
