import React, { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, Search, MessageSquare, CheckCircle, XCircle, Clock, Flag, Eye, ChevronDown } from 'lucide-react';

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

const reviewsData = [
  { id: 1, student: 'Omar Al-Farsi', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', course: 'SAT Math Mastery', rating: 5, comment: 'Absolutely incredible course! Dr. Ahmed explains everything so clearly. My score went from 1050 to 1420 in just 2 months!', date: 'Jun 22', status: 'Published', helpful: 32 },
  { id: 2, student: 'Aisha Mohammed', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', course: 'IELTS Speaking Success', rating: 4, comment: 'Very helpful course. Ms. Sarah is a fantastic instructor. I got Band 7.5 which is beyond what I expected!', date: 'Jun 21', status: 'Published', helpful: 18 },
  { id: 3, student: 'James Park', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', course: 'GRE Quantitative Reasoning', rating: 3, comment: 'Good content overall but the pace could be a bit slower. Some advanced topics need more examples.', date: 'Jun 20', status: 'Pending', helpful: 7 },
  { id: 4, student: 'Fatima Al-Rashid', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', course: 'TOEFL iBT Complete Guide', rating: 5, comment: 'Best TOEFL prep I have ever used. The practice tests are very close to the real exam. Highly recommended!', date: 'Jun 19', status: 'Published', helpful: 44 },
  { id: 5, student: 'David Wilson', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80', course: 'Essay Writing Excellence', rating: 2, comment: 'Not what I expected. The content felt rushed and the feedback on assignments was minimal. Needs improvement.', date: 'Jun 18', status: 'Flagged', helpful: 2 },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Published': return { bg: 'rgba(16,185,129,0.08)', color: '#10b981' };
    case 'Pending': return { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b' };
    case 'Flagged': return { bg: 'rgba(239,68,68,0.08)', color: '#ef4444' };
    default: return { bg: '#f5f3f9', color: 'var(--text-muted)' };
  }
};

const StarRating = ({ rating, size = 12 }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {[1, 2, 3, 4, 5].map(i => (
      <Star key={i} size={size} fill={i <= rating ? '#f59e0b' : 'transparent'} style={{ color: i <= rating ? '#f59e0b' : '#ede9f4' }} />
    ))}
  </div>
);

export default function ReviewsPage() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [localStatuses, setLocalStatuses] = useState({});

  const getStatus = (review) => localStatuses[review.id] || review.status;

  const filtered = reviewsData.filter(r => {
    const status = getStatus(r);
    const matchStatus = filterStatus === 'All' || status === filterStatus;
    const matchSearch = r.student.toLowerCase().includes(search.toLowerCase()) ||
                        r.course.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const avgRating = (reviewsData.reduce((sum, r) => sum + r.rating, 0) / reviewsData.length).toFixed(1);
  const publishedCount = reviewsData.filter(r => (localStatuses[r.id] || r.status) === 'Published').length;
  const pendingCount = reviewsData.filter(r => (localStatuses[r.id] || r.status) === 'Pending').length;

  const handleApprove = (id) => setLocalStatuses(prev => ({ ...prev, [id]: 'Published' }));
  const handleReject = (id) => setLocalStatuses(prev => ({ ...prev, [id]: 'Flagged' }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Reviews & Feedback</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Moderate student reviews across all courses</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Avg Rating', value: avgRating, icon: Star, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
          { label: 'Published', value: publishedCount, icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Pending', value: pendingCount, icon: Clock, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
        ].map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} style={{ ...cardStyle, padding: '12px', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={13} style={{ color: st.color }} />
              </div>
              <span style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{st.value}</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)' }}>{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Overall rating bar */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: '36px', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1 }}>{avgRating}</span>
            <StarRating rating={Math.round(parseFloat(avgRating))} size={14} />
            <span style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '2px', display: 'block' }}>{reviewsData.length} reviews</span>
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[5, 4, 3, 2, 1].map(star => {
              const count = reviewsData.filter(r => r.rating === star).length;
              const pct = (count / reviewsData.length) * 100;
              return (
                <div key={star} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', width: '6px' }}>{star}</span>
                  <Star size={8} fill="#f59e0b" style={{ color: '#f59e0b', flexShrink: 0 }} />
                  <div style={{ flex: 1, height: '6px', borderRadius: '3px', background: '#f5f3f9' }}>
                    <div style={{ height: '100%', borderRadius: '3px', background: '#f59e0b', width: `${pct}%` }} />
                  </div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', width: '12px' }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: '32px' }} placeholder="Search reviews..." />
      </div>

      {/* Filter pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }} className="hide-scrollbar">
        {['All', 'Published', 'Pending', 'Flagged'].map(tab => {
          const isActive = filterStatus === tab;
          return (
            <button key={tab} onClick={() => setFilterStatus(tab)} className="click-press"
              style={{ flexShrink: 0, padding: '6px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, cursor: 'pointer',
                border: isActive ? 'none' : '1px solid #ede9f4',
                background: isActive ? 'var(--primary-color)' : '#fff',
                color: isActive ? '#fff' : 'var(--text-secondary)'
              }}>
              {tab}
            </button>
          );
        })}
      </div>

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map(review => {
          const status = getStatus(review);
          const statusStyle = getStatusStyle(status);
          return (
            <div key={review.id} style={cardStyle}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={review.avatar} alt={review.student} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f5f3f9', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{review.student}</h4>
                    <span style={{ fontSize: '9px', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: statusStyle.bg, color: statusStyle.color }}>{status}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <StarRating rating={review.rating} />
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{review.date}</span>
                  </div>
                </div>
              </div>

              {/* Course tag */}
              <span style={{ fontSize: '10px', fontWeight: 600, color: 'var(--primary-color)', background: 'var(--primary-glow)', padding: '3px 8px', borderRadius: '6px', alignSelf: 'flex-start' }}>
                {review.course}
              </span>

              {/* Comment */}
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{review.comment}</p>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f5f3f9', paddingTop: '8px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ThumbsUp size={10} /> {review.helpful} found helpful
                </span>
                {status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button onClick={() => handleReject(review.id)} className="click-press"
                      style={{ padding: '5px 10px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.15)', fontSize: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <XCircle size={10} /> Reject
                    </button>
                    <button onClick={() => handleApprove(review.id)} className="click-press"
                      style={{ padding: '5px 10px', borderRadius: '8px', background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.15)', fontSize: '10px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <CheckCircle size={10} /> Approve
                    </button>
                  </div>
                )}
                {status === 'Flagged' && (
                  <button onClick={() => handleApprove(review.id)} className="click-press"
                    style={{ padding: '5px 10px', borderRadius: '8px', background: 'rgba(16,185,129,0.08)', color: '#10b981', border: '1px solid rgba(16,185,129,0.15)', fontSize: '10px', fontWeight: 700, cursor: 'pointer' }}>
                    Restore
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
