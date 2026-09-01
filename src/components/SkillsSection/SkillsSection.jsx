import { useOutletContext } from 'react-router-dom'
import SkillTile from './subComponents/SkillTile.jsx'
import {
  SECTIONS,
  getBaseSize,
  groupSkillsByLevel,
  groupSkillsBySection,
} from './subComponents/utilities.jsx'
import {
  sectionClass,
  headerRowClass,
  headingClass,
  sectionBlockClass,
  subHeadingClass,
  gridBoxClass,
  tileRowClass,
} from './styles/tailwindStyles.jsx'
import './styles/styles.css'

function SkillsSection({ order }) {
  const { data } = useOutletContext()
  const grouped = groupSkillsBySection(data.skills)
  // Skip any section with nothing in it, so an emptied-out group doesn't
  // leave a bare bordered box on the page.
  const visibleSections = SECTIONS.filter(({ key }) => grouped[key].length > 0)

  return (
    <section id="skills" className={sectionClass}>
      <div className={headerRowClass}>
        <h2 className={headingClass}>0{order + 1} &mdash; Skills</h2>
      </div>

      {visibleSections.map(({ key, label }) => (
        <div key={key} className={sectionBlockClass}>
          <h3 className={subHeadingClass}>{label}</h3>
          <div className={gridBoxClass}>
            {groupSkillsByLevel(grouped[key]).map(({ level, skills }) => (
              <div key={level} className={tileRowClass}>
                {skills.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} size={getBaseSize(skill)} />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}

export default SkillsSection
