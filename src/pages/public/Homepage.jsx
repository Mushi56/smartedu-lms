import React, { useState } from 'react';
import {
  Star, GraduationCap, Award, BookOpen, Clock, Users, ArrowRight,
  CheckCircle, Video, ChevronLeft, ChevronRight, Globe, Download,
  Calendar, Bookmark, PlayCircle, FileText, Mic, Laptop, Lightbulb,
  Trophy, MessageSquare, TrendingUp, Target, Zap, BarChart2
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */
const TRUSTED_TEACHERS = [
  { name: 'Dr. Ahmed Al-Hassan', subject: 'SAT & ACT Expert', students: '2,450', rating: 4.9, reviews: '320', exp: '8 yrs', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&h=200' },
  { name: 'Ms. Sarah Johnson', subject: 'IELTS & TOEFL Expert', students: '1,980', rating: 4.8, reviews: '290', exp: '6 yrs', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200' },
  { name: 'Dr. Michael Chen', subject: 'GRE & GMAT Expert', students: '3,210', rating: 4.9, reviews: '410', exp: '10 yrs', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&h=200' },
  { name: 'Ms. Fatima Al-Zahra', subject: 'Arabic Language Expert', students: '1,420', rating: 4.8, reviews: '180', exp: '7 yrs', img: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=200&h=200' },
  { name: 'Mr. David Wilson', subject: 'Computer Science Expert', students: '2,180', rating: 4.9, reviews: '260', exp: '9 yrs', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200' },
];

const EXAM_CATEGORIES = [
  { icon: Award, title: 'Scholarship Exams', desc: 'Prepare for international scholarships and funding opportunities.', teachers: '120+', courses: '400+', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  { icon: GraduationCap, title: 'University Admissions', desc: 'Secure admission to your dream universities worldwide.', teachers: '180+', courses: '680+', color: '#CABA61', bg: 'rgba(202,186,97,0.1)' },
  { icon: Globe, title: 'Language Proficiency Tests', desc: 'IELTS, TOEFL, PTE and other language certifications.', teachers: '210+', courses: '520+', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
  { icon: Bookmark, title: 'Professional Certifications', desc: 'Industry-recognized credentials to advance your career.', teachers: '95+', courses: '310+', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  { icon: TrendingUp, title: 'Career Development', desc: 'Skills for professional growth and workforce readiness.', teachers: '140+', courses: '450+', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { icon: BookOpen, title: 'Academic Success', desc: 'Strong academic foundations from school to university.', teachers: '160+', courses: '580+', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
];

const FEATURED_COURSES = [
  { title: 'SAT Math Mastery Course', instructor: 'Dr. Ahmed Al-Hassan', rating: 4.8, reviews: 4200, students: 12400, hours: 32, price: 79, oldPrice: 149, img: 'https://images.unsplash.com/photo-1509869175650-a1d97972541a?auto=format&fit=crop&w=400&h=220', badge: 'Bestseller' },
  { title: 'IELTS Speaking Success', instructor: 'Ms. Sarah Johnson', rating: 4.9, reviews: 3249, students: 12560, hours: 28, price: 69, oldPrice: 129, img: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=400&h=220', badge: 'Top Rated' },
  { title: 'GRE Quantitative Reasoning', instructor: 'Dr. Michael Chen', rating: 4.8, reviews: 3223, students: 8920, hours: 45, price: 89, oldPrice: 179, img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&h=220', badge: 'New' },
  { title: 'TOEFL Complete Guide', instructor: 'Ms. Sarah Johnson', rating: 4.8, reviews: 2890, students: 7230, hours: 38, price: 74, oldPrice: 139, img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&h=220', badge: '' },
  { title: 'Essay Writing Excellence', instructor: 'Mr. David Wilson', rating: 4.9, reviews: 2200, students: 6890, hours: 22, price: 59, oldPrice: 99, img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&h=220', badge: '' },
];

const FEATURES = [
  { icon: Mic, title: 'Expert Teachers', desc: 'Learn from certified educators with years of experience.', color: '#7c3aed' },
  { icon: Video, title: 'Live Interactive Classes', desc: 'Attend live sessions and get instant feedback.', color: '#0ea5e9' },
  { icon: Download, title: 'Recorded Lessons', desc: 'Access high-quality recorded lessons anytime, anywhere.', color: '#10b981' },
  { icon: FileText, title: 'Downloadable Materials', desc: 'Comprehensive study materials and resources.', color: '#f59e0b' },
  { icon: Calendar, title: 'Flexible Schedule', desc: 'Learn at your own pace with flexible timing options.', color: '#ef4444' },
  { icon: Globe, title: 'Arabic & English Support', desc: 'Bilingual support for students worldwide.', color: '#CABA61' },
];

const JOURNEY_STEPS = [
  { num: '01', icon: Target, title: 'Choose Your Goal', desc: 'Select the exam or skill you want to master.', color: '#4a148c', bg: '#f3e8ff' },
  { num: '02', icon: Users, title: 'Find the Right Teacher', desc: 'Connect with expert teachers who specialize in your goals.', color: '#d97706', bg: '#fef3c7' },
  { num: '03', icon: Laptop, title: 'Join Classes and Learn', desc: 'Attend live classes, watch lessons, and practice consistently.', color: '#0f766e', bg: '#ccfbf1' },
  { num: '04', icon: Trophy, title: 'Achieve Your Success', desc: 'Pass your exam and achieve your academic dreams.', color: '#15803d', bg: '#dcfce7' },
];

const SUCCESS_STORIES = [
  { name: 'Aisha Rahman', school: 'MIT Alum', text: 'Thanks to Dr. Ahmed\'s guidance, I improved my score by 300 points and got admitted to MIT on a full scholarship!', img: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=100&h=100', rating: 5 },
  { name: 'Omar Hassan', school: 'Cambridge', text: "Ms. Sarah's IELTS course was excellent. I got 7.5 overall and am now studying at the University of Melbourne.", img: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&h=100', rating: 5 },
  { name: 'Fatima Al-Zahra', school: 'Carnegie Mellon', text: 'Dr. Michael\'s strategies and practice tests were exceptional. I earned a complete scholarship to Carnegie Mellon.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100', rating: 5 },
];

const RESOURCES = [
  { icon: BookOpen, title: 'Study Guides', count: '24 Articles', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  { icon: Lightbulb, title: 'Exam Tips', count: '18 Articles', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { icon: Download, title: 'Downloadable Notes', count: '45 Resources', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  { icon: BarChart2, title: 'Learning Analytics', count: '12 Reports', color: '#0ea5e9', bg: 'rgba(14,165,233,0.08)' },
  { icon: FileText, title: 'Educational Articles', count: '36 Articles', color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
];


/* ═══════════════════════════════════════════════════════════════
   HELPER COMPONENTS
══════════════════════════════════════════════════════════════════ */
function StarRating({ rating, size = 12 }) {
  return (
    <div style={{ display: 'flex', gap: '1px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? '#f59e0b' : 'none'} color={i <= Math.round(rating) ? '#f59e0b' : '#d1d5db'} />
      ))}
    </div>
  );
}

function SectionHeader({ title, highlight, subtitle, center = true }) {
  return (
    <div style={{ textAlign: center ? 'center' : 'left', maxWidth: center ? '640px' : 'none', margin: center ? '0 auto 40px' : '0 0 36px' }}>
      <h2 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: '#1e1b4b', lineHeight: 1.25, marginBottom: '10px' }}>
        {title} {highlight && <span style={{ color: '#CABA61' }}>{highlight}</span>}
      </h2>
      {subtitle && <p style={{ fontSize: '14px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{subtitle}</p>}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN HOMEPAGE
══════════════════════════════════════════════════════════════════ */
export default function Homepage({ onGetStarted }) {
  const [teacherPage, setTeacherPage] = useState(0);
  const teachersPerPage = 5;
  const maxPage = Math.ceil(TRUSTED_TEACHERS.length / teachersPerPage) - 1;

  return (
    <div style={{ fontFamily: "'Montserrat', sans-serif", color: '#1e1b4b', overflowX: 'hidden' }}>

      {/* ══════════════════════════════════════════════════
          HERO SECTION
      ═══════════════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #3A2048 0%, #20102b 60%, #2d1a40 100%)',
        minHeight: 'calc(100vh - 72px)',
        display: 'flex', alignItems: 'center',
        padding: '60px 5% 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* BG orbs */}
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(202,186,97,0.08) 0%, transparent 70%)', top: '-100px', right: '-100px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)', bottom: '-80px', left: '-80px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center', width: '100%' }}>
          {/* Left */}
          <div style={{ textAlign: 'left', zIndex: 1 }}>

            <h1 style={{ fontSize: 'clamp(32px, 4.5vw, 58px)', fontWeight: 900, color: '#ffffff', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-1px' }}>
              Pass the Exam<br />
              That <span style={{ color: '#CABA61' }}>Matters Most</span>
            </h1>

            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, marginBottom: '32px', maxWidth: '480px' }}>
              Connect with experienced instructors, join live classes, and prepare confidently for scholarships, university admissions, and professional certifications.
            </p>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <button onClick={onGetStarted} className="click-press" style={{ padding: '14px 28px', background: '#CABA61', color: '#1e1b4b', borderRadius: '30px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 6px 20px rgba(202,186,97,0.35)', transition: 'all 0.2s' }}>
                <span>Find a Teacher</span><ArrowRight size={16} />
              </button>
              <button className="click-press" style={{ padding: '14px 28px', background: 'rgba(255,255,255,0.08)', color: '#ffffff', borderRadius: '30px', fontWeight: 600, fontSize: '14px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}>
                <PlayCircle size={16} /><span>Browse Courses</span>
              </button>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex' }}>
                  {['https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=40&h=40', 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=40&h=40', 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=40&h=40'].map((s, i) => (
                    <img key={i} src={s} alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #3A2048', marginLeft: i > 0 ? '-8px' : 0, objectFit: 'cover' }} />
                  ))}
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>25,000+</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Students Enrolled</div>
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.12)' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>1,200+</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Expert Teachers</div>
              </div>
              <div style={{ width: '1px', height: '36px', background: 'rgba(255,255,255,0.12)' }} />
              <div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: '#CABA61' }}>98%</div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.55)', fontWeight: 500 }}>Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right — Teacher Illustration */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1 }}>
            <TeacherIllustration />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          TRUSTED TEACHERS
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 5%', background: '#f8f7ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <SectionHeader
              tag="Our Educators"
              title="Trusted by"
              highlight="Students Worldwide"
              subtitle="Learn from the best minds in exam preparation."
              center={false}
            />

          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {TRUSTED_TEACHERS.map((t, i) => (
              <div key={i} className="click-press" style={{ background: '#ffffff', borderRadius: '16px', padding: '20px 16px', textAlign: 'center', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(58,32,72,0.12)'; e.currentTarget.style.borderColor = '#CABA61'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#f1f5f9'; }}>
                <div style={{ position: 'relative', width: '72px', height: '72px', margin: '0 auto 12px' }}>
                  <img src={t.img} alt={t.name} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #f1f5f9' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderRadius: '50%', background: '#10b981', border: '2px solid #fff' }} />
                </div>
                <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b4b', marginBottom: '3px' }}>{t.name}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '8px' }}>{t.subject}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', marginBottom: '4px' }}>
                  <StarRating rating={t.rating} />
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#1e1b4b' }}>{t.rating}</span>
                </div>
                <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '12px' }}>{t.students} students · {t.exp}</div>
                <button style={{ width: '100%', padding: '7px', background: 'transparent', border: '1.5px solid #3A2048', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: '#3A2048', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#3A2048'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#3A2048'; }}>
                  View Profile
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          EXPLORE EXAM CATEGORIES
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 5%', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionHeader
            tag="Categories"
            title="Explore Exam"
            highlight="Categories"
            subtitle="Find the right preparation path for your goals."
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {EXAM_CATEGORIES.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className="click-press" style={{ background: '#fff', borderRadius: '14px', padding: '20px 14px', textAlign: 'center', border: `1.5px solid ${cat.color}20`, boxShadow: '0 2px 10px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 12px 28px ${cat.color}22`; e.currentTarget.style.borderColor = cat.color; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = `${cat.color}20`; }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: cat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: cat.color }}>
                    <Icon size={22} />
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e1b4b', marginBottom: '6px', lineHeight: 1.3 }}>{cat.title}</div>
                  <div style={{ fontSize: '10px', color: '#64748b', lineHeight: 1.4, marginBottom: '10px' }}>{cat.desc}</div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '9px', background: '#f1f5f9', color: '#64748b', padding: '2px 7px', borderRadius: '10px', fontWeight: 600 }}>{cat.teachers} Teachers</span>
                    <span style={{ fontSize: '9px', background: '#f1f5f9', color: '#64748b', padding: '2px 7px', borderRadius: '10px', fontWeight: 600 }}>{cat.courses} Courses</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          FEATURED COURSES
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 5%', background: '#f8f7ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <SectionHeader
              tag="Featured"
              title="Featured"
              highlight="Courses"
              subtitle="Top-rated courses to help you succeed."
              center={false}
            />
            <a href="#" style={{ fontSize: '13px', fontWeight: 700, color: '#3A2048', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, alignSelf: 'flex-start', marginTop: '8px' }}>
              View All Courses <ArrowRight size={14} />
            </a>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {FEATURED_COURSES.map((course, i) => (
              <div key={i} className="click-press" style={{ background: '#fff', borderRadius: '14px', border: '1px solid #f1f5f9', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.3s', display: 'flex', flexDirection: 'column' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 14px 32px rgba(58,32,72,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)'; }}>
                <div style={{ position: 'relative' }}>
                  <img src={course.img} alt={course.title} style={{ width: '100%', height: '120px', objectFit: 'cover', display: 'block' }} />
                  {course.badge && (
                    <span style={{ position: 'absolute', top: '8px', left: '8px', padding: '3px 8px', background: course.badge === 'Bestseller' ? '#f59e0b' : course.badge === 'New' ? '#10b981' : '#7c3aed', color: '#fff', borderRadius: '6px', fontSize: '9px', fontWeight: 700 }}>
                      {course.badge}
                    </span>
                  )}
                  <button style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.9)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3A2048', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <PlayCircle size={18} />
                  </button>
                </div>
                <div style={{ padding: '14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#1e1b4b', marginBottom: '4px', lineHeight: 1.35 }}>{course.title}</div>
                  <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '8px' }}>{course.instructor}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '4px' }}>
                    <StarRating rating={course.rating} size={10} />
                    <span style={{ fontSize: '10px', fontWeight: 700, color: '#1e1b4b' }}>{course.rating}</span>
                    <span style={{ fontSize: '9px', color: '#94a3b8' }}>({(course.reviews / 1000).toFixed(1)}k)</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '9px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '2px' }}><Clock size={9} />{course.hours}h</span>
                    <span style={{ fontSize: '9px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '2px' }}><Users size={9} />{(course.students / 1000).toFixed(1)}k</span>
                  </div>
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#3A2048' }}>${course.price}</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8', textDecoration: 'line-through', marginLeft: '4px' }}>${course.oldPrice}</span>
                    </div>
                    <button onClick={onGetStarted} style={{ padding: '5px 10px', background: '#3A2048', color: '#fff', borderRadius: '8px', fontSize: '9px', fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#CABA61'}
                      onMouseLeave={e => e.currentTarget.style.background = '#3A2048'}>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          WHY STUDENTS CHOOSE SURIA TECH
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 5%', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <SectionHeader
            tag="Why Us"
            title="Why Students Choose"
            highlight="SURIA TECH"
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div key={i} style={{ textAlign: 'center', padding: '24px 14px', borderRadius: '14px', background: '#f8f7ff', border: '1px solid #f1f5f9', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.boxShadow = `0 8px 24px ${f.color}18`; e.currentTarget.style.borderColor = `${f.color}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f8f7ff'; e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = '#f1f5f9'; }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: `${f.color}14`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: f.color }}>
                    <Icon size={24} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b4b', marginBottom: '6px' }}>{f.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748b', lineHeight: 1.5 }}>{f.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          YOUR LEARNING JOURNEY
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 5%', background: '#f8f7ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 3.5fr', gap: '48px', alignItems: 'center' }}>
          
          <div style={{ textAlign: 'left' }}>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, color: '#1e1b4b', lineHeight: 1.25, marginBottom: '14px' }}>
              Your Learning<br />Journey
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.65, marginBottom: '24px' }}>A simple path to achieve<br/>your exam success</p>
            <button onClick={onGetStarted} className="click-press" style={{ padding: '12px 24px', background: '#3A2048', color: '#fff', borderRadius: '8px', fontWeight: 700, fontSize: '13px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = '#CABA61'}
              onMouseLeave={e => e.currentTarget.style.background = '#3A2048'}>
              <span>Start Your Journey</span><ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', paddingTop: '20px' }}>
            {JOURNEY_STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                  {/* Horizontal dotted line to next step */}
                  {i < 3 && <div style={{ position: 'absolute', top: '28px', left: '105px', right: '5px', borderTop: '2px dotted #e2e8f0', zIndex: 0 }} />}
                  
                  {/* Top row: Number and Icon */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', position: 'relative', zIndex: 1 }}>
                     <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', position: 'relative', flexShrink: 0 }}>
                        {step.num}
                        {/* Vertical line going down */}
                        <div style={{ position: 'absolute', top: '32px', left: '15px', width: '2px', height: '50px', background: 'linear-gradient(to bottom, #e2e8f0 50%, transparent 100%)', backgroundSize: '1px 6px', zIndex: -1 }} />
                     </div>
                     
                     <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: step.bg, color: step.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <Icon size={30} />
                     </div>
                  </div>

                  {/* Text Area */}
                  <div style={{ paddingLeft: '44px', marginTop: '20px', paddingRight: '12px' }}>
                     <h4 style={{ fontSize: '14px', fontWeight: 800, color: '#1e1b4b', marginBottom: '8px', lineHeight: 1.3 }}>{step.title}</h4>
                     <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.5, margin: 0 }}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          SUCCESS STORIES
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 5%', background: '#ffffff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <SectionHeader
              tag="Testimonials"
              title="Success"
              highlight="Stories"
              subtitle="Real students, real results."
              center={false}
            />
            <a href="#" style={{ fontSize: '13px', fontWeight: 700, color: '#3A2048', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, alignSelf: 'flex-start', marginTop: '8px' }}>
              View All Stories <ArrowRight size={14} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {SUCCESS_STORIES.map((s, i) => (
              <div key={i} style={{ background: '#f8f7ff', borderRadius: '16px', padding: '24px', border: '1px solid #f1f5f9', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 28px rgba(58,32,72,0.1)'; e.currentTarget.style.background = '#ffffff'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.background = '#f8f7ff'; }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
                  {[1,2,3,4,5].map(n => <Star key={n} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ fontSize: '13px', color: '#374151', lineHeight: 1.65, marginBottom: '18px', fontStyle: 'italic' }}>"{s.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={s.img} alt={s.name} style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f1f5f9' }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b4b' }}>{s.name}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{s.school}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          BECOME AN INSTRUCTOR
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 5%', background: '#ffffff', position: 'relative' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', background: 'linear-gradient(135deg, #2E1643 0%, #1e1131 100%)', borderRadius: '24px', padding: '0 40px', position: 'relative', overflow: 'hidden' }}>
          {/* World Map Texture Background */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpattern id=\'dots\' x=\'0\' y=\'0\' width=\'12\' height=\'12\' patternUnits=\'userSpaceOnUse\'%3E%3Ccircle cx=\'2\' cy=\'2\' r=\'1\' fill=\'rgba(255,255,255,0.06)\'/%3E%3C/pattern%3E%3Crect x=\'0\' y=\'0\' width=\'100%25\' height=\'100%25\' fill=\'url(%23dots)\'/%3E%3C/svg%3E")', backgroundSize: 'cover', opacity: 0.8, pointerEvents: 'none' }} />
          
          <div className="home-instructor-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center', position: 'relative', zIndex: 1, height: '100%' }}>
            <div style={{ color: '#ffffff', padding: '60px 0' }}>
              <div style={{ color: '#CABA61', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                Become an Instructor
              </div>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: '#ffffff', lineHeight: 1.2, marginBottom: '16px' }}>
                Share Your Knowledge<br />With Students Worldwide
              </h2>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, marginBottom: '24px', maxWidth: '90%' }}>
                Join our platform and help students achieve their academic and professional goals, while building your teaching career.
              </p>
              <button onClick={onGetStarted} className="click-press" style={{ padding: '13px 28px', background: 'linear-gradient(to right, #F5D365, #E3B446)', color: '#1e1b4b', borderRadius: '30px', fontWeight: 700, fontSize: '14px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', boxShadow: '0 6px 20px rgba(202,186,97,0.25)', transition: 'all 0.2s' }}>
                <span>Become an Instructor</span><ArrowRight size={15} />
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px', padding: '60px 0' }}>
              {[
                { icon: BookOpen, title: 'Create Courses', desc: 'Design and publish your courses' },
                { icon: Users, title: 'Host Live Classes', desc: 'Connect with students in real-time' },
                { icon: TrendingUp, title: 'Build Your Audience', desc: 'Grow your student community' },
                { icon: Zap, title: 'Generate Income', desc: 'Earn competitive revenue' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#CABA61' }}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          LEARNING RESOURCES
      ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '72px 5%', background: '#f8f7ff' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <SectionHeader
              tag="Resources"
              title="Learning"
              highlight="Resources"
              subtitle="Explore valuable resources to support your learning journey."
              center={false}
            />
            <a href="#" style={{ fontSize: '13px', fontWeight: 700, color: '#3A2048', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, alignSelf: 'flex-start', marginTop: '8px' }}>
              View All Resources <ArrowRight size={14} />
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px' }}>
            {RESOURCES.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="click-press" style={{ background: '#ffffff', borderRadius: '14px', padding: '22px 18px', textAlign: 'center', border: '1px solid #f1f5f9', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = `0 10px 24px ${r.color}18`; e.currentTarget.style.borderColor = `${r.color}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'; e.currentTarget.style.borderColor = '#f1f5f9'; }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: r.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', color: r.color }}>
                    <Icon size={24} />
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#1e1b4b', marginBottom: '4px' }}>{r.title}</div>
                  <div style={{ fontSize: '11px', color: '#94a3b8' }}>{r.count}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

    </div>
  );
}

function TeacherIllustration() {
  return (
    <svg viewBox="0 0 480 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '480px', height: 'auto', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.15))' }}>
      {/* Background circle */}
      <circle cx="240" cy="200" r="190" fill="rgba(255,255,255,0.07)" />
      <circle cx="240" cy="200" r="150" fill="rgba(255,255,255,0.05)" />

      {/* Desk */}
      <rect x="80" y="280" width="320" height="16" rx="8" fill="#CABA61" opacity="0.9"/>
      <rect x="100" y="294" width="280" height="8" rx="4" fill="rgba(202,186,97,0.4)"/>

      {/* Laptop body */}
      <rect x="130" y="200" width="220" height="82" rx="10" fill="#1e1b4b"/>
      <rect x="136" y="206" width="208" height="70" rx="7" fill="#0f0c24"/>
      {/* Laptop screen content */}
      <rect x="148" y="215" width="90" height="8" rx="3" fill="rgba(255,255,255,0.15)"/>
      <rect x="148" y="228" width="60" height="6" rx="3" fill="rgba(202,186,97,0.5)"/>
      <rect x="148" y="239" width="80" height="6" rx="3" fill="rgba(255,255,255,0.1)"/>
      <rect x="250" y="215" width="82" height="54" rx="5" fill="rgba(124,58,237,0.3)"/>
      <circle cx="291" cy="239" r="14" fill="rgba(202,186,97,0.5)"/>
      <polygon points="286,233 298,239 286,246" fill="#CABA61"/>
      {/* Laptop hinge & base */}
      <rect x="120" y="280" width="240" height="10" rx="5" fill="#2d2a5a"/>
      <rect x="100" y="288" width="280" height="6" rx="3" fill="#1e1b4b"/>

      {/* Teacher figure */}
      {/* Body */}
      <rect x="195" y="155" width="90" height="110" rx="20" fill="#3A2048"/>
      {/* Shirt/tie detail */}
      <rect x="225" y="165" width="30" height="70" rx="6" fill="rgba(255,255,255,0.15)"/>
      <rect x="234" y="165" width="12" height="45" rx="4" fill="#CABA61" opacity="0.8"/>

      {/* Arms */}
      <rect x="155" y="165" width="45" height="22" rx="11" fill="#3A2048" transform="rotate(15 155 165)"/>
      <rect x="282" y="160" width="45" height="22" rx="11" fill="#3A2048" transform="rotate(-15 282 165)"/>

      {/* Head */}
      <circle cx="240" cy="130" r="44" fill="#FBBF24" opacity="0.9"/>
      <circle cx="240" cy="130" r="44" fill="#f9c66b"/>

      {/* Face features */}
      {/* Eyes */}
      <circle cx="226" cy="124" r="6" fill="#1e1b4b"/>
      <circle cx="254" cy="124" r="6" fill="#1e1b4b"/>
      <circle cx="228" cy="122" r="2" fill="white"/>
      <circle cx="256" cy="122" r="2" fill="white"/>
      {/* Smile */}
      <path d="M 226 138 Q 240 150 254 138" stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Hair */}
      <ellipse cx="240" cy="88" rx="40" ry="18" fill="#1e1b4b"/>
      <rect x="200" y="85" width="80" height="20" rx="10" fill="#1e1b4b"/>

      {/* Glasses */}
      <rect x="217" y="118" width="20" height="14" rx="6" fill="none" stroke="#1e1b4b" strokeWidth="2"/>
      <rect x="243" y="118" width="20" height="14" rx="6" fill="none" stroke="#1e1b4b" strokeWidth="2"/>
      <line x1="237" y1="125" x2="243" y2="125" stroke="#1e1b4b" strokeWidth="2"/>

      {/* Floating badges */}
      <rect x="30" y="120" width="100" height="44" rx="12" fill="white" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}/>
      <circle cx="50" cy="142" r="12" fill="rgba(124,58,237,0.1)"/>
      <text x="44" y="146" fontSize="12" fill="#7c3aed">★</text>
      <rect x="66" y="132" width="52" height="6" rx="3" fill="#1e1b4b"/>
      <rect x="66" y="143" width="38" height="5" rx="2.5" fill="#94a3b8"/>

      <rect x="348" y="90" width="108" height="44" rx="12" fill="white" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}/>
      <circle cx="368" cy="112" r="12" fill="rgba(16,185,129,0.1)"/>
      <text x="363" y="116" fontSize="11" fill="#10b981">✓</text>
      <rect x="384" y="102" width="56" height="6" rx="3" fill="#1e1b4b"/>
      <rect x="384" y="113" width="42" height="5" rx="2.5" fill="#94a3b8"/>

      <rect x="360" y="220" width="96" height="44" rx="12" fill="white" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.1))' }}/>
      <circle cx="378" cy="242" r="12" fill="rgba(202,186,97,0.15)"/>
      <text x="373" y="246" fontSize="11" fill="#CABA61">📈</text>
      <rect x="394" y="233" width="46" height="6" rx="3" fill="#1e1b4b"/>
      <rect x="394" y="244" width="34" height="5" rx="2.5" fill="#94a3b8"/>

      {/* Stars floating */}
      <circle cx="60" cy="200" r="6" fill="#CABA61" opacity="0.6"/>
      <circle cx="42" cy="230" r="4" fill="#7c3aed" opacity="0.5"/>
      <circle cx="430" cy="170" r="5" fill="#CABA61" opacity="0.5"/>
      <circle cx="415" cy="310" r="4" fill="#10b981" opacity="0.6"/>
    </svg>
  );
}
