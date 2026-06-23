import React, { useState } from 'react';
import {
  User, Mail, Phone, MapPin, Globe, Briefcase, GraduationCap,
  Award, Shield, Camera, Save, Edit3, Languages, DollarSign, 
  Check, X
} from 'lucide-react';
import VerificationBadge from '../../components/VerificationBadge';

export default function TeacherProfile({ db, user }) {
  const teachers = db?.teachers || [];
  const myTeacher = teachers.find(t => t.email === user?.email) || teachers[0] || {};

  const [editing, setEditing] = useState(false);
  const [activeSection, setActiveSection] = useState('personal');
  const [form, setForm] = useState({
    name: myTeacher.name || '',
    email: myTeacher.email || '',
    phone: myTeacher.phone || '',
    location: myTeacher.location || '',
    bio: myTeacher.bio || '',
    specialty: myTeacher.specialty || '',
    qualification: 'Ph.D. in Mathematics',
    university: 'MIT',
    experience: '12 years',
    skills: (myTeacher.tags || []).join(', '),
    languages: 'English, Arabic',
    certifications: 'CELTA, DELTA',
    linkedin: 'linkedin.com/in/teacher',
    youtube: 'youtube.com/@teacher',
    website: 'teacher.com',
    bankName: 'Maybank',
    accountNumber: '****4567',
    hourlyRate: '45'
  });

  const sections = [
    { id: 'personal', name: 'Personal', icon: User },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'skills', name: 'Skills', icon: Award },
    { id: 'verification', name: 'Verification', icon: Shield },
    { id: 'bank', name: 'Bank Details', icon: DollarSign },
    { id: 'social', name: 'Social', icon: Globe }
  ];

  const handleSave = () => {
    setEditing(false);
    alert('Profile updated successfully!');
  };

  const renderField = (label, value, key, type = 'text') => (
    <div className="form-group" style={{ marginBottom: '14px' }}>
      <label style={{ fontSize: '11px', fontWeight: 700, color: '#8c7f94', marginBottom: '4px', display: 'block' }}>{label}</label>
      {editing ? (
        type === 'textarea' ? (
          <textarea value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))} rows={3}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px', resize: 'none', fontFamily: 'inherit' }}
          />
        ) : (
          <input type={type} value={form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
            style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1px solid var(--border-color)', fontSize: '12px' }}
          />
        )
      ) : (
        <p style={{ fontSize: '12.5px', fontWeight: 600, color: '#1e0926', margin: 0 }}>{value || '—'}</p>
      )}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)' }}>My Profile</h2>
          <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Manage your teaching profile and credentials</p>
        </div>
        <button onClick={() => editing ? handleSave() : setEditing(true)}
          className="btn-primary click-press"
          style={{ fontSize: '11px', padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {editing ? <><Check size={13} /> Save</> : <><Edit3 size={13} /> Edit</>}
        </button>
      </div>

      {/* Profile Card */}
      <div className="smart-card" style={{ padding: '20px', textAlign: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={user?.avatar || myTeacher.avatar} alt="Profile"
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #caba61' }}
          />
          {editing && (
            <button style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#37123c', color: '#fff', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={13} />
            </button>
          )}
        </div>
        <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>{myTeacher.name}</h3>
          <VerificationBadge status={myTeacher.verificationStatus} size={18} />
        </div>
        <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '2px' }}>{myTeacher.specialty}</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
          <VerificationBadge status={myTeacher.verificationStatus} size={14} showLabel />
        </div>
      </div>

      {/* Section Tabs */}
      <div className="hide-scrollbar" style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '4px' }}>
        {sections.map(s => {
          const Icon = s.icon;
          return (
            <button key={s.id} onClick={() => setActiveSection(s.id)}
              className="click-press"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer', border: 'none',
                backgroundColor: activeSection === s.id ? '#37123c' : '#f0ecf4',
                color: activeSection === s.id ? '#ffffff' : '#1e0926'
              }}
            >
              <Icon size={13} /> {s.name}
            </button>
          );
        })}
      </div>

      {/* Section Content */}
      <div className="smart-card" style={{ padding: '20px', textAlign: 'left' }}>
        {activeSection === 'personal' && (
          <>
            {renderField('Full Name', myTeacher.name, 'name')}
            {renderField('Email', myTeacher.email, 'email', 'email')}
            {renderField('Phone', myTeacher.phone, 'phone', 'tel')}
            {renderField('Location', myTeacher.location, 'location')}
            {renderField('Bio', myTeacher.bio, 'bio', 'textarea')}
            {renderField('Specialty', myTeacher.specialty, 'specialty')}
          </>
        )}
        {activeSection === 'education' && (
          <>
            {renderField('Highest Qualification', form.qualification, 'qualification')}
            {renderField('University', form.university, 'university')}
            {renderField('Years of Experience', form.experience, 'experience')}
          </>
        )}
        {activeSection === 'skills' && (
          <>
            {renderField('Skills & Tags', form.skills, 'skills')}
            {renderField('Languages', form.languages, 'languages')}
            {renderField('Certifications', form.certifications, 'certifications')}
          </>
        )}
        {activeSection === 'verification' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', padding: '20px 0' }}>
            <VerificationBadge status={myTeacher.verificationStatus} size={40} />
            <VerificationBadge status={myTeacher.verificationStatus} size={16} showLabel />
            <p style={{ fontSize: '12px', color: '#8c7f94', textAlign: 'center', maxWidth: '260px' }}>
              Your verification status is managed by platform administrators. Submit your documents to get verified.
            </p>
            <button className="btn-primary click-press" style={{ fontSize: '11px', padding: '10px 24px' }}>
              Upload Verification Documents
            </button>
          </div>
        )}
        {activeSection === 'bank' && (
          <>
            {renderField('Bank Name', form.bankName, 'bankName')}
            {renderField('Account Number', form.accountNumber, 'accountNumber')}
            {renderField('Hourly Rate ($)', form.hourlyRate, 'hourlyRate')}
          </>
        )}
        {activeSection === 'social' && (
          <>
            {renderField('LinkedIn', form.linkedin, 'linkedin')}
            {renderField('YouTube', form.youtube, 'youtube')}
            {renderField('Website', form.website, 'website')}
          </>
        )}
      </div>
    </div>
  );
}
