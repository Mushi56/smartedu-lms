import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, MoreVertical, Phone, Video, Smile, ArrowLeft, MessageSquare, Info, Calendar, User, ShieldAlert } from 'lucide-react';

const conversations = [
  {
    id: 1,
    name: 'Dr. Ahmed Al-Hassan',
    role: 'SAT Math Instructor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
    online: true,
    lastSeen: 'Active now',
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
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
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
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100',
    online: true,
    lastSeen: 'Active now',
    messages: [
      { id: 1, from: 'them', text: 'Hi Omar! Don\'t forget to submit your integrated writing assignment by Friday.', time: 'Mon' },
      { id: 2, from: 'me', text: 'Thanks for the reminder! I\'m almost done with it.', time: 'Mon' },
    ]
  },
];

export default function Messages() {
  const [selectedConvoId, setSelectedConvoId] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [localMessages, setLocalMessages] = useState({});
  const [searchFilter, setSearchFilter] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const messagesEndRef = useRef(null);
  const activeConvo = conversations.find(c => c.id === selectedConvoId);

  const getMessages = (convo) => {
    return convo ? [...convo.messages, ...(localMessages[convo.id] || [])] : [];
  };

  const handleSend = () => {
    if (!newMessage.trim() || !activeConvo) return;
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

  // Scroll to bottom when conversation changes or messages get added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedConvoId, localMessages]);

  const filteredConvos = conversations.filter(c =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.role.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // Quick reply options to simulate helpful features
  const quickReplies = [
    "I'm working on the assignment now.",
    "Can we reschedule our next class?",
    "Could you review my practice test?",
    "Thank you so much!"
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 'calc(100vh - 150px)', position: 'relative' }} className="animate-fade-in">
      
      {/* If no conversation selected: Show Conversations List */}
      {selectedConvoId === null ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
          {/* Header Title */}
          <div style={{ textAlign: 'left', padding: '4px 0' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1e0926', margin: '0 0 4px 0' }}>Messages</h2>
            <p style={{ fontSize: '12px', color: '#8c7f94', margin: 0, fontWeight: 500 }}>
              Chat with your course instructors and schedule online support.
            </p>
          </div>

          {/* Search Box */}
          <div className="custom-home-search-bar" style={{ margin: 0 }}>
            <Search size={16} style={{ color: '#a095a8' }} />
            <input
              type="text"
              placeholder="Search instructors or subjects..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              style={{ fontSize: '13px' }}
            />
          </div>

          {/* Conversations Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredConvos.length === 0 ? (
              <div className="custom-home-card" style={{ padding: '40px 20px', textAlign: 'center' }}>
                <MessageSquare size={32} style={{ color: '#a095a8', marginBottom: '8px' }} />
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1e0926' }}>No Conversations</h4>
                <p style={{ fontSize: '11px', color: '#8c7f94' }}>No active messaging threads match your search filter.</p>
              </div>
            ) : (
              filteredConvos.map((convo) => {
                const threadMessages = getMessages(convo);
                const lastMsg = threadMessages[threadMessages.length - 1];

                return (
                  <div
                    key={convo.id}
                    onClick={() => setSelectedConvoId(convo.id)}
                    className="custom-home-card click-press"
                    style={{
                      padding: '12px 14px',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: '12px',
                      cursor: 'pointer',
                      border: '1px solid #f0ecf4'
                    }}
                  >
                    {/* Avatar with dynamic indicator */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img 
                        src={convo.avatar} 
                        alt={convo.name} 
                        style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} 
                      />
                      {convo.online && (
                        <span style={{ 
                          position: 'absolute', 
                          bottom: '1px', 
                          right: '1px', 
                          width: '10px', 
                          height: '10px', 
                          borderRadius: '50%', 
                          backgroundColor: '#2BA84A', 
                          border: '2px solid #ffffff' 
                        }} />
                      )}
                    </div>

                    {/* Chat details */}
                    <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1e0926', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {convo.name}
                        </h4>
                        <span style={{ fontSize: '9px', color: '#a095a8', fontWeight: 700, flexShrink: 0 }}>
                          {lastMsg ? lastMsg.time : ''}
                        </span>
                      </div>
                      <span style={{ fontSize: '10px', color: '#8c7f94', fontWeight: 700, display: 'block', marginTop: '1px' }}>
                        {convo.role}
                      </span>
                      <p style={{ 
                        fontSize: '11px', 
                        color: '#504156', 
                        margin: '3px 0 0 0', 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis', 
                        whiteSpace: 'nowrap',
                        fontWeight: lastMsg?.from === 'them' ? 700 : 500
                      }}>
                        {lastMsg ? lastMsg.text : 'No messages yet'}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        /* Conversation Chat Window (Full Screen Mobile Sheet style) */
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          backgroundColor: '#ffffff', 
          zIndex: 9999, 
          display: 'flex', 
          flexDirection: 'column' 
        }}>
          {/* Chat Header */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            padding: '12px 16px', 
            borderBottom: '1.5px solid #f0ecf4', 
            backgroundColor: '#ffffff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
              <button
                onClick={() => {
                  setSelectedConvoId(null);
                  setShowOptions(false);
                }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1e0926', display: 'flex', alignItems: 'center', padding: '4px' }}
                className="click-press"
              >
                <ArrowLeft size={20} />
              </button>
              
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <img 
                  src={activeConvo.avatar} 
                  alt={activeConvo.name} 
                  style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                {activeConvo.online && (
                  <span style={{ 
                    position: 'absolute', 
                    bottom: 0, 
                    right: 0, 
                    width: '8px', 
                    height: '8px', 
                    borderRadius: '50%', 
                    backgroundColor: '#2BA84A', 
                    border: '1.5px solid #ffffff' 
                  }} />
                )}
              </div>

              <div style={{ textAlign: 'left', minWidth: 0 }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: '#1e0926', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {activeConvo.name}
                </h4>
                <span style={{ fontSize: '9.5px', color: activeConvo.online ? '#2BA84A' : '#a095a8', fontWeight: 600 }}>
                  {activeConvo.lastSeen}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', position: 'relative' }}>
              <button 
                onClick={() => alert(`Starting video consultation with ${activeConvo.name}...`)}
                style={{ background: 'none', border: 'none', color: '#311442', padding: '6px', cursor: 'pointer' }}
                className="click-press"
              >
                <Video size={18} />
              </button>
              <button 
                onClick={() => setShowOptions(!showOptions)}
                style={{ background: 'none', border: 'none', color: '#311442', padding: '6px', cursor: 'pointer' }}
                className="click-press"
              >
                <MoreVertical size={18} />
              </button>

              {/* Options Popover Menu */}
              {showOptions && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: '0',
                  width: '170px',
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  boxShadow: '0 4px 20px rgba(30,9,38,0.12)',
                  border: '1.5px solid #f0ecf4',
                  padding: '6px',
                  zIndex: 100000,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}>
                  {[
                    { label: 'Instructor Info', icon: User, action: () => alert(`Mentor: ${activeConvo.name}\nSubject: ${activeConvo.role}`) },
                    { label: 'Schedule 1-on-1', icon: Calendar, action: () => alert('Opening schedule calendar for live lesson booking...') },
                    { label: 'Clear History', icon: ShieldAlert, action: () => { if (confirm('Clear chat history?')) { setLocalMessages(p => ({ ...p, [activeConvo.id]: [] })); setShowOptions(false); } } }
                  ].map((opt, i) => {
                    const OptIcon = opt.icon;
                    return (
                      <button
                        key={i}
                        onClick={opt.action}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 10px',
                          width: '100%',
                          border: 'none',
                          background: 'none',
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#504156',
                          cursor: 'pointer',
                          borderRadius: '8px',
                          textAlign: 'left'
                        }}
                        className="click-press-light"
                      >
                        <OptIcon size={12} style={{ color: '#311442' }} />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Messages Thread Container */}
          <div style={{ 
            flex: 1, 
            overflowY: 'auto', 
            padding: '16px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '12px', 
            backgroundColor: '#faf9fc' 
          }}>
            <div style={{ textAlign: 'center', margin: '8px 0' }}>
              <span style={{ fontSize: '9px', fontWeight: 800, color: '#a095a8', backgroundColor: '#f0ecf4', padding: '3px 10px', borderRadius: '12px' }}>
                End-to-End Encrypted Support Room
              </span>
            </div>

            {getMessages(activeConvo).map((msg) => (
              <div 
                key={msg.id} 
                style={{ 
                  display: 'flex', 
                  justifyContent: msg.from === 'me' ? 'flex-end' : 'flex-start' 
                }}
              >
                <div style={{
                  maxWidth: '78%', 
                  padding: '10px 14px', 
                  borderRadius: msg.from === 'me' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                  backgroundColor: msg.from === 'me' ? '#311442' : '#ffffff',
                  color: msg.from === 'me' ? '#ffffff' : '#1e0926',
                  boxShadow: '0 2px 8px rgba(30,9,38,0.03)',
                  border: msg.from === 'me' ? 'none' : '1px solid #f0ecf4',
                  textAlign: 'left'
                }}>
                  <p style={{ fontSize: '12px', margin: 0, lineHeight: 1.4, fontWeight: 550 }}>
                    {msg.text}
                  </p>
                  <span style={{ 
                    fontSize: '8px', 
                    color: msg.from === 'me' ? 'rgba(255,255,255,0.6)' : '#a095a8', 
                    display: 'block', 
                    marginTop: '4px', 
                    textAlign: 'right',
                    fontWeight: 700
                  }}>
                    {msg.time}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies Tray */}
          <div style={{ 
            padding: '8px 12px', 
            backgroundColor: '#ffffff', 
            borderTop: '1px solid #f0ecf4',
            display: 'flex',
            gap: '6px',
            overflowX: 'auto',
            scrollbarWidth: 'none'
          }} className="hide-scrollbar">
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => {
                  setNewMessage(reply);
                }}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: '1.5px solid #f0ecf4',
                  backgroundColor: '#faf9fc',
                  color: '#504156',
                  fontSize: '10.5px',
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}
                className="click-press"
              >
                {reply}
              </button>
            ))}
          </div>

          {/* Messages Footer Input */}
          <div style={{ 
            padding: '10px 16px 20px 16px', 
            borderTop: '1.5px solid #f0ecf4', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: '#ffffff' 
          }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              style={{ 
                flex: 1, 
                padding: '10px 16px', 
                borderRadius: '24px', 
                border: '1.5px solid #f0ecf4', 
                fontSize: '12.5px', 
                outline: 'none',
                backgroundColor: '#faf9fc',
                color: '#1e0926',
                fontWeight: 550
              }}
            />
            <button
              onClick={handleSend}
              className="click-press"
              style={{
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                backgroundColor: '#311442',
                color: '#ffffff', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                border: 'none', 
                cursor: 'pointer', 
                flexShrink: 0
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
