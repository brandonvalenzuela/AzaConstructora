# Configuración de EmailJS con Variables de Entorno

## 📋 Descripción

Este proyecto ahora utiliza variables de entorno para gestionar la configuración de EmailJS de forma segura y flexible.

## 🔧 Configuración

### 1. Variables de Entorno

Las credenciales de EmailJS se configuran en el archivo `.env`:

```env
# EMAILJS
EMAILJS_SERVICE_ID=service_lfvk1iq
EMAILJS_TEMPLATE_ID=template_zde1y0n
EMAILJS_PUBLIC_KEY=GTHGX6BKGytOFh4zt
```

### 2. Generación de Configuración

Para aplicar cambios en las variables de entorno:

```bash
node generate-config.js
```

Este comando:
- ✅ Lee las variables del archivo `.env`
- ✅ Genera `js/config.js` automáticamente
- ✅ Aplica la configuración al frontend

## 📁 Archivos del Sistema

- **`.env`** - Variables de entorno (NO subir a repositorio)
- **`generate-config.js`** - Script generador de configuración
- **`js/config.js`** - Configuración para el frontend (generado automáticamente)
- **`js/contact-handler.js`** - Manejador de formularios que usa la configuración

## 🚀 Uso en Desarrollo

1. Modifica las variables en `.env`
2. Ejecuta `node generate-config.js`
3. Recarga la página web

## 🔒 Seguridad

- ✅ Las credenciales están en `.env` (excluido del repositorio)
- ✅ El frontend solo recibe la configuración necesaria
- ✅ No hay credenciales hardcodeadas en el código

## ⚠️ Importante

- **NO editar** `js/config.js` manualmente
- **NO subir** el archivo `.env` al repositorio
- **Ejecutar** `generate-config.js` después de cambiar variables

## 🎯 Beneficios

- 🔧 **Flexibilidad**: Cambiar configuración sin tocar código
- 🔒 **Seguridad**: Credenciales fuera del código fuente
- 🚀 **Despliegue**: Diferentes configuraciones por entorno
- 🧹 **Mantenimiento**: Configuración centralizada