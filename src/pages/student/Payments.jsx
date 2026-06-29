import React, { useState } from 'react';
import { CreditCard, Download, Search, CheckCircle, Clock, AlertCircle, Plus, ChevronRight, X, ShieldCheck } from 'lucide-react';

const paymentHistory = [
  { id: 1, course: 'SAT Math Mastery', amount: '$59.00', date: 'May 10, 2026', method: 'Visa •••• 4242', status: 'Completed', invoice: 'INV-2026-001' },
  { id: 2, course: 'IELTS Speaking Success', amount: '$49.00', date: 'May 12, 2026', method: 'Visa •••• 4242', status: 'Completed', invoice: 'INV-2026-002' },
  { id: 3, course: 'TOEFL iBT Complete Guide', amount: '$54.00', date: 'May 14, 2026', method: 'Mastercard •••• 8888', status: 'Completed', invoice: 'INV-2026-003' },
  { id: 4, course: 'GRE Quantitative Reasoning', amount: '$59.00', date: 'May 15, 2026', method: 'Visa •••• 4242', status: 'Completed', invoice: 'INV-2026-004' },
  { id: 5, course: 'Essay Writing Excellence', amount: '$49.00', date: 'May 18, 2026', method: 'Mastercard •••• 8888', status: 'Pending', invoice: 'INV-2026-005' },
];

const statusConfig = {
  Completed: { icon: CheckCircle, color: '#2BA84A', bg: 'rgba(43, 168, 74, 0.06)', border: 'rgba(43, 168, 74, 0.15)' },
  Pending: { icon: Clock, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.06)', border: 'rgba(245, 158, 11, 0.15)' },
  Failed: { icon: AlertCircle, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.06)', border: 'rgba(239, 68, 68, 0.15)' },
};

export default function Payments() {
  const [searchFilter, setSearchFilter] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  // Card details mock
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');

  const filtered = paymentHistory.filter(p =>
    p.course.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.invoice.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const totalSpent = paymentHistory
    .filter(p => p.status === 'Completed')
    .reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '')), 0);

  const handleDownloadInvoice = (id, invoice) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      alert(`Invoice ${invoice} downloaded as PDF successfully!`);
    }, 1500);
  };

  const handleSaveCard = (e) => {
    e.preventDefault();
    setLoadingPay(true);
    setTimeout(() => {
      setLoadingPay(false);
      setShowAddCard(false);
      alert('New Visa Card linked successfully for 1-click purchases.');
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="animate-fade-in">
      
      {/* Title Header */}
      <div style={{ textAlign: 'left', padding: '4px 0' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e0926', margin: '0 0 4px 0' }}>Billing & Payments</h2>
        <p style={{ fontSize: '12px', color: '#8c7f94', margin: 0, fontWeight: 500 }}>
          Manage subscriptions, invoices, and payment methods.
        </p>
      </div>

      {/* Credit Card Wallet Widget */}
      <div className="custom-home-card animate-fade-in" style={{
        padding: '16px',
        background: 'linear-gradient(135deg, #37123c 0%, #1e0926 100%)',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative circle */}
        <div style={{ position: 'absolute', right: '-40px', bottom: '-40px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'rgba(202,186,97,0.06)', pointerEvents: 'none' }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 2 }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Study Investment</span>
            <h3 style={{ fontSize: '24px', fontWeight: 900, margin: '2px 0 0 0', color: '#ffffff' }}>${totalSpent.toFixed(2)}</h3>
          </div>
          <CreditCard size={28} style={{ color: '#caba61' }} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', zIndex: 2 }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontSize: '8px', color: 'rgba(255,255,255,0.4)', fontWeight: 700, display: 'block' }}>PRIMARY PAYMENT METHOD</span>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff', marginTop: '2px', display: 'block' }}>Visa •••• 4242</span>
          </div>
          <button 
            onClick={() => setShowAddCard(true)}
            className="click-press"
            style={{
              padding: '6px 12px',
              borderRadius: '20px',
              backgroundColor: '#caba61',
              color: '#1e0926',
              border: 'none',
              fontSize: '10.5px',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            Manage Cards
          </button>
        </div>
      </div>

      {/* Styled Search Filter */}
      <div className="custom-home-search-bar" style={{ margin: 0 }}>
        <Search size={16} style={{ color: '#a095a8' }} />
        <input
          type="text"
          placeholder="Search course or invoice ID..."
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          style={{ fontSize: '13px' }}
        />
      </div>

      {/* Transactions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ textAlign: 'left', margin: '4px 0' }}>
          <h3 style={{ fontSize: '13px', fontWeight: 800, color: '#1e0926', margin: 0 }}>Transaction History</h3>
        </div>

        {filtered.length === 0 ? (
          <div className="custom-home-card" style={{ padding: '30px 20px', textAlign: 'center' }}>
            <CreditCard size={32} style={{ color: '#a095a8', marginBottom: '8px' }} />
            <h4 style={{ fontSize: '13px', fontWeight: 800 }}>No Transactions</h4>
            <p style={{ fontSize: '11px', color: '#8c7f94', margin: 0 }}>No invoices found matching your query.</p>
          </div>
        ) : (
          filtered.map((payment) => {
            const config = statusConfig[payment.status] || statusConfig.Completed;
            const StatusIcon = config.icon;
            const isInvoiceDownloading = downloadingId === payment.id;

            return (
              <div 
                key={payment.id} 
                className="custom-home-card click-press" 
                style={{
                  padding: '12px 14px', 
                  flexDirection: 'column',
                  gap: '12px',
                  alignItems: 'stretch',
                  border: '1.5px solid #f0ecf4'
                }}
              >
                {/* Row 1: Course name & Price */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px' }}>
                  <div style={{ textAlign: 'left', minWidth: 0 }}>
                    <h4 style={{ fontSize: '12.5px', fontWeight: 800, color: '#1e0926', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {payment.course}
                    </h4>
                    <span style={{ fontSize: '10px', color: '#8c7f94', fontWeight: 600, display: 'block', marginTop: '2px' }}>
                      {payment.date} • {payment.method}
                    </span>
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 900, color: '#1e0926' }}>
                    {payment.amount}
                  </span>
                </div>

                {/* Row 2: Status pill & Invoice download */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0ecf4', paddingTop: '10px' }}>
                  <span style={{
                    fontSize: '9.5px', 
                    fontWeight: 800, 
                    padding: '3px 8px', 
                    borderRadius: '6px',
                    backgroundColor: config.bg, 
                    color: config.color,
                    border: `1px solid ${config.border}`,
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '4px'
                  }}>
                    <StatusIcon size={10} /> {payment.status}
                  </span>

                  <button 
                    onClick={() => handleDownloadInvoice(payment.id, payment.invoice)}
                    disabled={isInvoiceDownloading}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#311442',
                      fontSize: '11px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px'
                    }}
                    className="click-press"
                  >
                    <Download size={12} /> {isInvoiceDownloading ? 'Saving...' : 'Receipt'}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add Payment Method Bottom Drawer */}
      {showAddCard && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(30, 9, 38, 0.75)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          zIndex: 99999,
        }} className="animate-fade-in">
          <div style={{
            width: '100%',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            padding: '20px',
            boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            textAlign: 'left'
          }}>
            <div style={{ width: '40px', height: '4px', backgroundColor: '#e8e2ee', borderRadius: '2px', alignSelf: 'center', margin: '-8px 0 4px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1e0926', margin: 0 }}>Add Payment Card</h3>
              <button 
                onClick={() => setShowAddCard(false)}
                style={{ width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#f0ecf4', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e0926', cursor: 'pointer' }}
              >
                <X size={12} />
              </button>
            </div>

            <form onSubmit={handleSaveCard} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#504156' }}>CARDHOLDER NAME</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Omar Hassan"
                  style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #f0ecf4', borderRadius: '8px', fontSize: '12.5px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '11px', fontWeight: 700, color: '#504156' }}>CARD NUMBER</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="text" 
                    required 
                    maxLength={19}
                    placeholder="4000 1234 5678 9010"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
                    style={{ width: '100%', padding: '10px 12px 10px 36px', border: '1.5px solid #f0ecf4', borderRadius: '8px', fontSize: '12.5px', outline: 'none' }}
                  />
                  <CreditCard size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#a095a8' }} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#504156' }}>EXPIRY DATE</label>
                  <input 
                    type="text" 
                    required 
                    maxLength={5}
                    placeholder="MM/YY"
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #f0ecf4', borderRadius: '8px', fontSize: '12.5px', outline: 'none', textAlign: 'center' }}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '11px', fontWeight: 700, color: '#504156' }}>SECURITY CODE (CVC)</label>
                  <input 
                    type="password" 
                    required 
                    maxLength={3}
                    placeholder="•••"
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #f0ecf4', borderRadius: '8px', fontSize: '12.5px', outline: 'none', textAlign: 'center' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#e2f4e8', padding: '8px 12px', borderRadius: '8px', marginTop: '4px' }}>
                <ShieldCheck size={14} style={{ color: '#2BA84A' }} />
                <span style={{ fontSize: '10px', color: '#2BA84A', fontWeight: 700 }}>PCI-DSS Compliant Encryption Standard</span>
              </div>

              <button
                type="submit"
                disabled={loadingPay}
                style={{
                  width: '100%',
                  padding: '12px 0',
                  borderRadius: '10px',
                  backgroundColor: '#311442',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  marginTop: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {loadingPay ? 'Connecting to Bank Gateway...' : 'Link Secure Card'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
