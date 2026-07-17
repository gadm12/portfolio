import { getCurrentYear } from './utilities.jsx'
import { footerClass } from './styles/tailwindStyles.jsx'
import './styles/styles.css'

function Footer({ portfolioData }) {
  const { name } = portfolioData.data.about
  const year = getCurrentYear()

  return (
    <footer className={footerClass}>
      &copy; {year} {name}
    </footer>
  )
}

export default Footer
