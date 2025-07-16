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
        <section className="bg-brand-accent/10 py-16">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-brand-primary mb-4">Blog de Construcción</h1>
              <p className="text-xl text-brand-accent max-w-3xl mx-auto mb-8">
                Consejos, tendencias y noticias del mundo de la construcción para mantenerte informado
              </p>

              {/* Search Bar */}
              <div className="max-w-md mx-auto relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-accent h-5 w-5" />
                <Input type="text" placeholder="Buscar artículos..." className="pl-10 pr-4 py-3" />
              </div>
            </div>
          </div>
        </section>

        {/* Categories - keep the same */}
        <section className="py-8 bg-white border-b border-brand-accent/30">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === "Todos" ? "default" : "outline"}
                  size="sm"
                  className={category === "Todos" ? "bg-brand-primary hover:bg-brand-accent text-white" : "border-brand-accent text-brand-primary hover:bg-brand-accent/10"}
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
                      <div className="flex items-center justify-between text-sm text-brand-accent mb-3">
                        <span className="bg-brand-accent/10 text-brand-accent px-2 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <span>{post.readTime}</span>
                      </div>

                      <h2 className="text-xl font-semibold text-brand-primary mb-3">
                        <Link href={`/blog/${post.slug}`} className="hover:text-brand-accent transition-colors">
                          {post.title}
                        </Link>
                      </h2>

                      <p className="text-brand-accent mb-4 line-clamp-3">{post.excerpt}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-brand-accent text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(post.createdAt).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          className="text-brand-primary hover:text-brand-accent font-medium inline-flex items-center text-sm"
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
                <p className="text-brand-accent">No hay artículos publicados aún.</p>
              </div>
            )}

            {/* Pagination - keep the same */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <Button variant="outline" disabled className="border-brand-accent text-brand-accent">Anterior</Button>
                <Button className="bg-brand-primary hover:bg-brand-accent text-white">1</Button>
                <Button variant="outline" className="border-brand-accent text-brand-accent">2</Button>
                <Button variant="outline" className="border-brand-accent text-brand-accent">3</Button>
                <Button variant="outline" className="border-brand-accent text-brand-accent">Siguiente</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
