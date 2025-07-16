"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Building2 } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Building2 className="h-12 w-12 text-blue-600" />
            <span className="ml-4 text-3xl font-extrabold text-gray-900 tracking-tight">AZA Constructora</span>
          </div>

          <nav className="hidden md:flex space-x-10">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold">
              Inicio
            </Link>
            <Link href="#servicios" className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold">
              Servicios
            </Link>
            <Link href="#proyectos" className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold">
              Proyectos
            </Link>
            <Link href="/galeria" className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold">
              Galería
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold">
              Blog
            </Link>
            <Link href="#contacto" className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold">
              Contacto
            </Link>
            <Link href="/cotizacion" className="text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold">
              Cotización
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Inicio
              </Link>
              <Link href="#servicios" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Servicios
              </Link>
              <Link href="#proyectos" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Proyectos
              </Link>
              <Link href="/galeria" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Galería
              </Link>
              <Link href="/blog" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Blog
              </Link>
              <Link href="#contacto" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Contacto
              </Link>
              <Link href="/cotizacion" className="block px-3 py-2 text-gray-700 hover:text-blue-600">
                Cotización
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
