import React, { useState } from 'react';
import { Heart, Star, Users, BookOpen, Search, Filter, PlayCircle } from 'lucide-react';

export default function Favorites({ courses = [], onSelectCourse }) {
  // Use courses as bookmarked items initially. Filter out any that might be empty.
  const [favoriteList, setFavoriteList] = useState(courses);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Test Prep', 'English', 'Math', 'Writing'];

  const handleRemoveFavorite = (e, id) => {
    e.stopPropagation();
    setFavoriteList(prev => prev.filter(c => c.id !== id));
  };

  const filteredFavorites = favoriteList.filter(c => {
    if (activeCategory === 'All') return true;
    return c.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      
      {/* Title Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ textAlign: 'left', padding: '4px 0' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e0926', margin: '0 0 4px 0' }}>My Favorites</h2>
          <p style={{ fontSize: '12px', color: '#8c7f94', margin: 0, fontWeight: 500 }}>
            Quick access to courses you bookmarked for later.
          </p>
        </div>
      </div>

      {/* Category Pills Filter */}
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
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="click-press"
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              backgroundColor: activeCategory === cat ? '#311442' : '#ffffff',
              color: activeCategory === cat ? '#ffffff' : '#8c7f94',
              border: '1.5px solid',
              borderColor: activeCategory === cat ? '#311442' : '#f0ecf4',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Favorites List */}
      {filteredFavorites.length === 0 ? (
        <div className="custom-home-card" style={{ padding: '50px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '220px' }}>
          <Heart size={36} style={{ color: '#ef4444', opacity: 0.4, marginBottom: '12px' }} />
          <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1e0926', margin: '0 0 4px 0' }}>No Favorites Found</h4>
          <p style={{ fontSize: '11px', color: '#8c7f94', margin: 0, textAlign: 'center' }}>
            Bookmarked courses will show up here. Go to Courses and tap the heart icon on any syllabus.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredFavorites.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectCourse && onSelectCourse(course)}
              className="custom-home-card click-press"
              style={{
                padding: '12px',
                flexDirection: 'row',
                gap: '12px',
                alignItems: 'center',
                border: '1.5px solid #f0ecf4',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {/* Thumbnail */}
              <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', position: 'relative', flexShrink: 0, backgroundColor: '#311442' }}>
                <img 
                  src={course.thumbnail} 
                  alt={course.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.15)' }} />
              </div>

              {/* Course Info */}
              <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '8.5px', color: '#caba61', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  {course.category}
                </span>
                
                <h4 style={{ 
                  fontSize: '12.5px', 
                  fontWeight: 800, 
                  color: '#1e0926', 
                  margin: 0,
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  whiteSpace: 'nowrap'
                }}>
                  {course.title}
                </h4>

                <span style={{ fontSize: '10px', color: '#8c7f94', fontWeight: 600 }}>
                  By {course.teacher || 'Assigned Instructor'}
                </span>

                {/* Rating & Lessons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '9.5px', color: '#caba61', fontWeight: 800 }}>
                    <Star size={10} fill="#caba61" stroke="none" /> 4.8
                  </span>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#a095a8' }} />
                  <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '9.5px', color: '#8c7f94', fontWeight: 600 }}>
                    <BookOpen size={10} /> 12 Modules
                  </span>
                </div>
              </div>

              {/* Heart Toggle Button */}
              <button
                onClick={(e) => handleRemoveFavorite(e, course.id)}
                className="click-press"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)',
                  border: 'none',
                  color: '#ef4444',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  flexShrink: 0
                }}
                title="Remove from bookmarks"
              >
                <Heart size={14} fill="#ef4444" />
              </button>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
