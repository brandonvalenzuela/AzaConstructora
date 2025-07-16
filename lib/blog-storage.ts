// Simple storage system using localStorage for demo purposes
// In production, this would be replaced with a real database

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  status: "draft" | "published"
  author: string
  readTime: string
  createdAt: string
  updatedAt: string
}

const STORAGE_KEY = "constructora_blog_posts"

export function getBlogPosts(): BlogPost[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    // Initialize with some sample posts
    const samplePosts: BlogPost[] = [
      {
        id: "1",
        title: "Tendencias en construcción sostenible para 2024",
        slug: "tendencias-construccion-sostenible-2024",
        excerpt:
          "Descubre las últimas tendencias en construcción ecológica y cómo implementarlas en tu proyecto para crear espacios más eficientes y respetuosos con el medio ambiente.",
        content: `
          <p>La construcción sostenible se ha convertido en una prioridad fundamental en la industria de la construcción moderna. En 2024, vemos un crecimiento exponencial en la adopción de prácticas ecológicas que no solo benefician al medio ambiente, sino que también ofrecen ventajas económicas a largo plazo.</p>

          <h2>Materiales Sostenibles</h2>
          <p>Los materiales de construcción sostenibles están revolucionando la forma en que construimos. Desde el bambú estructural hasta el concreto reciclado, estos materiales ofrecen durabilidad y resistencia mientras reducen significativamente la huella de carbono de los proyectos.</p>

          <h2>Eficiencia Energética</h2>
          <p>La integración de sistemas de energía renovable, como paneles solares y sistemas geotérmicos, se está convirtiendo en estándar en nuevas construcciones. Estos sistemas no solo reducen los costos operativos, sino que también aumentan el valor de la propiedad.</p>

          <h2>Certificaciones Verdes</h2>
          <p>Las certificaciones como LEED y BREEAM están ganando importancia, ya que los propietarios buscan validar el desempeño ambiental de sus edificios. Estas certificaciones no solo demuestran el compromiso con la sostenibilidad, sino que también pueden resultar en incentivos fiscales.</p>

          <h2>Tecnología Inteligente</h2>
          <p>Los edificios inteligentes utilizan sensores y automatización para optimizar el consumo de energía y agua. Esta tecnología permite un control preciso del ambiente interior, mejorando tanto la eficiencia como el confort de los ocupantes.</p>
        `,
        category: "Sostenibilidad",
        status: "published",
        author: "Ing. María González",
        readTime: "5 min",
        createdAt: "2024-01-15T10:00:00Z",
        updatedAt: "2024-01-15T10:00:00Z",
      },
      {
        id: "2",
        title: "Guía completa para planificar tu proyecto de construcción",
        slug: "guia-planificar-proyecto-construccion",
        excerpt:
          "Todo lo que necesitas saber antes de iniciar tu proyecto de construcción residencial, desde la planificación inicial hasta la entrega final.",
        content: `
          <p>Planificar un proyecto de construcción requiere atención meticulosa a múltiples factores. Esta guía te ayudará a navegar por cada etapa del proceso, desde la concepción inicial hasta la entrega final.</p>

          <h2>Fase de Planificación</h2>
          <p>La planificación es la base de cualquier proyecto exitoso. Comienza definiendo claramente tus objetivos, presupuesto y cronograma. Es crucial realizar un análisis detallado del sitio y obtener todos los permisos necesarios antes de comenzar la construcción.</p>

          <h2>Selección del Equipo</h2>
          <p>Elegir el equipo correcto es fundamental. Esto incluye arquitectos, ingenieros, contratistas y subcontratistas. Verifica sus credenciales, experiencia previa y referencias antes de tomar una decisión.</p>

          <h2>Gestión del Presupuesto</h2>
          <p>Establece un presupuesto realista que incluya un margen para imprevistos (generalmente 10-20% del costo total). Mantén un seguimiento detallado de todos los gastos durante el proyecto.</p>

          <h2>Control de Calidad</h2>
          <p>Implementa un sistema de control de calidad desde el inicio. Esto incluye inspecciones regulares, pruebas de materiales y verificación del cumplimiento de especificaciones técnicas.</p>
        `,
        category: "Planificación",
        status: "published",
        author: "Arq. Carlos Rodríguez",
        readTime: "8 min",
        createdAt: "2024-01-10T10:00:00Z",
        updatedAt: "2024-01-10T10:00:00Z",
      },
    ]

    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts))
    return samplePosts
  }

  return JSON.parse(stored)
}

export function getBlogPost(id: string): BlogPost | null {
  const posts = getBlogPosts()
  return posts.find((post) => post.id === id) || null
}

export function saveBlogPost(post: BlogPost): void {
  const posts = getBlogPosts()
  const existingIndex = posts.findIndex((p) => p.id === post.id)

  if (existingIndex >= 0) {
    posts[existingIndex] = post
  } else {
    posts.unshift(post)
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
}

export function deleteBlogPost(id: string): void {
  const posts = getBlogPosts()
  const filteredPosts = posts.filter((post) => post.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts))
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[áàäâ]/g, "a")
    .replace(/[éèëê]/g, "e")
    .replace(/[íìïî]/g, "i")
    .replace(/[óòöô]/g, "o")
    .replace(/[úùüû]/g, "u")
    .replace(/[ñ]/g, "n")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim()
}

export function getPublishedPosts(): BlogPost[] {
  return getBlogPosts().filter((post) => post.status === "published")
}
