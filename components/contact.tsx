"use client"

import type React from "react"

import { useState } from "react"
import { Phone, Mail, MapPin, Clock, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import emailjs from 'emailjs-com';
import { useToast } from "@/components/ui/use-toast";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })

 
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    emailjs.sendForm(
      'service_lfvk1iq', // service_id
      'template_zde1y0n', // template_id
      e.target as HTMLFormElement,
      'GTHGX6BKGytOFh4zt' // PUBLIC KEY
    )
    .then(() => {
      toast({
        title: "¡Mensaje enviado!",
        description: "Nos pondremos en contacto contigo pronto.",
      });
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setIsSending(false);
      }, 1000); // 1 segundo de espera
    })
    .catch(() => {
      toast({
        title: "Error",
        description: "Hubo un error al enviar el mensaje.",
        variant: "destructive"
      });
      setIsSending(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contacto" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contáctanos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ¿Tienes un proyecto en mente? Estamos aquí para ayudarte a hacerlo realidad
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Información de Contacto</h3>

            <div className="space-y-6">
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-brand-primary mt-1 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Teléfono</p>
                  <p className="text-gray-600">+52 (55) 1234-5678</p>
                  <p className="text-gray-600">+52 (55) 8765-4321</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="h-6 w-6 text-brand-primary mt-1 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">info@azaconstructora.com</p>
                  <p className="text-gray-600">proyectos@azaconstructora.com</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-brand-primary mt-1 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Dirección</p>
                  <p className="text-gray-600">
                    Av. Construcción 123, Col. Ingenieros
                    <br />
                    Ciudad de México, CP 01234
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-6 w-6 text-brand-primary mt-1 mr-4" />
                <div>
                  <p className="font-medium text-gray-900">Horarios</p>
                  <p className="text-gray-600">Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Sábados: 9:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-brand-primary/10 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-2">¿Necesitas una cotización?</h4>
              <p className="text-gray-600 mb-4">
                Si tienes un proyecto específico en mente, utiliza nuestro formulario especializado para obtener una
                cotización detallada.
              </p>
              <Button asChild className="bg-brand-primary hover:bg-brand-accent">
                <Link href="/cotizacion">Solicitar Cotización Detallada</Link>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">Envíanos un Mensaje</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Tu nombre completo"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Tu correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Tu número de teléfono"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div>
                <Textarea
                  name="message"
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-brand-primary hover:bg-brand-accent" disabled={isSending}>
                {isSending ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin h-5 w-5" />
                    Enviando...
                  </span>
                ) : (
                  "Enviar Mensaje"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}


