import React, { useState } from 'react';
import { Send, Search, MoreVertical, Phone, VideoIcon, Smile } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Dr. Ahmed Al-Hassan',
    role: 'SAT Math Instructor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
    online: true,
    lastSeen: 'Online',
    messages: [
      { id: 1, from: 'them', text: 'Hi Omar! Great progress on the practice test. You scored 85% which is a solid improvement.', time: '10:30 AM' },
      { id: 2, from: 'me', text: 'Thank you Dr. Ahmed! I practiced the two-pointer technique you recommended.', time: '10:32 AM' },
      { id: 3, from: 'them', text: 'Excellent! For tomorrow\'s session, please review Chapter 5 on Quadratic Equations. We\'ll be doing timed practice.', time: '10:35 AM' },
      { id: 4, from: 'me', text: 'Will do! Should I also review the formula sheet?', time: '10:36 AM' },
      { id: 5, from: 'them', text: 'Yes, that would be very helpful. Focus especially on the discriminant formula and completing the square method. See you tomorrow!', time: '10:38 AM' },
    ]
  },
  {
    id: 2,
    name: 'Ms. Sarah Johnson',
    role: 'IELTS Instructor',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
    online: false,
    lastSeen: '2 hours ago',
    messages: [
      { id: 1, from: 'them', text: 'Omar, I\'ve reviewed your Speaking Part 2 recording. Your fluency is improving!', time: 'Yesterday' },
      { id: 2, from: 'me', text: 'Thank you! I\'ve been practicing 30 mins daily.', time: 'Yesterday' },
      { id: 3, from: 'them', text: 'That\'s the spirit! Here are some tips: Try to use more linking words and vary your sentence structures.', time: 'Yesterday' },
    ]
  },
  {
    id: 3,
    name: 'Ms. Lisa Park',
    role: 'TOEFL Instructor',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100',
    online: true,
    lastSeen: 'Online',
    messages: [
      { id: 1, from: 'them', text: 'Hi Omar! Don\'t forget to submit your integrated writing assignment by Friday.', time: 'Mon' },
      { id: 2, from: 'me', text: 'Thanks for the reminder! I\'m almost done with it.', time: 'Mon' },
    ]
  },
];

export default function Messages() {
  const [activeConvo, setActiveConvo] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState({});
  const [searchFilter, setSearchFilter] = useState('');

  const getMessages = (convo) => {
    return [...convo.messages, ...(localMessages[convo.id] || [])];
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      from: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLocalMessages(prev => ({
      ...prev,
      [activeConvo.id]: [...(prev[activeConvo.id] || []), msg]
    }));
    setNewMessage('');
  };

  const filteredConvos = conversations.filter(c =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', height: 'calc(100vh - 140px)' }} className="animate-fade-in">
      <div className="smart-card messages-container" style={{ display: 'flex', flex: 1, padding: 0, overflow: 'hidden', minHeight: 0 }}>
        
        {/* Conversations Sidebar */}
        <div style={{
          width: '280px', minWidth: '280px', borderRight: '1px solid var(--border-color)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }} className="messages-sidebar">
          <div style={{ padding: '16px', borderBottom: '1px solid var(--border-color)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 12px 0', textAlign: 'left' }}>Messages</h3>
            <div style={{ position: 'relative' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                style={{ width: '100%', padding: '8px 10px 8px 30px', fontSize: '12px', borderRadius: '8px', border: '1px solid var(--border-color)' }}
              />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {filteredConvos.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setActiveConvo(convo)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px',
                  width: '100%', textAlign: 'left', cursor: 'pointer',
                  backgroundColor: activeConvo.id === convo.id ? 'rgba(58, 32, 72, 0.04)' : 'transparent',
                  borderLeft: activeConvo.id === convo.id ? '3px solid var(--primary-color)' : '3px solid transparent',
                  borderTop: 'none', borderBottom: '1px solid var(--border-color)', borderRight: 'none',
                  transition: 'all 0.15s'
                }}
              >
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <img src={convo.avatar} alt={convo.name} style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                  {convo.online && <span style={{ position: 'absolute', bottom: 0, right: 0, width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#2BA84A', border: '2px solid white' }}></span>}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{convo.name}</h4>
                  <p style={{ fontSize: '11px', color: 'var(--text-secondary)', margin: '2px 0 0 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{convo.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
          {/* Chat Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={activeConvo.avatar} alt={activeConvo.name} style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ textAlign: 'left' }}>
                <h4 style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{activeConvo.name}</h4>
                <span style={{ fontSize: '11px', color: activeConvo.online ? '#2BA84A' : 'var(--text-muted)' }}>{activeConvo.lastSeen}</span>
              </div>
            </div>
          </div>

          {/* Messages Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {getMessages(activeConvo).map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '70%', padding: '10px 14px', borderRadius: '14px',
                  backgroundColor: msg.from === 'me' ? '#3A2048' : 'var(--bg-app)',
                  color: msg.from === 'me' ? '#ffffff' : 'var(--text-primary)',
                  border: msg.from === 'me' ? 'none' : '1px solid var(--border-color)',
                  textAlign: 'left'
                }}>
                  <p style={{ fontSize: '13px', margin: 0, lineHeight: 1.5 }}>{msg.text}</p>
                  <span style={{ fontSize: '9px', color: msg.from === 'me' ? 'rgba(255,255,255,0.5)' : 'var(--text-muted)', display: 'block', marginTop: '4px', textAlign: 'right' }}>{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div style={{ padding: '14px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '24px', border: '1px solid var(--border-color)', fontSize: '13px' }}
            />
            <button
              onClick={handleSend}
              className="click-press"
              style={{
                width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#3A2048',
                color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: 'none', cursor: 'pointer', flexShrink: 0
              }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
