import React, { useState } from 'react';
import { Notebook, BookOpen, ChevronDown, ChevronRight, FileText, Sparkles, Clock } from 'lucide-react';

const courseNotes = [
  {
    id: 1,
    course: 'SAT Math Mastery',
    teacher: 'Dr. Ahmed Al-Hassan',
    notes: [
      {
        id: 'n1', lesson: 'Linear Equations & Inequalities', date: 'May 10, 2026',
        content: `**Key Concepts:**\n• A linear equation has the form ax + b = c\n• To solve: isolate the variable using inverse operations\n• Inequalities use <, >, ≤, ≥ instead of =\n• When multiplying/dividing by negative numbers, flip the inequality sign\n\n**Important Formulas:**\n• Slope: m = (y₂ - y₁) / (x₂ - x₁)\n• Slope-intercept form: y = mx + b\n• Point-slope form: y - y₁ = m(x - x₁)`
      },
      {
        id: 'n2', lesson: 'Systems of Linear Equations', date: 'May 12, 2026',
        content: `**Methods to Solve Systems:**\n1. Substitution: Solve one equation for a variable, substitute into the other\n2. Elimination: Add/subtract equations to eliminate a variable\n3. Graphing: Find the intersection point\n\n**Key Takeaway:**\n• If lines are parallel → no solution\n• If lines are the same → infinite solutions\n• If lines intersect → one unique solution`
      }
    ]
  },
  {
    id: 2,
    course: 'IELTS Speaking Success',
    teacher: 'Ms. Sarah Johnson',
    notes: [
      {
        id: 'n3', lesson: 'Fluency & Coherence Techniques', date: 'May 14, 2026',
        content: `**Fluency Tips:**\n• Speak at a natural pace — not too fast, not too slow\n• Use fillers sparingly: "well", "you know", "actually"\n• Practice paraphrasing to avoid repetition\n\n**Coherence Markers:**\n• First of all, Moreover, Furthermore\n• On the other hand, However, Nevertheless\n• In conclusion, To sum up, Overall\n\n**Band 7+ Strategy:**\n• Extend answers with examples and personal experiences\n• Use a mix of simple and complex sentences`
      }
    ]
  },
  {
    id: 3,
    course: 'TOEFL iBT Complete Guide',
    teacher: 'Ms. Lisa Park',
    notes: [
      {
        id: 'n4', lesson: 'Integrated Writing Strategies', date: 'May 16, 2026',
        content: `**Structure of Integrated Writing:**\n1. Introduction: State that the lecture challenges/supports the reading\n2. Body 1: First point from lecture vs. reading\n3. Body 2: Second point from lecture vs. reading\n4. Body 3: Third point from lecture vs. reading\n\n**Template Phrases:**\n• "The lecturer argues that... which directly contradicts the reading's claim that..."\n• "According to the professor..."\n• "This challenges the point made in the passage that..."`
      }
    ]
  }
];

export default function Notes() {
  const [expandedCourse, setExpandedCourse] = useState(courseNotes[0]?.id || null);
  const [expandedNote, setExpandedNote] = useState(courseNotes[0]?.notes[0]?.id || null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '10px',
          background: 'linear-gradient(135deg, #3A2048, #5a2d7a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Sparkles size={20} style={{ color: '#CABA61' }} />
        </div>
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, margin: 0 }}>AI-Generated Notes</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>Auto-generated revision notes from your lessons</p>
        </div>
      </div>

      {/* Notes by Course */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {courseNotes.map((course) => {
          const isExpanded = expandedCourse === course.id;
          return (
            <div key={course.id} className="smart-card" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Course Header */}
              <button
                onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  width: '100%', padding: '16px 20px', cursor: 'pointer',
                  backgroundColor: isExpanded ? 'rgba(58, 32, 72, 0.03)' : 'transparent',
                  border: 'none', textAlign: 'left', transition: 'all 0.15s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '8px',
                    backgroundColor: 'rgba(58, 32, 72, 0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    <BookOpen size={18} style={{ color: '#3A2048' }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{course.course}</h3>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{course.teacher} • {course.notes.length} note{course.notes.length !== 1 ? 's' : ''}</span>
                  </div>
                </div>
                {isExpanded ? <ChevronDown size={16} style={{ color: 'var(--text-muted)' }} /> : <ChevronRight size={16} style={{ color: 'var(--text-muted)' }} />}
              </button>

              {/* Notes List */}
              {isExpanded && (
                <div style={{ borderTop: '1px solid var(--border-color)' }}>
                  {course.notes.map((note) => {
                    const isNoteExpanded = expandedNote === note.id;
                    return (
                      <div key={note.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <button
                          onClick={() => setExpandedNote(isNoteExpanded ? null : note.id)}
                          style={{
                            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            width: '100%', padding: '12px 20px 12px 52px', cursor: 'pointer',
                            backgroundColor: isNoteExpanded ? 'rgba(202, 186, 97, 0.04)' : 'transparent',
                            border: 'none', textAlign: 'left'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <FileText size={14} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{note.lesson}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              <Clock size={10} /> {note.date}
                            </span>
                            {isNoteExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </div>
                        </button>

                        {isNoteExpanded && (
                          <div style={{
                            padding: '16px 20px 20px 64px',
                            backgroundColor: 'rgba(58, 32, 72, 0.02)',
                            borderTop: '1px solid var(--border-color)'
                          }}>
                            <div style={{
                              padding: '16px', borderRadius: '10px', border: '1px solid var(--border-color)',
                              backgroundColor: 'var(--bg-card)', fontSize: '13px', lineHeight: 1.8,
                              color: 'var(--text-primary)', whiteSpace: 'pre-line', textAlign: 'left'
                            }}>
                              {note.content}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
