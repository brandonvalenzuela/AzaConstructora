# 🚀 Guía de Deploy - AZA Constructora

## 📋 Descripción

Esta guía describe el proceso completo de despliegue del sitio web de AZA Constructora, incluyendo la configuración de variables de entorno y la automatización del deploy.

## 🛠️ Archivos de Deploy

- **`deploy.yml`** - Pipeline de CI/CD para GitHub Actions
- **`deploy.js`** - Script de deploy local automatizado
- **`generate-config.js`** - Generador de configuración desde variables de entorno

## 🔧 Scripts Disponibles

```bash
# Generar configuración desde .env
npm run config

# Deploy local completo
npm run deploy

# Build del proyecto
npm run build
```

## 📦 Deploy Local

### 1. Preparación

```bash
# Verificar que existe .env con todas las variables
cat .env

# Instalar dependencias
npm install
```

### 2. Ejecutar Deploy

```bash
npm run deploy
```

Este comando:
- ✅ Verifica prerequisitos
- ✅ Instala dependencias
- ✅ Genera configuración de EmailJS
- ✅ Ejecuta tests (si existen)
- ✅ Construye el proyecto
- ✅ Valida archivos críticos
- ✅ Muestra instrucciones de deploy

## 🌐 Deploy en Producción

### GitHub Actions (Automático)

1. **Configurar Secrets en GitHub:**
   - `FRONTEND_URL`
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
   - `CONTACT_EMAIL`
   - `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY`

2. **Push a rama main/master:**
   ```bash
   git add .
   git commit -m "Deploy: actualización del sitio"
   git push origin main
   ```

3. **El pipeline automáticamente:**
   - Instala dependencias
   - Genera configuración
   - Ejecuta tests
   - Despliega a producción

### Deploy Manual

1. **Preparar archivos:**
   ```bash
   npm run deploy
   ```

2. **Subir al servidor:**
   - `index.html`, `contacto.html`, etc.
   - Carpeta `js/` completa (incluyendo `config.js`)
   - Carpeta `css/` completa
   - Carpeta `media/` completa

3. **Configurar servidor web:**
   - Servir archivos estáticos
   - Configurar HTTPS
   - Habilitar compresión gzip

## 🔒 Variables de Entorno

### Desarrollo (.env)
```env
# EmailJS
EMAILJS_SERVICE_ID=service_lfvk1iq
EMAILJS_TEMPLATE_ID=template_zde1y0n
EMAILJS_PUBLIC_KEY=GTHGX6BKGytOFh4zt

# SMTP (opcional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu-email@gmail.com
SMTP_PASS=tu-contraseña
CONTACT_EMAIL=contacto@azaconstructora.com
```

### Producción
- Configurar las mismas variables en el servidor de producción
- Usar valores específicos de producción
- Mantener las credenciales seguras

## 📁 Estructura de Deploy

```
Producción/
├── index.html
├── contacto.html
├── nosotros.html
├── proyectos.html
├── proyecto-detalle.html
├── soluciones.html
├── sostenibilidad.html
├── css/
│   └── styles.css
├── js/
│   ├── config.js          # ⚠️ Generado automáticamente
│   ├── contact-handler.js
│   ├── main.js
│   ├── projects.js
│   ├── project-detail.js
│   └── footer-loader.js
└── media/
    └── aza-constructora.png
```

## ✅ Checklist de Deploy

### Pre-Deploy
- [ ] Variables de entorno configuradas
- [ ] Archivo `.env` actualizado
- [ ] Dependencias instaladas
- [ ] Tests pasando (si existen)

### Deploy
- [ ] Configuración generada (`config.js`)
- [ ] Archivos validados
- [ ] Subida a servidor completada
- [ ] Servidor web configurado

### Post-Deploy
- [ ] Sitio web accesible
- [ ] Formularios de contacto funcionando
- [ ] EmailJS operativo
- [ ] Navegación entre páginas correcta
- [ ] Responsive design verificado
- [ ] HTTPS configurado

## 🚨 Troubleshooting

### Error: "Configuración de EmailJS no encontrada"
```bash
# Regenerar configuración
npm run config
```

### Error: "Variables de entorno faltantes"
```bash
# Verificar .env
cat .env

# Verificar config.js generado
cat js/config.js
```

### Formularios no funcionan
1. Verificar que `config.js` está incluido en HTML
2. Verificar credenciales de EmailJS
3. Revisar consola del navegador

## 📞 Soporte

Para problemas de deploy:
1. Revisar logs del script de deploy
2. Verificar configuración de variables
3. Comprobar archivos generados
4. Validar funcionalidad en navegador