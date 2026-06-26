import HeroSection from '../components/HeroSection'
import FeaturedProjects from '../components/FeaturedProjects'
import PopularTechnologies from '../components/PopularTechnologies'
import CallToAction from '../components/CallToAction'

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjects />
      <PopularTechnologies />
      <CallToAction />
    </>
  )
}
