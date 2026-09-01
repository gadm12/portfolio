import { useOutletContext } from 'react-router-dom'
import SkillTile from './subComponents/SkillTile.jsx'
import { SECTIONS, getBaseSize, groupSkillsBySection } from './subComponents/utilities.jsx'
import {
  sectionClass,
  headerRowClass,
  headingClass,
  subHeadingClass,
  dividerClass,
  gridBoxClass,
} from './styles/tailwindStyles.jsx'
import './styles/styles.css'

function SkillsSection({ order }) {
  const { data } = useOutletContext()
  const grouped = groupSkillsBySection(data.skills)
  // Skip any section with nothing in it, so an emptied-out group doesn't
  // leave a bare bordered box (and a stray divider) on the page.
  const visibleSections = SECTIONS.filter(({ key }) => grouped[key].length > 0)

  return (
    <section id="skills" className={sectionClass}>
      <div className={headerRowClass}>
        <h2 className={headingClass}>0{order + 1} &mdash; Skills</h2>
      </div>

      {visibleSections.map(({ key, label }, index) => (
        <div key={key}>
          {index > 0 && <hr className={dividerClass} />}
          <h3 className={subHeadingClass}>{label}</h3>
          <div className={gridBoxClass}>
            {grouped[key].map((skill) => (
              <SkillTile key={skill.name} skill={skill} size={getBaseSize(skill)} />
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default SkillsSection
