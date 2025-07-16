import { Home, Building, Wrench, PaintBucket } from "lucide-react"

const services = [
  {
    icon: Home,
    title: "Construcción Residencial",
    description:
      "Casas unifamiliares, condominios y desarrollos habitacionales con los más altos estándares de calidad.",
  },
  {
    icon: Building,
    title: "Construcción Comercial",
    description: "Oficinas, centros comerciales, bodegas industriales y proyectos corporativos de gran envergadura.",
  },
  {
    icon: Wrench,
    title: "Remodelaciones",
    description: "Renovación y ampliación de espacios existentes, adaptándolos a tus nuevas necesidades.",
  },
  {
    icon: PaintBucket,
    title: "Acabados Premium",
    description: "Acabados de lujo y detalles arquitectónicos que marcan la diferencia en cada proyecto.",
  },
]

export function Services() {
  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Nuestros Servicios</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos soluciones integrales de construcción para satisfacer todas tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <service.icon className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
