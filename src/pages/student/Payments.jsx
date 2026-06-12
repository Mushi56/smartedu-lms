import React, { useState } from 'react';
import { CreditCard, Download, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const paymentHistory = [
  { id: 1, course: 'SAT Math Mastery', amount: '$59.00', date: 'May 10, 2026', method: 'Visa •••• 4242', status: 'Completed', invoice: 'INV-2026-001' },
  { id: 2, course: 'IELTS Speaking Success', amount: '$49.00', date: 'May 12, 2026', method: 'Visa •••• 4242', status: 'Completed', invoice: 'INV-2026-002' },
  { id: 3, course: 'TOEFL iBT Complete Guide', amount: '$54.00', date: 'May 14, 2026', method: 'Mastercard •••• 8888', status: 'Completed', invoice: 'INV-2026-003' },
  { id: 4, course: 'GRE Quantitative Reasoning', amount: '$59.00', date: 'May 15, 2026', method: 'Visa •••• 4242', status: 'Completed', invoice: 'INV-2026-004' },
  { id: 5, course: 'Essay Writing Excellence', amount: '$49.00', date: 'May 18, 2026', method: 'Mastercard •••• 8888', status: 'Pending', invoice: 'INV-2026-005' },
];

const statusConfig = {
  Completed: { icon: CheckCircle, color: '#2BA84A', bg: 'rgba(43, 168, 74, 0.08)' },
  Pending: { icon: Clock, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
  Failed: { icon: AlertCircle, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' },
};

export default function Payments() {
  const [searchFilter, setSearchFilter] = useState('');

  const filtered = paymentHistory.filter(p =>
    p.course.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.invoice.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const totalSpent = paymentHistory
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '')), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ textAlign: 'left' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700 }}>Payments & Billing</h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Manage your transactions and download invoices</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="smart-card" style={{ padding: '20px', textAlign: 'left' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Spent</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0 0 0' }}>${totalSpent.toFixed(2)}</h3>
        </div>
        <div className="smart-card" style={{ padding: '20px', textAlign: 'left' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Courses Purchased</span>
          <h3 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '8px 0 0 0' }}>{paymentHistory.length}</h3>
        </div>
        <div className="smart-card" style={{ padding: '20px', textAlign: 'left' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment Method</span>
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '8px 0 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} /> Visa •••• 4242
          </h3>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by course or invoice..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{ width: '100%', padding: '8px 12px 8px 34px', fontSize: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
          />
        </div>
      </div>

      {/* Transactions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((payment) => {
          const config = statusConfig[payment.status] || statusConfig.Completed;
          const StatusIcon = config.icon;
          return (
            <div key={payment.id} className="smart-card" style={{
              padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: 0 }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '10px', backgroundColor: 'rgba(58, 32, 72, 0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                }}>
                  <CreditCard size={20} style={{ color: '#3A2048' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{payment.course}</h4>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginTop: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{payment.date}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{payment.method}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{payment.invoice}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
                <span style={{
                  fontSize: '11px', fontWeight: 600, padding: '4px 10px', borderRadius: '6px',
                  backgroundColor: config.bg, color: config.color,
                  display: 'flex', alignItems: 'center', gap: '4px'
                }}>
                  <StatusIcon size={12} /> {payment.status}
                </span>
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{payment.amount}</span>
                <button className="click-press" style={{
                  display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '6px',
                  backgroundColor: 'rgba(58, 32, 72, 0.06)', color: 'var(--primary-color)',
                  fontSize: '11px', fontWeight: 600, border: 'none', cursor: 'pointer'
                }}>
                  <Download size={12} /> Invoice
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
