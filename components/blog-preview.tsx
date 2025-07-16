import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
// Update to use dynamic blog data
import { getPublishedPosts } from "@/lib/blog-storage"

export function BlogPreview() {
  const blogPosts = getPublishedPosts().slice(0, 3) // Get latest 3 published posts

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Blog y Noticias</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mantente informado con las últimas tendencias y consejos en construcción
          </p>
        </div>

        {blogPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-6">
                    <div className="flex items-center text-brand-accent text-sm mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(post.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h3 className="text-xl font-semibold text-brand-primary mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:text-brand-accent transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-brand-accent mb-4">{post.excerpt}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-brand-accent hover:text-brand-primary font-medium inline-flex items-center"
                    >
                      Leer más
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/blog">
                  Ver todos los artículos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-brand-accent">No hay artículos publicados aún.</p>
          </div>
        )}
      </div>
    </section>
  )
}
