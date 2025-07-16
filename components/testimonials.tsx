import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Propietaria",
    content:
      "Excelente trabajo en la construcción de nuestra casa. Cumplieron con todos los plazos y la calidad superó nuestras expectativas.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Empresario",
    content:
      "Construyeron nuestras oficinas corporativas con gran profesionalismo. Recomiendo sus servicios sin dudarlo.",
    rating: 5,
  },
  {
    name: "Ana Martínez",
    role: "Arquitecta",
    content:
      "Como arquitecta, valoro mucho la atención al detalle y la calidad de acabados que ofrece AZA Constructora.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
