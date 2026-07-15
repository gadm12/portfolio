import portfolioData from '../data/portfolio-data.json'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const { name } = portfolioData.about

  return (
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white/80 px-6 py-4 backdrop-blur">
      <a href="#about" className="text-lg font-bold">
        {name}
      </a>
      <ul className="flex gap-6">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="text-gray-700 hover:text-purple-600">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
