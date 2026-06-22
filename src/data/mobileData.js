// Structured mock database for SmartEdu Mobile with LocalStorage persistence

const initialCourses = [
  {
    id: 'm-course-1',
    title: 'SAT Math Mastery Accelerator',
    teacher: 'Dr. Ahmed Al-Hassan',
    progress: 75,
    chaptersCount: 8,
    category: 'Test Prep',
    rating: '4.9',
    reviews: 142,
    description: 'Master quadratic formulas, geometry, and word problems with targeted speed-drills.',
    thumbnail: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    modules: [
      {
        id: 'cm1',
        title: 'Module 1: Algebra Fundamentals',
        lessons: [
          { id: 'cl1', title: 'Linear Equations Speedruns', duration: '12 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
          { id: 'cl2', title: 'Systems of Inequalities', duration: '15 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true }
        ]
      },
      {
        id: 'cm2',
        title: 'Module 2: Advanced Math Problems',
        lessons: [
          { id: 'cl3', title: 'Quadratic Equations Decoded', duration: '18 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
          { id: 'cl4', title: 'Exponent & Radicals Rules', duration: '20 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ]
  },
  {
    id: 'm-course-2',
    title: 'IELTS Speaking Band 8.0 Guide',
    teacher: 'Ms. Sarah Johnson',
    progress: 100,
    chaptersCount: 6,
    category: 'Language',
    rating: '4.8',
    reviews: 95,
    description: 'Learn dynamic phrases, pronunciation frameworks, and mock interview methods.',
    thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200',
    modules: [
      {
        id: 'cm3',
        title: 'Module 1: Interview Part 1 Basics',
        lessons: [
          { id: 'cl5', title: 'Talking about Work & Home', duration: '10 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
          { id: 'cl6', title: 'Managing Fluency & Pauses', duration: '14 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true }
        ]
      }
    ]
  },
  {
    id: 'm-course-3',
    title: 'Python for Beginners & Data Science',
    teacher: 'Mr. David Wilson',
    progress: 25,
    chaptersCount: 12,
    category: 'STEM',
    rating: '4.7',
    reviews: 110,
    description: 'An interactive coding path starting from variables to pandas and visualization.',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200',
    modules: [
      {
        id: 'cm4',
        title: 'Module 1: Syntax & Variables',
        lessons: [
          { id: 'cl7', title: 'Python Basic Input / Output', duration: '8 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: true },
          { id: 'cl8', title: 'If-Else Conditionals', duration: '12 mins', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4', completed: false }
        ]
      }
    ]
  }
];

const initialClasses = [
  { id: 'lc-1', title: 'SAT Trigonometry Practice', teacher: 'Dr. Ahmed Al-Hassan', time: '06:00 PM', duration: '60 mins', isLive: true },
  { id: 'lc-2', title: 'IELTS Part 2 Cue Cards', teacher: 'Ms. Sarah Johnson', time: '08:00 PM', duration: '45 mins', isLive: false }
];

const initialFlashcards = [
  { id: 'fc-1', term: 'Quadratic Formula', definition: 'x = [-b ± √(b² - 4ac)] / 2a. Used to find roots of ax² + bx + c = 0.', category: 'Math' },
  { id: 'fc-2', term: 'Discriminant', definition: 'b² - 4ac. Determines the number and type of roots (2 real, 1 real, or complex).', category: 'Math' },
  { id: 'fc-3', term: 'IELTS: Coherence', definition: 'The logical connection and flow of ideas in your speaking or writing.', category: 'English' },
  { id: 'fc-4', term: 'Python: List Comprehension', definition: 'A concise way to create lists. Syntax: [expression for item in iterable if condition]', category: 'STEM' },
  { id: 'fc-5', term: 'Idiomatic Language', definition: 'Phrases with non-literal meanings that boost speaking band scores (e.g. "Over the moon").', category: 'English' }
];

const initialAchievements = [
  { id: 'ac-1', name: 'Knowledge Seeker', desc: 'Enrolled in your first course', icon: 'BookOpen', color: '#3b82f6', earned: true },
  { id: 'ac-2', name: 'Elite Scholar', desc: 'Completed a full course with 100% progress', icon: 'Award', color: '#CABA61', earned: true },
  { id: 'ac-3', name: 'AI Whisperer', desc: 'Discussed study concepts with the AI Tutor', icon: 'Briefcase', color: '#10b981', earned: true },
  { id: 'ac-4', name: 'Streak Champion', desc: 'Maintained a 14-day study streak', icon: 'Award', color: '#f59e0b', earned: false }
];

const initialNotifications = [
  { id: 'not-1', text: 'Dr. Ahmed updated the SAT course with a formula checklist!', time: '10 mins ago', read: false },
  { id: 'not-2', text: 'Live session "SAT Trigonometry" starts in 2 hours.', time: '2 hours ago', read: true }
];

// Helper functions for persistent database
const getStorageItem = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Storage error:", error);
  }
};

export const getMobileDB = () => {
  return {
    courses: getStorageItem("suriatech_mobile_courses", initialCourses),
    classes: getStorageItem("suriatech_mobile_classes", initialClasses),
    flashcards: getStorageItem("suriatech_mobile_flashcards", initialFlashcards),
    achievements: getStorageItem("suriatech_mobile_achievements", initialAchievements),
    notifications: getStorageItem("suriatech_mobile_notifications", initialNotifications),
    streak: getStorageItem("suriatech_mobile_streak", 14),
    overallProgress: getStorageItem("suriatech_mobile_overall_progress", 67)
  };
};

export const saveMobileDB = (db) => {
  setStorageItem("suriatech_mobile_courses", db.courses);
  setStorageItem("suriatech_mobile_classes", db.classes);
  setStorageItem("suriatech_mobile_flashcards", db.flashcards);
  setStorageItem("suriatech_mobile_achievements", db.achievements);
  setStorageItem("suriatech_mobile_notifications", db.notifications);
  setStorageItem("suriatech_mobile_streak", db.streak);
  setStorageItem("suriatech_mobile_overall_progress", db.overallProgress);
};

// AI response engine supporting real API key or simulated learning tutor
export const getMobileAIResponse = async (userPrompt, apiKey = "") => {
  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are SmartEdu's mobile AI tutor. Give a concise, mobile-friendly educational explanation (limit to 3 bullet points, use markdown). Prompt: ${userPrompt}` }] }]
        })
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (e) {
      console.warn("AI API failed, falling back to local engine.", e);
    }
  }

  // Fallback simulator
  await new Promise(resolve => setTimeout(resolve, 1000));
  const prompt = userPrompt.toLowerCase();

  if (prompt.includes("quadratic")) {
    return `### Quadratic Equations 📐
* Form: **ax² + bx + c = 0**
* Roots formula: **x = [-b ± √(b² - 4ac)] / 2a**
* Discriminant ($D = b² - 4ac$) determines if roots are real ($D \\ge 0$) or complex ($D < 0$).`;
  }

  if (prompt.includes("ielts") || prompt.includes("english")) {
    return `### IELTS Speaking Tips 🗣️
* **Speak fluently**: Focus on linking words (e.g., *furthermore*, *as a result*).
* **Vocabulary range**: Use idiom pills like *"once in a blue moon"* to score Band 7+.
* **Grammar structure**: Mix simple, compound, and complex sentences.`;
  }

  if (prompt.includes("python")) {
    return `### Python List Comprehensions 🐍
* Syntax: \`[expr for item in iterable if condition]\`
* Example: \`[x**2 for x in range(5)]\` gives \`[0, 1, 4, 9, 16]\`.
* Advantage: Extremely fast and readable!`;
  }

  return `### SmartEdu Learning Tip 💡
* I can help you revise **Quadratic Equations**, practice **IELTS Speaking**, or learn **Python Syntax**!
* Toggle **Custom Prompts** or type questions below.
* Enter a Gemini API Key in **Profile Settings** to unlock full AI capabilities!`;
};
