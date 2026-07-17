import { useOutletContext } from 'react-router-dom'
import AboutHeader from './subComponents/AboutHeader.jsx'
import IdCard from './subComponents/IdCard.jsx'
import { earliestYear } from './utilities.jsx'
import { sectionClass } from './styles/tailwindStyles.jsx'
import './styles/aboutsection.css'

function AboutSection() {
  const { data, headShot, resume } = useOutletContext()
  const { name, title, tagline, bio, location } = data.about
  const photoUrl = headShot
  const socials = { ...data.socials, resume }
  const activeSince = earliestYear([...data.experience, ...data.education])

  return (
    <section id="about" className={sectionClass}>
      <AboutHeader name={name} title={title} tagline={tagline} bio={bio} socials={socials} />
      <IdCard name={name} title={title} location={location} activeSince={activeSince} photoUrl={photoUrl} />
    </section>
  )
}

export default AboutSection
