import { Header } from "@/components/header"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { SlideshowSection } from "@/components/slideshow-section"
import { Testimonials } from "@/components/testimonials"
import { BlogPreview } from "@/components/blog-preview"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <SlideshowSection />
      <Testimonials />
      <BlogPreview />
      <Contact />
      <Footer />
    </div>
  )
}
