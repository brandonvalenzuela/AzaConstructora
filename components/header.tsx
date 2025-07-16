"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Building2 } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <Building2 className="h-12 w-12 text-blue-600" />
            <span className="ml-4 text-3xl font-extrabold text-gray-900 tracking-tight">AZA Constructora</span>
          </div>

          <nav className="hidden md:flex space-x-4">
            <Link href="/" className="relative text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold px-2 py-1 group">
              Inicio
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
            <Link href="#servicios" className="relative text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold px-2 py-1 group">
              Servicios
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
            <Link href="#proyectos" className="relative text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold px-2 py-1 group">
              Proyectos
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
            <Link href="/galeria" className="relative text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold px-2 py-1 group">
              Galería
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
            <Link href="/blog" className="relative text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold px-2 py-1 group">
              Blog
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
            <Link href="#contacto" className="relative text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold px-2 py-1 group">
              Contacto
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
            <Link href="/cotizacion" className="relative text-gray-700 hover:text-blue-600 transition-colors text-xl font-semibold px-2 py-1 group">
              Cotización
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full rounded"></span>
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
