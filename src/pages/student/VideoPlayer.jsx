import React, { useState, useEffect } from 'react';
import { Play, Sparkles, BookOpen, Clock, Copy, Check, MessageSquare, ArrowLeft } from 'lucide-react';

export default function VideoPlayer({ courseId, initialLessonId, courses, onBack, onCompleteLesson }) {
  const course = courses.find(c => c.id === courseId);
  const [activeLessonId, setActiveLessonId] = useState(initialLessonId);
  const [activeTab, setActiveTab] = useState('summary');
  const [copied, setCopied] = useState(false);

  // Flatten lessons for easy indexing
  const allLessons = course ? course.modules.flatMap(m => m.lessons) : [];
  const currentLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];

  useEffect(() => {
    if (initialLessonId) {
      setActiveLessonId(initialLessonId);
    }
  }, [initialLessonId]);

  if (!course || !currentLesson) return <div>Lesson not found</div>;

  // Real-time AI Summary generator content matching current lesson topic
  const getAISummaryContent = () => {
    const title = currentLesson.title.toLowerCase();
    if (title.includes("getting started") || title.includes("installation")) {
      return `### AI Lecture Summary: Python Getting Started 🐍

This lecture covered the setup and core fundamentals of the Python programming environment.

#### Key Takeaways:
1. **Interpreter-Based:** Python is an interpreted language. Source code is translated to bytecode and executed line-by-line by the Python Virtual Machine (PVM).
2. **Setup:** Download Python from python.org. Ensure the 'Add Python to PATH' checkbox is enabled during installation to execute scripts from the terminal.
3. **IDE Environment:** VS Code, PyCharm, or standard IDLE can be used to write scripts.
4. **Verifying Installation:** Run \`python --version\` in your terminal to verify installation.

#### Crucial Definitions:
- **REPL (Read-Eval-Print Loop):** Interactive shell that processes single python expressions instantly.
- **PATH Variable:** System variable helping the shell locate the python executable.`;
    }
    
    if (title.includes("linked list")) {
      return `### AI Lecture Summary: Singly Linked Lists 🔗

This lecture analyzed the Node structure and operational bounds of Singly Linked Lists.

#### Key Takeaways:
1. **Linear Data Structure:** Items are stored in nodes, which are connected by pointer links instead of contiguous memory slots.
2. **Node Properties:** Each Node object houses two fields: \`data\` (value) and \`next\` (address referencing the subsequent node).
3. **Head Pointer:** The entrance point of the list. If \`head\` is null, the list is empty.
4. **Efficiency:** Inserting or deleting at the Head takes O(1) time. Finding or deleting at the Tail is O(n) because it requires complete sequential traversal.

#### Crucial Definitions:
- **Tail Node:** The terminating element of the list, characterized by its \`next\` reference pointing to Null.
- **Node Traversal:** Iterating through elements using a temporary cursor reference: \`temp = temp.next\`.`;
    }

    if (title.includes("linear regression")) {
      return `### AI Lecture Summary: Linear Regression Basics 📊

This lecture explored the regression model foundations in supervised machine learning.

#### Key Takeaways:
1. **Definition:** A supervised learning technique used to predict a continuous numerical value (dependent variable) based on inputs (independent variables).
2. **Math Model:** Expressed as $y = wx + b$ where $w$ is the slope weight, and $b$ is the y-axis intercept bias.
3. **Loss Function:** Uses **Mean Squared Error (MSE)** to compute model inaccuracy: $MSE = \\frac{1}{n} \\sum (y_{actual} - y_{pred})^2$.
4. **Gradient Descent:** Optimization algorithm that iteratively updates weights and biases to locate the minimum loss point.

#### Crucial Definitions:
- **Residual:** The absolute vertical distance between a data point and the regression line.
- **Cost Minimization:** The process of adjusting model parameters to reduce cost function outputs.`;
    }

    // Generic fallback summary
    return `### AI Lecture Summary: Course Essentials 📝

#### Key Takeaways:
1. **Core Concept:** Detailed exploration of ${currentLesson.title} principles and functional mechanics.
2. **Best Practices:** Focus on optimization, time/space complexity analysis, and modular coding layouts.
3. **Problem Solving:** Apply standard algorithms and structured frameworks to solve code assignments.
4. **Next Steps:** Review notes, try the AI-generated MCQs in the Quizzes section, and submit assignments on time.`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(getAISummaryContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Back button row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={onBack} 
          className="btn-secondary click-press"
          style={{ padding: '6px 12px', fontSize: '12px' }}
        >
          <ArrowLeft size={14} />
          <span>Back to Syllabus</span>
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Course: {course.title}
          </span>
        </div>
      </div>

      {/* Main Grid: Player on left, Curriculum outline sidebar on right */}
      <div className="video-player-container">
        {/* Left Side: Video Stream and Tabs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* HTML5 video element with custom controllers */}
          <div className="custom-video-element">
            <video 
              key={currentLesson.videoUrl || currentLesson.videoPreviewUrl || currentLesson.id}
              src={currentLesson.videoUrl || currentLesson.videoPreviewUrl || ''} 
              controls 
              controlsList="nodownload"
              onContextMenu={e => e.preventDefault()}
              autoPlay
              style={{ width: '100%', height: '100%', borderRadius: '16px' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 700 }}>{currentLesson.title}</h2>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Instructor: {course.teacher} • Duration: {currentLesson.duration}</p>
            </div>
            <button 
              onClick={() => onCompleteLesson(course.id, currentLesson.id)}
              className="btn-primary click-press"
              style={{ padding: '8px 16px', fontSize: '12px' }}
            >
              Mark Lesson as Completed
            </button>
          </div>

          {/* Lecture Tabs Menu */}
          <div className="smart-card">
            <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--border-color)', marginBottom: '16px' }}>
              <button 
                onClick={() => setActiveTab('summary')}
                className={`click-press`}
                style={{ 
                  padding: '8px 12px 12px', 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  borderBottom: activeTab === 'summary' ? '2px solid var(--primary-color)' : 'none',
                  color: activeTab === 'summary' ? 'var(--primary-color)' : 'var(--text-secondary)' 
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} />
                  <span>AI Lecture Summarizer</span>
                </div>
              </button>
              <button 
                onClick={() => setActiveTab('about')}
                className={`click-press`}
                style={{ 
                  padding: '8px 12px 12px', 
                  fontSize: '13px', 
                  fontWeight: 600, 
                  borderBottom: activeTab === 'about' ? '2px solid var(--primary-color)' : 'none',
                  color: activeTab === 'about' ? 'var(--primary-color)' : 'var(--text-secondary)' 
                }}
              >
                <span>About Lesson</span>
              </button>
            </div>

            {/* Tab content view */}
            {activeTab === 'summary' ? (
              <div style={{ textAlign: 'left', position: 'relative' }}>
                <button 
                  onClick={handleCopySummary}
                  className="btn-secondary click-press"
                  style={{ position: 'absolute', right: 0, top: 0, padding: '4px 10px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {copied ? <Check size={12} style={{ color: 'var(--status-success)' }} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
                </button>
                <div 
                  style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-secondary)' }}
                  dangerouslySetInnerHTML={{ __html: getAISummaryContent().replace(/\n/g, '<br />') }}
                />
              </div>
            ) : (
              <div style={{ textAlign: 'left', fontSize: '13px', lineHeight: 1.5, color: 'var(--text-secondary)' }}>
                <p style={{ marginBottom: '12px' }}>
                  This lesson provides hands-on code examples and detailed architectural flows. Ensure you write and test the code yourself to master structural patterns.
                </p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', fontWeight: 600 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <BookOpen size={14} style={{ color: 'var(--primary-color)' }} />
                    <span>Topic: Software Engineering Basics</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} style={{ color: 'var(--primary-color)' }} />
                    <span>Video Length: {currentLesson.duration}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Course Curriculum Navigation Sidebar */}
        <div className="smart-card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', textAlign: 'left' }}>
            Course Navigation
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '420px' }}>
            {course.modules.map((mod) => (
              <div key={mod.id} style={{ display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                  {mod.title}
                </span>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {mod.lessons.map((les) => (
                    <button
                      key={les.id}
                      onClick={() => setActiveLessonId(les.id)}
                      className={`click-press`}
                      style={{
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid',
                        borderColor: activeLessonId === les.id ? 'rgba(99, 102, 241, 0.25)' : 'transparent',
                        backgroundColor: activeLessonId === les.id ? 'var(--primary-glow)' : 'transparent',
                        color: activeLessonId === les.id ? 'var(--primary-color)' : 'var(--text-secondary)',
                        textAlign: 'left',
                        fontSize: '12px',
                        fontWeight: activeLessonId === les.id ? 600 : 500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                    >
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
                        {les.title}
                      </span>
                      <span style={{ fontSize: '10px', opacity: 0.8 }}>{les.duration}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
