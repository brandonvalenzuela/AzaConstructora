"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUploader } from "./image-uploader"
import { ImageGallery } from "./image-gallery"
import { ImageIcon } from "lucide-react"
import type { StoredImage } from "@/lib/image-storage"

interface ImageSelectorProps {
  onImageSelect: (image: StoredImage) => void
  trigger?: React.ReactNode
}

export function ImageSelector({ onImageSelect, trigger }: ImageSelectorProps) {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("gallery")

  const handleImageSelect = (image: StoredImage) => {
    onImageSelect(image)
    setOpen(false)
  }

  const handleUploadComplete = (images: StoredImage[]) => {
    if (images.length > 0) {
      handleImageSelect(images[0]) // Select the first uploaded image
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <ImageIcon className="mr-2 h-4 w-4" />
            Insertar Imagen
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Seleccionar Imagen</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
          <TabsList>
            <TabsTrigger value="gallery">Galería</TabsTrigger>
            <TabsTrigger value="upload">Subir Nueva</TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-4 overflow-y-auto max-h-[60vh]">
            <ImageGallery onImageSelect={handleImageSelect} selectionMode={true} />
          </TabsContent>

          <TabsContent value="upload" className="mt-4">
            <ImageUploader onUploadComplete={handleUploadComplete} maxFiles={1} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
