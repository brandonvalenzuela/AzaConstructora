"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { submitQuoteRequest } from "@/app/actions/quote-actions"
import { useActionState } from "react"

export function QuoteForm() {
  const [state, action, isPending] = useActionState(submitQuoteRequest, null)
  const [selectedServices, setSelectedServices] = useState<string[]>([])

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setSelectedServices([...selectedServices, service])
    } else {
      setSelectedServices(selectedServices.filter((s) => s !== service))
    }
  }

  return (
    <form action={action} className="space-y-8">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información Personal</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Nombre *</Label>
              <Input id="firstName" name="firstName" type="text" required />
            </div>
            <div>
              <Label htmlFor="lastName">Apellidos *</Label>
              <Input id="lastName" name="lastName" type="text" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div>
              <Label htmlFor="phone">Teléfono *</Label>
              <Input id="phone" name="phone" type="tel" required />
            </div>
          </div>

          <div>
            <Label htmlFor="company">Empresa (Opcional)</Label>
            <Input id="company" name="company" type="text" />
          </div>
        </CardContent>
      </Card>

      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Proyecto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium">Tipo de Proyecto *</Label>
            <RadioGroup name="projectType" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="residential" id="residential" />
                <Label htmlFor="residential">Construcción Residencial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="commercial" id="commercial" />
                <Label htmlFor="commercial">Construcción Comercial</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="renovation" id="renovation" />
                <Label htmlFor="renovation">Remodelación</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="industrial" id="industrial" />
                <Label htmlFor="industrial">Industrial</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectSize">Tamaño Aproximado (m²)</Label>
              <Input id="projectSize" name="projectSize" type="number" placeholder="ej. 150" />
            </div>
            <div>
              <Label htmlFor="budget">Presupuesto Estimado</Label>
              <Select name="budget">
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona un rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-500k">Menos de $500,000</SelectItem>
                  <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                  <SelectItem value="1m-2m">$1,000,000 - $2,000,000</SelectItem>
                  <SelectItem value="2m-5m">$2,000,000 - $5,000,000</SelectItem>
                  <SelectItem value="over-5m">Más de $5,000,000</SelectItem>
                  <SelectItem value="not-sure">No estoy seguro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="location">Ubicación del Proyecto *</Label>
              <Input id="location" name="location" type="text" placeholder="Ciudad, Estado" required />
            </div>
            <div>
              <Label htmlFor="timeline">Cronograma Deseado</Label>
              <Select name="timeline">
                <SelectTrigger>
                  <SelectValue placeholder="¿Cuándo quieres iniciar?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asap">Lo antes posible</SelectItem>
                  <SelectItem value="1-3months">En 1-3 meses</SelectItem>
                  <SelectItem value="3-6months">En 3-6 meses</SelectItem>
                  <SelectItem value="6-12months">En 6-12 meses</SelectItem>
                  <SelectItem value="over-year">Más de un año</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader>
          <CardTitle>Servicios Requeridos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Diseño arquitectónico",
              "Ingeniería estructural",
              "Construcción completa",
              "Acabados interiores",
              "Acabados exteriores",
              "Instalaciones eléctricas",
              "Instalaciones hidráulicas",
              "Climatización",
              "Paisajismo",
              "Gestión de permisos",
            ].map((service) => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox
                  id={service}
                  checked={selectedServices.includes(service)}
                  onCheckedChange={(checked) => handleServiceChange(service, checked as boolean)}
                />
                <Label htmlFor={service} className="text-sm">
                  {service}
                </Label>
              </div>
            ))}
          </div>
          <input type="hidden" name="services" value={selectedServices.join(",")} />
        </CardContent>
      </Card>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle>Detalles del Proyecto</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="projectDescription">Descripción del Proyecto *</Label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              placeholder="Describe tu proyecto en detalle: características específicas, materiales preferidos, estilo arquitectónico, etc."
              rows={5}
              required
            />
          </div>

          <div>
            <Label htmlFor="specialRequirements">Requerimientos Especiales</Label>
            <Textarea
              id="specialRequirements"
              name="specialRequirements"
              placeholder="Menciona cualquier requerimiento especial: accesibilidad, sostenibilidad, tecnología específica, etc."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="hasPlans">¿Tienes planos o diseños existentes?</Label>
            <RadioGroup name="hasPlans" className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="plans-yes" />
                <Label htmlFor="plans-yes">Sí, tengo planos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="plans-no" />
                <Label htmlFor="plans-no">No, necesito diseño completo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="partial" id="plans-partial" />
                <Label htmlFor="plans-partial">Tengo ideas pero necesito desarrollo</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" name="terms" required />
          <Label htmlFor="terms" className="text-sm">
            Acepto los{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline">
              términos y condiciones
            </a>{" "}
            y autorizo el tratamiento de mis datos personales
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="newsletter" name="newsletter" />
          <Label htmlFor="newsletter" className="text-sm">
            Deseo recibir información sobre nuevos proyectos y promociones
          </Label>
        </div>

        {state?.error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">{state.error}</div>
        )}

        {state?.success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">{state.message}</div>
        )}

        <Button type="submit" size="lg" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          {isPending ? "Enviando..." : "Solicitar Cotización"}
        </Button>
      </div>
    </form>
  )
}
