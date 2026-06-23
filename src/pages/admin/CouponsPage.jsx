import React, { useState } from 'react';
import { Ticket, Plus, Trash2, Edit3, X, Check, Copy, Tag, Percent, DollarSign, Clock, Users, CheckCircle } from 'lucide-react';

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

const initialCoupons = [
  { id: 'cp-1', code: 'SUMMER25', type: 'Percentage', value: 25, minPurchase: '$50', usageLimit: 100, usedCount: 67, expiresAt: 'Jul 31, 2026', status: 'Active', courses: 'All Courses' },
  { id: 'cp-2', code: 'NEWSTUDENT', type: 'Percentage', value: 15, minPurchase: '$30', usageLimit: 500, usedCount: 312, expiresAt: 'Dec 31, 2026', status: 'Active', courses: 'All Courses' },
  { id: 'cp-3', code: 'SAT30OFF', type: 'Fixed', value: 30, minPurchase: '$80', usageLimit: 50, usedCount: 50, expiresAt: 'Jun 15, 2026', status: 'Expired', courses: 'SAT Math Mastery' },
  { id: 'cp-4', code: 'IELTS20', type: 'Percentage', value: 20, minPurchase: '$60', usageLimit: 200, usedCount: 89, expiresAt: 'Aug 31, 2026', status: 'Active', courses: 'IELTS Speaking' },
];

export default function CouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [copied, setCopied] = useState(null);

  // Form state
  const [code, setCode] = useState('');
  const [type, setType] = useState('Percentage');
  const [value, setValue] = useState('');
  const [minPurchase, setMinPurchase] = useState('');
  const [usageLimit, setUsageLimit] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [courses, setCourses] = useState('All Courses');

  const resetForm = () => { setCode(''); setType('Percentage'); setValue(''); setMinPurchase(''); setUsageLimit(''); setExpiresAt(''); setCourses('All Courses'); setEditingId(null); setShowForm(false); };

  const handleSave = (e) => {
    e.preventDefault();
    if (!code.trim() || !value) return;
    const newCoupon = {
      id: editingId || `cp-${Date.now()}`,
      code: code.toUpperCase(), type, value: parseFloat(value),
      minPurchase: minPurchase ? `$${minPurchase}` : 'None',
      usageLimit: parseInt(usageLimit) || 0, usedCount: editingId ? coupons.find(c => c.id === editingId)?.usedCount || 0 : 0,
      expiresAt, status: 'Active', courses
    };
    if (editingId) {
      setCoupons(prev => prev.map(c => c.id === editingId ? newCoupon : c));
    } else {
      setCoupons(prev => [newCoupon, ...prev]);
    }
    resetForm();
  };

  const startEdit = (coupon) => {
    setEditingId(coupon.id); setCode(coupon.code); setType(coupon.type);
    setValue(coupon.value.toString()); setMinPurchase(coupon.minPurchase.replace('$', ''));
    setUsageLimit(coupon.usageLimit.toString()); setExpiresAt(coupon.expiresAt);
    setCourses(coupon.courses); setShowForm(true);
  };

  const handleDelete = (id) => setCoupons(prev => prev.filter(c => c.id !== id));

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  const activeCoupons = coupons.filter(c => c.status === 'Active').length;
  const totalSavings = coupons.reduce((sum, c) => sum + (c.type === 'Fixed' ? c.value * c.usedCount : 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Coupons & Promotions</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Manage discount codes and promotional campaigns</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Total Coupons', value: coupons.length, icon: Ticket, color: '#6366f1', bg: 'rgba(99,102,241,0.08)' },
          { label: 'Active', value: activeCoupons, icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Total Redeemed', value: coupons.reduce((s, c) => s + c.usedCount, 0), icon: Users, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
        ].map((st, i) => {
          const Icon = st.icon;
          return (
            <div key={i} style={{ ...cardStyle, padding: '12px', alignItems: 'center', textAlign: 'center', gap: '6px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: st.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={13} style={{ color: st.color }} />
              </div>
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>{st.value}</span>
              <span style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-muted)' }}>{st.label}</span>
            </div>
          );
        })}
      </div>

      {/* Add Button / Form */}
      {!showForm ? (
        <button onClick={() => { resetForm(); setShowForm(true); }} className="click-press"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: 'var(--primary-gradient)', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', width: '100%' }}>
          <Plus size={14} /> Create New Coupon
        </button>
      ) : (
        <div style={cardStyle} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Ticket size={14} style={{ color: 'var(--primary-color)' }} />
              {editingId ? 'Edit Coupon' : 'New Coupon'}
            </h4>
            <button onClick={resetForm} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}>
              <X size={16} />
            </button>
          </div>

          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Coupon Code *</label>
                <input type="text" value={code} onChange={e => setCode(e.target.value.toUpperCase())} style={inputStyle} placeholder="e.g. SAVE20" required />
              </div>
              <div>
                <label style={labelStyle}>Discount Type</label>
                <select value={type} onChange={e => setType(e.target.value)} style={inputStyle}>
                  <option>Percentage</option><option>Fixed</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Discount Value *</label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '13px' }}>{type === 'Percentage' ? '%' : '$'}</span>
                  <input type="number" value={value} onChange={e => setValue(e.target.value)} style={{ ...inputStyle, paddingLeft: '24px' }} placeholder="20" min="1" required />
                </div>
              </div>
              <div>
                <label style={labelStyle}>Min. Purchase ($)</label>
                <input type="number" value={minPurchase} onChange={e => setMinPurchase(e.target.value)} style={inputStyle} placeholder="50" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label style={labelStyle}>Usage Limit</label>
                <input type="number" value={usageLimit} onChange={e => setUsageLimit(e.target.value)} style={inputStyle} placeholder="100" />
              </div>
              <div>
                <label style={labelStyle}>Expires (date)</label>
                <input type="text" value={expiresAt} onChange={e => setExpiresAt(e.target.value)} style={inputStyle} placeholder="Dec 31, 2026" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Applicable Courses</label>
              <select value={courses} onChange={e => setCourses(e.target.value)} style={inputStyle}>
                <option>All Courses</option><option>SAT Math Mastery</option><option>IELTS Speaking</option><option>TOEFL Complete Guide</option><option>GRE Quantitative</option>
              </select>
            </div>

            <button type="submit" className="click-press"
              style={{ width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: 'var(--primary-gradient)', color: '#fff', fontWeight: 700, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Check size={14} /> {editingId ? 'Update Coupon' : 'Create Coupon'}
            </button>
          </form>
        </div>
      )}

      {/* Coupons List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {coupons.map(coupon => {
          const isActive = coupon.status === 'Active';
          const usagePct = coupon.usageLimit > 0 ? (coupon.usedCount / coupon.usageLimit) * 100 : 0;
          return (
            <div key={coupon.id} style={{ ...cardStyle, borderLeft: `4px solid ${isActive ? '#10b981' : '#94a3b8'}` }}>
              {/* Code row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <code style={{ fontSize: '14px', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '1px', background: '#f5f3f9', padding: '4px 10px', borderRadius: '8px', border: '1px dashed #ede9f4' }}>
                    {coupon.code}
                  </code>
                  <button onClick={() => handleCopy(coupon.code)} className="click-press"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === coupon.code ? '#10b981' : 'var(--text-muted)', padding: '2px' }}>
                    {copied === coupon.code ? <CheckCircle size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <span style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px',
                  background: isActive ? 'rgba(16,185,129,0.08)' : 'rgba(148,163,184,0.1)',
                  color: isActive ? '#10b981' : '#94a3b8' }}>
                  {coupon.status}
                </span>
              </div>

              {/* Discount info */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '10px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: 'rgba(99,102,241,0.08)', color: '#6366f1', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  {coupon.type === 'Percentage' ? <Percent size={9} /> : <DollarSign size={9} />}
                  {coupon.value}{coupon.type === 'Percentage' ? '%' : ''} off
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Tag size={9} /> {coupon.courses}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <Clock size={9} /> {coupon.expiresAt}
                </span>
              </div>

              {/* Usage bar */}
              {coupon.usageLimit > 0 && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '4px' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>{coupon.usedCount}/{coupon.usageLimit} used</span>
                    <span style={{ color: usagePct >= 90 ? '#ef4444' : '#10b981', fontWeight: 700 }}>{Math.round(usagePct)}%</span>
                  </div>
                  <div style={{ height: '4px', borderRadius: '2px', background: '#f5f3f9' }}>
                    <div style={{ height: '100%', borderRadius: '2px', background: usagePct >= 90 ? '#ef4444' : '#10b981', width: `${Math.min(usagePct, 100)}%` }} />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', gap: '6px', borderTop: '1px solid #f5f3f9', paddingTop: '8px' }}>
                <button onClick={() => startEdit(coupon)} className="click-press"
                  style={{ flex: 1, padding: '6px', borderRadius: '8px', background: 'var(--primary-glow)', color: 'var(--primary-color)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '11px', fontWeight: 600 }}>
                  <Edit3 size={11} /> Edit
                </button>
                <button onClick={() => handleDelete(coupon.id)} className="click-press"
                  style={{ flex: 1, padding: '6px', borderRadius: '8px', background: 'rgba(239,68,68,0.06)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '11px', fontWeight: 600 }}>
                  <Trash2 size={11} /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
