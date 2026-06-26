// =============================================================================
// content.js — single source of truth for all site copy & data.
// Edit this file to update the site; components never hard-code content.
//
// Sources used (2026-06):
//   • Resume   (Braden Chan -- Resume.pdf) — experience, education, skills (real)
//   • GitHub   https://github.com/Braoden   — bio, pinned projects (real)
//   • LinkedIn https://www.linkedin.com/in/bradenchan/ — not accessible (login wall)
// All content below is real — no placeholders remain.
// =============================================================================

export const meta = {
  name: 'Braden Chan',
  resumeUrl: '/Braden-Chan-Resume.pdf', // served from public/
}

export const socials = {
  github: 'https://github.com/Braoden',
  linkedin: 'https://www.linkedin.com/in/bradenchan/',
  email: 'mailto:bradennchan@gmail.com',
}

export const nav = [
  { label: 'About', target: '#about' },
  { label: 'Skills', target: '#skills' },
  { label: 'Work', target: '#projects' },
  { label: 'Experience', target: '#experience' },
  { label: 'Education', target: '#education' },
  { label: 'Contact', target: '#contact' },
]

export const hero = {
  name: 'Braden Chan',
  tagline: 'Software Developer',
  subtext:
    'I build things that challenge my skills and push my abilities while making products that feel passionate on all ends of development',
  ctas: [
    { label: 'About Me', target: '#about', primary: true },
    { label: 'Contact Me', target: '#contact', primary: false },
  ],
}

export const about = {
  heading: 'About',
  paragraphs: [
    "I'm currently a Computer Science student at McMaster University focusing on learning as much as possible about all types of software development. I regularly work with React, JavaScript, and Python for full-stack projects, while focusing on balancing responsive UI with clean backend code. I'm drawn to computational challenges—physics simulations, 3D graphics, real-time rendering, and complex algorithms—and enjoy solving performance problems at scale. I'm learning more about cloud deployment (AWS), infrastructure design, and moving projects from local development to production-ready systems.",
    "Beyond code, I'm obsessed with interaction details: natural animations, immediate UI responsiveness, and interactivity that make software interesting to use. I'm always learning new languages and frameworks by working on projects that stretch my abilities, especially when they're outside my scope."
  ],
}

export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML / CSS', 'C / C++', 'SQL'] },
  { group: 'Frameworks & Libraries', items: ['React', 'Next.js', 'Express.js', 'Electron', 'ClaudeAPI', 'FastAPI'] },
  { group: 'Game & 3D', items: ['Panda3D', 'Three.js', 'Godot', 'Unity', 'Blender'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Node.js', 'Vite', 'Figma'] },
]

export const projects = [
  {
    title: 'Task Calendar',
    description:
      'A calendar and habit-tracker built for anyone who wants habit tracking to feel tactile, responsive, and interactive instead of a spreadsheet. Features a custom 2D physics engine, various reward mechanics, and many other animations with zero runtime dependencies.',
    tech: ['JavaScript', 'Node.js', 'Electron', 'Custom Physics'],
    language: 'JavaScript',
    repo: 'https://github.com/Braoden/TaskCalendar',
    demo: null,
  },
  {
    title: 'AI Client File System',
    description:
      "A local-first desktop app that organizes clients into real disk folders and lets you chat with an AI assistant powered by Claude grounded in each client's files and information.",
    tech: ['React', 'Electron', 'Node.js', 'Express.js', 'Claude API'],
    language: 'JavaScript',
    repo: 'https://github.com/Braoden/ClientFileSystem',
    demo: null,
  },
  {
    title: 'SolarSym',
    description:
      'A realistic 3D solar system simulation with physics and mechanics computed from real-world values at a scale. Runs on a custom 3D astrophysics engine and uses 3D models created using satellite images from NASA.',
    tech: ['Python', 'Panda3D', 'Blender', 'Custom Physics'],
    language: 'Python',
    repo: 'https://github.com/Braoden/SolarSym',
    demo: null,
  }
]

// -----------------------------------------------------------------------------
// The Experience section shows a warning banner only if any entry is flagged
// `isPlaceholder: true`; all real entries below omit that flag.
// -----------------------------------------------------------------------------
export const experienceNote = ''

export const experience = [
  {
    role: 'Software Developer',
    org: 'McMaster Advanced Space Systems',
    period: 'Feb 2026 — Present',
    summary:
      'Lead end-to-end full-stack development of the official MASS website in Next.js — a scalable platform for sponsor outreach, recruitment, and visibility. Helped secure $2K+ in funding for the CAN-SBX competition, with responsive design, performance optimization, and Git-based CI workflows.',
  },
  {
    role: 'VP Communications',
    org: 'McMaster Game Development',
    period: 'Oct 2025 — Present',
    summary:
      'Direct all promotional content for @MacGDC, driving 30+ submissions to our flagship GameJam hackathon — a 105% jump in participation year over year. Run weekly meetings and monthly Godot, Unity, and Blender workshops, plus cross-club collaborations and sponsorships.',
  },
  {
    role: 'Financial Advisor Assistant',
    org: 'Investia Financial Services Inc.',
    period: 'Jun 2025 — Sep 2025',
    summary:
      'Supported the Branch Manager with daily operational and administrative work, helping optimize investment portfolios and reduce processing delays by 15%.',
  },
  {
    role: 'Media Executive',
    org: 'PETHS Game Development Club',
    period: 'Sep 2024 — June 2025',
    summary:
      'Managed the club\'s social media presence and events, designing promotional content with Canva to increase workshop and event attendance'
  },
  {
    role: 'Assistant Teacher',
    org: 'Spirit of Math Schools Inc.',
    period: 'Sep 2022 — Jun 2025',
    summary:
      'Taught an advanced math curriculum and launched weekly drop-in homework help with personalized guidance, contributing to a 10% improvement in average test scores across 100+ students.',
  },
]

export const education = [
  {
    role: 'BASc, Honours Computer Science (Co-op)',
    org: 'McMaster University · Hamilton, ON',
    period: 'Sep 2025 — Present',
    summary: 'GPA: 3.8 / 4.0 · Dean\'s Honour List',
  },
  {
    role: 'Ontario Secondary School Diploma',
    org: 'Pierre Elliott Trudeau High School · Markham, ON',
    period: 'Sep 2020 — Jun 2025',
    summary: 'French Immersion Certificate',
  },
]

export const contact = {
  heading: 'Get in Touch',
  blurb:
    "Have a project in mind, a role to fill, or just want to talk? Reach out to me using the contacts and socials below.",
}

export default {
  meta,
  socials,
  nav,
  hero,
  about,
  skills,
  projects,
  experience,
  education,
  experienceNote,
  contact,
}
