// Helper functions for categorizing images in the public gallery
export function categorizeImage(image: { name: string; alt?: string; caption?: string }): string[] {
  const categories: string[] = []
  const searchText = `${image.name} ${image.alt || ""} ${image.caption || ""}`.toLowerCase()

  // Residential
  if (
    searchText.includes("casa") ||
    searchText.includes("residencial") ||
    searchText.includes("hogar") ||
    searchText.includes("vivienda")
  ) {
    categories.push("residential")
  }

  // Commercial
  if (
    searchText.includes("comercial") ||
    searchText.includes("oficina") ||
    searchText.includes("tienda") ||
    searchText.includes("negocio")
  ) {
    categories.push("commercial")
  }

  // Industrial
  if (
    searchText.includes("industrial") ||
    searchText.includes("bodega") ||
    searchText.includes("fabrica") ||
    searchText.includes("almacen")
  ) {
    categories.push("industrial")
  }

  // Renovation
  if (
    searchText.includes("remodelacion") ||
    searchText.includes("renovacion") ||
    searchText.includes("reforma") ||
    searchText.includes("ampliacion")
  ) {
    categories.push("renovation")
  }

  // Exterior
  if (
    searchText.includes("exterior") ||
    searchText.includes("fachada") ||
    searchText.includes("jardin") ||
    searchText.includes("patio")
  ) {
    categories.push("exterior")
  }

  // Interior
  if (
    searchText.includes("interior") ||
    searchText.includes("sala") ||
    searchText.includes("cocina") ||
    searchText.includes("baño") ||
    searchText.includes("dormitorio")
  ) {
    categories.push("interior")
  }

  return categories.length > 0 ? categories : ["general"]
}

export function getImagesByCategory(images: any[], category: string) {
  if (category === "all") return images

  return images.filter((image) => {
    const imageCategories = categorizeImage(image)
    return imageCategories.includes(category)
  })
}
