import Link from "next/link"
import { Building2, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">AZA Constructora</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Construimos tus sueños con más de 20 años de experiencia en el sector. Calidad, confianza y excelencia en
              cada proyecto.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Construcción Residencial
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Construcción Comercial
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Remodelaciones
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Acabados Premium
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Servicios
                </Link>
              </li>
              <li>
                <Link href="#proyectos" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Proyectos
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contacto" className="text-gray-300 hover:text-blue-600 transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">© 2024 AZA Constructora. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
