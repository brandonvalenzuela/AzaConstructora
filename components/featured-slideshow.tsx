"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause, Eye } from "lucide-react"
import Link from "next/link"
import { imageStorage, type StoredImage } from "@/lib/image-storage"

interface FeaturedSlideshowProps {
  autoPlay?: boolean
  interval?: number
  showControls?: boolean
  height?: string
  maxImages?: number
  showViewGalleryButton?: boolean
}

export function FeaturedSlideshow({
  autoPlay = true,
  interval = 5000,
  showControls = true,
  height = "h-96",
  maxImages = 8,
  showViewGalleryButton = true,
}: FeaturedSlideshowProps) {
  const [images, setImages] = useState<StoredImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [loading, setLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)

  useEffect(() => {
    loadFeaturedImages()
  }, [])

  const loadFeaturedImages = async () => {
    try {
      const allImages = await imageStorage.getImages()
      // Filter for featured images (those with proper metadata and recent uploads)
      const featuredImages = allImages
        .filter((img) => img.alt && img.alt.trim() !== "" && img.caption)
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())
        .slice(0, maxImages)

      setImages(featuredImages)
    } catch (error) {
      console.error("Error loading featured images:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = useCallback(() => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      setImageLoaded(false)
    }
  }, [images.length])

  const prevSlide = useCallback(() => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      setImageLoaded(false)
    }
  }, [images.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setImageLoaded(false)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && images.length > 1) {
      const timer = setInterval(nextSlide, interval)
      return () => clearInterval(timer)
    }
  }, [isPlaying, nextSlide, interval, images.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        prevSlide()
      } else if (event.key === "ArrowRight") {
        nextSlide()
      } else if (event.key === " ") {
        event.preventDefault()
        togglePlayPause()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [nextSlide, prevSlide])

  if (loading) {
    return (
      <div className={`${height} bg-gray-200 animate-pulse rounded-lg flex items-center justify-center`}>
        <div className="text-gray-500">Cargando presentación...</div>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className={`${height} bg-gray-100 rounded-lg flex items-center justify-center`}>
        <div className="text-center text-gray-500">
          <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
          <p>No hay imágenes destacadas disponibles</p>
        </div>
      </div>
    )
  }

  const currentImage = images[currentIndex]

  return (
    <Card className="relative overflow-hidden group">
      <div className={`relative ${height} overflow-hidden`}>
        {/* Main Image */}
        <div className="relative w-full h-full">
          <img
            src={currentImage?.url || "/placeholder.svg"}
            alt={currentImage?.alt || "Imagen destacada"}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading overlay */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="text-gray-500">Cargando...</div>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Image info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="max-w-4xl">
              {currentImage?.alt && <h3 className="text-xl font-bold mb-2">{currentImage.alt}</h3>}
              {currentImage?.caption && <p className="text-gray-200 text-sm mb-2">{currentImage.caption}</p>}
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-300">
                  {currentImage &&
                    new Date(currentImage.uploadedAt).toLocaleDateString("es-ES", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
                {showViewGalleryButton && (
                  <Button size="sm" variant="secondary" asChild>
                    <Link href="/galeria">
                      <Eye className="mr-2 h-4 w-4" />
                      Ver galería
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {showControls && images.length > 1 && (
          <>
            {/* Previous/Next Buttons */}
            <Button
              variant="ghost"
              size="sm"
              onClick={prevSlide}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={nextSlide}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Play/Pause Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePlayPause}
              className="absolute top-4 right-4 text-white hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>

            {/* Slide Counter */}
            <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Progress Bar */}
        {isPlaying && images.length > 1 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
            <div
              className="h-full bg-blue-500 transition-all duration-100 ease-linear"
              style={{
                width: `${((currentIndex + 1) / images.length) * 100}%`,
              }}
            />
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showControls && images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Ir a imagen ${index + 1}`}
            />
          ))}
        </div>
      )}
    </Card>
  )
}
