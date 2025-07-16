"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Eye } from "lucide-react"
import { imageStorage, type StoredImage } from "@/lib/image-storage"

export function GalleryPreview() {
  const [images, setImages] = useState<StoredImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const allImages = await imageStorage.getImages()
      // Show only images with proper metadata, limit to 6 for preview
      const publicImages = allImages.filter((img) => img.alt && img.alt.trim() !== "").slice(0, 6)
      setImages(publicImages)
    } catch (error) {
      console.error("Error loading images:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (images.length === 0) {
    return null // Don't show the section if no images
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">Galería de Proyectos</h2>
          <p className="text-xl text-brand-accent max-w-3xl mx-auto">
            Explora algunos de nuestros trabajos más destacados y descubre la calidad de nuestros proyectos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {images.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || image.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/galeria">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver más
                    </Link>
                  </Button>
                </div>
              </div>
              {image.alt && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-medium text-sm">{image.alt}</h3>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild size="lg" className="bg-brand-primary hover:bg-brand-accent">
            <Link href="/galeria">
              Ver galería completa
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
