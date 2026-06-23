import React, { useState } from 'react';
import { Star, MessageCircle, ThumbsUp, User } from 'lucide-react';

export default function TeacherReviews({ db, user }) {
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const reviews = [
    { id: 'r1', student: 'Aisha Al-Otaibi', avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=60', rating: 5, text: 'Excellent teaching style! The SAT course was incredibly well-structured.', date: 'Jun 18, 2026', course: 'SAT Math Mastery', reply: null },
    { id: 'r2', student: 'Khalid Mansoor', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60', rating: 4, text: 'Great content but could use more practice problems.', date: 'Jun 15, 2026', course: 'Python for Beginners', reply: 'Thank you Khalid! I will add more exercises in the next update.' },
    { id: 'r3', student: 'Maria Rodriguez', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=60', rating: 5, text: 'The IELTS speaking tips were game-changing. Got Band 8!', date: 'Jun 10, 2026', course: 'IELTS Speaking Guide', reply: null },
    { id: 'r4', student: 'James Anderson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=60', rating: 3, text: 'Some videos were too fast-paced for beginners.', date: 'Jun 5, 2026', course: 'SAT Math Mastery', reply: null }
  ];

  const avgRating = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);
  const distribution = [5, 4, 3, 2, 1].map(stars => ({ stars, count: reviews.filter(r => r.rating === stars).length }));

  const handleReply = (reviewId) => {
    if (replyText.trim()) {
      alert(`Reply sent to review ${reviewId}: "${replyText}"`);
      setReplyingTo(null);
      setReplyText('');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Reviews & Ratings</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>See what your students are saying</p>
      </div>

      {/* Rating Summary */}
      <div className="smart-card" style={{ padding: '20px', display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: '36px', fontWeight: 800, color: '#1e0926', display: 'block', lineHeight: 1 }}>{avgRating}</span>
          <div style={{ display: 'flex', gap: '2px', justifyContent: 'center', margin: '6px 0 4px 0' }}>
            {[1,2,3,4,5].map(s => <Star key={s} size={12} fill={s <= Math.round(avgRating) ? '#caba61' : 'none'} stroke={s <= Math.round(avgRating) ? '#caba61' : '#d1d5db'} />)}
          </div>
          <span style={{ fontSize: '10px', color: '#8c7f94' }}>{reviews.length} reviews</span>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {distribution.map(d => (
            <div key={d.stars} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#8c7f94', width: '12px' }}>{d.stars}</span>
              <div style={{ flex: 1, height: '5px', backgroundColor: '#f0ecf4', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${(d.count / reviews.length) * 100}%`, height: '100%', backgroundColor: '#caba61', borderRadius: '3px' }} />
              </div>
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#8c7f94', width: '16px' }}>{d.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews */}
      {reviews.map(review => (
        <div key={review.id} className="smart-card" style={{ padding: '16px', textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <img src={review.avatar} alt={review.student} style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '12px', fontWeight: 700 }}>{review.student}</span>
                <span style={{ fontSize: '9px', color: '#a095a8' }}>{review.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                {[1,2,3,4,5].map(s => <Star key={s} size={10} fill={s <= review.rating ? '#caba61' : 'none'} stroke={s <= review.rating ? '#caba61' : '#d1d5db'} />)}
                <span style={{ fontSize: '9px', color: '#8c7f94', marginLeft: '4px' }}>{review.course}</span>
              </div>
            </div>
          </div>
          <p style={{ fontSize: '12px', color: '#1e0926', lineHeight: 1.5, margin: '0 0 10px 0' }}>{review.text}</p>

          {review.reply && (
            <div style={{ backgroundColor: 'rgba(124,58,237,0.04)', border: '1px solid rgba(124,58,237,0.1)', borderRadius: '10px', padding: '10px 12px', marginBottom: '8px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, color: '#7c3aed', display: 'block', marginBottom: '4px' }}>Your Reply</span>
              <p style={{ fontSize: '11px', color: '#1e0926', margin: 0, lineHeight: 1.4 }}>{review.reply}</p>
            </div>
          )}

          {replyingTo === review.id ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Write a reply..."
                style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1px solid var(--border-color)', fontSize: '11px', resize: 'none', minHeight: '60px', fontFamily: 'inherit' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button onClick={() => handleReply(review.id)} className="btn-primary click-press" style={{ fontSize: '10px', padding: '6px 12px' }}>Send</button>
                <button onClick={() => { setReplyingTo(null); setReplyText(''); }} className="click-press" style={{ fontSize: '10px', padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'none', cursor: 'pointer' }}>Cancel</button>
              </div>
            </div>
          ) : (
            !review.reply && (
              <button onClick={() => setReplyingTo(review.id)} className="click-press"
                style={{ fontSize: '10px', fontWeight: 600, color: '#7c3aed', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
              >
                <MessageCircle size={12} /> Reply
              </button>
            )
          )}
        </div>
      ))}
    </div>
  );
}
