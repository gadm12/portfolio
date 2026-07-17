import { useEffect } from 'react'
import { Outlet, useLocation, useLoaderData } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer/Footer.jsx'

function App() {
  const { hash } = useLocation()
  const portfolioData = useLoaderData()

  useEffect(() => {
    if (!hash) return
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
  }, [hash])

  return (
    <div>
      <Navbar portfolioData={portfolioData} />
      <Outlet context={portfolioData} />
      <Footer portfolioData={portfolioData} />
    </div>
  )
}

export default App
