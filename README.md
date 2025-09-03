# 🏗️ AZA Constructora - Sitio Web Corporativo

**Sitio web profesional para AZA Constructora** - Empresa líder en construcción, demolición, movimiento de tierras y supervisión de obras en México.

🌐 **Sitio en vivo:** [https://brandonvalenzuela.github.io/AzaConstructora/](https://brandonvalenzuela.github.io/AzaConstructora/)

## 🎯 Características del Sitio Web

### 📱 **Frontend Moderno**
- ✅ **Diseño responsivo** - Optimizado para móviles, tablets y desktop
- ✅ **Interfaz moderna** - UI/UX profesional y atractiva
- ✅ **Navegación intuitiva** - Menú dinámico y estructura clara
- ✅ **Carga rápida** - Optimizado para rendimiento
- ✅ **SEO optimizado** - Meta tags y estructura semántica

### 🏢 **Secciones Principales**
- 🏠 **Inicio** - Presentación de la empresa y servicios destacados
- 👥 **Nosotros** - Historia, misión, visión y valores
- 🔧 **Soluciones** - Servicios especializados de construcción
- 🌱 **Sostenibilidad** - Compromiso ambiental y prácticas sustentables
- 📋 **Proyectos** - Portfolio de trabajos realizados
- 📞 **Contacto** - Formularios de contacto y información

### 📧 **Sistema de Contacto**
- ✅ **EmailJS integrado** - Envío de emails sin backend
- ✅ **Formularios validados** - Validación en tiempo real
- ✅ **Múltiples formularios** - Contacto general y solicitud de llamada
- ✅ **Respuesta automática** - Confirmación inmediata al usuario
- ✅ **Categorización** - Tipos de proyecto predefinidos

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- **HTML5** - Estructura semántica y accesible
- **CSS3** - Estilos modernos con Flexbox y Grid
- **JavaScript ES6+** - Funcionalidad interactiva
- **EmailJS** - Servicio de envío de emails
- **Responsive Design** - Compatible con todos los dispositivos

### **Herramientas de Desarrollo**
- **Node.js** - Entorno de desarrollo
- **GitHub Actions** - CI/CD automatizado
- **GitHub Pages** - Hosting gratuito
- **Git** - Control de versiones

## 🚀 Instalación y Desarrollo Local

### **Prerrequisitos**
- Node.js 18+ instalado
- Git instalado
- Cuenta de EmailJS (para formularios)

### **Pasos de Instalación**

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/brandonvalenzuela/AzaConstructora.git
   cd AzaConstructora
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar EmailJS:**
   - Crear cuenta en [EmailJS](https://www.emailjs.com/)
   - Configurar servicio de email
   - Crear template de email
   - Obtener claves de API

4. **Configurar variables de entorno:**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env`:
   ```env
   # EmailJS Configuration
   EMAILJS_SERVICE_ID=tu_service_id
   EMAILJS_TEMPLATE_ID=tu_template_id
   EMAILJS_PUBLIC_KEY=tu_public_key
   
   # Contact Email
   CONTACT_EMAIL=contacto@azaconstructora.com
   ```

5. **Ejecutar en desarrollo:**
   ```bash
   # Opción 1: Servidor de desarrollo con recarga automática
   npm run dev
   
   # Opción 2: Servidor HTTP simple
   npx http-server . -p 8080
   
   # Opción 3: Live Server (si tienes la extensión de VS Code)
   # Clic derecho en index.html > "Open with Live Server"
   ```

6. **Abrir en el navegador:**
   ```
   http://localhost:8080
   ```

## ⚙️ Configuración de EmailJS

### **Paso 1: Crear Cuenta**
1. Ve a [EmailJS.com](https://www.emailjs.com/)
2. Crea una cuenta gratuita
3. Verifica tu email

### **Paso 2: Configurar Servicio**
1. En el dashboard, ve a **"Email Services"**
2. Agrega un nuevo servicio (Gmail, Outlook, etc.)
3. Sigue las instrucciones de autenticación
4. Copia el **Service ID**

### **Paso 3: Crear Template**
1. Ve a **"Email Templates"**
2. Crea un nuevo template
3. Configura el contenido con variables:
   ```
   Nombre: {{name}}
   Email: {{email}}
   Teléfono: {{phone}}
   Proyecto: {{project}}
   Mensaje: {{message}}
   ```
4. Copia el **Template ID**

### **Paso 4: Obtener Public Key**
1. Ve a **"Account" > "General"**
2. Copia la **Public Key**

### **Paso 5: Configurar Variables**
Actualiza tu archivo `.env` con los valores obtenidos.

## 📁 Estructura del Proyecto

```
AzaConstructora/
├── 📄 index.html              # Página principal
├── 📄 nosotros.html           # Página "Acerca de"
├── 📄 soluciones.html         # Servicios de construcción
├── 📄 sostenibilidad.html     # Compromiso ambiental
├── 📄 proyectos.html          # Portfolio de proyectos
├── 📄 proyecto-detalle.html   # Detalle de proyecto individual
├── 📄 contacto.html           # Página de contacto
├── 📄 contact-form.html       # Formulario de contacto independiente
├── 📄 header.html             # Componente de encabezado
├── 📄 footer.html             # Componente de pie de página
├── 📁 css/
│   └── 🎨 styles.css          # Estilos principales
├── 📁 js/
│   ├── ⚡ main.js             # JavaScript principal
│   ├── 📧 contact-handler.js  # Manejo de formularios
│   ├── 🔄 contact-form-loader.js # Carga de formularios
│   ├── 📄 footer-loader.js    # Carga de footer
│   ├── 📋 projects.js         # Gestión de proyectos
│   ├── 🔍 project-detail.js   # Detalle de proyectos
│   └── ⚙️ config.js          # Configuración EmailJS (generado)
├── 📁 media/
│   └── 🖼️ aza-constructora.png # Logo de la empresa
├── 📁 .github/workflows/
│   └── 🚀 deploy.yml         # CI/CD para GitHub Pages
├── 📄 package.json           # Dependencias del proyecto
├── 📄 generate-config.js     # Generador de configuración
├── 📄 deploy.js              # Script de despliegue
└── 📄 README.md              # Documentación
```

## 🌐 Despliegue Automático

### **GitHub Pages + GitHub Actions**
El sitio se despliega automáticamente usando GitHub Actions:

1. **Trigger:** Push a la rama `main`
2. **Proceso:**
   - ✅ Instala dependencias
   - ✅ Genera `config.js` con variables de EmailJS
   - ✅ Ejecuta tests (si existen)
   - ✅ Despliega a GitHub Pages
3. **Resultado:** Sitio actualizado en vivo

### **Configuración Manual de GitHub Pages**
1. Ve a **Settings** > **Pages**
2. Source: **GitHub Actions**
3. El workflow se ejecutará automáticamente

## 🔧 Funcionalidades Principales

### **📧 Sistema de Contacto**
- **Formulario principal** en `/contacto.html`
- **Formulario independiente** en `/contact-form.html`
- **Validación en tiempo real** de todos los campos
- **Envío vía EmailJS** sin necesidad de backend
- **Confirmación visual** al usuario

### **📱 Navegación Dinámica**
- **Menú responsivo** que se adapta a móviles
- **Carga de componentes** (header/footer) dinámicamente
- **Navegación fluida** entre secciones
- **Breadcrumbs** en páginas internas

### **🎨 Diseño Responsivo**
- **Mobile-first** approach
- **Breakpoints optimizados** para todos los dispositivos
- **Imágenes adaptativas** según el tamaño de pantalla
- **Tipografía escalable** y legible

## 🛡️ Seguridad y Validación

### **Validación de Formularios**
- ✅ **Nombre:** 2-100 caracteres, solo letras y espacios
- ✅ **Email:** Formato de email válido
- ✅ **Teléfono:** Formato mexicano (opcional)
- ✅ **Mensaje:** 10-1000 caracteres
- ✅ **Sanitización:** Prevención de XSS

### **Protección EmailJS**
- ✅ **Rate limiting** del lado del cliente
- ✅ **Validación doble** (cliente + EmailJS)
- ✅ **Claves públicas** seguras
- ✅ **Templates predefinidos** en EmailJS

## 🐛 Troubleshooting

### **❌ Formularios no envían emails**
1. **Verificar configuración EmailJS:**
   ```bash
   # Revisar que config.js se haya generado
   cat js/config.js
   ```
2. **Verificar variables de entorno:**
   - Service ID correcto
   - Template ID correcto
   - Public Key correcta
3. **Revisar consola del navegador** para errores JavaScript

### **❌ Error 404 en config.js**
- Verificar que GitHub Actions se ejecutó correctamente
- Verificar que las variables están configuradas en GitHub Secrets
- Verificar que GitHub Pages está habilitado

### **❌ Estilos no se cargan**
- Verificar rutas relativas en CSS
- Limpiar caché del navegador
- Verificar que los archivos CSS existen

### **❌ Imágenes no se muestran**
- Verificar rutas de imágenes en HTML/CSS
- Verificar que las imágenes están en la carpeta `media/`
- Verificar formatos de imagen soportados

## 🚀 Comandos Útiles

```bash
# Desarrollo local
npm run dev                    # Servidor con recarga automática
npx http-server . -p 8080     # Servidor HTTP simple

# Generar configuración
node generate-config.js       # Crear config.js manualmente

# Verificar archivos
ls -la js/                    # Listar archivos JavaScript
cat js/config.js              # Ver configuración generada

# Git y despliegue
git add .                     # Agregar cambios
git commit -m "mensaje"       # Commit
git push origin main          # Desplegar automáticamente
```

## 📝 Contribuir

### **Para desarrolladores:**
1. **Fork** el repositorio
2. **Crea una rama** para tu feature: `git checkout -b feature/nueva-funcionalidad`
3. **Commit** tus cambios: `git commit -m 'Agregar nueva funcionalidad'`
4. **Push** a la rama: `git push origin feature/nueva-funcionalidad`
5. **Abre un Pull Request**

### **Estructura de commits:**
```
🎨 :art: Mejoras de UI/UX
⚡ :zap: Mejoras de rendimiento
🐛 :bug: Corrección de bugs
✨ :sparkles: Nueva funcionalidad
📝 :memo: Documentación
🚀 :rocket: Despliegue
```

## 📞 Soporte

**¿Necesitas ayuda?**
- 📧 **Email:** contacto@azaconstructora.com
- 🌐 **Sitio web:** [https://brandonvalenzuela.github.io/AzaConstructora/](https://brandonvalenzuela.github.io/AzaConstructora/)
- 📱 **GitHub Issues:** [Reportar problema](https://github.com/brandonvalenzuela/AzaConstructora/issues)

---

**Desarrollado con ❤️ para AZA Constructora**

*Sitio web profesional, moderno y completamente responsivo para la empresa líder en construcción.*