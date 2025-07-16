import Link from "next/link"
import { Calendar, ArrowRight, Search } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { getPublishedPosts } from "@/lib/blog-storage"

const categories = ["Todos", "Sostenibilidad", "Planificación", "Innovación", "Consejos", "Tecnología", "Finanzas"]

export default function BlogPage() {
  const posts = getPublishedPosts()

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section - keep the same */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog de Construcción</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Consejos, tendencias y noticias del mundo de la construcción para mantenerte informado
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input type="text" placeholder="Buscar artículos..." className="pl-10 pr-4 py-3" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories - keep the same */}
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "Todos" ? "default" : "outline"}
                  size="sm"
                  className={category === "Todos" ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Posts */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            {posts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-xl font-semibold text-gray-900 mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(post.createdAt).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center text-sm"
                        >
                          Leer más
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No hay artículos publicados aún.</p>
              </div>
            )}

            {/* Pagination - keep the same */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" disabled>
                  Anterior
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">1</Button>
                <Button variant="outline">2</Button>
                <Button variant="outline">3</Button>
                <Button variant="outline">Siguiente</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
