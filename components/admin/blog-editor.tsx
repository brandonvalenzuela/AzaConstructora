"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Save, Eye, ImageIcon } from "lucide-react"
import Link from "next/link"
import { getBlogPost, saveBlogPost, generateSlug } from "@/lib/blog-storage"
import { ImageSelector } from "./image-selector"
import type { StoredImage } from "@/lib/image-storage"

interface BlogEditorProps {
  postId?: string
}

export function BlogEditor({ postId }: BlogEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [post, setPost] = useState({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    status: "draft" as "draft" | "published",
    author: "Admin",
    readTime: "5 min",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  })

  const categories = [
    "Sostenibilidad",
    "Planificación",
    "Innovación",
    "Consejos",
    "Tecnología",
    "Finanzas",
    "Materiales",
    "Diseño",
  ]

  useEffect(() => {
    if (postId) {
      const existingPost = getBlogPost(postId)
      if (existingPost) {
        setPost(existingPost)
      }
    }
  }, [postId])

  const handleSave = async (status: "draft" | "published") => {
    setIsLoading(true)

    const updatedPost = {
      ...post,
      status,
      slug: post.slug || generateSlug(post.title),
      updatedAt: new Date().toISOString(),
      id: post.id || Date.now().toString(),
    }

    if (!postId) {
      updatedPost.createdAt = new Date().toISOString()
    }

    saveBlogPost(updatedPost)
    setIsLoading(false)

    router.push("/admin/blog")
  }

  const handleTitleChange = (title: string) => {
    setPost({
      ...post,
      title,
      slug: generateSlug(title),
    })
  }

  const estimateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const minutes = Math.ceil(words / wordsPerMinute)
    return `${minutes} min`
  }

  useEffect(() => {
    if (post.content) {
      setPost((prev) => ({
        ...prev,
        readTime: estimateReadTime(post.content),
      }))
    }
  }, [post.content])

  const insertImageIntoContent = (image: StoredImage) => {
    const imageHtml = `<img src="${image.url}" alt="${image.alt || image.name}" style="max-width: 100%; height: auto; margin: 1rem 0;" />`

    setPost((prev) => ({
      ...prev,
      content: prev.content + "\n\n" + imageHtml + "\n\n",
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Volver
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-brand-primary">{postId ? "Editar Artículo" : "Nuevo Artículo"}</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleSave("draft")} disabled={isLoading || !post.title}>
            <Save className="mr-2 h-4 w-4" />
            Guardar Borrador
          </Button>
          <Button
            onClick={() => handleSave("published")}
            disabled={isLoading || !post.title || !post.content}
            className="bg-brand-primary hover:bg-brand-accent"
          >
            <Eye className="mr-2 h-4 w-4" />
            Publicar
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contenido del Artículo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Título del artículo"
                  required
                />
              </div>

              <div>
                <Label htmlFor="slug">URL (Slug)</Label>
                <Input
                  id="slug"
                  value={post.slug}
                  onChange={(e) => setPost({ ...post, slug: e.target.value })}
                  placeholder="url-del-articulo"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Extracto *</Label>
                <Textarea
                  id="excerpt"
                  value={post.excerpt}
                  onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                  placeholder="Breve descripción del artículo"
                  rows={3}
                  required
                />
              </div>

              <Tabs defaultValue="editor" className="w-full">
                <TabsList>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Vista Previa</TabsTrigger>
                </TabsList>
                <TabsContent value="editor">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label htmlFor="content">Contenido *</Label>
                      <ImageSelector
                        onImageSelect={insertImageIntoContent}
                        trigger={
                          <Button type="button" variant="outline" size="sm">
                            <ImageIcon className="mr-2 h-4 w-4" />
                            Insertar Imagen
                          </Button>
                        }
                      />
                    </div>
                    <Textarea
                      id="content"
                      value={post.content}
                      onChange={(e) => setPost({ ...post, content: e.target.value })}
                      placeholder="Escribe el contenido del artículo aquí. Puedes usar HTML básico para formato."
                      rows={20}
                      className="font-mono"
                      required
                    />
                    <p className="text-sm text-brand-accent mt-2">
                      Puedes usar HTML básico: &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;,
                      &lt;ol&gt;, &lt;li&gt;
                    </p>
                  </div>
                </TabsContent>
                <TabsContent value="preview">
                  <div className="border rounded-md p-4 min-h-[500px] bg-white">
                    <h1 className="text-3xl font-bold mb-4">{post.title || "Título del artículo"}</h1>
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: post.content || "<p>El contenido aparecerá aquí...</p>",
                      }}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configuración</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Categoría *</Label>
                <Select value={post.category} onValueChange={(value) => setPost({ ...post, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="author">Autor</Label>
                <Input id="author" value={post.author} onChange={(e) => setPost({ ...post, author: e.target.value })} />
              </div>

              <div>
                <Label htmlFor="readTime">Tiempo de Lectura</Label>
                <Input
                  id="readTime"
                  value={post.readTime}
                  onChange={(e) => setPost({ ...post, readTime: e.target.value })}
                  placeholder="5 min"
                />
              </div>

              <div>
                <Label htmlFor="status">Estado</Label>
                <Select
                  value={post.status}
                  onValueChange={(value: "draft" | "published") => setPost({ ...post, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Borrador</SelectItem>
                    <SelectItem value="published">Publicado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Palabras:</span>
                <span>{post.content.split(/\s+/).filter((word) => word.length > 0).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Caracteres:</span>
                <span>{post.content.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tiempo estimado:</span>
                <span>{post.readTime}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
