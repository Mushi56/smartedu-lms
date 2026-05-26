import React from 'react';
import { Play } from 'lucide-react';

export default function CourseCard({ course, onSelectCourse }) {
  // Select matching custom illustration vector for each course to match screenshots perfectly
  const renderThumbnail = () => {
    switch (course.id) {
      case 'course-1': // Python
        return (
          <svg width="100%" height="100%" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="160" height="100" fill="url(#python-grad)" />
            <path d="M72 32C62.5 32 58 35.5 58 41.5H66C66 38.5 68.5 37.5 72 37.5C77.5 37.5 78.5 40.5 78.5 42C78.5 43.5 77 45 74.5 45.5C69 46.5 61.5 48.5 61.5 54C61.5 59.5 66.5 62 72 62C78.5 62 82 58.5 82 58.5L80.5 54C80.5 54 77.5 57 72.5 57C68 57 67.5 54.5 67.5 53.5C67.5 52 69.5 50.5 73.5 50C79.5 49 84 46.5 84 41.5C84 35.5 79.5 32 72 32Z" fill="#FFE873" />
            <path d="M88 68C97.5 68 102 64.5 102 58.5H94C94 61.5 91.5 62.5 88 62.5C82.5 62.5 81.5 59.5 81.5 58C81.5 56.5 83 55 85.5 54.5C91 53.5 98.5 51.5 98.5 46C98.5 40.5 93.5 38 88 38C81.5 38 78 41.5 78 41.5L79.5 46C79.5 46 82.5 43 87.5 43C92 43 92.5 45.5 92.5 46.5C92.5 48 90.5 49.5 86.5 50C80.5 51 76 53.5 76 58.5C76 64.5 80.5 68 88 68Z" fill="#306998" />
            <defs>
              <linearGradient id="python-grad" x1="0" y1="0" x2="160" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0B0F19" />
                <stop offset="1" stopColor="#1E293B" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'course-2': // DSA
        return (
          <svg width="100%" height="100%" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="160" height="100" fill="url(#dsa-grad)" />
            {/* Beautiful connected nodes */}
            <circle cx="80" cy="50" r="12" fill="none" stroke="#7c3aed" strokeWidth="2" />
            <rect x="76" y="46" width="8" height="8" rx="1" fill="#7c3aed" />
            
            <circle cx="45" cy="30" r="8" fill="none" stroke="#4f46e5" strokeWidth="2" />
            <circle cx="45" cy="30" r="4" fill="#4f46e5" />
            
            <circle cx="115" cy="30" r="8" fill="none" stroke="#8b5cf6" strokeWidth="2" />
            <circle cx="115" cy="30" r="4" fill="#8b5cf6" />
            
            <circle cx="45" cy="70" r="8" fill="none" stroke="#6366f1" strokeWidth="2" />
            <circle cx="45" cy="70" r="4" fill="#6366f1" />
            
            <circle cx="115" cy="70" r="8" fill="none" stroke="#a78bfa" strokeWidth="2" />
            <circle cx="115" cy="70" r="4" fill="#a78bfa" />
            
            <line x1="53" y1="35" x2="70" y2="45" stroke="#eaedf5" strokeOpacity="0.2" strokeWidth="2" />
            <line x1="107" y1="35" x2="90" y2="45" stroke="#eaedf5" strokeOpacity="0.2" strokeWidth="2" />
            <line x1="53" y1="65" x2="70" y2="55" stroke="#eaedf5" strokeOpacity="0.2" strokeWidth="2" />
            <line x1="107" y1="65" x2="90" y2="55" stroke="#eaedf5" strokeOpacity="0.2" strokeWidth="2" />
            <defs>
              <linearGradient id="dsa-grad" x1="0" y1="0" x2="160" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#05050A" />
                <stop offset="1" stopColor="#0F101A" />
              </linearGradient>
            </defs>
          </svg>
        );
      case 'course-3': // Machine Learning
        return (
          <svg width="100%" height="100%" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="160" height="100" fill="url(#ml-grad)" />
            {/* Glowing Brain */}
            <circle cx="80" cy="50" r="26" fill="url(#brain-glow)" opacity="0.3" />
            <path d="M80 34C74.5 34 70 38.5 70 44C70 45.2 70.2 46.4 70.6 47.5C69.1 48.5 68 50.1 68 52C68 54.8 70.2 57 73 57C73.7 57 74.3 56.9 75 56.6C76 59.2 78.5 61 81.5 61C83.5 61 85.3 60.1 86.5 58.7C87 58.9 87.5 59 88 59C90.8 59 93 56.8 93 54C93 52.8 92.6 51.6 92 50.6C92.6 49.6 93 48.4 93 47C93 44.2 90.8 42 88 42C87.8 42 87.6 42 87.4 42.1C86.4 37.4 82.2 34 77.2 34H80Z" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="76" cy="40" r="1" fill="#fff" />
            <circle cx="84" cy="46" r="1.5" fill="#fff" />
            <circle cx="74" cy="50" r="1" fill="#fff" />
            <circle cx="88" cy="52" r="2" fill="#fff" />
            <defs>
              <linearGradient id="ml-grad" x1="0" y1="0" x2="160" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#020617" />
                <stop offset="1" stopColor="#0B1329" />
              </linearGradient>
              <radialGradient id="brain-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" transform="translate(80 50) rotate(90) scale(26)">
                <stop stopColor="#3b82f6" />
                <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        );
      default: // Other Web dev
        return (
          <svg width="100%" height="100%" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="160" height="100" fill="url(#default-grad)" />
            <text x="80" y="55" fill="var(--primary-color)" fontSize="18" fontWeight="bold" textAnchor="middle" opacity="0.3">&lt;CODE&gt;</text>
            <defs>
              <linearGradient id="default-grad" x1="0" y1="0" x2="160" y2="100" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0F172A" />
                <stop offset="1" stopColor="#1E293B" />
              </linearGradient>
            </defs>
          </svg>
        );
    }
  };

  return (
    <div className="course-card animate-fade-in">
      <div className="course-thumbnail-wrapper">
        <div className="course-thumbnail-graphic">
          {renderThumbnail()}
        </div>
        <button 
          onClick={() => onSelectCourse(course.id)} 
          className="play-overlay-btn click-press"
          title="Play Course"
        >
          <Play size={18} fill="currentColor" />
        </button>
      </div>

      <div className="course-card-details">
        <span className="course-card-title">{course.title}</span>
        <span className="course-card-teacher">{course.teacher}</span>
        
        <div className="course-card-progress">
          <div className="course-progress-bar-bg">
            <div className="course-progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
          </div>
          <div className="course-progress-text-row">
            <span>{course.progress}% Complete</span>
            <span>{course.chaptersCount} Chapters</span>
          </div>
        </div>
      </div>
    </div>
  );
}
