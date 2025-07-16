"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, Grid, List, X, ChevronLeft, ChevronRight, Share2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { imageStorage, type StoredImage } from "@/lib/image-storage"

const projectCategories = [
  { id: "all", name: "Todos los Proyectos", color: "bg-gray-100 text-gray-800" },
  { id: "residential", name: "Residencial", color: "bg-blue-100 text-blue-800" },
  { id: "commercial", name: "Comercial", color: "bg-green-100 text-green-800" },
  { id: "industrial", name: "Industrial", color: "bg-purple-100 text-purple-800" },
  { id: "renovation", name: "Remodelaciones", color: "bg-blue-100 text-blue-800" },
  { id: "exterior", name: "Exteriores", color: "bg-teal-100 text-teal-800" },
  { id: "interior", name: "Interiores", color: "bg-pink-100 text-pink-800" },
]

export function PublicGallery() {
  const [images, setImages] = useState<StoredImage[]>([])
  const [filteredImages, setFilteredImages] = useState<StoredImage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid")
  const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    filterImages()
  }, [images, searchTerm, selectedCategory])

  const loadImages = async () => {
    try {
      const allImages = await imageStorage.getImages()
      // Only show images that have proper metadata and are suitable for public display
      const publicImages = allImages.filter((img) => img.alt && img.alt.trim() !== "")
      setImages(publicImages)
    } catch (error) {
      console.error("Error loading images:", error)
    } finally {
      setLoading(false)
    }
  }

  const filterImages = () => {
    let filtered = images

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (image) =>
          image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.alt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          image.caption?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by category (based on image metadata or name patterns)
    if (selectedCategory !== "all") {
      filtered = filtered.filter((image) => {
        const imageName = image.name.toLowerCase()
        const imageAlt = image.alt?.toLowerCase() || ""
        const imageCaption = image.caption?.toLowerCase() || ""

        switch (selectedCategory) {
          case "residential":
            return (
              imageName.includes("casa") ||
              imageName.includes("residencial") ||
              imageAlt.includes("casa") ||
              imageAlt.includes("residencial")
            )
          case "commercial":
            return (
              imageName.includes("comercial") ||
              imageName.includes("oficina") ||
              imageAlt.includes("comercial") ||
              imageAlt.includes("oficina")
            )
          case "industrial":
            return (
              imageName.includes("industrial") ||
              imageName.includes("bodega") ||
              imageAlt.includes("industrial") ||
              imageAlt.includes("bodega")
            )
          case "renovation":
            return (
              imageName.includes("remodelacion") ||
              imageName.includes("renovacion") ||
              imageAlt.includes("remodelación") ||
              imageAlt.includes("renovación")
            )
          case "exterior":
            return (
              imageName.includes("exterior") ||
              imageName.includes("fachada") ||
              imageAlt.includes("exterior") ||
              imageAlt.includes("fachada")
            )
          case "interior":
            return (
              imageName.includes("interior") ||
              imageName.includes("sala") ||
              imageName.includes("cocina") ||
              imageAlt.includes("interior")
            )
          default:
            return true
        }
      })
    }

    setFilteredImages(filtered)
  }

  const openLightbox = (image: StoredImage, index: number) => {
    setSelectedImage(image)
    setCurrentImageIndex(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "prev" | "next") => {
    const newIndex =
      direction === "prev"
        ? currentImageIndex > 0
          ? currentImageIndex - 1
          : filteredImages.length - 1
        : currentImageIndex < filteredImages.length - 1
          ? currentImageIndex + 1
          : 0

    setCurrentImageIndex(newIndex)
    setSelectedImage(filteredImages[newIndex])
  }

  const shareImage = async (image: StoredImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.alt || image.name,
          text: image.caption || "Imagen de AZA Constructora",
          url: window.location.href,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback: copy URL to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert("URL copiada al portapapeles")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary mx-auto mb-4"></div>
          <p className="text-brand-accent">Cargando galería...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-accent/5">
      {/* Hero Section */}
      <section className="bg-brand-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Galería de Proyectos</h1>
            <p className="text-xl text-brand-accent max-w-3xl mx-auto">
              Explora nuestra colección de proyectos de construcción, desde residenciales hasta comerciales
            </p>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Buscar en la galería..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-brand-primary hover:bg-brand-accent" : ""}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "masonry" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("masonry")}
                className={viewMode === "masonry" ? "bg-brand-primary hover:bg-brand-accent" : ""}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mt-6">
            {projectCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={
                  selectedCategory === category.id
                    ? "bg-brand-primary hover:bg-brand-accent"
                    : "hover:bg-brand-accent/10 hover:border-brand-accent"
                }
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
          {filteredImages.length > 0 ? (
            <>
              <div className="mb-6 flex items-center justify-between">
                <p className="text-brand-accent">
                  {filteredImages.length} imagen{filteredImages.length !== 1 ? "es" : ""} encontrada
                  {filteredImages.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    : "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                }
              >
                {filteredImages.map((image, index) => (
                  <Card
                    key={image.id}
                    className="group cursor-pointer hover:shadow-xl transition-all duration-300 overflow-hidden"
                    onClick={() => openLightbox(image, index)}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={image.url || "/placeholder.svg"}
                        alt={image.alt || image.name}
                        className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                          viewMode === "grid" ? "h-64" : "h-auto"
                        }`}
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" variant="secondary">
                            Ver imagen
                          </Button>
                        </div>
                      </div>
                    </div>
                    {(image.alt || image.caption) && (
                      <CardContent className="p-4">
                        {image.alt && <h3 className="font-semibold text-gray-900 mb-1">{image.alt}</h3>}
                        {image.caption && <p className="text-sm text-gray-600 line-clamp-2">{image.caption}</p>}
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <Filter className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No se encontraron imágenes</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm || selectedCategory !== "all"
                    ? "Intenta ajustar los filtros o términos de búsqueda"
                    : "Aún no hay imágenes disponibles en la galería"}
                </p>
                {(searchTerm || selectedCategory !== "all") && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedCategory("all")
                    }}
                  >
                    Limpiar filtros
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-7xl max-h-[90vh] p-0 bg-black">
          {selectedImage && (
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              >
                <X className="h-6 w-6" />
              </Button>

              {/* Navigation Buttons */}
              {filteredImages.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateImage("prev")}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigateImage("next")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}

              {/* Image */}
              <img
                src={selectedImage.url || "/placeholder.svg"}
                alt={selectedImage.alt || selectedImage.name}
                className="max-w-full max-h-full object-contain"
              />

              {/* Image Info */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      {selectedImage.alt && <h2 className="text-xl font-semibold mb-2">{selectedImage.alt}</h2>}
                      {selectedImage.caption && <p className="text-gray-200 mb-2">{selectedImage.caption}</p>}
                      <p className="text-sm text-gray-300">
                        {new Date(selectedImage.uploadedAt).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => shareImage(selectedImage)}
                        className="text-white hover:bg-white/20"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {filteredImages.length > 1 && (
                    <div className="mt-4 text-sm text-gray-300">
                      {currentImageIndex + 1} de {filteredImages.length}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
