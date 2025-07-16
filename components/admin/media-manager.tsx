"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageUploader } from "./image-uploader"
import { ImageGallery } from "./image-gallery"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Images } from "lucide-react"

export function MediaManager() {
  const [activeTab, setActiveTab] = useState("gallery")

  const handleUploadComplete = () => {
    // Refresh gallery after upload
    setActiveTab("gallery")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Gestión de Medios</h1>
        <p className="text-gray-600">Administra todas las imágenes de tu blog</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="gallery" className="flex items-center gap-2">
            <Images className="h-4 w-4" />
            Galería
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Subir Imágenes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gallery">
          <Card>
            <CardHeader>
              <CardTitle>Galería de Imágenes</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageGallery />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upload">
          <Card>
            <CardHeader>
              <CardTitle>Subir Nuevas Imágenes</CardTitle>
            </CardHeader>
            <CardContent>
              <ImageUploader onUploadComplete={handleUploadComplete} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
