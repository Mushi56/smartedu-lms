import React, { useState } from 'react';
import { CreditCard, DollarSign, Search, Filter, ChevronDown, Eye, RefreshCw, Download, CheckCircle, Clock, XCircle, ArrowUpRight, Package, User, BookOpen } from 'lucide-react';

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

const orders = [
  { id: '#ORD-2418', student: 'Omar Al-Farsi', email: 'omar@example.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', course: 'SAT Math Mastery', amount: '$89.00', date: 'Jun 22, 2026', status: 'Completed', method: 'Visa ****4242' },
  { id: '#ORD-2417', student: 'Aisha Mohammed', email: 'aisha@example.com', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80', course: 'IELTS Speaking Success', amount: '$72.00', date: 'Jun 22, 2026', status: 'Completed', method: 'PayPal' },
  { id: '#ORD-2416', student: 'James Park', email: 'james@example.com', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80', course: 'GRE Quantitative Reasoning', amount: '$95.00', date: 'Jun 21, 2026', status: 'Pending', method: 'Mastercard ****1234' },
  { id: '#ORD-2415', student: 'Fatima Al-Rashid', email: 'fatima@example.com', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80', course: 'TOEFL iBT Complete Guide', amount: '$68.00', date: 'Jun 20, 2026', status: 'Completed', method: 'Visa ****5678' },
  { id: '#ORD-2414', student: 'David Wilson', email: 'david@example.com', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80', course: 'Essay Writing Excellence', amount: '$55.00', date: 'Jun 19, 2026', status: 'Refunded', method: 'PayPal' },
  { id: '#ORD-2413', student: 'Nour Hassan', email: 'nour@example.com', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80', course: 'Arabic Language Basics', amount: '$42.00', date: 'Jun 18, 2026', status: 'Completed', method: 'Visa ****9900' },
];

const getStatusStyle = (status) => {
  switch (status) {
    case 'Completed': return { bg: 'rgba(16,185,129,0.08)', color: '#10b981', icon: CheckCircle };
    case 'Pending': return { bg: 'rgba(245,158,11,0.08)', color: '#f59e0b', icon: Clock };
    case 'Refunded': return { bg: 'rgba(239,68,68,0.08)', color: '#ef4444', icon: RefreshCw };
    default: return { bg: '#f5f3f9', color: 'var(--text-muted)', icon: Clock };
  }
};

export default function OrdersPayments() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const matchSearch = o.student.toLowerCase().includes(search.toLowerCase()) ||
                        o.course.toLowerCase().includes(search.toLowerCase()) ||
                        o.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const totalRevenue = orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + parseFloat(o.amount.replace('$', '')), 0);
  const totalRefunded = orders.filter(o => o.status === 'Refunded').reduce((sum, o) => sum + parseFloat(o.amount.replace('$', '')), 0);
  const pendingCount = orders.filter(o => o.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 2px 0' }}>Orders & Payments</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>Track transactions, refunds and payment history</p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
        {[
          { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
          { label: 'Pending', value: pendingCount, icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
          { label: 'Refunded', value: `$${totalRefunded}`, icon: RefreshCw, color: '#ef4444', bg: 'rgba(239,68,68,0.08)' },
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

      {/* Search */}
      <div style={{ position: 'relative' }}>
        <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input type="text" value={search} onChange={e => setSearch(e.target.value)} style={{ ...inputStyle, paddingLeft: '32px' }} placeholder="Search orders, students..." />
      </div>

      {/* Status filter pills */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto' }} className="hide-scrollbar">
        {['All', 'Completed', 'Pending', 'Refunded'].map(tab => {
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

      {/* Orders List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 && (
          <div style={{ ...cardStyle, alignItems: 'center', padding: '30px', textAlign: 'center' }}>
            <Package size={28} style={{ color: '#ede9f4' }} />
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>No orders found</p>
          </div>
        )}
        {filtered.map(order => {
          const statusStyle = getStatusStyle(order.status);
          const StatusIcon = statusStyle.icon;
          const isExpanded = expandedOrder === order.id;
          return (
            <div key={order.id} style={cardStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img src={order.avatar} alt={order.student} style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f5f3f9', flexShrink: 0 }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ minWidth: 0 }}>
                      <h4 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{order.student}</h4>
                      <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: '1px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.course}</p>
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', flexShrink: 0, marginLeft: '8px' }}>{order.amount}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '9px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: statusStyle.bg, color: statusStyle.color, display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <StatusIcon size={9} />
                    {order.status}
                  </span>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{order.id}</span>
                </div>
                <button onClick={() => setExpandedOrder(isExpanded ? null : order.id)} className="click-press"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontWeight: 600 }}>
                  <Eye size={12} /> Details
                </button>
              </div>

              {isExpanded && (
                <div style={{ background: '#faf9fc', borderRadius: '10px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '11px' }} className="animate-fade-in">
                  {[
                    { label: 'Order ID', value: order.id },
                    { label: 'Date', value: order.date },
                    { label: 'Payment Method', value: order.method },
                    { label: 'Student Email', value: order.email },
                  ].map((row, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                      <strong style={{ color: 'var(--text-primary)', textAlign: 'right' }}>{row.value}</strong>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
