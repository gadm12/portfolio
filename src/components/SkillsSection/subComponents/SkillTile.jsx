import { SKILL_ICONS, FALLBACK_LABELS } from './skillcons.jsx'
import { tileClass, tileFallbackLabelClass, tileTooltipClass } from '../styles/tailwindStyles.jsx'

function SkillTile({ skill, size }) {
  const iconEntry = SKILL_ICONS[skill.icon]
  const Icon = iconEntry?.Icon

  return (
    <div
      title={skill.name}
      style={{ width: size, height: size, transition: 'width 200ms ease, height 200ms ease' }}
      className={tileClass}
    >
      {Icon ? (
        <Icon size={size * 0.47} style={{ color: iconEntry.color, transition: 'width 200ms ease, height 200ms ease' }} />
      ) : (
        <span style={{ fontSize: Math.max(10, size * 0.16) }} className={tileFallbackLabelClass}>
          {FALLBACK_LABELS[skill.icon]}
        </span>
      )}
      <span className={tileTooltipClass}>{skill.name}</span>
    </div>
  )
}

export default SkillTile
