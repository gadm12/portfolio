import { useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import SkillTile from './subComponents/SkillTile.jsx'
import {
  BASE_TILE_SIZE,
  getCategories,
  filterSkillsByCategory,
  computeGridLayout,
  useGridMeasurements,
} from './subComponents/utilities.jsx'
import {
  sectionClass,
  headerRowClass,
  headingClass,
  selectWrapperClass,
  selectClass,
  selectArrowClass,
  gridWrapperClass,
  measurerClass,
  gridBoxClass,
} from './styles/tailwindStyles.jsx'
import './styles/styles.css'

function SkillsSection({ order }) {
  const { data } = useOutletContext()
  const skills = data.skills
  const categories = getCategories(skills)
  const [category, setCategory] = useState('All')
  const filtered = filterSkillsByCategory(skills, category)

  const wrapperRef = useRef(null)
  const measurerRef = useRef(null)
  const { containerWidth, referenceHeight } = useGridMeasurements(wrapperRef, measurerRef)

  // containerWidth is the outer wrapper's width (no padding/border of its own), so the
  // visible box's own p-6 padding (48px) and 1px border on each side (2px) must be
  // subtracted to get its true content width.
  const innerWidth = containerWidth - 48 - 2
  // referenceHeight comes from the measurer's contentRect, which ResizeObserver
  // already reports as content-box height (padding excluded) — it IS the content height.
  const { size: tileSize, columns } = computeGridLayout(innerWidth, referenceHeight, filtered.length)

  return (
    <section id="skills" className={sectionClass}>
      <div className={headerRowClass}>
        <h2 className={headingClass}>0{order + 1} &mdash; Skills</h2>
        <div className={selectWrapperClass}>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            aria-label="Filter skills by category"
            className={selectClass}
          >
            <option value="All">All</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className={selectArrowClass}>&#9662;</span>
        </div>
      </div>

      <div ref={wrapperRef} className={gridWrapperClass}>
        <div ref={measurerRef} aria-hidden="true" className={measurerClass}>
          {skills.map((skill) => (
            <SkillTile key={skill.name} skill={skill} size={BASE_TILE_SIZE} />
          ))}
        </div>

        <div
          style={{
            height: referenceHeight || undefined,
            boxSizing: 'content-box',
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, ${tileSize}px)`,
            justifyContent: 'center',
            alignContent: 'center',
            transition: 'height 200ms ease',
          }}
          className={gridBoxClass}
        >
          {filtered.map((skill) => (
            <SkillTile key={skill.name} skill={skill} size={tileSize} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default SkillsSection
