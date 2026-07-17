import { useOutletContext } from 'react-router-dom'
import { startYear, VARIANTS } from './utilities.jsx'
import {
  sectionClass,
  headingClass,
  listClass,
  rowClass,
  rowBorderClass,
  yearClass,
  titleClass,
  subtitleClass,
  bulletListClass,
  descriptionClass,
} from './styles/tailwindStyles.jsx'
import './styles/styles.css'

function TimelineSection({ order, variant }) {
  const { data } = useOutletContext()
  const config = VARIANTS[variant]
  const entries = config.getData(data)

  return (
    <section id={variant} className={sectionClass}>
      <h2 className={headingClass}>
        0{order + 1} &mdash; {config.heading}
      </h2>
      <div className={listClass}>
        {entries.map((entry, index) => {
          const body = config.getBody(entry)

          return (
            <div
              key={config.getKey(entry)}
              className={`${rowClass} ${index !== entries.length - 1 ? rowBorderClass : ''}`}
            >
              <span className={yearClass}>{startYear(entry.dates)}</span>
              <div>
                <h3 className={titleClass}>{config.getTitle(entry)}</h3>
                <p className={subtitleClass}>
                  {config.getSubtitle(entry)} &middot; {entry.dates}
                </p>
                {Array.isArray(body) ? (
                  <ul className={bulletListClass}>
                    {body.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : (
                  body && <p className={descriptionClass}>{body}</p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TimelineSection
