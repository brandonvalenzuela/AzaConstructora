import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuoteForm } from "@/components/quote-form"
import { Calculator, Clock, CheckCircle } from "lucide-react"

export default function CotizacionPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Solicita tu Cotización</h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Obtén una cotización personalizada para tu proyecto de construcción. Nuestro equipo de expertos te
                proporcionará un presupuesto detallado y realista.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Calculator className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cotización Detallada</h3>
                <p className="text-gray-600">Presupuesto completo con desglose de materiales, mano de obra y tiempos</p>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Respuesta Rápida</h3>
                <p className="text-gray-600">Recibe tu cotización en un máximo de 48 horas hábiles</p>
              </div>
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin Compromiso</h3>
                <p className="text-gray-600">Cotización gratuita y sin ningún tipo de compromiso de tu parte</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Form Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="bg-white rounded-lg shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Información del Proyecto</h2>
                <p className="text-gray-600">
                  Completa el siguiente formulario con los detalles de tu proyecto para recibir una cotización precisa
                </p>
              </div>

              <QuoteForm />
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Nuestro Proceso</h2>
              <p className="text-xl text-gray-600">Así es como trabajamos para brindarte el mejor servicio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Solicitud</h3>
                <p className="text-gray-600">Completas el formulario con los detalles de tu proyecto</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Análisis</h3>
                <p className="text-gray-600">Nuestro equipo analiza los requerimientos y especificaciones</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cotización</h3>
                <p className="text-gray-600">Preparamos una cotización detallada y personalizada</p>
              </div>
              <div className="text-center">
                <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  4
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Presentación</h3>
                <p className="text-gray-600">Te contactamos para presentar la propuesta y resolver dudas</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
