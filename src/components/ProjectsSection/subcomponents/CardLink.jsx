import { cardLinkDisabledClass, cardLinkClass } from '../styles/tailwindStyles.jsx'

function CardLink({ href, children }) {
  if (!href) {
    return <span className={cardLinkDisabledClass}>{children}</span>
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={cardLinkClass}>
      {children} &rarr;
    </a>
  )
}

export default CardLink
