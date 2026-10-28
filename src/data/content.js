/**
 * =====================================================================
 * NEURAL COSMOS PORTFOLIO - CONTENT SOURCE OF TRUTH
 * =====================================================================
 * 
 * Instructions:
 * 1. Edit your personal details, bio, skills, projects, and contacts here.
 * 2. Any field with placeholder text can simply be replaced with your real data.
 * 3. Never invent fake companies or achievements; all components read directly from this file.
 */

export const personalInfo = {
  name: "Satya Mohan Surya",
  title: "CSE Student | Aspiring AI Engineer & Software Developer",
  
  // Real bio - customize here
  bio: [
    "Welcome to my neural cosmos. I am a Computer Science and Engineering student passionate about artificial intelligence, system architecture, and building elegant, high-impact digital experiences.",
    "Currently exploring the intersection of deep learning algorithms and responsive modern web engineering. Dedicated to mastering clean code, scalable architectures, and intelligent systems.",
    "Seeking opportunities to collaborate on challenging engineering problems, AI research, and transformative software products."
  ],

  // Bio placeholder badge / status
  status: "Available for internships & AI/software development collaborations",
  location: "India [Update your location in src/data/content.js]",
  education: {
    degree: "B.Tech in Computer Science and Engineering",
    institution: "Update your university/college in src/data/content.js",
    graduation: "Expected 2026 / 2027"
  }
};

export const skillsData = [
  {
    category: "AI & Machine Learning",
    description: "Core algorithms, neural networks, and data frameworks",
    skills: [
      { name: "Python", level: 90, tag: "Primary" },
      { name: "Machine Learning (Add your framework: PyTorch/TensorFlow)", level: 80, tag: "AI/ML" },
      { name: "Deep Learning & Neural Architectures", level: 75, tag: "AI/ML" },
      { name: "Data Structures & Algorithms", level: 85, tag: "Core" },
      { name: "NumPy / Pandas / Scikit-Learn", level: 80, tag: "Data" }
    ]
  },
  {
    category: "Software & Web Development",
    description: "Modern languages, client/server technologies, and reactive UIs",
    skills: [
      { name: "JavaScript / TypeScript", level: 85, tag: "Frontend" },
      { name: "React.js & Modern Web Ecosystem", level: 85, tag: "Frontend" },
      { name: "C / C++ or Java (Add your core language)", level: 80, tag: "Systems" },
      { name: "Node.js / Express (Backend Basics)", level: 75, tag: "Backend" },
      { name: "SQL & Relational Databases", level: 80, tag: "Database" }
    ]
  },
  {
    category: "Engineering Tools & DevOps",
    description: "Version control, containerization, and developer toolchain",
    skills: [
      { name: "Git & GitHub", level: 90, tag: "VCS" },
      { name: "Linux / Shell Scripting", level: 80, tag: "OS" },
      { name: "REST APIs & System Design", level: 78, tag: "API" },
      { name: "Vite / Modern Bundlers", level: 85, tag: "Tools" }
    ]
  }
];

export const projectsData = [
  {
    id: "project-1",
    title: "AI Model / Intelligent System (Project 1 Coming Soon)",
    description: "Add your real project description in src/data/content.js. Showcase what problem you solved, the neural network or algorithmic approach used, and the measurable impact.",
    tech: ["Python", "PyTorch", "FastAPI", "Docker"],
    github: "https://github.com",
    live: "https://example.com",
    isPlaceholder: true,
    accentColor: "#00D4FF"
  },
  {
    id: "project-2",
    title: "Full-Stack Software Application (Project 2 Coming Soon)",
    description: "Add your real project description in src/data/content.js. Outline your front-end stack, state management, backend APIs, and database performance optimizations.",
    tech: ["React", "Node.js", "PostgreSQL", "TailwindCSS"],
    github: "https://github.com",
    live: "https://example.com",
    isPlaceholder: true,
    accentColor: "#8B5CF6"
  },
  {
    id: "project-3",
    title: "Computer Vision / NLP Research Pipeline (Project 3 Coming Soon)",
    description: "Add your real project description in src/data/content.js. Highlight dataset curation, training methodology, evaluation metrics (loss/accuracy/F1), and inference acceleration.",
    tech: ["Python", "Transformers", "OpenCV", "CUDA"],
    github: "https://github.com",
    live: "https://example.com",
    isPlaceholder: true,
    accentColor: "#38BDF8"
  },
  {
    id: "project-4",
    title: "Algorithmic Tool or Distributed Service (Project 4 Coming Soon)",
    description: "Add your real project description in src/data/content.js. Highlight concurrent processing, algorithmic efficiency, clean architecture, and automated testing.",
    tech: ["C++ / Python", "Data Structures", "Benchmarking", "Git"],
    github: "https://github.com",
    live: "https://example.com",
    isPlaceholder: true,
    accentColor: "#EC4899"
  }
];

export const contactInfo = {
  // Update with your real contact handles in src/data/content.js
  email: "your.email@example.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  twitter: "https://twitter.com/yourusername",
  portfolioUrl: "https://satyamohansurya.dev",
  // Formspree or custom form endpoint if preferred (leave empty for mailto fallback)
  formspreeEndpoint: "" 
};

export const siteMetadata = {
  title: "Satya Mohan Surya | CSE Student & Aspiring AI Engineer",
  description: "Futuristic 3D Developer Portfolio of Satya Mohan Surya — Computer Science Engineering Student & Aspiring AI Engineer. Built with React, Three.js, and Neural Cosmos aesthetic.",
  author: "Satya Mohan Surya",
  keywords: ["Satya Mohan Surya", "AI Engineer", "Software Developer", "Computer Science", "3D Portfolio", "React", "Three.js", "Neural Cosmos"]
};
