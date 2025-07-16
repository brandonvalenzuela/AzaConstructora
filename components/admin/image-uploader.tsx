"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Upload, X, ImageIcon } from "lucide-react"
import { imageStorage, generateImageId, formatFileSize, resizeImage, type StoredImage } from "@/lib/image-storage"

interface ImageUploaderProps {
  onUploadComplete?: (images: StoredImage[]) => void
  maxFiles?: number
  acceptedTypes?: string[]
}

export function ImageUploader({
  onUploadComplete,
  maxFiles = 5,
  acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    const validFiles = files.filter(
      (file) => acceptedTypes.includes(file.type) && file.size <= 10 * 1024 * 1024, // 10MB limit
    )

    if (validFiles.length + selectedFiles.length > maxFiles) {
      alert(`Solo puedes subir un máximo de ${maxFiles} imágenes`)
      return
    }

    setSelectedFiles((prev) => [...prev, ...validFiles])

    // Generate previews
    validFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string])
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    try {
      const uploadedImages: StoredImage[] = []

      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]

        // Resize image if it's too large
        const resizedBlob = await resizeImage(file)

        // Convert to base64 for storage
        const reader = new FileReader()
        const base64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string)
          reader.readAsDataURL(resizedBlob)
        })

        const imageData: StoredImage = {
          id: generateImageId(),
          name: file.name,
          url: base64,
          size: resizedBlob.size,
          type: file.type,
          uploadedAt: new Date().toISOString(),
        }

        await imageStorage.saveImage(imageData)
        uploadedImages.push(imageData)

        // Update progress
        setUploadProgress(((i + 1) / selectedFiles.length) * 100)
      }

      // Reset form
      setSelectedFiles([])
      setPreviews([])
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

      onUploadComplete?.(uploadedImages)
    } catch (error) {
      console.error("Error uploading images:", error)
      alert("Error al subir las imágenes")
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="image-upload">Subir Imágenes</Label>
        <Input
          ref={fileInputRef}
          id="image-upload"
          type="file"
          multiple
          accept={acceptedTypes.join(",")}
          onChange={handleFileSelect}
          disabled={uploading}
          className="mt-1"
        />
        <p className="text-sm text-gray-500 mt-1">
          Máximo {maxFiles} imágenes. Formatos: JPG, PNG, WebP. Tamaño máximo: 10MB por imagen.
        </p>
      </div>

      {selectedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {selectedFiles.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {previews[index] ? (
                    <img
                      src={previews[index] || "/placeholder.svg"}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="mt-1">
                  <p className="text-xs text-gray-600 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                </div>
              </div>
            ))}
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Subiendo imágenes...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={uploading || selectedFiles.length === 0}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              {uploading
                ? "Subiendo..."
                : `Subir ${selectedFiles.length} imagen${selectedFiles.length > 1 ? "es" : ""}`}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedFiles([])
                setPreviews([])
                if (fileInputRef.current) fileInputRef.current.value = ""
              }}
              disabled={uploading}
            >
              Cancelar
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
