import portfolioData from '../data/portfolio-data.json'

const SOCIAL_LABELS = {
  github: 'GitHub',
  linkedin: 'LinkedIn',
  email: 'Email',
  website: 'Website',
}

function socialHref(key, value) {
  if (key === 'email') return `mailto:${value}`
  return value
}

function AboutSection() {
  const { name, title, tagline, bio, photoUrl, location } = portfolioData.about
  const socials = portfolioData.socials

  return (
    <section id="about" className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-16 text-center">
      {photoUrl && (
        <img
          src={photoUrl}
          alt={name}
          className="h-32 w-32 rounded-full object-cover"
        />
      )}
      <h1 className="text-4xl font-bold">{name}</h1>
      <p className="text-xl text-purple-600">{title}</p>
      {tagline && <p className="text-lg text-gray-600 italic">{tagline}</p>}
      <p className="text-gray-700">{bio}</p>
      {location && <p className="text-sm text-gray-500">{location}</p>}
      <ul className="flex gap-4">
        {Object.entries(socials)
          .filter(([, value]) => value)
          .map(([key, value]) => (
            <li key={key}>
              <a
                href={socialHref(key, value)}
                target={key === 'email' ? undefined : '_blank'}
                rel={key === 'email' ? undefined : 'noreferrer'}
                className="text-purple-600 underline"
              >
                {SOCIAL_LABELS[key] ?? key}
              </a>
            </li>
          ))}
      </ul>
    </section>
  )
}

export default AboutSection
