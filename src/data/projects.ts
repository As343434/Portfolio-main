import { Project } from '../types';

export const projects: Project[] = [
  {
    id: "orbit",
    title: "Orbit",
    tagline: "AI-Powered Intelligent Recruitment Ecosystem",
    stack: ["React", "Python", "Machine Learning", "Full-Stack"],
    category: ["AI/ML", "Full-Stack"],
    year: "2024",
    featured: true,
    thumbnail: "/images/projects/orbit-thumb.jpg",
    overview: "Orbit is a LinkedIn-style professional hub centered around autonomous AI matching algorithms. When an enterprise posts a job, the engine analyzes candidates across explicit skills, experience arrays, certificates, and resume matrices — then auto-suggests the top 10 best-fit professionals with weighted scoring.",
    problem: "Traditional recruitment platforms rely on basic keyword matching which fails on conceptual synonyms and structural depth. Orbit replaces that with a multi-dimensional weighted scoring engine that understands context, alignment, and experience vectors.",
    architecture: ["React Frontend Client", "Python API Backend Server", "ML Matching Engine Layer", "REST API System Endpoint"],
    features: [
      "Autonomous AI candidate ranking algorithm",
      "Dynamic skill vector conceptual analysis",
      "Company parameter calibration configuration",
      "Top-10 best-fit suggestion engine matrices"
    ],
    status: "In Development",
    githubUrl: "https://github.com/As343434/orbit",
    liveUrl: "https://orbit-omega-two.vercel.app"
  },
  {
    id: "eda-engine",
    title: "Automated Data Science Engine",
    tagline: "End-to-End EDA, Cleaning & Visualization Platform",
    stack: ["Python", "React", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    category: ["Data Science", "Full-Stack"],
    year: "2024",
    featured: true,
    thumbnail: "/images/projects/eda-engine-thumb.jpg",
    overview: "A heavy production-grade analytics environment. Users upload unstructured tabular data (such as CSV or Excel sheets) and the backend automated system handles missing values, outlier detection, statistical corrections, and outputs rich exploratory visualization maps directly mapped onto an interactive React canvas.",
    problem: "Data scientists spend 60–80% of their actual project time on tedious data cleaning and exploratory analytics. This engine automates that entire pipeline with an intuitive drop-and-solve interface.",
    architecture: ["React Canvas Grid UI", "Python Flask Backend Engine", "Pandas Dynamic Data Pipeline", "Seaborn & Matplotlib Static Rendering Stream"],
    features: [
      "Automated tabular data cleaning and correction",
      "Statistical outlier detection & visual feedback",
      "One-click EDA visualization suites and plots",
      "Export-ready slide charts and CSV generation"
    ],
    status: "Built",
    githubUrl: "https://github.com/As343434/automated-eda",
    liveUrl: "https://silvy-data.vercel.app/"
  },
  {
    id: "arambh",
    title: "Arambh",
    tagline: "Enterprise-Grade Learning Management System",
    stack: ["React", "Multi-Tier Architecture", "Full-Stack", "RBAC"],
    category: ["Full-Stack", "UI/UX"],
    year: "2024",
    featured: true,
    thumbnail: "/images/projects/arambh-thumb.jpg",
    overview: "A full enterprise-grade academic learning management system complete with four discrete user tiers: System Administrators, Faculty Members, Registered Students, and Parents. Each role experiences custom interactive frontends, tailored grade cards, access controls, and strict data modification limits.",
    problem: "Existing academic platforms are monolithic, visually uninspiring, and fail to provide specialized views for parent-teacher-student sync. Arambh is built with atomic components and role-specific UI frameworks.",
    architecture: ["React Modular UI Client", "Role-Based Access Server Control", "Multi-Tier Database Schema", "Academic API Endpoints"],
    features: [
      "Four distinct, interactive user-tier structures",
      "Granular role-based database access controllers",
      "Synchronized parent-student progress matrices",
      "Interactive course timelines and assignment builders"
    ],
    status: "Built",
    githubUrl: "https://github.com/As343434/arambh-lms",
    liveUrl: "https://arambh-phi.vercel.app"
  },
  {
    id: "noak",
    title: "Noak",
    tagline: "Peer-to-Peer Academic Resource Matrix",
    stack: ["React", "Full-Stack", "Rating Algorithms", "Resource Map"],
    category: ["Full-Stack", "UI/UX"],
    year: "2024",
    featured: false,
    thumbnail: "/images/projects/noak-thumb.jpg",
    overview: "A collaborative peer-to-peer workspace where university classmates and faculty share academic materials, research slides, and notes. Implements a customized meritocratic ranking system to highlight elite documentation and peer reviews.",
    problem: "Vital notes and peer materials frequently get lost in random group chats or localized drives. Noak surfaces high-quality reference scripts based on authentic usage.",
    architecture: ["React Content Portal", "Node.js Resource Handler", "Meritocratic Organic Scoring", "Cloud File Directory Linker"],
    features: [
      "File uploads for documents and scripts",
      "Aesthetic peer-review voting vectors",
      "Global institutional resource leaderboard",
      "Faculty endorsement tags and filter controls"
    ],
    status: "Built"
  },
  {
    id: "mindly",
    title: "Mindly",
    tagline: "Medical-Grade Clinical Psychology Tracker",
    stack: ["Full-Stack", "Literature Research", "React", "State managers"],
    category: ["Full-Stack", "Other"],
    year: "2024",
    featured: false,
    thumbnail: "/images/projects/mindly-thumb.jpg",
    overview: "Formulated using rigorous scientific review of published psychological research models. Mindly is an assessment as well as progress monitoring engine that maps psychological parameters for ADHD, behavioral depression, and specific clinical personality vectors.",
    problem: "Most digital mood journals are unscientific or highly commercialized. Mindly focuses on standardized academic criteria to record behavioral trends quantitatively.",
    architecture: ["React Clean Scoring UI", "Structured Literature Reference Models", "Private Client Storage Sync", "Dynamic Symptom Trend Renderer"],
    features: [
      "Academic literature-guided symptom surveys",
      "ADHD behavior tracking & attention analytics",
      "Personality variation screening quizzes",
      "Advanced, clinically objective data charts"
    ],
    status: "In Development",
    liveUrl: "https://mindly-us.vercel.app"
  },
  {
    id: "quill",
    title: "Quill",
    tagline: "Anti-Noise High-Signal Intellectual Forum",
    stack: ["React", "UI/UX", "Minimalist Architecture", "Typography"],
    category: ["Full-Stack", "UI/UX"],
    year: "2024",
    featured: false,
    thumbnail: "/images/projects/quill-thumb.jpg",
    overview: "An anti-mainstream high-signal social medium crafted strictly for formal debate and structured prose. The platform bans images, video, and engagement hacks (like algorithmic likes) to focus entirely on pristine typographic exchange, announcements, and formal argument threads.",
    problem: "Algorithmic feed loops reward visual shock over mental substance, lowering intellectual friction. Quill rebuilds online space for calm, rigorous discourse.",
    architecture: ["Typography-Optimized React Interface", "No-Media Validation Pipelines", "Nested Thread Tree Architecture", "Clean Text Markdown Parser"],
    features: [
      "Images, gifs, and audio completely banned in code",
      "Indented nested tree argument layouts",
      "High-density minimalist readable themes",
      "Selective academic membership validation"
    ],
    status: "In Development",
    liveUrl: "https://quill-kappa-jade.vercel.app"
  },
  {
    id: "schedule-matrix",
    title: "Intelligent Schedule Matrix",
    tagline: "University Timetable Optimization constraint engine",
    stack: ["Algorithmic Constraint Solvers", "React", "Combinatorics"],
    category: ["Full-Stack", "Other"],
    year: "2024",
    featured: false,
    thumbnail: "/images/projects/schedule-matrix-thumb.jpg",
    overview: "Built to solve the NP-hard problem of university scheduling. This client-side constraint engine ingests professor availability matrix, room capacity specs, lab restrictions, and computes optimal clash-free schedules in minutes, moving from custom scripts to a beautiful interface.",
    problem: "Timetable co-design typically takes a dedicated team of administrators days of error-prone spreadsheet adjustments. This solver eliminates manual overlap scanning.",
    architecture: ["Constraint Solver Framework", "React Drag-and-Adjust Interface", "Professor Conflict Resolution Algorithm", "CSV Timetable Exporter"],
    features: [
      "Overlapping availability detection",
      "Lab equipment constraint filters",
      "Automated clash resolution with 1 click",
      "Days of logistical work reduced to 10 minutes"
    ],
    status: "Built",
    liveUrl: "https://vaize.vercel.app/"
  },
  {
    id: "deepdatahack-platform",
    title: "DeepDataHack Platform",
    tagline: "Official University Hackathon Platform",
    stack: ["React", "Full-Stack", "Data Pipelines", "Real-Time Scoring"],
    category: ["Full-Stack", "Other"],
    year: "2024",
    featured: false,
    thumbnail: "/images/projects/deepdatahack-thumb.jpg",
    overview: "Singlehandedly designed, coded, and deployed the official hackathon system for K.R. Mangalam University's DeepDataHack. The environment handled real-time student submissions, validation scoring, live judge score inputs, and scoreboard updates.",
    problem: "Ad-hoc hackathons struggle with disorganized file sharing, delays in evaluation, and delayed leaderboards. DeepDataHack required a robust system on a zero-budget timeline.",
    architecture: ["React Live Frontend", "Secure Submission API", "Judge Scoring System Interface", "Admin Leaderboard Panel"],
    features: [
      "Participant portal with template download",
      "Real-time evaluation interface for live judges",
      "Instant submission tracking pipeline",
      "Interactive podium scoreboard screen"
    ],
    status: "Deployed & Used"
  }
];