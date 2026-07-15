import portfolioData from '../data/portfolio-data.json'

function ContactSection() {
  const { headline, email, resumeUrl } = portfolioData.contact

  return (
    <section id="contact" className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 py-16 text-center">
      <h2 className="text-3xl font-bold">Contact</h2>
      {headline && <p className="text-gray-700">{headline}</p>}
      <div className="flex gap-4">
        {email && (
          <a href={`mailto:${email}`} className="rounded bg-purple-600 px-4 py-2 text-white">
            Email Me
          </a>
        )}
        {resumeUrl && (
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded border border-purple-600 px-4 py-2 text-purple-600"
          >
            View Resume
          </a>
        )}
      </div>
    </section>
  )
}

export default ContactSection
