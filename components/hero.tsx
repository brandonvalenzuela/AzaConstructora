import React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/constructora.jpg?height=600&width=1200')`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-24 flex items-center justify-center min-h-screen">
        <div className="max-w-5xl w-full text-center mx-auto">
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">
            Construimos tus sueños con
            <span className="block text-blue-400">calidad y confianza</span>
          </h1>
          <p className="text-3xl md:text-5xl mb-12 text-white font-semibold drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">
            Más de 20 años de experiencia en construcción residencial y comercial. Tu proyecto en las mejores manos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white shadow-lg px-14 py-7 text-3xl rounded-full min-h-[80px] min-w-[320px] font-bold transition-all duration-200 flex items-center justify-center gap-4"
            >
              Ver Proyectos
              <ArrowRight className="h-10 w-10" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white shadow-lg px-14 py-7 text-3xl rounded-full min-h-[80px] min-w-[320px] font-bold transition-all duration-200 flex items-center justify-center gap-4"
              asChild
            >
              <Link href="/cotizacion">Solicitar Cotización</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
