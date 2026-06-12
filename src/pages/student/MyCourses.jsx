import React, { useState } from 'react';
import { Search, Filter, BookOpen, Clock, BarChart2 } from 'lucide-react';
import CourseCard from '../../components/CourseCard';

export default function MyCourses({ courses, onSelectCourse }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = ['All', 'Test Prep', 'Language', 'Writing'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchFilter.toLowerCase()) || 
                          course.teacher.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700 }}>My Enrolled Courses</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Track and manage your dynamic learning curriculum</p>
        </div>

        {/* Search & Category Filter */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div className="search-bar-wrapper" style={{ width: '220px' }}>
            <Search size={14} className="search-icon" style={{ left: '12px' }} />
            <input 
              type="text" 
              placeholder="Search course..." 
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ padding: '8px 12px 8px 34px', fontSize: '12px' }}
            />
          </div>
        </div>
      </div>

      {/* Category Tabs Row */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap' }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`click-press`}
            style={{
              padding: '6px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 600,
              backgroundColor: activeCategory === cat ? 'var(--primary-color)' : 'var(--bg-card)',
              color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
              border: '1px solid var(--border-color)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Courses */}
      {filteredCourses.length === 0 ? (
        <div className="smart-card" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <BookOpen size={40} style={{ color: 'var(--text-muted)', marginBottom: '12px' }} />
          <h3>No Courses Found</h3>
          <p style={{ fontSize: '13px' }}>Try adjusting your category filter or search query.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {filteredCourses.map((course) => (
            <div key={course.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <CourseCard course={course} onSelectCourse={onSelectCourse} />
              
              {/* Detailed course metadata footer inside My Courses page */}
              <div className="smart-card" style={{ 
                borderTopLeftRadius: 0, 
                borderTopRightRadius: 0, 
                marginTop: '-8px',
                borderTop: 'none',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(99, 102, 241, 0.01)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  <span>Enrolled: {course.enrolledDate}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <BarChart2 size={12} />
                  <span>Level: Intermediate</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
