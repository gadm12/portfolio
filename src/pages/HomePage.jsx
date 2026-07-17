import AboutSection from '../components/AboutSection/AboutSection.jsx'
import SkillsSection from '../components/SkillsSection/SkillsSection.jsx'
import TimelineSection from '../components/TimelineSection/TimelineSection.jsx'
import ProjectsSection from '../components/ProjectsSection/ProjectsSection.jsx'
import ContactSection from '../components/ContactSection/ContactSection.jsx'

function HomePage() {

  const componentsToRender = [
    { Component: SkillsSection, props: {} },
    { Component: ProjectsSection, props: {} },
    { Component: ContactSection, props: {} },
    { Component: TimelineSection, props: { variant: 'experience' } },
    { Component: TimelineSection, props: { variant: 'education' } },
  ]

  return (
    <div>
        <AboutSection />
        {componentsToRender.map(({ Component, props }, index) => (
            <Component key={index} order={index} {...props} />
        ))}
    </div>
  )
}

export default HomePage
