// data/portfolio.js - Semua data portfolio dalam satu file
export const personalInfo = {
  name: "Fakhrul Mukhlisin",
  title: "Information Systems Student & Digital Developer",
  subtitle: "Digital Marketing Specialist",
  description: "Information Systems student dengan GPA 3.67 yang passionate di web development modern, AI solutions, dan digital marketing.",
  email: "fahrulmukhlisin13@gmail.com",
  phone: "+62 813-1532-4195",
  location: "Jakarta, Depok Area",
  photo: "/images/profile.jpg", // Ganti dengan foto kamu
  resume: "/files/cv-fakhrul.pdf",
  social: {
    github: "https://github.com/fakrl",
    linkedin: "https://linkedin.com/in/fakrl",
    instagram: "https://instagram.com/fak.rl"
  }
}

export const skills = [
  {
    category: "Frontend Development",
    items: ["HTML5", "CSS3", "JavaScript ES6+", "React.js", "Tailwind CSS"]
  },
  {
    category: "Backend Development", 
    items: ["PHP", "MySQL", "Node.js", "RESTful APIs"]
  },
  {
    category: "Digital Marketing",
    items: ["Content Strategy", "SEO", "Social Media Marketing", "AI-Assisted Content Creation"]
  },
  {
    category: "Tools & Platform",
    items: ["Git & GitHub", "WordPress", "Azure AI Services", "Adobe Creative Suite"]
  }
]

export const projects = [
  {
    id: "admin-dashboard",
    title: "E-Commerce Admin Dashboard",
    description: "Admin dashboard dengan real-time analytics, inventory tracking, dan customer management.",
    longDescription: "Dashboard komprehensif untuk manajemen e-commerce dengan fitur analytics real-time, tracking inventory otomatis, dan sistem manajemen customer yang terintegrasi. Built dengan React modern dan Chart.js untuk visualisasi data.",
    tech: ["React", "Chart.js", "Tailwind CSS", "REST APIs"],
    category: "Web Application",
    featured: true,
    image: "/images/projects/dashboard.jpg",
    gallery: [
      "/images/projects/dashboard-1.jpg",
      "/images/projects/dashboard-2.jpg", 
      "/images/projects/dashboard-3.jpg"
    ],
    githubUrl: "https://github.com/fakrl/admin-dashboard",
    liveUrl: "https://dashboard.fakrul.dev",
    status: "Completed"
  },
  {
    id: "ai-content-generator",
    title: "AI Content Generator",
    description: "AI tool untuk generate marketing copy, social posts, dan blog content.",
    longDescription: "Smart content generation tool yang menggunakan AI untuk membuat marketing copy, social media posts, dan blog content dengan template yang bisa dikustomisasi dan optimasi brand voice.",
    tech: ["JavaScript", "OpenAI API", "CSS3", "LocalStorage"],
    category: "AI Tool",
    featured: true,
    image: "/images/projects/ai-generator.jpg",
    gallery: [
      "/images/projects/ai-gen-1.jpg",
      "/images/projects/ai-gen-2.jpg"
    ],
    githubUrl: "https://github.com/fakrl/ai-content-gen",
    liveUrl: "https://content-ai.fakrul.dev",
    status: "Completed"
  },
  {
    id: "social-media-manager",
    title: "Social Media Management Platform",
    description: "Platform untuk manage dan schedule posts di multiple platform dengan analytics.",
    longDescription: "Comprehensive social media management platform dengan fitur content scheduling, analytics tracking, dan engagement monitoring across multiple platforms social media.",
    tech: ["React", "Node.js", "MySQL", "Chart.js"],
    category: "SaaS Platform",
    featured: true,
    image: "/images/projects/social-manager.jpg",
    gallery: [
      "/images/projects/social-1.jpg",
      "/images/projects/social-2.jpg",
      "/images/projects/social-3.jpg"
    ],
    githubUrl: "https://github.com/fakrl/social-manager",
    liveUrl: "https://social.fakrul.dev",
    status: "In Development"
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Website portfolio dengan glassmorphism design, dark/light mode, dan smooth animations.",
    longDescription: "Modern, responsive portfolio website dengan glassmorphism design yang trendy, dark/light mode toggle, dan smooth animations yang built dengan vanilla JavaScript dan CSS3.",
    tech: ["HTML", "CSS", "JavaScript", "AOS"],
    category: "Portfolio",
    featured: false,
    image: "/images/projects/portfolio.jpg",
    gallery: [
      "/images/projects/portfolio-1.jpg",
      "/images/projects/portfolio-2.jpg"
    ],
    githubUrl: "https://github.com/fakrl/portofolio",
    liveUrl: "https://fakrul.netlify.app",
    status: "Completed"
  },
  {
    id: "student-dashboard",
    title: "Student Performance Dashboard",
    description: "Dashboard untuk visualisasi academic performance dengan dynamic charts.",
    longDescription: "Interactive data visualization dashboard untuk menganalisis student records dan academic performance dengan dynamic charts dan filtering capabilities menggunakan D3.js.",
    tech: ["D3.js", "JavaScript", "Bootstrap"],
    category: "Data Visualization",
    featured: false,
    image: "/images/projects/student-dash.jpg",
    gallery: [
      "/images/projects/student-1.jpg",
      "/images/projects/student-2.jpg"
    ],
    githubUrl: "https://github.com/fakrl/student-dashboard",
    liveUrl: "https://student.fakrul.dev",
    status: "Completed"
  },
  {
    id: "project-tracker",
    title: "Project Management Tool",
    description: "Kanban-style project tracker dengan drag-and-drop dan team collaboration.",
    longDescription: "Kanban-style project tracker dengan fitur drag-and-drop dan team collaboration yang built menggunakan React DnD Kit, Tailwind CSS, dan Context API.",
    tech: ["React DnD Kit", "Tailwind CSS", "Context API"],
    category: "Productivity Tool",
    featured: false,
    image: "/images/projects/project-tracker.jpg",
    gallery: [
      "/images/projects/tracker-1.jpg",
      "/images/projects/tracker-2.jpg"
    ],
    githubUrl: "https://github.com/fakrl/project-tracker",
    liveUrl: "https://tracker.fakrul.dev",
    status: "In Development"
  }
]

export const experience = [
  {
    title: "Organization Manager",
    organization: "Student Organization",
    period: "2022 - 2023",
    description: "Managed 300+ member organization, developed leadership and communication skills",
    type: "leadership"
  },
  {
    title: "Freelance Web Developer",
    organization: "Various Clients",
    period: "2023 - Present",
    description: "Building modern web applications and digital solutions for local businesses",
    type: "work"
  },
  {
    title: "Information Systems Student",
    organization: "University",
    period: "2021 - Present",
    description: "Current GPA: 3.67, Focus on web development and digital business solutions",
    type: "education"
  }
]

export const certifications = [
  // Tambahkan sertifikat kamu di sini
  {
    name: "Azure AI Services",
    issuer: "Microsoft",
    date: "2024",
    image: "/images/certs/azure.jpg",
    credentialUrl: "#"
  }
  // Tambah sertifikat lain...
]

export const services = [
  {
    title: "Web Development",
    description: "Modern, responsive websites using React, Next.js, dan teknologi terdepan",
    price: "Starting from Rp 2.500.000",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "Modern UI/UX"]
  },
  {
    title: "Digital Marketing",
    description: "Content strategy, social media management, dan AI-powered marketing solutions",
    price: "Starting from Rp 1.500.000",
    features: ["Content Strategy", "Social Media Management", "SEO", "Analytics"]
  },
  {
    title: "AI Integration",
    description: "Implementasi AI tools dan automation untuk business processes",
    price: "Custom Quote",
    features: ["AI Chatbots", "Content Generation", "Process Automation", "Custom AI Solutions"]
  }
]