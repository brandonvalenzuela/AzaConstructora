import { notFound } from "next/navigation"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { getPublishedPosts } from "@/lib/blog-storage"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Replace the hardcoded blogPosts object with dynamic data fetching
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const posts = getPublishedPosts()
  const post = posts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  // Get related posts (excluding current post)
  const relatedPosts = posts.filter((p) => p.slug !== params.slug && p.category === post.category).slice(0, 3)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-6 py-16">
          {/* Back Button */}
          <div className="mb-8">
            <Button variant="outline" asChild>
              <Link href="/blog" className="inline-flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al blog
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <header className="mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

            <div className="flex items-center justify-between border-b border-gray-200 pb-6">
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <span className="mr-4">
                  {new Date(post.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>Por {post.author}</span>
              </div>

              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Compartir
              </Button>
            </div>
          </header>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 hover:prose-a:text-blue-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Article Footer */}
          <footer className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600 mb-2">¿Te gustó este artículo?</p>
                <div className="flex space-x-4">
                  <Button variant="outline" size="sm">
                    👍 Me gusta
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartir
                  </Button>
                </div>
              </div>
            </div>
          </footer>
        </article>

        {/* Related Articles */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Artículos Relacionados</h2>

            {relatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <article
                    key={relatedPost.id}
                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                          {relatedPost.category}
                        </span>
                        <span>{relatedPost.readTime}</span>
                      </div>

                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        <Link href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </Link>
                      </h3>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-gray-500 text-sm">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(relatedPost.createdAt).toLocaleDateString("es-ES", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>

                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-blue-600 hover:text-blue-700 font-medium inline-flex items-center text-sm"
                        >
                          Leer más
                          <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">No hay artículos relacionados disponibles.</p>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
