import { Github, Linkedin, Mail } from 'lucide-react'
import { contact, socials } from '../data/content.js'
import SectionWrapper from '../components/SectionWrapper.jsx'

const links = [
  { icon: Github, href: socials.github, label: 'GitHub' },
  { icon: Linkedin, href: socials.linkedin, label: 'LinkedIn' },
  { icon: Mail, href: socials.email, label: 'Email' },
]

export default function Contact() {
  return (
    <SectionWrapper id="contact" eyebrow="Say Hello" title={contact.heading}>
      <p className="max-w-xl text-base leading-relaxed text-muted">{contact.blurb}</p>

      <div className="mt-10 flex flex-wrap gap-4">
        {links.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            className="glass inline-flex items-center gap-3 px-6 py-4 text-text transition-all duration-300 hover:-translate-y-0.5 hover:text-accent"
          >
            <Icon size={20} /> {label}
          </a>
        ))}
      </div>
    </SectionWrapper>
  )
}
