import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { PublicGallery } from "@/components/public-gallery"
import { FeaturedSlideshow } from "@/components/featured-slideshow"

export default function GaleriaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        {/* Featured Slideshow at top of gallery */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Proyectos Destacados</h2>
              <p className="text-gray-600">Nuestros trabajos más recientes y destacados</p>
            </div>
            <FeaturedSlideshow
              autoPlay={true}
              interval={5000}
              showControls={true}
              height="h-80"
              maxImages={6}
              showViewGalleryButton={false}
            />
          </div>
        </section>

        <PublicGallery />
      </main>
      <Footer />
    </div>
  )
}
