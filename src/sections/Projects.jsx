import { projects, socials } from '../data/content.js'
import SectionWrapper from '../components/SectionWrapper.jsx'
import ProjectCard from '../components/ProjectCard.jsx'

export default function Projects() {
  return (
    <SectionWrapper id="projects" eyebrow="Selected Work" title="Projects">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        More on{' '}
        <a
          href={socials.github}
          target="_blank"
          rel="noreferrer"
          className="link-underline text-accent"
        >
          GitHub
        </a>
        .
      </p>
    </SectionWrapper>
  )
}
