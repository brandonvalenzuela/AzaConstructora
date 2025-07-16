import Image from "next/image"

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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Proyectos Destacados</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
