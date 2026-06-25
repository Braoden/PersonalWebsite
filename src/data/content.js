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
  role: 'Full-Stack Developer',
  email: 'chanb53@mcmaster.ca',
  resumeUrl: '/Braden-Chan-Resume.pdf', // served from public/
}

export const socials = {
  github: 'https://github.com/Braoden',
  linkedin: 'https://www.linkedin.com/in/bradenchan/',
  email: 'mailto:chanb53@mcmaster.ca',
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
  tagline: 'Software Developper',
  subtext:
    'I build full-stack apps, physics simulations, and interactive 3D experiences — software that feels alive across both ends of the stack.',
  ctas: [
    { label: 'About Me', target: '#about', primary: true },
    { label: 'Contact Me', target: '#contact', primary: false },
  ],
}

export const about = {
  heading: 'About',
  paragraphs: [
    "I'm a Computer Science (Co-op) student at McMaster University who loves building things that challenge my skills and feel alive. I work across the full stack — polished React and Next.js frontends backed by clean Node and Python services — and right now I lead full-stack development for McMaster Advanced Space Systems.",
    'I believe great software lives across both ends: a responsive, enjoyable interface sitting on top of clean, well-structured code. The small interaction details are what make an app genuinely satisfying to use, so that’s where I spend my time.',
    'Recent work spans a physics-accurate 3D solar system simulator, a local-first desktop assistant powered by the Claude API, and a tactile habit tracker driven by a hand-built 2D physics engine.',
  ],
  summary: '',
}

export const skills = [
  { group: 'Languages', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'HTML / CSS', 'C / C++', 'SQL'] },
  { group: 'Frameworks & Libraries', items: ['React', 'Next.js', 'Express', 'Electron', 'ClaudeAPI', 'FastAPI'] },
  { group: 'Game & 3D', items: ['Panda3D', 'Three.js', 'Godot', 'Unity', 'Blender'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Figma'] },
]

export const projects = [
  {
    title: 'Completion Calendar',
    description:
      'A habit tracker where finishing a task drops a physics-simulated ball into the day you did it. A custom 2D physics engine, jar-filling mechanics with confetti milestones, FLIP zoom animations, and year/month/day views — with zero runtime dependencies.',
    tech: ['JavaScript', 'HTML5 Canvas', 'Electron', 'Custom Physics'],
    language: 'JavaScript',
    repo: 'https://github.com/Braoden/CompletionCalendar',
    demo: null,
  },
  {
    title: 'AI Client File System',
    description:
      "A local-first desktop app that organizes clients into real disk folders and lets you chat with a Claude-powered assistant grounded in each client's files — nothing is uploaded to a third-party cloud. A RESTful API with 13+ endpoints handles profiles, file uploads up to 20 MB, and persistent chat history with a filesystem-as-database design.",
    tech: ['React', 'Electron', 'Node.js', 'Express', 'Claude API'],
    language: 'JavaScript',
    repo: 'https://github.com/Braoden/ClientFileSystem',
    demo: null,
  },
  {
    title: 'SolarSym',
    description:
      'A realistic 3D solar system simulation with physics-based gravity and orbital mechanics computed from real-world values — Newtonian gravitation, velocity-Verlet integration, motion trails, an orbit/pan/zoom camera, time-scale control, and a clickable minimap.',
    tech: ['Python', 'Panda3D', 'Blender', 'Physics'],
    language: 'Python',
    repo: 'https://github.com/Braoden/SolarSym',
    demo: null,
  }
]

// -----------------------------------------------------------------------------
// Experience & education — sourced from Braden's resume (2026-06).
// The Experience section shows a warning banner only if any entry is flagged
// `isPlaceholder: true`; all real entries below omit that flag.
// -----------------------------------------------------------------------------
export const experienceNote = ''

export const experience = [
  {
    type: 'work',
    role: 'Software Developer',
    org: 'McMaster Advanced Space Systems',
    period: 'Feb 2026 — Present',
    summary:
      'Lead end-to-end full-stack development of the official MASS website in Next.js — a scalable platform for sponsor outreach, recruitment, and visibility. Helped secure $2K+ in funding for the CAN-SBX competition, with responsive design, performance optimization, and Git-based CI workflows.',
  },
  {
    type: 'work',
    role: 'VP Communications',
    org: 'McMaster Game Development',
    period: 'Oct 2025 — Present',
    summary:
      'Direct all promotional content for @MacGDC, driving 30+ submissions to our flagship GameJam hackathon — a 105% jump in participation year over year. Run weekly meetings and monthly Godot, Unity, and Blender workshops, plus cross-club collaborations and sponsorships.',
  },
  {
    type: 'work',
    role: 'Financial Advisor Assistant',
    org: 'Investia Financial Services Inc.',
    period: 'Jun 2025 — Sep 2025',
    summary:
      'Supported the Branch Manager with daily operational and administrative work, helping optimize investment portfolios and reduce processing delays by 15%.',
  },
  {
    type: 'work',
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
]

export const contact = {
  heading: 'Get in Touch',
  blurb:
    "Have a project in mind, a role to fill, or just want to talk shop about 3D and physics on the web? Drop me a line — I'd love to hear from you.",
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
