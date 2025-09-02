# 🚀 Configuración de GitHub Pages para AZA Constructora

## 📋 Problema Identificado

El error `GET https://brandonvalenzuela.github.io/AzaConstructora/js/config.js net::ERR_ABORTED 404 (Not Found)` indica que **GitHub Pages no está configurado** o no está desplegando el archivo `config.js` correctamente.

## ✅ Solución Implementada

He configurado GitHub Pages con las **acciones oficiales de GitHub** que:

1. ✅ **Genera el archivo `config.js`** con las variables de EmailJS
2. ✅ **Despliega automáticamente** usando acciones oficiales de GitHub Pages
3. ✅ **Incluye todos los archivos necesarios** (HTML, CSS, JS, config.js)
4. ✅ **Configura permisos correctos** (contents, pages, id-token)
5. ✅ **Usa environment github-pages** para mayor seguridad

## 🔧 Configuración Manual Requerida

### Paso 1: Habilitar GitHub Pages

1. Ve a tu repositorio en GitHub: `https://github.com/brandonvalenzuela/AzaConstructora`
2. Haz clic en **Settings** (Configuración)
3. Desplázate hacia abajo hasta la sección **Pages**
4. En **Source**, selecciona:
   - **GitHub Actions**
5. El workflow se ejecutará automáticamente y configurará Pages

> **Nota**: Ya no necesitas configurar una rama específica, GitHub Actions manejará todo automáticamente.

### Paso 2: Verificar el Deploy

1. Ve a la pestaña **Actions** en tu repositorio
2. Verifica que el workflow "Deploy AZA Constructora Website" se esté ejecutando
3. Una vez completado, GitHub Pages estará disponible en:
   ```
   https://brandonvalenzuela.github.io/AzaConstructora/
   ```

### Paso 3: Verificar el archivo config.js

Una vez configurado GitHub Pages, el archivo `config.js` estará disponible en:
```
https://brandonvalenzuela.github.io/AzaConstructora/js/config.js
```

## 🔍 Verificación de Funcionamiento

### Antes (Error):
```
GET https://brandonvalenzuela.github.io/AzaConstructora/js/config.js net::ERR_ABORTED 404 (Not Found)
⚠️ Configuración de EmailJS no encontrada. Asegúrate de incluir config.js
```

### Después (Funcionando):
```
✅ Configuración de EmailJS cargada correctamente
✅ Formulario de contacto inicializado
✅ EmailJS listo para enviar emails
```

## 📧 Variables de EmailJS

Asegúrate de que estas variables estén configuradas en **GitHub Secrets**:

- `EMAILJS_SERVICE_ID`: Tu Service ID de EmailJS
- `EMAILJS_TEMPLATE_ID`: Tu Template ID de EmailJS  
- `EMAILJS_PUBLIC_KEY`: Tu Public Key de EmailJS
- `FRONTEND_URL`: `https://brandonvalenzuela.github.io/AzaConstructora`

## 🚨 Notas Importantes

1. **Primera vez**: GitHub Pages puede tardar unos minutos en activarse
2. **Propagación**: Los cambios pueden tardar hasta 10 minutos en reflejarse
3. **Cache**: Si sigues viendo el error 404, limpia la cache del navegador
4. **HTTPS**: GitHub Pages usa HTTPS automáticamente

## 🔄 Proceso Automático

Cada vez que hagas `git push` a la rama `main`:

1. 🔧 Se ejecuta el workflow de CI/CD
2. ⚙️ Se genera el archivo `config.js` con las variables de EmailJS
3. 🚀 Se despliega automáticamente a GitHub Pages
4. ✅ El sitio web se actualiza con la nueva configuración

## 📞 Soporte

Si después de seguir estos pasos sigues teniendo problemas:

1. Verifica que GitHub Pages esté habilitado
2. Revisa los logs del workflow en la pestaña Actions
3. Confirma que las variables de GitHub Secrets estén configuradas
4. Limpia la cache del navegador y prueba en modo incógnito