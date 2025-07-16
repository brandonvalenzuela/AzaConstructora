import React from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative bg-white text-brand-primary min-h-screen flex items-center justify-center pt-32 md:pt-0">
      <div className="absolute inset-0 bg-brand-primary opacity-80"></div>
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-multiply"
        style={{
          backgroundImage: `url('/constructora.jpg?height=600&width=1200')`,
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-6 py-24 flex items-center justify-center min-h-screen">
        <div className="max-w-5xl w-full text-center mx-auto">
          <div className="flex justify-center">
            <div className="bg-white/90 rounded-full p-4 shadow-lg inline-block">
              <Image src="/aza-constructora.png" alt="Logo AZA Constructora" width={80} height={80} />
            </div>
          </div>
          <h1 className="text-6xl md:text-8xl font-extrabold mb-8 leading-tight drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)] text-white">
            Construimos tus sueños con
            <span className="block text-brand-accent">calidad y confianza</span>
          </h1>
          <p className="text-3xl md:text-5xl mb-12 text-white font-semibold drop-shadow-[0_4px_32px_rgba(0,0,0,0.9)]">
            Más de 20 años de experiencia en construcción residencial y comercial. Tu proyecto en las mejores manos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-brand-accent hover:bg-brand-primary text-white shadow-lg px-14 py-7 text-3xl rounded-full min-h-[80px] min-w-[320px] font-bold transition-all duration-200 flex items-center justify-center gap-4 border-2 border-brand-accent hover:border-brand-accent"
              asChild
            >
              <Link href="/galeria">
                Ver Proyectos
                <ArrowRight className="h-10 w-10" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white shadow-lg px-14 py-7 text-3xl rounded-full min-h-[80px] min-w-[320px] font-bold transition-all duration-200 flex items-center justify-center gap-4"
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
