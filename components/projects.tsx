import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

const projects = [
  {
    id: 1,
    title: "Residencial Los Pinos",
    category: "Residencial",
    image: "/placeholder.svg?height=300&width=400",
    description: "Complejo residencial de 50 casas con áreas verdes y amenidades.",
  },
  {
    id: 2,
    title: "Centro Comercial Plaza Norte",
    category: "Comercial",
    image: "/placeholder.svg?height=300&width=400",
    description: "Centro comercial de 3 niveles con 120 locales comerciales.",
  },
  {
    id: 3,
    title: "Torre Corporativa Skyline",
    category: "Corporativo",
    image: "/placeholder.svg?height=300&width=400",
    description: "Edificio de oficinas de 25 pisos con tecnología de punta.",
  },
  {
    id: 4,
    title: "Condominio Vista Mar",
    category: "Residencial",
    image: "/placeholder.svg?height=300&width=400",
    description: "Exclusivo condominio frente al mar con 30 departamentos.",
  },
]

export function Projects() {
  return (
    <section id="proyectos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary mb-4">Proyectos Destacados</h2>
          <p className="text-xl text-brand-accent max-w-3xl mx-auto">
            Conoce algunos de nuestros proyectos más emblemáticos que demuestran nuestra experiencia y calidad
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-64">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="bg-brand-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-brand-primary mb-2">{project.title}</h3>
                <p className="text-brand-accent">{project.description}</p>
              </div>
            </div>
          ))}
          
        </div>
      </div>
      <div className="text-center mt-12">
        <Button asChild variant="outline" size="lg">
          <Link href="/galeria">
            Ver todos los proyectos
            <svg className="ml-2 h-4 w-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </Button>
      </div>
    </section>
  )
}
