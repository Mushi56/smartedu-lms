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

  const premiumCard = {
    background: 'var(--bg-card)',
    borderRadius: '20px',
    border: '1px solid var(--border-subtle)',
    boxShadow: 'var(--shadow-premium)',
    padding: '16px',
    position: 'relative'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }} className="animate-fade-in">
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 4px 0', letterSpacing: '-0.5px' }}>Earnings Center</h2>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0, fontWeight: 550 }}>Track your revenue and request payouts</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
        {[
          { label: 'Total Revenue', value: (myTeacher.revenue || 0).toLocaleString(), color: '#10b981', bg: 'rgba(16,185,129,0.06)', icon: DollarSign },
          { label: 'This Month', value: (myTeacher.monthlyRevenue || 0).toLocaleString(), color: '#3b82f6', bg: 'rgba(59,130,246,0.06)', icon: TrendingUp },
          { label: 'Pending Payout', value: (myTeacher.pendingPayout || 0).toLocaleString(), color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', icon: Clock }
        ].map(s => {
          const Icon = s.icon;
          return (
            <div key={s.label} style={{
              ...premiumCard,
              padding: '14px 10px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: s.bg, color: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '4px'
              }}>
                <Icon size={16} />
              </div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>${s.value}</div>
              <div style={{ fontSize: '10px', color: 'var(--text-secondary)', fontWeight: 700 }}>{s.label}</div>
            </div>
          );
        })}
      </div>

      {/* Selector Tabs */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        background: '#f1f5f9', 
        borderRadius: '20px', 
        padding: '4px',
        border: '1px solid rgba(0,0,0,0.02)'
      }}>
        <button
          onClick={() => setActiveTab('overview')}
          className="click-press"
          style={{
            padding: '8px 0',
            borderRadius: '16px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            backgroundColor: activeTab === 'overview' ? '#fff' : 'transparent',
            color: activeTab === 'overview' ? 'var(--primary-color)' : 'var(--text-secondary)',
            boxShadow: activeTab === 'overview' ? '0 4px 10px rgba(0,0,0,0.04)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          Revenue Chart
        </button>
        <button
          onClick={() => setActiveTab('payouts')}
          className="click-press"
          style={{
            padding: '8px 0',
            borderRadius: '16px',
            border: 'none',
            fontSize: '12px',
            fontWeight: 800,
            cursor: 'pointer',
            backgroundColor: activeTab === 'payouts' ? '#fff' : 'transparent',
            color: activeTab === 'payouts' ? 'var(--primary-color)' : 'var(--text-secondary)',
            boxShadow: activeTab === 'payouts' ? '0 4px 10px rgba(0,0,0,0.04)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          Payout History
        </button>
      </div>

      {/* Revenue Graph view */}
      {activeTab === 'overview' && (
        <div style={{ ...premiumCard, padding: '20px' }}>
          <h4 style={{ fontSize: '13px', fontWeight: 800, marginBottom: '20px', color: 'var(--text-primary)' }}>Monthly Revenue (2026)</h4>
          {/* Elegant bar chart */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '12px', height: '140px', paddingBottom: '10px' }}>
            {monthlyData.map((d, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '9px', fontWeight: 800, color: 'var(--text-primary)' }}>${(d.amount / 1000).toFixed(1)}k</span>
                <div style={{
                  width: '100%', 
                  maxWidth: '36px', 
                  borderRadius: '8px 8px 3px 3px',
                  height: `${(d.amount / maxAmount) * 100}px`,
                  background: i === monthlyData.length - 1 
                    ? 'linear-gradient(180deg, #3b82f6 0%, #1d4ed8 100%)' 
                    : 'linear-gradient(180deg, rgba(99,102,241,0.2) 0%, rgba(99,102,241,0.05) 100%)',
                  transition: 'height 0.5s ease'
                }} />
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--text-secondary)' }}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Payout History view */}
      {activeTab === 'payouts' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Withdraw button */}
          <button 
            className="click-press" 
            style={{ 
              width: '100%', fontSize: '12px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              border: 'none', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: '#ffffff',
              borderRadius: '16px', fontWeight: 800, cursor: 'pointer', boxShadow: '0 4px 12px rgba(16,185,129,0.2)'
            }}
            onClick={() => alert('Withdraw request submitted!')}
          >
            <DollarSign size={14} /> Request Payout — ${(myTeacher.pendingPayout || 0).toLocaleString()}
          </button>

          {/* Payout list items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(myTeacher.payouts || []).map(p => (
              <div key={p.id} style={{ ...premiumCard, padding: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: p.status === 'completed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)',
                  color: p.status === 'completed' ? '#10b981' : '#f59e0b'
                }}>
                  {p.status === 'completed' ? <CheckCircle size={16} fill="none" /> : <AlertCircle size={16} fill="none" />}
                </div>
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <span style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-primary)', display: 'block' }}>${p.amount.toLocaleString()}</span>
                  <span style={{ fontSize: '10.5px', color: 'var(--text-secondary)', fontWeight: 550 }}>{p.date}</span>
                </div>
                <span style={{
                  fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '10px',
                  color: p.status === 'completed' ? '#10b981' : '#f59e0b',
                  backgroundColor: p.status === 'completed' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)'
                }}>
                  {p.status === 'completed' ? 'Paid' : 'Pending'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
