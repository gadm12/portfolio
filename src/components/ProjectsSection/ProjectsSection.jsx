import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import ProjectCard from './subcomponents/ProjectCard.jsx'
import ProjectLinkButton from './subcomponents/ProjectLinkButton.jsx'
import { getInitialFeaturedIndex, wrapIndex, getDirection } from './subcomponents/utilities.jsx'
import {
  sectionClass,
  headingClass,
  listWrapperClass,
  listRowClass,
  listRowButtonBaseClass,
  listRowButtonActiveClass,
  listRowButtonInactiveClass,
  listRowLinksClass,
} from './styles/tailwindStyles.jsx'

function ProjectsSection({ order }) {
  const { data } = useOutletContext()
  const projects = data.projects
  const [activeIndex, setActiveIndex] = useState(getInitialFeaturedIndex(projects))
  const [direction, setDirection] = useState('next')

  const goPrev = () => {
    setDirection('prev')
    setActiveIndex((i) => wrapIndex(i - 1, projects.length))
  }
  const goNext = () => {
    setDirection('next')
    setActiveIndex((i) => wrapIndex(i + 1, projects.length))
  }
  const goTo = (i) => {
    setDirection(getDirection(activeIndex, i))
    setActiveIndex(i)
  }

  return (
    <section id="projects" className={sectionClass}>
      <h2 className={headingClass}>0{order + 1} &mdash; Projects</h2>

      <ProjectCard
        key={activeIndex}
        project={projects[activeIndex]}
        index={activeIndex}
        total={projects.length}
        onPrev={goPrev}
        onNext={goNext}
        direction={direction}
      />

      <div className={listWrapperClass}>
        {projects.map((project, i) => (
          <div key={project.title} className={listRowClass}>
            <button
              type="button"
              onClick={() => goTo(i)}
              aria-current={i === activeIndex}
              className={`${listRowButtonBaseClass} ${
                i === activeIndex ? listRowButtonActiveClass : listRowButtonInactiveClass
              }`}
            >
              {project.title}
            </button>
            <div className={listRowLinksClass}>
              <ProjectLinkButton href={project.liveUrl}>Site</ProjectLinkButton>
              <ProjectLinkButton href={project.repoUrl}>Repo</ProjectLinkButton>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
