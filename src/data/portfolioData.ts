export interface Project {
  id: string;
  number: string;
  title: string;
  fullTitle?: string;
  category: string;
  description: string;
  highlights: string[];
  role: string;
  technologies?: string[];
  liveUrl?: string;
  githubUrl?: string;
  isOngoing?: boolean;
  themeColor: string;
  accentGradient: string;
  accentBorder: string;
}

export interface Certification {
  id: string;
  number: string;
  title: string;
  issuer: string;
  dateOrDuration?: string;
  professor?: string;
  achievements?: string[];
  score?: string;
  assignmentScore?: string;
  badge?: string;
  isTopAchievement?: boolean;
  category: 'Design' | 'AI & Data' | 'Cloud & Web' | 'Competitive';
}

export interface SkillCategory {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
  }[];
}

export interface ExperienceItem {
  position: string;
  organization: string;
  duration: string;
  role: string;
  description: string;
  highlights: string[];
  location?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  duration: string;
  location: string;
  description: string;
  highlights?: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "RAKSHANA R.",
    shortName: "Rakshana",
    initials: "RR",
    titles: [
      "UI/UX DESIGNER",
      "FRONTEND DEVELOPER",
      "CREATIVE BUILDER"
    ],
    headline: "I DESIGN THE VISION.\nI CODE THE EXPERIENCE.",
    supportingSubheadline: "I transform creative ideas into immersive digital experiences.",
    introParagraph:
      "I'm Rakshana R., a B.Tech Information Technology student passionate about crafting visually stunning, interactive, and user-centered digital products. I combine thoughtful design with modern frontend technologies to create experiences that are not just functional, but memorable.",
    statusBadge: "Available for Internships & Projects",
    location: "Coimbatore, Tamil Nadu, India",
    email: "rakshanarajagopal93@gmail.com",
    phone: "+91 6379290608",
    resumeUrl: "/resume.pdf",
    profiles: {
      linkedin: "https://linkedin.com/in/rakshana-rajagopal",
      github: "https://github.com/rakshana2807",
      leetcode: "https://leetcode.com/u/RAKSHANA_RAJAGOPAL/"
    }
  },

  about: {
    heading: "Designing Experiences. Building Possibilities.",
    paragraphs: [
      "I'm a passionate Information Technology student with a strong interest in UI/UX design and frontend development.",
      "I enjoy transforming ideas into engaging digital experiences through creative interfaces, smooth interactions, and thoughtful user experiences.",
      "With a foundation in design and web development, I focus on building modern, responsive, and visually appealing applications that balance creativity with functionality.",
      "I'm continuously exploring new technologies, experimenting with interactive design, and pushing my creative boundaries to become a better designer and developer.",
      "My goal is to create digital products that combine innovation, usability, and impactful visual design."
    ],
    metrics: [
      { label: "Featured Projects", value: "06", detail: "Interactive & Systems" },
      { label: "Credentials & Badges", value: "09", detail: "NPTEL Silver & Industry" },
      { label: "Academic Journey", value: "B.Tech IT", detail: "BIT Sathyamangalam" },
      { label: "Design Principle", value: "User-Centered", detail: "Aesthetic + Performance" }
    ]
  },

  skillCategories: [
    {
      id: "uiux",
      name: "UI/UX DESIGN",
      tagline: "Human-centered interfaces, intuitive flows & wireframes",
      iconName: "Palette",
      skills: [
        { name: "User Interface Design", level: "Advanced", highlight: true },
        { name: "User Experience Design", level: "Advanced", highlight: true },
        { name: "Wireframing", level: "Proficient" },
        { name: "Prototyping", level: "Proficient", highlight: true },
        { name: "Visual Design", level: "Advanced" },
        { name: "Responsive Design", level: "Advanced" },
        { name: "Figma", level: "Tool of Choice", highlight: true }
      ]
    },
    {
      id: "frontend",
      name: "FRONTEND DEVELOPMENT",
      tagline: "Modern responsive code, interactive components & frameworks",
      iconName: "Code2",
      skills: [
        { name: "HTML5", level: "Semantic Mastery" },
        { name: "CSS3", level: "Modern Flex/Grid/Motion" },
        { name: "JavaScript", level: "ES6+ Interactive Logic", highlight: true },
        { name: "React", level: "Component Architecture", highlight: true },
        { name: "Responsive Web Development", level: "Mobile-First" },
        { name: "Interactive UI Development", level: "Motion & Depth", highlight: true }
      ]
    },
    {
      id: "programming",
      name: "PROGRAMMING",
      tagline: "Algorithmic thinking, robust logic & problem solving",
      iconName: "Terminal",
      skills: [
        { name: "Python", level: "Applied Scripting & AI", highlight: true },
        { name: "C++", level: "Core Problem Solving" },
        { name: "Data Structures and Algorithms", level: "Analytical Foundation", highlight: true }
      ]
    },
    {
      id: "backend",
      name: "BACKEND FUNDAMENTALS",
      tagline: "Connecting client experiences to structured data layers",
      iconName: "Database",
      skills: [
        { name: "API Integration", level: "RESTful Endpoints", highlight: true },
        { name: "Database Fundamentals", level: "Relational & Document" },
        { name: "Application Data Management", level: "State & Persistence" }
      ]
    },
    {
      id: "creative",
      name: "CREATIVE & TECHNICAL STRENGTHS",
      tagline: "Synthesizing strategic thinking with execution velocity",
      iconName: "Sparkles",
      skills: [
        { name: "Design Thinking", level: "Process Driven", highlight: true },
        { name: "Problem Solving", level: "Analytical" },
        { name: "Interactive Design", level: "Micro-interactions", highlight: true },
        { name: "AI-Assisted Development", level: "Modern Tooling", highlight: true },
        { name: "User-Centered Design", level: "Core Philosophy" }
      ]
    }
  ] as SkillCategory[],

  projects: [
    {
      id: "royalcafe-connect",
      number: "01",
      title: "ROYALCAFE CONNECT",
      fullTitle: "RoyalCafe Connect — Modern Café Wi-Fi Portal",
      category: "Web Development / UI Design",
      description:
        "RoyalCafe Connect is a modern café Wi-Fi portal experience designed to provide users with a visually appealing and seamless digital interaction. The project focuses on elegant interface design, intuitive navigation, and a refined user experience.",
      highlights: [
        "Modern café-inspired UI",
        "User-friendly Wi-Fi portal experience",
        "Responsive interface design",
        "Elegant maroon and gold visual theme"
      ],
      role: "UI/UX Design and Frontend Development",
      liveUrl: "https://royalcafe-connect.vercel.app/",
      themeColor: "#b91c1c",
      accentGradient: "from-amber-600 via-rose-700 to-amber-900",
      accentBorder: "border-amber-500/30"
    },
    {
      id: "workhub",
      number: "02",
      title: "WORKHUB",
      fullTitle: "WorkHub — Co-working Space Booking and Desk Management System",
      category: "Web Application / Booking System",
      description:
        "WorkHub is a co-working space booking and desk management system designed to simplify workspace reservations and desk allocation. The platform focuses on making workspace management more organized through an intuitive digital experience.",
      highlights: [
        "Workspace booking interface",
        "Desk management system",
        "Desk availability visualization",
        "Organized booking experience",
        "User-friendly dashboard"
      ],
      role: "UI/UX Design and Web Development",
      themeColor: "#3b82f6",
      accentGradient: "from-blue-600 via-indigo-600 to-cyan-500",
      accentBorder: "border-blue-500/30"
    },
    {
      id: "mixora",
      number: "03",
      title: "MIXORA",
      fullTitle: "MIXORA — Interactive Bubble Tea Customization Platform",
      category: "Interactive Web Experience",
      description:
        "MIXORA is an interactive bubble tea customization platform that allows users to personalize their drinks through a creative and engaging digital experience. The project combines playful visual design with interactive customization functionality.",
      highlights: [
        "Interactive bubble tea customization",
        "Personalized drink selection",
        "AI Taste Matcher concept",
        "Engaging user interface",
        "Responsive web experience"
      ],
      role: "UI/UX Design and Frontend Development",
      liveUrl: "https://mixora-v01-coral.vercel.app/index.html",
      themeColor: "#ec4899",
      accentGradient: "from-pink-500 via-purple-600 to-rose-400",
      accentBorder: "border-pink-500/30"
    },
    {
      id: "mindtwin-ai",
      number: "04",
      title: "MINDTWIN AI",
      fullTitle: "MindTwin AI — Digital Twin Mental Wellness Application",
      category: "Artificial Intelligence / Mental Wellness",
      description:
        "MindTwin AI is an AI-powered mental wellness application designed to provide personalized emotional wellbeing support through a digital twin experience. The application focuses on mood tracking, personalized wellness recommendations, and an intelligent AI companion.",
      highlights: [
        "Personalized digital twin experience",
        "AI-powered emotional intelligence",
        "Mood check-ins and wellness tracking",
        "AI companion",
        "Adaptive wellness recommendations",
        "Personal wellness history"
      ],
      role: "UI/UX Design and Application Development",
      isOngoing: true,
      themeColor: "#8b5cf6",
      accentGradient: "from-purple-600 via-indigo-500 to-teal-400",
      accentBorder: "border-purple-500/30"
    },
    {
      id: "vision-hack",
      number: "05",
      title: "VISION HACK",
      fullTitle: "Vision Hack — Object Detection",
      category: "AI / Computer Vision",
      description:
        "Vision Hack is an object detection project focused on identifying and detecting objects from visual inputs using computer vision techniques. The project explores the application of artificial intelligence in visual recognition and object detection.",
      highlights: [
        "AI-based object detection",
        "Visual object recognition",
        "Computer vision application"
      ],
      role: "AI / Project Development",
      themeColor: "#06b6d4",
      accentGradient: "from-cyan-500 via-sky-600 to-blue-700",
      accentBorder: "border-cyan-500/30"
    },
    {
      id: "study-mate-ai",
      number: "06",
      title: "STUDY MATE AI",
      fullTitle: "Study Mate AI — Student Productivity & Learning Companion",
      category: "UI/UX Design / AI Education",
      description:
        "Study Mate AI is a UI/UX design concept for an AI-powered student productivity and learning companion. The interface is designed to make studying more organized, interactive, and engaging.",
      highlights: [
        "AI study companion interface",
        "Student-focused dashboard",
        "Study planner UI concept",
        "Modern and intuitive design",
        "AI-powered learning experience concept"
      ],
      role: "UI/UX Designer",
      themeColor: "#10b981",
      accentGradient: "from-emerald-500 via-teal-600 to-cyan-500",
      accentBorder: "border-emerald-500/30"
    }
  ] as Project[],

  certifications: [
    {
      id: "nptel-ui",
      number: "01",
      title: "NPTEL — UI Design",
      issuer: "IIT Roorkee",
      professor: "Prof. Saptarshi Kolay",
      achievements: [
        "Elite + Silver Certification",
        "Top 5% Performer",
        "87% Overall Score",
        "93% Assignment Score"
      ],
      score: "87% Overall (Elite + Silver)",
      assignmentScore: "93%",
      badge: "Top 5% Performer",
      isTopAchievement: true,
      category: "Design"
    },
    {
      id: "thiranex-internship-cert",
      number: "02",
      title: "UI/UX Designing Internship",
      issuer: "Thiranex EduTech LLP",
      dateOrDuration: "May–June 2026",
      achievements: [
        "Hands-on UI/UX Design Exposure",
        "User-Centered Design Methodology",
        "Design Workflows & Usability"
      ],
      isTopAchievement: true,
      category: "Design"
    },
    {
      id: "cisco-html",
      number: "03",
      title: "HTML Essentials",
      issuer: "Cisco Networking Academy, BIT",
      achievements: ["Semantic HTML5", "Web Standards & Structure"],
      category: "Cloud & Web"
    },
    {
      id: "ibm-ai-data",
      number: "04",
      title: "AI & Data",
      issuer: "IBM Z Day 2025",
      dateOrDuration: "Issued by IBM on 03 December 2025",
      achievements: ["Enterprise AI Architecture", "Data Workflows"],
      category: "AI & Data"
    },
    {
      id: "google-llm",
      number: "05",
      title: "Google LLM",
      issuer: "Google",
      achievements: ["Large Language Models", "Prompt Engineering Foundations"],
      category: "AI & Data"
    },
    {
      id: "leetcode-navigator",
      number: "06",
      title: "LeetCode — Data Navigator Badge",
      issuer: "LeetCode",
      achievements: ["Algorithmic Problem Solving", "Data Structures Mastery"],
      badge: "Data Navigator Badge",
      isTopAchievement: true,
      category: "Competitive"
    },
    {
      id: "nasscom-data",
      number: "07",
      title: "Acquiring Data",
      issuer: "IT-ITeS SSC / Nasscom",
      achievements: ["Data Ingestion & Sourcing", "Data Processing Fundamentals"],
      category: "AI & Data"
    },
    {
      id: "git-github",
      number: "08",
      title: "Git & GitHub",
      issuer: "Version Control Systems",
      achievements: ["Branching & Collaborative Workflows", "Open Source Collaboration"],
      category: "Cloud & Web"
    },
    {
      id: "aws-cloud",
      number: "09",
      title: "AWS Educate — Introduction to Cloud 101 Training",
      issuer: "Amazon Web Services (AWS)",
      achievements: ["Cloud Computing Fundamentals", "AWS Architecture Overview"],
      category: "Cloud & Web"
    }
  ] as Certification[],

  keyAchievements: [
    {
      title: "NPTEL UI Design Elite + Silver",
      detail: "Conducted by IIT Roorkee (87% Overall, 93% Assignment Score)"
    },
    {
      title: "Top 5% Performer",
      detail: "Among thousands of nationwide participants in NPTEL UI Design"
    },
    {
      title: "LeetCode Data Navigator Badge",
      detail: "Recognized for consistent algorithmic competence and data navigation"
    }
  ],

  experience: [
    {
      position: "UI/UX DESIGNING INTERN",
      organization: "Thiranex EduTech LLP",
      duration: "May 2026 – June 2026",
      role: "UI/UX Designer Intern",
      description:
        "Worked as a UI/UX Designing Intern, gaining practical exposure to user interface design and user experience principles.",
      highlights: [
        "Worked on UI/UX design activities",
        "Applied user-centered design principles",
        "Focused on creating visually appealing interfaces",
        "Developed practical design skills",
        "Gained exposure to design workflows",
        "Strengthened visual design and usability knowledge"
      ]
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: "Bachelor of Technology — Information Technology",
      institution: "Bannari Amman Institute of Technology",
      duration: "August 2025 – July 2029",
      location: "Erode, Tamil Nadu, India",
      description:
        "Currently pursuing a B.Tech in Information Technology, building a strong foundation in programming, data structures and algorithms, and problem-solving. Actively developing technical skills through coding practice and hands-on projects.",
      highlights: [
        "Focus on Frontend Engineering & Creative UI/UX Design",
        "Strong foundation in C++, Python, Data Structures & Algorithms",
        "Building production-grade interactive digital products"
      ]
    }
  ] as EducationItem[],

  resume: {
    heading: "Explore My Resume",
    description:
      "Want to know more about my skills, projects, and experience? Download my resume to explore my technical expertise, creative work, certifications, and professional journey.",
    cta: "Download Resume",
    secondaryCta: "Preview Document"
  },

  contact: {
    heading: "Let's Create Something Extraordinary.",
    description:
      "I'm always excited to explore new ideas, collaborate on creative projects, and connect with people who share a passion for technology and design. Have an opportunity or an interesting idea? Let's connect and bring it to life. Let's build something remarkable together!"
  },

  footer: {
    name: "RAKSHANA R.",
    titles: "UI/UX DESIGNER • FRONTEND DEVELOPER",
    motto: "Designed and Developed with Creativity and Code.",
    copyright: "© 2026 Rakshana R. All Rights Reserved."
  }
};

