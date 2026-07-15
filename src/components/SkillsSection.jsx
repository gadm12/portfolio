import portfolioData from '../data/portfolio-data.json'

function SkillsSection() {
  const skills = portfolioData.skills

  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Skills</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="mb-2 font-semibold text-purple-600">{group.category}</h3>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SkillsSection
