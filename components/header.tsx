"use client"

import { useState } from "react"
import type React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useCallback } from "react"
import { Menu, X, Building2 } from "lucide-react"
import Image from "next/image"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname();
  const router = useRouter();
  const HEADER_OFFSET = 80; // Ajusta este valor si tu header es más alto o bajo

  // Handler para navegación a secciones
  const handleSectionNav = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
    e.preventDefault();
    if (pathname !== '/') {
      // Navega a la home con hash, el navegador posiciona la sección automáticamente
      router.push('/#' + sectionId);
    } else {
      // Scroll suave con offset si ya estamos en la home
      const el = document.getElementById(sectionId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  }, [pathname, router]);

  return (
    <header className="bg-white shadow-sm fixed w-full top-0 z-50 border-b-2 border-brand-accent">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-4">
        <div className="flex justify-between items-center py-6">
          <Link href="/" className="flex items-center group" prefetch={false}>
            <Image src="/aza-constructora.png" alt="Logo AZA Constructora" width={64} height={64} className="mr-3 transition-transform group-hover:scale-105" />
            <span className="ml-2 text-3xl font-extrabold text-brand-primary tracking-tight transition-colors group-hover:text-brand-accent">AZA Constructora</span>
          </Link>

          <nav className="hidden md:flex space-x-4 items-center">
            <Link href="/" className="relative text-brand-primary hover:text-brand-accent transition-colors text-xl font-semibold px-2 py-1 group">
              Inicio
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-accent transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
            <a href="#servicios" onClick={e => handleSectionNav(e, 'servicios')} className="relative text-brand-primary hover:text-brand-accent transition-colors text-xl font-semibold px-2 py-1 group cursor-pointer">
              Servicios
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-accent transition-all duration-300 group-hover:w-full rounded"></span>
            </a>
            <a href="#proyectos" onClick={e => handleSectionNav(e, 'proyectos')} className="relative text-brand-primary hover:text-brand-accent transition-colors text-xl font-semibold px-2 py-1 group cursor-pointer">
              Proyectos
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-accent transition-all duration-300 group-hover:w-full rounded"></span>
            </a>
            <a href="#blog" onClick={e => handleSectionNav(e, 'blog')} className="relative text-brand-primary hover:text-brand-accent transition-colors text-xl font-semibold px-2 py-1 group cursor-pointer">
              Blog
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-accent transition-all duration-300 group-hover:w-full rounded"></span>
            </a>
            <a href="#contacto" onClick={e => handleSectionNav(e, 'contacto')} className="relative text-brand-primary hover:text-brand-accent transition-colors text-xl font-semibold px-2 py-1 group cursor-pointer">
              Contacto
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-accent transition-all duration-300 group-hover:w-full rounded"></span>
            </a>
            <Link href="/galeria" className="relative text-brand-primary hover:text-brand-accent transition-colors text-xl font-semibold px-2 py-1 group">
              Galería
              <span className="absolute left-0 bottom-0 w-0 h-1 bg-brand-accent transition-all duration-300 group-hover:w-full rounded"></span>
            </Link>
            <Link
              href="/cotizacion"
              className="ml-2 px-5 py-1.5 rounded-full bg-brand-accent text-white font-bold shadow-lg border-2 border-brand-accent hover:bg-white hover:text-brand-accent transition-colors text-xl flex items-center"
            >
              Cotizar
            </Link>
          </nav>

          <button className="md:hidden text-brand-primary" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-brand-accent">
              <Link href="/" className="block px-3 py-2 text-brand-primary hover:text-brand-accent">
                Inicio
              </Link>
              <a href="#servicios" onClick={e => handleSectionNav(e, 'servicios')} className="block px-3 py-2 text-brand-primary hover:text-brand-accent cursor-pointer">
                Servicios
              </a>
              <a href="#proyectos" onClick={e => handleSectionNav(e, 'proyectos')} className="block px-3 py-2 text-brand-primary hover:text-brand-accent cursor-pointer">
                Proyectos
              </a>
              <Link href="/galeria" className="block px-3 py-2 text-brand-primary hover:text-brand-accent">
                Galería
              </Link>
              <a href="#blog" onClick={e => handleSectionNav(e, 'blog')} className="block px-3 py-2 text-brand-primary hover:text-brand-accent cursor-pointer">
                Blog
              </a>
              <a href="#contacto" onClick={e => handleSectionNav(e, 'contacto')} className="block px-3 py-2 text-brand-primary hover:text-brand-accent cursor-pointer">
                Contacto
              </a>
              <Link
                href="/cotizacion"
                className="block w-full text-center px-5 py-2 rounded-full bg-brand-accent text-white font-bold shadow-lg border-2 border-brand-accent hover:bg-white hover:text-brand-accent transition-colors text-xl mt-2"
              >
                Cotizar
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
