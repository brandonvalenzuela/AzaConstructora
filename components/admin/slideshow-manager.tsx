"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, StarOff, Eye, Settings } from "lucide-react"
import { imageStorage, type StoredImage } from "@/lib/image-storage"

export function SlideshowManager() {
  const [images, setImages] = useState<StoredImage[]>([])
  const [featuredImages, setFeaturedImages] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
    loadFeaturedSettings()
  }, [])

  const loadImages = async () => {
    try {
      const allImages = await imageStorage.getImages()
      setImages(allImages.filter((img) => img.alt && img.alt.trim() !== ""))
    } catch (error) {
      console.error("Error loading images:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadFeaturedSettings = () => {
    const saved = localStorage.getItem("featured_images")
    if (saved) {
      setFeaturedImages(new Set(JSON.parse(saved)))
    }
  }

  const saveFeaturedSettings = (newFeatured: Set<string>) => {
    localStorage.setItem("featured_images", JSON.stringify(Array.from(newFeatured)))
    setFeaturedImages(newFeatured)
  }

  const toggleFeatured = (imageId: string) => {
    const newFeatured = new Set(featuredImages)
    if (newFeatured.has(imageId)) {
      newFeatured.delete(imageId)
    } else {
      newFeatured.add(imageId)
    }
    saveFeaturedSettings(newFeatured)
  }

  if (loading) {
    return <div className="flex items-center justify-center py-8">Cargando configuración...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Gestión de Slideshow</h2>
        <p className="text-gray-600">Configura qué imágenes aparecen en las presentaciones automáticas</p>
      </div>

      {/* Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración de Presentaciones
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900">Hero Slideshow</h3>
              <p className="text-sm text-blue-700">Página principal - 5 imágenes máximo</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900">Slideshow Destacado</h3>
              <p className="text-sm text-green-700">Sección especial - 10 imágenes máximo</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold text-purple-900">Mini Slideshow</h3>
              <p className="text-sm text-purple-700">Componentes pequeños - 4 imágenes máximo</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Featured Images Selection */}
      <Card>
        <CardHeader>
          <CardTitle>Seleccionar Imágenes Destacadas</CardTitle>
          <p className="text-sm text-gray-600">
            Las imágenes marcadas como destacadas aparecerán en las presentaciones automáticas
          </p>
        </CardHeader>
        <CardContent>
          {images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`relative group border-2 rounded-lg overflow-hidden transition-all ${
                    featuredImages.has(image.id) ? "border-blue-500 bg-blue-50" : "border-gray-200"
                  }`}
                >
                  <div className="aspect-video">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.alt || image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-sm truncate">{image.alt || image.name}</h3>
                        {image.caption && <p className="text-xs text-gray-600 truncate">{image.caption}</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleFeatured(image.id)}
                        className={`ml-2 ${
                          featuredImages.has(image.id) ? "text-blue-600 hover:text-blue-700" : "text-gray-400"
                        }`}
                      >
                        {featuredImages.has(image.id) ? (
                          <Star className="h-4 w-4 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <Badge variant={featuredImages.has(image.id) ? "default" : "secondary"} className="text-xs">
                        {featuredImages.has(image.id) ? "Destacada" : "Normal"}
                      </Badge>
                      <p className="text-xs text-gray-500">{new Date(image.uploadedAt).toLocaleDateString("es-ES")}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Eye className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No hay imágenes disponibles</h3>
              <p className="mt-1 text-sm text-gray-500">Sube imágenes con texto alternativo para que aparezcan aquí</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Summary */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">Resumen</h3>
              <p className="text-sm text-gray-600">
                {featuredImages.size} de {images.length} imágenes marcadas como destacadas
              </p>
            </div>
            <Badge variant="outline" className="text-lg px-3 py-1">
              {featuredImages.size}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
