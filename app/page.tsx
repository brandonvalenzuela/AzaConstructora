"use client"
import { Header } from "@/components/header"
import { Services } from "@/components/services"
import { Projects } from "@/components/projects"
import { SlideshowSection } from "@/components/slideshow-section"
import { Testimonials } from "@/components/testimonials"
import { BlogPreview } from "@/components/blog-preview"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { useEffect } from "react"

export default function HomePage() {
  // Offset igual al del header
  useEffect(() => {
    const HEADER_OFFSET = 80;
    if (typeof window !== 'undefined' && window.location.hash) {
      const sectionId = window.location.hash.replace('#', '');
      const el = document.getElementById(sectionId);
      if (el) {
        // Timeout para asegurar que el DOM esté listo
        setTimeout(() => {
          const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
          window.scrollTo({ top: y, behavior: 'auto' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Services />
      <Projects />
      <SlideshowSection />
      <Testimonials />
      <div id="blog" className="bg-gray-50">
        <BlogPreview />
      </div>
      <Contact />
      <Footer />
    </div>
  )
}
