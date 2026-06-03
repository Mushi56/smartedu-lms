// Shared Mock Database with LocalStorage persistence for perfect portal synchronicity

const defaultCourses = [
  {
    id: "course-1",
    title: "SAT Math Mastery",
    teacher: "Dr. Ahmed Al-Hassan",
    progress: 78,
    enrolledDate: "May 10, 2026",
    price: 59.00,
    chaptersCount: 20,
    studentsCount: 4250,
    category: "Test Prep",
    modules: [
      {
        id: "m1",
        title: "Algebra Fundamentals",
        lessons: [
          { id: "l1", title: "Linear Equations & Inequalities", duration: "12:15", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "l2", title: "Systems of Linear Equations", duration: "14:20", videoUrl: "https://www.w3schools.com/html/movie.mp4" }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "IELTS Speaking Success",
    teacher: "Ms. Sarah Johnson",
    progress: 60,
    enrolledDate: "May 12, 2026",
    price: 49.00,
    chaptersCount: 16,
    studentsCount: 3860,
    category: "Language",
    modules: [
      {
        id: "m2",
        title: "Speaking Part 1 & 2 Essentials",
        lessons: [
          { id: "l3", title: "Fluency & Coherence Techniques", duration: "10:30", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "TOEFL iBT Complete Guide",
    teacher: "Ms. Lisa Park",
    progress: 40,
    enrolledDate: "May 14, 2026",
    price: 54.00,
    chaptersCount: 22,
    studentsCount: 3210,
    category: "Language",
    modules: [
      {
        id: "m3",
        title: "Reading & Writing Modules",
        lessons: [
          { id: "l4", title: "Integrated Writing Strategies", duration: "18:45", videoUrl: "https://www.w3schools.com/html/movie.mp4" }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "GRE Quantitative Reasoning",
    teacher: "Dr. Michael Chen",
    progress: 30,
    enrolledDate: "May 15, 2026",
    price: 59.00,
    chaptersCount: 8,
    studentsCount: 2980,
    category: "Test Prep",
    modules: [
      {
        id: "m4",
        title: "Arithmetic & Algebra",
        lessons: [
          { id: "l5", title: "Quadratic Equations - Problem Solving", duration: "15:20", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "course-5",
    title: "Essay Writing Excellence",
    teacher: "Ms. Sarah Johnson",
    progress: 0,
    enrolledDate: "May 18, 2026",
    price: 49.00,
    chaptersCount: 12,
    studentsCount: 2450,
    category: "Writing",
    modules: [
      {
        id: "m5",
        title: "Academic Writing Style",
        lessons: [
          { id: "l6", title: "Thesis Statements & Structures", duration: "11:15", videoUrl: "https://www.w3schools.com/html/movie.mp4" }
        ]
      }
    ]
  }
];

const defaultClasses = [
  {
    id: "class-1",
    title: "SAT Math Mastery",
    teacher: "Dr. Ahmed Al-Hassan",
    courseId: "course-1",
    time: "06:00",
    ampm: "pm",
    date: "2026-06-03", // Today
    dateLabel: "Today",
    isLive: true
  },
  {
    id: "class-2",
    title: "IELTS Speaking Success",
    teacher: "Ms. Sarah Johnson",
    courseId: "course-2",
    time: "04:30",
    ampm: "pm",
    date: "2026-06-04", // Tomorrow
    dateLabel: "Tomorrow",
    isLive: true
  },
  {
    id: "class-3",
    title: "GRE Quantitative Reasoning",
    teacher: "Dr. Michael Chen",
    courseId: "course-4",
    time: "07:00",
    ampm: "pm",
    date: "2025-05-17",
    dateLabel: "May 17, 2025",
    isLive: false
  },
  {
    id: "class-4",
    title: "TOEFL iBT Complete Guide",
    teacher: "Ms. Lisa Park",
    courseId: "course-3",
    time: "05:00",
    ampm: "pm",
    date: "2025-05-18",
    dateLabel: "May 18, 2025",
    isLive: false
  }
];

const defaultStudents = [
  { id: "s-1", name: "Sara Ahmed", email: "sara.ahmed@example.com", course: "SAT Math Mastery", enrolledOn: "May 26, 2026", amount: "$59.00", status: "Completed", avatar: "👩" },
  { id: "s-2", name: "Mohammed Ali", email: "mohammed.ali@example.com", course: "IELTS Speaking Success", enrolledOn: "May 26, 2026", amount: "$49.00", status: "Completed", avatar: "👨" },
  { id: "s-3", name: "Fatima Zahra", email: "fatima.zahra@example.com", course: "TOEFL iBT Complete Guide", enrolledOn: "May 25, 2026", amount: "$54.00", status: "Completed", avatar: "👩" },
  { id: "s-4", name: "Omar Hassan", email: "omar.hassan@example.com", course: "GRE Quantitative Reasoning", enrolledOn: "May 25, 2026", amount: "$59.00", status: "Completed", avatar: "👨" },
  { id: "s-5", name: "James Wilson", email: "james.wilson@example.com", course: "Essay Writing Excellence", enrolledOn: "May 24, 2026", amount: "$49.00", status: "Completed", avatar: "👨" }
];

const defaultNotifications = [
  { id: "n-1", text: "Dr. Vivek Sharma scheduled a new Live class on Linked Lists.", time: "10 mins ago", read: false },
  { id: "n-2", text: "Your assignment 'Array Algorithms' has been graded. Grade: A (95%).", time: "2 hours ago", read: false },
  { id: "n-3", text: "New course 'Deep Learning Advanced' is now available for enrollment.", time: "1 day ago", read: true }
];

const defaultQuizzes = [
  {
    topic: "Array",
    questions: [
      {
        question: "What is the time complexity of accessing an element in an array by its index?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
        answer: 0,
        explanation: "Accessing an element in an array by index takes constant time O(1) because the memory address can be computed directly using the base address and element size."
      },
      {
        question: "Which of the following is a disadvantage of a static array?",
        options: ["Slow access time", "Cannot store duplicate elements", "Fixed size, cannot grow dynamically", "High memory fragmentation"],
        answer: 2,
        explanation: "Static arrays have a fixed size defined at compilation/initialization. Dynamic expansion requires allocating a new larger array and copying all elements."
      },
      {
        question: "How is a two-dimensional array stored in memory in row-major order?",
        options: ["Elements of each column are stored contiguously", "Elements of each row are stored contiguously", "Elements are stored randomly in a heap", "Elements are hashed by coordinates"],
        answer: 1,
        explanation: "In row-major layout, all elements of the first row are stored contiguously in memory, followed by elements of the second row, and so on."
      }
    ]
  },
  {
    topic: "Python",
    questions: [
      {
        question: "Which data type in Python is mutable?",
        options: ["tuple", "list", "str", "int"],
        answer: 1,
        explanation: "Lists are mutable in Python, meaning you can add, remove, or modify elements in-place. Tuples, strings, and integers are immutable."
      },
      {
        question: "How do you start a function declaration in Python?",
        options: ["function myFunc():", "def myFunc():", "void myFunc():", "declare myFunc():"],
        answer: 1,
        explanation: "Python uses the 'def' keyword followed by the function name, parameter parentheses, and a colon to declare functions."
      }
    ]
  }
];

const defaultAssignments = [
  {
    id: "assign-1",
    title: "Array and String Operations",
    course: "Data Structures & Algorithms",
    dueDate: "May 30, 2026",
    status: "Pending",
    grade: null,
    problemDescription: "Write a function that reverses an array in-place. Optimize for O(1) auxiliary space.",
    aiNotes: "Focus on two-pointer technique to swap elements from start and end simultaneously."
  },
  {
    id: "assign-2",
    title: "Python Data Analysis Basics",
    course: "Python for Beginners",
    dueDate: "May 28, 2026",
    status: "Graded",
    grade: "95%",
    problemDescription: "Read a CSV file containing student marks and calculate the average score of passing students (score >= 40).",
    aiNotes: "Well done! Your solution correctly uses pandas to filter marks and calculates average accurately."
  }
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

export const getDB = () => {
  return {
    courses: getStorageItem("smartedu_courses", defaultCourses),
    classes: getStorageItem("smartedu_classes", defaultClasses),
    students: getStorageItem("smartedu_students", defaultStudents),
    notifications: getStorageItem("smartedu_notifications", defaultNotifications),
    quizzes: getStorageItem("smartedu_quizzes", defaultQuizzes),
    assignments: getStorageItem("smartedu_assignments", defaultAssignments),
    streak: getStorageItem("smartedu_streak", 14),
    overallProgress: getStorageItem("smartedu_progress", 72)
  };
};

export const saveDB = (db) => {
  setStorageItem("smartedu_courses", db.courses);
  setStorageItem("smartedu_classes", db.classes);
  setStorageItem("smartedu_students", db.students);
  setStorageItem("smartedu_notifications", db.notifications);
  setStorageItem("smartedu_quizzes", db.quizzes);
  setStorageItem("smartedu_assignments", db.assignments);
  setStorageItem("smartedu_streak", db.streak);
  setStorageItem("smartedu_progress", db.overallProgress);
};

// AI Answers Generation Engine
export const getAIResponse = async (userPrompt, apiKey = "") => {
  // If API Key is available, try to use Google Generative AI
  if (apiKey) {
    try {
      // Lazy import or fetch call to Gemini
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are SURIA TECH's built-in AI Tutor. Answer the user's question clearly, concisely, and like a supportive and highly knowledgeable educator. Question: ${userPrompt}` }] }]
        })
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text;
      }
    } catch (e) {
      console.warn("Gemini API call failed, falling back to local simulated AI.", e);
    }
  }

  // Realistic mock AI engine based on common triggers
  const prompt = userPrompt.toLowerCase();
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulated processing delay

  if (prompt.includes("binary search")) {
    return `### Binary Search Explained 🔍
Binary Search is an efficient algorithm for finding an item from a **sorted** list of items. 

**How it works:**
1. Compare your target value to the **middle** element of the array.
2. If they are equal, you are done!
3. If the target is smaller, repeat the search on the **left half**.
4. If the target is larger, repeat the search on the **right half**.

**Time Complexity:** 
- **O(log n)** — This is incredibly fast! For example, searching through 1,000,000 items takes at most **20 comparisons**.`;
  }

  if (prompt.includes("summarize") || prompt.includes("class")) {
    return `### Today's Class Summary: Linked Lists 📝
In today's session, Dr. Vivek Sharma covered **Singly Linked Lists**. Here are the key takeaways:

1. **Node Structure:** A linked list is made of nodes. Each node contains **data** and a **pointer** (reference) to the next node.
2. **Dynamic Size:** Unlike arrays, linked lists can grow or shrink in memory dynamically with O(1) insertion/deletion at the head.
3. **Traversal:** Accessing an element is **O(n)** because you must traverse from the Head node sequentially.
4. **Operations:** Inserting at head is O(1). Inserting at tail is O(n) (or O(1) if you have a Tail reference).

*Next topic: Doubly Linked Lists & Circular lists.*`;
  }

  if (prompt.includes("quiz") || prompt.includes("array")) {
    return `### AI Quiz Generated! 🧠
I've generated a 3-question MCQ quiz on **Arrays** for you in the Quizzes section.

**Here's a warm-up question:**
*Which operation in a standard array has a time complexity of O(n)?*
1. Insertion/Deletion at arbitrary position (shift needed)
2. Accessing element by index
3. Modifying an element
4. Finding the array length

*Go to the **Quizzes** tab in the sidebar to start your official AI quiz!`;
  }

  if (prompt.includes("not understand") || prompt.includes("weak")) {
    return `No worries, Omar! Let's break down whatever you're struggling with. 

    Could you specify if it is **Time Complexity**, **Pointer manipulation in Linked Lists**, or **Python Function Parameters**? 

    I can explain it with drawings, code, or a simpler everyday analogy! Let me know.`;
  }

  return `Hello Omar! I'm your SURIA TECH AI Learning Assistant. 

  I can help you:
  1. Explain complex topics (e.g. "Explain recursion")
  2. Summarize lectures (e.g. "Summarize today's Linked List class")
  3. Create custom quizzes (e.g. "Create a Python quiz")
  4. Solve code doubts!

  What would you like to learn today?`;
};
