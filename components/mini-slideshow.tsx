"use client"

import { useState, useEffect, useCallback } from "react"
import { imageStorage, type StoredImage } from "@/lib/image-storage"

interface MiniSlideshowProps {
  maxImages?: number
  interval?: number
  height?: string
  className?: string
}

export function MiniSlideshow({ maxImages = 4, interval = 3000, height = "h-32", className = "" }: MiniSlideshowProps) {
  const [images, setImages] = useState<StoredImage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
  }, [])

  const loadImages = async () => {
    try {
      const allImages = await imageStorage.getImages()
      const featuredImages = allImages.filter((img) => img.alt && img.alt.trim() !== "").slice(0, maxImages)
      setImages(featuredImages)
    } catch (error) {
      console.error("Error loading mini slideshow images:", error)
    } finally {
      setLoading(false)
    }
  }

  const nextSlide = useCallback(() => {
    if (images.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }
  }, [images.length])

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(nextSlide, interval)
      return () => clearInterval(timer)
    }
  }, [nextSlide, interval, images.length])

  if (loading || images.length === 0) {
    return (
      <div className={`${height} ${className} bg-gray-200 animate-pulse rounded-lg flex items-center justify-center`}>
        <div className="text-gray-500 text-sm">Cargando...</div>
      </div>
    )
  }

  return (
    <div className={`${height} ${className} relative overflow-hidden rounded-lg`}>
      {images.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={image.url || "/placeholder.svg"} alt={image.alt || ""} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Simple indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
