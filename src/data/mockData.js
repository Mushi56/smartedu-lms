// Shared Mock Database with LocalStorage persistence for perfect portal synchronicity

const defaultCourses = Array.from({ length: 10 }).map((_, i) => ({
  id: `course-${i + 1}`,
  title: `Test Course ${i + 1}: Mastering Advanced Skills`,
  teacher: `Demo Teacher ${i + 1}`,
  progress: Math.floor(Math.random() * 100),
  enrolledDate: "May 10, 2026",
  price: 59.00 + i * 10,
  chaptersCount: 15 + i,
  studentsCount: 200 + i * 50,
  category: i % 2 === 0 ? "Test Prep" : "Language",
  rating: (4.5 + Math.random() * 0.5).toFixed(1),
  reviews: 100 + i * 15,
  modules: [
    {
      id: "m1",
      title: "Module 1 Basics",
      lessons: [
        { id: "l1", title: "Introduction", duration: "10:00", videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4" }
      ]
    }
  ]
}));

const defaultClasses = Array.from({ length: 5 }).map((_, i) => ({
  id: `class-${i + 1}`,
  title: `Live Session ${i + 1}`,
  teacher: `Demo Teacher ${i + 1}`,
  courseId: `course-${i + 1}`,
  time: "06:00",
  ampm: "pm",
  date: "2026-06-12",
  dateLabel: "Today",
  isLive: i === 0
}));

const defaultStudents = Array.from({ length: 10 }).map((_, i) => ({
  id: `s-${i + 1}`,
  name: `Test Student ${i + 1}`,
  email: `student${i + 1}@example.com`,
  course: `Test Course ${i % 5 + 1}`,
  enrolledOn: "May 26, 2026",
  amount: `$${59.00 + i * 10}`,
  status: i % 2 === 0 ? "Completed" : "In Progress",
  avatar: i % 2 === 0 ? "👨" : "👩"
}));

const defaultNotifications = [
  { id: "n-1", text: "Dr. Ahmed scheduled a new Live class on Sat Math.", time: "10 mins ago", read: false }
];

const defaultQuizzes = [];
const defaultAssignments = [];

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
    courses: getStorageItem("suriatech_v2_courses", defaultCourses),
    classes: getStorageItem("suriatech_v2_classes", defaultClasses),
    students: getStorageItem("suriatech_v2_students", defaultStudents),
    notifications: getStorageItem("suriatech_v2_notifications", defaultNotifications),
    quizzes: getStorageItem("suriatech_v2_quizzes", defaultQuizzes),
    assignments: getStorageItem("suriatech_v2_assignments", defaultAssignments),
    streak: getStorageItem("suriatech_v2_streak", 0),
    overallProgress: getStorageItem("suriatech_v2_progress", 0)
  };
};

export const saveDB = (db) => {
  setStorageItem("suriatech_v2_courses", db.courses);
  setStorageItem("suriatech_v2_classes", db.classes);
  setStorageItem("suriatech_v2_students", db.students);
  setStorageItem("suriatech_v2_notifications", db.notifications);
  setStorageItem("suriatech_v2_quizzes", db.quizzes);
  setStorageItem("suriatech_v2_assignments", db.assignments);
  setStorageItem("suriatech_v2_streak", db.streak);
  setStorageItem("suriatech_v2_progress", db.overallProgress);
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
