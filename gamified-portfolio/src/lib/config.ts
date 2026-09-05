import { SiteConfig } from "./types"

export const siteConfig: SiteConfig = {
  name: "SUMIRA MAKAJU",
  title: "Game Dev | Graphic Designer | Frontend Developer | AI/ML Enthusiast",
  location: "Bhaktapur, Nepal",
  bio: [
    "Creative Game Developer and Graphic Designer with a passion for crafting immersive experiences. Skilled in Unity, C#, and 3D Math, I bring virtual worlds to life with engaging gameplay and stunning visuals.",
    "I am a curious and passionate developer who is always exploring something new to learn and use my learnings in a unique and fun way ",
    // "on my way to create my own virtual world",
  ],
  email: "mkju84sumi@gmail.com",
  github: "SumiraMakaju",
  linkedin: "https://www.linkedin.com/in/sumira-makaju/",
  figmaUrl: "https://www.figma.com/design/S2DcjCrq76nlwyB6ZooKxr/Untitled?node-id=0-1&t=9X5EWysZGDmwAvd8-1",
  canvaUrl: "https://canva.link/lv91hvd4df11s49",
  resumeUrl: "https://drive.google.com/file/d/145Xjx5r7j_tIAL0Iu59ExqwDdQepzKha/view?usp=sharing",
  weatherLocation: "Bhaktapur, Nepal",
  education: {
    institution: "Kathmandu University",
    degree: "Bachelor in computer engineering",
    period: "2022 - present (graduating in late 2026)",
  },
  experience: [
    {
      title: "Graphic Designer",
      organization: "KU IT MEET",
      details: [
        "Actively designed social media posts, banners, and posters for events in IT MEET.",
        "Created leaflets and magazine designs for IT MEET 2024.",
        "Developed design templates for certification.",
      ],
    },
    /*{
      title: "marketing and design ",
      organization: "AR treasurehunt",
      details: [
        "Actively participated in designing social media posts.Designed banners and posters for the events in IT MEET.Leaflet and Magazine Designing for the IT MEET 2024.Design Template for the certification ",
        //"   ",
      ],
    },*/
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React", "Next.js", "Tailwind", "TypeScript"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Prisma", "REST APIs"],
    },
    {
      category: "Game Dev",
      items: ["Unity", "C#", "3D Math", "Physics"],
    },
    {
      category: "UI/UX",
      items: ["Figma", "Prototyping", "Wireframing"],
    },
    {
      category: "Graphic Design",
      items: ["Canva", "Blender", "Layout Design"],
    },
    {
      category: "AI / ML",
      items: ["LLMs", "Computer Vision", "Prompt Engineering"],
    },
  ],
  projects: [

    {
      name: "ARLUDO",
      repo: "ARLudoGame",
      description: "An AR Ludo game.",
      role: "Unity Developer",
      tech: ["Unity", "AR"],
      image: "/projects/arludo.png",
      difficulty: 5,
    },
    {
      name: "SmartCrimeAI",
      repo: "Crime_Simulation_AI",
      description: "A 3D simulation of crime occurrence and prediction with hotspot heatmaps. Agents powered by ML models trained with simulated data.",
      role: "Unity Developer",
      tech: ["Unity", "ML", "3D Simulation", "Heatmaps"],
      image: "/projects/smartcrimeai.png",
      difficulty: 5,
    },
    {
      name: "Rush Rally",
      repo: "RushRally",
      description: "A car game where the player travels avoiding bumpy roads and races against declining fuel and time. Deployed on Android.",
      role: "Unity Developer",
      tech: ["Unity", "C#", "Android", "PlayerPrefs"],
      image: "/projects/rushrally.png",
      difficulty: 3,
    },
    {
      name: "GarbageGO (KU Hackfest 2025)",
      repo: "GarbageGO_v1",
      description: "An AR game powered by AI/ML that generates monsters upon detecting trash and collects them when the space is cleaned.",
      role: "Unity Developer",
      tech: ["Unity", "AR", "AI/ML", "Computer Vision"],
      image: "/projects/garbagego.jpeg",
      difficulty: 5,
    },

    {
      name: "GhumFir",
      repo: "GhumFir",
      description: "A social media website for travellers with AI-powered trip planner, ongoing local events, diary, and all social media features.",
      role: "Fullstack Developer",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Vercel"],
      image: "/projects/ghumfir.png",
      difficulty: 5,
    },
    {
      name: "Aalochana (NCIT Hackfest)",
      repo: "Aalochana_",
      description: "A real-time map-based mobile app on Expo.js that collects local complaints for the government with criticality and validity checks.",
      role: "FullStack Developer",
      tech: ["Expo.js", "React Native", "Maps"],
      image: "/projects/aalochana.png",
      difficulty: 4,
    },
    {
      name: "TMT Translator (Google Hackathon)",
      repo: "TMT-Translator",
      description: "A Chrome extension to translate webpage and video captions in real time between English, Nepali, and Tamang with pronunciation.",
      role: "Fullstack Developer",
      tech: ["Chrome Extension", "TMT API", "Translation"],
      image: "/projects/tmt.png",
      difficulty: 4,
    },

    {
      name: "SnapInsight AI",
      repo: "snap-insight1",
      description: "A desktop assistant developed with AI/ML that provides information about what is currently on the screen.",
      role: "Frontend Developer",
      tech: ["AI/ML", "Desktop", "Computer Vision"],
      image: "/projects/snapinsight.png",
      difficulty: 4,
    },
    /*
    {
      name: "Spendwise",
      repo: " ",
      description: "A budget controller app designed to organize expenses and savings, designed in Figma and polished in QT.",
      role: "Graphic Designer / Frontend Developer",
      tech: ["Figma", "QT", "UI/UX"],
      image: "/projects/spendwise.png",
      difficulty: 3,
    },
    */

    {
      name: "Multilingual Hate Speech Detection",
      repo: "realtime-hatespeech-meet-en-ne",
      description: "A browser extension for detecting hate speech in text and audio over platforms like Google Meet.",
      role: "Dataset Preparation",
      tech: ["Browser Extension", "NLP", "Audio Processing"],
      image: "/projects/hatespeech.png",
      difficulty: 4,
    },
  ],
}
