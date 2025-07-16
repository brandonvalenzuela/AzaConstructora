"use server"

interface QuoteFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company?: string
  projectType: string
  projectSize?: string
  budget: string
  location: string
  timeline: string
  services: string
  projectDescription: string
  specialRequirements?: string
  hasPlans: string
  terms: string
  newsletter?: string
}

export async function submitQuoteRequest(prevState: any, formData: FormData) {
  try {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Extract form data
    const data: QuoteFormData = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      company: formData.get("company") as string,
      projectType: formData.get("projectType") as string,
      projectSize: formData.get("projectSize") as string,
      budget: formData.get("budget") as string,
      location: formData.get("location") as string,
      timeline: formData.get("timeline") as string,
      services: formData.get("services") as string,
      projectDescription: formData.get("projectDescription") as string,
      specialRequirements: formData.get("specialRequirements") as string,
      hasPlans: formData.get("hasPlans") as string,
      terms: formData.get("terms") as string,
      newsletter: formData.get("newsletter") as string,
    }

    // Validate required fields
    if (
      !data.firstName ||
      !data.lastName ||
      !data.email ||
      !data.phone ||
      !data.projectType ||
      !data.location ||
      !data.projectDescription
    ) {
      return {
        success: false,
        error: "Por favor completa todos los campos requeridos.",
      }
    }

    if (!data.terms) {
      return {
        success: false,
        error: "Debes aceptar los términos y condiciones.",
      }
    }

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notifications
    // 3. Integrate with CRM
    // 4. Generate quote ID

    console.log("Quote request submitted:", data)

    // Generate a mock quote ID
    const quoteId = `COT-${Date.now()}`

    return {
      success: true,
      message: `¡Solicitud enviada exitosamente! Tu número de referencia es ${quoteId}. Nos pondremos en contacto contigo en las próximas 48 horas para discutir los detalles de tu proyecto.`,
      quoteId,
    }
  } catch (error) {
    console.error("Error submitting quote request:", error)
    return {
      success: false,
      error: "Ocurrió un error al enviar tu solicitud. Por favor intenta nuevamente.",
    }
  }
}
