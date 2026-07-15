import portfolioData from '../data/portfolio-data.json'

function EducationSection() {
  const education = portfolioData.education

  return (
    <section id="education" className="mx-auto max-w-3xl px-6 py-16">
      <h2 className="mb-8 text-center text-3xl font-bold">Education</h2>
      <div className="flex flex-col gap-8">
        {education.map((entry) => (
          <div key={`${entry.school}-${entry.program}`} className="border-l-2 border-purple-200 pl-4">
            <h3 className="font-semibold">{entry.program}</h3>
            <p className="text-purple-600">
              {entry.school} &middot; {entry.dates}
            </p>
            {entry.description && <p className="mt-2 text-gray-700">{entry.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default EducationSection
