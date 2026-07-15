import portfolioData from '../data/portfolio-data.json'

function Footer() {
  const { name } = portfolioData.about
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 px-6 py-6 text-center text-sm text-gray-500">
      &copy; {year} {name}
    </footer>
  )
}

export default Footer
