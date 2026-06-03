import React from 'react';
import HeroSection from './sections/HeroSection';
import { 
  Star, GraduationCap, Award, BookOpen, Clock, Users, ArrowRight, 
  PlayCircle, FileText, CheckCircle, Video, ChevronLeft, ChevronRight, 
  Globe, Download, Calendar, Bookmark, Heart, Sparkles, LogIn 
} from 'lucide-react';

// Data Mock Configurations
const TRUSTED_TEACHERS = [
  { 
    name: 'Dr. Ahmed Al-Hassan', 
    subject: 'SAT & ACT Expert', 
    students: '2,450', 
    rating: 4.9, 
    reviews: '320', 
    exp: '8+ Years', 
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&h=300' 
  },
  { 
    name: 'Ms. Sarah Johnson', 
    subject: 'IELTS & TOEFL Expert', 
    students: '1,980', 
    rating: 4.8, 
    reviews: '290', 
    exp: '6+ Years', 
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300' 
  },
  { 
    name: 'Dr. Michael Chen', 
    subject: 'GRE & GMAT Expert', 
    students: '3,210', 
    rating: 4.9, 
    reviews: '410', 
    exp: '10+ Years', 
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&h=300' 
  },
  { 
    name: 'Ms. Fatima Al-Zahra', 
    subject: 'Arabic Language Expert', 
    students: '1,420', 
    rating: 4.8, 
    reviews: '180', 
    exp: '7+ Years', 
    img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=300&h=300' 
  },
  { 
    name: 'Mr. David Wilson', 
    subject: 'Computer Science Expert', 
    students: '2,180', 
    rating: 4.9, 
    reviews: '260', 
    exp: '9+ Years', 
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300' 
  }
];

const EXAM_CATEGORIES = [
  { 
    icon: <Award size={20} />, 
    title: 'Scholarship Exams', 
    desc: 'Prepare for international scholarships and funding opportunities.', 
    teachers: '120+', 
    courses: '400+',
    borderColor: '#7c3aed',
    iconBg: 'rgba(124, 58, 237, 0.1)'
  },
  { 
    icon: <GraduationCap size={20} />, 
    title: 'University Admissions', 
    desc: 'Secure admission to your dream universities worldwide.', 
    teachers: '180+', 
    courses: '680+',
    borderColor: '#CABA61',
    iconBg: 'rgba(202, 186, 97, 0.1)'
  },
  { 
    icon: <Globe size={20} />, 
    title: 'Language Proficiency Tests', 
    desc: 'IELTS, TOEFL, PTE and other language certifications.', 
    teachers: '150+', 
    courses: '520+',
    borderColor: '#3b82f6',
    iconBg: 'rgba(59, 130, 246, 0.1)'
  },
  { 
    icon: <CheckCircle size={20} />, 
    title: 'Professional Certifications', 
    desc: 'Industry-recognized certifications to advance your career.', 
    teachers: '100+', 
    courses: '300+',
    borderColor: '#10b981',
    iconBg: 'rgba(16, 185, 129, 0.1)'
  },
  { 
    icon: <Sparkles size={20} />, 
    title: 'Career Development', 
    desc: 'Develop skills for career growth and professional success.', 
    teachers: '110+', 
    courses: '320+',
    borderColor: '#f97316',
    iconBg: 'rgba(249, 115, 22, 0.1)'
  },
  { 
    icon: <BookOpen size={20} />, 
    title: 'Academic Success', 
    desc: 'Strengthen academic foundations and achieve excellence.', 
    teachers: '160+', 
    courses: '380+',
    borderColor: '#ec4899',
    iconBg: 'rgba(236, 72, 153, 0.1)'
  }
];

const FEATURED_COURSES = [
  { 
    title: 'SAT Math Mastery Course', 
    teacher: 'Dr. Ahmed Al-Hassan', 
    rating: 4.9, 
    reviews: '320',
    students: '2,450', 
    price: 79, 
    originalPrice: 129,
    duration: '15 Hours', 
    lessons: '20 Lessons',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=500&q=80',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80',
    tag: 'Bestseller'
  },
  { 
    title: 'IELTS Speaking Success', 
    teacher: 'Ms. Sarah Johnson', 
    rating: 4.8, 
    reviews: '290',
    students: '1,980', 
    price: 69, 
    originalPrice: 109,
    duration: '12 Hours', 
    lessons: '16 Lessons',
    img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=500&q=80',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80'
  },
  { 
    title: 'GRE Quantitative Reasoning', 
    teacher: 'Dr. Michael Chen', 
    rating: 4.9, 
    reviews: '410',
    students: '3,210', 
    price: 89, 
    originalPrice: 149,
    duration: '14 Hours', 
    lessons: '18 Lessons',
    img: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=500&q=80',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80'
  },
  { 
    title: 'TOEFL iBT Complete Guide', 
    teacher: 'Ms. Lisa Park', 
    rating: 4.8, 
    reviews: '350',
    students: '2,850', 
    price: 74, 
    originalPrice: 119,
    duration: '18 Hours', 
    lessons: '22 Lessons',
    img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=500&q=80',
    avatar: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=100&q=80'
  },
  { 
    title: 'Essay Writing Excellence', 
    teacher: 'Mr. James Wilson', 
    rating: 4.9, 
    reviews: '230',
    students: '2,120', 
    price: 59, 
    originalPrice: 89,
    duration: '10 Hours', 
    lessons: '12 Lessons',
    img: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=500&q=80',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80'
  }
];

const SUCCESS_STORIES = [
  { 
    name: 'Aisha Rahman', 
    exam: 'SAT Score: 1480/1600', 
    text: 'Thanks to Dr. Ahmed\'s guidance, I improved my score by 200 points and got accepted to my dream university!', 
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100',
    school: 'University of Toronto'
  },
  { 
    name: 'Omar Hassan', 
    exam: 'IELTS Score: 7.5', 
    text: 'Ms. Sarah\'s IELTS course was excellent. I got 7.5 overall and now I\'m studying in Australia!', 
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&h=100',
    school: 'University of Melbourne'
  },
  { 
    name: 'Fatima Al-Zahra', 
    exam: 'GRE Score: 325/340', 
    text: 'Dr. Michael\'s strategies and practice tests helped me achieve an amazing score!', 
    img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=100&h=100',
    school: 'Carnegie Mellon University'
  }
];

const LEARNING_RESOURCES = [
  { 
    title: 'Study Guides', 
    desc: 'Comprehensive guides for exam preparation.', 
    articles: '24 Articles', 
    img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=300&q=80' 
  },
  { 
    title: 'Exam Tips', 
    desc: 'Expert tips and strategies for exam success.', 
    articles: '18 Articles', 
    img: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=300&q=80' 
  },
  { 
    title: 'Downloadable Notes', 
    desc: 'High-quality notes and study materials.', 
    articles: '32 Resources', 
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=300&q=80' 
  },
  { 
    title: 'Learning Materials', 
    desc: 'Videos, PDFs, and interactive content.', 
    articles: '45 Resources', 
    img: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=300&q=80' 
  },
  { 
    title: 'Educational Articles', 
    desc: 'Latest insights and educational content.', 
    articles: '28 Articles', 
    img: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=300&q=80' 
  }
];

export default function Homepage({ onGetStarted }) {
  return (
    <div style={{ backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column' }}>
      
      {/* HERO SECTION */}
      <HeroSection onGetStarted={onGetStarted} />

      {/* TRUSTED TEACHERS SECTION */}
      <section style={{ padding: '90px 8%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '46px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                Trusted by <span style={{ color: 'var(--primary-color)' }}>Students Worldwide</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Learn from verified experts with proven teaching experience and student success.</p>
            </div>
            
            {/* Carousel navigation arrows */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <ChevronLeft size={16} />
              </button>
              <button style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', 
            gap: '24px' 
          }}>
            {TRUSTED_TEACHERS.map((teacher, idx) => (
              <div 
                key={idx} 
                className="smart-card animate-fade-in" 
                style={{ 
                  padding: '24px 20px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  textAlign: 'center',
                  cursor: 'pointer',
                  border: '1px solid var(--border-color)',
                  borderRadius: '16px',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <img 
                  src={teacher.img} 
                  alt={teacher.name} 
                  style={{ width: '84px', height: '84px', objectFit: 'cover', borderRadius: '50%', marginBottom: '16px', border: '3px solid var(--border-color)' }} 
                />
                
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {teacher.name}
                </h3>
                <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '8px' }}>
                  {teacher.subject}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: '#FFC92F', marginBottom: '14px', fontSize: '12px' }}>
                  <Star size={13} fill="currentColor" />
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{teacher.rating}</span>
                  <span style={{ color: 'var(--text-muted)' }}>({teacher.reviews})</span>
                </div>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  gap: '12px', 
                  width: '100%', 
                  fontSize: '11px', 
                  color: 'var(--text-secondary)',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--border-color)',
                  marginBottom: '16px'
                }}>
                  <span>{teacher.exp} Exp</span>
                  <span style={{ color: 'var(--border-color)' }}>|</span>
                  <span>{teacher.students} Students</span>
                </div>

                <button 
                  className="click-press"
                  style={{
                    width: '100%',
                    padding: '8px 16px',
                    border: '1px solid var(--border-color)',
                    background: '#ffffff',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-color)'; e.currentTarget.style.background = 'var(--primary-glow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = '#ffffff'; }}
                >
                  View Profile
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* EXPLORE EXAM CATEGORIES */}
      <section style={{ padding: '90px 8%', backgroundColor: '#FAF9FB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
            Explore Exam Categories
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '46px' }}>
            Find the right preparation path for your goals
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {EXAM_CATEGORIES.map((cat, idx) => (
              <div 
                key={idx} 
                className="smart-card click-press animate-fade-in" 
                style={{ 
                  padding: '28px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  textAlign: 'left',
                  cursor: 'pointer', 
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = cat.borderColor}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '10px', 
                  background: cat.iconBg, 
                  color: cat.borderColor, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  {cat.icon}
                </div>

                <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                  {cat.desc}
                </p>

                <div style={{ 
                  display: 'flex', 
                  gap: '16px', 
                  fontSize: '12px', 
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <span>{cat.teachers} Teachers</span>
                  <span>{cat.courses} Courses</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FEATURED COURSES SECTION */}
      <section style={{ padding: '90px 8%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '46px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                Featured <span style={{ color: 'var(--primary-color)' }}>Courses</span>
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Top-rated courses designed to help you succeed.</p>
            </div>
            <button className="click-press" style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '14px', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              View All Courses <ArrowRight size={16} />
            </button>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
            gap: '30px' 
          }}>
            {FEATURED_COURSES.map((course, idx) => (
              <div 
                key={idx} 
                className="smart-card click-press animate-fade-in" 
                style={{ 
                  padding: '0', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  cursor: 'pointer', 
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  background: '#ffffff'
                }}
              >
                <div style={{ position: 'relative', height: '190px' }}>
                  <img src={course.img} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {course.tag && (
                    <div style={{ 
                      position: 'absolute', top: '14px', left: '14px', 
                      background: '#FFC92F', color: '#1a0a26', 
                      padding: '4px 10px', borderRadius: '4px', 
                      fontSize: '10px', fontWeight: 800,
                      textTransform: 'uppercase', letterSpacing: '0.5px'
                    }}>
                      {course.tag}
                    </div>
                  )}
                  <button style={{ 
                    position: 'absolute', top: '14px', right: '14px', 
                    width: '32px', height: '32px', borderRadius: '50%', 
                    background: 'rgba(255,255,255,0.9)', border: 'none', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    color: 'var(--text-secondary)', cursor: 'pointer' 
                  }}>
                    <Bookmark size={14} />
                  </button>
                </div>

                <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, textAlign: 'left' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.4 }}>
                    {course.title}
                  </h3>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={course.avatar} alt="Teacher" style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{course.teacher}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px' }}>
                    <Star size={13} fill="#FFC92F" stroke="#FFC92F" />
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{course.rating}</span>
                    <span style={{ color: 'var(--text-muted)' }}>({course.reviews})</span>
                    <span style={{ color: 'var(--border-color)', margin: '0 4px' }}>|</span>
                    <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>{course.students} students</span>
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginTop: 'auto', 
                    paddingTop: '16px', 
                    borderTop: '1px solid var(--border-color)' 
                  }}>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><BookOpen size={12} /> {course.lessons}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {course.duration}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        ${course.originalPrice}
                      </span>
                      <span style={{ fontSize: '18px', fontWeight: 800, color: 'var(--primary-color)' }}>
                        ${course.price}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={onGetStarted}
                    className="btn-primary click-press"
                    style={{ width: '100%', padding: '10px', fontSize: '13px', fontWeight: 700, borderRadius: '8px', marginTop: '4px' }}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* WHY STUDENTS CHOOSE SURIA TECH */}
      <section style={{ padding: '90px 8%', backgroundColor: '#FAF9FB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
            Why Students Choose <span style={{ color: 'var(--primary-color)' }}>SURIA TECH</span>
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '48px' }}>
            We provide everything you need to succeed, from top-tier instructors to flexible learning platforms.
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '24px' 
          }}>
            {[
              { icon: <Award size={20} />, title: 'Expert Teachers', desc: 'Learn from verified professionals with years of experience.' },
              { icon: <Video size={20} />, title: 'Live Interactive Classes', desc: 'Engage in real-time sessions and get instant feedback.' },
              { icon: <PlayCircle size={20} />, title: 'Recorded Lessons', desc: 'Access high-quality recorded lessons anytime, anywhere.' },
              { icon: <Download size={20} />, title: 'Downloadable Materials', desc: 'Get comprehensive study materials and resources.' },
              { icon: <Calendar size={20} />, title: 'Flexible Schedule', desc: 'Learn at your own pace with flexible timing options.' },
              { icon: <Globe size={20} />, title: 'Arabic & English Support', desc: 'Bilingual support for students worldwide.' }
            ].map((feat, idx) => (
              <div 
                key={idx} 
                className="smart-card" 
                style={{ 
                  padding: '30px 24px', 
                  background: '#ffffff', 
                  borderRadius: '16px', 
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <div style={{ 
                  width: '46px', 
                  height: '46px', 
                  borderRadius: '50%', 
                  background: 'var(--primary-glow)', 
                  color: 'var(--primary-color)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '20px' 
                }}>
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px' }}>{feat.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{feat.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* YOUR LEARNING JOURNEY TIMELINE */}
      <section style={{ padding: '95px 8%', backgroundColor: '#ffffff' }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.8fr',
          gap: '50px',
          alignItems: 'center'
        }} className="responsive-hero-grid">
          
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '16px', lineHeight: 1.15, letterSpacing: '-1px' }}>
              Your Learning <br />Journey
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
              A simple path to achieve your exam success. Follow our step-by-step methodology to get matched with top teachers.
            </p>
            <button 
              onClick={onGetStarted}
              className="btn-primary click-press" 
              style={{ padding: '14px 28px', borderRadius: '30px', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <span>Start Your Journey</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Timeline side */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
            {/* Background line running vertically */}
            <div style={{ position: 'absolute', left: '26px', top: '16px', bottom: '16px', width: '2px', background: 'var(--border-color)', zIndex: 0 }}></div>

            {[
              { step: '01', title: 'Choose Your Goal', desc: 'Select the exam or skill you want to master.', icon: <Award size={14} /> },
              { step: '02', title: 'Find the Right Teacher', desc: 'Connect with expert teachers who specialize in your goals.', icon: <Users size={14} /> },
              { step: '03', title: 'Join Classes and Learn', desc: 'Attend live classes, watch lessons, and practice consistently.', icon: <Video size={14} /> },
              { step: '04', title: 'Achieve Your Success', desc: 'Pass your exam and achieve your academic dreams.', icon: <CheckCircle size={14} /> }
            ].map((journey, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'flex', 
                  gap: '20px', 
                  alignItems: 'start', 
                  position: 'relative', 
                  zIndex: 1, 
                  textAlign: 'left',
                  background: '#ffffff',
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid transparent',
                  transition: '0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  background: 'var(--primary-color)', 
                  color: '#ffffff', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  fontSize: '11px', 
                  fontWeight: 800,
                  flexShrink: 0
                }}>
                  {journey.step}
                </div>
                
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {journey.title}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                    {journey.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SUCCESS STORIES SECTION */}
      <section style={{ padding: '90px 8%', backgroundColor: '#FAF9FB' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '46px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                Success Stories
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Real students, real results.</p>
            </div>
            <a href="#" style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
              View All Stories
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {SUCCESS_STORIES.map((story, idx) => (
              <div 
                key={idx} 
                className="smart-card animate-fade-in" 
                style={{ 
                  padding: '32px 28px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '20px',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  background: '#ffffff',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', color: '#FFC92F', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={15} fill="currentColor" />)}
                </div>
                
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.6, fontStyle: 'italic', flex: 1, margin: 0 }}>
                  "{story.text}"
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <img src={story.img} alt={story.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  <div>
                    <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>{story.name}</h4>
                    <p style={{ fontSize: '11px', color: 'var(--primary-color)', fontWeight: 600, margin: '0 0 1px 0' }}>{story.exam}</p>
                    <p style={{ fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>{story.school}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BECOME AN INSTRUCTOR */}
      <section style={{ padding: '0 8% 90px', backgroundColor: '#FAF9FB' }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          background: 'linear-gradient(135deg, #3A2048 0%, #20102b 100%)', 
          borderRadius: '24px', 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 1fr', 
          overflow: 'hidden',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }} className="responsive-hero-grid">
          
          <div style={{ padding: '52px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'left', color: '#ffffff' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--secondary-color)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '8px' }}>
              Become an Instructor
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Share Your Knowledge With Students Worldwide
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', lineHeight: 1.6 }}>
              Join our platform and help students achieve their academic and professional goals while building your teaching career.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '36px' }}>
              {[
                { title: 'Create Courses', desc: 'Design and publish your courses' },
                { title: 'Host Live Classes', desc: 'Connect with students in real-time' },
                { title: 'Build Your Audience', desc: 'Grow your student community' },
                { title: 'Generate Income', desc: 'Earn competitive revenue' }
              ].map((benefit, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'start' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(202, 186, 97, 0.15)', color: 'var(--secondary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <CheckCircle size={12} fill="currentColor" />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '12px', fontWeight: 700, margin: '0 0 2px 0', color: '#ffffff' }}>{benefit.title}</h4>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', margin: 0 }}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              className="click-press" 
              style={{ 
                alignSelf: 'flex-start', 
                padding: '14px 28px', 
                background: '#FFC92F', 
                color: '#1a0a26', 
                borderRadius: '30px', 
                fontWeight: 700, 
                fontSize: '14px', 
                boxShadow: '0 6px 20px rgba(255, 201, 47, 0.25)', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              Become an Instructor
            </button>
          </div>

          <div style={{ 
            background: 'url("https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80") center/cover', 
            minHeight: '380px' 
          }}></div>
        </div>
      </section>

      {/* LEARNING RESOURCES SECTION */}
      <section style={{ padding: '90px 8%', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-end', 
            marginBottom: '46px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
                Learning Resources
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>Explore valuable resources to support your learning journey.</p>
            </div>
            <a href="#" style={{ color: 'var(--primary-color)', fontWeight: 700, fontSize: '14px', textDecoration: 'none' }}>
              View All Resources
            </a>
          </div>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', 
            gap: '24px' 
          }}>
            {LEARNING_RESOURCES.map((resource, idx) => (
              <div 
                key={idx} 
                className="smart-card click-press animate-fade-in" 
                style={{ 
                  padding: '0', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  cursor: 'pointer', 
                  overflow: 'hidden',
                  borderRadius: '16px',
                  border: '1px solid var(--border-color)',
                  boxShadow: 'var(--shadow-sm)',
                  background: '#ffffff',
                  textAlign: 'left'
                }}
              >
                <div style={{ height: '120px', position: 'relative' }}>
                  <img src={resource.img} alt={resource.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    {resource.title}
                  </h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '0 0 6px 0', lineHeight: 1.4 }}>
                    {resource.desc}
                  </p>
                  <span style={{ fontSize: '10px', color: 'var(--primary-color)', fontWeight: 700 }}>
                    {resource.articles}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL PRE-FOOTER CTA SECTION */}
      <section style={{ padding: '0 8% 90px', backgroundColor: '#ffffff' }}>
        <div style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          background: 'linear-gradient(135deg, #3A2048 0%, #1c0b24 100%)',
          borderRadius: '24px',
          padding: '60px 40px',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(58,32,72,0.15)',
          color: '#ffffff',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Inner brand emblem symbol */}
          <div style={{ 
            width: '64px', height: '64px', borderRadius: '50%', 
            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px', color: '#FFC92F'
          }}>
            <Sparkles size={24} />
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#ffffff', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Start Your Learning Journey Today
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '36px', maxWidth: '560px', margin: '0 auto 36px' }}>
            Join thousands of successful students who achieved their dreams with SURIA TECH.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={onGetStarted}
              className="click-press" 
              style={{ 
                padding: '14px 32px', 
                backgroundColor: '#FFC92F', 
                color: '#1a0a26', 
                borderRadius: '30px', 
                fontWeight: 700, 
                fontSize: '14px', 
                boxShadow: '0 6px 20px rgba(255, 201, 47, 0.3)', 
                border: 'none', 
                cursor: 'pointer' 
              }}
            >
              Get Started
            </button>
            <button 
              className="click-press" 
              style={{ 
                padding: '14px 32px', 
                backgroundColor: 'transparent', 
                color: '#ffffff', 
                borderRadius: '30px', 
                fontWeight: 700, 
                fontSize: '14px', 
                border: '2px solid rgba(255,255,255,0.6)', 
                cursor: 'pointer' 
              }}
            >
              Find a Teacher
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
