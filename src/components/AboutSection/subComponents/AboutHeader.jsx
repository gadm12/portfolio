import { SOCIAL_LABELS, socialHref } from '../utilities.jsx'
import {
  headerWrapperClass,
  eyebrowClass,
  headingClass,
  roleClass,
  taglineClass,
  bioClass,
  socialListClass,
  socialLinkClass,
} from '../styles/tailwindStyles.jsx'

function AboutHeader({ name, title, tagline, bio, socials }) {
  return (
    <div className={headerWrapperClass}>
      <p className={eyebrowClass}>USMC Veteran &middot; Software Engineer</p>
      <h1 className={headingClass}>{name}</h1>
      <p className={roleClass}>{title}</p>
      {tagline && <p className={taglineClass}>{tagline}</p>}
      <p className={bioClass}>{bio}</p>
      <ul className={socialListClass}>
        {Object.entries(socials)
          .filter(([, value]) => value)
          .map(([key, value]) => (
            <li key={key}>
              <a
                href={socialHref(key, value)}
                target={key === 'email' ? undefined : '_blank'}
                rel={key === 'email' ? undefined : 'noreferrer'}
                className={socialLinkClass}
              >
                {SOCIAL_LABELS[key] ?? key} &rarr;
              </a>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default AboutHeader
