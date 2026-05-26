// Shared Mock Database with LocalStorage persistence for perfect portal synchronicity

const defaultCourses = [
  {
    id: "course-1",
    title: "Python for Beginners",
    teacher: "Dr. Vivek Sharma",
    progress: 65,
    enrolledDate: "May 10, 2024",
    price: 49.00,
    chaptersCount: 12,
    studentsCount: 842,
    category: "Development",
    modules: [
      {
        id: "m1",
        title: "Introduction to Python",
        lessons: [
          { id: "l1", title: "Getting Started & Installation", duration: "10:15", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "l2", title: "Python Interpreter & Syntax", duration: "15:30", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
          { id: "l3", title: "Variables & Simple Data Types", duration: "18:45", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        id: "m2",
        title: "Control Flow & Loops",
        lessons: [
          { id: "l4", title: "Conditional Statements (if/elif/else)", duration: "22:10", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
          { id: "l5", title: "While Loops and For Loops", duration: "25:40", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "course-2",
    title: "Data Structures & Algorithms",
    teacher: "Dr. Vivek Sharma",
    progress: 40,
    enrolledDate: "May 15, 2024",
    price: 59.00,
    chaptersCount: 18,
    studentsCount: 1250,
    category: "Computer Science",
    modules: [
      {
        id: "m3",
        title: "Big O Notation & Complexity",
        lessons: [
          { id: "l6", title: "Time and Space Complexity Analysis", duration: "20:05", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
          { id: "l7", title: "Common Complexity Classes", duration: "12:15", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      },
      {
        id: "m4",
        title: "Arrays & Linked Lists",
        lessons: [
          { id: "l8", title: "Array Operations and Dynamic Arrays", duration: "24:18", videoUrl: "https://www.w3schools.com/html/movie.mp4" },
          { id: "l9", title: "Singly and Doubly Linked Lists", duration: "32:50", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
        ]
      }
    ]
  },
  {
    id: "course-3",
    title: "Machine Learning Basics",
    teacher: "Dr. Neha Verma",
    progress: 20,
    enrolledDate: "May 20, 2024",
    price: 69.00,
    chaptersCount: 10,
    studentsCount: 610,
    category: "Data Science",
    modules: [
      {
        id: "m5",
        title: "Introduction to ML",
        lessons: [
          { id: "l10", title: "Supervised vs Unsupervised Learning", duration: "15:10", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "l11", title: "Linear Regression Explained", duration: "28:30", videoUrl: "https://www.w3schools.com/html/movie.mp4" }
        ]
      }
    ]
  },
  {
    id: "course-4",
    title: "Web Development Bootcamp",
    teacher: "Mr. Rohit K.",
    progress: 0,
    enrolledDate: "May 25, 2024",
    price: 49.00,
    chaptersCount: 22,
    studentsCount: 2040,
    category: "Development",
    modules: [
      {
        id: "m6",
        title: "HTML5 & CSS3 Essentials",
        lessons: [
          { id: "l12", title: "Semantic Tags and Layouts", duration: "18:22", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" },
          { id: "l13", title: "Flexbox and CSS Grid Systems", duration: "25:40", videoUrl: "https://www.w3schools.com/html/movie.mp4" }
        ]
      }
    ]
  },
  {
    id: "course-5",
    title: "Deep Learning Advanced",
    teacher: "Dr. Arjun Sharma",
    progress: 0,
    enrolledDate: "May 24, 2024",
    price: 79.00,
    chaptersCount: 15,
    studentsCount: 450,
    category: "Data Science",
    modules: [
      {
        id: "m7",
        title: "Neural Networks Fundamentals",
        lessons: [
          { id: "l14", title: "Activation Functions & Backpropagation", duration: "32:15", videoUrl: "https://www.w3schools.com/html/movie.mp4" }
        ]
      }
    ]
  }
];

const defaultClasses = [
  {
    id: "class-1",
    title: "Data Structures - Linked Lists",
    teacher: "Dr. Vivek Sharma",
    courseId: "course-2",
    time: "10:00",
    ampm: "am",
    date: "2026-05-26", // Today
    dateLabel: "Today",
    isLive: true
  },
  {
    id: "class-2",
    title: "Machine Learning - Linear Regression",
    teacher: "Dr. Neha Verma",
    courseId: "course-3",
    time: "01:00",
    ampm: "pm",
    date: "2026-05-26", // Today
    dateLabel: "Today",
    isLive: true
  },
  {
    id: "class-3",
    title: "Web Development - CSS Grid",
    teacher: "Mr. Rohit K.",
    courseId: "course-4",
    time: "04:00",
    ampm: "pm",
    date: "2026-05-26", // Today
    dateLabel: "Today",
    isLive: false
  },
  {
    id: "class-4",
    title: "Deep Learning - Backpropagation",
    teacher: "Dr. Arjun Sharma",
    courseId: "course-5",
    time: "06:00",
    ampm: "pm",
    date: "2026-05-26", // Today
    dateLabel: "Today",
    isLive: false
  },
  {
    id: "class-5",
    title: "Python - Functions & Modules",
    teacher: "Dr. Vivek Sharma",
    courseId: "course-1",
    time: "05:00",
    ampm: "pm",
    date: "2026-05-27", // Tomorrow
    dateLabel: "27 May",
    isLive: false
  }
];

const defaultStudents = [
  { id: "s-1", name: "Rahul Kumar", email: "rahul.k@email.com", course: "Python for Beginners", enrolledOn: "May 26, 2024", amount: "$49.00", status: "Completed", avatar: "👨" },
  { id: "s-2", name: "Priya Singh", email: "priya.s@email.com", course: "Data Structures & Algorithms", enrolledOn: "May 26, 2024", amount: "$59.00", status: "Completed", avatar: "👩" },
  { id: "s-3", name: "Aman Verma", email: "aman.v@email.com", course: "Machine Learning Basics", enrolledOn: "May 25, 2024", amount: "$69.00", status: "Completed", avatar: "👨" },
  { id: "s-4", name: "Neha Patel", email: "neha.p@email.com", course: "Web Development Bootcamp", enrolledOn: "May 25, 2024", amount: "$49.00", status: "Pending", avatar: "👩" },
  { id: "s-5", name: "Karan Malhotra", email: "karan.m@email.com", course: "Deep Learning Advanced", enrolledOn: "May 24, 2024", amount: "$79.00", status: "Completed", avatar: "👨" }
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
    streak: getStorageItem("smartedu_streak", 7),
    overallProgress: getStorageItem("smartedu_progress", 86)
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
          contents: [{ parts: [{ text: `You are SmartEdu's built-in AI Tutor. Answer the user's question clearly, concisely, and like a supportive and highly knowledgeable educator. Question: ${userPrompt}` }] }]
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

*Go to the **Quizzes** tab in the sidebar to start your official AI quiz!*`;
  }

  if (prompt.includes("not understand") || prompt.includes("weak")) {
    return `No worries, Arjun! Let's break down whatever you're struggling with. 

Could you specify if it is **Time Complexity**, **Pointer manipulation in Linked Lists**, or **Python Function Parameters**? 

I can explain it with drawings, code, or a simpler everyday analogy! Let me know.`;
  }

  return `Hello Arjun! I'm your SmartEdu AI Learning Assistant. 

I can help you:
1. Explain complex topics (e.g. "Explain recursion")
2. Summarize lectures (e.g. "Summarize today's Linked List class")
3. Create custom quizzes (e.g. "Create a Python quiz")
4. Solve code doubts!

What would you like to learn today?`;
};
