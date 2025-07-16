"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Eye, FileText } from "lucide-react"
import { getBlogPosts, deleteBlogPost } from "@/lib/blog-storage"

export function BlogManager() {
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")

  useEffect(() => {
    loadPosts()
  }, [])

  useEffect(() => {
    let filtered = posts

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (filterStatus !== "all") {
      filtered = filtered.filter((post) => post.status === filterStatus)
    }

    setFilteredPosts(filtered)
  }, [posts, searchTerm, filterStatus])

  const loadPosts = () => {
    const blogPosts = getBlogPosts()
    setPosts(blogPosts)
  }

  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este artículo?")) {
      deleteBlogPost(id)
      loadPosts()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Blog</h1>
          <p className="text-gray-600">Administra todos los artículos del blog</p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700">
          <Link href="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Artículo
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar artículos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("all")}
              >
                Todos
              </Button>
              <Button
                variant={filterStatus === "published" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("published")}
              >
                Publicados
              </Button>
              <Button
                variant={filterStatus === "draft" ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus("draft")}
              >
                Borradores
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status === "published" ? "Publicado" : "Borrador"}
                      </Badge>
                    </div>
                    <p className="text-gray-600 mb-2 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>Categoría: {post.category}</span>
                      <span>Creado: {new Date(post.createdAt).toLocaleDateString("es-ES")}</span>
                      <span>Actualizado: {new Date(post.updatedAt).toLocaleDateString("es-ES")}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {post.status === "published" && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${post.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/blog/edit/${post.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <FileText className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No hay artículos</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || filterStatus !== "all"
                    ? "No se encontraron artículos con los filtros aplicados"
                    : "Comienza creando tu primer artículo"}
                </p>
                {!searchTerm && filterStatus === "all" && (
                  <div className="mt-6">
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                      <Link href="/admin/blog/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Crear Artículo
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
