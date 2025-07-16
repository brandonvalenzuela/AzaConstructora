"use client"

import { FeaturedSlideshow } from "./featured-slideshow"
import Link from "next/link"
import { Button } from "./ui/button"

export function SlideshowSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proyectos Destacados</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubre nuestros trabajos más recientes y destacados en una presentación automática
          </p>
        </div>

        <FeaturedSlideshow
          autoPlay={true}
          interval={4000}
          showControls={true}
          height="h-[500px]"
          maxImages={10}
          showViewGalleryButton={true}
        />

        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link href="/galeria">
              Ver todos los proyectos
              <svg className="ml-2 h-4 w-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </Button>
          <p className="text-gray-600 text-sm mt-4">
            Usa las flechas del teclado para navegar • Presiona espacio para pausar/reanudar
          </p>
        </div>
      </div>
    </section>
  )
}
