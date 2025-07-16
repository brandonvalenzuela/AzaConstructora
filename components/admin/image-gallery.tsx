"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Trash2, Edit, Copy, Eye, ImageIcon } from "lucide-react"
import { imageStorage, formatFileSize, type StoredImage } from "@/lib/image-storage"

interface ImageGalleryProps {
  onImageSelect?: (image: StoredImage) => void
  selectionMode?: boolean
}

export function ImageGallery({ onImageSelect, selectionMode = false }: ImageGalleryProps) {
  const [images, setImages] = useState<StoredImage[]>([])
  const [filteredImages, setFilteredImages] = useState<StoredImage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<StoredImage | null>(null)
  const [editingImage, setEditingImage] = useState<StoredImage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    if (searchTerm) {
      setFilteredImages(
        images.filter(
          (image) =>
            image.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.alt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            image.caption?.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      )
    } else {
      setFilteredImages(images)
    }
  }, [images, searchTerm])

  const loadImages = async () => {
    try {
      const loadedImages = await imageStorage.getImages()
      setImages(loadedImages)
    } catch (error) {
      console.error("Error loading images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (image: StoredImage) => {
    if (confirm(`¿Estás seguro de que quieres eliminar "${image.name}"?`)) {
      try {
        await imageStorage.deleteImage(image.id)
        await loadImages()
      } catch (error) {
        console.error("Error deleting image:", error)
        alert("Error al eliminar la imagen")
      }
    }
  }

  const handleEdit = async (updatedImage: StoredImage) => {
    try {
      await imageStorage.updateImage(updatedImage)
      await loadImages()
      setEditingImage(null)
    } catch (error) {
      console.error("Error updating image:", error)
      alert("Error al actualizar la imagen")
    }
  }

  const copyImageUrl = (image: StoredImage) => {
    navigator.clipboard.writeText(image.url)
    alert("URL de imagen copiada al portapapeles")
  }

  const handleImageClick = (image: StoredImage) => {
    if (selectionMode && onImageSelect) {
      onImageSelect(image)
    } else {
      setSelectedImage(image)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center py-8">Cargando imágenes...</div>
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Buscar imágenes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Gallery Grid */}
      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className={`group relative bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow ${
                selectionMode ? "cursor-pointer hover:border-blue-500" : ""
              }`}
              onClick={() => handleImageClick(image)}
            >
              <div className="aspect-square bg-gray-100">
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.alt || image.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-3">
                <p className="text-sm font-medium truncate">{image.name}</p>
                <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                {image.alt && <p className="text-xs text-gray-600 mt-1 truncate">Alt: {image.alt}</p>}
              </div>

              {!selectionMode && (
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedImage(image)
                      }}
                    >
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        setEditingImage(image)
                      }}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyImageUrl(image)
                      }}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(image)
                      }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No hay imágenes</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? "No se encontraron imágenes con ese término" : "Sube tu primera imagen para comenzar"}
          </p>
        </div>
      )}

      {/* Image Preview Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedImage?.name}</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="space-y-4">
              <div className="max-h-96 overflow-hidden rounded-lg">
                <img
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.alt || selectedImage.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Nombre:</strong> {selectedImage.name}
                </div>
                <div>
                  <strong>Tamaño:</strong> {formatFileSize(selectedImage.size)}
                </div>
                <div>
                  <strong>Tipo:</strong> {selectedImage.type}
                </div>
                <div>
                  <strong>Subida:</strong> {new Date(selectedImage.uploadedAt).toLocaleDateString("es-ES")}
                </div>
                {selectedImage.alt && (
                  <div className="col-span-2">
                    <strong>Texto alternativo:</strong> {selectedImage.alt}
                  </div>
                )}
                {selectedImage.caption && (
                  <div className="col-span-2">
                    <strong>Descripción:</strong> {selectedImage.caption}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => copyImageUrl(selectedImage)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar URL
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingImage(selectedImage)
                    setSelectedImage(null)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Image Dialog */}
      <Dialog open={!!editingImage} onOpenChange={() => setEditingImage(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Imagen</DialogTitle>
          </DialogHeader>
          {editingImage && (
            <EditImageForm image={editingImage} onSave={handleEdit} onCancel={() => setEditingImage(null)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

interface EditImageFormProps {
  image: StoredImage
  onSave: (image: StoredImage) => void
  onCancel: () => void
}

function EditImageForm({ image, onSave, onCancel }: EditImageFormProps) {
  const [formData, setFormData] = useState({
    alt: image.alt || "",
    caption: image.caption || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...image,
      alt: formData.alt,
      caption: formData.caption,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="max-h-48 overflow-hidden rounded-lg">
        <img src={image.url || "/placeholder.svg"} alt={image.name} className="w-full h-full object-contain" />
      </div>

      <div>
        <Label htmlFor="alt">Texto Alternativo</Label>
        <Input
          id="alt"
          value={formData.alt}
          onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
          placeholder="Describe la imagen para accesibilidad"
        />
      </div>

      <div>
        <Label htmlFor="caption">Descripción</Label>
        <Textarea
          id="caption"
          value={formData.caption}
          onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
          placeholder="Descripción opcional de la imagen"
          rows={3}
        />
      </div>

      <div className="flex gap-2 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          Guardar
        </Button>
      </div>
    </form>
  )
}
