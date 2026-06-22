import React, { useState, useEffect } from 'react';
import { 
  Folder, Tag, Layers, Plus, Trash2, Edit3, Check, Search, 
  AlertCircle, X, ChevronRight, Settings, Info, Briefcase, 
  Globe, GraduationCap, Award, BookOpen
} from 'lucide-react';

export default function CategoryTagManager({ courses = [], setDb, activeTab = 'categories', setActiveTab }) {
  // Local storage keys for categories, tags, levels
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
      { id: 'lvl-2', name: 'Intermediate', description: 'Requires basic knowledge of the topic. Focuses on practical usage and problem-solving.', prerequisites: 'Basic concepts / Beginner tier completion', recommendedHours: '20-40 hrs' },
      { id: 'lvl-3', name: 'Advanced', description: 'Deep dive into complex, professional-level challenges and edge cases.', prerequisites: 'Intermediate proficiency / 1+ years experience', recommendedHours: '40-60 hrs' },
      { id: 'lvl-4', name: 'All Levels', description: 'Broad curriculum structured to benefit absolute beginners up to experts.', prerequisites: 'None', recommendedHours: '20-50 hrs' }
    ];
  });

  // Save state updates
  useEffect(() => {
    localStorage.setItem('suriatech_admin_categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('suriatech_admin_tags', JSON.stringify(tags));
  }, [tags]);

  useEffect(() => {
    localStorage.setItem('suriatech_admin_levels', JSON.stringify(levels));
  }, [levels]);

  // Form states for Category
  const [editingCategory, setEditingCategory] = useState(null);
  const [catName, setCatName] = useState('');
  const [catDesc, setCatDesc] = useState('');
  const [catColor, setCatColor] = useState('#3b82f6');
  const [catIcon, setCatIcon] = useState('Folder');
  const [catSubs, setCatSubs] = useState('');

  // Form states for Tag
  const [editingTag, setEditingTag] = useState(null);
  const [tagName, setTagName] = useState('');
  const [tagColor, setTagColor] = useState('#3b82f6');
  const [tagSearch, setTagSearch] = useState('');

  // Form states for Level
  const [editingLevel, setEditingLevel] = useState(null);
  const [lvlName, setLvlName] = useState('');
  const [lvlDesc, setLvlDesc] = useState('');
  const [lvlPrereqs, setLvlPrereqs] = useState('');
  const [lvlHours, setLvlHours] = useState('');

  // Course counts calculators
  const getCategoryCourseCount = (catName) => {
    return courses.filter(c => c.category && c.category.toLowerCase() === catName.toLowerCase()).length;
  };

  const getLevelCourseCount = (lvlName) => {
    return courses.filter(c => c.level && c.level.toLowerCase() === lvlName.toLowerCase()).length;
  };

  const getTagCourseCount = (tagItemName) => {
    // Search tags array or title substring
    return courses.filter(c => 
      (c.tags && c.tags.some(t => t.toLowerCase() === tagItemName.toLowerCase())) || 
      (c.title && c.title.toLowerCase().includes(tagItemName.toLowerCase()))
    ).length;
  };

  // Category Actions
  const handleSaveCategory = (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const subList = catSubs.split(',').map(s => s.trim()).filter(s => s.length > 0);

    if (editingCategory) {
      setCategories(prev => prev.map(c => c.id === editingCategory.id ? { 
        ...c, 
        name: catName.trim(), 
        description: catDesc.trim(), 
        color: catColor, 
        icon: catIcon, 
        subcategories: subList 
      } : c));
      setEditingCategory(null);
    } else {
      const newCat = {
        id: `cat-${Date.now()}`,
        name: catName.trim(),
        description: catDesc.trim(),
        color: catColor,
        icon: catIcon,
        subcategories: subList
      };
      setCategories(prev => [...prev, newCat]);
    }

    // Reset Form
    setCatName('');
    setCatDesc('');
    setCatColor('#3b82f6');
    setCatIcon('Folder');
    setCatSubs('');
  };

  const startEditCategory = (cat) => {
    setEditingCategory(cat);
    setCatName(cat.name);
    setCatDesc(cat.description || '');
    setCatColor(cat.color || '#3b82f6');
    setCatIcon(cat.icon || 'Folder');
    setCatSubs(cat.subcategories ? cat.subcategories.join(', ') : '');
  };

  const handleDeleteCategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories(prev => prev.filter(c => c.id !== id));
      if (editingCategory?.id === id) {
        setEditingCategory(null);
        setCatName('');
        setCatDesc('');
        setCatSubs('');
      }
    }
  };

  // Tag Actions
  const handleSaveTag = (e) => {
    e.preventDefault();
    if (!tagName.trim()) return;

    if (editingTag) {
      setTags(prev => prev.map(t => t.id === editingTag.id ? { ...t, name: tagName.trim(), color: tagColor } : t));
      setEditingTag(null);
    } else {
      const newTagItem = {
        id: `tag-${Date.now()}`,
        name: tagName.trim(),
        color: tagColor
      };
      setTags(prev => [...prev, newTagItem]);
    }

    setTagName('');
    setTagColor('#3b82f6');
  };

  const startEditTag = (tag) => {
    setEditingTag(tag);
    setTagName(tag.name);
    setTagColor(tag.color || '#3b82f6');
  };

  const handleDeleteTag = (id) => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      setTags(prev => prev.filter(t => t.id !== id));
      if (editingTag?.id === id) {
        setEditingTag(null);
        setTagName('');
      }
    }
  };

  // Level Actions
  const handleSaveLevel = (e) => {
    e.preventDefault();
    if (!lvlName.trim()) return;

    if (editingLevel) {
      setLevels(prev => prev.map(l => l.id === editingLevel.id ? {
        ...l,
        name: lvlName.trim(),
        description: lvlDesc.trim(),
        prerequisites: lvlPrereqs.trim(),
        recommendedHours: lvlHours.trim()
      } : l));
      setEditingLevel(null);
    } else {
      const newLvl = {
        id: `lvl-${Date.now()}`,
        name: lvlName.trim(),
        description: lvlDesc.trim(),
        prerequisites: lvlPrereqs.trim(),
        recommendedHours: lvlHours.trim()
      };
      setLevels(prev => [...prev, newLvl]);
    }

    setLvlName('');
    setLvlDesc('');
    setLvlPrereqs('');
    setLvlHours('');
  };

  const startEditLevel = (lvl) => {
    setEditingLevel(lvl);
    setLvlName(lvl.name);
    setLvlDesc(lvl.description || '');
    setLvlPrereqs(lvl.prerequisites || '');
    setLvlHours(lvl.recommendedHours || '');
  };

  const handleDeleteLevel = (id) => {
    if (window.confirm("Are you sure you want to delete this difficulty tier?")) {
      setLevels(prev => prev.filter(l => l.id !== id));
      if (editingLevel?.id === id) {
        setEditingLevel(null);
        setLvlName('');
        setLvlDesc('');
        setLvlPrereqs('');
        setLvlHours('');
      }
    }
  };

  // Render Icon Helper
  const renderCategoryIcon = (iconName, color = 'var(--text-muted)') => {
    const props = { size: 18, style: { color } };
    switch (iconName) {
      case 'BookOpen': return <BookOpen {...props} />;
      case 'Globe': return <Globe {...props} />;
      case 'Briefcase': return <Briefcase {...props} />;
      case 'GraduationCap': return <GraduationCap {...props} />;
      case 'Award': return <Award {...props} />;
      default: return <Folder {...props} />;
    }
  };

  const filteredTags = tags.filter(t => t.name.toLowerCase().includes(tagSearch.toLowerCase()));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }} className="animate-fade-in">
      
      {/* 1. Header Area */}
      <div>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 600, display: 'block', marginBottom: '4px' }}>
          Courses Portal &nbsp;&gt;&nbsp; Classifications Manager
        </span>
        <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Course Taxonomy Settings
        </h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
          Organize categories, search tags, and adjust difficulty tiers across the platform.
        </p>
      </div>

      {/* 2. Page Sub-Tabs (In case user wants to toggle inside the view) */}
      <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)', gap: '24px', paddingBottom: '2px' }}>
        {[
          { id: 'categories', name: 'Categories & Subcategories', count: categories.length },
          { id: 'tags', name: 'Search Tags', count: tags.length },
          { id: 'levels', name: 'Difficulty Levels', count: levels.length }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: isActive ? '3px solid var(--secondary-color)' : '3px solid transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 800 : 600,
                fontSize: '13px',
                padding: '8px 4px 12px 4px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.name}
              <span style={{
                fontSize: '10px',
                background: isActive ? 'rgba(202, 186, 97, 0.15)' : 'var(--border-color)',
                color: isActive ? 'var(--secondary-color)' : 'var(--text-secondary)',
                padding: '2px 8px',
                borderRadius: '10px',
                fontWeight: 700
              }}>{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Render Category View */}
      {activeTab === 'categories' && (
        <div className="category-manager-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {/* Add / Edit Category Form */}
          <div className="smart-card" style={{ height: 'fit-content', padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Folder size={16} style={{ color: 'var(--secondary-color)' }} />
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h3>
            
            <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Category Name *</label>
                <input 
                  type="text" 
                  value={catName} 
                  onChange={e => setCatName(e.target.value)} 
                  placeholder="e.g. Technology & Code"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Display Color</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="color" 
                      value={catColor} 
                      onChange={e => setCatColor(e.target.value)} 
                      style={{ padding: '0px', width: '36px', height: '36px', border: '1px solid var(--border-color)', cursor: 'pointer', borderRadius: '6px' }}
                    />
                    <code style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{catColor}</code>
                  </div>
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Category Icon</label>
                  <select 
                    value={catIcon} 
                    onChange={e => setCatIcon(e.target.value)}
                    style={{ fontSize: '12px' }}
                  >
                    <option value="Folder">📁 Default Folder</option>
                    <option value="BookOpen">📖 Education Book</option>
                    <option value="Globe">🌐 World Globe</option>
                    <option value="Briefcase">💼 Business Bag</option>
                    <option value="GraduationCap">🎓 Cap</option>
                    <option value="Award">🏆 Award Badge</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Subcategories (Comma separated)</label>
                <input 
                  type="text" 
                  value={catSubs} 
                  onChange={e => setCatSubs(e.target.value)} 
                  placeholder="e.g. Python, JS, Data Structures"
                />
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>Enter multiple values separated by commas.</span>
              </div>

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Short Description</label>
                <textarea 
                  value={catDesc} 
                  onChange={e => setCatDesc(e.target.value)} 
                  placeholder="Describe what kind of courses are categorised here..."
                  rows={3}
                  style={{ fontSize: '12px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '4px' }}>
                <button type="submit" className="btn-primary click-press" style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Check size={14} /> {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
                {editingCategory && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingCategory(null);
                      setCatName('');
                      setCatDesc('');
                      setCatColor('#3b82f6');
                      setCatIcon('Folder');
                      setCatSubs('');
                    }}
                    style={{ padding: '10px 14px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-secondary)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Categories Grid List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {categories.map((cat) => {
                const count = getCategoryCourseCount(cat.name);
                return (
                  <div key={cat.id} className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderLeft: `5px solid ${cat.color || 'var(--secondary-color)'}`, transition: 'all 0.2s ease', position: 'relative' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ width: '38px', height: '38px', borderRadius: '8px', background: `${cat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          {renderCategoryIcon(cat.icon, cat.color)}
                        </div>
                        <div>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{cat.name}</strong>
                          <span style={{ display: 'block', fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>{count} {count === 1 ? 'Course' : 'Courses'}</span>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '4px' }}>
                        <button 
                          onClick={() => startEditCategory(cat)} 
                          style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}
                          title="Edit"
                        >
                          <Edit3 size={13} />
                        </button>
                        <button 
                          onClick={() => handleDeleteCategory(cat.id)} 
                          style={{ border: 'none', background: 'none', color: 'var(--status-danger)', cursor: 'pointer', padding: '4px' }}
                          title="Delete"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                      {cat.description || 'No description provided.'}
                    </p>

                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', borderTop: '1px solid var(--border-color)', paddingTop: '10px', marginTop: '4px' }}>
                        {cat.subcategories.map((sub, i) => (
                          <span key={i} style={{ fontSize: '9.5px', background: 'var(--bg-app)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '12px', border: '1px solid var(--border-color)', fontWeight: 600 }}>
                            {sub}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 4. Render Tags View */}
      {activeTab === 'tags' && (
        <div className="category-manager-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {/* Add / Edit Tag Form */}
          <div className="smart-card" style={{ height: 'fit-content', padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Tag size={16} style={{ color: 'var(--secondary-color)' }} />
              {editingTag ? 'Edit Search Tag' : 'Create New Tag'}
            </h3>

            <form onSubmit={handleSaveTag} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Tag Label *</label>
                <input 
                  type="text" 
                  value={tagName} 
                  onChange={e => setTagName(e.target.value)} 
                  placeholder="e.g. IELTS Reading"
                  required
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Tag Pill Color</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {['#a855f7', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#06b6d4', '#6366f1', '#14b8a6', '#64748b'].map((col) => {
                    const isSelected = tagColor === col;
                    return (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setTagColor(col)}
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          backgroundColor: col,
                          border: isSelected ? '2px solid var(--text-primary)' : '1px solid transparent',
                          transform: isSelected ? 'scale(1.15)' : 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease'
                        }}
                        title={col}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="form-group" style={{ marginTop: '4px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>Pill Preview:</span>
                <span style={{ display: 'inline-block', fontSize: '11.5px', background: `${tagColor}15`, color: tagColor, padding: '4px 12px', borderRadius: '20px', border: `1px solid ${tagColor}30`, fontWeight: 700 }}>
                  #{tagName || 'TagLabel'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button type="submit" className="btn-primary click-press" style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <Check size={14} /> {editingTag ? 'Update Tag' : 'Add Tag'}
                </button>
                {editingTag && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingTag(null);
                      setTagName('');
                      setTagColor('#3b82f6');
                    }}
                    style={{ padding: '10px 14px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-secondary)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Tags Dashboard & Table */}
          <div className="smart-card" style={{ padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>Active Platforms Tags</h4>
              
              {/* Search Bar */}
              <div style={{ position: 'relative', width: '220px' }}>
                <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Search size={13} /></span>
                <input 
                  type="text" 
                  value={tagSearch} 
                  onChange={e => setTagSearch(e.target.value)} 
                  placeholder="Filter tags..."
                  style={{ fontSize: '11.5px', padding: '6px 10px 6px 28px', borderRadius: '6px', border: '1px solid var(--border-color)', width: '100%', height: '32px' }}
                />
              </div>
            </div>

            <div className="smart-table-wrapper" style={{ marginTop: '8px' }}>
              <table className="smart-table">
                <thead>
                  <tr>
                    <th>Tag Badge</th>
                    <th>Course Connections</th>
                    <th>Color Hex</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTags.map(t => {
                    const count = getTagCourseCount(t.name);
                    return (
                      <tr key={t.id}>
                        <td>
                          <span style={{ fontSize: '11px', background: `${t.color}12`, color: t.color, padding: '4px 10px', borderRadius: '12px', fontWeight: 700, border: `1px solid ${t.color}25` }}>
                            {t.name}
                          </span>
                        </td>
                        <td style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '12px' }}>
                          {count} {count === 1 ? 'course linked' : 'courses linked'}
                        </td>
                        <td>
                          <code style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>{t.color}</code>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button 
                              onClick={() => startEditTag(t)}
                              style={{ border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                            >
                              <Edit3 size={13} />
                            </button>
                            <button 
                              onClick={() => handleDeleteTag(t.id)}
                              style={{ border: 'none', background: 'none', color: 'var(--status-danger)', cursor: 'pointer' }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTags.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: '36px', color: 'var(--text-muted)' }}>
                        <AlertCircle size={20} style={{ margin: '0 auto 8px auto', display: 'block' }} />
                        No tags found matching "{tagSearch}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 5. Render Levels View */}
      {activeTab === 'levels' && (
        <div className="category-manager-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
          {/* Edit settings card (shows when edit is selected, or empty placeholder) */}
          <div className="smart-card" style={{ height: 'fit-content', padding: '24px', background: 'var(--bg-card)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={16} style={{ color: 'var(--secondary-color)' }} />
              {editingLevel ? `Edit Level: ${editingLevel.name}` : 'Configure Difficulty Settings'}
            </h3>

            {editingLevel ? (
              <form onSubmit={handleSaveLevel} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Level Title *</label>
                  <input 
                    type="text" 
                    value={lvlName} 
                    onChange={e => setLvlName(e.target.value)} 
                    placeholder="Beginner, Advanced etc."
                    required
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Recommended Study Duration</label>
                  <input 
                    type="text" 
                    value={lvlHours} 
                    onChange={e => setLvlHours(e.target.value)} 
                    placeholder="e.g. 20-40 hrs"
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Prerequisites / Skill Baseline</label>
                  <input 
                    type="text" 
                    value={lvlPrereqs} 
                    onChange={e => setLvlPrereqs(e.target.value)} 
                    placeholder="e.g. Basic knowledge of Algebra"
                  />
                </div>

                <div className="form-group">
                  <label style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '4px', display: 'block' }}>Level Description *</label>
                  <textarea 
                    value={lvlDesc} 
                    onChange={e => setLvlDesc(e.target.value)} 
                    placeholder="What goals does this tier fulfill? How does it differ from others?"
                    rows={4}
                    style={{ fontSize: '12px' }}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
                  <button type="submit" className="btn-primary click-press" style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Check size={14} /> Update Level Settings
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setEditingLevel(null);
                      setLvlName('');
                      setLvlDesc('');
                      setLvlPrereqs('');
                      setLvlHours('');
                    }}
                    style={{ padding: '10px 14px', border: '1px solid var(--border-color)', background: 'var(--bg-app)', color: 'var(--text-secondary)', borderRadius: '8px', fontSize: '12px', cursor: 'pointer', fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px 10px', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
                <Info size={28} style={{ color: 'var(--primary-color)', opacity: 0.7 }} />
                <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-primary)' }}>Select a level card to edit settings</span>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                  Adjust descriptions, recommended hours, and prerequisite requirements. These specifications directly control options in Course Builder profiles.
                </p>
              </div>
            )}
          </div>

          {/* Difficulty Tier list display */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {levels.map((lvl) => {
              const count = getLevelCourseCount(lvl.name);
              return (
                <div key={lvl.id} className="smart-card" style={{ padding: '20px', background: 'var(--bg-card)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(202, 186, 97, 0.12)', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Layers size={14} />
                      </div>
                      <h4 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>{lvl.name}</h4>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <span style={{ fontSize: '11px', background: 'var(--bg-app)', color: 'var(--text-secondary)', padding: '2px 10px', borderRadius: '12px', border: '1px solid var(--border-color)', fontWeight: 650 }}>
                        {count} Courses Active
                      </span>
                      <button 
                        onClick={() => startEditLevel(lvl)}
                        className="click-press"
                        style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11.5px', background: 'none', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '4px 10px', color: 'var(--primary-color)', fontWeight: 700, cursor: 'pointer' }}
                      >
                        <Edit3 size={11} /> Edit Config
                      </button>
                    </div>
                  </div>

                  <p style={{ fontSize: '11.5px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {lvl.description}
                  </p>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--bg-app)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '11.5px' }}>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Prerequisites</span>
                      <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{lvl.prerequisites || 'None'}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Avg. Study Duration</span>
                      <strong style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{lvl.recommendedHours || 'Not specified'}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
