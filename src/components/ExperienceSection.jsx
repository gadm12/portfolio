import portfolioData from '../data/portfolio-data.json'

function ExperienceSection() {
  const experience = portfolioData.experience

  return (
    <section id="experience" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Experience</h2>
      <div className="flex flex-col gap-8">
        {experience.map((job) => (
          <div key={`${job.role}-${job.org}`} className="border-l-2 border-purple-200 pl-4">
            <h3 className="font-semibold">{job.role}</h3>
            <p className="text-purple-600">
              {job.org} &middot; {job.dates}
            </p>
            <ul className="mt-2 list-disc pl-5 text-gray-700">
              {job.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ExperienceSection
