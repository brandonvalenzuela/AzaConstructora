# 📧 Guía de Templates EmailJS Mejorados

## 🎯 Descripción

Esta guía te ayudará a implementar los nuevos templates de email mejorados para EmailJS que maximizan la información recibida y proporcionan un diseño profesional.

## 📁 Archivos Incluidos

### 1. `emailjs-template-improved.html`
- **Descripción**: Template completo con diseño avanzado
- **Características**: 
  - Diseño responsive
  - Botones de acción directa
  - Indicadores de prioridad
  - Estadísticas del contacto
  - Gradientes y efectos visuales
- **Uso**: Ideal para sistemas de email robustos

### 2. `emailjs-template-simple.html`
- **Descripción**: Template simplificado optimizado para EmailJS
- **Características**:
  - Código HTML limpio y compatible
  - Diseño profesional pero simple
  - Fácil de copiar y pegar
  - Optimizado para la plataforma EmailJS
- **Uso**: **RECOMENDADO** para implementación directa en EmailJS

## 🔧 Variables Disponibles

Todos los templates utilizan las siguientes variables que se envían desde los formularios:

| Variable | Descripción | Ejemplo |
|----------|-------------|----------|
| `{{name}}` | Nombre completo del cliente | "Juan Pérez" |
| `{{email}}` | Correo electrónico del cliente | "juan@email.com" |
| `{{phone}}` | Teléfono del cliente | "+52 644 123-4567" |
| `{{project}}` | Tipo de proyecto seleccionado | "Obra Civil" |
| `{{message}}` | Mensaje del cliente | "Necesito cotización para..." |
| `{{time}}` | Fecha y hora del envío | "2024-01-15T10:30:45.123Z" |

## 📋 Instrucciones de Implementación

### Paso 1: Acceder a EmailJS
1. Ve a [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Inicia sesión en tu cuenta
3. Selecciona tu servicio de email

### Paso 2: Editar Template
1. Ve a la sección **"Email Templates"**
2. Selecciona tu template actual o crea uno nuevo
3. Haz clic en **"Edit"**

### Paso 3: Implementar el Nuevo Template
1. **OPCIÓN RECOMENDADA**: Copia todo el contenido de `emailjs-template-simple.html`
2. Pega el código en el campo **"Content"** del template
3. Asegúrate de que el **"Subject"** sea: `Nuevo contacto de {{name}} - {{project}}`

### Paso 4: Configurar Variables
Verifica que todas las variables estén correctamente mapeadas:
- `{{name}}` → Campo "name" del formulario
- `{{email}}` → Campo "email" del formulario
- `{{phone}}` → Campo "phone" del formulario
- `{{project}}` → Campo "project" del formulario
- `{{message}}` → Campo "message" del formulario
- `{{time}}` → Campo "time" del formulario (timestamp automático)

### Paso 5: Probar el Template
1. Guarda los cambios
2. Usa la función **"Test"** de EmailJS
3. Envía un mensaje de prueba desde tu formulario web

## 🎨 Características del Diseño

### Template Mejorado (`emailjs-template-improved.html`)
- **Diseño Corporativo**: Colores oficiales de AZA Constructora
- **Paleta de Colores**: Azul oscuro (#0d1b2a), dorado (#8d8771) y grises elegantes
- **Tipografía**: Playfair Display para títulos, Inter para contenido
- **Responsive**: Adaptable a dispositivos móviles
- **Interactividad**: Botones con efectos hover y transiciones

### Template Simple (`emailjs-template-simple.html`) ⭐ **RECOMENDADO**
- **Optimizado para EmailJS**: HTML simplificado y compatible
- **Colores Corporativos**: Misma paleta que el sitio web oficial
- **Fácil Implementación**: Código limpio y directo
- **Máxima Compatibilidad**: Funciona en todos los clientes de email

### Colores Corporativos de AZA Constructora
- **Azul Oscuro**: `#0d1b2a` (Color de fondo principal)
- **Dorado Corporativo**: `#8d8771` (Color de acento principal)
- **Dorado Hover**: `#a19c86` (Color de acento en hover)
- **Texto Claro**: `#e5e5e5` (Texto principal)
- **Texto Secundario**: `#94a3b8` (Texto secundario y etiquetas)
- **Rojo Prioridad**: `#dc2626` (Alertas de alta prioridad)
- **Gris Neutro**: `#6b7280` (Botones secundarios)

### Elementos Visuales
- **Gradientes Corporativos**: Degradados con colores oficiales (#8d8771 a #a19c86)
- **Bordes de Acento**: Líneas en dorado corporativo (#8d8771)
- **Fondos Transparentes**: Uso de rgba() para efectos de profundidad
- **Iconos Temáticos**: Emojis relacionados con construcción (🏗️, 📧, 📞)
- **Botones Interactivos**: Efectos hover con elevación (-2px transform)
- **Tipografía Corporativa**: Playfair Display para títulos, Inter para contenido
- **Espaciado Consistente**: Padding y margins alineados con el diseño web

## 🚀 Beneficios del Nuevo Template

### Información Completa
- ✅ Todos los campos del formulario visibles
- ✅ Timestamp automático del envío
- ✅ Tipo de proyecto claramente identificado
- ✅ Datos de contacto con enlaces directos

### Diseño Profesional
- ✅ Colores corporativos de AZA Constructora
- ✅ Diseño responsive para móviles
- ✅ Iconos y emojis para mejor UX
- ✅ Jerarquía visual clara

### Funcionalidad Mejorada
- ✅ Botones de acción directa (email/teléfono)
- ✅ Indicadores de prioridad
- ✅ Información organizada en secciones
- ✅ Fácil lectura y navegación

## 🔍 Solución de Problemas

### Problema: Variables no se muestran
**Solución**: Verifica que los nombres de los campos en el formulario coincidan exactamente con las variables del template.

### Problema: Diseño se ve mal en móvil
**Solución**: Usa el template simple (`emailjs-template-simple.html`) que está optimizado para mejor compatibilidad.

### Problema: EmailJS rechaza el HTML
**Solución**: 
1. Usa solo el template simple
2. Evita JavaScript o CSS externo
3. Mantén el HTML inline

## 📞 Soporte

Si tienes problemas con la implementación:
1. Revisa que todas las variables estén correctamente mapeadas
2. Prueba primero con el template simple
3. Verifica que el servicio de EmailJS esté activo
4. Consulta la documentación oficial de EmailJS

---

**🏗️ AZA Constructora - Sistema de Contacto Mejorado**

*Construyendo el futuro juntos*