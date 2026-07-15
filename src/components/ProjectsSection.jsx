import portfolioData from '../data/portfolio-data.json'
import ProjectCard from './ProjectCard.jsx'

function ProjectsSection() {
  const projects = portfolioData.projects

  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Projects</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
