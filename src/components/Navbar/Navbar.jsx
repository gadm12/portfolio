import { useState } from 'react'
import { Link } from 'react-router-dom'
import { NAV_LINKS, initials, useCloseOnEscape, useScrollSpy } from './utilities.jsx'
import {
  navClass,
  navRowClass,
  brandClass,
  desktopListClass,
  linkClass,
  activeLinkClass,
  hamburgerButtonClass,
  hamburgerBarClass,
  hamburgerTopBarOpenClass,
  hamburgerMiddleBarOpenClass,
  hamburgerMiddleBarClosedClass,
  hamburgerBottomBarOpenClass,
  mobileMenuClass,
  mobileMenuItemClass,
} from './styles/tailwindStyles.jsx'
import './styles/styles.css'

function Navbar({ portfolioData }) {
  const { name } = portfolioData.data.about
  const [isOpen, setIsOpen] = useState(false)
  const activeHref = useScrollSpy(NAV_LINKS)

  useCloseOnEscape(isOpen, () => setIsOpen(false))

  return (
    <nav className={navClass}>
      <div className={navRowClass}>
        <Link to="/#about" className={brandClass} aria-label={name}>
          {initials(name)}
        </Link>

        <ul className={desktopListClass}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link to={link.href} className={`${linkClass} ${link.href === activeHref ? activeLinkClass : ''}`}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
          aria-label={isOpen ? 'Close menu' : 'Toggle menu'}
          className={hamburgerButtonClass}
        >
          <span className={`${hamburgerBarClass} ${isOpen ? hamburgerTopBarOpenClass : ''}`} />
          <span
            className={`${hamburgerBarClass} ${isOpen ? hamburgerMiddleBarOpenClass : hamburgerMiddleBarClosedClass}`}
          />
          <span className={`${hamburgerBarClass} ${isOpen ? hamburgerBottomBarOpenClass : ''}`} />
        </button>
      </div>

      {isOpen && (
        <ul id="mobile-nav-menu" className={mobileMenuClass}>
          {NAV_LINKS.map((link) => (
            <li key={link.href} className={mobileMenuItemClass}>
              <Link
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`${linkClass} ${link.href === activeHref ? activeLinkClass : ''}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
