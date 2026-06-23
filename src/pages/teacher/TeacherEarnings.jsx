import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock, ArrowUpRight, Download, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function TeacherEarnings({ db, user }) {
  const teachers = db?.teachers || [];
  const myTeacher = teachers.find(t => t.email === user?.email) || teachers[0] || {};
  const [activeTab, setActiveTab] = useState('overview');

  const monthlyData = [
    { month: 'Jan', amount: 1800 }, { month: 'Feb', amount: 2200 }, { month: 'Mar', amount: 2650 },
    { month: 'Apr', amount: 3100 }, { month: 'May', amount: 2800 }, { month: 'Jun', amount: myTeacher.monthlyRevenue || 3200 }
  ];
  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '18px', fontWeight: 800 }}>Earnings</h2>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Track your revenue and payouts</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
        <div className="smart-card" style={{ padding: '14px', textAlign: 'center' }}>
          <DollarSign size={18} style={{ color: '#22c55e', marginBottom: '4px' }} />
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e0926', display: 'block' }}>${(myTeacher.revenue || 0).toLocaleString()}</span>
          <span style={{ fontSize: '8px', fontWeight: 600, color: '#8c7f94' }}>Total Revenue</span>
        </div>
        <div className="smart-card" style={{ padding: '14px', textAlign: 'center' }}>
          <TrendingUp size={18} style={{ color: '#3b82f6', marginBottom: '4px' }} />
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e0926', display: 'block' }}>${(myTeacher.monthlyRevenue || 0).toLocaleString()}</span>
          <span style={{ fontSize: '8px', fontWeight: 600, color: '#8c7f94' }}>This Month</span>
        </div>
        <div className="smart-card" style={{ padding: '14px', textAlign: 'center' }}>
          <Clock size={18} style={{ color: '#eab308', marginBottom: '4px' }} />
          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1e0926', display: 'block' }}>${(myTeacher.pendingPayout || 0).toLocaleString()}</span>
          <span style={{ fontSize: '8px', fontWeight: 600, color: '#8c7f94' }}>Pending</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px' }}>
        {['overview', 'payouts'].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} className="click-press"
            style={{ padding: '8px 16px', borderRadius: '16px', fontSize: '11px', fontWeight: 700, border: 'none', cursor: 'pointer',
              backgroundColor: activeTab === t ? '#37123c' : '#f0ecf4', color: activeTab === t ? '#fff' : '#1e0926'
            }}
          >{t === 'overview' ? 'Revenue Chart' : 'Payout History'}</button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="smart-card" style={{ padding: '20px', textAlign: 'left' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>Monthly Revenue (2026)</h4>
          {/* Simple bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '120px' }}>
            {monthlyData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '8px', fontWeight: 700, color: '#1e0926' }}>${(d.amount / 1000).toFixed(1)}k</span>
                <div style={{
                  width: '100%', maxWidth: '32px', borderRadius: '6px 6px 2px 2px',
                  height: `${(d.amount / maxAmount) * 90}px`,
                  background: i === monthlyData.length - 1 ? 'linear-gradient(180deg, #caba61, #37123c)' : 'linear-gradient(180deg, #e0d9e6, #c4bcd0)',
                  transition: 'height 0.5s ease'
                }} />
                <span style={{ fontSize: '9px', fontWeight: 600, color: '#8c7f94' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'payouts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {/* Withdraw button */}
          <button className="btn-primary click-press" style={{ width: '100%', fontSize: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            onClick={() => alert('Withdraw request submitted!')}
          >
            <DollarSign size={14} /> Request Withdrawal — ${(myTeacher.pendingPayout || 0).toLocaleString()}
          </button>

          {/* Payout history */}
          {(myTeacher.payouts || []).map(p => (
            <div key={p.id} className="smart-card" style={{ padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: p.status === 'completed' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)'
              }}>
                {p.status === 'completed' ? <CheckCircle size={16} style={{ color: '#22c55e' }} /> : <AlertCircle size={16} style={{ color: '#eab308' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e0926', display: 'block' }}>${p.amount.toLocaleString()}</span>
                <span style={{ fontSize: '10px', color: '#8c7f94' }}>{p.date}</span>
              </div>
              <span style={{
                fontSize: '9px', fontWeight: 700, padding: '3px 10px', borderRadius: '10px',
                color: p.status === 'completed' ? '#22c55e' : '#eab308',
                backgroundColor: p.status === 'completed' ? 'rgba(34,197,94,0.1)' : 'rgba(234,179,8,0.1)'
              }}>
                {p.status === 'completed' ? 'Paid' : 'Pending'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
