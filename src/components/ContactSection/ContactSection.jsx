import { useOutletContext } from 'react-router-dom'
import {
  sectionClass,
  headingClass,
  headlineClass,
  buttonRowClass,
  emailButtonClass,
  resumeButtonClass,
} from './styles/tailwindStyles.jsx'
import './styles/styles.css'

function ContactSection({ order }) {
  const { data, resume } = useOutletContext()
  const { headline, email } = data.contact

  return (
      <section id="contact" className={sectionClass}>
        <h2 className={headingClass}>0{order + 1} &mdash; Contact</h2>
        <p className={headlineClass}>{headline || "Let's build something."}</p>
        <div className={buttonRowClass}>
          {email && (
            <a href={`mailto:${email}`} className={emailButtonClass}>
              Email Me
            </a>
          )}
          {resume && (
            <a href={resume} target="_blank" rel="noreferrer" className={resumeButtonClass}>
              View Resume
            </a>
          )}
        </div>
      </section>
  )
}

export default ContactSection
