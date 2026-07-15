function ProjectCard({ project }) {
  const { title, description, stack, repoUrl, liveUrl, imageUrl } = project

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 p-4">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="mb-4 h-40 w-full rounded object-cover" />
      )}
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-gray-700">{description}</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {stack.map((tech) => (
          <li key={tech} className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-700">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex gap-4 text-sm">
        {repoUrl && (
          <a href={repoUrl} target="_blank" rel="noreferrer" className="text-purple-600 underline">
            Repo
          </a>
        )}
        {liveUrl && (
          <a href={liveUrl} target="_blank" rel="noreferrer" className="text-purple-600 underline">
            Live
          </a>
        )}
      </div>
    </div>
  )
}

export default ProjectCard
