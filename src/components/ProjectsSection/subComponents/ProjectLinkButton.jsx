import { projectLinkButtonDisabledClass, projectLinkButtonClass } from '../styles/tailwindStyles.jsx'

function ProjectLinkButton({ href, children }) {
  if (!href) {
    return (
      <span aria-disabled="true" className={projectLinkButtonDisabledClass}>
        {children}
      </span>
    )
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={projectLinkButtonClass}>
      {children}
    </a>
  )
}

export default ProjectLinkButton
